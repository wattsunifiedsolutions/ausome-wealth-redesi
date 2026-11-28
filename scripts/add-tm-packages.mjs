import fs from "node:fs";

const FILE = "src/content/dra-pages.ts";
let s = fs.readFileSync(FILE, "utf8");

const esc = (str) => str.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"');

// --- 1. Insert the Software Packages section markup before tm-cta-section ---
// Anchor: the escaped string contains <section class=\"tm-cta-section\">
const ctaMarker = '<section class=\"tm-cta-section\">';
const ctaIdx = s.indexOf(ctaMarker);
if (ctaIdx === -1) { console.error("cta section not found"); process.exit(1); }

const pkgLines = [
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
  '        <span class="tm-pkg-tag">Launch &amp; Grow</span>',
  '        <h3>Tier 2</h3>',
  '        <p class="tm-pkg-price"><strong>$199</strong><span>was $599</span></p>',
  '        <p class="tm-pkg-desc">Unlimited PTIN preparers with 100% of prep, doc prep, e-file and audit fees kept. EFIN &amp; PTIN required.</p>',
  '        <a class="tm-pkg-btn" href="https://thetaxadvisorandassociates.com/tier-2" target="_blank" rel="noopener noreferrer">View Package Details &rarr;</a>',
  '      </div>',
  '      <div class="tm-pkg-card">',
  '        <span class="tm-pkg-tag">Reseller</span>',
  '        <h3>Tier 3</h3>',
  '        <p class="tm-pkg-price"><strong>$799</strong><span>was $1599</span></p>',
  '        <p class="tm-pkg-desc">Build a profitable reseller business with unlimited PTIN &amp; ERO preparers and service bureau earnings. EFIN &amp; PTIN required.</p>',
  '        <a class="tm-pkg-btn" href="https://thetaxadvisorandassociates.com/tier-3" target="_blank" rel="noopener noreferrer">View Package Details &rarr;</a>',
  '      </div>',
  '      <div class="tm-pkg-card">',
  '        <span class="tm-pkg-tag">Service Bureau</span>',
  '        <h3>Tier 4</h3>',
  '        <p class="tm-pkg-price"><strong>$1499</strong><span>was $1999</span></p>',
  '        <p class="tm-pkg-desc">Built for service bureaus ready to scale with unlimited partners, full fee control and complete pricing flexibility. EFIN &amp; PTIN required.</p>',
  '        <a class="tm-pkg-btn" href="https://thetaxadvisorandassociates.com/tier-4" target="_blank" rel="noopener noreferrer">View Package Details &rarr;</a>',
  '      </div>',
  '    </div>',
  '  </div>',
  '</section>',
  '',
];
const pkgEscaped = pkgLines.map(esc).join("\\n");
s = s.slice(0, ctaIdx) + pkgEscaped + s.slice(ctaIdx);

// --- 2. Add the packages CSS before the .tm-faq-link rule ---
const cssAnchor = ".tm-faq-link {";
const cssIdx = s.indexOf(cssAnchor);
if (cssIdx === -1) { console.error("faq-link css not found"); process.exit(1); }
const cssLines = [
  ".tm-pkgs-section {",
  "  padding: 80px 0;",
  "  background: #F4F0E9;",
  "  border-top: 1px solid rgba(214, 183, 131, 0.25);",
  "}",
  ".tm-pkgs-grid {",
  "  display: grid;",
  "  grid-template-columns: repeat(4, 1fr);",
  "  gap: 22px;",
  "}",
  ".tm-pkg-card {",
  "  background: #FFFFFF;",
  "  border: 1px solid rgba(214, 183, 131, 0.35);",
  "  border-radius: 12px;",
  "  padding: 26px 22px;",
  "  display: flex;",
  "  flex-direction: column;",
  "  transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;",
  "}",
  ".tm-pkg-card:hover { transform: translateY(-4px); border-color: #D6B783; box-shadow: 0 12px 28px rgba(0, 27, 61, 0.08); }",
  ".tm-pkg-tag { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #B89657; margin-bottom: 8px; }",
  ".tm-pkg-card h3 { font-size: 24px; color: #001B3D; margin: 0 0 8px; }",
  ".tm-pkg-price { margin: 0 0 12px; color: #001B3D; }",
  ".tm-pkg-price strong { font-size: 30px; }",
  ".tm-pkg-price span { font-size: 13px; color: #475569; text-decoration: line-through; margin-left: 6px; }",
  ".tm-pkg-desc { font-size: 13.5px; line-height: 1.5; color: #475569; margin: 0 0 20px; flex-grow: 1; }",
  ".tm-pkg-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; background: #D6B783; color: #001B3D; font-weight: 700; font-size: 13.5px; letter-spacing: 0.3px; padding: 12px 22px; border-radius: 999px; text-decoration: none; margin-top: auto; transition: transform 0.25s ease, filter 0.25s ease; }",
  ".tm-pkg-btn:hover { transform: translateY(-2px); filter: brightness(1.05); }",
  "@media (max-width: 1024px) { .tm-pkgs-grid { grid-template-columns: repeat(2, 1fr); } }",
  "@media (max-width: 640px) { .tm-pkgs-grid { grid-template-columns: 1fr; } }",
  "",
];
const cssEscaped = cssLines.map(esc).join("\\n");
s = s.slice(0, cssIdx) + cssEscaped + s.slice(cssIdx);

fs.writeFileSync(FILE, s);
console.log("packages section added");
