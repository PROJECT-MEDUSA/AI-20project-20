import { motion } from "framer-motion";
import type { ResumeData } from "./exporters";

export function StrengthMeter({ data }: { data: ResumeData }) {
  const { score, level, tips } = evaluate(data);
  return (
    <div className="rounded-2xl border bg-card p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Resume Strength</h3>
        <span className="text-xs text-muted-foreground">{level} • {score}%</span>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-500"
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
        />
      </div>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-muted-foreground">
        {tips.map((t, i) => (<li key={i}>{t}</li>))}
      </ul>
    </div>
  );
}

function evaluate(data: ResumeData) {
  let score = 0;
  let tips: string[] = [];
  const add = (v: number) => (score = Math.min(100, score + v));

  if (data.profile.firstName && data.profile.lastName) add(8); else tips.push("Add your full name.");
  if (data.profile.profession) add(6); else tips.push("Add a clear professional title.");
  if (data.profile.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) add(6); else tips.push("Fix email format.");
  if (data.summary.length >= 120) add(12); else tips.push("Write a 2–3 sentence summary (120+ chars).");
  if (data.experience.length) add(18); else tips.push("Add at least one experience entry.");
  const bullets = data.experience.flatMap((e) => e.responsibilities.split(/\n/).filter(Boolean));
  if (bullets.length >= 3) add(12); else tips.push("Add 3+ bullet points with impact.");
  if (bullets.some((b) => /\d/.test(b))) add(8); else tips.push("Quantify achievements with numbers.");
  const verbs = [/led|built|improved|delivered|designed|launched|automated|reduced|optimized/i];
  if (bullets.some((b) => verbs.some((v) => v.test(b)))) add(8); else tips.push("Use strong action verbs.");
  if (data.skills.filter((s) => s.name).length >= 6) add(10); else tips.push("List 6+ relevant skills.");
  if (data.education.length) add(8);
  if (data.media.linkedin || data.media.website) add(6); else tips.push("Add a portfolio or LinkedIn link.");

  const level = score > 80 ? "Strong" : score > 60 ? "Good" : score > 40 ? "Fair" : "Starter";
  tips = tips.slice(0, 5);
  return { score, level, tips };
}
