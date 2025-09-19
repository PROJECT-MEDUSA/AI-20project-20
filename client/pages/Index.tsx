import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Rocket,
  Presentation,
  Layout as LayoutIcon,
  Sparkles,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

export default function Index() {
  return (
    <div className="w-full relative bg-[#0a0612] text-white">
      <AnimatedStyles />
      <CursorTrail />

      {/* Hero */}
      <motion.section
        className="relative overflow-hidden bg-[radial-gradient(1200px_600px_at_50%_-20%,rgba(88,28,135,0.45),transparent),radial-gradient(1000px_600px_at_80%_0%,rgba(20,184,166,0.15),transparent)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* 3D Scene */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <color attach="background" args={["#0a0612"]} />
            <ambientLight intensity={0.6} />
            <pointLight position={[6, 6, 6]} intensity={1.2} color="#22d3ee" />
            <pointLight position={[-6, -4, -8]} intensity={0.9} color="#f472b6" />
            <StarsField />
            <CoreBrain />
            <group>
              <OrbitFeature radius={3.8} speed={0.5} angle={0} label="Resume" color="#22d3ee" href="/resume" />
              <OrbitFeature radius={3.8} speed={0.5} angle={2.09} label="Pitch" color="#a78bfa" href="/pitch" />
              <OrbitFeature radius={3.8} speed={0.5} angle={4.18} label="Portfolio" color="#f472b6" href="/portfolio" />
            </group>
          </Canvas>
        </div>

        <div className="container py-24 md:py-32 text-center relative z-10">
          <div className="mx-auto max-w-4xl">
            <motion.span
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 shadow-sm ring-1 ring-white/15 backdrop-blur"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
              Enter the AI Core
            </motion.span>

            <motion.h1
              className="mt-5 text-4xl/tight font-extrabold text-white md:text-6xl/tight drop-shadow-sm [text-shadow:0_1px_18px_rgba(139,92,246,0.35)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <TypewriterText text="AI Resume" />
              <br className="hidden md:block" />
              <motion.span
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Futuristic tools in a 3D space
              </motion.span>
            </motion.h1>

            <motion.p
              className="mt-4 text-lg text-white/85 md:text-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
            >
              Zoom into a holographic environment to build resumes, generate pitches, and craft portfolios.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Link
                to="/auth"
                className="group rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white shadow-[0_10px_30px_rgba(34,211,238,0.25)] backdrop-blur transition will-change-transform hover:scale-105 hover:shadow-[0_0_30px_rgba(167,139,250,0.55)] hover:[transform:perspective(700px)_rotateX(6deg)_rotateY(-6deg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                Get Started
              </Link>
              <a
                href="#features"
                className="group rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white/90 backdrop-blur transition hover:bg-white/15 hover:shadow-[0_0_24px_rgba(244,114,182,0.35)] hover:[transform:perspective(700px)_rotateX(6deg)_rotateY(6deg)]"
              >
                Explore Features
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        id="features"
        className="container py-12 md:py-16"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold">Key Features</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={<FileText aria-hidden className="h-6 w-6" />}
            title="Resume Builder"
            description="Leverage AI to create professional resumes that highlight your skills and achievements."
          />
          <FeatureCard
            icon={<Presentation aria-hidden className="h-6 w-6" />}
            title="Pitch Generator"
            description="Craft compelling pitches that capture attention and convey your ideas effectively."
          />
          <FeatureCard
            icon={<LayoutIcon aria-hidden className="h-6 w-6" />}
            title="Portfolio Builder"
            description="Showcase your projects and achievements in a visually appealing portfolio."
          />
        </div>
      </motion.section>

      {/* Why important */}
      <motion.section
        className="bg-slate-900/60"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container py-12 md:py-16">
          <h2 className="text-3xl font-extrabold tracking-tight">
            WHY IS IT IMPORTANT
          </h2>
          <p className="mt-3 max-w-3xl text-white/70">
            Our tools help students present their best selves: save time with AI
            assistance, communicate clearly with polished pitches, and showcase
            work beautifully. Everything exports cleanly and is accessible
            anywhere.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <BenefitCard
              icon={<FileText className="h-6 w-6" aria-hidden />}
              title="Save hours on formatting"
              description="Generate structured resumes and documents with consistent design and strong content hints."
            />
            <BenefitCard
              icon={<Presentation className="h-6 w-6" aria-hidden />}
              title="Tell a clear story"
              description="Turn projects into compelling pitches that highlight problem, solution, and impact."
            />
            <BenefitCard
              icon={<Rocket className="h-6 w-6" aria-hidden />}
              title="Stand out & share fast"
              description="Export to PDF/TXT or share live links so recruiters and peers can view your work instantly."
            />
          </div>
        </div>
      </motion.section>

      {/* About Us */}
      <motion.section
        id="about"
        className="relative py-12 md:py-16"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-indigo-600/10 via-fuchsia-500/10 to-sky-500/10" />
        <div className="container grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">About Us</h2>
            <p className="mt-4 text-white/80">
              We are a team of three driven individuals united by a simple dream
              — to make student life easier, smarter, and more impactful.
              Throughout our own journey, we noticed how many students struggle
              when it comes to presenting themselves professionally. Great ideas
              often fail to shine because they are hidden behind weak resumes,
              confusing portfolios, or poorly structured pitches.
            </p>
            <p className="mt-3 text-white/80">
              That’s why we decided to take action. Our website is designed as a
              one-stop solution where students can build resumes that look
              professional, design portfolios that truly reflect their skills,
              and generate clear, structured pitches for their projects. We
              believe that technology should remove barriers, not create them —
              so we’ve built everything to be simple, intuitive, and
              beginner-friendly.
            </p>
            <p className="mt-3 text-white/80">
              This is only the first step of our bigger mission: to empower
              students to express their potential without limits. Whether it’s
              applying for an internship, presenting at a hackathon, or simply
              showcasing creativity, our platform makes sure every student has
              the tools to stand out. Together, we’re building more than just a
              website — we’re building a bridge between ideas and opportunities.
            </p>
          </div>
          <div>
            <div className="relative overflow-hidden rounded-2xl border bg-white/5 p-10 backdrop-blur-sm">
              <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(600px_300px_at_20%_20%,rgba(99,102,241,0.35),transparent),radial-gradient(600px_300px_at_80%_80%,rgba(236,72,153,0.35),transparent)]" />
              <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-[0_0_60px_rgba(99,102,241,0.45)]">
                <Users className="h-16 w-16" aria-hidden />
              </div>
              <p className="mt-6 text-center text-sm text-white/80">
                Teamwork, dreams, and student success
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Divider */}
      <div
        aria-hidden
        className="h-12 bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/20 to-sky-500/20"
      />

      {/* Our Scope */}
      <motion.section
        className="container py-12 md:py-16"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6 md:flex md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Our Scope
            </h2>
            <p className="mt-2 max-w-3xl text-white/80">
              Our vision goes beyond just building tools — we aim to empower
              students with the right resources to showcase their talent and
              ideas with confidence. From crafting polished resumes to creating
              personalized portfolios and transforming rough concepts into
              compelling pitches, our platform serves as a complete launchpad
              for student success. We believe that every idea deserves to be
              presented at its best, and with our website, students can focus on
              their creativity while we handle the presentation.
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group relative overflow-hidden rounded-2xl border bg-white/5 p-6 backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(99,102,241,0.25)]">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-md">
              <FileText className="h-5 w-5" aria-hidden />
            </div>
            <h3 className="mt-3 text-xl font-semibold">Resume Builder</h3>
            <p className="mt-2 text-white/70">
              Build professional, ATS-friendly resumes with clean layouts and
              smart hints.
            </p>
          </div>
          <div className="group relative overflow-hidden rounded-2xl border bg-white/5 p-6 backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(99,102,241,0.25)]">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-md">
              <LayoutIcon className="h-5 w-5" aria-hidden />
            </div>
            <h3 className="mt-3 text-xl font-semibold">Portfolio Creator</h3>
            <p className="mt-2 text-white/70">
              Design elegant portfolios that truly reflect your projects and
              skills.
            </p>
          </div>
          <div className="group relative overflow-hidden rounded-2xl border bg-white/5 p-6 backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(99,102,241,0.25)]">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-500 text-white shadow-md">
              <Presentation className="h-5 w-5" aria-hidden />
            </div>
            <h3 className="mt-3 text-xl font-semibold">Pitch Generator</h3>
            <p className="mt-2 text-white/70">
              Turn rough ideas into clear, structured pitches ready to present.
            </p>
          </div>
        </div>
      </motion.section>

      {/* CTA band */}
      <motion.section
        className="py-14"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl p-8 text-white shadow-xl md:p-10">
            <div className="absolute inset-0 z-0 animate-gradient-slow bg-[conic-gradient(at_30%_50%,#8b5cf6_0deg,#ec4899_120deg,#22d3ee_240deg,#8b5cf6_360deg)] opacity-90" />
            <div className="absolute inset-0 z-0 backdrop-blur-[2px]" />

            <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h3 className="text-2xl font-bold">Ready to stand out?</h3>
                <p className="text-white/90">
                  Start building your resume and portfolio in minutes.
                </p>
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

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
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
        <h3 className="text-xl font-semibold [text-shadow:0_1px_12px_rgba(99,102,241,0.25)]">
          {title}
        </h3>
      </div>
      <p className="mt-3 text-white/70">{description}</p>
    </motion.article>
  );
}

