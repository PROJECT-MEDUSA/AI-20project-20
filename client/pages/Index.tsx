import { Link } from "react-router-dom";
import { FileText, Rocket, Presentation, Layout as LayoutIcon, Sparkles } from "lucide-react";

export default function Index() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary to-white">
        <div className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/40 via-fuchsia-400/30 to-transparent" />
        <div className="container py-20 md:py-28 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground/70">
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
              AI Resume & Project Booster
            </div>
            <h1 className="mt-5 text-4xl/tight font-extrabold md:text-6xl/tight">
              Boost your resume and projects with AI
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              Build standout resumes, generate compelling pitches, and craft beautiful portfolios using student-friendly tools.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/resume"
                className="rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Get Started
              </Link>
              <a
                href="#features"
                className="rounded-full border bg-white/80 px-6 py-3 font-semibold text-foreground/80 backdrop-blur transition hover:bg-white"
              >
                Explore Features
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container py-12 md:py-16">
        <h2 className="text-3xl font-bold">Key Features</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <FeatureCard icon={<FileText aria-hidden className="h-6 w-6" />} title="Resume Builder" description="Leverage AI to create professional resumes that highlight your skills and achievements." />
          <FeatureCard icon={<Presentation aria-hidden className="h-6 w-6" />} title="Pitch Generator" description="Craft compelling pitches that capture attention and convey your ideas effectively." />
          <FeatureCard icon={<LayoutIcon aria-hidden className="h-6 w-6" />} title="Portfolio Builder" description="Showcase your projects and achievements in a visually appealing portfolio." />
        </div>
      </section>

      {/* CTA band */}
      <section className="py-14">
        <div className="container">
          <div className="rounded-2xl bg-gradient-to-r from-primary to-fuchsia-500 p-8 text-white shadow-xl md:p-10">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h3 className="text-2xl font-bold">Ready to stand out?</h3>
                <p className="text-white/90">Start building your resume and portfolio in minutes.</p>
              </div>
              <Link
                to="/resume"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-primary transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Rocket className="h-5 w-5" aria-hidden />
                Build Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary/50">
        <div className="container py-12 md:py-16">
          <h2 className="text-3xl font-bold">What our users say</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <Testimonial name="Alex Johnson" quote="This tool transformed my job hunt!" />
            <Testimonial name="Maria Gomez" quote="The portfolio builder helped me showcase my projects professionally." />
            <Testimonial name="James Lee" quote="The pitch generator is a game changer!" />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <article className="rounded-2xl border bg-card p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="mt-3 text-muted-foreground">{description}</p>
    </article>
  );
}

function Testimonial({ name, quote }: { name: string; quote: string }) {
  return (
    <figure className="rounded-2xl border bg-card p-6 shadow-sm">
      <blockquote className="text-foreground">“{quote}”</blockquote>
      <figcaption className="mt-4 text-sm font-medium text-muted-foreground">{name}</figcaption>
    </figure>
  );
}
