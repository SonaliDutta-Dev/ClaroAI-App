import { useUser } from "@clerk/clerk-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AiToolsData } from "../assets/assets";

const AiTools = () => {
  const navigate = useNavigate();
  const user = useUser();

  return (
    <div className="px-4 sm:px-20 xl:px-32 my-28 py-20">

      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-[42px] font-semibold text-[#1a1a1a] tracking-wide">
          Powerful AI Tools
        </h2>

        <p className="text-[#4b4b4b] max-w-lg mx-auto text-sm">
          Everything you need to create, enhance, and optimize your content.
        </p>
      </div>

      {/* Wrapper glass panel */}
      <div
        className="
        rounded-3xl p-10 sm:p-14
        bg-white/60 backdrop-blur-2xl shadow-[0_0_30px_rgba(80,0,200,0.15)]
        border border-white/40
        "
      >
        <div className="flex flex-wrap justify-center gap-8">

          {AiToolsData.map((tool, index) => (
            <div
              key={index}
              onClick={() => user && navigate(tool.path)}
              className="
                cursor-pointer w-64 p-6 rounded-2xl
                bg-white/70 backdrop-blur-xl
                border border-white/50
                transition transform hover:scale-[1.03]
                shadow-[0_0_20px_rgba(100,60,255,0.15)]
                hover:shadow-[0_0_35px_rgba(150,80,255,0.25)]
              "
            >
              <tool.Icon
                className="w-12 h-12 p-3 text-white rounded-xl"
                style={{
                  background: `linear-gradient(145deg, ${tool.bg.from}, ${tool.bg.to})`,
                }}
              />

              <h3 className="mt-6 mb-2 text-lg font-semibold text-[#1A1A1A]">
                {tool.title}
              </h3>

              <p className="text-[#555] text-sm leading-relaxed">
                {tool.description}
              </p>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default AiTools;
