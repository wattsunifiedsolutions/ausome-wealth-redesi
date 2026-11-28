import fs from "node:fs";

// Rebuild ONLY the body of the tax-mentorship page (below the hero) to match
// the approved reference screenshot. Hero + pillar strip preserved exactly.

const file = "src/content/dra-pages.ts";
const raw = fs.readFileSync(file, "utf8");

const key = '"tax-mentorship": ';
const idx = raw.indexOf(key);
if (idx === -1) throw new Error("tax-mentorship not found");
const htmlStart = raw.indexOf("html: '", idx) + "html: '".length;
const htmlEnd = raw.indexOf("',\n", htmlStart);
const oldHtml = raw.slice(htmlStart, htmlEnd);

// --- preserve the <style>...</style> block ---
const styleStart = oldHtml.indexOf("<style>");
const styleEnd = oldHtml.indexOf("</style>", styleStart) + "</style>".length;
const oldStyle = oldHtml.slice(styleStart, styleEnd);

// --- preserve the hero block EXACTLY ---
const heroStart = oldHtml.indexOf('<section class="tm-hero-luxury"');
const heroEnd = oldHtml.indexOf("</section>", heroStart) + "</section>".length;
const heroBlock = oldHtml.slice(heroStart, heroEnd);

// --- preserve the pillar strip block EXACTLY ---
const pillarStart = oldHtml.indexOf('<section class="tm-pillar-strip"');
const pillarEnd = oldHtml.indexOf("</section>", pillarStart) + "</section>".length;
const pillarBlock = oldHtml.slice(pillarStart, pillarEnd);

// --- preserve <main class="tm-page"> opening tag ---
const mainStart = oldHtml.indexOf('<main class="tm-page">');
const mainOpenEnd = oldHtml.indexOf(">", mainStart) + 1;
const mainOpen = oldHtml.slice(mainStart, mainOpenEnd);

// === Assets ===
const WHO_IMAGES = [
  "https://vibe.filesafe.space/1795100135767119492/assets/adca5dd5-a91d-49d7-b0d8-5fc49165dc88.png",
  "https://vibe.filesafe.space/1795100135767119492/assets/748c74ce-180b-4d79-a740-c26e3e40bb99.png",
  "https://vibe.filesafe.space/1795100135767119492/assets/96172032-e3e2-4819-a28b-eb1b0391ed5e.png",
  "https://vibe.filesafe.space/1795100135767119492/assets/029f635f-f016-47a6-a4fd-775004a2de88.png",
];
const BOOKING_URL = "https://draw.downrightausomewealth.com/widget/booking/Eo6P4A5bLSnnPldXZ38e";
const TIER1_URL = "https://thetaxadvisorandassociates.com/tier-1";
const TIER2_URL = "https://thetaxadvisorandassociates.com/tier-2";

const goldDefs = (id) =>
  `<defs><linearGradient id="tm-g-${id}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFFDF5"/><stop offset="25%" stop-color="#F2DDAD"/><stop offset="55%" stop-color="#D6B783"/><stop offset="85%" stop-color="#9C773B"/><stop offset="100%" stop-color="#6E5020"/></linearGradient><filter id="tm-s-${id}" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="1.6" flood-color="#0B192E" flood-opacity="0.35"/></filter></defs>`;
const svg = (id, inner) =>
  `<svg class="tm-ico" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">${goldDefs(id)}<g filter="url(#tm-s-${id})">${inner}</g></svg>`;

