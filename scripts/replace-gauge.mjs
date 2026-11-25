import { readFileSync, writeFileSync } from "node:fs";

const file = "src/content/dra-pages.ts";
let src = readFileSync(file, "utf8");

// Real, animated SVG credit score gauge (transparent background, authentic tier colors).
// Built as a single-line block with \n escapes so it stays valid inside the single-quoted TS string.
const gaugeBlock = [
  '<style>',
  '.dra-gauge{width:100%;max-width:290px;margin:0 auto;display:flex;flex-direction:column;align-items:center;background:transparent}',
  '.dra-gauge-svg{display:block;width:100%;height:auto;overflow:visible}',
  '.dra-gauge-svg .seg{fill:none;stroke-width:22;stroke-linecap:butt}',
  '.dra-gauge-needle{transform-box:view-box;transform-origin:150px 180px;animation:draGaugeSweep 4.2s cubic-bezier(.4,0,.2,1) infinite}',
  '.dra-gauge-num{font-family:"Noto Serif Display",Georgia,serif;font-size:30px;font-weight:700;fill:#001B3D}',
  '.dra-gauge-labels{display:flex;justify-content:space-between;width:100%;max-width:250px;margin-top:4px;padding:0 8px;font-family:Raleway,Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:.06em}',
  '.dra-gauge-caption{margin-top:8px;font-family:Raleway,Arial,sans-serif;font-size:13px;font-weight:800;letter-spacing:.22em;color:#001B3D}',
  '@keyframes draGaugeSweep{0%{transform:rotate(-92deg)}46%{transform:rotate(58deg)}82%{transform:rotate(58deg)}100%{transform:rotate(-92deg)}}',
  '@media (prefers-reduced-motion:reduce){.dra-gauge-needle{animation:none;transform:rotate(40deg)}}',
  '</style>',
  '<div class="dra-gauge" role="img" aria-label="Animated credit score gauge showing score tiers from NO to MAX">',
  '<svg class="dra-gauge-svg" viewBox="0 0 300 200" width="300" height="200" aria-hidden="true">',
  '<path class="seg" d="M35 180 A115 115 0 0 0 57.0 112.3" stroke="#E53935"/>',
  '<path class="seg" d="M57.0 112.3 A115 115 0 0 0 114.5 70.6" stroke="#FB8C00"/>',
  '<path class="seg" d="M114.5 70.6 A115 115 0 0 0 185.5 70.6" stroke="#E6C34A"/>',
  '<path class="seg" d="M185.5 70.6 A115 115 0 0 0 243.0 112.3" stroke="#8BC34A"/>',
  '<path class="seg" d="M243.0 112.3 A115 115 0 0 0 265 180" stroke="#2E7D32"/>',
  '<g class="dra-gauge-needle"><line x1="150" y1="180" x2="150" y2="92" stroke="#001B3D" stroke-width="4" stroke-linecap="round"/><circle cx="150" cy="180" r="10" fill="#001B3D"/><circle cx="150" cy="180" r="4" fill="#D6B783"/></g>',
  '<text class="dra-gauge-num" x="150" y="150" text-anchor="middle">720</text>',
  '</svg>',
  '<div class="dra-gauge-labels"><span style="color:#E53935">NO</span><span style="color:#FB8C00">LOW</span><span style="color:#E6C34A">MEDIUM</span><span style="color:#8BC34A">HIGH</span><span style="color:#2E7D32">MAX</span></div>',
  '<div class="dra-gauge-caption">CREDIT SCORE</div>',
  '</div>',
].join("\\n");

const img1 =
  '<img class="diy-gauge-img" src="/assets/credit-score-gauge.gif" alt="Animated credit score gauge displaying authentic tier colors across NO, LOW, MEDIUM, HIGH, and MAX with CREDIT SCORE typography" width="600" height="510" loading="lazy">';

const img2 =
  '<img src="/assets/credit-score-gauge.gif" alt="Animated illustrative credit score gauge" loading="lazy" decoding="async">';

let count = 0;
if (src.includes(img1)) {
  src = src.replace(img1, gaugeBlock);
  count++;
}
if (src.includes(img2)) {
  src = src.replace(img2, gaugeBlock);
  count++;
}

writeFileSync(file, src, "utf8");
console.log("Replacements made:", count);
console.log("Remaining credit-score-gauge.gif refs:", (src.match(/credit-score-gauge\.gif/g) || []).length);
