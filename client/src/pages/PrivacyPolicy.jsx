import React from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">

        <button
          onClick={() => navigate("/")}
          className="mb-6 text-sm text-purple-600 hover:underline"
        >
          ← Back to Home
        </button>

        <h1 className="text-4xl font-bold text-purple-700 mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-700 mb-6">
          ClaroAI respects user privacy and is committed to protecting personal data.
          This platform is designed with security and transparency in mind.
        </p>

        <div className="space-y-6 text-gray-700">
          <div>
            <h2 className="font-semibold text-purple-700 mb-2">
              Data Collection
            </h2>
            <p>
              ClaroAI only collects necessary user information such as email and
              usage metadata required for authentication and service access.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-purple-700 mb-2">
              Data Usage
            </h2>
            <p>
              User data is used solely to provide AI-powered features, manage
              subscriptions, and improve platform performance.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-purple-700 mb-2">
              Security
            </h2>
            <p>
              Authentication and access control are securely handled using Clerk.
              No sensitive data is shared with third parties.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
