import { toast } from "@/components/ui/sonner";
import { FileText, Clipboard, Save, ExternalLink, Settings2 } from "lucide-react";

type Resume = { id: string; title: string; preview?: string };
type Pitch = { id: string; snippet: string };
type Portfolio = { id: string; title: string; preview?: string };

const resumes: Resume[] = [
  { id: "r1", title: "Resume v1" },
  { id: "r2", title: "Resume v2" },
  { id: "r3", title: "Resume v3" },
];
const pitches: Pitch[] = [
  { id: "p1", snippet: "Problem: Long application cycles. Solution: AI-assisted summaries. Impact: 30% faster replies." },
  { id: "p2", snippet: "Problem: Low engagement. Solution: Interactive demos. Impact: +45% conversions." },
  { id: "p3", snippet: "Problem: Complex onboarding. Solution: Guided flows. Impact: -50% time-to-value." },
];
const portfolios: Portfolio[] = [
  { id: "pf1", title: "Portfolio v1" },
  { id: "pf2", title: "Portfolio v2" },
  { id: "pf3", title: "Portfolio v3" },
];

export default function ExportHub() {
  return (
    <section className="container py-10 md:py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Export Hub – Your Generated Content</h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">All your generated resumes, pitches, and portfolios in one place. Download, copy, or customize with a click.</p>
      </header>

      {/* Resumes */}
      <Section title="Resumes">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resumes.map((r) => (
            <ResumeCard key={r.id} title={r.title} preview={r.preview} />
          ))}
        </div>
      </Section>

      {/* Pitches */}
      <Section title="Pitches">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pitches.map((p) => (
            <PitchCard key={p.id} snippet={p.snippet} />
          ))}
        </div>
      </Section>

      {/* Portfolios */}
      <Section title="Portfolios">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolios.map((p) => (
            <PortfolioCard key={p.id} title={p.title} preview={p.preview} />
          ))}
        </div>
      </Section>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <article className="rounded-2xl border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {children}
    </article>
  );
}

function Button({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {children}
    </button>
  );
}

function ResumeCard({ title, preview }: { title: string; preview?: string }) {
  const handleDownload = () => toast.success("PDF download started");
  const handleEdit = () => toast.success("Opening editor…");

  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
          <FileText className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-xs text-muted-foreground">Preview and export your resume.</p>
        </div>
      </div>
      {preview ? (
        <img src={preview} alt="Resume preview" className="mt-4 h-36 w-full rounded-lg object-cover" />
      ) : (
        <div className="mt-4 h-36 w-full rounded-lg border bg-secondary/40" aria-hidden />
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={handleDownload}>Download PDF</Button>
        <Button onClick={handleEdit}>Edit</Button>
      </div>
    </Card>
  );
}

function PitchCard({ snippet }: { snippet: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(snippet).catch(() => {});
    toast.success("Pitch copied to clipboard");
  };
  const handleSave = () => toast.success("Saved as TXT");

  return (
    <Card>
      <h3 className="font-semibold">Pitch</h3>
      <p className="mt-2 text-sm text-foreground/90">{snippet}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={handleCopy}>
          <Clipboard className="mr-1 h-4 w-4" aria-hidden /> Copy
        </Button>
        <Button onClick={handleSave}>
          <Save className="mr-1 h-4 w-4" aria-hidden /> Save TXT
        </Button>
      </div>
    </Card>
  );
}

function PortfolioCard({ title, preview }: { title: string; preview?: string }) {
  const handleView = () => toast.success("Opening live preview…");
  const handleCustomize = () => toast.success("Opening customizer…");

  return (
    <Card>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
      </div>
      {preview ? (
        <img src={preview} alt={`${title} preview`} className="mt-4 h-36 w-full rounded-lg object-cover" />
      ) : (
        <div className="mt-4 grid h-36 w-full place-items-center rounded-lg border bg-secondary/40 text-muted-foreground">
          <span className="text-xs">Preview not available</span>
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={handleView}>
          <ExternalLink className="mr-1 h-4 w-4" aria-hidden /> View Live
        </Button>
        <Button onClick={handleCustomize}>
          <Settings2 className="mr-1 h-4 w-4" aria-hidden /> Customize
        </Button>
      </div>
    </Card>
  );
}
