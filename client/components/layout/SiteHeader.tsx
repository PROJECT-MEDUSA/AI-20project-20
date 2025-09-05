import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
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
        <Link
          to="/"
          className="flex items-center gap-2 font-extrabold tracking-tight text-xl"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white">
            ⚡
          </span>
          <span className="sr-only">AI Resume & Project Booster</span>
          <span aria-hidden>AI Resume</span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-6 text-base font-semibold"
        >
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `relative group inline-block transition-all duration-200 ${isActive ? "text-white" : "text-white/80"} hover:text-white hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.6)] hover:-translate-y-0.5`
              }
            >
              <span className="relative z-10">{n.label}</span>
              <span className="pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-sky-500 to-indigo-500 transition-transform duration-300 group-hover:scale-x-100" />
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={open}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/90 hover:bg-white/10"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link
            to="/auth"
            className="hidden sm:inline-flex rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-4 py-2 text-white shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
