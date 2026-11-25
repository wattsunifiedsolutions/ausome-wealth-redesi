import { useEffect, useRef } from "react";
import { pages } from "../content/dra-pages";

const motionStyles = `
/* DRA motion system: editorial reveals, tactile links, restrained image movement. */
.dra-motion-page { --dra-motion-ease: cubic-bezier(.22,.68,0,1); }
.dra-motion-page a,
.dra-motion-page button { transition: color .24s ease, background-color .24s ease, border-color .24s ease, transform .28s var(--dra-motion-ease), box-shadow .28s ease; }
.dra-motion-page a:focus-visible,
.dra-motion-page button:focus-visible { outline: 2px solid var(--gold, #d6b783); outline-offset: 4px; }
.dra-motion-page [data-dra-reveal] { opacity: 1; transform: none; transition: transform .78s var(--dra-motion-ease); }
.dra-motion-page [data-dra-reveal].dra-in-view { opacity: 1; transform: none; }
.dra-motion-page [data-dra-reveal="card"]:nth-child(2) { transition-delay: 70ms; }
.dra-motion-page [data-dra-reveal="card"]:nth-child(3) { transition-delay: 130ms; }
.dra-motion-page [data-dra-reveal="card"]:nth-child(4) { transition-delay: 190ms; }
.dra-motion-page img,
.dra-motion-page picture,
.dra-motion-page video {
  opacity: 1 !important;
  filter: none !important;
  box-shadow: none !important;
  -webkit-filter: none !important;
}
.dra-motion-page .cinematic-hero img.hero-img,
.dra-motion-page .mentor-hero img,
.dra-motion-page .hero-home img,
.dra-motion-page .hero-tax img {
  animation: none !important;
  transform: none !important;
  clip-path: none !important;
}
.dra-motion-page .hero-text h1,
.dra-motion-page .mentor-hero h1 { animation: none !important; }
.dra-motion-page .card,
.dra-motion-page .service-card,
.dra-motion-page .resource-card,
.dra-motion-page .rh-item,
.dra-motion-page .pathway,
.dra-motion-page .price-card { transition: transform .32s var(--dra-motion-ease), border-color .28s ease, box-shadow .28s ease; }
@media (hover:hover) and (pointer:fine) {
 .dra-motion-page .card:hover,
 .dra-motion-page .service-card:hover,
 .dra-motion-page .resource-card:hover,
 .dra-motion-page .rh-item:hover,
 .dra-motion-page .pathway:hover,
 .dra-motion-page .price-card:hover { transform: translateY(-5px); border-color: var(--gold, #d6b783); box-shadow: 0 12px 28px rgba(0,12,30,.10); }
 .dra-motion-page a:not(.btn):not(.button):not(.header-cta):hover { text-underline-offset: 7px; }
 .dra-motion-page .btn:hover,
 .dra-motion-page .button:hover,
 .dra-motion-page .header-cta:hover { transform: translateY(-2px); }
}
.dra-motion-page .btn::after,
.dra-motion-page .button::after,
.dra-motion-page .link-cta::after { transition: transform .28s var(--dra-motion-ease); }
@media (prefers-reduced-motion: reduce) {
 .dra-motion-page *, .dra-motion-page *::before, .dra-motion-page *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
 .dra-motion-page [data-dra-reveal] { opacity: 1 !important; transform: none !important; }
}
`;

