import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../../styles/reels.css";
import "../../styles/futuristic.css";
import ReelFeed from "../../components/ReelFeed";

const mockCategories = [
  "For You",
  "Trending",
  "Nearby",
  "Fast Food",
  "Healthy",
  "Offers",
];

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [originalVideos, setOriginalVideos] = useState([]);

  const navigate = useNavigate();
  const isLoadingMore = React.useRef(false);

  const handleUserIconClick = () => {
    const userId = localStorage.getItem("userId");
    const partnerId = localStorage.getItem("partnerId");

    if (userId) {
      navigate("/user-profile");
    } else if (partnerId) {
      navigate(`/auth/${partnerId}`);
    } else {
      navigate("/choose-register");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:4000/api/food", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        const fetchedVideos = response.data.foodItems || [];
        setVideos(fetchedVideos);
        setOriginalVideos(fetchedVideos);
      })
      .catch(() => {
        navigate("/choose-register");
      });
  }, [navigate]);

  const handleLoadMore = () => {
    if (isLoadingMore.current || originalVideos.length === 0) return;
    isLoadingMore.current = true;

    // Append the original list of videos to create an infinite loop
    setVideos((prev) => [...prev, ...originalVideos]);

    setTimeout(() => {
      isLoadingMore.current = false;
    }, 1000); // Throttle loading more
  };

  async function likeVideo(item) {
    const response = await axios.post(
      "http://localhost:4000/api/food/like",
      { foodId: item._id },
      { withCredentials: true },
    );
    if (response.data.like) {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, likeCount: (v.likeCount || 0) + 1 } : v,
        ),
      );
    } else {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? { ...v, likeCount: Math.max((v.likeCount || 0) - 1, 0) }
            : v,
        ),
      );
    }
  }

  async function saveVideo(item) {
    const response = await axios.post(
      "http://localhost:4000/api/food/save",
      { foodId: item._id },
      { withCredentials: true },
    );
    if (response.data.save) {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? { ...v, savesCount: (v.savesCount || 0) + 1 }
            : v,
        ),
      );
    } else {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? { ...v, savesCount: Math.max((v.savesCount || 0) - 1, 0) }
            : v,
        ),
      );
    }
  }

  return (
    <div className="relative w-full h-[100dvh] bg-[#050505] flex justify-center overflow-hidden font-sans text-white">
      <div className="relative w-full max-w-[380px] h-full shadow-2xl shadow-purple-900/10 bg-black">
        {/* TOP OVERLAY - STORIES & CATEGORIES */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="absolute top-0 left-0 w-full z-20 pt-4 pb-3 px-4 glass-panel border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-b-[2rem]"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-2xl font-black italic tracking-tighter">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-pink-400 to-[#ff2a85] drop-shadow-[0_0_8px_rgba(255,42,133,0.8)]">
                ZOM
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-[#00f0ff] drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">
                ASTA
              </span>
            </h1>
            <button
              onClick={handleUserIconClick}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
          </div>

          {/* Categories / Filters */}
          {/* <div className="flex gap-3 overflow-x-auto hide-scrollbar scroll-smooth">
            {mockCategories.map((cat, i) => (
              <button
                key={i}
                className={`shrink-0 px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wider transition-all duration-300 ${i === 0 ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-[0_4px_15px_rgba(255,42,133,0.6)] border border-pink-400/50" : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white"}`}
              >
                {cat}
              </button>
            ))}
          </div> */}
        </motion.div>
        .{/* Reels feed  */}
        <ReelFeed
          items={videos}
          onLike={likeVideo}
          onSave={saveVideo}
          onLoadMore={handleLoadMore}
          emptyMessage={
            <div className="text-white font-medium glass-panel px-6 py-4 rounded-2xl flex flex-col items-center gap-3 drop-shadow-2xl border border-white/20">
              <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
              Loading Zomasta ...
            </div>
          }
        />
        {/* BOTTOM NAV */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="absolute bottom-6 left-4 right-4 z-20 glass-panel rounded-full flex justify-between items-center px-6 py-3 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
        >
          <button className="text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] hover:text-pink-400 transition-colors">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
            >
              <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" />
            </svg>
          </button>

          {/* search button  */}
          <button className="text-gray-400 hover:text-white transition-colors">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Action Center Button */}
          <motion.div
            onClick={() => navigate("/create-food")}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#ff2a85] to-[#00f0ff] p-[2px] -mt-10 shadow-[0_0_20px_rgba(255,42,133,0.8)] cursor-pointer"
          >
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center border border-white/20">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-lg"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
          </motion.div>

          {/* wave */}
          <button className="text-gray-400 hover:text-white transition-colors">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </button>
          <button
            onClick={handleUserIconClick}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
