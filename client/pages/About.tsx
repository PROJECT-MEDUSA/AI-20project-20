import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Layout as LayoutIcon, Presentation, Target, Sparkles } from "lucide-react";

export default function About() {
  return (
    <div className="relative w-full bg-slate-950 text-white">
      <AnimatedStyles />
      <BackgroundDecor />

      {/* Hero */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container relative z-10 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <motion.span
              className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs font-semibold text-foreground/70 shadow-sm backdrop-blur"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
              Learn More About Us
            </motion.span>

            <motion.h1
              className="mt-5 text-4xl/tight font-extrabold text-white/95 md:text-6xl/tight [text-shadow:0_1px_18px_rgba(139,92,246,0.25)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              Learn More About Us
            </motion.h1>
            <motion.p
              className="mx-auto mt-4 max-w-3xl text-lg text-white/85 md:text-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              We empower students to turn potential into opportunity — with tools that make resumes, portfolios, and project pitches effortless and exceptional.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Mission */}
      <motion.section
        className="container grid items-center gap-10 py-12 md:grid-cols-2 md:py-16"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/20">
            <Target className="h-3.5 w-3.5 text-primary" aria-hidden />
            Mission
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Helping students present their best selves</h2>
          <p className="mt-4 text-white/80">
            Our mission is simple: make it remarkably easy for students to create professional resumes, polished portfolios, and compelling project pitches — without stress or confusion. We combine thoughtful design with AI assistance to help you communicate your strengths clearly and confidently.
          </p>
          <p className="mt-3 text-white/80">
            Whether you’re applying for internships, sharing work with recruiters, or presenting at events, our platform provides a guided, beginner‑friendly experience that produces impressive results.
          </p>
        </div>
        <div>
          <div className="relative overflow-hidden rounded-2xl border bg-white/5 p-8 backdrop-blur-md">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(500px_260px_at_20%_20%,rgba(99,102,241,0.35),transparent),radial-gradient(500px_260px_at_80%_80%,rgba(236,72,153,0.35),transparent)]" />
            <div className="mx-auto grid max-w-md grid-cols-2 gap-4">
              <Stat number="10k+" label="students guided" />
              <Stat number="4.8/5" label="avg satisfaction" />
              <Stat number="30min" label="to first draft" />
              <Stat number="100%" label="free to start" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        className="relative bg-slate-900/60"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container py-12 md:py-16">
          <h2 className="text-3xl font-extrabold tracking-tight">What you can build</h2>
          <p className="mt-2 max-w-3xl text-white/75">
            Three focused tools — each designed for clarity, speed, and standout results.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<FileText className="h-6 w-6" aria-hidden />}
              title="Resume Builder"
              description="Create ATS‑friendly resumes with clean layouts, strong phrasing, and smart section guidance."
              gradient="from-indigo-500 to-fuchsia-500"
            />
            <FeatureCard
              icon={<LayoutIcon className="h-6 w-6" aria-hidden />}
              title="Portfolio Creator"
              description="Showcase projects beautifully with visual sections, case‑study style layouts, and easy sharing."
              gradient="from-sky-500 to-indigo-600"
            />
            <FeatureCard
              icon={<Presentation className="h-6 w-6" aria-hidden />}
              title="Pitch Generator"
              description="Turn rough ideas into compelling narratives that highlight problem, solution, and impact."
              gradient="from-fuchsia-500 to-pink-500"
            />
          </div>
        </div>
      </motion.section>

      {/* Vision */}
      <motion.section
        className="container grid items-center gap-10 py-12 md:grid-cols-2 md:py-16"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Our Vision</h2>
          <p className="mt-4 text-white/80">
            We believe every student deserves the chance to be seen. Our vision is a world where talent speaks louder than templates — where your ideas, effort, and creativity shine without limits.
          </p>
          <p className="mt-3 text-white/80">
            By blending smart defaults with flexible customization, we help you tell a memorable story. You bring the work; we’ll help it resonate.
          </p>
        </div>
        <div>
          <div className="relative overflow-hidden rounded-2xl border bg-white/5 p-10 text-center backdrop-blur-md">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(520px_260px_at_30%_30%,rgba(99,102,241,0.3),transparent),radial-gradient(520px_260px_at_70%_70%,rgba(236,72,153,0.3),transparent)]" />
            <blockquote className="mx-auto max-w-md text-xl font-semibold text-white/90">
              "Power belongs to those who share their work. We make that first step simple, beautiful, and brave."
            </blockquote>
            <div aria-hidden className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <p className="mt-2 text-sm text-white/70">— The Team</p>
          </div>
        </div>
      </motion.section>

      {/* CTA */}
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
                <h3 className="text-2xl font-bold">Start building your future today</h3>
                <p className="text-white/90">Create your first resume, portfolio, or pitch in minutes — free to start.</p>
              </div>
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-primary transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white [box-shadow:0_0_0_0_rgba(236,72,153,0.6)] hover:[box-shadow:0_0_0_8px_rgba(236,72,153,0.15)]"
              >
                Start Building Today
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
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl border bg-white/40 p-6 shadow-sm backdrop-blur-xl transition hover:shadow-xl hover:[box-shadow:0_10px_40px_rgba(139,92,246,0.25)] hover:border-fuchsia-400/70"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-white shadow-md`}>
        {icon}
      </div>
      <h3 className="mt-3 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-white/75">{description}</p>
    </motion.article>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-xl border bg-white/10 p-4 text-center shadow-sm backdrop-blur">
      <div className="text-2xl font-extrabold tracking-tight">{number}</div>
      <div className="mt-1 text-xs font-semibold uppercase text-white/70">{label}</div>
    </div>
  );
}

function BackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -left-16 top-16 h-72 w-72 animate-float-slow rounded-full bg-blue-700/15 blur-3xl" />
      <div className="absolute right-10 top-10 h-80 w-80 animate-float-slower rounded-full bg-indigo-800/20 blur-3xl" />
      <div className="absolute bottom-10 left-10 h-72 w-72 animate-float-slowest rounded-full bg-sky-600/15 blur-3xl" />
    </div>
  );
}

function AnimatedStyles() {
  return (
    <style>
      {`
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
