import React, { useState, useRef } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { FileText, LayoutTemplate, Download } from "lucide-react";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const experienceLevels = ["Fresher", "Junior", "Mid-level", "Senior", "Lead"];

export default function ResumeBuilder() {
  const { getToken } = useAuth();

  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Fresher");
  const [experienceYears, setExperienceYears] = useState("");
  const [skills, setSkills] = useState("");
  const [techStack, setTechStack] = useState("");
  const [projects, setProjects] = useState("");
  const [education, setEducation] = useState("");
  const [extras, setExtras] = useState("");

  const [loading, setLoading] = useState(false);
  const [markdown, setMarkdown] = useState("");
  const [sections, setSections] = useState(null);
  const [view, setView] = useState("design"); // "design" | "ats"

  const resumeRef = useRef(null);

  // ----------------------- GENERATE RESUME -----------------------
  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axios.post(
        "/api/ai/generate-resume",
        {
          fullName,
          jobTitle,
          email,
          phone,
          location,
          experienceLevel,
          experienceYears,
          skills,
          techStack,
          projects,
          education,
          extras,
        },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (!data.success) {
        toast.error(data.message || "Failed to generate resume");
        return;
      }

      setMarkdown(data.markdown || "");
      setSections(data.sections || null);
      toast.success("Resume ready!");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error generating resume");
    } finally {
      setLoading(false);
    }
  };

  // ----------------------- DOWNLOAD AS PDF -----------------------
