import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-900/60">
      <div className="container py-10 text-sm text-white/80">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-extrabold text-lg">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white">
                ⚡
              </span>
              <span>AI Resume</span>
            </div>
            <p className="font-semibold">Empowering students since 2023</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2"><Link to="/about" className="hover:underline">Learn More</Link></h3>
            <ul className="space-y-2 font-semibold">
              <li><Link to="/#about" className="hover:underline">About Us</Link></li>
              <li>News & Updates</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Community</h3>
            <ul className="space-y-2 font-semibold">
              <li>Support Center</li>
              <li>Upgrade to Premium</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Connect</h3>
            <ul className="space-y-2 font-semibold">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-xs font-semibold text-white/70">
          © {new Date().getFullYear()} AI Resume & Project Booster. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
