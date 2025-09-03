import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Rocket, Presentation, Layout as LayoutIcon, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Index() {
  return (
    <div className="w-full relative bg-slate-950 text-white">
      <AnimatedStyles />
      <CursorTrail />

      {/* Hero */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Animated gradient + particles background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 animate-gradient-move bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(168,85,247,0.25),transparent),radial-gradient(1000px_600px_at_80%_0%,rgba(99,102,241,0.25),transparent)]" />
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F5c1e1858d3914c64b045e31e9b4fd580%2F5cfe91acdcc04de5a0a1bedc460a66b5?format=webp&width=1600"
            alt="Colorful abstract background from landing design"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <FloatingOrbs />
        </div>

        <div className="container py-20 md:py-28 text-center">
          <div className="mx-auto max-w-4xl">
            <motion.span
              className="inline-flex items-center gap-2 rounded-full bg-white/50 px-3 py-1 text-xs font-medium text-foreground/70 shadow-sm backdrop-blur"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
              AI Resume & Project Booster
            </motion.span>

            <motion.h1
              className="mt-5 text-4xl/tight font-extrabold md:text-6xl/tight [text-shadow:0_2px_24px_rgba(168,85,247,0.35)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <TypewriterText text="Boost your resume" />
              <br className="hidden md:block" />
              <motion.span initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}>
                and projects with AI
              </motion.span>
            </motion.h1>

            <motion.p
              className="mt-4 text-lg text-white/80 md:text-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
            >
              Build standout resumes, generate compelling pitches, and craft beautiful portfolios using student-friendly tools.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Link
                to="/resume"
                className="group rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-6 py-3 font-semibold text-white shadow-[0_10px_30px_rgba(236,72,153,0.4)] transition will-change-transform hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.65)] hover:[transform:perspective(700px)_rotateX(6deg)_rotateY(-6deg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Get Started
              </Link>
              <a
                href="#features"
                className="group rounded-full border bg-white/70 px-6 py-3 font-semibold text-foreground/80 backdrop-blur transition hover:bg-white hover:shadow-[0_0_24px_rgba(99,102,241,0.35)] hover:[transform:perspective(700px)_rotateX(6deg)_rotateY(6deg)]"
              >
                Explore Features
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section id="features" className="container py-12 md:py-16" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
        <h2 className="text-3xl font-bold">Key Features</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <FeatureCard icon={<FileText aria-hidden className="h-6 w-6" />} title="Resume Builder" description="Leverage AI to create professional resumes that highlight your skills and achievements." />
          <FeatureCard icon={<Presentation aria-hidden className="h-6 w-6" />} title="Pitch Generator" description="Craft compelling pitches that capture attention and convey your ideas effectively." />
          <FeatureCard icon={<LayoutIcon aria-hidden className="h-6 w-6" />} title="Portfolio Builder" description="Showcase your projects and achievements in a visually appealing portfolio." />
        </div>
      </motion.section>

      {/* Why important */}
      <motion.section className="bg-slate-900/60" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
        <div className="container py-12 md:py-16">
          <h2 className="text-3xl font-extrabold tracking-tight">WHY IS IT IMPORTANT</h2>
          <p className="mt-3 max-w-3xl text-white/70">Our tools help students present their best selves: save time with AI assistance, communicate clearly with polished pitches, and showcase work beautifully. Everything exports cleanly and is accessible anywhere.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <BenefitCard icon={<FileText className="h-6 w-6" aria-hidden />} title="Save hours on formatting" description="Generate structured resumes and documents with consistent design and strong content hints." />
            <BenefitCard icon={<Presentation className="h-6 w-6" aria-hidden />} title="Tell a clear story" description="Turn projects into compelling pitches that highlight problem, solution, and impact." />
            <BenefitCard icon={<Rocket className="h-6 w-6" aria-hidden />} title="Stand out & share fast" description="Export to PDF/TXT or share live links so recruiters and peers can view your work instantly." />
          </div>
        </div>
      </motion.section>

      {/* CTA band */}
      <motion.section className="py-14" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl p-8 text-white shadow-xl md:p-10">
            <div className="absolute inset-0 -z-10 animate-gradient-slow bg-[conic-gradient(at_30%_50%,#8b5cf6_0deg,#ec4899_120deg,#22d3ee_240deg,#8b5cf6_360deg)] opacity-90" />
            <div className="absolute inset-0 -z-10 backdrop-blur-[2px]" />

            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h3 className="text-2xl font-bold">Ready to stand out?</h3>
                <p className="text-white/90">Start building your resume and portfolio in minutes.</p>
              </div>
              <Link
                to="/resume"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-primary transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white [box-shadow:0_0_0_0_rgba(236,72,153,0.6)] hover:[box-shadow:0_0_0_8px_rgba(236,72,153,0.15)]"
              >
                <Rocket className="h-5 w-5" aria-hidden />
                Build Now
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.article
      className="group rounded-2xl border bg-white/40 p-6 shadow-sm backdrop-blur-xl transition hover:shadow-xl hover:[box-shadow:0_10px_40px_rgba(139,92,246,0.25)] hover:border-fuchsia-400/70"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <div className="flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary ring-1 ring-primary/20 shadow-[0_0_18px_rgba(99,102,241,0.35)] group-hover:shadow-[0_0_28px_rgba(236,72,153,0.45)] transition">
          {icon}
        </div>
        <h3 className="text-xl font-semibold [text-shadow:0_1px_12px_rgba(99,102,241,0.25)]">{title}</h3>
      </div>
      <p className="mt-3 text-white/70">{description}</p>
    </motion.article>
  );
}

function BenefitCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.article
      className="group rounded-2xl border bg-white/40 p-6 shadow-sm backdrop-blur-xl transition hover:shadow-xl hover:[box-shadow:0_10px_40px_rgba(139,92,246,0.25)] hover:border-fuchsia-400/70"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <div className="flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary ring-1 ring-primary/20 shadow-[0_0_18px_rgba(99,102,241,0.35)] group-hover:shadow-[0_0_28px_rgba(236,72,153,0.45)] transition">
          {icon}
        </div>
        <h3 className="text-lg font-semibold [text-shadow:0_1px_12px_rgba(99,102,241,0.25)]">{title}</h3>
      </div>
      <p className="mt-3 text-sm text-white/70">{description}</p>
    </motion.article>
  );
}

function TypewriterText({ text }: { text: string }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setShown(text.slice(0, ++i));
      if (i >= text.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [text]);
  return (
    <span className="inline-block">
      {shown}
      <span className="ml-0.5 inline-block h-6 w-1 animate-pulse rounded bg-fuchsia-500 align-middle" />
    </span>
  );
}

function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -left-20 top-10 h-64 w-64 animate-float-slow rounded-full bg-blue-700/20 blur-3xl" />
      <div className="absolute right-10 top-0 h-80 w-80 animate-float-slower rounded-full bg-indigo-800/20 blur-3xl" />
      <div className="absolute bottom-10 left-10 h-72 w-72 animate-float-slowest rounded-full bg-sky-600/15 blur-3xl" />
    </div>
  );
}

function AnimatedStyles() {
  return (
    <style>
      {`
      @keyframes gradient-move { 0%{transform:translateY(0)} 50%{transform:translateY(-6%)} 100%{transform:translateY(0)} }
      .animate-gradient-move{ animation: gradient-move 12s ease-in-out infinite; }
      @keyframes float-slow { 0%,100%{ transform:translateY(0) } 50%{ transform:translateY(-12px) } }
      .animate-float-slow{ animation: float-slow 8s ease-in-out infinite; }
      .animate-float-slower{ animation: float-slow 10s ease-in-out infinite; }
      .animate-float-slowest{ animation: float-slow 12s ease-in-out infinite; }
      @keyframes gradient-slow { 0%{filter:hue-rotate(0deg)} 100%{filter:hue-rotate(360deg)} }
      .animate-gradient-slow{ animation: gradient-slow 18s linear infinite; }
    `}
    </style>
  );
}

function CursorTrail() {
  type Particle = { id: number; x: number; y: number; life: number };
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      idRef.current += 1;
      const rect = document.body.getBoundingClientRect();
      setParticles((ps) => [
        ...ps.slice(-60),
        { id: idRef.current, x: e.clientX - rect.left, y: e.clientY - rect.top, life: 1 },
      ]);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const tick = () => {
      setParticles((ps) => ps.map((p) => ({ ...p, life: p.life - 0.03 })).filter((p) => p.life > 0));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute block h-2 w-2 rounded-full"
          style={{
            transform: `translate3d(${p.x}px,${p.y}px,0)`,
            opacity: p.life,
            background: "radial-gradient(circle, rgba(30,64,175,0.9) 0%, rgba(14,116,144,0.7) 60%, rgba(30,64,175,0) 70%)",
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
}