// Feature / learn icons
const IC = {
  hands: svg("fh", `<circle cx="24" cy="13" r="6" fill="url(#tm-g-fh)" fill-opacity="0.35" stroke="url(#tm-g-fh)" stroke-width="2"/><path d="M12 38C12 30 17 25 24 25C31 25 36 30 36 38" stroke="url(#tm-g-fh)" stroke-width="2.2" stroke-linecap="round"/><path d="M29 34L34 29M34 29L37 32M34 29L37 26" stroke="url(#tm-g-fh)" stroke-width="2" stroke-linecap="round"/>`),
  growth: svg("fg", `<line x1="8" y1="40" x2="42" y2="40" stroke="url(#tm-g-fg)" stroke-width="2.4" stroke-linecap="round"/><rect x="12" y="30" width="6" height="8" fill="url(#tm-g-fg)" fill-opacity="0.4" stroke="url(#tm-g-fg)" stroke-width="1.6"/><rect x="22" y="24" width="6" height="14" fill="url(#tm-g-fg)" fill-opacity="0.55" stroke="url(#tm-g-fg)" stroke-width="1.6"/><rect x="32" y="16" width="6" height="22" fill="url(#tm-g-fg)" fill-opacity="0.7" stroke="url(#tm-g-fg)" stroke-width="1.6"/><path d="M10 20L20 14L28 17L40 8" stroke="url(#tm-g-fg)" stroke-width="2.2" stroke-linecap="round"/><path d="M34 8H40V14" stroke="url(#tm-g-fg)" stroke-width="2.2" stroke-linecap="round"/>`),
  laptop: svg("fl", `<rect x="7" y="10" width="34" height="23" rx="2" fill="url(#tm-g-fl)" fill-opacity="0.3" stroke="url(#tm-g-fl)" stroke-width="2"/><path d="M4 37C4 35 6 34 8 34H40C42 34 44 35 44 37H4Z" fill="url(#tm-g-fl)" stroke="url(#tm-g-fl)" stroke-width="1.8"/><circle cx="24" cy="21" r="5" stroke="url(#tm-g-fl)" stroke-width="2"/><path d="M24 13V17M24 25V29M16 21H20M28 21H32" stroke="url(#tm-g-fl)" stroke-width="1.8" stroke-linecap="round"/>`),
  headset: svg("fs", `<path d="M10 30V24C10 16 16 10 24 10C32 10 38 16 38 24V30" stroke="url(#tm-g-fs)" stroke-width="2.2" stroke-linecap="round"/><rect x="7" y="28" width="7" height="12" rx="3" fill="url(#tm-g-fs)" fill-opacity="0.4" stroke="url(#tm-g-fs)" stroke-width="1.8"/><rect x="34" y="28" width="7" height="12" rx="3" fill="url(#tm-g-fs)" fill-opacity="0.4" stroke="url(#tm-g-fs)" stroke-width="1.8"/><path d="M38 36C38 39 34 41 30 41" stroke="url(#tm-g-fs)" stroke-width="2" stroke-linecap="round"/><circle cx="29" cy="41" r="1.5" fill="url(#tm-g-fs)"/>`),
  found: svg("lf", `<path d="M24 10L42 18L24 26L6 18L24 10Z" fill="url(#tm-g-lf)" fill-opacity="0.35" stroke="url(#tm-g-lf)" stroke-width="2" stroke-linejoin="round"/><path d="M13 22V30C13 34 18 37 24 37C30 37 35 34 35 30V22" stroke="url(#tm-g-lf)" stroke-width="2" stroke-linecap="round"/><path d="M38 20V30M36 30H40" stroke="url(#tm-g-lf)" stroke-width="2" stroke-linecap="round"/>`),
  biz: svg("lb", `<path d="M9 38V19L17 13V38" fill="url(#tm-g-lb)" fill-opacity="0.25" stroke="url(#tm-g-lb)" stroke-width="1.8" stroke-linejoin="round"/><path d="M17 38V11L31 5V38" fill="url(#tm-g-lb)" fill-opacity="0.35" stroke="url(#tm-g-lb)" stroke-width="2" stroke-linejoin="round"/><path d="M31 38V18L39 23V38" fill="url(#tm-g-lb)" fill-opacity="0.25" stroke="url(#tm-g-lb)" stroke-width="1.8" stroke-linejoin="round"/><line x1="5" y1="38" x2="43" y2="38" stroke="url(#tm-g-lb)" stroke-width="2.4" stroke-linecap="round"/>`),
  client: svg("lc", `<circle cx="17" cy="17" r="6" fill="url(#tm-g-lc)" fill-opacity="0.35" stroke="url(#tm-g-lc)" stroke-width="2"/><path d="M5 38C5 30 10 25 17 25C24 25 29 30 29 38" stroke="url(#tm-g-lc)" stroke-width="2.2" stroke-linecap="round"/><path d="M31 14L34 17L40 11" stroke="url(#tm-g-lc)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="34" cy="17" r="9" stroke="url(#tm-g-lc)" stroke-width="1.6" stroke-dasharray="2 3" fill="none"/>`),
  sys: svg("ls", `<rect x="8" y="12" width="32" height="26" rx="3" fill="url(#tm-g-ls)" fill-opacity="0.3" stroke="url(#tm-g-ls)" stroke-width="2"/><path d="M14 22H34M14 28H28" stroke="url(#tm-g-ls)" stroke-width="2" stroke-linecap="round"/><circle cx="36" cy="28" r="2.5" fill="url(#tm-g-ls)"/><path d="M16 8V12M32 8V12" stroke="url(#tm-g-ls)" stroke-width="2" stroke-linecap="round"/>`),
  lead: svg("ll", `<path d="M24 8L28 18L38 19L30 26L33 37L24 31L15 37L18 26L10 19L20 18L24 8Z" fill="url(#tm-g-ll)" fill-opacity="0.35" stroke="url(#tm-g-ll)" stroke-width="2" stroke-linejoin="round"/>`),
  software: svg("sw", `<rect x="10" y="13" width="28" height="20" rx="2" fill="url(#tm-g-sw)" fill-opacity="0.3" stroke="url(#tm-g-sw)" stroke-width="2"/><path d="M6 36C6 34 8 33 10 33H38C40 33 42 34 42 36H6Z" fill="url(#tm-g-sw)" stroke="url(#tm-g-sw)" stroke-width="1.8"/><rect x="14" y="23" width="3" height="6" rx="0.6" fill="#FFFDF5"/><rect x="20" y="19" width="3" height="10" rx="0.6" fill="#FFFDF5"/><rect x="26" y="16" width="3" height="13" rx="0.6" fill="#FFFDF5"/><rect x="32" y="22" width="3" height="7" rx="0.6" fill="#FFFDF5"/>`),
  apply: svg("ap", `<rect x="11" y="10" width="26" height="30" rx="2.5" fill="url(#tm-g-ap)" fill-opacity="0.3" stroke="url(#tm-g-ap)" stroke-width="2"/><rect x="17" y="7" width="14" height="6" rx="1.5" fill="url(#tm-g-ap)" stroke="#FFFDF5" stroke-width="1.2"/><path d="M17 26L21 30L31 18" stroke="#FFFDF5" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`),
};

