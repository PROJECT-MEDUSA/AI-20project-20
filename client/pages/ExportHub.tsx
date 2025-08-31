type Item = { title: string; date: string };

const sections: { heading: string; items: Item[] }[] = [
  {
    heading: "Resumes",
    items: [
      { title: "John's Resume", date: "01/01/2023" },
      { title: "Anna's Resume", date: "25/09/2023" },
      { title: "Mark's Resume", date: "20/09/2023" },
    ],
  },
  {
    heading: "Pitches",
    items: [
      { title: "Startup Pitch", date: "15/09/2023" },
      { title: "Product Launch", date: "10/09/2023" },
    ],
  },
  {
    heading: "Portfolios",
    items: [
      { title: "Creative Portfolio", date: "05/09/2023" },
      { title: "Professional Portfolio", date: "03/09/2023" },
    ],
  },
];

function ActionButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      {children}
    </button>
  );
}

export default function ExportHub() {
  return (
    <section className="container py-8 md:py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Export Hub</h1>
        <button className="rounded-full border px-4 py-2 text-sm font-medium shadow-sm hover:bg-secondary">Logout</button>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.heading}>
            <h2 className="mb-3 text-sm font-semibold text-muted-foreground">{section.heading}</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {section.items.map((item) => (
                <article
                  key={item.title}
                  className="flex items-center justify-between rounded-2xl border bg-card p-4 shadow-sm"
                >
                  <div>
                    <h3 className="font-semibold leading-tight">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">Created on {item.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ActionButton>View</ActionButton>
                    <ActionButton>Download</ActionButton>
                    <ActionButton>Delete</ActionButton>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-muted-foreground">© 2025 AI Resume & Project Booster. All rights reserved.</p>
    </section>
  );
}
