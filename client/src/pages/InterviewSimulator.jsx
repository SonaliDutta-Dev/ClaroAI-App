import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import ReactMarkdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "MERN Developer",
  "AI / ML Engineer",
  "HR",
  "Sales Executive",
  "Manager",
];

const levels = ["Easy", "Medium", "Hard", "Senior"];

export default function InterviewSimulator() {
  const { getToken } = useAuth();

  const [role, setRole] = useState("Frontend Developer");
  const [difficulty, setDifficulty] = useState("Medium");
  const [answer, setAnswer] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        "/api/ai/interview",
        { role, difficulty, answer },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (!data.success) return toast.error(data.message);

      setChat((prev) => [...prev, data.message]);
      setAnswer("");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6 flex flex-col lg:flex-row gap-6">

      {/* LEFT PANEL */}
      <div className="lg:w-[420px] w-full p-5 bg-white/80 backdrop-blur-lg 
          rounded-2xl border border-gray-200 shadow-sm">

        <h1 className="text-xl font-semibold mb-4 flex items-center gap-2">
          🎤 Interview Simulator
        </h1>

        {/* ROLE */}
        <p className="text-sm font-medium">Select Role</p>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mt-2 border rounded-lg bg-white/70 text-sm"
        >
          {roles.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>

        {/* DIFFICULTY */}
        <p className="mt-5 text-sm font-medium">Select Difficulty</p>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full p-2 mt-2 border rounded-lg bg-white/70 text-sm"
        >
          {levels.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        {/* ANSWER */}
        <p className="mt-5 text-sm font-medium">Your Answer</p>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer..."
          rows={4}
          className="w-full p-3 mt-2 text-sm border rounded-lg bg-white/70"
        />

        {/* BUTTON */}
        <button
          onClick={send}
          disabled={loading}
          className="w-full mt-6 py-2 bg-gradient-to-r from-green-600 to-green-400 
                   text-white rounded-lg shadow flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin" />
          ) : (
            "Send"
          )}
        </button>
      </div>

      {/* RIGHT CHAT PANEL */}
      <div className="flex-1 p-5 bg-white/80 backdrop-blur-lg rounded-2xl 
                      border border-gray-200 shadow-sm min-h-[400px] flex flex-col">

        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-xl font-semibold">Interview Chat</h2>
        </div>

        {/* CHAT SCROLL AREA */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4">

          {chat.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full 
                           text-gray-400 text-sm">
              <span className="text-4xl mb-3">💬</span>
              Chat will appear here
            </div>
          ) : (
            chat.map((c, i) => (
              <div
                key={i}
                className="p-4 bg-gray-50 border rounded-lg text-sm shadow-sm 
                           break-words whitespace-pre-wrap"
              >
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{c}</ReactMarkdown>
                </div>
              </div>
            ))
          )}

        </div>
      </div>

    </div>
  );
}
