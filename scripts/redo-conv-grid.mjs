import { readFileSync, writeFileSync } from "node:fs";

const file = "src/content/dra-pages.ts";
let src = readFileSync(file, "utf8");

// --- Locate the conversion-card block on the credit-resources page only ---
const startMark = "<!-- Unified Conversion Card";
const startIdx = src.indexOf(startMark);
if (startIdx === -1) {
  console.error("START marker not found");
  process.exit(1);
}

// The conversion card is the last child of .diy-container inside the
// .diy-easy-section. Its closing is immediately followed by the container
// close + section close: "\n  </div>\n</section>".
// The source stores newlines as literal \n escapes inside the TS string.
const tailMark = "\\n  </div>\\n</section>";
const tailIdx = src.indexOf(tailMark, startIdx);
if (tailIdx === -1) {
  console.error("TAIL marker not found");
  process.exit(1);
}

const oldSegment = src.slice(startIdx, tailIdx);
console.log("OLD segment length:", oldSegment.length, "| starts:", JSON.stringify(oldSegment.slice(0, 60)));

// --- New 3-column executive conversion grid ---
// Built with literal \n escapes so it stays valid inside the single-quoted
// TS string. No raw single quotes (apostrophes use &apos; / entities).
const css = [
  "<style>",
  ".dra-conv-grid{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px;align-items:stretch;padding:0 20px;box-sizing:border-box}",
  ".dra-conv-card{background:#fff;border:1px solid rgba(169,147,105,.35);border-radius:14px;padding:28px;display:flex;flex-direction:column}",
  ".dra-conv-card--navy{background:#001B3D;border-color:#D6B783}",
  ".dra-conv-eyebrow{font-family:Raleway,Arial,sans-serif;font-size:11px;font-weight:800;letter-spacing:.22em;text-transform:uppercase;color:#A99369;margin:0 0 12px}",
  ".dra-conv-card--navy .dra-conv-eyebrow{color:#D6B783}",
  ".dra-conv-title{font-family:\"Noto Serif Display\",Georgia,serif;font-size:23px;font-weight:700;color:#001B3D;margin:0 0 4px;line-height:1.18}",
  ".dra-conv-card--navy .dra-conv-title{color:#F4F0E9}",
  ".dra-conv-sub{font-family:Raleway,Arial,sans-serif;font-size:13px;color:#F4F0E9;opacity:.82;margin:0 0 16px}",
  ".dra-conv-price{font-family:\"Noto Serif Display\",Georgia,serif;font-size:36px;font-weight:700;color:#001B3D;margin:4px 0 16px;line-height:1}",
  ".dra-conv-per{font-family:Raleway,Arial,sans-serif;font-size:15px;font-weight:600;color:#6b7280;letter-spacing:.02em}",
  ".dra-conv-list{list-style:none;margin:0 0 18px;padding:0;display:flex;flex-direction:column;gap:10px}",
  ".dra-conv-list li{font-family:Raleway,Arial,sans-serif;font-size:14px;line-height:1.45;color:#001B3D;display:flex;gap:9px;align-items:flex-start}",
  ".dra-conv-card--navy .dra-conv-list li{color:#F4F0E9}",
  ".dra-ck{color:#D6B783;font-weight:800;flex:0 0 auto;font-size:13px;line-height:1.45}",
  ".dra-conv-btn{display:block;width:100%;text-align:center;background:#D6B783;color:#001B3D;text-decoration:none;padding:13px 18px;border-radius:999px;font-family:Raleway,Arial,sans-serif;font-weight:700;font-size:14px;letter-spacing:.02em;margin-top:auto;border:none}",
  ".dra-conv-btn:hover{background:#001B3D;color:#fff}",
  ".dra-conv-card--navy .dra-conv-btn:hover{background:#D6B783;color:#001B3D}",
  ".fico-gauge{width:100%;max-width:240px;margin:8px auto 0;display:flex;flex-direction:column;align-items:center;background:transparent}",
  ".fico-gauge-svg{display:block;width:100%;height:auto;overflow:visible}",
  ".fico-arc{transition:none}",
  ".fico-needle{transform-box:view-box;transform-origin:130px 130px;transition:transform .35s cubic-bezier(.34,1.2,.5,1)}",
  ".fico-num{font-family:\"Noto Serif Display\",Georgia,serif;font-size:30px;font-weight:700;fill:#001B3D;font-variant-numeric:tabular-nums;letter-spacing:.5px}",
  ".fico-pill{margin-top:2px;display:inline-block;padding:5px 14px;border-radius:999px;font-family:Raleway,Arial,sans-serif;font-size:11px;font-weight:800;letter-spacing:.12em;color:#fff;background:#10B981;transition:background .25s ease}",
  ".fico-slider-wrap{margin-top:14px;width:100%;max-width:220px;display:flex;flex-direction:column;align-items:center;gap:6px}",
  ".fico-slider{-webkit-appearance:none;appearance:none;width:100%;height:4px;border-radius:999px;background:#E3DCCF;outline:none;cursor:pointer}",
  ".fico-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:16px;height:16px;border-radius:50%;background:#001B3D;border:2px solid #D6B783;box-shadow:0 1px 4px rgba(0,0,0,.2);cursor:pointer}",
  ".fico-slider::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:#001B3D;border:2px solid #D6B783;box-shadow:0 1px 4px rgba(0,0,0,.2);cursor:pointer}",
  ".fico-prompt{font-family:Raleway,Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:.06em;color:#9a9384}",
  "@media (prefers-reduced-motion:reduce){.fico-needle{transition:none}}",
  "@media (max-width:1024px){.dra-conv-grid{grid-template-columns:1fr;max-width:540px}}",
  "</style>",
].join("\\n");

