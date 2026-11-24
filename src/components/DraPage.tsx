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
} to { transform: scale(1); clip-path: inset(0); } }
.dra-motion-page .hero-text h1,
.dra-motion-page .mentor-hero h1 { animation: none !important; } to { transform: translate3d(0,0,0); } }
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
      "main > section, main > .band, main > .trust-strip, main .card, main .service-card, main .resource-card, main .rh-item, main .pathway, main .step, main .price-card, main .testimonial, main .split"
    );
    targets.forEach((element) => {
      element.dataset.draReveal = element.matches(".card, .service-card, .resource-card, .rh-item, .pathway, .step, .price-card, .testimonial") ? "card" : "section";
    });
    if (!("IntersectionObserver" in window)) {
      targets.forEach((element) => element.classList.add("dra-in-view"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("dra-in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -48px 0px" });
    targets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
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
