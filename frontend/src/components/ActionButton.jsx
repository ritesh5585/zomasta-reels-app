import React from "react";
import { motion } from "framer-motion";

const ActionButton = ({ icon, count, onClick, label }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 group w-12"
      aria-label={label}
    >
      <div className="w-[46px] h-[46px] rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
        {icon}
      </div>

      {count !== undefined && (
        <span className="text-white text-xs font-bold shadow-black drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
          {count}
        </span>
      )}
    </motion.button>
  );
};

export default React.memo(ActionButton)