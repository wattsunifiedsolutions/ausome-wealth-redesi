import { readFileSync, writeFileSync } from "node:fs";

const file = "src/content/dra-pages.ts";
let src = readFileSync(file, "utf8");

// Find the conversion grid block start.
const startMark = '<div class="dra-conv-grid">';
const startIdx = src.indexOf(startMark);
if (startIdx === -1) {
  console.error("grid start not found");
  process.exit(1);
}

// The block ends at the closing of the grid div, which is immediately
// followed by the container close + section close.
const tailMark = "\\n  </div>\\n</section>";
const tailIdx = src.indexOf(tailMark, startIdx);
if (tailIdx === -1) {
  console.error("grid tail not found");
  process.exit(1);
}

const oldBlock = src.slice(startIdx, tailIdx);
console.log("OLD block length:", oldBlock.length);

// New 2-column layout: left = stacked DIY + Full-Service (kept together),
// right = score gauge card. Grid 1.15fr / 0.85fr.
const newBlock = [
  '<div class="dra-conv-grid">',
  '<div class="dra-conv-left">',
  '<div class="dra-conv-card">',
  '<div class="dra-conv-eyebrow">SELF-PACED PATH</div>',
  '<h3 class="dra-conv-title">DIY Credit Repair Kit</h3>',
  '<div class="dra-conv-price">$77<span class="dra-conv-per">/mo</span></div>',
  '<ul class="dra-conv-list">',
  '<li><span class="dra-ck">&#10003;</span>3-bureau report import & audit</li>',
  '<li><span class="dra-ck">&#10003;</span>Custom dispute letter templates</li>',
  '<li><span class="dra-ck">&#10003;</span>Step-by-step guided portal</li>',
  "</ul>",
  '<a class="dra-conv-btn" href="/credit-repair.html">Get Started Now &rarr;</a>',
  "</div>",
  '<div class="dra-conv-or"><span>OR</span></div>',
  '<div class="dra-conv-card dra-conv-card--navy">',
  '<div class="dra-conv-eyebrow">FULL-SERVICE CONCIERGE</div>',
  '<h3 class="dra-conv-title">Done-For-You Restoration</h3>',
  '<p class="dra-conv-sub">Handled end-to-end by DRA specialists</p>',
  '<ul class="dra-conv-list">',
  '<li><span class="dra-ck">&#10003;</span>Dedicated specialist case management</li>',
  '<li><span class="dra-ck">&#10003;</span>Custom bureau & creditor disputes</li>',
  '<li><span class="dra-ck">&#10003;</span>Monthly progress & score coaching</li>',
  "</ul>",
  '<a class="dra-conv-btn" href="https://downrightausomewealth.com/cro-8784">Explore Full-Service Restoration &rarr;</a>',
  "</div>",
  "</div>",
  '<div class="dra-conv-card dra-conv-gauge-card">',
  '<div class="dra-conv-eyebrow">SCORE POTENTIAL</div>',
  '<h3 class="dra-conv-title">Target Your Next Tier</h3>',
  '<div class="fico-gauge" data-fico-gauge>',
  '<svg class="fico-gauge-svg" viewBox="0 0 260 150" width="260" height="150" aria-hidden="true">',
  "<defs>",
  '<linearGradient id="draConvArc" x1="0" y1="0" x2="1" y2="0">',
  '<stop offset="0%" stop-color="#DC2626"/>',
  '<stop offset="50%" stop-color="#D97706"/>',
  '<stop offset="100%" stop-color="#059669"/>',
  "</linearGradient>",
  "</defs>",
  '<path class="fico-track" d="M30 130 A100 100 0 0 1 230 130" fill="none" stroke="#EDE7DC" stroke-width="12" stroke-linecap="round"/>',
  '<path class="fico-arc" d="M30 130 A100 100 0 0 1 230 130" fill="none" stroke="url(#draConvArc)" stroke-width="10" stroke-linecap="round"/>',
  '<g class="fico-needle" data-fico-needle>',
  '<line x1="130" y1="130" x2="130" y2="56" stroke="#001B3D" stroke-width="3.5" stroke-linecap="round"/>',
  '<polygon points="127,60 133,60 130,50" fill="#001B3D"/>',
  '<circle cx="130" cy="130" r="9" fill="#001B3D"/>',
  '<circle cx="130" cy="130" r="4" fill="#D6B783"/>',
  "</g>",
  '<text class="fico-num" data-fico-num x="130" y="98" text-anchor="middle">720</text>',
  "</svg>",
  '<div class="fico-pill" data-fico-pill>GOOD &bull; 670&ndash;739</div>',
  '<div class="fico-slider-wrap">',
  '<input class="fico-slider" data-fico-slider type="range" min="300" max="850" value="720" aria-label="Slide to preview credit score tiers">',
  '<span class="fico-prompt">Slide to preview score tiers</span>',
  "</div>",
  "</div>",
  "</div>",
  "</div>",
].join("\\n");

src = src.slice(0, startIdx) + newBlock + src.slice(tailIdx);

// Update the CSS: switch to 2-column grid and add the new helper classes.
src = src.replace(
  ".dra-conv-grid{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px;align-items:stretch;padding:0 20px;box-sizing:border-box}",
  ".dra-conv-grid{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1.15fr 0.85fr;gap:24px;align-items:stretch;padding:0 20px;box-sizing:border-box}",
);
// Add left-column stack + OR divider styles right after the card base rule.
const cssAnchor = ".dra-conv-card{background:#fff;border:1px solid rgba(169,147,105,.35);border-radius:14px;padding:28px;display:flex;flex-direction:column}";
const cssInsert =
  cssAnchor +
  "\\n.dra-conv-left{display:flex;flex-direction:column;gap:0}" +
  "\\n.dra-conv-or{display:flex;align-items:center;justify-content:center;padding:10px 0}" +
  "\\n.dra-conv-or span{font-family:Raleway,Arial,sans-serif;font-size:12px;font-weight:800;letter-spacing:.18em;color:#A99369;background:#fff;border:1px solid rgba(169,147,105,.35);border-radius:999px;padding:4px 16px}" +
  "\\n.dra-conv-gauge-card{justify-content:center;align-items:center;text-align:center}" +
  "\\n.dra-conv-gauge-card .dra-conv-title{margin-bottom:8px}";
if (src.includes(cssAnchor) && !src.includes(".dra-conv-left{")) {
  src = src.replace(cssAnchor, cssInsert);
}
// Update the responsive breakpoint to keep 2-up sensible then stack.
src = src.replace(
  "@media (max-width:1024px){.dra-conv-grid{grid-template-columns:1fr;max-width:540px}}",
  "@media (max-width:1024px){.dra-conv-grid{grid-template-columns:1fr;max-width:560px}}",
);

writeFileSync(file, src, "utf8");
console.log("Conversion grid restructured to 2-column (options together + gauge).");
console.log("dra-conv-left refs:", (src.match(/dra-conv-left/g) || []).length);
console.log("dra-conv-or refs:", (src.match(/dra-conv-or/g) || []).length);
console.log("data-fico-gauge refs:", (src.match(/data-fico-gauge/g) || []).length);
