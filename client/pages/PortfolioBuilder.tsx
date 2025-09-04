import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import {
  Download,
  Link as LinkIcon,
  Wand2,
  Code2,
  Image as ImageIcon,
  GripVertical,
  Trash2,
  Plus,
  Pencil,
} from "lucide-react";

// Types
type Project = {
  id: string;
  title: string;
  description: string;
  imageDataUrl: string;
};
type PortfolioState = {
  name: string;
  role: string;
  about: string;
  email: string;
  avatarDataUrl: string;
  skills: string[];
  projects: Project[];
  template: TemplateKey;
};
type TemplateKey = "classic" | "modern" | "minimal";

const DEFAULT_STATE: PortfolioState = {
  name: "",
  role: "",
  about: "",
  email: "",
  avatarDataUrl: "",
  skills: [],
  projects: [],
  template: "classic",
};

const TEMPLATES: {
  key: TemplateKey;
  name: string;
  accentFrom: string;
  accentTo: string;
}[] = [
  {
    key: "classic",
    name: "Classic",
    accentFrom: "from-indigo-500",
    accentTo: "to-purple-500",
  },
  {
    key: "modern",
    name: "Modern",
    accentFrom: "from-sky-500",
    accentTo: "to-blue-600",
  },
  {
    key: "minimal",
    name: "Minimal",
    accentFrom: "from-emerald-500",
    accentTo: "to-teal-500",
  },
];

function uid() {
  return Math.random().toString(36).slice(2);
}

