import { useEffect, useMemo, useState } from "react";
import type { ResumeData } from "./exporters";
import { motion } from "framer-motion";

export function AssistantPanel({ data, focus }: { data: ResumeData; focus: string }) {
  const [tips, setTips] = useState<string[]>([]);

  const gen = useMemo(() => buildTips(data, focus), [data, focus]);
  useEffect(() => setTips(gen), [gen]);

  return (
    <div className="rounded-2xl border bg-card p-4">
      <div className="mb-2 text-sm font-semibold">Writing Assistant</div>
      <motion.ul className="space-y-2 text-sm text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {tips.map((t, i) => (
          <li key={i} className="rounded-lg bg-muted/40 p-2">{t}</li>
        ))}
      </motion.ul>
    </div>
  );
}

function buildTips(data: ResumeData, focus: string) {
  const out: string[] = [];
  if (focus === "summary") {
    out.push("Start with a strong identity: role + domain.");
    out.push("Mention 2–3 achievements with impact numbers.");
    out.push("End with what you’re aiming for next.");
  }
  if (focus === "experience") {
    out.push("Lead bullets with action verbs (Built, Led, Shipped, Optimized).");
    out.push("Quantify results (↑ performance 30%, ↓ load time 1.2s).");
    out.push("Keep to 4–6 bullets per role, most recent first.");
  }
  if (focus === "skills") {
    out.push("Group by category: Languages, Frameworks, Tools.");
    out.push("Prioritize job‑relevant skills near the top.");
  }
  if (focus === "education") {
    out.push("Include degree, institution, dates, and highlights (GPA, awards).");
  }
  if (focus === "contact") {
    out.push("Use a professional email and add a portfolio link.");
  }
  if (out.length === 0) {
    out.push("Need help? Edit a section and I’ll suggest tips.");
  }
  return out;
}
