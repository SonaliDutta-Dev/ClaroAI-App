import React from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Linkedin, Github } from "lucide-react";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">

        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 text-sm text-purple-600 hover:underline"
        >
          ← Back to Home
        </button>

        <h1 className="text-4xl font-bold text-purple-700 mb-4">
          Contact Us
        </h1>

        <p className="text-gray-700 mb-8">
          Have questions, feedback, or collaboration ideas?  
          Feel free to reach out — I’d love to connect.
        </p>

        <div className="space-y-5 text-gray-700">
          <div className="flex items-center gap-3">
            <Mail className="text-purple-600" />
            <span>sonalidutta45bonu@gmail.com</span>
          </div>

          <div className="flex items-center gap-3">
            <Linkedin className="text-purple-600" />
            <a
              href="https://www.linkedin.com/in/sonali-dutta-420a08362/"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              linkedin.com/in/sonali-dutta
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Github className="text-purple-600" />
            <a
              href="https://github.com/SonaliDutta-Dev"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              github.com/SonaliDutta-Dev
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
