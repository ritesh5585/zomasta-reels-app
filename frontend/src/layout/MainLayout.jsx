import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="relative w-full h-[100dvh] bg-[#050505] flex justify-center overflow-hidden font-sans text-white">
      <div className="relative w-full max-w-[380px] h-full bg-black shadow-2xl shadow-purple-900/10">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
