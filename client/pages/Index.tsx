import { Link } from "react-router-dom";
import { FileText, Rocket, Presentation, Layout as LayoutIcon, Sparkles } from "lucide-react";

const PREVIEW_IMAGES = [
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2F5c1e1858d3914c64b045e31e9b4fd580%2F5cfe91acdcc04de5a0a1bedc460a66b5?format=webp&width=1200",
    alt: "Landing Page - AI Resume & Project Booster",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2F5c1e1858d3914c64b045e31e9b4fd580%2F253a7ea37a4f473283365b66b74bf0e1?format=webp&width=1200",
    alt: "Landing variant preview",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2F5c1e1858d3914c64b045e31e9b4fd580%2Ffae3513531d04555a4946e337a6008d7?format=webp&width=1200",
    alt: "Resume form step",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2F5c1e1858d3914c64b045e31e9b4fd580%2Fc0fc9f2891624cae97e35149874d9e41?format=webp&width=1200",
    alt: "Export Hub Page",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2F5c1e1858d3914c64b045e31e9b4fd580%2F58fe8b067121458e983cfcbbb0d41e96?format=webp&width=1200",
    alt: "Portfolio Builder",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2F5c1e1858d3914c64b045e31e9b4fd580%2Fc1d07f9054f34366ac75ad5fa60f048a?format=webp&width=1200",
    alt: "Pitch Generator",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2F5c1e1858d3914c64b045e31e9b4fd580%2F3b320fb3116b4be3ac2816cb60c5b60c?format=webp&width=1200",
    alt: "Resume Builder live preview",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2F5c1e1858d3914c64b045e31e9b4fd580%2F5440e76f934d42cd9b6244c7db1acd45?format=webp&width=1200",
    alt: "Profile page",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2F5c1e1858d3914c64b045e31e9b4fd580%2Ffd073c7adf504b50ad77b0524d2cdf77?format=webp&width=1200",
    alt: "About section",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets%2F5c1e1858d3914c64b045e31e9b4fd580%2F09aa4d086a024ca0a53395384f46ad19?format=webp&width=1200",
    alt: "Success page",
  },
];

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

      {/* Screens Gallery from uploaded PNGs */}
      <section className="bg-secondary/50">
        <div className="container py-12 md:py-16">
          <h2 className="text-3xl font-bold">Product previews</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PREVIEW_IMAGES.slice(0, 6).map((img) => (
              <figure key={img.src} className="rounded-2xl border bg-card p-2 shadow-sm transition hover:shadow-md">
                <img src={img.src} alt={img.alt} className="h-56 w-full rounded-xl object-cover" />
                <figcaption className="sr-only">{img.alt}</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-6 text-center">
            <details>
              <summary className="cursor-pointer select-none text-sm text-muted-foreground hover:text-foreground">Show more previews</summary>
              <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {PREVIEW_IMAGES.slice(6).map((img) => (
                  <figure key={img.src} className="rounded-2xl border bg-card p-2 shadow-sm">
                    <img src={img.src} alt={img.alt} className="h-56 w-full rounded-xl object-cover" />
                    <figcaption className="sr-only">{img.alt}</figcaption>
                  </figure>
                ))}
              </div>
            </details>
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
