import React from "react";
import { assets } from "../assets/assets";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const isDashboard = location.pathname.startsWith("/ai");

  return (
    <div
      className={`
        fixed top-0 z-50 w-full h-20
        flex justify-between items-center
        px-4 sm:px-8 xl:px-32
        backdrop-blur-xl transition-all duration-300
        ${isDashboard 
          ? "bg-white/80 border-b border-gray-200 shadow-sm"
          : "bg-white/30 border-b border-white/40"
        }
      `}
    >
      {/* Logo */}
  <img
  src={assets.logo}
  alt="Logo"
  className="h-[180px] sm:h-[180px] lg:h-[200px] cursor-pointer"
  onClick={() => navigate("/")}
/>



      {/* Right Auth Button */}
      {user ? (
        <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
      ) : (
        <button
          onClick={openSignIn}
          className="
            flex items-center gap-2 px-5 py-2 rounded-full
            text-sm font-medium text-white
            bg-gradient-to-r from-purple-500 to-fuchsia-500
            shadow-[0_0_12px_rgba(180,0,255,0.3)]
            hover:scale-105 active:scale-95 transition
          "
        >
          Get started <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
