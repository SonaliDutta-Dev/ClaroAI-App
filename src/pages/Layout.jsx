import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { SignIn, useUser } from "@clerk/clerk-react";

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();

  return user ? (
    <div
      className="
        flex flex-col h-screen w-full
        bg-[#eef1ff]
        bg-[radial-gradient(circle_at_20%_10%,rgba(150,120,255,0.45),transparent),
            radial-gradient(circle_at_80%_60%,rgba(255,180,220,0.35),transparent)]
        backdrop-blur-xl
      "
    >

      {/* NAVBAR */}
      <nav
        className="
          w-full px-8 min-h-14 flex items-center justify-between
          bg-white/60 backdrop-blur-xl
          border-b border-white/70
        "
      >
        <img
          src={assets.logo}
          className="cursor-pointer w-32 sm:w-44"
          alt="logo"
          onClick={() => navigate("/")}
        />

        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="w-6 h-6 text-[#333] sm:hidden"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="w-6 h-6 text-[#333] sm:hidden"
          />
        )}
      </nav>

      {/* MAIN AREA */}
      <div className="flex-1 w-full flex h-[calc(100vh-64px)]">

        {/* SIDEBAR */}
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

        {/* MAIN CONTENT */}
        <div
          className="
            flex-1 relative z-0 p-4 overflow-y-auto
            bg-white/50 backdrop-blur-xl
            border-l border-white/70
            shadow-inner
          "
        >
          <Outlet />
        </div>

      </div>

    </div>
  ) : (
    <div
      className="
        flex items-center justify-center h-screen
        bg-[#eef1ff]
        bg-[radial-gradient(circle_at_20%_10%,rgba(150,120,255,0.4),transparent),
            radial-gradient(circle_at_80%_60%,rgba(255,180,220,0.4),transparent)]
      "
    >
      <SignIn />
    </div>
  );
};

export default Layout;
