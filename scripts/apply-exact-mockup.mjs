import { readFileSync, writeFileSync } from "node:fs";

const file = "src/content/dra-pages.ts";
let src = readFileSync(file, "utf8");

// Locate the style tag right before dra-conv-grid
const convStyleAnchor = "<style>\\n.dra-conv-grid{";
const styleIdx = src.indexOf(convStyleAnchor);
if (styleIdx === -1) {
  console.error("conv style not found");
  process.exit(1);
}

// Locate the end of the section right after dra-conv-grid
const tailAnchor = "\\n  </div>\\n</section>";
const tailIdx = src.indexOf(tailAnchor, styleIdx);
if (tailIdx === -1) {
  console.error("tail anchor not found");
  process.exit(1);
}

const replacementCSSAndHTML = `<style>
.dra-conv-wrapper{max-width:1160px;margin:32px auto 0;padding:0 20px;box-sizing:border-box}
.dra-conv-card-frame{background:#F7F4EE;border:1px solid #E5DEC9;border-radius:18px;padding:44px 40px;box-shadow:0 4px 20px rgba(0,27,61,.04);box-sizing:border-box}
.dra-conv-cols{display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;align-items:stretch}
.dra-conv-col{display:flex;flex-direction:column;box-sizing:border-box}
.dra-conv-col--left{padding-right:36px;border-right:1px solid #E5DEC9}
.dra-conv-col--mid{padding:0 36px;border-right:1px solid #E5DEC9}
.dra-conv-col--right{padding-left:36px;align-items:center;text-align:center}
.dra-conv-col-eyebrow{font-family:Raleway,Arial,sans-serif;font-size:11.5px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#B89758;margin:0 0 20px}
.dra-conv-col-title{font-family:"Noto Serif Display",Georgia,serif;font-size:26px;font-weight:700;color:#001B3D;margin:0 0 10px;line-height:1.2}
.dra-conv-col-sub{font-family:Raleway,Arial,sans-serif;font-size:16px;font-weight:600;color:#001B3D;margin:0 0 20px}
.dra-conv-col-price-row{display:flex;align-items:baseline;gap:6px;margin:0 0 16px}
.dra-conv-col-price{font-family:"Noto Serif Display",Georgia,serif;font-size:46px;font-weight:700;color:#001B3D;line-height:1}
.dra-conv-col-unit{font-family:Raleway,Arial,sans-serif;font-size:15px;font-weight:500;color:#6b7280}
.dra-conv-col-desc{font-family:Raleway,Arial,sans-serif;font-size:13.5px;line-height:1.55;color:#4B5563;margin:0 0 24px;min-height:42px}
.dra-conv-col-desc--mid{margin-bottom:auto}
.dra-conv-col-btn{display:block;width:100%;text-align:center;text-decoration:none;padding:15px 22px;border-radius:10px;font-family:Raleway,Arial,sans-serif;font-weight:700;font-size:14.5px;letter-spacing:.02em;margin-top:auto;box-sizing:border-box;transition:all .22s ease;border:none}
.dra-conv-col-btn--gold{background:#C89C51;color:#fff;box-shadow:0 2px 6px rgba(200,156,81,.25)}
.dra-conv-col-btn--gold:hover{background:#B0853C;color:#fff;transform:translateY(-1px)}
.dra-conv-col-btn--navy{background:#001B3D;color:#fff;box-shadow:0 2px 6px rgba(0,27,61,.2)}
.dra-conv-col-btn--navy:hover{background:#0A2A54;color:#fff;transform:translateY(-1px)}
.dra-conv-col-meta{font-family:Raleway,Arial,sans-serif;font-size:11.5px;color:#7A7365;margin:12px 0 0;text-align:left}

.fico-gauge{width:100%;max-width:240px;margin:0 auto;display:flex;flex-direction:column;align-items:center;background:transparent}
.fico-gauge-svg{display:block;width:100%;height:auto;overflow:visible}
.fico-arc{transition:none}
.fico-needle{transform-box:view-box;transform-origin:130px 130px;transition:transform .35s cubic-bezier(.34,1.2,.5,1)}
.fico-num{font-family:"Noto Serif Display",Georgia,serif;font-size:36px;font-weight:700;fill:#001B3D;font-variant-numeric:tabular-nums;letter-spacing:.5px}
.fico-sublabel{font-family:Raleway,Arial,sans-serif;font-size:9.5px;font-weight:800;letter-spacing:.16em;fill:#6B7280}
.fico-pill{margin-top:14px;display:inline-block;padding:7px 22px;border-radius:999px;font-family:Raleway,Arial,sans-serif;font-size:12px;font-weight:800;letter-spacing:.12em;color:#fff;background:#1E7E55;box-shadow:0 2px 8px rgba(30,126,85,.25);transition:background .25s ease}
.fico-slider-wrap{margin-top:16px;width:100%;max-width:220px;display:flex;flex-direction:column;align-items:center;gap:6px}
.fico-slider-track-preview{position:relative;width:100%;height:10px;border-radius:999px;background:linear-gradient(to right, #DC2626 0%, #EA580C 25%, #EAB308 50%, #84CC16 75%, #15803D 100%);margin-bottom:-10px}
.fico-slider{-webkit-appearance:none;appearance:none;width:100%;height:10px;border-radius:999px;background:transparent;outline:none;cursor:pointer;position:relative;z-index:2;margin:0}
.fico-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:16px;height:22px;border-radius:999px;background:#F7F4EE;border:2.5px solid #001B3D;box-shadow:0 1px 4px rgba(0,0,0,.25);cursor:pointer}
.fico-slider::-moz-range-thumb{width:16px;height:22px;border-radius:999px;background:#F7F4EE;border:2.5px solid #001B3D;box-shadow:0 1px 4px rgba(0,0,0,.25);cursor:pointer}
.fico-prompt{font-family:Raleway,Arial,sans-serif;font-size:11px;font-weight:500;letter-spacing:.02em;color:#6B7280;margin-top:6px}
@media (prefers-reduced-motion:reduce){.fico-needle{transition:none}}
@media (max-width:960px){
  .dra-conv-card-frame{padding:32px 24px}
  .dra-conv-cols{grid-template-columns:1fr;gap:36px}
  .dra-conv-col--left,.dra-conv-col--mid{padding:0 0 32px 0;border-right:none;border-bottom:1px solid #E5DEC9}
  .dra-conv-col--right{padding-left:0}
}
</style>

<div class="dra-conv-wrapper">
  <div class="dra-conv-card-frame">
    <div class="dra-conv-cols">
      <!-- Col 1: Self-Guided -->
      <div class="dra-conv-col dra-conv-col--left">
        <div class="dra-conv-col-eyebrow">01 / SELF-GUIDED</div>
        <h3 class="dra-conv-col-title">Prefer to do it yourself?</h3>
        <div class="dra-conv-col-sub">DIY Credit Repair Kit</div>
        <div class="dra-conv-col-price-row">
          <span class="dra-conv-col-price">$77</span>
          <span class="dra-conv-col-unit">/ month</span>
        </div>
        <p class="dra-conv-col-desc">A guided, self-directed way to work through your credit-report review.</p>
        <a class="dra-conv-col-btn dra-conv-col-btn--gold" href="/credit-repair.html">Get Started with DIY</a>
        <div class="dra-conv-col-meta">Self-guided program &bull; $77 per month</div>
      </div>

      <!-- Col 2: Personalized Support -->
      <div class="dra-conv-col dra-conv-col--mid">
        <div class="dra-conv-col-eyebrow">02 / PERSONALIZED SUPPORT</div>
        <h3 class="dra-conv-col-title">Prefer hands-on support?</h3>
        <div class="dra-conv-col-sub">Full-Service Credit Restoration</div>
        <p class="dra-conv-col-desc dra-conv-col-desc--mid">Get guidance through a more personalized credit restoration process.</p>
        <a class="dra-conv-col-btn dra-conv-col-btn--navy" href="https://downrightausomewealth.com/cro-8784">Explore Full-Service Options</a>
        <div class="dra-conv-col-meta">A more supported path &bull; Explore services</div>
      </div>

      <!-- Col 3: Credit Score Simulator -->
      <div class="dra-conv-col dra-conv-col--right">
        <div class="dra-conv-col-eyebrow">CREDIT SCORE SIMULATOR</div>
        <div class="fico-gauge" data-fico-gauge>
          <svg class="fico-gauge-svg" viewBox="0 0 260 160" width="260" height="160" aria-hidden="true">
            <defs>
              <linearGradient id="draArcSim" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#DC2626"/>
                <stop offset="25%" stop-color="#EA580C"/>
                <stop offset="50%" stop-color="#EAB308"/>
                <stop offset="75%" stop-color="#84CC16"/>
                <stop offset="100%" stop-color="#15803D"/>
              </linearGradient>
            </defs>
            <path class="fico-track" d="M30 130 A100 100 0 0 1 230 130" fill="none" stroke="#E5DEC9" stroke-width="16" stroke-linecap="round"/>
            <path class="fico-arc" d="M30 130 A100 100 0 0 1 230 130" fill="none" stroke="url(#draArcSim)" stroke-width="14" stroke-linecap="round"/>
            <g class="fico-needle" data-fico-needle>
              <line x1="130" y1="130" x2="130" y2="52" stroke="#001B3D" stroke-width="3.5" stroke-linecap="round"/>
              <polygon points="127,56 133,56 130,46" fill="#001B3D"/>
              <circle cx="130" cy="130" r="9" fill="#001B3D"/>
              <circle cx="130" cy="130" r="4" fill="#C89C51"/>
            </g>
            <text class="fico-num" data-fico-num x="130" y="96" text-anchor="middle">720</text>
            <text class="fico-sublabel" x="130" y="112" text-anchor="middle">ILLUSTRATIVE SCORE</text>
          </svg>
          <div class="fico-pill" data-fico-pill>GOOD &bull; 670-739</div>
          <div class="fico-slider-wrap">
            <div class="fico-slider-track-preview"></div>
            <input class="fico-slider" data-fico-slider type="range" min="300" max="850" value="720" aria-label="Drag to preview score tiers">
            <span class="fico-prompt">Drag to preview score tiers</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

src = src.slice(0, styleIdx) + replacementCSSAndHTML + src.slice(tailIdx);
writeFileSync(file, src, "utf8");
console.log("Mockup design applied successfully!");