const col1 = [
  '<div class="dra-conv-grid">',
  '<div class="dra-conv-card">',
  '<div class="dra-conv-eyebrow">SELF-PACED PATH</div>',
  '<h3 class="dra-conv-title">DIY Credit Repair Kit</h3>',
  '<div class="dra-conv-price">$77<span class="dra-conv-per">/mo</span></div>',
  '<ul class="dra-conv-list">',
  '<li><span class="dra-ck">&#10003;</span>3-bureau report import &amp; audit</li>',
  '<li><span class="dra-ck">&#10003;</span>Custom dispute letter templates</li>',
  '<li><span class="dra-ck">&#10003;</span>Step-by-step guided portal</li>',
  "</ul>",
  '<a class="dra-conv-btn" href="/credit-repair.html">Get Started Now &rarr;</a>',
  "</div>",
].join("\\n");

const col2 = [
  '<div class="dra-conv-card dra-conv-card--navy">',
  '<div class="dra-conv-eyebrow">FULL-SERVICE CONCIERGE</div>',
  '<h3 class="dra-conv-title">Done-For-You Restoration</h3>',
  '<p class="dra-conv-sub">Handled end-to-end by DRA specialists</p>',
  '<ul class="dra-conv-list">',
  '<li><span class="dra-ck">&#10003;</span>Dedicated specialist case management</li>',
  '<li><span class="dra-ck">&#10003;</span>Custom bureau &amp; creditor disputes</li>',
  '<li><span class="dra-ck">&#10003;</span>Monthly progress &amp; score coaching</li>',
  "</ul>",
  '<a class="dra-conv-btn" href="https://downrightausomewealth.com/cro-8784">Explore Full-Service Restoration &rarr;</a>',
  "</div>",
].join("\\n");

const col3 = [
  '<div class="dra-conv-card">',
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

const newContent = [css, col1, col2, col3].join("\\n");

src = src.slice(0, startIdx) + newContent + src.slice(tailIdx);

writeFileSync(file, src, "utf8");
console.log("Conversion grid replaced.");
console.log("Remaining old conv-card refs:", (src.match(/diy-conversion-card|diy-conv-col|diy-conv-or-pill|diy-conv-gauge-col/g) || []).length);
console.log("New grid refs:", (src.match(/dra-conv-grid/g) || []).length);
console.log("fico-gauge refs:", (src.match(/data-fico-gauge/g) || []).length);