import { RequestHandler } from "express";
import { ExportHubResponse } from "@shared/api";

export const handleExports: RequestHandler = (_req, res) => {
  const data: ExportHubResponse = {
    resumes: [
      { id: "r1", title: "Resume v1", preview: null },
      { id: "r2", title: "Resume v2", preview: null },
      { id: "r3", title: "Resume v3", preview: null },
    ],
    pitches: [
      {
        id: "p1",
        snippet:
          "Problem: Long application cycles. Solution: AI-assisted summaries. Impact: 30% faster replies.",
      },
      {
        id: "p2",
        snippet:
          "Problem: Low engagement. Solution: Interactive demos. Impact: +45% conversions.",
      },
      {
        id: "p3",
        snippet:
          "Problem: Complex onboarding. Solution: Guided flows. Impact: -50% time-to-value.",
      },
    ],
    portfolios: [
      { id: "pf1", title: "Portfolio v1", preview: null },
      { id: "pf2", title: "Portfolio v2", preview: null },
      { id: "pf3", title: "Portfolio v3", preview: null },
    ],
  };

  res.json(data);
};
