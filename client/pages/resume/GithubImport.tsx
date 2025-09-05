import { useState } from "react";
import type { ResumeData } from "./exporters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function GithubImport({ onMerge }: { onMerge: (data: Partial<ResumeData>) => void }) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    if (!username.trim()) return;
    setLoading(true); setError(null);
    try {
      const u = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`).then(r => r.json());
      const repos = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`).then(r => r.json());
      const skills = new Set<string>();
      for (const r of repos || []) {
        if (r.language) skills.add(r.language);
      }
      const partial: Partial<ResumeData> = {
        profile: { firstName: "", middleName: "", lastName: "", gender: "", dob: "", maritalStatus: "", profession: "", address: "", nationality: "", passportNumber: "", phone: "", email: "", ...(u?.email ? { email: u.email } : {}), } as any,
        summary: u?.bio || "",
        skills: Array.from(skills).slice(0, 12).map((name) => ({ id: crypto.randomUUID(), name, level: "Intermediate" as const })),
      };
      onMerge(partial);
    } catch (e) {
      setError("Failed to fetch GitHub data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border bg-card p-4">
      <div className="mb-2 text-sm font-semibold">Import from GitHub</div>
      <div className="flex gap-2">
        <Input placeholder="github username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Button type="button" onClick={run} disabled={loading}>{loading ? "Importing..." : "Import"}</Button>
      </div>
      {error && <div className="mt-2 text-xs text-red-400">{error}</div>}
      <p className="mt-2 text-xs text-muted-foreground">We use public profile and repositories to suggest summary and skills.</p>
    </div>
  );
}
