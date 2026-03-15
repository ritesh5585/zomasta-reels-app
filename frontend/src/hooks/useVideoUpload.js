import { useEffect, useState } from "react";

export default function useVideoUpload() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    if (!videoFile) {
      setVideoURL("");
      return;
    }

    const url = URL.createObjectURL(videoFile);
    setVideoURL(url);

    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  const validateVideo = (file) => {
    if (!file.type.startsWith("video/")) {
      setFileError("Please select a valid video file.");
      return false;
    }

    setFileError("");
    return true;
  };

  const handleFile = (file) => {
    if (!file) return;
    if (!validateVideo(file)) return;

    setVideoFile(file);
  };

  return {
    videoFile,
    videoURL,
    fileError,
    setVideoFile,
    handleFile
  };
}