const whoItems = [
  { img: WHO_IMAGES[0], alt: "Beginner tax professionals reference books", title: "Beginner Tax Professionals" },
  { img: WHO_IMAGES[1], alt: "Growing tax preparers growth chart", title: "Growing Preparers" },
  { img: WHO_IMAGES[2], alt: "Aspiring business owners keys to new office", title: "Aspiring Business Owners" },
  { img: WHO_IMAGES[3], alt: "Structured training notebook and calendar", title: "Structured Training Seekers" },
];

const featureItems = [
  { icon: "hands", title: "Hands-On Training" },
  { icon: "growth", title: "Business Development Guidance" },
  { icon: "laptop", title: "Software Exposure" },
  { icon: "headset", title: "Ongoing Support" },
];

const learnItems = [
  { icon: "found", title: "Tax Preparation Foundations" },
  { icon: "biz", title: "Business Setup" },
  { icon: "client", title: "Client Acquisition" },
  { icon: "sys", title: "Systems & Compliance" },
  { icon: "lead", title: "Leadership & Confidence" },
];

const blueprint14 = [
  "1-on-1 Mentorship",
  "Group Mentorship Calls",
  "Tax Preparation Software",
  "Technical Support",
  "Client Forms",
  "Return Review",
  "Software Training",
  "PTIN Registration",
  "EFIN Registration",
  "Tax Loan Info",
  "LLC & EIN Setup",
  "Marketing",
  "Social Media",
  "Business Automation",
];

