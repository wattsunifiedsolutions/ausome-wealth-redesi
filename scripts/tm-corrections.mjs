import fs from "node:fs";

const FILE = "src/content/dra-pages.ts";
let s = fs.readFileSync(FILE, "utf8");

const key = '"tax-mentorship":';
const start = s.indexOf(key);
if (start === -1) throw new Error("tax-mentorship entry not found");
const end = s.indexOf('",\n  },', start); // not used, just to bound nothing

// 1) Hero actions: move lower + consistent sizing -------------------------
const actionsOld = '.tm-hero-actions {\\n  display: flex;\\n  align-items: center;\\n  gap: 16px;\\n  flex-wrap: wrap;\\n}';
const actionsNew = '.tm-hero-actions {\\n  display: flex;\\n  align-items: center;\\n  gap: 18px;\\n  flex-wrap: wrap;\\n  margin-top: 32px;\\n}\\n.tm-btn-primary, .tm-btn-secondary { min-height: 48px; box-sizing: border-box; }';
if (!s.includes(actionsOld, start)) throw new Error("hero actions css not found");
s = s.replace(actionsOld, actionsNew);

// 2) Software Packages section replaces the single Tier 1 strip ----------
const stripStart = s.indexOf('<div class="tm-tier-strip">', start);
const stripEnd = s.indexOf('<section class="tm-cta-section">', stripStart);
if (stripStart === -1 || stripEnd === -1) throw new Error("tier strip bounds not found");

const pkgs =
'<section class="tm-pkgs-section">\\n      <div class="tm-container">\\n        <div class="tm-section-header">\\n          <h2 class="tm-section-title">Software <em>Packages</em></h2>\\n          <p class="tm-section-subtitle">Choose the software package that fits your goals and enroll as the referral agent, Deneshia Renee.</p>\\n        </div>\\n        <div class="tm-pkgs-grid">\\n          <div class="tm-pkg-card">\\n            <span class="tm-pkg-tag">Beginner</span>\\n            <h3>Tier 1</h3>\\n            <p class="tm-pkg-price"><strong>$89</strong><span>was $149</span></p>\\n            <p class="tm-pkg-desc">For tax professionals beginning their journey. Revenue share 70/30, no EFIN required. PTIN required to operate.</p>\\n            <a class="tm-pkg-btn" href="https://thetaxadvisorandassociates.com/tier-1" target="_blank" rel="noopener noreferrer">View Tier 1 &amp; Enroll &rarr;</a>\\n          </div>\\n          <div class="tm-pkg-card">\\n            <span class="tm-pkg-tag">Launch &amp; Grow</span>\\n            <h3>Tier 2</h3>\\n            <p class="tm-pkg-price"><strong>$199</strong><span>was $599</span></p>\\n            <p class="tm-pkg-desc">Unlimited PTIN preparers with 100% of prep, doc prep, e-file and audit fees kept. EFIN &amp; PTIN required.</p>\\n            <a class="tm-pkg-btn" href="https://thetaxadvisorandassociates.com/tier-2" target="_blank" rel="noopener noreferrer">View Tier 2 &amp; Enroll &rarr;</a>\\n          </div>\\n          <div class="tm-pkg-card">\\n            <span class="tm-pkg-tag">Reseller</span>\\n            <h3>Tier 3</h3>\\n            <p class="tm-pkg-price"><strong>$799</strong><span>was $1599</span></p>\\n            <p class="tm-pkg-desc">Build a profitable reseller business with unlimited PTIN &amp; ERO preparers and service bureau earnings. EFIN &amp; PTIN required.</p>\\n            <a class="tm-pkg-btn" href="https://thetaxadvisorandassociates.com/tier-3" target="_blank" rel="noopener noreferrer">View Tier 3 &amp; Enroll &rarr;</a>\\n          </div>\\n          <div class="tm-pkg-card">\\n            <span class="tm-pkg-tag">Service Bureau</span>\\n            <h3>Tier 4</h3>\\n            <p class="tm-pkg-price"><strong>$1499</strong><span>was $1999</span></p>\\n            <p class="tm-pkg-desc">Built for service bureaus ready to scale with unlimited partners, full fee control and complete pricing flexibility. EFIN &amp; PTIN required.</p>\\n            <a class="tm-pkg-btn" href="https://thetaxadvisorandassociates.com/tier-4" target="_blank" rel="noopener noreferrer">View Tier 4 &amp; Enroll &rarr;</a>\\n          </div>\\n        </div>\\n      </div>\\n    </section>\\n\\n    ';

s = s.slice(0, stripStart) + pkgs + s.slice(stripEnd);

// 3) CSS for the new packages grid (buttons bottom-aligned via flex) ------
const cssAnchor = '\\n.tm-faq-link {';
if (!s.includes(cssAnchor, start)) throw new Error("faq-link css anchor not found");
const pkgCss =
'\\n.tm-pkgs-section {\\n  padding: 80px 0;\\n  background: #F4F0E9;\\n  border-top: 1px solid rgba(214, 183, 131, 0.25);\\n}\\n.tm-pkgs-grid {\\n  display: grid;\\n  grid-template-columns: repeat(4, 1fr);\\n  gap: 22px;\\n}\\n.tm-pkg-card {\\n  background: #FFFFFF;\\n  border: 1px solid rgba(214, 183, 131, 0.35);\\n  border-radius: 12px;\\n  padding: 26px 22px;\\n  display: flex;\\n  flex-direction: column;\\n  transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;\\n}\\n.tm-pkg-card:hover { transform: translateY(-4px); border-color: #D6B783; box-shadow: 0 12px 28px rgba(0, 27, 61, 0.08); }\\n.tm-pkg-tag { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #B89657; margin-bottom: 8px; }\\n.tm-pkg-card h3 { font-size: 24px; color: #001B3D; margin: 0 0 8px; }\\n.tm-pkg-price { margin: 0 0 12px; color: #001B3D; }\\n.tm-pkg-price strong { font-size: 30px; }\\n.tm-pkg-price span { font-size: 13px; color: #475569; text-decoration: line-through; margin-left: 6px; }\\n.tm-pkg-desc { font-size: 13.5px; line-height: 1.5; color: #475569; margin: 0 0 20px; flex-grow: 1; }\\n.tm-pkg-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; background: #D6B783; color: #001B3D; font-weight: 700; font-size: 13.5px; letter-spacing: 0.3px; padding: 12px 22px; border-radius: 999px; text-decoration: none; margin-top: auto; transition: transform 0.25s ease, filter 0.25s ease; }\\n.tm-pkg-btn:hover { transform: translateY(-2px); filter: brightness(1.05); }\\n@media (max-width: 1024px) { .tm-pkgs-grid { grid-template-columns: repeat(2, 1fr); } }\\n@media (max-width: 640px) { .tm-pkgs-grid { grid-template-columns: 1fr; } }\\n.tm-faq-link {';
s = s.replace(cssAnchor, pkgCss);

// 4) Match homepage nav exactly: drop the extra Book a Call link ----------
const contactA = '<a class="dra-contact" href="https://draw.downrightausomewealth.com/widget/booking/Eo6P4A5bLSnnPldXZ38e" target="_blank" rel="noopener noreferrer">Book a Call</a>';
const cIdx = s.indexOf(contactA, start);
if (cIdx === -1) throw new Error("dra-contact anchor not found");
s = s.slice(0, cIdx) + s.slice(cIdx + contactA.length);
// tidy the leftover blank line in the header markup
s = s.replace('\\n\\n      </div>\\n  </header>', '\\n      </div>\\n  </header>');

fs.writeFileSync(FILE, s);
console.log("OK");
