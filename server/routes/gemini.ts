import type { Request, Response } from "express";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  // We don't throw at import time to avoid crashing dev, handlers will report clearly
}

// Generic call to Gemini generateContent REST API
async function generateWithGemini(prompt: string, model = "gemini-1.5-flash") {
  if (!GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY in environment");
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(
    GEMINI_API_KEY,
  )}`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  } as const;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errTxt = await res.text().catch(() => "<no body>");
    throw new Error(`Gemini HTTP ${res.status}: ${errTxt}`);
  }

  const data = (await res.json()) as any;
  // Safely extract text from candidates
  const text =
    data?.candidates?.[0]?.content?.parts
      ?.map((p: any) => p?.text)
      .filter(Boolean)
      .join("\n") ??
    data?.candidates?.[0]?.content?.parts?.[0]?.text ??
    "";

  if (!text) {
    throw new Error("Gemini returned empty response");
  }
  return text as string;
}

export async function handleGeminiRefine(req: Request, res: Response) {
  try {
    const { idea } = (req.body || {}) as { idea?: string };
    if (!idea || !idea.trim()) {
      return res.status(400).json({ error: "Missing 'idea' in request body" });
    }

    const prompt = `You are an expert startup coach. Refine the following rough startup idea into a concise, professional description suitable for a pitch.\n\nConstraints:\n- 4–6 sentences total\n- Cover: Problem, Solution, Target Users, Differentiation, and Expected Impact\n- Be specific and clear\n\nRough idea:\n"""${idea.trim()}"""\n\nRefined description:`;

    const output = await generateWithGemini(prompt);
    return res.json({ text: output });
  } catch (err: any) {
    return res.status(500).json({ error: String(err?.message || err) });
  }
}

export async function handleGeminiCompile(req: Request, res: Response) {
  try {
    const { refined, note, visualUrl } = (req.body || {}) as {
      refined?: string;
      note?: string;
      visualUrl?: string;
    };

    const refinedText = (refined || "").trim();
    if (!refinedText) {
      return res
        .status(400)
        .json({ error: "Missing 'refined' summary in request body" });
    }

    const instructions = (note || "").trim();

    const prompt = `Create a concise pitch deck outline based on the refined summary below. Output as clear markdown with section headings and short bullet points. Prioritize clarity over fluff.\n\nSections to include:\n- Title Slide (tagline)\n- Problem\n- Solution\n- Market & Audience\n- Business Model\n- Product (features)\n- Roadmap\n- Call to Action\n${visualUrl ? `- Visual Notes (explain how to use this visual: ${visualUrl})` : ""}\n\nRefined summary:\n"""${refinedText}"""\n\n${instructions ? `Additional instructions: ${instructions}\n\n` : ""}Return the deck in markdown starting with '# Title Slide'.`;

    const output = await generateWithGemini(prompt);
    return res.json({ text: output });
  } catch (err: any) {
    return res.status(500).json({ error: String(err?.message || err) });
  }
}
