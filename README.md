# 🚀 **ClaroAI — Unified AI Productivity & Automation Platform**

*A cloud-native AI SaaS platform built for students, creators, and professionals to work smarter — not harder.*

**ClaroAI** is a full-stack, production-ready AI SaaS that brings together writing, study, image processing, document intelligence, and career tools into **one centralized platform**.
Instead of jumping between multiple AI websites, users get **everything under a single login with usage control and subscription support**.

🔗 **Live Demo:** [https://claro-ai-app-wkvi.vercel.app](https://claro-ai-app-wkvi.vercel.app)

---

## 🆕 **What’s New & Working**

✔ Fully functional **subscription system (Free & Premium)**
✔ **Credit-based usage tracking** per user
✔ Secure **plan-based feature access**
✔ Premium-only AI tools enforced at backend
✔ Real-time usage control via Clerk metadata
✔ Scalable SaaS architecture ready for monetization

---

## ⚡ **Core Capabilities**

### 📝 **AI Writing & Content Intelligence**

* AI Article Writer (structured & human-readable)
* Blog Title Generator
* Keyword Generator
* AI Caption Generator
  *(Bold, Sassy, Gen-Z, Classy styles)*

---

### 📄 **Document Understanding**

* **PDF Summarizer** (Gemini-powered)
* **PDF Chat** (Ask questions from uploaded PDFs)
* **Resume Reviewer** with HR-style analysis

---

### 🎥 **Video Intelligence**

* **YouTube Summarizer**
* Video-based QnA using transcript + context memory

---

### 🖼️ **Image Intelligence**

* AI Text-to-Image Generation
* Background Removal
* Object Removal (AI-based)
* OCR (Image → Text)
* Image Compression & Resizing
  *(format, quality & size control)*

---

### 🧠 **Study & Exam Tools**

* **Exam Question Generator**

  * Long / Short / MCQ
  * Easy / Medium / Hard difficulty
  * Topic-based generation

---

### 🌍 **Community Layer**

* Publish AI-generated images
* Community showcase feed
* Like system backed by PostgreSQL metadata

---

## 💳 **Subscription & Access Control**

ClaroAI is built as a **true SaaS platform**, not a demo project.

### 🔐 Plan Logic

* **Free Plan**

  * Limited credits
  * Basic AI tools
* **Premium Plan**

  * Unlimited / extended usage
  * Advanced AI tools (Image Gen, PDF Chat, Resume Review, etc.)

### ⚙ How it works

* Authentication handled via **Clerk**
* Plan & credit data stored in **Clerk private metadata**
* Backend middleware enforces:

  * Feature locking
  * Usage limits
  * Premium-only access

---

## 🛠 **Technology Stack**

### **Frontend**

* React.js
* Tailwind CSS
* Framer Motion
* Lucide Icons
* Axios
* React Router DOM

---

### **Backend**

* Node.js
* Express.js (REST APIs)
* Modular controller-based architecture

---

### **Database**

* **Neon PostgreSQL (Serverless)**

  * Stores users, prompts, responses, images
  * Tracks history, likes, publish state
  * Scalable & cloud-native

---

### **Authentication**

* **Clerk**

  * Secure login (Email/OAuth)
  * Session handling
  * Subscription metadata
  * Credit tracking
  * Future billing-ready

---

### **AI & Processing APIs**

#### 🧠 Google Gemini 2.0 Flash

Used for:

* Text generation
* PDF summarization & chat
* Resume analysis
* Exam question generation
* YouTube summarization
* Caption & keyword generation

#### 🖼️ ClipDrop API

Used for:

* Image generation
* Background removal

#### ☁ Cloudinary

Used for:

* Image uploads
* Secure hosting
* AI transformations
* Object removal (`gen_remove`)
* Optimized delivery

#### ⚙ Sharp

* Image compression
* Resizing
* Format conversion

#### 🔎 Tesseract.js

* OCR (Image to text)

---

## 🔐 **Security & Architecture Highlights**

* Route-level protection using Clerk middleware
* Environment-variable secured APIs
* Premium checks enforced server-side
* Auto-cleanup for uploaded files
* Stateless, scalable backend design

---

## 🚀 **Deployment**

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** Neon PostgreSQL
* **Media Storage:** Cloudinary

---

## 📘 **Project Summary**

ClaroAI is designed as a **real-world AI SaaS**, not just a college project.
It demonstrates:

* Practical AI integration
* Subscription logic
* Secure backend enforcement
* Cloud scalability
* Modular, extensible architecture

The platform is ready to scale with **new AI tools, real billing, and enterprise features**.

---

## 👩‍💻 **Author**

**Sonali Dutta**
AI & Web Developer | BCA 2026
Passionate about full-stack engineering, cloud workflows, and AI-driven user experiences.


