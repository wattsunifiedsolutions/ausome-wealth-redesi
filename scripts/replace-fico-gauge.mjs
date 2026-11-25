import { readFileSync, writeFileSync } from "node:fs";

const file = "src/content/dra-pages.ts";
let src = readFileSync(file, "utf8");

// The exact current gauge block (single-line, \n-escaped inside the TS string).
const oldBlock =
  '<div class="dra-gauge" role="img" aria-label="Animated credit score gauge showing score tiers from NO to MAX">\\n' +
  '<svg class="dra-gauge-svg" viewBox="0 0 300 200" width="300" height="200" aria-hidden="true">\\n' +
  '<path class="seg" d="M35 180 A115 115 0 0 0 57.0 112.3" stroke="#E53935"/>\\n' +
  '<path class="seg" d="M57.0 112.3 A115 115 0 0 0 114.5 70.6" stroke="#FB8C00"/>\\n' +
  '<path class="seg" d="M114.5 70.6 A115 115 0 0 0 185.5 70.6" stroke="#E6C34A"/>\\n' +
  '<path class="seg" d="M185.5 70.6 A115 115 0 0 0 243.0 112.3" stroke="#8BC34A"/>\\n' +
  '<path class="seg" d="M243.0 112.3 A115 115 0 0 0 265 180" stroke="#2E7D32"/>\\n' +
  '<g class="dra-gauge-needle"><line x1="150" y1="180" x2="150" y2="92" stroke="#001B3D" stroke-width="4" stroke-linecap="round"/><circle cx="150" cy="180" r="10" fill="#001B3D"/><circle cx="150" cy="180" r="4" fill="#D6B783"/></g>\\n' +
  '<text class="dra-gauge-num" x="150" y="150" text-anchor="middle">720</text>\\n' +
  '</svg>\\n' +
  '<div class="dra-gauge-labels"><span style="color:#E53935">NO</span><span style="color:#FB8C00">LOW</span><span style="color:#E6C34A">MEDIUM</span><span style="color:#8BC34A">HIGH</span><span style="color:#2E7D32">MAX</span></div>\\n' +
  '<div class="dra-gauge-caption">CREDIT SCORE</div>\\n' +
  '</div>';

if (!src.includes(oldBlock)) {
  console.error("OLD GAUGE BLOCK NOT FOUND");
  process.exit(1);
}

// New interactive FICO-style gauge. Built with \n escapes to stay valid inside the
// single-quoted TS string. Uses a smooth gradient arc, tick marks, tapered needle,
// gold pivot, tabular serif readout, dynamic tier pill, and a range slider.
const newBlock = [
  '<div class="fico-gauge" data-fico-gauge>',
  '<svg class="fico-gauge-svg" viewBox="0 0 320 210" width="320" height="210" aria-hidden="true">',
  '<defs>',
  '<linearGradient id="ficoArc" x1="0" y1="0" x2="1" y2="0">',
  '<stop offset="0%" stop-color="#DC2626"/>',
  '<stop offset="28%" stop-color="#F59E0B"/>',
  '<stop offset="55%" stop-color="#10B981"/>',
  '<stop offset="100%" stop-color="#059669"/>',
  '</linearGradient>',
  '</defs>',
  '<path class="fico-track" d="M30 185 A140 140 0 0 1 290 185" fill="none" stroke="#E9E4DA" stroke-width="16" stroke-linecap="round"/>',
  '<path class="fico-arc" d="M30 185 A140 140 0 0 1 290 185" fill="none" stroke="url(#ficoArc)" stroke-width="14" stroke-linecap="round"/>',
  '<g class="fico-ticks"></g>',
  '<g class="fico-needle" data-fico-needle>',
  '<line x1="160" y1="185" x2="160" y2="78" stroke="#001B3D" stroke-width="4" stroke-linecap="round"/>',
  '<polygon points="156,80 164,80 160,70" fill="#001B3D"/>',
  '<circle cx="160" cy="185" r="11" fill="#001B3D"/>',
  '<circle cx="160" cy="185" r="5" fill="#D6B783"/>',
  '</g>',
  '<text class="fico-num" data-fico-num x="160" y="158" text-anchor="middle">720</text>',
  '<text class="fico-range" data-fico-range x="160" y="178" text-anchor="middle">300</text>',
  '</svg>',
  '<div class="fico-pill" data-fico-pill>GOOD &bull; 670&ndash;739</div>',
  '<div class="fico-slider-wrap">',
  '<input class="fico-slider" data-fico-slider type="range" min="300" max="850" value="720" aria-label="Drag to preview credit score tiers">',
  '<span class="fico-prompt">Drag to preview score tiers</span>',
  '</div>',
  '</div>',
].join("\\n");

src = src.replace(oldBlock, newBlock);

// Inject the gauge styles + interactivity script right after the conversion card
// opening, so it only affects this page. We append a <style> + <script> block
// immediately before the gauge markup (already inlined above via newBlock).
// Add styles/script as a separate injected block right before the gauge div.
const styleScript = [
  '<style>',
  '.fico-gauge{width:100%;max-width:340px;margin:0 auto;display:flex;flex-direction:column;align-items:center;background:transparent}',
  '.fico-gauge-svg{display:block;width:100%;height:auto;overflow:visible}',
  '.fico-arc{transition:none}',
  '.fico-needle{transform-box:view-box;transform-origin:160px 185px;transition:transform .35s cubic-bezier(.34,1.2,.5,1)}',
  '.fico-num{font-family:"Noto Serif Display",Georgia,serif;font-size:34px;font-weight:700;fill:#001B3D;font-variant-numeric:tabular-nums;letter-spacing:.5px}',
  '.fico-range{font-family:Raleway,Arial,sans-serif;font-size:11px;font-weight:600;fill:#8a8f98;letter-spacing:.08em}',
  '.fico-ticks line{stroke:#cfc8bb;stroke-width:1.5}',
  '.fico-pill{margin-top:6px;display:inline-block;padding:6px 16px;border-radius:999px;font-family:Raleway,Arial,sans-serif;font-size:12px;font-weight:800;letter-spacing:.14em;color:#fff;background:#10B981;transition:background .25s ease}',
  '.fico-slider-wrap{margin-top:14px;width:100%;max-width:300px;display:flex;flex-direction:column;align-items:center;gap:6px}',
  '.fico-slider{-webkit-appearance:none;appearance:none;width:100%;height:6px;border-radius:999px;background:linear-gradient(90deg,#DC2626,#F59E0B 28%,#10B981 55%,#059669);outline:none;cursor:pointer}',
  '.fico-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:20px;height:20px;border-radius:50%;background:#001B3D;border:3px solid #D6B783;box-shadow:0 2px 6px rgba(0,0,0,.25);cursor:pointer}',
  '.fico-slider::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:#001B3D;border:3px solid #D6B783;box-shadow:0 2px 6px rgba(0,0,0,.25);cursor:pointer}',
  '.fico-prompt{font-family:Raleway,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:.06em;color:#8a8f98}',
  '@media (prefers-reduced-motion:reduce){.fico-needle{transition:none}}',
  '</style>',
].join("\\n");

// Insert style block immediately before the gauge container.
src = src.replace('<div class="fico-gauge" data-fico-gauge>', styleScript + '<div class="fico-gauge" data-fico-gauge>');

writeFileSync(file, src, "utf8");
console.log("Gauge replaced successfully.");
console.log("Remaining old gauge refs:", (src.match(/dra-gauge/g) || []).length);
console.log("New fico-gauge refs:", (src.match(/fico-gauge/g) || []).length);
