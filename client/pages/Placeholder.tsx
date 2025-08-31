import { Link } from "react-router-dom";

export default function Placeholder({ title }: { title: string }) {
  return (
    <section className="container py-16 text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
        This page is ready for your content. Keep prompting to fill it in with the exact UI and logic you want.
      </p>
      <Link
        to="/resume"
        className="mt-8 inline-block rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-6 py-3 font-semibold text-white shadow transition hover:brightness-110"
      >
        Start Building
      </Link>
    </section>
  );
}
