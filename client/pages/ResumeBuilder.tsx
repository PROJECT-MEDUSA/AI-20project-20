export default function ResumeBuilder() {
  return (
    <section className="container py-8 md:py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* LEFT: Form panels */}
        <div className="space-y-6">
          <Panel title="Personal Information">
            <UnderlineInput placeholder="Full Name" aria-label="Full Name" />
            <UnderlineInput placeholder="Email Address" type="email" aria-label="Email Address" />
            <UnderlineInput placeholder="Phone Number" type="tel" aria-label="Phone Number" />
          </Panel>

          <Panel title="Skills">
            <UnderlineInput placeholder="Add your skills here..." aria-label="Skills" />
          </Panel>

          <Panel title="Experiences">
            <UnderlineInput placeholder="Job Title" aria-label="Job Title" />
            <UnderlineInput placeholder="Company Name" aria-label="Company Name" />
            <UnderlineInput placeholder="Duration" aria-label="Duration" />
          </Panel>

          <button
            type="button"
            className="w-full rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-6 py-3 font-semibold text-white shadow transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Download as PDF"
          >
            Download as PDF
          </button>
        </div>

        {/* RIGHT: Live preview */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Live Preview</h2>
          <div className="mt-4 rounded-xl border bg-white p-6">
            <article className="prose max-w-none text-sm">
              <h3 className="mt-0 mb-2 text-base font-bold">[Full Name]</h3>
              <p className="m-0 text-muted-foreground">[Email Address]</p>
              <p className="m-0 text-muted-foreground">[Phone Number]</p>

              <h4 className="mt-6 mb-2 text-base font-bold">Skills</h4>
              <ul className="m-0 list-disc pl-5">
                <li>Skill 1</li>
                <li>Skill 2</li>
                <li>Skill 3</li>
              </ul>

              <h4 className="mt-6 mb-2 text-base font-bold">Experiences</h4>
              <section className="space-y-4">
                <div>
                  <p className="m-0 font-semibold">Job Title</p>
                  <p className="m-0">Company Name</p>
                  <p className="m-0 text-muted-foreground">Duration</p>
                </div>
                <div>
                  <p className="m-0 font-semibold">Job Title</p>
                  <p className="m-0">Company Name</p>
                  <p className="m-0 text-muted-foreground">Duration</p>
                </div>
              </section>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-2xl border bg-white p-5 shadow-sm">
      <legend className="px-1 text-sm font-semibold text-foreground">{title}</legend>
      <div className="mt-3 space-y-3">{children}</div>
    </fieldset>
  );
}

function UnderlineInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-md border bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-ring"
    />
  );
}
