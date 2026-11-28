import fs from "node:fs";

const FILE = "src/content/dra-pages.ts";
let s = fs.readFileSync(FILE, "utf8");

const esc = (str) =>
  str
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"');

// ---- 1. Replace the blueprint ("DRA Tax Gives You Everything") HTML ----
const bpOpen = '<section class=\\"tm-blueprint-section\\">';
const bpStart = s.indexOf(bpOpen);
if (bpStart === -1) { console.error("blueprint open not found"); process.exit(1); }
const swOpen = '<section class=\\"tm-software-section\\"';
const swStart = s.indexOf(swOpen, bpStart);
if (swStart === -1) { console.error("software open not found"); process.exit(1); }
// blueprint section ends right before software section; back up over whitespace
let bpEnd = swStart;
while (bpEnd > bpStart && /\s/.test(s[bpEnd - 1])) bpEnd--;

const givesHtml = [
  '<section class="tm-gives-section">',
  '  <div class="tm-container">',
  '    <div class="tm-gives-header">',
  '      <p class="im-eyebrow">DRA Tax Gives You Everything</p>',
  '      <h2>Everything You Need <em>To Succeed</em></h2>',
  '    </div>',
  '    <div class="tm-gives-grid">',
  '      <div class="tm-gives-item">',
  '        <span class="tm-gives-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></span>',
  '        <h3>Mentorship & Consulting</h3>',
  '        <p>One-on-one coaching and group mentorship calls to guide every step of your journey.</p>',
  '      </div>',
  '      <div class="tm-gives-item">',
  '        <span class="tm-gives-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="14" rx="1.5"/><path d="M1 21h22l-2-4H3zM8 8l-2 2 2 2m8-4 2 2-2 2m-5 1 2-6"/></svg></span>',
  '        <h3>Professional Tax Software</h3>',
  '        <p>Industry-leading software with bank registration, e-file, and live technical support.</p>',
  '      </div>',
  '      <div class="tm-gives-item">',
  '        <span class="tm-gives-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></span>',
  '        <h3>Training & Education</h3>',
  '        <p>Hands-on training, classes, and resources to build real skills and confidence.</p>',
  '      </div>',
  '      <div class="tm-gives-item">',
  '        <span class="tm-gives-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4"/><path d="M9 9h.01M9 13h.01M9 17h.01"/></svg></span>',
  '        <h3>Business Startup Resources</h3>',
  '        <p>LLC setup, EIN, marketing guidance, and automation workflows to launch your business.</p>',
  '      </div>',
  '    </div>',
  '  </div>',
  '</section>',
  '',
].join("\n");

s = s.slice(0, bpStart) + esc(givesHtml) + s.slice(bpEnd);

// ---- 2. Replace software section + cta section with packages + compact consult CTA ----
const swOpen2 = '<section class=\\"tm-software-section\\"';
const swStart2 = s.indexOf(swOpen2);
if (swStart2 === -1) { console.error("software open2 not found"); process.exit(1); }
const faqMarker = '<div class=\\"tm-faq-link\\">';
const faqIdx = s.indexOf(faqMarker, swStart2);
if (faqIdx === -1) { console.error("faq link not found"); process.exit(1); }
// back up over whitespace before faq
let segEnd = faqIdx;
while (segEnd > swStart2 && /\s/.test(s[segEnd - 1])) segEnd--;

const BOOK = "https://draw.downrightausomewealth.com/widget/booking/Eo6P4A5bLSnnPldXZ38e";

