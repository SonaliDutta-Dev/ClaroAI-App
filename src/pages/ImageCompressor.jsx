import React, { useState } from "react";
import axios from "axios";
import { Loader2, Download, ImageIcon, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";

const ImageCompressor = () => {
  const { getToken } = useAuth();

  const [file, setFile] = useState(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState("jpeg");
  const [preset, setPreset] = useState("custom");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const applyPreset = (type) => {
    setPreset(type);
    if (type === "small") {
      setWidth("1920");
      setHeight("");
      setQuality(90);
    } else if (type === "medium") {
      setWidth("1280");
      setHeight("");
      setQuality(70);
    } else if (type === "large") {
      setWidth("800");
      setHeight("");
      setQuality(50);
    } else {
      setWidth("");
      setHeight("");
      setQuality(80);
    }
  };

  const onUpload = async () => {
    if (!file) return toast.error("Please upload an image");
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("width", width);
      formData.append("height", height);
      formData.append("quality", quality);
      formData.append("format", format);

      const { data } = await axios.post(
        "/api/ai/compress-resize-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!data.success) return toast.error(data.message || "Failed");
      setResult(data.content);
    } catch (err) {
      console.error(err);
      toast.error("Error processing image");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(result, { mode: "cors" });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `compressed.${format}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      toast.error("Download failed");
    }
  };

  return (
    <div className="min-h-screen overflow-y-auto p-4 flex flex-col lg:flex-row gap-6 text-slate-700">

      {/* LEFT */}
      <div className="lg:w-1/2 w-full p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#7C3AED]" />
          <h1 className="text-xl font-semibold">Image Compressor & Resizer</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload Image</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full p-2 mt-2 border rounded-md"
        />

        <p className="mt-4 text-sm font-medium">Presets</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {["small", "medium", "large", "custom"].map((p) => (
            <button
              key={p}
              onClick={() => applyPreset(p)}
              className={`px-3 py-1 text-sm whitespace-nowrap rounded-md border ${
                preset === p ? "bg-purple-600 text-white" : "bg-gray-100"
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        {preset === "custom" && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div>
              <p className="text-sm font-medium mb-1">Width (px)</p>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="auto"
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Height (px)</p>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="auto"
              />
            </div>

            <div>
              <p className="text-sm font-medium mb-1">Quality: {quality}%</p>
              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <p className="text-sm font-medium mb-1">Format</p>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="jpeg">JPEG</option>
                <option value="png">PNG</option>
                <option value="webp">WEBP</option>
              </select>
            </div>
          </div>
        )}

        <button
          disabled={loading}
          onClick={onUpload}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#7C3AED] to-[#4C1D95] text-white px-4 py-2 mt-6 text-sm rounded-lg"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 my-1 animate-spin" />
          ) : (
            <ImageIcon className="w-5" />
          )}
          Compress & Resize
        </button>
      </div>

      {/* RIGHT */}
      <div className="lg:w-1/2 w-full p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#7C3AED]" />
            <h1 className="text-xl font-semibold">Preview & Download</h1>
          </div>

          {result && (
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 text-sm px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
            >
              <Download className="w-4 h-4" /> Download
            </button>
          )}
        </div>

        <div className="mt-3 w-full flex-1 p-3 border border-gray-200 rounded-md bg-gray-50 overflow-y-auto flex justify-center items-center">
          {loading ? (
            <span className="w-6 h-6 rounded-full border-4 border-t-transparent border-gray-400 animate-spin"></span>
          ) : !result ? (
            <div className="text-sm flex flex-col items-center gap-2 text-gray-400">
              <ImageIcon className="w-9 h-9" />
              <p>Upload an image and click "Compress & Resize"</p>
            </div>
          ) : (
            <img
              src={result}
              alt="Preview"
              className="w-full h-auto max-w-full mx-auto rounded-md"
            />
          )}
        </div>
      </div>

    </div>
  );
};

export default ImageCompressor;
