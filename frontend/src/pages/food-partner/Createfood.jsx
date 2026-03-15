import React, { useMemo, useRef, useState } from "react";
import axios from "axios";
import "../../styles/create-food.css";
import { useNavigate } from "react-router-dom";
import useVideoUpload from "../../hooks/useVideoUpload";
import MainLayout from "../../layout/MainLayout";

const CreateFood = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const { videoFile, videoURL, fileError, setVideoFile, handleFile } =
    useVideoUpload();

  const openFileDialog = () => fileInputRef.current?.click();

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    handleFile(file);
  };

  const onDragOver = (e) => e.preventDefault();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("video", videoFile);

      await axios.post("http://localhost:4000/api/food", formData, {
        withCredentials: true,
      });

      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = useMemo(
    () => !name.trim() || !videoFile,
    [name, videoFile],
  );

  return (
    <MainLayout>
      
    <div className="create-food-page">
      <div className="create-food-card">
        <header className="create-food-header">
          <h1 className="create-food-title">Create Food</h1>
          <p className="create-food-subtitle">
            Upload a short video, give it a name, and add a description.
          </p>
        </header>

        <form className="create-food-form" onSubmit={onSubmit}>
          <div className="field-group">
            <label htmlFor="foodVideo">Food Video</label>

            <input
              id="foodVideo"
              ref={fileInputRef}
              className="file-input-hidden"
              type="file"
              accept="video/*"
              onChange={onFileChange}
            />

            <div
              className="file-dropzone"
              role="button"
              tabIndex={0}
              onClick={openFileDialog}
              onDrop={onDrop}
              onDragOver={onDragOver}
            >
              <div className="file-dropzone-inner">
                <div className="file-dropzone-text">
                  <strong>Tap to upload</strong> or drag and drop
                </div>

                <div className="file-hint">MP4, WebM, MOV • Up to ~100MB</div>
              </div>
            </div>

            {fileError && <p className="error-text">{fileError}</p>}

            {videoFile && (
              <div className="file-chip">
                <span>{videoFile.name}</span>
                <span>{(videoFile.size / 1024 / 1024).toFixed(1)} MB</span>

                <div className="file-chip-actions">
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={openFileDialog}
                  >
                    Change
                  </button>

                  <button
                    type="button"
                    className="btn-ghost danger"
                    onClick={() => {
                      setVideoFile(null);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {videoURL && (
            <div className="video-preview">
              <video
                className="video-preview-el"
                src={videoURL}
                controls
                playsInline
                preload="metadata"
                />
            </div>
          )}

          <div className="field-group">
            <label htmlFor="foodName">Name</label>
            <input
              id="foodName"
              type="text"
              placeholder="Spicy Paneer Wrap"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="field-group">
            <label htmlFor="foodDesc">Description</label>
            <textarea
              rows={4}
              placeholder="Write a short description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button className="btn-primary" disabled={isDisabled || loading}>
              {loading ? "Uploading..." : "Save Food"}
            </button>
          </div>
        </form>
      </div>
    </div>
              </MainLayout>
  );
};

export default CreateFood;