const pkgHtml = [
  '<section class="tm-pkgs-section" id="packages">',
  '  <div class="tm-container">',
  '    <div class="tm-section-header">',
  '      <h2 class="tm-section-title">Software <em>Packages</em></h2>',
  '      <p class="tm-section-subtitle">Choose the software package that fits your goals and enroll as the referral agent, Deneshia Renee.</p>',
  '    </div>',
  '    <div class="tm-pkgs-grid">',
  '      <div class="tm-pkg-card">',
  '        <span class="tm-pkg-tag">Beginner</span>',
  '        <h3>Tier 1</h3>',
  '        <p class="tm-pkg-price"><strong>$89</strong><span>was $149</span></p>',
  '        <p class="tm-pkg-desc">For tax professionals beginning their journey. Revenue share 70/30, no EFIN required. PTIN required to operate.</p>',
  '        <a class="tm-pkg-btn" href="https://thetaxadvisorandassociates.com/tier-1" target="_blank" rel="noopener noreferrer">View Package Details &rarr;</a>',
  '      </div>',
  '      <div class="tm-pkg-card">',
  '        <span class="tm-pkg-tag">Launch & Grow</span>',
  '        <h3>Tier 2</h3>',
  '        <p class="tm-pkg-price"><strong>$199</strong><span>was $599</span></p>',
  '        <p class="tm-pkg-desc">Unlimited PTIN preparers with 100% of prep, doc prep, e-file and audit fees kept. EFIN & PTIN required.</p>',
  '        <a class="tm-pkg-btn" href="https://thetaxadvisorandassociates.com/tier-2" target="_blank" rel="noopener noreferrer">View Package Details &rarr;</a>',
  '      </div>',
  '      <div class="tm-pkg-card">',
  '        <span class="tm-pkg-tag">Reseller</span>',
  '        <h3>Tier 3</h3>',
  '        <p class="tm-pkg-price"><strong>$799</strong><span>was $1599</span></p>',
  '        <p class="tm-pkg-desc">Build a profitable reseller business with unlimited PTIN & ERO preparers and service bureau earnings. EFIN & PTIN required.</p>',
  '        <a class="tm-pkg-btn" href="https://thetaxadvisorandassociates.com/tier-3" target="_blank" rel="noopener noreferrer">View Package Details &rarr;</a>',
  '      </div>',
  '      <div class="tm-pkg-card">',
  '        <span class="tm-pkg-tag">Service Bureau</span>',
  '        <h3>Tier 4</h3>',
  '        <p class="tm-pkg-price"><strong>$1499</strong><span>was $1999</span></p>',
  '        <p class="tm-pkg-desc">Built for service bureaus ready to scale with unlimited partners, full fee control and complete pricing flexibility. EFIN & PTIN required.</p>',
  '        <a class="tm-pkg-btn" href="https://thetaxadvisorandassociates.com/tier-4" target="_blank" rel="noopener noreferrer">View Package Details &rarr;</a>',
  '      </div>',
  '    </div>',
  '  </div>',
  '</section>',
  '<section class="tm-consult-cta" id="enrollment">',
  '  <div class="tm-container tm-consult-inner">',
  '    <div class="tm-consult-text">',
  '      <h2 class="tm-consult-title">Ready to Begin?</h2>',
  '      <p class="tm-consult-desc">Schedule a consultation to find the right path for your tax business.</p>',
  '    </div>',
  '    <a href="' + BOOK + '" class="tm-hero-btn tm-hero-btn-gold" target="_blank" rel="noopener noreferrer">Schedule a Consultation &rarr;</a>',
  '  </div>',
  '</section>',
  '',
].join("\n");

s = s.slice(0, swStart2) + esc(pkgHtml) + s.slice(segEnd);

// ---- 3. Add CSS for tm-gives-section and tm-consult-cta before .tm-pkgs-section ----
const cssAnchor = ".tm-pkgs-section {";
const cssIdx = s.indexOf(cssAnchor);
if (cssIdx === -1) { console.error("pkgs css anchor not found"); process.exit(1); }

const cssLines = [
  ".tm-gives-section {",
  "  padding: 56px 0;",
  "  background: #001B3D;",
  "  color: #FFFFFF;",
  "  border-block: 1px solid #D6B783;",
  "}",
  ".tm-gives-header { text-align: center; max-width: 720px; margin: 0 auto 28px; }",
  ".tm-gives-header .im-eyebrow { color: #D6B783; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; font-size: 12px; margin-bottom: 8px; }",
  ".tm-gives-header h2 { font-size: 30px; line-height: 1.2; color: #FFFFFF; margin: 0; }",
  ".tm-gives-header h2 em { color: #D6B783; font-style: normal; }",
  ".tm-gives-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; max-width: 1100px; margin: 0 auto; }",
  ".tm-gives-item { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 10px; padding: 0 14px; }",
  ".tm-gives-item + .tm-gives-item { border-left: 1px solid rgba(214,183,131,0.25); }",
  ".tm-gives-icon { width: 52px; height: 52px; display: flex; align-items: center; justify-content: center; color: #D6B783; }",
  ".tm-gives-icon svg { width: 40px; height: 40px; }",
  ".tm-gives-item h3 { font-size: 17px; color: #FFFFFF; margin: 0; }",
  ".tm-gives-item p { font-size: 13.5px; line-height: 1.5; color: #CBD5E1; margin: 0; }",
  ".tm-consult-cta { background: #001B3D; border-top: 1px solid #D6B783; padding: 40px 0; }",
  ".tm-consult-inner { display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; }",
  ".tm-consult-title { font-size: 28px; margin: 0 0 6px; color: #FFFFFF; }",
  ".tm-consult-desc { margin: 0; color: #CBD5E1; font-size: 15px; }",
  "@media (max-width: 900px) { .tm-gives-grid { grid-template-columns: repeat(2, 1fr); gap: 28px 0; } .tm-gives-item + .tm-gives-item { border-left: none; } .tm-gives-item:nth-child(odd) { border-right: 1px solid rgba(214,183,131,0.25); } }",
  "@media (max-width: 560px) { .tm-gives-grid { grid-template-columns: 1fr; } .tm-gives-item { border-left: none !important; border-right: none !important; padding: 14px 0; border-top: 1px solid rgba(214,183,131,0.2); } .tm-gives-item:first-child { border-top: none; } .tm-consult-inner { flex-direction: column; text-align: center; } }",
  "",
].join("\n");

s = s.slice(0, cssIdx) + cssLines + s.slice(cssIdx);

fs.writeFileSync(FILE, s);
console.log("done: blueprint -> 4-col gives, software+cta -> packages+consult");
