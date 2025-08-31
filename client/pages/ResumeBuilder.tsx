export default function ResumeBuilder() {
  return (
    <section className="container py-10 md:py-14">
      {/* Stepper */}
      <nav aria-label="Progress" className="mx-auto max-w-3xl">
        <ol className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
          {[
            "Create",
            "Add Projects",
            "Preview",
            "Enter Personal",
            "Choose",
            "Download",
          ].map((label, i) => (
            <li key={label} className="flex-1">
              <div className="flex items-center gap-2">
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full border ${
                    i < 3 ? "bg-primary text-white border-primary" : "bg-secondary text-foreground"
                  }`}
                  aria-current={i === 3 ? "step" : undefined}
                >
                  {i + 1}
                </span>
                <span className="hidden sm:block">{label}</span>
              </div>
            </li>
          ))}
        </ol>
      </nav>

      <h1 className="mt-10 text-3xl font-bold">Enhance Your Resume</h1>
      <p className="text-muted-foreground">Please fill in your details</p>

      {/* Layout: Form left, Image UI preview right */}
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Form */}
        <form className="grid content-start gap-6" aria-labelledby="personal-info">
          <fieldset>
            <legend id="personal-info" className="text-lg font-semibold">Personal Information</legend>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              <Input label="Email Address" type="email" placeholder="your.email@example.com" />
              <Input label="Phone Number" type="tel" placeholder="+(XX) XX XX XX XX" />
              <Input label="Full Name" placeholder="First Last" />
              <Input label="Graduation Date" placeholder="MM/YYYY" />
              <div className="md:col-span-2 grid gap-6 md:grid-cols-2">
                <Input label="Major" placeholder="Your Major" />
                <div>
                  <label className="mb-2 block text-sm font-medium">Experience Level</label>
                  <div role="radiogroup" className="flex flex-wrap gap-4">
                    {[
                      { id: "intern", label: "Intern" },
                      { id: "entry", label: "Entry-level" },
                      { id: "experienced", label: "Experienced" },
                    ].map((r) => (
                      <label key={r.id} className="inline-flex items-center gap-2">
                        <input type="radio" name="experience" id={r.id} className="h-4 w-4 text-primary" />
                        <span>{r.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border bg-secondary/40 p-6">
            <legend className="text-lg font-semibold">Do you have a portfolio?</legend>
            <p className="text-sm text-muted-foreground">Showcase your work to impress employers.</p>
            <div className="mt-4 flex flex-wrap gap-6">
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="portfolio" className="h-4 w-4 text-primary" />
                <span>Yes, I do!</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="portfolio" className="h-4 w-4 text-primary" />
                <span>No, not yet.</span>
              </label>
            </div>
          </fieldset>

          <div className="flex justify-end">
            <button type="button" className="rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-6 py-3 font-semibold text-white shadow transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Next Step
            </button>
          </div>
        </form>

        {/* Preview Card with the provided image UI */}
        <aside className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Live Preview</h2>
          <div className="mt-4 rounded-xl border bg-white p-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F5c1e1858d3914c64b045e31e9b4fd580%2F3ca0aefecdad489ba588348e0641c323?format=webp&width=1200"
              alt="Resume Builder UI preview"
              className="mx-auto h-[520px] w-full max-w-full rounded-lg object-contain"
            />
          </div>
        </aside>
      </div>
    </section>
  );
}

function Input({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>
      <input
        {...props}
        className="w-full rounded-xl border bg-background px-4 py-3 shadow-sm outline-none transition placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