// === CSS additions/replacements for the rebuilt body ===
const bodyCss = `
/* Who This Is For */
.tm-who-section { background-color: #FAF8F5; padding: 72px 0; }
.tm-section-header { text-align: center; max-width: 720px; margin: 0 auto 40px; }
.tm-section-title { font-size: 36px; font-weight: 700; color: #001B3D; margin: 0; letter-spacing: 0.2px; }
.tm-section-title em { font-style: italic; color: #A99369; font-weight: 600; }
.tm-section-header .tm-rule { display: flex; align-items: center; justify-content: center; gap: 12px; margin: 16px 0 14px; }
.tm-section-header .tm-rule span { display: block; width: 54px; height: 1px; background: linear-gradient(90deg, transparent, #D6B783); }
.tm-section-header .tm-rule span:last-child { background: linear-gradient(90deg, #D6B783, transparent); }
.tm-section-header .tm-rule i { width: 7px; height: 7px; background: #D6B783; transform: rotate(45deg); display: block; }
.tm-section-subtitle { font-size: 15px; line-height: 1.6; color: #5A6675; margin: 0; }
.tm-who-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; }
.tm-who-card { background: #FFFFFF; border: 1px solid rgba(214,183,131,0.45); border-radius: 14px; overflow: hidden; text-align: center; transition: transform .3s ease, box-shadow .3s ease; }
.tm-who-card:hover { transform: translateY(-5px); box-shadow: 0 14px 30px rgba(0,27,61,0.10); }
.tm-who-img { width: 100%; height: 188px; object-fit: cover; display: block; }
.tm-who-card h3 { font-size: 16px; font-weight: 700; color: #001B3D; margin: 0; padding: 18px 14px; }

/* Inside the Mentorship */
.tm-includes-section { background-color: #FFFFFF; padding: 72px 0; border-top: 1px solid rgba(214,183,131,0.25); border-bottom: 1px solid rgba(214,183,131,0.25); }
.tm-includes-grid { max-width: 1080px; margin: 0 auto; }
.tm-includes-content { text-align: center; }
.tm-includes-eyebrow { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #A99369; font-weight: 700; margin: 0 0 10px; }
.tm-includes-title { font-size: 34px; font-weight: 700; color: #001B3D; margin: 0 0 12px; }
.tm-includes-title em { font-style: italic; color: #A99369; font-weight: 600; }
.tm-includes-desc { font-size: 15px; line-height: 1.6; color: #5A6675; max-width: 620px; margin: 0 auto 36px; }
.tm-features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
.tm-feature-item { padding: 8px 22px; text-align: center; border-right: 1px solid rgba(214,183,131,0.3); }
.tm-feature-item:last-child { border-right: none; }
.tm-feature-icon { display: flex; justify-content: center; margin-bottom: 14px; }
.tm-ico { width: 44px; height: 44px; }
.tm-feature-item h4 { font-size: 15px; font-weight: 700; color: #001B3D; margin: 0 0 6px; }
.tm-feature-item p { font-size: 13px; line-height: 1.5; color: #5A6675; margin: 0; }

/* What You'll Learn */
.tm-learn-section { background-color: #FAF8F5; padding: 72px 0; }
.tm-learn-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 18px; }
.tm-learn-card { background: #FFFFFF; border: 1px solid rgba(214,183,131,0.4); border-radius: 14px; padding: 26px 16px; text-align: center; transition: transform .3s ease, box-shadow .3s ease; }
.tm-learn-card:hover { transform: translateY(-5px); box-shadow: 0 14px 30px rgba(0,27,61,0.10); }
.tm-learn-card .tm-feature-icon { margin-bottom: 16px; }
.tm-learn-card h3 { font-size: 14px; font-weight: 700; color: #001B3D; margin: 0; line-height: 1.35; }

/* The Blueprint */
.tm-blueprint-section { background-color: #001B3D; padding: 76px 0; position: relative; overflow: hidden; }
.tm-blueprint-section::before { content: ''; position: absolute; top: -120px; left: -90px; width: 220px; height: 220px; border: 1px solid rgba(214,183,131,0.3); transform: rotate(45deg); }
.tm-blueprint-section::after { content: ''; position: absolute; bottom: -120px; right: -90px; width: 220px; height: 220px; border: 1px solid rgba(214,183,131,0.3); transform: rotate(45deg); }
.tm-blueprint-header { text-align: center; margin-bottom: 40px; position: relative; z-index: 2; }
.tm-blueprint-header h2 { font-size: 38px; font-weight: 700; color: #FFFFFF; margin: 0 0 10px; }
.tm-blueprint-header h2 em { font-style: italic; color: #D6B783; font-weight: 600; }
.tm-blueprint-header p { font-size: 15px; color: #C9D3E0; margin: 0; }
.tm-blueprint-list { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 36px; max-width: 980px; margin: 0 auto; position: relative; z-index: 2; }
.tm-blueprint-list li { display: flex; align-items: center; gap: 14px; list-style: none; color: #E8EDF4; font-size: 15px; font-weight: 500; }
.tm-blueprint-list ul { padding: 0; margin: 0; display: contents; }
.tm-check { flex: 0 0 26px; width: 26px; height: 26px; border-radius: 50%; background: linear-gradient(135deg, #F0D6A0, #D6B783 60%, #B89657); display: inline-flex; align-items: center; justify-content: center; color: #001B3D; font-size: 13px; font-weight: 800; box-shadow: 0 2px 6px rgba(0,0,0,0.25); }

/* Tax Software & Enrollment */
.tm-software-section { background-color: #FAF8F5; padding: 64px 0; }
.tm-software-card { max-width: 1080px; margin: 0 auto; background: #FFFFFF; border: 1px solid rgba(214,183,131,0.45); border-radius: 16px; padding: 36px; display: grid; grid-template-columns: 0.7fr 1.3fr auto; align-items: center; gap: 32px; }
.tm-software-visual { display: flex; justify-content: center; }
.tm-software-visual .tm-ico { width: 84px; height: 84px; }
.tm-software-text h3 { font-size: 24px; font-weight: 700; color: #001B3D; margin: 0 0 8px; }
.tm-software-text h3 em { font-style: italic; color: #A99369; font-weight: 600; }
.tm-software-text p { font-size: 14px; line-height: 1.6; color: #5A6675; margin: 0; }
.tm-software-actions { display: flex; flex-direction: column; gap: 12px; }
.tm-btn-gold { display: inline-flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #F0D6A0 0%, #D6B783 55%, #B89657 100%); color: #001B3D; font-weight: 700; font-size: 13px; letter-spacing: 0.4px; padding: 13px 24px; border-radius: 8px; text-decoration: none; border: 1px solid rgba(255,255,255,0.35); white-space: nowrap; transition: transform .25s ease, box-shadow .25s ease; }
.tm-btn-gold:hover { transform: translateY(-2px); box-shadow: 0 10px 22px rgba(0,0,0,0.18); }
.tm-btn-navy { display: inline-flex; align-items: center; justify-content: center; background: #001B3D; color: #F5F1E8; font-weight: 600; font-size: 13px; letter-spacing: 0.4px; padding: 13px 24px; border-radius: 8px; text-decoration: none; border: 1px solid rgba(214,183,131,0.7); white-space: nowrap; transition: transform .25s ease, background .25s ease; }
.tm-btn-navy:hover { background: #0A2B57; transform: translateY(-2px); }

/* Application & Enrollment */
.tm-apply-section { background-color: #001B3D; padding: 48px 0; }
.tm-apply-card { max-width: 1080px; margin: 0 auto; display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 28px; }
.tm-apply-icon { display: flex; }
.tm-apply-icon .tm-ico { width: 56px; height: 56px; }
.tm-apply-text h3 { font-size: 24px; font-weight: 700; color: #FFFFFF; margin: 0 0 6px; }
.tm-apply-text h3 em { font-style: italic; color: #D6B783; font-weight: 600; }
.tm-apply-text p { font-size: 14px; color: #C9D3E0; margin: 0; }

/* Footer */
.tm-footer { background-color: #001B3D; border-top: 1px solid rgba(214,183,131,0.25); }
.tm-footer-inner { max-width: 1200px; margin: 0 auto; padding: 48px 24px 28px; display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 32px; }
.tm-footer-col h4 { font-size: 13px; letter-spacing: 1px; text-transform: uppercase; color: #D6B783; font-weight: 700; margin: 0 0 14px; }
.tm-footer-col p, .tm-footer-col a { font-size: 13px; line-height: 1.7; color: #C9D3E0; text-decoration: none; display: block; }
.tm-footer-col a:hover { color: #D6B783; }
.tm-footer-brand { font-family: 'Noto Serif Display', Georgia, serif; font-size: 20px; font-weight: 700; color: #FFFFFF; margin: 0 0 10px; }
.tm-footer-brand span { color: #D6B783; }
.tm-footer-tag { font-size: 12.5px; color: #94A3B0; line-height: 1.6; margin: 0; }
.tm-footer-bottom { max-width: 1200px; margin: 0 auto; padding: 18px 24px 26px; border-top: 1px solid rgba(214,183,131,0.18); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
.tm-footer-bottom p { font-size: 12px; color: #64748B; margin: 0; }

/* Responsive */
@media (max-width: 1024px) {
  .tm-who-grid { grid-template-columns: repeat(2, 1fr); }
  .tm-learn-grid { grid-template-columns: repeat(3, 1fr); }
  .tm-features-grid { grid-template-columns: repeat(2, 1fr); gap: 22px 0; }
  .tm-feature-item:nth-child(2) { border-right: none; }
  .tm-blueprint-list { grid-template-columns: 1fr; gap: 12px; }
  .tm-software-card { grid-template-columns: 1fr; text-align: center; }
  .tm-software-visual, .tm-software-actions { justify-content: center; }
  .tm-software-actions { flex-direction: row; }
  .tm-footer-inner { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .tm-who-grid { grid-template-columns: 1fr; }
  .tm-learn-grid { grid-template-columns: repeat(2, 1fr); }
  .tm-features-grid { grid-template-columns: 1fr; }
  .tm-feature-item { border-right: none; border-bottom: 1px solid rgba(214,183,131,0.3); padding-bottom: 18px; }
  .tm-feature-item:last-child { border-bottom: none; }
  .tm-section-title { font-size: 28px; }
  .tm-includes-title { font-size: 26px; }
  .tm-blueprint-header h2 { font-size: 28px; }
  .tm-apply-card { grid-template-columns: 1fr; text-align: center; gap: 16px; }
  .tm-apply-icon, .tm-apply-text { justify-content: center; display: flex; flex-direction: column; align-items: center; }
  .tm-software-actions { flex-direction: column; }
  .tm-footer-inner { grid-template-columns: 1fr; gap: 24px; }
  .tm-footer-bottom { flex-direction: column; text-align: center; }
}
`;

