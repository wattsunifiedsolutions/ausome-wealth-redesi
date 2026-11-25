import { readFileSync, writeFileSync } from "fs";
const f = "/app/src/content/dra-pages.ts";
let c = readFileSync(f, "utf8");

// 1) CSS: add micro-animation rules right after the needle-group rule.
const cssOld = `.dra-conv-needle-group{transform:rotate(47.45deg)}\\n.dra-swoosh{position:absolute;pointer-events:none;line-height:0;z-index:0}`;
const cssNew = `.dra-conv-needle-group{transform:rotate(47.45deg);transform-origin:160px 148px;transition:transform .42s cubic-bezier(.22,.68,0,1)}\\n.dra-conv-needle-group.dra-needle-bounce{animation:draNeedleBounce .42s cubic-bezier(.22,.68,0,1)}\\n@keyframes draNeedleBounce{0%{transform:rotate(var(--dra-needle-deg,47.45deg)) scale(1)}55%{transform:rotate(var(--dra-needle-deg,47.45deg)) scale(1.06)}100%{transform:rotate(var(--dra-needle-deg,47.45deg)) scale(1)}}\\n.dra-conv-gauge-svg text[data-fico-num]{transition:fill .3s ease}\\n.dra-conv-gauge-svg text[data-fico-num].dra-num-pop{animation:draNumPop .5s cubic-bezier(.22,.68,0,1);transform-origin:160px 134px}\\n@keyframes draNumPop{0%{transform:scale(1)}45%{transform:scale(1.14)}100%{transform:scale(1)}}\\n.dra-conv-score-pill{transition:background-color .3s ease,color .3s ease,box-shadow .3s ease,transform .3s ease}\\n.dra-conv-score-pill.dra-pill-pop{animation:draPillPop .5s cubic-bezier(.22,.68,0,1)}\\n@keyframes draPillPop{0%{transform:scale(1)}45%{transform:scale(1.08)}100%{transform:scale(1)}}\\n.dra-conv-range-input{transition:box-shadow .25s ease}\\n.dra-conv-range-input:focus-visible{box-shadow:0 0 0 4px rgba(214,183,131,.35)}\\n.dra-conv-range-input::-webkit-slider-thumb{transition:transform .2s ease,box-shadow .25s ease}\\n.dra-conv-range-input::-moz-range-thumb{transition:transform .2s ease,box-shadow .25s ease}\\n.dra-conv-range-input.dra-slider-active::-webkit-slider-thumb{box-shadow:0 0 0 5px rgba(214,183,131,.4);transform:scale(1.18)}\\n.dra-conv-range-input.dra-slider-active::-moz-range-thumb{box-shadow:0 0 0 5px rgba(214,183,131,.4);transform:scale(1.18)}\\n.dra-swoosh{position:absolute;pointer-events:none;line-height:0;z-index:0}`;

if (!c.includes(cssOld)) { console.error("CSS PATTERN NOT FOUND"); process.exit(1); }
c = c.replace(cssOld, cssNew);

writeFileSync(f, c, "utf8");
console.log("Gauge micro-animation CSS added.");
