import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-12">
      {/* Hero */}
      <section className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Rachana Mandal
        </h1>

        <p className="mt-4 text-lg text-neutral-600">
          Senior UX Designer with 6+ years of experience designing
          complex product systems across UX, behavioural design,
          and emerging AI workflows.
        </p>
      </section>

      {/* Bento grid placeholder */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border p-6">
          <h2 className="text-lg font-medium">Work</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Selected case studies and product work.
          </p>
        </div>

        <div className="rounded-2xl border p-6">
          <h2 className="text-lg font-medium">Experiments</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Behavioural science and AI-led explorations.
          </p>
        </div>

        <div className="rounded-2xl border p-6">
          <h2 className="text-lg font-medium">Blog</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Writing on design, systems, and reflection.
          </p>
        </div>
      </section>
    </main>
  );
}
