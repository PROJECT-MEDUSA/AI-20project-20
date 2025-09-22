import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Image as ImageIcon,
  Sparkles,
  Presentation,
  ChevronRight,
} from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative rounded-2xl border border-white/10 bg-gradient-to-b from-blue-950/50 to-indigo-950/30 shadow-[0_8px_30px_rgb(2,6,23,0.45)] backdrop-blur-xl ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
      <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-b from-violet-500/10 via-transparent to-transparent blur" />
      {children}
    </motion.div>
  );
}

function SectionHeader({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 rounded-md bg-gradient-to-br from-violet-500/20 to-blue-500/20 p-2 text-violet-300 ring-1 ring-violet-400/20">
        {icon}
      </div>
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-white">
          {title}
        </h2>
        <p className="mt-1 text-sm text-white/70">{subtitle}</p>
      </div>
    </div>
  );
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: any }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    // Log to console and swallow to prevent unhandled overlay crash
    // eslint-disable-next-line no-console
    console.error("PitchGenerator caught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container py-10">
          <div className="mx-auto max-w-3xl rounded-xl border border-red-500/20 bg-red-900/30 p-6 text-white">
            <h3 className="text-lg font-semibold">Something went wrong</h3>
            <p className="mt-2 text-sm text-white/80">
              An unexpected error occurred while rendering the Pitch Refinement
              Hub. We caught it and prevented the dev overlay from crashing.
            </p>
            <pre className="mt-3 max-h-40 overflow-auto rounded bg-black/20 p-3 text-xs">
              {String(this.state.error)}
            </pre>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => window.location.reload()}
                className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white"
              >
                Reload
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children as any;
  }
}

