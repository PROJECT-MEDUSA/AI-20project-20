import { useState } from "react";

export default function PortfolioBuilder() {
  const [theme, setTheme] = useState("Light");
  const [style, setStyle] = useState<"Modern" | "Classic">("Modern");

  const projects = [
    {
      title: "Project Alpha",
      description:
        "An innovative web app designed to streamline project management tasks.",
      img: "/placeholder.svg",
    },
    {
      title: "Project Beta",
      description:
        "A mobile application that enhances user engagement through interactive features.",
      img: "/placeholder.svg",
    },
    {
      title: "Project Gamma",
      description:
        "An e-commerce platform offering seamless shopping experiences.",
      img: "/placeholder.svg",
    },
  ];

  return (
    <section className="container py-8 md:py-10">
      <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
        <aside className="rounded-2xl border bg-secondary/60 p-4">
          <h2 className="text-sm font-semibold">Customize Layout</h2>
          <div className="mt-4">
            <label className="mb-1 block text-xs font-medium">Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Theme"
            >
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>

          <div className="mt-6">
            <span className="mb-1 block text-xs font-medium">Style</span>
            <div className="space-y-2 text-sm">
              {(["Modern", "Classic"] as const).map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="style"
                    value={opt}
                    checked={style === opt}
                    onChange={() => setStyle(opt)}
                    className="h-4 w-4 text-primary"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Your Portfolio</h1>
            <button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow hover:brightness-110">
              Share Portfolio
            </button>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <article key={p.title} className="max-w-sm">
                <img
                  src={p.img}
                  alt="Project thumbnail"
                  className="h-44 w-full rounded-2xl object-cover"
                />
                <h3 className="mt-3 text-base font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
