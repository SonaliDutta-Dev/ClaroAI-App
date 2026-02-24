import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  console.error("❌ Clerk Publishable Key missing");
}

createRoot(document.getElementById("root")).render(
<ClerkProvider
  publishableKey={PUBLISHABLE_KEY}
  appearance={{
    layout: {
      shimmer: false,
    },
    elements: {
      rootBox: "clerk-container",
      card: "clerk-card",
      footer: "clerk-footer",
      formButtonPrimary: "clerk-btn",
    }
  }}
>

    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>
);