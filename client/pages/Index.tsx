import { Link } from "react-router-dom";
import { FileText, Rocket, Presentation, Layout as LayoutIcon, Sparkles } from "lucide-react";


export default function Index() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary to-white">
        {/* Background artwork from uploaded design */}
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F5c1e1858d3914c64b045e31e9b4fd580%2F5cfe91acdcc04de5a0a1bedc460a66b5?format=webp&width=1600"
          alt="Colorful abstract background from landing design"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-35"
        />
        <div className="container py-20 md:py-28 text-center">
          <div className="mx-auto max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-foreground/70 shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
              AI Resume & Project Booster
            </span>
            <h1 className="mt-5 text-4xl/tight font-extrabold md:text-6xl/tight">
              Boost your resume
              <br className="hidden md:block" /> and projects with AI
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

      {/* Why important */}
      <section className="bg-secondary/50">
        <div className="container py-12 md:py-16">
          <h2 className="text-3xl font-extrabold tracking-tight">WHY IS IT IMPORTANT</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">Our tools help students present their best selves: save time with AI assistance, communicate clearly with polished pitches, and showcase work beautifully. Everything exports cleanly and is accessible anywhere.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <BenefitCard icon={<FileText className="h-6 w-6" aria-hidden />} title="Save hours on formatting" description="Generate structured resumes and documents with consistent design and strong content hints." />
            <BenefitCard icon={<Presentation className="h-6 w-6" aria-hidden />} title="Tell a clear story" description="Turn projects into compelling pitches that highlight problem, solution, and impact." />
            <BenefitCard icon={<Rocket className="h-6 w-6" aria-hidden />} title="Stand out & share fast" description="Export to PDF/TXT or share live links so recruiters and peers can view your work instantly." />
          </div>
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

function BenefitCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <article className="rounded-2xl border bg-card p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{description}</p>
    </article>
  );
}