const handleDownloadPdf = () => {
  if (!sections) return toast.error("Generate resume first!");

  const printArea = document.getElementById("resume-print-area");
  if (!printArea) return toast.error("Nothing to print!");

  // Copy content to a clean printable window
  const win = window.open("", "_blank");

  win.document.write(`
    <html>
      <head>
        <title>Resume</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            font-family: sans-serif;
          }
          #resume {
            width: 210mm;
            min-height: 297mm;
            padding: 20mm;
            box-sizing: border-box;
          }
        </style>
      </head>
      <body>
        <div id="resume">${printArea.innerHTML}</div>
      </body>
    </html>
  `);

  win.document.close();

  setTimeout(() => {
    win.print();
    win.close();
  }, 300);
};

  // ----------------------- UI -----------------------
  return (
    <div className="h-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6 text-slate-800 overflow-hidden">

      {/* LEFT PANEL (FORM) */}
      <form
        onSubmit={handleGenerate}
        className="lg:min-w-[360px] lg:max-w-[420px] w-full p-5 bg-white/90 
        rounded-2xl border border-gray-200 shadow-md space-y-4 max-h-[calc(100vh-120px)] 
        overflow-y-auto"
      >
        <div className="flex items-center gap-2 mb-1">
          <FileText className="w-5 h-5 text-blue-600" />
          <h1 className="text-xl font-semibold">AI Resume Builder</h1>
        </div>
        <p className="text-xs text-slate-500">
          Fill the basics, AI writes the rest: summary, bullets & structure.
        </p>

        <Input label="Full Name *" value={fullName} set={setFullName} req />
        <Input
          label="Target Role *"
          value={jobTitle}
          set={setJobTitle}
          req
          placeholder="MERN Stack Developer | Frontend Developer"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input label="Email *" value={email} set={setEmail} req placeholder="you@example.com" />
          <Input label="Phone" value={phone} set={setPhone} placeholder="+91 98765 43210" />
        </div>

        <Input label="Location" value={location} set={setLocation} placeholder="Delhi, India" />

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Experience level"
            value={experienceLevel}
            set={setExperienceLevel}
            options={experienceLevels}
          />
          <Input label="Years" value={experienceYears} set={setExperienceYears} placeholder="0, 1, 2..." />
        </div>

        <Text
          label="Skills"
          value={skills}
          set={setSkills}
          placeholder="React, Node.js, MongoDB, Tailwind, Git..."
        />
        <Text
          label="Tech stack / tools"
          value={techStack}
          set={setTechStack}
          placeholder="VS Code, Figma, Postman, GitHub..."
        />
        <Text
          label="Projects (brief notes)"
          value={projects}
          set={setProjects}
          rows={3}
          placeholder={`Claro AI – full-stack AI SaaS\nPortfolio – responsive dev portfolio\n...`}
        />
        <Text
          label="Education"
          value={education}
          set={setEducation}
          placeholder="BCA – College name, CGPA / percentage"
        />
        <Text
          label="Extras (certs, links, etc.)"
          value={extras}
          set={setExtras}
          placeholder="GitHub, LeetCode, certifications..."
        />

        <button
          disabled={loading}
          className="w-full mt-3 py-2 text-sm rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60"
          type="submit"
        >
          {loading ? "Thinking..." : "Generate Resume"}
        </button>
      </form>

      {/* RIGHT PANEL — PREVIEW */}
      <div className="flex-1 p-4 sm:p-5 bg-white/90 rounded-2xl border border-gray-200 shadow-md flex flex-col gap-4 overflow-hidden">
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Resume Preview</h2>
          </div>

          <div className="flex gap-2 text-xs sm:text-sm">
            <button
              onClick={() => setView("design")}
              className={`px-3 py-1 rounded-full border ${
                view === "design"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white border-gray-300 text-gray-700"
              }`}
            >
              Styled
            </button>
            <button
              onClick={() => setView("ats")}
              className={`px-3 py-1 rounded-full border ${
                view === "ats"
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white border-gray-300 text-gray-700"
              }`}
            >
              ATS
            </button>
            <button
              onClick={handleDownloadPdf}
              disabled={!sections}
              className="px-3 py-1 rounded-full border bg-white hover:bg-gray-100 flex items-center gap-1 disabled:opacity-50"
            >
              <Download className="w-3 h-3" />
              PDF
            </button>
          </div>
        </div>

        <div className="text-[11px] text-slate-500">
          {view === "design"
            ? "Styled one-page resume. Download as PDF for applying."
            : "Pure text version for ATS scanners / Naukri / LinkedIn."}
        </div>

        {/* PREVIEW CONTENT */}
        <div className="flex-1 border border-slate-100 rounded-xl bg-slate-50/70 p-3 sm:p-4 overflow-auto">
          {!markdown ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm">
              <FileText className="w-8 h-8 mb-3" />
              <p>Fill the form on the left & click "Generate Resume".</p>
            </div>
          ) : view === "ats" ? (
            <div className="bg-white rounded-lg shadow-inner p-3 sm:p-4 text-xs sm:text-sm whitespace-pre-wrap break-words">
              <Markdown>{markdown}</Markdown>
            </div>
          ) : (
            // STYLED RESUME (this is what gets converted to PDF)
            <div className="flex justify-center">
              <div
                ref={resumeRef}
                id="resume-print-area"
                className="w-full max-w-[800px] bg-white border border-gray-200 shadow-sm rounded-xl px-6 sm:px-8 py-6 text-[13px] sm:text-[14px] leading-relaxed break-words"
              >
                {/* HEADER */}
                <div className="border-b border-slate-200 pb-3 mb-4">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {fullName || "Your Name"}
                  </h1>
                  <p className="text-[13px] text-blue-600 font-medium">
                    {jobTitle || "Your Target Role"}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-600">
                    {email && <span>{email}</span>}
                    {phone && <span>{phone}</span>}
                    {location && <span>{location}</span>}
                  </div>
                </div>

                {/* SUMMARY */}
                {sections?.summary && (
                  <Section title="SUMMARY">
                    <p className="text-[12px] text-gray-700">
                      {sections.summary}
                    </p>
                  </Section>
                )}

                {/* EXPERIENCE */}
                {sections?.experience?.length > 0 && (
                  <Section title="EXPERIENCE">
                    <div className="space-y-3">
                      {sections.experience.map((exp, i) => (
                        <div key={i}>
                          <div className="flex justify-between gap-2 text-[12px] font-semibold text-gray-900">
                            <span>
                              {exp.role}
                              {exp.company && (
                                <span className="text-gray-500"> · {exp.company}</span>
                              )}
                            </span>
                            <span className="text-[11px] text-gray-500 whitespace-nowrap">
                              {exp.start} – {exp.end}
                            </span>
                          </div>
                          {exp.location && (
                            <div className="text-[11px] text-gray-500">
                              {exp.location}
                            </div>
                          )}
                          {Array.isArray(exp.points) && exp.points.length > 0 && (
                            <ul className="list-disc ml-4 mt-1 space-y-1 text-[11px] text-gray-700 break-words">
                              {exp.points.map((p, j) => (
                                <li key={j}>{p}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </Section>
                )}

                {/* PROJECTS */}
                {sections?.projects?.length > 0 && (
                  <Section title="PROJECTS">
                    <div className="space-y-3">
                      {sections.projects.map((proj, i) => (
                        <div key={i}>
                          <div className="flex justify-between gap-2 text-[12px] font-semibold text-gray-900">
                            <span>{proj.name}</span>
                            {proj.link && (
                              <a
                                href={proj.link}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[11px] text-blue-600 underline"
                              >
                                Link
                              </a>
                            )}
                          </div>
                          {proj.tech?.length > 0 && (
                            <div className="text-[11px] text-gray-500">
                              {proj.tech.join(" • ")}
                            </div>
                          )}
                          {Array.isArray(proj.points) && proj.points.length > 0 && (
                            <ul className="list-disc ml-4 mt-1 space-y-1 text-[11px] text-gray-700 break-words">
                              {proj.points.map((p, j) => (
                                <li key={j}>{p}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </Section>
                )}

                {/* SKILLS */}
                {sections?.skills && (
                  <Section title="SKILLS">
                    <div className="space-y-1 text-[11px] text-gray-700 break-words">
                      {sections.skills.primary?.length > 0 && (
                        <p>
                          <span className="font-semibold">Primary: </span>
                          {sections.skills.primary.join(" • ")}
                        </p>
                      )}
                      {sections.skills.secondary?.length > 0 && (
                        <p>
                          <span className="font-semibold">Secondary: </span>
                          {sections.skills.secondary.join(" • ")}
                        </p>
                      )}
                    </div>
                  </Section>
                )}

                {/* EDUCATION */}
                {sections?.education?.length > 0 && (
                  <Section title="EDUCATION">
                    <div className="space-y-2 text-[11px] text-gray-700">
                      {sections.education.map((ed, i) => (
                        <div key={i}>
                          <div className="font-semibold text-gray-900">
                            {ed.degree}
                          </div>
                          <div className="text-gray-600">
                            {ed.school}
                            {ed.year && ` · ${ed.year}`}
                          </div>
                          {ed.extra && (
                            <div className="text-gray-600">{ed.extra}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </Section>
                )}

                {/* EXTRAS */}
                {sections?.extras?.length > 0 && (
                  <Section title="EXTRAS">
                    <ul className="list-disc ml-4 space-y-1 text-[11px] text-gray-700 break-words">
                      {sections.extras.map((x, i) => (
                        <li key={i}>{x}</li>
                      ))}
                    </ul>
                  </Section>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------ Small Reusable Components ------------------ */

const Input = ({ label, value, set, req, placeholder }) => (
  <div>
    <p className="text-sm font-medium">{label}</p>
    <input
      required={req}
      value={value}
      onChange={(e) => set(e.target.value)}
      placeholder={placeholder}
      className="w-full mt-1 p-2 text-sm border rounded-lg bg-white/80"
    />
  </div>
);

const Text = ({ label, value, set, rows = 2, placeholder }) => (
  <div>
    <p className="text-sm font-medium">{label}</p>
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => set(e.target.value)}
      placeholder={placeholder}
      className="w-full mt-1 p-2 text-sm border rounded-lg bg-white/80"
    />
  </div>
);

const Select = ({ label, value, set, options }) => (
  <div>
    <p className="text-sm font-medium">{label}</p>
    <select
      value={value}
      onChange={(e) => set(e.target.value)}
      className="w-full mt-1 p-2 text-sm border rounded-lg bg-white/80"
    >
      {options.map((op) => (
        <option key={op}>{op}</option>
      ))}
    </select>
  </div>
);

const Section = ({ title, children }) => (
  <section className="mb-4 last:mb-0">
    <h3 className="text-[12px] font-semibold tracking-[0.12em] text-gray-700 mb-1.5">
      {title}
    </h3>
    {children}
  </section>
);