function PitchGeneratorContent() {
  const { toast } = useToast();

  // Smooth scrolling refs
  const refRefine = useRef<HTMLDivElement | null>(null);
  const refVisual = useRef<HTMLDivElement | null>(null);
  const refCompile = useRef<HTMLDivElement | null>(null);

  // 1) Refine & Clarify
  const [idea, setIdea] = useState("");
  const [refined, setRefined] = useState<string>("");
  const [loadingRefine, setLoadingRefine] = useState(false);
  const [refineError, setRefineError] = useState<string>("");

  // 2) Visualize
  const [visualPrompt, setVisualPrompt] = useState("");
  const [visualUrl, setVisualUrl] = useState<string>("");
  const [loadingVisual, setLoadingVisual] = useState(false);

  // 3) Compile & Present
  const [note, setNote] = useState("");
  const [deckReady, setDeckReady] = useState(false);
  const [loadingDeck, setLoadingDeck] = useState(false);
  const [deckText, setDeckText] = useState("");
  const [deckError, setDeckError] = useState<string>("");

  const handleRefine = async () => {
    if (!idea.trim()) {
      toast({ title: "Add an idea", description: "Please paste a rough idea first." });
      return;
    }
    try {
      setLoadingRefine(true);
      setRefined("");
      setRefineError("");
      const res = await fetch("/api/gemini/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });
      if (!res.ok) {
        throw new Error(`Request failed (${res.status}) — check GEMINI_API_KEY on server`);
      }
      const data = (await res.json().catch(() => null)) as any;
      const out = String(data?.text || "");
      if (!out) {
        throw new Error("Empty response from Gemini");
      }
      setRefined(out);
      toast({ title: "Gemini", description: "Idea refined successfully" });
    } catch (err: any) {
      const msg = String(err?.message || err);
      setRefineError(msg);
      toast({ title: "Gemini error", description: msg });
    } finally {
      setLoadingRefine(false);
    }
  };

  const handleVisual = () => {
    setLoadingVisual(true);
    setTimeout(() => {
      setLoadingVisual(false);
      setVisualUrl("/placeholder.svg");
      toast({ title: "Ideogram", description: "API response here" });
    }, 900);
  };

  const handleDeck = async () => {
    if (!refined.trim()) {
      toast({ title: "Refine first", description: "Please refine your idea before generating a deck." });
      return;
    }
    try {
      setLoadingDeck(true);
      setDeckReady(false);
      setDeckText("");
      const res = await fetch("/api/gemini/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refined, note }),
      });
      if (!res.ok) {
        throw new Error(`Request failed (${res.status}) — check GEMINI_API_KEY on server`);
      }
      const data = (await res.json().catch(() => null)) as any;
      const out = String(data?.text || "");
      setDeckText(out);
      setDeckReady(true);
      toast({ title: "Pitch Deck", description: "Deck outline generated" });
    } catch (err: any) {
      toast({ title: "Gemini error", description: String(err?.message || err) });
    } finally {
      setLoadingDeck(false);
    }
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  const steps = [
    { id: "refine", label: "Refine", ref: refRefine },
    { id: "visualize", label: "Visualize", ref: refVisual },
    { id: "present", label: "Present", ref: refCompile },
  ];

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(1200px_600px_at_80%_-10%,rgba(99,102,241,0.20),transparent),radial-gradient(800px_400px_at_10%_10%,rgba(59,130,246,0.15),transparent)]">
      <div className="container py-10 md:py-14">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-semibold tracking-tight text-white md:text-4xl"
          >
            Pitch Refinement Hub
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mx-auto mt-3 max-w-2xl text-white/70"
          >
            A single, streamlined tab to refine ideas, visualize concepts, and
            compile a professional pitch — with sleek animations and a high-end
            SaaS feel.
          </motion.p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {steps.map((s, i) => (
              <Button
                key={s.id}
                onClick={() =>
                  s.ref.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
                variant="secondary"
                className="group rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/80 to-blue-500/80 text-[11px] font-semibold text-white shadow-md">
                  {i + 1}
                </span>
                {s.label}
                <ChevronRight className="ml-1 h-4 w-4 opacity-60 transition group-hover:translate-x-0.5" />
              </Button>
            ))}
          </div>
        </div>

        <div className="relative mx-auto mt-10 grid max-w-5xl gap-10">
          {/* Connector line */}
          <div className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-blue-500/50 via-violet-500/30 to-transparent md:block" />

          {/* 1) Refine & Clarify */}
          <div ref={refRefine} id="refine" className="scroll-mt-24">
            <GlassCard>
              <CardHeader className="px-6 pt-6">
                <SectionHeader
                  title="Refine & Clarify Your Idea"
                  subtitle="Paste your rough idea here and get a polished, professional description using Gemini API."
                  icon={<Sparkles className="h-5 w-5" aria-hidden />}
                />
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <label
                      htmlFor="idea"
                      className="text-sm font-medium text-white"
                    >
                      Your rough idea
                    </label>
                    <Textarea
                      id="idea"
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      placeholder="Paste your rough idea here..."
                      className="min-h-[160px] resize-vertical border-white/10 bg-white/5 text-white placeholder:text-white/50"
                    />
                    <div>
                      <Button
                        onClick={handleRefine}
                        disabled={loadingRefine}
                        className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-violet-900/30 hover:brightness-110"
                      >
                        {loadingRefine ? "Refining..." : "Refine Idea"}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-white">
                      Refined idea
                    </label>
                    <div className="relative min-h-[160px] rounded-xl border border-white/10 bg-white/5 p-4 text-white">
                      <AnimatePresence initial={false}>
                        {loadingRefine ? (
                          <motion.div
                            key="refine-loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full w-full animate-pulse rounded-lg bg-gradient-to-r from-white/10 via-white/5 to-white/10"
                          />
                        ) : refined ? (
                          <motion.p
                            key="refine-out"
                            initial={{ y: 8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="whitespace-pre-wrap leading-7"
                          >
                            {refined}
                          </motion.p>
                        ) : (
                          <motion.p
                            key="refine-empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-white/60"
                          >
                            Output will appear here.
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </CardContent>
            </GlassCard>
          </div>

          {/* 2) Visualize */}
          <div ref={refVisual} id="visualize" className="scroll-mt-24">
            <GlassCard>
              <CardHeader className="px-6 pt-6">
                <SectionHeader
                  title="Visualize Your Idea"
                  subtitle="Generate a visual representation of your idea using Ideogram API."
                  icon={<ImageIcon className="h-5 w-5" aria-hidden />}
                />
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <label
                      htmlFor="visual"
                      className="text-sm font-medium text-white"
                    >
                      Visual prompt
                    </label>
                    <Textarea
                      id="visual"
                      value={visualPrompt}
                      onChange={(e) => setVisualPrompt(e.target.value)}
                      placeholder="Describe what you want to see..."
                      className="min-h-[120px] resize-vertical border-white/10 bg-white/5 text-white placeholder:text-white/50"
                    />
                    <div>
                      <Button
                        onClick={handleVisual}
                        disabled={loadingVisual}
                        className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-violet-900/30 hover:brightness-110"
                      >
                        {loadingVisual ? "Generating..." : "Generate Visual"}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-white">
                      Generated visual
                    </label>
                    <div className="relative flex min-h-[200px] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5">
                      <AnimatePresence initial={false}>
                        {loadingVisual ? (
                          <motion.div
                            key="visual-loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full w-full animate-pulse bg-gradient-to-r from-white/10 via-white/5 to-white/10"
                          />
                        ) : visualUrl ? (
                          <motion.img
                            key="visual"
                            src={visualUrl}
                            alt="Generated visual placeholder"
                            className="h-full w-full object-contain"
                            initial={{ scale: 0.98, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                          />
                        ) : (
                          <motion.div
                            key="visual-empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center gap-2 p-6 text-white/60"
                          >
                            <ImageIcon className="h-6 w-6" aria-hidden />
                            <p>Image will appear here.</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </CardContent>
            </GlassCard>
          </div>

          {/* 3) Compile & Present */}
          <div ref={refCompile} id="present" className="scroll-mt-24">
            <GlassCard>
              <CardHeader className="px-6 pt-6">
                <SectionHeader
                  title="Compile & Present Your Pitch"
                  subtitle="Transform your refined text and visuals into a professional presentation."
                  icon={<Presentation className="h-5 w-5" aria-hidden />}
                />
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <label
                      htmlFor="note"
                      className="text-sm font-medium text-white"
                    >
                      Optional note or summary
                    </label>
                    <Input
                      id="note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Any extra instructions..."
                      className="border-white/10 bg-white/5 text-white placeholder:text-white/50"
                    />
                    <div>
                      <Button
                        onClick={handleDeck}
                        disabled={loadingDeck}
                        className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-violet-900/30 hover:brightness-110"
                      >
                        {loadingDeck ? "Composing..." : "Generate Pitch Deck"}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-white">
                      Pitch deck preview
                    </label>
                    <div className="relative min-h-[220px] rounded-xl border border-white/10 bg-white/5 p-4">
                      <AnimatePresence initial={false}>
                        {loadingDeck ? (
                          <motion.div
                            key="deck-loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full w-full animate-pulse rounded-lg bg-gradient-to-r from-white/10 via-white/5 to-white/10"
                          />
                        ) : deckReady ? (
                          <motion.div
                            key={`deck-ready-${note}-${refined}-${visualUrl}`}
                            initial={{ y: 8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="grid gap-3 md:grid-cols-3"
                          >
                            <div className="rounded-lg border border-white/10 bg-gradient-to-br from-blue-500/10 to-violet-500/10 p-3 text-white/90">
                              <p className="text-sm font-semibold">
                                Title Slide
                              </p>
                              <p className="mt-1 text-xs text-white/70">
                                Problem • Solution • Impact
                              </p>
                            </div>
                            <div className="rounded-lg border border-white/10 bg-gradient-to-br from-blue-500/10 to-violet-500/10 p-3 text-white/90">
                              <p className="text-sm font-semibold">Overview</p>
                              <p className="mt-1 text-xs text-white/70">
                                {deckText
                                  ? `${deckText.slice(0, 160)}${deckText.length > 160 ? "…" : ""}`
                                  : refined
                                  ? "Refined summary included"
                                  : "Summary placeholder"}
                              </p>
                            </div>
                            <div className="rounded-lg border border-white/10 bg-gradient-to-br from-blue-500/10 to-violet-500/10 p-3 text-white/90">
                              <p className="text-sm font-semibold">Visual</p>
                              <p className="mt-1 text-xs text-white/70">
                                {visualUrl
                                  ? "Visual embedded"
                                  : "Visual placeholder"}
                              </p>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="deck-empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex h-full items-center justify-center rounded-lg border border-dashed border-white/15 text-white/60"
                          >
                            Preview of generated pitch deck
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </CardContent>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PitchGenerator() {
  return (
    <ErrorBoundary>
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Canvas camera={{ position: [0, 0, 9], fov: 52 }}>
            <color attach="background" args={["#0a0612"]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[6, 6, 6]} intensity={1.1} color="#22d3ee" />
            <pointLight position={[-6, -6, -8]} intensity={0.8} color="#f472b6" />
            <Forge />
          </Canvas>
        </div>
        <PitchGeneratorContent />
      </div>
    </ErrorBoundary>
  );
}

function Forge() {
  const core = useRef<THREE.Mesh>(null!);
  const ring = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (core.current) {
      const s = 1 + Math.sin(t * 2) * 0.05;
      core.current.scale.setScalar(s);
      core.current.rotation.y += 0.01;
    }
    if (ring.current) {
      ring.current.rotation.z -= 0.004;
    }
  });
  return (
    <group position={[0, 0, -2]}>
      <mesh ref={core}>
        <torusKnotGeometry args={[1.2, 0.28, 128, 32]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#22d3ee" emissiveIntensity={1.2} metalness={0.5} roughness={0.2} />
      </mesh>
      <mesh ref={ring}>
        <torusGeometry args={[2.2, 0.04, 32, 256]} />
        <meshBasicMaterial color="#f472b6" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
