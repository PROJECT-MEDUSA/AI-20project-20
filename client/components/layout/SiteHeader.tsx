import { Link, NavLink } from "react-router-dom";

export default function SiteHeader() {
  const nav = [
    { to: "/", label: "Home" },
    { to: "/resume", label: "Resume Builder" },
    { to: "/pitch", label: "Pitch Generator" },
    { to: "/portfolio", label: "Portfolio Builder" },
    { to: "/export", label: "Export Hub" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/70 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight text-xl">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white">⚡</span>
          <span className="sr-only">AI Resume & Project Booster</span>
          <span aria-hidden>AI Resume</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6 text-sm font-medium">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `transition-colors hover:text-foreground/80 ${isActive ? "text-foreground" : "text-foreground/60"}`
              }
            >
              <span className="relative z-10">{n.label}</span>
              <span className="pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-sky-500 to-indigo-500 transition-transform duration-300 group-hover:scale-x-100" />
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/resume"
            className="rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-4 py-2 text-white shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
