import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { FileText, Monitor, Sparkles, SlidersHorizontal } from "lucide-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const slideOptions = [
  { value: 6, label: "Short · 6 slides" },
  { value: 10, label: "Standard · 10 slides" },
  { value: 14, label: "Detailed · 14 slides" },
];

const detailOptions = [
  { value: "short", label: "Concise" },
  { value: "normal", label: "Balanced" },
  { value: "detailed", label: "In-depth" },
];

const PPTGenerator = () => {
  const { getToken } = useAuth();

  const [topic, setTopic] = useState("");
  const [slides, setSlides] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(10);
  const [detail, setDetail] = useState("normal");
  const [loading, setLoading] = useState(false);

  const activeSlide = slides[activeIndex] || { title: "", bullets: [] };

  const handleGenerate = async (e) => {
    e?.preventDefault();
    if (!topic.trim()) return toast.error("Please enter a topic");

    try {
      setLoading(true);

      const { data } = await axios.post(
        "/api/ai/ppt-generate",
        {
          topic,
          slideCount,
          detail,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      console.log("ppt-generate →", data);

      if (!data.success) {
        return toast.error(data.message || "Failed to generate");
      }

      if (!data.slides?.length) {
        return toast.error("No slides returned by AI");
      }

      setSlides(data.slides);
      setActiveIndex(0);
      toast.success("Slides generated!");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // update title / bullets
  const updateActiveSlide = (updates) => {
    setSlides((prev) =>
      prev.map((s, idx) =>
        idx === activeIndex
          ? { ...s, ...updates }
          : s
      )
    );
  };

  const handleBulletChange = (value, idx) => {
    const updatedBullets = [...activeSlide.bullets];
    updatedBullets[idx] = value;
    updateActiveSlide({ bullets: updatedBullets });
  };

  const addBullet = () => {
    updateActiveSlide({ bullets: [...activeSlide.bullets, ""] });
  };

  const removeBullet = (idx) => {
    updateActiveSlide({
      bullets: activeSlide.bullets.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="h-full overflow-y-auto p-6 flex flex-col lg:flex-row gap-6">
      {/* LEFT: Config panel */}
      <form
        onSubmit={handleGenerate}
        className="lg:w-[360px] w-full p-5 bg-white/85 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-4"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#226BFF]" />
          <h1 className="text-lg font-semibold">AI PPT Generator</h1>
        </div>

        <p className="text-xs text-gray-500">
          Enter a topic and get a complete slide outline with titles & bullet points.
        </p>

        {/* Topic */}
        <div>
          <label className="text-sm font-medium">Presentation Topic</label>
          <textarea
            rows={3}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Eg. Modern web development with MERN stack"
            className="mt-2 w-full text-sm border rounded-lg p-3 bg-white/80 outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Slide count & detail in one compact row */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <SlidersHorizontal className="w-4 h-4 text-gray-500" />
            <span>Deck Settings</span>
          </div>

          <div className="flex gap-2">
            <select
              value={slideCount}
              onChange={(e) => setSlideCount(Number(e.target.value))}
              className="flex-1 p-2 text-xs border rounded-lg bg-white/80"
            >
              {slideOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <select
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              className="flex-1 p-2 text-xs border rounded-lg bg-white/80"
            >
              {detailOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="mt-1 w-full flex items-center justify-center gap-2 py-2 text-sm text-white rounded-lg bg-gradient-to-r from-[#226BFF] to-[#65ADFF] disabled:opacity-60"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
          ) : (
            <>
              <FileText className="w-4 h-4" />
              Generate Slides
            </>
          )}
        </button>

        {/* Export buttons (for now just UI – you can wire later) */}
        <div className="flex gap-2 mt-1 text-[11px] text-gray-500">
          <button
            type="button"
            className="flex-1 border rounded-lg py-1.5 px-2 bg-white/70 hover:bg-gray-50 cursor-not-allowed"
          >
            Export PPT (soon)
          </button>
          <button
            type="button"
            className="flex-1 border rounded-lg py-1.5 px-2 bg-white/70 hover:bg-gray-50 cursor-not-allowed"
          >
            Export PDF (soon)
          </button>
        </div>

        <p className="text-[11px] text-gray-400 mt-1">
          You can still copy content into your own PowerPoint / Google Slides.
        </p>
      </form>

      {/* MIDDLE + RIGHT: Slides area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4">
        {/* Thumbnails */}
        <div className="w-full lg:w-40 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto pb-1">
          {slides.length === 0 ? (
            <div className="text-xs text-gray-400 border border-dashed rounded-lg p-3 flex items-center justify-center w-full">
              Slides will appear here
            </div>
          ) : (
            slides.map((slide, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`flex-shrink-0 lg:w-full w-28 border rounded-lg p-2 text-[11px] text-left transition ${
                  activeIndex === idx
                    ? "border-blue-500 bg-blue-50/70"
                    : "border-gray-200 bg-white/80"
                }`}
              >
                <div className="text-[10px] text-gray-400 mb-1">
                  Slide {idx + 1}
                </div>
                <div className="font-medium line-clamp-2">
                  {slide.title || "Untitled slide"}
                </div>
              </button>
            ))
          )}
        </div>

        {/* Main preview + editor */}
        <div className="flex-1 flex flex-col gap-4">
          {/* PREVIEW */}
          <div className="flex-1 p-4 bg-white/85 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Monitor className="w-4 h-4 text-[#226BFF]" />
              <h2 className="text-sm font-semibold">Slide Preview</h2>
            </div>

            {slides.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                <div className="flex flex-col items-center gap-2">
                  <Monitor className="w-8 h-8" />
                  <span>Generate a deck to preview slides here</span>
                </div>
              </div>
            ) : (
              <div className="w-full aspect-video bg-gradient-to-br from-[#F9FAFB] to-[#EFF6FF] rounded-xl border border-gray-200 shadow-inner p-6 flex flex-col">
                <div className="text-base font-semibold text-slate-800 mb-4 break-words">
                  {activeSlide.title || "Slide title"}
                </div>

                <ul className="text-sm text-slate-700 space-y-2">
                  {activeSlide.bullets?.length
                    ? activeSlide.bullets.map((b, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="mt-1 text-[10px]">•</span>
                          <span className="break-words">{b}</span>
                        </li>
                      ))
                    : (
                      <li className="text-gray-400 text-xs">
                        Bullet points will appear here
                      </li>
                    )}
                </ul>
              </div>
            )}
          </div>

          {/* EDITOR FOR ACTIVE SLIDE */}
          <div className="p-4 bg-white/85 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-[#226BFF]" />
              <h2 className="text-sm font-semibold">
                Edit Slide {slides.length ? `#${activeIndex + 1}` : ""}
              </h2>
            </div>

            {slides.length === 0 ? (
              <p className="text-xs text-gray-400">
                Generate slides to start editing.
              </p>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-600">
                    Slide Title
                  </label>
                  <input
                    value={activeSlide.title}
                    onChange={(e) =>
                      updateActiveSlide({ title: e.target.value })
                    }
                    className="mt-1 w-full text-sm border rounded-lg p-2 bg-white/80 outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-gray-600">
                      Bullet Points
                    </label>
                    <button
                      type="button"
                      onClick={addBullet}
                      className="text-[11px] text-blue-600 hover:underline"
                    >
                      + Add bullet
                    </button>
                  </div>

                  {activeSlide.bullets?.length === 0 ? (
                    <p className="text-[11px] text-gray-400">
                      No bullets yet. Click &ldquo;Add bullet&rdquo; to start.
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {activeSlide.bullets.map((b, idx) => (
                        <div key={idx} className="flex gap-2 items-start">
                          <span className="mt-2 text-[11px] text-gray-400">
                            •
                          </span>
                          <textarea
                            rows={2}
                            value={b}
                            onChange={(e) =>
                              handleBulletChange(e.target.value, idx)
                            }
                            className="flex-1 text-xs border rounded-lg p-2 bg-white/80 outline-none focus:ring-1 focus:ring-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => removeBullet(idx)}
                            className="text-[11px] text-gray-400 hover:text-red-500 px-1"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PPTGenerator;
