import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  suggested?: Array<{ label: string; action: () => void }>;
}

const STORAGE_KEY = "assistant-chat-v1";

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const loc = useLocation();
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const offsetRef = useRef({ dx: 0, dy: 0 });
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const posInitRef = useRef(false);
  const POS_KEY = "assistant-pos-v1";

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMessages(JSON.parse(raw));
      else setMessages([welcomeMessage(navigate)]);
    } catch {
      setMessages([welcomeMessage(navigate)]);
    }
  }, [navigate]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [open, messages]);

  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(POS_KEY);
      if (saved) {
        const p = JSON.parse(saved);
        setTimeout(() => {
          const el = wrapperRef.current;
          const rect = el?.getBoundingClientRect();
          const w = rect?.width ?? 360;
          const h = rect?.height ?? 56;
          setPos({
            x: clamp(p.x ?? 16, 8, window.innerWidth - w - 8),
            y: clamp(p.y ?? 16, 8, window.innerHeight - h - 8),
          });
          posInitRef.current = true;
        }, 0);
        return;
      }
    } catch {}
    setTimeout(() => {
      const el = wrapperRef.current;
      const rect = el?.getBoundingClientRect();
      const w = rect?.width ?? 360;
      const h = rect?.height ?? 56;
      setPos({
        x: Math.max(8, window.innerWidth - w - 16),
        y: Math.max(8, window.innerHeight - h - 16),
      });
      posInitRef.current = true;
    }, 0);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(POS_KEY, JSON.stringify(pos));
    } catch {}
  }, [pos]);

  useEffect(() => {
    const onResize = () => {
      const el = wrapperRef.current;
      const rect = el?.getBoundingClientRect();
      const w = rect?.width ?? 380;
      const h = rect?.height ?? 56;
      setPos((p) => ({
        x: clamp(p.x, 8, window.innerWidth - w - 8),
        y: clamp(p.y, 8, window.innerHeight - h - 8),
      }));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos((p) => ({
      x: clamp(p.x, 8, window.innerWidth - rect.width - 8),
      y: clamp(p.y, 8, window.innerHeight - rect.height - 8),
    }));
  }, [open]);

  function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(n, max));
  }

  const startDrag = (e: React.PointerEvent) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    offsetRef.current = { dx: e.clientX - rect.left, dy: e.clientY - rect.top };
    draggingRef.current = false;
    const onMove = (ev: PointerEvent) => {
      const w = el.getBoundingClientRect().width;
      const h = el.getBoundingClientRect().height;
      const nx = ev.clientX - offsetRef.current.dx;
      const ny = ev.clientY - offsetRef.current.dy;
      const cx = clamp(nx, 8, window.innerWidth - w - 8);
      const cy = clamp(ny, 8, window.innerHeight - h - 8);
      if (Math.abs(cx - pos.x) > 1 || Math.abs(cy - pos.y) > 1)
        draggingRef.current = true;
      setPos({ x: cx, y: cy });
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      setTimeout(() => (draggingRef.current = false), 0);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };
    setMessages((m) => [...m, userMsg]);

    const response = await getSmartReply(text, navigate);
    setMessages((m) => [...m, response]);
  };

  return (
    <div
      ref={wrapperRef}
      className="fixed left-0 top-0 z-[70] print:hidden touch-none"
      style={{ left: pos.x, top: pos.y }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            key="assistant-wrap"
            initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 16, scale: 0.96, filter: "blur(6px)" }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative mb-3"
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl opacity-70"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              style={{ filter: "blur(18px)" }}
            >
              <div className="h-full w-full rounded-3xl bg-[conic-gradient(at_30%_50%,#8b5cf6_0deg,#ec4899_120deg,#22d3ee_240deg,#8b5cf6_360deg)]" />
            </motion.div>

            <motion.section
              role="dialog"
              aria-label="AI Assistant"
              initial={false}
              className="w-[92vw] max-w-[420px] overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 text-white shadow-2xl backdrop-blur"
            >
              <header
                onPointerDown={startDrag}
                className="relative flex items-center gap-2 border-b border-white/10 bg-gradient-to-r from-indigo-600/30 to-fuchsia-600/30 px-4 py-3 cursor-grab active:cursor-grabbing select-none"
              >
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow">
                  <Bot className="h-4 w-4" aria-hidden />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">
                    AI Assistant
                  </p>
                  <p className="text-xs text-white/70">
                    Ask about features, where to start, or how to export.
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close assistant"
                  onClick={() => setOpen(false)}
                  className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-md text-white/80 transition hover:bg-white/10 active:scale-95"
                >
                  <X className="h-4 w-4" />
                </button>
              </header>

              <motion.div
                ref={listRef}
                initial={false}
                className="max-h-[50vh] overflow-y-auto px-3 py-3 space-y-3"
              >
                <AnimatePresence initial={false}>
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className={`flex ${m.role === "assistant" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow ${
                          m.role === "assistant"
                            ? "bg-white/10"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <p>{m.content}</p>
                        {m.suggested && m.suggested.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {m.suggested.map((s, i) => (
                              <button
                                key={i}
                                onClick={s.action}
                                className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/90 transition hover:bg-white/20 active:scale-95"
                              >
                                {s.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              <form
                className="flex items-end gap-2 border-t border-white/10 bg-slate-900/60 px-3 py-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  void send();
                }}
              >
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={1}
                  placeholder="Ask me anything about using the site..."
                  className="min-h-[40px] max-h-28 flex-1 resize-y rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-white/50 focus:border-primary"
                />
                <motion.button
                  type="submit"
                  aria-label="Send message"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </form>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative" onPointerDown={startDrag}>
        <span
          aria-hidden
          className="absolute -inset-1 rounded-full bg-primary opacity-30 blur-lg animate-pulse"
        />
        <motion.button
          type="button"
          onClick={() => {
            if (draggingRef.current) return;
            setOpen((v) => !v);
          }}
          aria-expanded={open}
          aria-label={open ? "Close AI Assistant" : "Open AI Assistant"}
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 240,
            damping: 18,
            delay: 0.1,
          }}
          whileHover={{ scale: 1.05, rotate: -1 }}
          whileTap={{ scale: 0.95 }}
          className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-4 py-2 font-semibold text-white shadow-lg transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <MessageCircle className="h-4 w-4" /> Chat
        </motion.button>
      </div>
    </div>
  );
}

function welcomeMessage(navigate: ReturnType<typeof useNavigate>): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role: "assistant",
    content:
      "Hi! I can guide you around: build a resume, create a portfolio, generate a pitch, or export your work.",
    suggested: [
      { label: "Start Resume", action: () => navigate("/resume") },
      { label: "Create Portfolio", action: () => navigate("/portfolio") },
      { label: "Pitch Generator", action: () => navigate("/pitch") },
      { label: "Export Hub", action: () => navigate("/export") },
      { label: "Learn More", action: () => navigate("/about") },
    ],
  };
}

async function getSmartReply(
  text: string,
  navigate: ReturnType<typeof useNavigate>,
): Promise<ChatMessage> {
  const q = text.toLowerCase();

  // Navigation intents
  if (/resume|cv|ats|experience|education/.test(q)) {
    return {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Resume Builder helps you craft an ATS‑friendly resume with guided sections (Summary, Experience, Education, Skills). You can export anytime.",
      suggested: [
        { label: "Open Resume Builder", action: () => navigate("/resume") },
        { label: "Tips for a great resume", action: () => openHint("resume") },
      ],
    };
  }
  if (/portfolio|projects|showcase|case study|case-study/.test(q)) {
    return {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Portfolio Creator organizes projects into clean, visual sections. Add highlights, images, and outcomes for a polished showcase.",
      suggested: [
        { label: "Open Portfolio", action: () => navigate("/portfolio") },
        {
          label: "How to structure a project",
          action: () => openHint("portfolio"),
        },
      ],
    };
  }
  if (/pitch|presentation|slide|deck|idea/.test(q)) {
    return {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Pitch Generator turns your idea into a clear narrative: Problem → Solution → Impact. Great for hackathons and demos.",
      suggested: [
        { label: "Open Pitch Generator", action: () => navigate("/pitch") },
        { label: "What to include", action: () => openHint("pitch") },
      ],
    };
  }
  if (/export|download|pdf|share|txt|save/.test(q)) {
    return {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Use Export Hub to download your work as PDF/TXT or share links quickly. You can export anytime during your flow.",
      suggested: [
        { label: "Go to Export Hub", action: () => navigate("/export") },
      ],
    };
  }
  if (/learn|about|mission|feature|vision/.test(q)) {
    return {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "We’re focused on helping students present their best work. Read about our mission, features, and vision on the Learn More page.",
      suggested: [
        { label: "Open Learn More", action: () => navigate("/about") },
      ],
    };
  }
  if (/login|sign\s?in|sign\s?up|account|auth/.test(q)) {
    return {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Create an account or sign in to save your progress and export easily.",
      suggested: [
        { label: "Go to Get Started", action: () => navigate("/auth") },
      ],
    };
  }

  // General guidance
  return {
    id: crypto.randomUUID(),
    role: "assistant",
    content:
      "I can help you get started or answer questions about using the tools. Want to build a resume, portfolio, or pitch?",
    suggested: [
      { label: "Start Resume", action: () => navigate("/resume") },
      { label: "Create Portfolio", action: () => navigate("/portfolio") },
      { label: "Pitch Generator", action: () => navigate("/pitch") },
      { label: "Export Hub", action: () => navigate("/export") },
    ],
  };
}

function openHint(kind: "resume" | "portfolio" | "pitch") {
  const tips: Record<typeof kind, string[]> = {
    resume: [
      "Start with a 2–3 sentence summary focusing on your strengths.",
      "Use action verbs (Built, Led, Improved) and quantify results.",
      "Keep to one page if possible; highlight most relevant experiences.",
    ],
    portfolio: [
      "Lead with outcomes: what changed because of your project?",
      "Use visuals and captions; keep sections skimmable.",
      "Add context: problem, constraints, your role, and impact.",
    ],
    pitch: [
      "Structure: Problem → Solution → Why now → Differentiation → Impact.",
      "Use one key message per slide; avoid dense text.",
      "End with a strong call‑to‑action or next step.",
    ],
  } as any;
  alert(tips[kind].join("\n• ")); // lightweight hint until a richer tips UI is added
}
