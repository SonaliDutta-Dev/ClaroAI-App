import { Image, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const imageStyle = [
    'Realistic', 'Ghibli style', 'Anime style', 'Cartoon style',
    'Fantasy style', 'Realistic style', '3D style', 'Portrait style'
  ];

  const [selectedStyle, setSelectedStyle] = useState('Realistic');
  const [input, setInput] = useState('');
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;

      // Generate AI Image
      const { data } = await axios.post(
        '/api/ai/generate-image',
        { prompt, publish },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setContent(data.content);

      // Save to DB
      await axios.post(
        '/api/user/save-creation',
        { prompt, content: data.content, type: 'image', publish },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      toast.success('Image generated successfully!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6 flex flex-col lg:flex-row gap-6">

      {/* LEFT PANEL */}
      <form
        onSubmit={onSubmitHandler}
        className="lg:w-[420px] w-full p-5 bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-6 text-[#00AD25]" />
          <h1 className="text-xl font-semibold">AI Image Generator</h1>
        </div>

        <p className="text-sm font-medium">Describe Your Image</p>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="w-full p-3 mt-2 border rounded-lg text-sm bg-white/70"
          placeholder="Describe the image you want..."
          required
        />

        <p className="mt-5 text-sm font-medium">Select Style</p>
        <div className="flex flex-wrap gap-3 mt-2">
          {imageStyle.map((s) => (
            <span
              key={s}
              onClick={() => setSelectedStyle(s)}
              className={`px-4 py-1 rounded-full text-xs border cursor-pointer transition 
              ${selectedStyle === s ? 
                'bg-green-100 border-green-500 text-green-700' : 
                'bg-gray-50 border-gray-300 text-gray-600'}
            `}
            >
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-6">
          <label className="relative cursor-pointer">
            <input type="checkbox" checked={publish}
              onChange={(e) => setPublish(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-green-500 transition"></div>
            <span className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-5"></span>
          </label>
          <p className="text-sm">Make Public</p>
        </div>

        <button
          disabled={loading}
          className="w-full mt-7 flex items-center justify-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white py-2 rounded-lg shadow-sm"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <Image className="w-5" />
          )}
          Generate Image
        </button>
      </form>

      {/* RIGHT OUTPUT */}
      <div className="flex-1 p-5 bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-sm min-h-[400px]">
        <div className="flex items-center gap-3 mb-3">
          <Image className="w-5 h-5 text-[#00AD25]" />
          <h2 className="text-xl font-semibold">Generated Image</h2>
        </div>

        {!content ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
            <Image className="w-10 h-10 mb-3" />
            Your generated image will appear here
          </div>
        ) : (
          <img
            src={content}
            className="w-full rounded-xl shadow mt-4"
            alt="Generated"
          />
        )}
      </div>
    </div>
  );
};

export default GenerateImages;
