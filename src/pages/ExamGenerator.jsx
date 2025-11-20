import { useAuth } from '@clerk/clerk-react';
import { Sparkles, FileQuestion } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ExamGenerator = () => {
  const [topic, setTopic] = useState('');
  const [longCount, setLongCount] = useState(2);
  const [sortCount, setSortCount] = useState(2);
  const [mcqCount, setMcqCount] = useState(3);
  const [difficulty, setDifficulty] = useState('easy');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null);

  // New fields
  const [lqAns, setLqAns] = useState('');
  const [sqAns, setSqAns] = useState('');

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return toast.error('Enter a topic name');

    try {
      setLoading(true);

      const { data } = await axios.post(
        '/api/ai/exam-generator',
        {
          topic,
          longCount,
          sortCount,
          mcqCount,
          difficulty,
        },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setContent(data.content);
        setLqAns(data.lq);
        setSqAns(data.sq);
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6 flex flex-col lg:flex-row gap-6 text-[#1A1A1A]">
      {/* Left Form */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full lg:w-[420px] p-5 rounded-2xl bg-white/80 border border-gray-200 flex-shrink-0"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#FF7A3A]" />
          <h1 className="text-xl font-semibold">Exam Question Generator</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Topic / Unit Name</p>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 bg-white/70"
          placeholder="Enter topic name"
        />

        <div className="grid grid-cols-3 gap-3 mt-5">
          <div>
            <p className="text-sm">Long Qs</p>
            <input
              type="number"
              min="0"
              value={longCount}
              onChange={(e) => setLongCount(e.target.value)}
              className="w-full p-2 border rounded-md text-sm"
            />
          </div>

          <div>
            <p className="text-sm">Short Qs</p>
            <input
              type="number"
              min="0"
              value={sortCount}
              onChange={(e) => setSortCount(e.target.value)}
              className="w-full p-2 border rounded-md text-sm"
            />
          </div>

          <div>
            <p className="text-sm">MCQs</p>
            <input
              type="number"
              min="0"
              value={mcqCount}
              onChange={(e) => setMcqCount(e.target.value)}
              className="w-full p-2 border rounded-md text-sm"
            />
          </div>
        </div>

        <p className="mt-5 text-sm">Difficulty</p>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full p-2 mt-2 border rounded-md text-sm bg-white/70"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-4 py-2 mt-6 text-sm rounded-lg"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <FileQuestion className="w-5" />
          )}
          Generate Questions
        </button>
      </form>

      {/* Right side output */}
      <div className="w-full max-w-2xl p-5 rounded-2xl bg-white/80 border border-gray-200 overflow-y-auto min-h-[400px]">
        <div className="flex items-center gap-3">
          <FileQuestion className="w-5 h-5 text-[#FF7A3A]" />
          <h1 className="text-xl font-semibold">Generated Questions</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center mt-10 text-gray-400 text-sm">
            No questions generated yet
          </div>
        ) : (
          <div className="mt-4 space-y-5 text-sm text-[#1A1A1A]">
            {/* LONG QUESTIONS */}
            <div>
              <h2 className="font-semibold mb-2">Long Questions</h2>
              {content.long?.map((q, idx) => (
                <div key={idx} className="p-2 border rounded-md mb-2 bg-white/90">
                  {q.q}
                </div>
              ))}

              {/* LQ ANSWER */}
              {lqAns && (
                <div className="mt-2 p-3 border rounded-md bg-orange-50">
                  <p className="font-medium mb-1">Long Q Answer:</p>
                  <pre className="whitespace-pre-wrap text-xs">{lqAns}</pre>
                </div>
              )}
            </div>

            {/* SHORT QUESTIONS */}
            <div>
              <h2 className="font-semibold mb-2">Short Questions</h2>
              {content.sort?.map((q, idx) => (
                <div key={idx} className="p-2 border rounded-md mb-2 bg-white/90">
                  {q.q}
                </div>
              ))}

              {/* SQ ANSWER */}
              {sqAns && (
                <div className="mt-2 p-3 border rounded-md bg-orange-50">
                  <p className="font-medium mb-1">Short Q Answer:</p>
                  <pre className="whitespace-pre-wrap text-xs">{sqAns}</pre>
                </div>
              )}
            </div>

            {/* MCQs */}
            <div>
              <h2 className="font-semibold mb-2">MCQs</h2>
              {content.mcq?.map((q, idx) => (
                <div key={idx} className="p-2 border rounded-md mb-3 bg-white/90">
                  <p className="font-medium">{q.q}</p>
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    {q.options.map((opt, idx2) => (
                      <li key={idx2}>{opt}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs text-gray-500">Correct: {q.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamGenerator;