export default function PortfolioBuilder() {
  const [state, setState] = useState<PortfolioState>(DEFAULT_STATE);
  const [skillInput, setSkillInput] = useState("");
  const [dragId, setDragId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(true);
  const previewRef = useRef<HTMLDivElement | null>(null);

  // Load from hash or localStorage
  useEffect(() => {
    const fromHash = decodeFromHash();
    if (fromHash) {
      setState(fromHash);
      return;
    }
    const raw = localStorage.getItem("portfolioBuilder.state");
    if (raw) {
      try {
        setState(JSON.parse(raw) as PortfolioState);
      } catch {
        /* ignore */
      }
    }
  }, []);

  const saveLocal = () =>
    localStorage.setItem("portfolioBuilder.state", JSON.stringify(state));

  const addSkill = () => {
    const v = skillInput.trim();
    if (!v) return;
    setState((s) => ({
      ...s,
      skills: Array.from(new Set([...(s.skills || []), v])),
    }));
    setSkillInput("");
  };
  const removeSkill = (val: string) =>
    setState((s) => ({ ...s, skills: s.skills.filter((x) => x !== val) }));

  const addProject = () =>
    setState((s) => ({
      ...s,
      projects: [
        ...s.projects,
        { id: uid(), title: "", description: "", imageDataUrl: "" },
      ],
    }));
  const removeProject = (id: string) =>
    setState((s) => ({
      ...s,
      projects: s.projects.filter((p) => p.id !== id),
    }));
  const updateProject = (id: string, key: keyof Project, value: string) =>
    setState((s) => ({
      ...s,
      projects: s.projects.map((p) =>
        p.id === id ? { ...p, [key]: value } : p,
      ),
    }));

  // Drag and drop reorder for projects
  const onDragStart = (id: string) => setDragId(id);
  const onDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };
  const onDrop = (overId: string) => {
    if (!dragId || dragId === overId) return;
    setState((s) => {
      const cur = [...s.projects];
      const from = cur.findIndex((p) => p.id === dragId);
      const to = cur.findIndex((p) => p.id === overId);
      if (from < 0 || to < 0) return s;
      const [item] = cur.splice(from, 1);
      cur.splice(to, 0, item);
      return { ...s, projects: cur };
    });
    setDragId(null);
  };

  // Image handlers
  const onAvatarUpload: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    handleImageUpload(e, (dataUrl) =>
      setState((s) => ({ ...s, avatarDataUrl: dataUrl })),
    );
  const onProjectImageUpload =
    (id: string): React.ChangeEventHandler<HTMLInputElement> =>
    (e) =>
      handleImageUpload(e, (dataUrl) =>
        updateProject(id, "imageDataUrl", dataUrl),
      );

  const theme = useMemo(
    () => TEMPLATES.find((t) => t.key === state.template)!,
    [state.template],
  );

  const completion = useMemo(() => {
    let c = 0,
      total = 5; // name, about, email, skills, projects
    if (state.name) c++;
    if (state.about) c++;
    if (state.email) c++;
    if (state.skills.length) c++;
    if (state.projects.length) c++;
    return Math.round((c / total) * 100);
  }, [state]);

  const getCodeHtml = () => generateHtml(state);
  const getCodeReact = () => generateReactComponent(state);

  const download = (filename: string, text: string) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const publishLink = () => {
    const link = encodeToHash(state);
    navigator.clipboard
      .writeText(link)
      .then(() => toast.success("Shareable link copied to clipboard"));
  };

  return (
    <section className="container py-8 md:py-12">
      <header className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
          Portfolio Builder
        </h1>
        <p className="text-sm text-muted-foreground">
          Pick a template, edit inline, and export code or a shareable link.
        </p>
      </header>

      {/* Template Gallery */}
      <div className="rounded-2xl border bg-card p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold">Templates</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {TEMPLATES.map((t) => (
            <TooltipProvider key={t.key}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    type="button"
                    onClick={() => setState((s) => ({ ...s, template: t.key }))}
                    whileHover={{
                      y: -2,
                      boxShadow: "0 10px 20px rgba(79,70,229,0.15)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative overflow-hidden rounded-xl border p-2 text-left ${state.template === t.key ? "ring-2 ring-primary" : ""}`}
                  >
                    <div
                      className={`rounded-lg bg-gradient-to-r ${t.accentFrom} ${t.accentTo} p-2`}
                    >
                      <div className="rounded-md bg-card p-2">
                        <div className="h-2 w-1/2 rounded bg-muted" />
                        <div className="mt-2 grid grid-cols-2 gap-1">
                          <div className="h-8 rounded bg-muted" />
                          <div className="h-8 rounded bg-muted" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs font-medium">{t.name}</div>
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent>{t.name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>

      <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-2">
        {/* Editor */}
        <div className="space-y-4 min-w-0">
          <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-semibold">Editor</h2>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" onClick={saveLocal}>
                  Save
                </Button>
                <Button
                  type="button"
                  onClick={() => setEditMode((v) => !v)}
                  className="rounded-full"
                >
                  {editMode ? "Disable Inline Edit" : "Enable Inline Edit"}
                </Button>
              </div>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div>
                <Label className="mb-1 block text-sm">Name</Label>
                <Input
                  placeholder="Your Name"
                  value={state.name}
                  onChange={(e) => setState({ ...state, name: e.target.value })}
                />
              </div>
              <div>
                <Label className="mb-1 block text-sm">Role</Label>
                <Input
                  value={state.role}
                  onChange={(e) => setState({ ...state, role: e.target.value })}
                  placeholder="e.g. Frontend Developer"
                />
              </div>
              <div className="md:col-span-2">
                <Label className="mb-1 block text-sm">About</Label>
                <Textarea
                  rows={4}
                  placeholder="Write a short and friendly bio"
                  value={state.about}
                  onChange={(e) =>
                    setState({ ...state, about: e.target.value })
                  }
                />
              </div>
              <div>
                <Label className="mb-1 block text-sm">Email</Label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={state.email}
                  onChange={(e) =>
                    setState({ ...state, email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label className="mb-1 block text-sm">Avatar</Label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      document.getElementById("avatar-input")?.click()
                    }
                    className="rounded-full"
                  >
                    <ImageIcon className="mr-2 h-4 w-4" /> Upload
                  </Button>
                  <input
                    id="avatar-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onAvatarUpload}
                  />
                  {state.avatarDataUrl && (
                    <img
                      src={state.avatarDataUrl}
                      alt="Avatar"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <h3 className="text-sm font-semibold">Skills</h3>
            <div className="mt-2 flex gap-2">
              <Input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter"
                    ? (e.preventDefault(), addSkill())
                    : undefined
                }
                placeholder="Type a skill and press Enter"
              />
              <Button type="button" onClick={addSkill} className="rounded-full">
                <Plus className="mr-2 h-4 w-4" /> Add
              </Button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {state.skills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-2 rounded-full border bg-secondary px-3 py-1 text-xs"
                >
                  <Pencil className="h-3.5 w-3.5 opacity-60" />
                  <span
                    contentEditable={editMode}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const newVal = e.currentTarget.innerText.trim();
                      if (!newVal) removeSkill(s);
                      else
                        setState((st) => ({
                          ...st,
                          skills: st.skills.map((x) => (x === s ? newVal : x)),
                        }));
                    }}
                  >
                    {s}
                  </span>
                  <button
                    onClick={() => removeSkill(s)}
                    aria-label={`Remove ${s}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-semibold">Projects</h3>
              <Button type="button" variant="outline" onClick={addProject}>
                <Plus className="mr-2 h-4 w-4" /> Add Project
              </Button>
            </div>
            <div className="space-y-3">
              {state.projects.map((p) => (
                <div
                  key={p.id}
                  draggable
                  onDragStart={() => onDragStart(p.id)}
                  onDragOver={onDragOver}
                  onDrop={() => onDrop(p.id)}
                  className="rounded-xl border p-3"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GripVertical className="h-4 w-4" /> Drag to reorder
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById(`img-${p.id}`)?.click()
                        }
                        className="h-8 px-3"
                      >
                        <ImageIcon className="mr-2 h-4 w-4" /> Image
                      </Button>
                      <input
                        id={`img-${p.id}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={onProjectImageUpload(p.id)}
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => removeProject(p.id)}
                        className="h-8 px-3"
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Remove
                      </Button>
                    </div>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <Label className="mb-1 block text-sm">Title</Label>
                      <Input
                        placeholder="Project title"
                        value={p.title}
                        onChange={(e) =>
                          updateProject(p.id, "title", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label className="mb-1 block text-sm">Description</Label>
                      <Textarea
                        rows={3}
                        placeholder="Short description"
                        value={p.description}
                        onChange={(e) =>
                          updateProject(p.id, "description", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  {p.imageDataUrl && (
                    <div className="mt-2">
                      <img
                        src={p.imageDataUrl}
                        alt="Project"
                        className="h-28 w-full rounded-md object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    className="rounded-full bg-gradient-to-r from-primary to-fuchsia-500 text-white shadow hover:brightness-110"
                  >
                    <Code2 className="mr-2 h-4 w-4" /> Get Code
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-56">
                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => download("portfolio.html", getCodeHtml())}
                    >
                      Download HTML
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() =>
                        download("PortfolioComponent.jsx", getCodeReact())
                      }
                    >
                      Download React Component
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-full"
                      onClick={publishLink}
                    >
                      <LinkIcon className="mr-2 h-4 w-4" /> Get Link
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copies a shareable URL</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button
                type="button"
                variant="secondary"
                className="rounded-full"
                onClick={() => setState(DEFAULT_STATE)}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="min-w-0 rounded-2xl border bg-card p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="text-sm font-semibold">Live Preview</div>
            <div className="text-xs text-muted-foreground">
              Completion {completion}%
            </div>
          </div>
          <div ref={previewRef} className="overflow-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={state.template}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <TemplateRenderer
                  state={state}
                  editMode={editMode}
                  onUpdate={setState}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Wand2 className="mr-2 h-4 w-4" /> Choose Different Template
            </Button>
            <Button
              type="button"
              className="rounded-full bg-green-600 text-white hover:bg-green-700"
              onClick={() => download("portfolio.html", getCodeHtml())}
            >
              <Download className="mr-2 h-4 w-4" /> Export HTML
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function handleImageUpload(
  e: React.ChangeEvent<HTMLInputElement>,
  cb: (dataUrl: string) => void,
) {
  const file = e.target.files?.[0];
  if (!file) return;
  const max = 3 * 1024 * 1024;
  if (file.size > max) {
    alert("Please upload an image up to 3MB");
    return;
  }
  const reader = new FileReader();
  reader.onload = () => cb(String(reader.result || ""));
  reader.readAsDataURL(file);
}

function TemplateRenderer({
  state,
  editMode,
  onUpdate,
}: {
  state: PortfolioState;
  editMode: boolean;
  onUpdate: (s: PortfolioState) => void;
}) {
  const theme = TEMPLATES.find((t) => t.key === state.template)!;

  const onEdit =
    (key: keyof PortfolioState) => (e: React.FormEvent<HTMLElement>) => {
      const target = e.currentTarget as HTMLElement;
      const value = target.innerText;
      onUpdate({ ...state, [key]: value });
    };

  return (
    <div className={`rounded-xl border p-6 shadow-sm`}>
      <header
        className={`relative rounded-lg bg-gradient-to-r ${theme.accentFrom} ${theme.accentTo} p-5 text-white`}
      >
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/30">
            {state.avatarDataUrl ? (
              <img
                src={state.avatarDataUrl}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-lg font-semibold">
                {(state.name || "").slice(0, 1) || "?"}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h2
              className="truncate text-xl font-bold focus:outline-none"
              contentEditable={editMode}
              suppressContentEditableWarning
              onBlur={onEdit("name")}
            >
              {state.name || "Your Name"}
            </h2>
            <div
              className="truncate text-white/90 focus:outline-none"
              contentEditable={editMode}
              suppressContentEditableWarning
              onBlur={onEdit("role")}
            >
              {state.role || "Your Role / Title"}
            </div>
            <div className="truncate text-white/80">
              {state.email || "you@example.com"}
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-white/10" />
      </header>

      <section className="mt-5">
        <h3 className="font-semibold">About</h3>
        <p
          className="mt-1 text-sm text-foreground/90 focus:outline-none"
          contentEditable={editMode}
          suppressContentEditableWarning
          onBlur={onEdit("about")}
        >
          {state.about ||
            "Write a short and friendly bio that highlights your strengths and interests."}
        </p>
      </section>

      <section className="mt-5">
        <h3 className="font-semibold">Skills</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {(state.skills.length
            ? state.skills
            : ["React", "Tailwind", "TypeScript"]
          ).map((s, idx) => (
            <span
              key={idx}
              className="rounded-full border bg-secondary px-3 py-1 text-xs"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <h3 className="font-semibold">Projects</h3>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {(state.projects.length
            ? state.projects
            : [
                {
                  id: "demo",
                  title: "Portfolio Site",
                  description: "A personal site built with React and Tailwind.",
                  imageDataUrl: "",
                },
              ]
          ).map((p) => (
            <article
              key={p.id}
              className="group relative overflow-hidden rounded-lg border p-3 shadow-sm"
            >
              {p.imageDataUrl && (
                <img
                  src={p.imageDataUrl}
                  alt="Project"
                  className="mb-2 h-28 w-full rounded-md object-cover"
                />
              )}
              <h4
                className="font-medium focus:outline-none"
                contentEditable={editMode}
                suppressContentEditableWarning
                onBlur={(e) => {
                  const v = (e.currentTarget as HTMLElement).innerText;
                  if (p.id === "demo") return;
                  onUpdate({
                    ...state,
                    projects: state.projects.map((x) =>
                      x.id === p.id ? { ...x, title: v } : x,
                    ),
                  });
                }}
              >
                {p.title || "Untitled Project"}
              </h4>
              <p
                className="text-sm text-muted-foreground focus:outline-none"
                contentEditable={editMode}
                suppressContentEditableWarning
                onBlur={(e) => {
                  const v = (e.currentTarget as HTMLElement).innerText;
                  if (p.id === "demo") return;
                  onUpdate({
                    ...state,
                    projects: state.projects.map((x) =>
                      x.id === p.id ? { ...x, description: v } : x,
                    ),
                  });
                }}
              >
                {p.description ||
                  "Short description of the project and your contributions."}
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"
              />
            </article>
          ))}
        </div>
      </section>

      <footer className="mt-5 rounded-lg border p-4 text-sm">
        <span className="font-medium">Contact:</span>{" "}
        {state.email || "you@example.com"}
      </footer>
    </div>
  );
}

function encodeToHash(state: PortfolioState) {
  const json = JSON.stringify(state);
  const b64 = btoa(unescape(encodeURIComponent(json)));
  const url = new URL(window.location.href);
  url.hash = `p=${b64}`;
  return url.toString();
}
function decodeFromHash(): PortfolioState | null {
  const hash = window.location.hash;
  if (!hash.startsWith("#p=")) return null;
  try {
    const b64 = hash.slice(3);
    const json = decodeURIComponent(escape(atob(b64)));
    return JSON.parse(json) as PortfolioState;
  } catch {
    return null;
  }
}

function generateHtml(state: PortfolioState) {
  const theme = TEMPLATES.find((t) => t.key === state.template)!;
  const skills = (state.skills.length ? state.skills : [])
    .map((s) => `<span class="chip">${escapeHtml(s)}</span>`)
    .join(" ");
  const projects = (state.projects.length ? state.projects : [])
    .map(
      (p) => `
    <article class="card">
      ${p.imageDataUrl ? `<img src="${p.imageDataUrl}" alt="Project" class="cover"/>` : ""}
      <h4>${escapeHtml(p.title)}</h4>
      <p>${escapeHtml(p.description)}</p>
    </article>
  `,
    )
    .join("\n");
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${escapeHtml(state.name || "Portfolio")}</title>
<style>
:root{--fg:#0f172a;--muted:#475569}
body{font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Inter,Arial;margin:0;padding:24px;color:var(--fg)}
.header{background:linear-gradient(90deg,#6366f1,#8b5cf6);color:#fff;border-radius:12px;padding:16px}
.row{display:flex;gap:12px;align-items:center}
.avatar{height:64px;width:64px;border-radius:9999px;overflow:hidden;background:#ffffff22}
.avatar img{height:100%;width:100%;object-fit:cover}
.section{margin-top:20px}
.chip{display:inline-block;border:1px solid #e5e7eb;border-radius:999px;padding:4px 10px;margin:4px 6px 0 0;font-size:12px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}
.card{border:1px solid #e5e7eb;border-radius:10px;padding:12px}
.cover{width:100%;height:140px;object-fit:cover;border-radius:8px;margin-bottom:8px}
small{color:var(--muted)}
</style>
</head>
<body>
  <header class="header">
    <div class="row">
      <div class="avatar">${state.avatarDataUrl ? `<img src="${state.avatarDataUrl}" alt="Avatar"/>` : ""}</div>
      <div>
        <h2 style="margin:0">${escapeHtml(state.name)}</h2>
        <div>${escapeHtml(state.role)}</div>
        <small>${escapeHtml(state.email)}</small>
      </div>
    </div>
  </header>
  ${state.about ? `<section class="section"><h3>About</h3><p>${escapeHtml(state.about)}</p></section>` : ""}
  ${state.skills.length ? `<section class="section"><h3>Skills</h3><div>${skills}</div></section>` : ""}
  ${state.projects.length ? `<section class="section"><h3>Projects</h3><div class="grid">${projects}</div></section>` : ""}
</body>
</html>`;
}

function generateReactComponent(state: PortfolioState) {
  return `import React from 'react';
export default function Portfolio() {
  const data = ${JSON.stringify(state, null, 2)};
  return (
    <div style={{ fontFamily: 'ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Inter,Arial', color: '#0f172a' }}>
      <header style={{ background: 'linear-gradient(90deg,#6366f1,#8b5cf6)', color: '#fff', borderRadius: 12, padding: 16 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ height: 64, width: 64, borderRadius: 9999, overflow: 'hidden', background: '#ffffff22' }}>
            {data.avatarDataUrl ? <img src={data.avatarDataUrl} alt="Avatar" style={{ height: '100%', width: '100%', objectFit: 'cover' }} /> : null}
          </div>
          <div>
            <h2 style={{ margin: 0 }}>{data.name}</h2>
            <div>{data.role}</div>
            <small style={{ color: '#475569' }}>{data.email}</small>
          </div>
        </div>
      </header>

      {data.about ? (
        <section style={{ marginTop: 20 }}>
          <h3>About</h3>
          <p>{data.about}</p>
        </section>
      ) : null}

      {data.skills?.length ? (
        <section style={{ marginTop: 20 }}>
          <h3>Skills</h3>
          <div>
            {data.skills.map((s, i) => (
              <span key={i} style={{ display: 'inline-block', border: '1px solid #e5e7eb', borderRadius: 999, padding: '4px 10px', margin: '4px 6px 0 0', fontSize: 12 }}>{s}</span>
            ))}
          </div>
        </section>
      ) : null}

      {data.projects?.length ? (
        <section style={{ marginTop: 20 }}>
          <h3>Projects</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
            {data.projects.map((p) => (
              <article key={p.id} style={{ border: '1px solid #e5e7eb', borderRadius: 10, padding: 12 }}>
                {p.imageDataUrl ? (<img src={p.imageDataUrl} alt="Project" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />) : null}
                <h4>{p.title}</h4>
                <p style={{ color: '#475569' }}>{p.description}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}`;
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
