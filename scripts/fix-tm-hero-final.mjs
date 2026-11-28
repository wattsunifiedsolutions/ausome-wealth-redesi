import fs from "node:fs";

const FILE = "src/content/dra-pages.ts";
let s = fs.readFileSync(FILE, "utf8");

const CORRIDOR = "https://vibe.filesafe.space/1795100135767119492/assets/bd297bf6-e2af-406f-b4d2-ba96e893c8ff.png";

// Work on the raw file text. The tax-mentorship html value is a single-quoted
// string with \\n escapes and \\' for quotes. We operate on the escaped form.

// --- 1. Replace the hero <section class="tm-hero"> ... </section> markup ---
// In the escaped string, the hero section looks like:
//   <section class=\"tm-hero\">\\n      <div class=\"tm-hero-grid\"> ... </section>
const heroOpenMarker = '<section class=\"tm-hero\">';
const heroOpen = s.indexOf(heroOpenMarker);
if (heroOpen === -1) { console.error("hero open not found"); process.exit(1); }
const heroClose = s.indexOf("</section>", heroOpen);
const oldHero = s.slice(heroOpen, heroClose + "</section>".length);

// Build new hero markup in ESCAPED form (\\n for newlines, \\" for quotes).
const esc = (str) => str.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"');
const lines = [
  '<section class="tm-hero">',
'  <div class="tm-hero-bg" style="background-image:url(&quot;' + CORRIDOR + '&quot;);"></div>',
  '  <div class="tm-hero-content tm-container">',
  '    <p class="tm-hero-eyebrow">Tax Mentorship &amp; Opportunities</p>',
  '    <h1 class="tm-hero-title">Tax Mentorship &amp; Opportunities</h1>',
  '    <p class="tm-hero-subheadline">Learn. Get trained. Get the tools. Start your business.</p>',
  '    <ul class="tm-hero-icons" aria-label="Program pillars">',
  '      <li><span class="tm-hero-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></span><span>Learn</span></li>',
  '      <li><span class="tm-hero-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7L9 18l-5-5"/></svg></span><span>Get Trained</span></li>',
  '      <li><span class="tm-hero-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2z"/></svg></span><span>Get the Tools</span></li>',
  '      <li><span class="tm-hero-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4"/></svg></span><span>Start Your Business</span></li>',
  '      <li><span class="tm-hero-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a6 6 0 0 1 12 0v2"/></svg></span><span>Mentorship</span></li>',
  '    </ul>',
  '    <div class="tm-hero-actions">',
  '      <a href="#packages" class="tm-hero-btn tm-hero-btn-gold">Explore Opportunities &rarr;</a>',
  '      <a href="https://draw.downrightausomewealth.com/widget/booking/Eo6P4A5bLSnnPldXZ38e" class="tm-hero-btn tm-hero-btn-navy" target="_blank" rel="noopener noreferrer">Schedule a Consultation &rarr;</a>',
  '    </div>',
  '  </div>',
  '</section>',
];
const newHeroEscaped = lines.map(esc).join("\\n");

s = s.replace(oldHero, newHeroEscaped);

// --- 2. Replace the old hero CSS block ---
// Old CSS spans from ".tm-hero {" up to ".tm-section-header {".
const cssStart = s.indexOf(".tm-hero {");
const cssEnd = s.indexOf(".tm-section-header {", cssStart);
const oldCss = s.slice(cssStart, cssEnd);

