import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../../styles/reels.css";
import "../../styles/futuristic.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: "Loading...", email: "" });
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Ideally we'd fetch this from a /api/auth/me backend endpoint
    // For now we get it from local storage context since we set it
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/choose-register");
      return;
    }

    // Mocking user profile data for now
    // Future implementation should fetch from actual /api/user/:id
    setProfile({
      name: "Zomasta User",
      email: "user@example.com",
      bio: "Food enthusiast. Love exploring new places! 🍔🍕",
      following: 124,
      followers: 43
    });

    // Mock user created/saved videos
    setVideos([
      { id: 1, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=600&fit=crop" },
      { id: 2, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=600&fit=crop" },
      { id: 3, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=600&fit=crop" }
    ]);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    // Clear cookies too if possible, normally by calling the logout endpoint
    // axios.get("http://localhost:4000/api/auth/logout", { withCredentials: true })
    navigate("/home");
  };

  return (
    <div className="relative w-full h-[100dvh] bg-[#050505] flex justify-center overflow-auto font-sans text-white">
      <div className="relative w-full max-w-[380px] min-h-full pb-20 shadow-2xl shadow-purple-900/10 bg-black">
        
        {/* Header Options */}
        <div className="flex justify-between items-center p-4">
          <button onClick={() => navigate(-1)} className="p-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </button>
          <span className="font-bold tracking-wide text-gray-200">User Profile</span>
          <button onClick={handleLogout} className="p-2 bg-pink-500/10 text-pink-500 rounded-full border border-pink-500/30 hover:bg-pink-500/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
        </div>

        {/* Profile Info */}
        <div className="px-5 mt-2 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-pink-500 to-cyan-400 mb-4 shadow-[0_0_20px_rgba(255,42,133,0.5)]">
            <img 
              src={`https://ui-avatars.com/api/?name=${profile.name}&background=1a1a1a&color=fff&size=100`} 
              alt="Avatar" 
              className="w-full h-full rounded-full border-4 border-black object-cover"
            />
          </div>
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            {profile.name}
          </h2>
          <p className="text-gray-400 text-sm mt-1">{profile.email}</p>
          <p className="text-gray-300 text-sm mt-3 text-center px-4 leading-relaxed">{profile.bio}</p>

          <div className="flex gap-8 mt-5 mb-2 w-full justify-center">
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg text-white">12</span>
              <span className="text-xs text-gray-400 tracking-wider">POSTS</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10"></div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg text-white">{profile.followers}</span>
              <span className="text-xs text-gray-400 tracking-wider">FOLLOWERS</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10"></div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg text-white">{profile.following}</span>
              <span className="text-xs text-gray-400 tracking-wider">FOLLOWING</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex px-4 gap-3 my-6">
          <button className="flex-1 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold py-2 rounded-xl transition-colors">
            Edit Profile
          </button>
          <button className="flex-1 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold py-2 rounded-xl transition-colors">
            Share Profile
          </button>
        </div>

        {/* Saved/Videos Grid */}
        <div className="border-t border-white/10 pt-1">
          <div className="flex justify-around py-3">
             <button className="flex flex-col items-center gap-1 text-pink-500">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
             </button>
             <button onClick={() => navigate("/saved-content")} className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
             </button>
          </div>

          <div className="grid grid-cols-3 gap-0.5 mt-1 bg-black">
            {videos.map((vid) => (
              <div key={vid.id} className="aspect-[9/16] bg-gray-900 relative group overflow-hidden cursor-pointer">
                <img src={vid.image} alt="video thumb" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute bottom-1 right-1 flex items-center gap-1 text-[10px] font-bold">
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                   1.2K
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
