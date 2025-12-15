import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">

        {/* 🔙 Back to Home */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 text-sm text-purple-600 hover:underline"
        >
          ← Back to Home
        </button>

        {/* Title */}
        <h1 className="text-4xl font-bold text-purple-700 mb-4">
          About ClaroAI
        </h1>

        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          <span className="font-semibold text-purple-600">ClaroAI</span> is a
          unified AI-powered productivity platform designed to simplify how
          students, creators, and professionals work with AI.
          Instead of switching between multiple tools, ClaroAI brings everything
          together in one secure, fast, and scalable SaaS solution.
        </p>

        {/* Mission */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-700 mb-3">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The mission of ClaroAI is to make AI accessible, practical, and
            impactful for everyday use. We focus on real-world problems like
            productivity loss, scattered tools, and inefficient workflows by
            delivering smart AI tools under one platform.
          </p>
        </section>

        {/* What We Offer */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-700 mb-3">
            What ClaroAI Offers
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>AI-powered content writing & caption generation</li>
            <li>PDF summarization and document-based QnA</li>
            <li>YouTube video summarization and chat</li>
            <li>Image generation, editing, OCR, and compression</li>
            <li>Exam question generator for last-moment preparation</li>
            <li>Career tools like resume review and mock interviews</li>
          </ul>
        </section>

        {/* Technology */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-700 mb-3">
            Technology & Architecture
          </h2>
          <p className="text-gray-700 leading-relaxed">
            ClaroAI is built using the{" "}
            <span className="font-medium">PERN stack</span>
            (PostgreSQL, Express, React, Node.js) and integrates advanced AI APIs
            such as Google Gemini, ClipDrop, Cloudinary, and Tesseract.js.
            Authentication, subscriptions, and usage tracking are handled
            securely using Clerk.
          </p>
        </section>

        {/* SaaS Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-700 mb-3">
            Built as a SaaS Platform
          </h2>
          <p className="text-gray-700 leading-relaxed">
            ClaroAI is designed as a scalable SaaS application with free and
            premium plans. Users can track their credits, manage subscriptions,
            and access advanced AI tools based on their plan — making the
            platform ready for real-world deployment.
          </p>
        </section>

        {/* Footer */}
        <div className="border-t pt-6 mt-10 text-center">
          <p className="text-gray-600">
            Built with ❤️ by{" "}
            <span className="font-semibold text-purple-700">
              Sonali Dutta
            </span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            AI & Full-Stack Developer | ClaroAI
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;
