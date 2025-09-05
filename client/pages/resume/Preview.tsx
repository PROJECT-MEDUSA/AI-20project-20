import { motion } from "framer-motion";
import { ResumeData } from "./exporters";

export type TemplateId = "classic" | "modern" | "minimal";

export function ResumePreview({ data, template, order, ats, accent }: { data: ResumeData; template: TemplateId; order: string[]; ats: boolean; accent: string; }) {
  const T = templates[template] ?? templates.classic;
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl border bg-white text-slate-900 shadow-md ${ats ? "!bg-white !text-slate-900" : ""}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6" id="resume-print-root">
        <T data={data} order={order} accent={accent} ats={ats} />
      </div>
    </motion.div>
  );
}

const templates: Record<TemplateId, React.FC<{ data: ResumeData; order: string[]; accent: string; ats: boolean }>> = {
  classic: ({ data, order, accent }) => (
    <div className="font-sans">
      <Header data={data} accent={accent} subtitle />
      {order.map((sec) => (
        <Section key={sec} title={sectionTitle(sec)}>
          <SectionBody id={sec} data={data} accent={accent} />
        </Section>
      ))}
    </div>
  ),
  modern: ({ data, order, accent }) => (
    <div className="font-sans">
      <Header data={data} accent={accent} pill />
      <div className="grid gap-6 md:grid-cols-[1fr_260px]">
        <div>
          {order.filter((s) => s !== "skills").map((sec) => (
            <Section key={sec} title={sectionTitle(sec)}>
              <SectionBody id={sec} data={data} accent={accent} />
            </Section>
          ))}
        </div>
        <aside>
          <Section title="Skills">
            <SectionBody id="skills" data={data} accent={accent} />
          </Section>
        </aside>
      </div>
    </div>
  ),
  minimal: ({ data, order, accent }) => (
    <div className="font-sans">
      <Header data={data} accent={accent} underline />
      {order.map((sec) => (
        <div key={sec} className="mt-4">
          <SectionBody id={sec} data={data} accent={accent} />
        </div>
      ))}
    </div>
  ),
};

function Header({ data, accent, subtitle, underline, pill }: { data: ResumeData; accent: string; subtitle?: boolean; underline?: boolean; pill?: boolean }) {
  const name = [data.profile.firstName, data.profile.middleName, data.profile.lastName].filter(Boolean).join(" ") || "Your Name";
  const title = data.profile.profession || "Professional Title";
  const contact = [data.profile.email, data.profile.phone, data.media.website || data.media.linkedin].filter(Boolean).join("  •  ");
  return (
    <div className="mb-4">
      <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: accent }}>{name}</h1>
      {subtitle && <div className="text-sm font-semibold text-slate-600">{title}</div>}
      {pill && <div className="mt-1 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{title}</div>}
      {underline && <div className="mt-1 h-0.5 w-24" style={{ background: accent }} />}
      <div className="mt-1 text-xs text-slate-600">{contact}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h2 className="mb-2 text-lg font-bold text-slate-800">{title}</h2>
      <div className="space-y-2 text-sm text-slate-800">{children}</div>
    </div>
  );
}

function SectionBody({ id, data, accent }: { id: string; data: ResumeData; accent: string }) {
  switch (id) {
    case "summary":
      return <p className="whitespace-pre-line text-slate-800">{data.summary || "Write a concise, impactful summary of 2–3 sentences."}</p>;
    case "experience":
      return (
        <div className="space-y-3">
          {data.experience.map((e) => (
            <div key={e.id}>
              <div className="font-semibold">{[e.jobTitle, e.employer].filter(Boolean).join(" — ")}</div>
              <div className="text-xs text-slate-600">{[[e.startDate, e.current ? "Present" : e.endDate].filter(Boolean).join(" – "), [e.city, e.state].filter(Boolean).join(", ")].filter(Boolean).join("  •  ")}</div>
              <ul className="ml-4 list-disc">
                {splitLines(e.responsibilities).map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "education":
      return (
        <div className="space-y-2">
          {data.education.map((ed) => (
            <div key={ed.id}>
              <div className="font-semibold">{ed.school}</div>
              <div className="text-xs text-slate-600">{[[ed.degree, ed.fieldOfStudy].filter(Boolean).join(", "), [ed.startDate, ed.current ? "Present" : ed.endDate].filter(Boolean).join(" – ")].filter(Boolean).join("  •  ")}</div>
            </div>
          ))}
        </div>
      );
    case "skills":
      return (
        <div className="flex flex-wrap gap-2">
          {data.skills.filter((s) => s.name).map((s) => (
            <span key={s.id} className="rounded-full border px-2.5 py-1 text-xs" style={{ borderColor: accent, color: accent }}>
              {s.name}
            </span>
          ))}
        </div>
      );
    case "interests":
      return (
        <div className="flex flex-wrap gap-2">
          {data.interests.map((i, idx) => (
            <span key={idx} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">{i}</span>
          ))}
        </div>
      );
    case "contact":
      return (
        <div className="text-sm">
          <div className="font-semibold" style={{ color: accent }}>Contact</div>
          <div>{data.profile.email}</div>
          <div>{data.profile.phone}</div>
          <div>{data.media.website || data.media.linkedin}</div>
          <div>{data.profile.address}</div>
        </div>
      );
    default:
      return null;
  }
}

function sectionTitle(id: string) {
  switch (id) {
    case "summary":
      return "Summary";
    case "experience":
      return "Experience";
    case "education":
      return "Education";
    case "skills":
      return "Skills";
    case "interests":
      return "Interests";
    case "contact":
      return "Contact";
    default:
      return id;
  }
}

function splitLines(s: string) {
  return s
    .split(/\r?\n/)
    .map((t) => t.trim())
    .filter(Boolean);
}
