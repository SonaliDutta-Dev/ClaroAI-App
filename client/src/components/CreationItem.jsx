import React, { useState } from "react";
import Markdown from "react-markdown";

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="
        p-5 rounded-xl cursor-pointer transition hover:-translate-y-1
        bg-white/70 backdrop-blur-xl border border-white/60
        shadow-[0_4px_20px_rgba(150,100,255,0.15)]
      "
    >
      {/* TOP */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

        <div className="min-w-0">
          <h2 className="text-[#1A1A1A] font-semibold text-base break-words">
            {item.prompt}
          </h2>

          <p className="text-[#555] text-xs mt-1">
            {item.type} • {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* UPDATED THEME BUTTON */}
        <button
          className="
            px-4 py-1 rounded-full text-xs font-medium
            text-white select-none
            bg-gradient-to-r from-[#7b61ff] to-[#b566ff]
            shadow-[0_0_12px_rgba(150,100,255,0.25)]
            hover:scale-105 active:scale-95 transition
            whitespace-nowrap
          "
        >
          {item.type}
        </button>

      </div>

      {/* EXPANDED */}
      {expanded && (
        <div className="mt-4">
          {item.type.includes("image") ? (
            <div
              className="
                w-full rounded-lg overflow-hidden 
                bg-white/70 backdrop-blur-xl border border-white/60 p-3
              "
            >
              <img
                src={item.content}
                alt="creation"
                className="w-full h-full object-contain rounded-md"
              />
            </div>
          ) : (
            <div className="text-[#333] whitespace-pre-wrap mt-2 text-sm leading-relaxed break-words">
              <Markdown>{item.content}</Markdown>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;
