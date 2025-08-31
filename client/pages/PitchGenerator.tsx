import { useState } from "react";

export default function PitchGenerator() {
  const [description, setDescription] = useState("");
  const [pitch, setPitch] = useState<string | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const base = description.trim() || "an innovative project that leverages cutting-edge AI technology to revolutionize the industry";
    setPitch(
      `Introducing ${base}, designed to clearly communicate value, engage audiences, and highlight outcomes. This concise pitch showcases impact, differentiators, and next steps to inspire action.`,
    );
  };

  return (
    <section className="container py-10 md:py-14">
      <h1 className="text-2xl font-semibold">Generate Your Pitch</h1>
      <p className="mt-1 text-sm text-muted-foreground">Describe your project or job you are pitching:</p>

      <form onSubmit={handleGenerate} className="mt-4 max-w-3xl">
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter your project description here..."
          aria-label="Project description"
          className="w-full rounded-full border bg-background px-5 py-3.5 shadow-sm outline-none transition focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-6 py-3 font-semibold text-white shadow transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
        >
          Generate Pitch
        </button>
      </form>

      {pitch && (
        <div className="mt-6 max-w-3xl rounded-2xl border bg-secondary/60 p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-foreground">Your AI-Generated Pitch</h2>
          <p className="mt-3 text-foreground/90">{pitch}</p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setPitch(pitch + " ")}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-foreground shadow hover:bg-white/90"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => setPitch(null)}
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow hover:brightness-110"
            >
              Regenerate
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
