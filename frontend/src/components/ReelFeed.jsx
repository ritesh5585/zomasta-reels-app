import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ActionButton from "./ActionButton";

const ReelFeed = ({
  items = [],
  onLike,
  onSave,
  onLoadMore,
  emptyMessage = "No videos yet.",
}) => {
  const videoRefs = useRef(new Map());

  const observerRef = useRef(null);

  // Handles native sharing on mobile or fallback to copying URL
  const handleShare = async (item) => {
    const shareData = {
      title: "Check out this reel on Zomasta!",
      text: item.description || "Incredible food. Wait until you see this! 🤤",
      url: window.location.origin + "/home", // In a real app, route to specific post ID
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.log("Error sharing:", err);
    }
  };

  const [soundOn, setSoundOn] = useState(
    localStorage.getItem("reelSound") === "on",
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (!(video instanceof HTMLVideoElement)) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] },
    );

    videoRefs.current.forEach((vid) => observer.observe(vid));
    return () => observer.disconnect();
  }, [items]);

  // action button for like and save 
  const actions = [
    {
      label: "Like",
      icon: (item) => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={item.likeCount > 0 ? "#ff2a85" : "none"}
          stroke={item.likeCount > 0 ? "#ff2a85" : "white"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
        </svg>
      ),
      count: (item) => item.likeCount ?? item.likes ?? 0,
      action: onLike,
    },

    {
      label: "Save",
      icon: () => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
        >
          <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
        </svg>
      ),
      count: (item) => item.savesCount ?? item.saves ?? 0,
      action: onSave,
    },
  ];

  const setVideoRef = (id) => (el) => {
    if (!el) {
      videoRefs.current.delete(id);
      return;
    }
    videoRefs.current.set(id, el);

    observerRef.current?.observe(el);
  };

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    // Trigger load more when user is within 1.5 screens of the bottom
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      if (onLoadMore) onLoadMore();
    }
  };

  return (
    <div
      className="h-full w-full overflow-y-scroll snap-y snap-mandatory hide-scrollbar scroll-smooth"
      role="list"
      onScroll={handleScroll}
    >
      {items.length === 0 && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          {typeof emptyMessage === "string" ? (
            <p className="text-white bg-black/50 px-4 py-2 rounded-xl">
              {emptyMessage}
            </p>
          ) : (
            emptyMessage
          )}
        </div>
      )}

      {items.map((item, index) => (
        <section
          key={item._id + "-" + index}
          className="relative h-full w-full snap-start snap-always bg-black flex items-center justify-center"
          role="listitem"
        >
          <video
            ref={setVideoRef(item._id + "-" + index)}
            className="absolute inset-0 w-full h-full object-cover"
            src={item.video}
            loop
            muted={!soundOn}
            autoPlay
            playsInline
            preload="metadata"
          />

          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/95 pointer-events-none" />

          {/* Controls Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end pointer-events-none pb-[5.5rem] px-4">
            {/* Actions (Like, Save, Comment) - Right Aligned */}
            <div className="absolute right-3 bottom-[6.5rem] flex flex-col gap-5 pointer-events-auto items-center mr-1 z-10">
              {/* Profile Pic of Uploader (Food Partner) */}
              {/* <div className="relative mb-2 cursor-pointer hover:scale-105 transition-transform">
                <div className="w-[48px] h-[48px] rounded-full border-2 border-[#ff2a85] overflow-hidden bg-gray-800 p-[1px] shadow-[0_0_15px_rgba(255,42,133,0.6)]">
                   <img src={`https://ui-avatars.com/api/?name=${item.foodPartner || 'C'}&background=0D8ABC&color=fff`} alt="Partner" className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#ff2a85] text-white text-[11px] w-[22px] h-[22px] flex items-center justify-center rounded-full font-bold border-2 border-black shadow-lg">
                  +
                </div>
              </div> */}

              {/* volume */}
              <ActionButton
                label="Volume"
                onClick={(e) => {
                  e.stopPropagation();
                  const newState = !soundOn;
                  setSoundOn(newState);
                  localStorage.setItem("reelSound", newState ? "on" : "off");

                  videoRefs.current.forEach((video) => {
                    video.muted = !newState;
                  });
                }}
                icon={
                  <span className="text-white text-xl">
                    {soundOn ? "🔊" : "🔇"}
                  </span>
                }
              />

              {actions.map((action) => (
                <ActionButton
                  key={action.label}
                  label={action.label}
                  icon={action.icon(item)}
                  count={action.count?.(item)}
                  onClick={(e) => {
                    e.stopPropagation();
                    action.action?.(item);
                  }}
                />
              ))}

              {/* Like Button */}
              {/* <ActionButton
                label="Like"
                onClick={(e) => {
                  e.stopPropagation();
                  onLike && onLike(item);
                }}
                icon={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={item.likeCount > 0 ? "#ff2a85" : "none"}
                    stroke={item.likeCount > 0 ? "#ff2a85" : "white"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_0_5px_rgba(255,42,133,0.8)]"
                  >
                    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                  </svg>
                }
                count={item.likeCount ?? item.likesCount ?? item.likes ?? 0}
              /> */}

              {/* Save Button */}
              {/* <ActionButton
                label="Save"
                onClick={(e) => {
                  e.stopPropagation();
                  onSave && onSave(item);
                }}
                icon={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                  >
                    <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                  </svg>
                }
                count={item.savesCount ?? item.bookmarks ?? item.saves ?? 0}
              /> */}

              {/* Comments Button */}
              <ActionButton
                label="Comments"
                icon={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                  >
                    <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                  </svg>
                }
                count={
                  item.commentsCount ??
                  (Array.isArray(item.comments) ? item.comments.length : 0)
                }
              />
              {/* Share Button Placeholder */}
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare(item);
                }}
                className="flex flex-col items-center gap-1.5 group w-12"
                aria-label="Share"
              >
                <div className="w-[46px] h-[46px] rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </div>
                <span className="text-white text-xs font-bold shadow-black drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
                  Share
                </span>
              </motion.button>
            </div>

            {/* Video Info - Bottom Left */}
            <div className="pointer-events-auto pr-16 pb-2 w-full z-10">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-[17px] text-white drop-shadow-[0_2px_5px_rgba(0,0,0,1)] my-0">
                  @Partner_{item.foodPartner?.substring(0, 5) || "Store"}
                </h3>
                {item.foodPartner && (
                  // Visit Store
                  <Link
                    to={"/food-partner" + item.foodPartner}
                    className="bg-gradient-to-r from-[#ff2a85] to-[#8a2be2] text-white text-[11px] font-bold px-3 py-1 rounded-full drop-shadow-lg hover:scale-105 transition-transform shadow-[0_0_12px_rgba(255,42,133,0.6)]"
                  >
                    Visit Store
                  </Link>
                )}
              </div>
              <p className="text-gray-100 text-[14px] font-medium leading-snug drop-shadow-[0_2px_5px_rgba(0,0,0,1)] line-clamp-2 md:line-clamp-3 w-10/12 mb-1">
                {item.description ||
                  "Incredible food. Wait until you see the cheese pull! 🤤"}
                <br />
                <span className="font-bold text-[#00f0ff] drop-shadow-[0_0_6px_rgba(0,240,255,0.9)]">
                  #delicious #zomasta #foodie
                </span>
              </p>

              {/* Music Ticker */}
              <div className="flex items-center gap-2 mt-4 bg-black/40 backdrop-blur-md w-fit px-3 py-1.5 rounded-full border border-white/20 shadow-lg">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-pulse drop-shadow-md"
                >
                  <path d="M9 18V5l12-2v13"></path>
                  <circle cx="6" cy="18" r="3"></circle>
                  <circle cx="18" cy="16" r="3"></circle>
                </svg>
                <div className="overflow-hidden w-[160px] relative h-[18px]">
                  <motion.div
                    animate={{ x: ["50%", "-100%"] }}
                    transition={{
                      repeat: Infinity,
                      ease: "linear",
                      duration: 7,
                    }}
                    className="absolute whitespace-nowrap text-[12px] text-gray-200 font-bold tracking-wide drop-shadow-md"
                  >
                    Trending Food Audio ♫ Original Sound
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ReelFeed;