const cssLines = [
  ".tm-hero {",
  "  position: relative;",
  "  width: 100%;",
  "  min-height: 620px;",
  "  display: flex;",
  "  align-items: flex-end;",
  "  overflow: hidden;",
  "  padding: 0;",
  "  margin: 0;",
  "}",
  ".tm-hero-bg {",
  "  position: absolute;",
  "  inset: 0;",
  "  background-size: cover;",
  "  background-position: center center;",
  "  background-repeat: no-repeat;",
  "  z-index: 0;",
  "}",
  ".tm-hero-content {",
  "  position: relative;",
  "  z-index: 2;",
  "  max-width: 620px;",
  "  padding: 0 24px 96px;",
  "  margin: 0;",
  "  width: 100%;",
  "  box-sizing: border-box;",
  "}",
  ".tm-hero-eyebrow {",
  "  display: inline-block;",
  "  color: #D6B783;",
  "  font-size: 12.5px;",
  "  font-weight: 700;",
  "  letter-spacing: 2.5px;",
  "  text-transform: uppercase;",
  "  margin: 0 0 14px;",
  "  padding-bottom: 6px;",
  "  border-bottom: 2px solid #D6B783;",
  "}",
  ".tm-hero-title {",
  "  font-family: 'Noto Serif Display', Georgia, serif;",
  "  font-size: 52px;",
  "  line-height: 1.08;",
  "  font-weight: 700;",
  "  color: #FFFFFF;",
  "  margin: 0 0 16px;",
  "  letter-spacing: -0.5px;",
  "  text-shadow: 0 2px 18px rgba(0,12,30,0.45);",
  "}",
  ".tm-hero-subheadline {",
  "  font-size: 17px;",
  "  line-height: 1.55;",
  "  color: #F4F0E9;",
  "  font-weight: 400;",
  "  margin: 0 0 26px;",
  "  text-shadow: 0 1px 12px rgba(0,12,30,0.5);",
  "}",
  ".tm-hero-icons {",
  "  list-style: none;",
  "  display: flex;",
  "  flex-wrap: wrap;",
  "  gap: 14px 26px;",
  "  padding: 0;",
  "  margin: 0 0 34px;",
  "}",
  ".tm-hero-icons li {",
  "  display: flex;",
  "  align-items: center;",
  "  gap: 10px;",
  "  color: #F4F0E9;",
  "  font-size: 13.5px;",
  "  font-weight: 600;",
  "  letter-spacing: 0.2px;",
  "  text-shadow: 0 1px 10px rgba(0,12,30,0.55);",
  "}",
  ".tm-hero-ic {",
  "  width: 40px;",
  "  height: 40px;",
  "  border-radius: 50%;",
  "  display: flex;",
  "  align-items: center;",
  "  justify-content: center;",
  "  background: rgba(0,27,61,0.55);",
  "  border: 1px solid rgba(214,183,131,0.7);",
  "  color: #D6B783;",
  "  flex-shrink: 0;",
  "}",
  ".tm-hero-ic svg { width: 20px; height: 20px; }",
  ".tm-hero-actions {",
  "  display: flex;",
  "  align-items: center;",
  "  gap: 16px;",
  "  flex-wrap: wrap;",
  "}",
  ".tm-hero-btn {",
  "  display: inline-flex;",
  "  align-items: center;",
  "  justify-content: center;",
  "  gap: 8px;",
  "  min-height: 48px;",
  "  box-sizing: border-box;",
  "  font-family: 'Raleway', sans-serif;",
  "  font-weight: 700;",
  "  font-size: 14px;",
  "  letter-spacing: 0.3px;",
  "  padding: 14px 26px;",
  "  border-radius: 999px;",
  "  text-decoration: none;",
  "  white-space: nowrap;",
  "  transition: transform 0.25s ease, filter 0.25s ease, background 0.25s ease, color 0.25s ease, border-color 0.25s ease;",
  "}",
  ".tm-hero-btn-gold {",
  "  background: #D6B783;",
  "  color: #001B3D;",
  "  border: 1px solid rgba(255,255,255,0.6);",
  "}",
  ".tm-hero-btn-gold:hover { transform: translateY(-2px); filter: brightness(1.05); }",
  ".tm-hero-btn-navy {",
  "  background: rgba(255,255,255,0.06);",
  "  color: #F4F0E9;",
  "  border: 1.5px solid rgba(214,183,131,0.8);",
  "}",
  ".tm-hero-btn-navy:hover { transform: translateY(-2px); background: #D6B783; color: #001B3D; border-color: #D6B783; }",
  "@media (max-width: 768px) {",
  "  .tm-hero { min-height: 540px; }",
  "  .tm-hero-content { padding: 0 22px 64px; max-width: 100%; }",
  "  .tm-hero-title { font-size: 38px; }",
  "  .tm-hero-subheadline { font-size: 15.5px; }",
  "  .tm-hero-icons { gap: 12px 20px; }",
  "  .tm-hero-actions { flex-direction: column; align-items: stretch; }",
  "  .tm-hero-btn { width: 100%; }",
  "}",
  "@media (max-width: 480px) {",
  "  .tm-hero { min-height: 560px; }",
  "  .tm-hero-title { font-size: 32px; }",
  "  .tm-hero-icons { gap: 10px 14px; }",
  "  .tm-hero-icons li { font-size: 12.5px; }",
  "  .tm-hero-ic { width: 34px; height: 34px; }",
  "  .tm-hero-ic svg { width: 17px; height: 17px; }",
  "}",
  "",
];
const newCssEscaped = cssLines.map(esc).join("\\n");

s = s.replace(oldCss, newCssEscaped);

fs.writeFileSync(FILE, s);
console.log("done");