export function DraPage({ name }: { name: string }) {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = root.querySelectorAll<HTMLElement>(
      "main > section, main > .band, main > .trust-strip, main .card, main .service-card, main .resource-card, main .rh-item, main .pathway, main .step, main .price-card, main .testimonial, main .split",
    );
    targets.forEach((element) => {
      element.dataset["draReveal"] = element.matches(
        ".card, .service-card, .resource-card, .rh-item, .pathway, .step, .price-card, .testimonial",
      )
        ? "card"
        : "section";
    });
    if (!("IntersectionObserver" in window)) {
      targets.forEach((element) => element.classList.add("dra-in-view"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("dra-in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );
    targets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [name]);

  // FICO-style interactive credit score gauge wiring (credit-resources page).
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const gauge = root.querySelector<HTMLElement>("[data-fico-gauge]");
    if (!gauge) return;

    const slider = gauge.querySelector<HTMLInputElement>("[data-fico-slider]");
    const needle = gauge.querySelector<SVGGElement>("[data-fico-needle]");
    const numEl = gauge.querySelector<SVGTextElement>("[data-fico-num]");
    const rangeEl = gauge.querySelector<SVGTextElement>("[data-fico-range]");
    const pill = gauge.querySelector<HTMLElement>("[data-fico-pill]");
    const statScore = gauge.querySelector<HTMLElement>("[data-fico-stat-score]");
    const statTier = gauge.querySelector<HTMLElement>("[data-fico-stat-tier]");
    const ticksGroup = gauge.querySelector<SVGGElement>(".fico-ticks");
    if (!slider || !needle || !numEl || !pill) return;

    const MIN = 300;
    const MAX = 850;
    // Needle sweeps from -90deg (left, 300) to +90deg (right, 850).
    const angleFor = (score: number) => {
      const t = (score - MIN) / (MAX - MIN);
      return -90 + t * 180;
    };

    const tiers: { max: number; label: string; short: string; color: string }[] = [
      { max: 579, label: "POOR \u2022 300\u2013579", short: "Poor", color: "#DC2626" },
      { max: 669, label: "FAIR \u2022 580\u2013669", short: "Fair", color: "#F59E0B" },
      { max: 739, label: "GOOD \u2022 670\u2013739", short: "Good", color: "#10B981" },
      { max: 799, label: "VERY GOOD \u2022 740\u2013799", short: "Very Good", color: "#059669" },
      {
        max: 850,
        label: "EXCEPTIONAL \u2022 800\u2013850",
        short: "Exceptional",
        color: "#047857",
      },
    ];
    const tierFor = (score: number) =>
      tiers.find((t) => score <= t.max) ?? tiers[tiers.length - 1]!;

    // Draw subtle tick marks along the inner radius (geometry matches the
    // 260x150 gauge: pivot at 130,130; arc radius ~100).
    if (ticksGroup) {
      const cx = 130;
      const cy = 130;
      const rOuter = 92;
      const rInner = 82;
      const ticks: string[] = [];
      for (let i = 0; i <= 10; i++) {
        const t = i / 10;
        const ang = (-90 + t * 180) * (Math.PI / 180);
        const x1 = cx + rOuter * Math.cos(ang);
        const y1 = cy + rOuter * Math.sin(ang);
        const x2 = cx + rInner * Math.cos(ang);
        const y2 = cy + rInner * Math.sin(ang);
        ticks.push(
          `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`,
        );
      }
      ticksGroup.innerHTML = ticks.join("");
    }

    const update = (score: number) => {
      const s = Math.max(MIN, Math.min(MAX, Math.round(score)));
      needle.style.transform = `rotate(${angleFor(s).toFixed(2)}deg)`;
      numEl.textContent = String(s);
      if (rangeEl) rangeEl.textContent = `${MIN}\u2013${MAX}`;
      const tier = tierFor(s);
      pill.textContent = tier.label;
      pill.style.background = tier.color;
      if (statScore) statScore.textContent = String(s);
      if (statTier) statTier.textContent = tier.short;
    };

    update(Number(slider.value));
    slider.addEventListener("input", () => update(Number(slider.value)));
  }, [name]);

  return (
    <div
      ref={pageRef}
      className="dra-motion-page"
      onSubmit={(event) => {
        event.preventDefault();
        const notice = event.currentTarget.querySelector<HTMLElement>("#preview-notice");
        if (notice) {
          notice.style.display = "block";
          notice.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }}
    >
      <style>{motionStyles}</style>
      <div dangerouslySetInnerHTML={{ __html: pages[name]!.html }} />
    </div>
  );
}

export function pageHead(name: string) {
  return {
    meta: [{ title: pages[name]!.title }, { name: "robots", content: "noindex, nofollow" }],
    links: [{ rel: "stylesheet", href: pages[name]!.css }],
  };
}
