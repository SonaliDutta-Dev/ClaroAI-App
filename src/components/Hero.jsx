import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  const navigate = useNavigate();

  return (
  <div
  className="
    relative w-full min-h-screen
    flex flex-col justify-center items-center text-center
    px-6 sm:px-14
    bg-gradient-to-br from-[#eaeaff] via-[#eef1ff] to-[#eaf5ff]
    overflow-hidden
  "
>

      {/* Subtle pastel bluish top glow */}
      <div
        className="
        absolute inset-0
        bg-[radial-gradient(circle_at_20%_0%,rgba(150,130,255,0.35),transparent)]
      "
      ></div>

      {/* Subtle aqua-purple bottom glow */}
      <div
        className="
        absolute inset-0
        bg-[radial-gradient(circle_at_80%_90%,rgba(120,200,255,0.25),transparent)]
      "
      ></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#1A1A1A] leading-[1.2]">
          Unleash Creativity with{" "}
          <span className="bg-gradient-to-r from-[#7b61ff] to-[#b566ff] bg-clip-text text-transparent">
            ClaroAI
          </span>
        </h1>

        <p className="text-[#3f3f3f] text-sm sm:text-base mt-5 max-w-2xl mx-auto">
          Your all-in-one AI creation suite to clarify ideas, connect creativity  
          and create powerful content in seconds.
        </p>

        <p className="text-[#6a58ff] font-medium mt-2 text-xs sm:text-sm">
          Clarify • Connect • Create
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => navigate("/ai")}
            className="
              px-9 py-3 rounded-xl text-white text-sm font-medium
              bg-gradient-to-r from-[#7b61ff] to-[#b566ff]
              shadow-[0_0_18px_rgba(130,80,255,0.3)]
              hover:scale-105 active:scale-95 transition
            "
          >
            Start Creating
          </button>

          <button
            className="
              px-9 py-3 rounded-xl text-[#333] text-sm font-medium
              bg-white/80 border border-gray-200
              backdrop-blur-md
              hover:scale-105 active:scale-95 transition
            "
          >
            Explore Tools
          </button>
        </div>

        {/* ⭐ TRUST BADGE — ADDED HERE */}
        <div className="flex justify-center items-center gap-3 mt-10 text-[#555] text-sm">
          <img
            src={assets.user_group}
            alt="users"
            className="h-8 opacity-90"
          />
          Trusted by 10K+ creators
        </div>
      </div>
    </div>
  );
};

export default Hero;