// The html value is a single-quoted JS string with escaped \n and no real
// newlines. Escape everything we inject: newlines -> \n, single quotes -> \'.
const esc = (s) => s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/'/g, "\\'");
const newStyle = oldStyle.replace(/<\/style>$/, esc(bodyCss) + "\\n</style>");

// === Build sections ===
const whoHtml = `<div class="tm-who-grid">${whoItems
  .map((w) => `<div class="tm-who-card"><img src="${w.img}" alt="${w.alt}" class="tm-who-img"><h3>${w.title}</h3></div>`)
  .join("")}</div>`;

const featuresHtml = `<div class="tm-features-grid">${featureItems
  .map(
    (f) => `<div class="tm-feature-item"><div class="tm-feature-icon" aria-hidden="true">${IC[f.icon]}</div><h4>${f.title}</h4></div>`,
  )
  .join("")}</div>`;

const learnHtml = `<div class="tm-learn-grid">${learnItems
  .map(
    (l) => `<div class="tm-learn-card"><div class="tm-feature-icon" aria-hidden="true">${IC[l.icon]}</div><h3>${l.title}</h3></div>`,
  )
  .join("")}</div>`;

const blueprintHtml = `<div class="tm-blueprint-list"><ul>${blueprint14
  .map((b) => `<li><span class="tm-check" aria-hidden="true">&#10003;</span>${b}</li>`)
  .join("")}</ul></div>`;

const sections = `
  ${heroBlock}

  ${pillarBlock}

  <section class="tm-who-section">
    <div class="tm-container">
      <div class="tm-section-header">
        <div class="tm-rule"><span></span><i></i><span></span></div>
        <h2 class="tm-section-title">Who <em>This Is For</em></h2>
        <p class="tm-section-subtitle">A results-focused mentorship for individuals ready to learn, sharpen their skills, and build a career or business in taxes.</p>
      </div>
      ${whoHtml}
    </div>
  </section>

  <section class="tm-includes-section">
    <div class="tm-container">
      <div class="tm-includes-grid">
        <div class="tm-includes-content">
          <p class="tm-includes-eyebrow">Inside the Mentorship</p>
          <h2 class="tm-includes-title">What the Program <em>Includes</em></h2>
          <p class="tm-includes-desc">A practical, hands-on mentorship experience designed to give you real knowledge, real tools, and real results.</p>
          ${featuresHtml}
        </div>
      </div>
    </div>
  </section>

  <section class="tm-learn-section">
    <div class="tm-container">
      <div class="tm-section-header">
        <div class="tm-rule"><span></span><i></i><span></span></div>
        <h2 class="tm-section-title">What <em>You&rsquo;ll Learn</em></h2>
        <p class="tm-section-subtitle">A comprehensive learning experience that equips you with the knowledge, tools, and confidence to succeed in the tax industry.</p>
      </div>
      ${learnHtml}
    </div>
  </section>

  <section class="tm-blueprint-section" aria-labelledby="tm-blueprint-title">
    <div class="tm-container">
      <div class="tm-blueprint-header">
        <h2 id="tm-blueprint-title"><em>The Blueprint</em></h2>
        <p>A proven roadmap to launch, grow, and sustain your tax business.</p>
      </div>
      ${blueprintHtml}
    </div>
  </section>

  <section class="tm-software-section" id="packages">
    <div class="tm-container">
      <div class="tm-software-card">
        <div class="tm-software-visual" aria-hidden="true">${IC.software}</div>
        <div class="tm-software-text">
          <h3>Tax Software & <em>Enrollment</em></h3>
          <p>Explore professional tax software packages and enrollment options aligned with your tax business goals.</p>
        </div>
        <div class="tm-software-actions">
          <a class="tm-btn-gold" href="${TIER1_URL}" target="_blank" rel="noopener noreferrer">View Software Packages</a>
          <a class="tm-btn-navy" href="${BOOKING_URL}" target="_blank" rel="noopener noreferrer">Schedule a Consultation</a>
        </div>
      </div>
    </div>
  </section>

  <section class="tm-apply-section">
    <div class="tm-container">
      <div class="tm-apply-card">
        <div class="tm-apply-icon" aria-hidden="true">${IC.apply}</div>
        <div class="tm-apply-text">
          <h3>Application & <em>Enrollment</em></h3>
          <p>Ready to begin? Apply now to start your mentorship and enrollment journey.</p>
        </div>
        <a class="tm-btn-gold" href="${BOOKING_URL}" target="_blank" rel="noopener noreferrer">Apply Now</a>
      </div>
    </div>
  </section>
