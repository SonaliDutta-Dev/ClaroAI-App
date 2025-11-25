# 🚀 **ClaroAI — Unified AI Productivity & Automation Platform**

*A cloud-native AI SaaS engineered for speed, scalability, and real-world productivity.*

ClaroAI is a full-stack AI platform that consolidates text intelligence, document understanding, video analysis, and image processing into a single modular interface.
Built using a PERN-based architecture, the platform integrates multimodal AI models, robust cloud services, and scalable database workflows to deliver a seamless end-to-end experience.

🔗 **Live Demo:** *https://claro-ai-app-wkvi.vercel.app*

---

## ⚡ **Core Capabilities**

### 📝 **AI Writing & Content Intelligence**

* Generate structured, human-readable articles
* Produce optimized blog titles & keyword clusters
* AI-powered caption generator (Bold, Sassy, Gen-Z, Classy styles)

### 📄 **Document Understanding**

* PDF Summarizer using contextual embedding + Gemini
* PDF Chat (stateful QnA over extracted content)
* Resume Analyzer with HR-grade insights

### 🎥 **Video Intelligence**

* YouTube Summarizer (transcript extraction + Gemini summary pipeline)
* Video QnA with memory context

### 🖼️ **Image Intelligence**

* Text-to-Image (FLUX / ClipDrop)
* Background Removal (AI segmentation API)
* Object Removal (Cloudinary gen_remove)
* OCR (Tesseract.js) for image → text
* Compression & Resizing (Sharp + Cloudinary streams)

### 🧠 **Study & Exam Tools**

* Exam Question Generator

  * Long/Short/MCQ
  * Difficulty scaling (Easy/Medium/Hard)
  * Topic-based generation pipeline

### 🌍 **Social Layer**

* Community feed displaying published AI images
* Like system powered by array-based metadata in PostgreSQL

---

# 🛠 **Engineering Stack**

### **Frontend**

* **React.js** – component-driven UI
* **TailwindCSS** – utility-first styling
* **Lucide Icons** – crisp, minimal icon system
* **Framer Motion** – interface animations
* **React Router DOM** – client-side routing
* **Axios** – HTTP client

---

### **Backend**

* **Node.js + Express.js** — service layer exposing AI micro-endpoints
* Modular controllers for:

  * Text generation
  * Image generation
  * PDF processing
  * OCR
  * YouTube pipeline
  * Media utilities

---

### **Database**

* **Neon PostgreSQL** (serverless)

  * Stores all creations: prompts, responses, images, summaries
  * Includes publish states, like arrays, timestamps
  * Scalable compute + branching for dev testing

---

### **Authentication & Access Control**

* **Clerk**

  * User auth (email/OAuth)
  * Tokenized API protection
  * User metadata (plan: free/premium)
  * Usage tracking + future billing-ready architecture

---

### **AI & Processing Pipelines**

#### 🔹 **Google Gemini API**

Used for:

* Article writing
* PDF chat + summarization
* Resume analysis
* YouTube summarization
* Caption generator
* Exam question generator
* Keyword intelligence

#### 🔹 **ClipDrop API**

Used for:

* Image generation
* Background removal
* Object removal (hybrid Cloudinary + ClipDrop pipeline)

#### 🔹 **YouTube Data API v3**

Used for:

* Transcript retrieval
* Metadata extraction
* Context building for video QnA

#### 🔹 **Cloudinary**

Used for:

* Image uploads
* URL generation
* AI transformations
* Hosting & optimization
* Object removal via `gen_remove`

#### 🔹 **Sharp**

Used for:

* Compression
* Resizing
* Format conversions
* Stream processing

#### 🔹 **Tesseract.js**

Used for OCR:

* Extracting text from images
* Processing scanned documents

---

## 🔐 **Security & Architecture Highlights**

* Route-level protection using **Clerk middleware**
* Environment-key protected AI endpoints
* Serverless PostgreSQL compute (Neon)
* File handling via **Multer + fs** (auto cleanup)
* Image pipelines using Cloudinary’s secure URLs
* Stateless + scalable backend deployed on Vercel

---

## 📦 **Deployment**

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** Neon Cloud
* **Media:** Cloudinary

---

## 📘 **Project Summary**

ClaroAI is engineered as a production-ready AI platform, not just a single-tool demo.
The architecture allows you to plug in new AI tools instantly, enabling this to scale into a full SaaS system with real subscription logic.

---

## 👩‍💻 **Author**

**Sonali Dutta**
AI & Web Developer | BCA 2026
Passionate about full-stack engineering, cloud workflows, and AI-driven user experiences.


