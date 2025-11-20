import { useAuth } from '@clerk/clerk-react';
import { Hash, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {
  const blogCategories = [
    'General', 'Technology', 'Business', 'Health',
    'Lifestyle', 'Education', 'Travel', 'Food'
  ];

  const [selectedCategory, setSelectedCategory] = useState('General');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(
        '/api/ai/generate-blog-title',
        { topic: input, category: selectedCategory },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex flex-col lg:flex-row gap-6 
        text-[#1A1A1A]">

      {/* FORM PANEL */}
      <form
        onSubmit={onSubmitHandler}
        className="
          w-full max-w-lg p-5 rounded-2xl border border-gray-200 shadow-sm
          bg-white/80 backdrop-blur-md
        "
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-purple-500" />
          <h1 className="text-xl font-semibold">AI Title Generator</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Keyword</p>

        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="The future of Artificial Intelligence is ..."
          className="
            w-full p-2 px-3 mt-2 text-sm rounded-md outline-none
            border border-gray-300 bg-white/70
          "
          required
        />

        <p className="mt-5 text-sm font-medium">Category</p>

        <div className="mt-3 flex gap-3 flex-wrap">
          {blogCategories.map((item) => (
            <span
              key={item}
              onClick={() => setSelectedCategory(item)}
              className={`
                text-xs px-4 py-1 rounded-full border cursor-pointer transition
                ${
                  selectedCategory === item
                    ? 'bg-purple-100 text-purple-700 border-purple-300'
                    : 'text-gray-500 border-gray-300 hover:bg-gray-100'
                }
              `}
            >
              {item}
            </span>
          ))}
        </div>

        <button
          disabled={loading}
          className="
            w-full mt-7 px-4 py-2 text-sm rounded-lg text-white
            bg-gradient-to-r from-purple-500 to-fuchsia-500
            shadow-[0_0_12px_rgba(150,100,255,0.25)]
            flex justify-center items-center gap-2
            hover:scale-105 active:scale-95 transition
          "
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
          ) : (
            <Hash className="w-5" />
          )}
          Generate Title
        </button>
      </form>

      {/* RESULT PANEL */}
      <div
        className="
          w-full max-w-lg p-5 rounded-2xl border border-gray-200 shadow-sm
          bg-white/80 backdrop-blur-md flex flex-col
          min-h-[400px] max-h-[600px] overflow-y-scroll
        "
      >
        <div className="flex items-center gap-3">
          <Hash className="w-5 h-5 text-purple-500" />
          <h1 className="text-xl font-semibold">Generated Titles</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-4 text-gray-400">
              <Hash className="w-9 h-9" />
              <p>Enter a topic and click “Generate Title” to get started</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 text-sm text-[#333] leading-relaxed">
            <Markdown>{content}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogTitles;