</main>

<footer class="tm-footer">
  <div class="tm-footer-inner">
    <div class="tm-footer-col">
      <p class="tm-footer-brand">DRA <span>Tax & Financial Solutions</span></p>
      <p class="tm-footer-tag">Down Right Ausome Wealth. Mentorship, software, and training to help you build a profitable tax business.</p>
    </div>
    <div class="tm-footer-col">
      <h4>Navigation</h4>
      <a href="/">Home</a>
      <a href="/credit-resources.html">Credit Services</a>
      <a href="/tax-mentorship.html">Tax Mentorship</a>
      <a href="/about.html">About</a>
    </div>
    <div class="tm-footer-col">
      <h4>Contact</h4>
      <a href="tel:+14705161141">470-516-1141</a>
      <a href="mailto:admin@downrightausomewealth.com">admin@downrightausomewealth.com</a>
    </div>
    <div class="tm-footer-col">
      <h4>Legal</h4>
      <a href="/privacy-policy.html">Privacy Policy</a>
      <a href="/terms-of-service.html">Terms of Service</a>
      <a href="/disclaimer.html">Disclaimer</a>
    </div>
  </div>
  <div class="tm-footer-bottom">
    <p>&copy; 2026 DRA Tax & Financial Solutions / Down Right Ausome Wealth. All rights reserved.</p>
    <p>No outcome, tax refund amount, or business revenue is guaranteed.</p>
  </div>
</footer>
`;

const newHtml = newStyle + "\\n" + mainOpen + esc(sections);

const updatedRaw = raw.slice(0, htmlStart) + newHtml + raw.slice(htmlEnd);
fs.writeFileSync(file, updatedRaw);

console.log("tax-mentorship body rebuilt.");
console.log("Old html len:", oldHtml.length, "New html len:", newHtml.length);
console.log("Hero preserved:", newHtml.includes('tm-hero-luxury'));
console.log("Pillar preserved:", newHtml.includes('tm-pillar-strip'));
console.log("Blueprint 14:", (newHtml.match(/tm-check/g) || []).length);
console.log("Software section:", newHtml.includes('tm-software-section'));
console.log("Apply section:", newHtml.includes('tm-apply-section'));
console.log("4-col footer:", newHtml.includes('tm-footer-inner'));
