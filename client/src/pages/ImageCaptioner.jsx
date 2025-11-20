import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import { Camera, Copy, Download, Sparkles } from "lucide-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const DEFAULT_STYLES = [
  "Bold", "Sassy", "Gen-Z", "Poetic", "Classy", "Emotional",
  "Minimal", "Funny", "Aesthetic", "Formal", "Filmy",
  "Cute", "Travel vibe", "Tech vibe",
];

const DEFAULT_LENGTHS = ["5-7 words", "one-liner", "2-3 lines", "long"];

export default function ImageCaptioner() {
  const { getToken } = useAuth();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [styles, setStyles] = useState(DEFAULT_STYLES);
  const [selectedLength, setSelectedLength] = useState("one-liner");
  const [captions, setCaptions] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setCaptions(null);
    setImageUrl(null);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Upload an image first");

    try {
      setLoading(true);

      const token = await getToken();
      const fd = new FormData();
      fd.append("image", file);
      fd.append("length", selectedLength);

      const { data } = await axios.post("/api/ai/image-caption", fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        timeout: 120000,
      });

      if (!data.success) return toast.error(data.message);

      setCaptions(data.captions);
      setImageUrl(data.imageUrl);
      toast.success("Captions ready ✨");
    } catch (err) {
      toast.error("Error generating captions");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (txt) => {
    try {
      await navigator.clipboard.writeText(txt);
      toast.success("Copied");
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <div className="h-full p-6 flex flex-col lg:flex-row gap-6">

      {/* LEFT PANEL */}
      <form
        onSubmit={submit}
        className="lg:w-[380px] w-full p-5 bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-sm"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="text-[#7C3AED] w-6" />
          <h2 className="text-xl font-semibold">Image → Captions</h2>
        </div>

        {/* Upload */}
        <label className="mt-6 flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed rounded-xl bg-white/70 hover:bg-gray-50 cursor-pointer">
          <Camera className="w-8 h-8 text-gray-400" />
          <p className="text-sm text-gray-600">Click or drag an image</p>
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>

        {preview && (
          <div className="mt-3">
            <img src={preview} className="rounded-lg w-full" />
            <button
              onClick={() => {
                setPreview(null);
                setFile(null);
                setCaptions(null);
              }}
              type="button"
              className="mt-2 text-sm px-3 py-1 bg-gray-100 rounded"
            >
              Remove
            </button>
          </div>
        )}

        {/* Length */}
        <p className="mt-6 text-sm font-medium">Caption Length</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {DEFAULT_LENGTHS.map((l) => (
            <button
              type="button"
              key={l}
              onClick={() => setSelectedLength(l)}
              className={`px-3 py-1 text-sm rounded border 
              ${selectedLength === l ? "bg-purple-600 text-white" : "bg-gray-50"}`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Styles */}
        <p className="mt-6 text-sm font-medium">Caption Styles</p>
        <div className="grid grid-cols-2 gap-2 mt-2 max-h-48 overflow-auto">
          {DEFAULT_STYLES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() =>
                setStyles((prev) =>
                  prev.includes(s) ? prev.filter((p) => p !== s) : [...prev, s]
                )
              }
              className={`px-2 py-1 text-sm rounded border text-left 
              ${styles.includes(s) ? "bg-purple-600 text-white" : "bg-gray-100"}`}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          disabled={loading}
          className="w-full mt-6 bg-gradient-to-r from-[#7C3AED] to-[#4C1D95] text-white rounded-lg py-2"
        >
          {loading ? "Generating..." : "Generate Captions"}
        </button>
      </form>

      {/* RIGHT RESULT */}
      <div className="flex-1 bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-5 shadow-sm min-h-[350px]">
        {!captions ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <p>No captions yet — upload an image</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Generated Captions</h3>
              {imageUrl && (
                <a
                  href={imageUrl}
                  target="_blank"
                  className="px-3 py-1 border rounded bg-gray-50 text-sm flex items-center gap-1"
                >
                  <Download className="w-4" /> Image
                </a>
              )}
            </div>

            {styles.map((style) => (
              <div key={style} className="border p-4 rounded-lg bg-gray-50">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{style}</p>
                  <button
                    onClick={() => copyToClipboard(captions[style])}
                    className="p-1 border rounded bg-white"
                  >
                    <Copy className="w-4" />
                  </button>
                </div>

                <p className="mt-2 text-sm">{captions[style] || "—"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
