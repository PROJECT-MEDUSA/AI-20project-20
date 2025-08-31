import { useMemo, useState } from "react";
import { toast } from "sonner";

const THEMES = [
  { key: "purple", name: "Bluish Purple", from: "from-primary", to: "to-fuchsia-500" },
  { key: "blue", name: "Blue", from: "from-sky-500", to: "to-indigo-500" },
  { key: "green", name: "Green", from: "from-emerald-500", to: "to-teal-500" },
];

export default function PortfolioBuilder() {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [projects, setProjects] = useState<{ title: string; description: string }[]>([
    { title: "", description: "" },
  ]);
  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState(THEMES[0].key);
  const [font, setFont] = useState("Inter");

  const themeClass = useMemo(() => THEMES.find((t) => t.key === theme)!, [theme]);

  const addSkill = () => {
    const v = skillInput.trim();
    if (v) setSkills((s) => Array.from(new Set([...s, v])));
    setSkillInput("");
  };

  const updateProject = (idx: number, key: "title" | "description", val: string) => {
    setProjects((ps) => ps.map((p, i) => (i === idx ? { ...p, [key]: val } : p)));
  };

  const addProject = () => setProjects((ps) => [...ps, { title: "", description: "" }]);
  const reset = () => {
    setName("");
    setAbout("");
    setSkills([]);
    setProjects([{ title: "", description: "" }]);
    setEmail("");
  };

  const publish = () => {
    const link = `https://example.com/portfolio/${encodeURIComponent(name || "student")}`;
    toast.success(`Portfolio Published! Your link: ${link}`);
  };

  return (
    <section className="container py-10 md:py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Portfolio Builder – Create Your Personal Page</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">Customize your personal portfolio and preview changes live before publishing.</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* LEFT: form */}
        <form className="space-y-6">
          <div className="grid gap-4">
            <label className="text-sm font-medium">Name
              <input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-xl border bg-background px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </label>
            <label className="text-sm font-medium">About
              <textarea value={about} onChange={(e) => setAbout(e.target.value)} rows={4} className="mt-2 w-full rounded-xl border bg-background px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </label>
          </div>

          <div>
            <h3 className="text-sm font-medium">Skills</h3>
            <div className="mt-2 flex gap-2">
              <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" ? (e.preventDefault(), addSkill()) : null} placeholder="Type a skill and press Enter" className="flex-1 rounded-xl border bg-background px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              <button type="button" onClick={addSkill} className="rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-4 py-2 text-white">Add</button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="rounded-full border bg-secondary px-3 py-1 text-sm">{s}</span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium">Projects</h3>
            <div className="mt-2 space-y-4">
              {projects.map((p, i) => (
                <div key={i} className="rounded-xl border p-3">
                  <input value={p.title} onChange={(e) => updateProject(i, "title", e.target.value)} placeholder="Project title" className="mb-2 w-full rounded-md border px-3 py-2 text-sm" />
                  <textarea value={p.description} onChange={(e) => updateProject(i, "description", e.target.value)} placeholder="Short description" rows={3} className="w-full rounded-md border px-3 py-2 text-sm" />
                </div>
              ))}
            </div>
            <button type="button" onClick={addProject} className="mt-2 rounded-full border px-4 py-2 text-sm">Add Project</button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium">Contact Email
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-2 w-full rounded-xl border bg-background px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </label>
            <div>
              <label className="text-sm font-medium">Theme</label>
              <select value={theme} onChange={(e) => setTheme(e.target.value)} className="mt-2 w-full rounded-xl border bg-background px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-ring">
                {THEMES.map((t) => (
                  <option key={t.key} value={t.key}>{t.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Font</label>
              <select value={font} onChange={(e) => setFont(e.target.value)} className="mt-2 w-full rounded-xl border bg-background px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Inter</option>
                <option>System UI</option>
                <option>Georgia</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button type="button" className="rounded-full border px-5 py-2 font-medium">Preview</button>
            <button type="button" onClick={publish} className={`rounded-full bg-gradient-to-r ${themeClass.from} ${themeClass.to} px-5 py-2 font-semibold text-white`}>Publish & Get Link</button>
            <button type="button" onClick={reset} className="rounded-full border px-5 py-2 font-medium">Reset</button>
          </div>
        </form>

        {/* RIGHT: live preview */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className={`rounded-xl border p-6 shadow-sm`} style={{ fontFamily: font }}>
            <header className={`rounded-lg bg-gradient-to-r ${themeClass.from} ${themeClass.to} p-5 text-white`}>
              <h2 className="text-2xl font-bold">{name || "Your Name"}</h2>
              <p className="text-white/90">{email || "you@example.com"}</p>
            </header>

            <section className="mt-5">
              <h3 className="font-semibold">About</h3>
              <p className="mt-1 text-sm text-foreground/90">{about || "Write a short and friendly bio here."}</p>
            </section>

            <section className="mt-5">
              <h3 className="font-semibold">Skills</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {(skills.length ? skills : ["React", "Tailwind", "TypeScript"]).map((s) => (
                  <span key={s} className="rounded-full border bg-secondary px-3 py-1 text-xs">{s}</span>
                ))}
              </div>
            </section>

            <section className="mt-5">
              <h3 className="font-semibold">Projects</h3>
              <div className="mt-2 grid gap-3 md:grid-cols-2">
                {(projects.some((p) => p.title || p.description) ? projects : [{ title: "Portfolio Site", description: "A simple personal website." }]).map((p, i) => (
                  <article key={i} className="rounded-lg border p-3 shadow-sm">
                    <h4 className="font-medium">{p.title || "Untitled"}</h4>
                    <p className="text-sm text-muted-foreground">{p.description || "Project description"}</p>
                  </article>
                ))}
              </div>
            </section>

            <footer className="mt-5 rounded-lg border p-4 text-sm">
              <span className="font-medium">Contact:</span> {email || "you@example.com"}
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