function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
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
        <h3 className="text-lg font-semibold [text-shadow:0_1px_12px_rgba(99,102,241,0.25)]">
          {title}
        </h3>
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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<{ x: number; y: number; life: number }[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastMoveRef = useRef<number>(performance.now());
  const lastFrameRef = useRef<number>(performance.now());

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvasRef.current = canvas;
    canvas.className = "pointer-events-none fixed inset-0 z-[999]";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d", { alpha: true })!;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let lastTime = 0;
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastTime > 16) {
        const x = Math.max(0, Math.min(window.innerWidth, e.clientX));
        const y = Math.max(0, Math.min(window.innerHeight, e.clientY));
        pointsRef.current.push({ x, y, life: 1 });
        if (pointsRef.current.length > 36) pointsRef.current.shift();
        lastTime = now;
        lastMoveRef.current = now;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const draw = () => {
      const now = performance.now();
      const dt = Math.min(64, now - lastFrameRef.current);
      lastFrameRef.current = now;

      // Clear in device-pixel space so no transform leaves artifacts
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      const pts = pointsRef.current;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const t = i / Math.max(1, pts.length - 1);
        const radius = 6 + (1 - t) * 8;
        const alpha = (0.35 + 0.35 * (1 - t)) * p.life;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        grd.addColorStop(0, `rgba(30,64,175,${alpha})`);
        grd.addColorStop(0.6, `rgba(14,116,144,${0.2 * p.life})`);
        grd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Fade out points over time, faster when idle
      const idleMs = now - lastMoveRef.current;
      const fadePerMs = idleMs > 80 ? 0.008 : 0.004;
      for (let i = 0; i < pts.length; i++) {
        pts[i].life -= fadePerMs * dt;
      }
      pointsRef.current = pts.filter((p) => p.life > 0.02);

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      canvas.remove();
    };
  }, []);

  return null;
}
