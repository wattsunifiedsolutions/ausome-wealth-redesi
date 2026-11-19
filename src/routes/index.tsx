import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DRA Website Redesign — In Progress" },
      {
        name: "description",
        content:
          "DRA Tax & Financial Solutions / Down Right Ausome Wealth — website design in progress.",
      },
      {
        property: "og:title",
        content: "DRA Website Redesign — In Progress",
      },
      {
        property: "og:description",
        content:
          "DRA Tax & Financial Solutions / Down Right Ausome Wealth — website design in progress.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-navy px-6 text-center">
      {/* Subtle gold radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 38%, color-mix(in oklab, var(--gold) 22%, transparent) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex max-w-xl flex-col items-center">
        <span className="mb-8 inline-block h-px w-16" style={{ background: "var(--gold)" }} />

        <h1 className="font-display text-4xl leading-tight tracking-tight text-ivory sm:text-5xl md:text-6xl">
          DRA Tax &amp; Financial Solutions
        </h1>

        <p className="mt-4 font-display text-lg tracking-[0.2em] uppercase text-gold sm:text-xl">
          Down Right Ausome Wealth
        </p>

        <div className="mt-10 h-px w-24" style={{ background: "var(--gold)" }} />

        <p className="mt-10 text-base text-ivory/80 sm:text-lg">Website design in progress.</p>
        <p className="mt-2 text-sm text-ivory/55">Please check back soon.</p>
      </div>

      <footer className="absolute bottom-6 left-0 right-0 z-10 text-center text-xs tracking-wide text-ivory/40">
        © {new Date().getFullYear()} DRA Tax &amp; Financial Solutions
      </footer>
    </main>
  );
}
