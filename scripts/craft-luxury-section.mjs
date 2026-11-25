import { readFileSync, writeFileSync } from "node:fs";

const file = "src/content/dra-pages.ts";
let content = readFileSync(file, "utf8");

const pStart = content.indexOf("<style>.dra-exact-banner-wrap");
if (pStart === -1) {
  console.error("pStart not found");
  process.exit(1);
}

const pResume = content.indexOf('id=\\"closing\\">', pStart);
if (pResume === -1) {
  console.error("pResume not found");
  process.exit(1);
}
const pSectionStart = content.lastIndexOf('<section class=\\"band-ivory\\"', pResume);
if (pSectionStart === -1) {
  console.error("pSectionStart not found");
  process.exit(1);
}

const luxuryBg = "https://vibe.filesafe.space/1795100135767119492/attachments/6a7be10a-b2f5-4f1f-86be-4f82f464c0ff.png";

// Scoped CSS
const cssRules = [
  ".dra-lux-sec{position:relative;max-width:1180px;margin:36px auto 16px;padding:0 16px;box-sizing:border-box}",
  ".dra-lux-card{position:relative;background:#F8F3EA url(\\'" + luxuryBg + "\\') no-repeat center center / cover;border:2px solid #DDB86C;border-radius:28px;padding:48px 36px 42px;box-shadow:0 16px 44px rgba(0,27,61,.12),0 2px 8px rgba(214,183,131,.3),inset 0 1px 0 rgba(255,255,255,.9);overflow:hidden;box-sizing:border-box}",
  ".dra-lux-grid{display:grid;grid-template-columns:1fr 52px 1.15fr 40px 1.35fr;align-items:center;position:relative;z-index:2}",
  ".dra-lux-col1{display:flex;flex-direction:column;align-items:center;text-align:center;padding:8px 12px}",
  ".dra-lux-icon-box{width:56px;height:50px;margin-bottom:14px;display:flex;align-items:center;justify-content:center;filter:drop-shadow(0 4px 10px rgba(184,151,88,.35))}",
  ".dra-lux-icon-box svg{width:100%;height:100%}",
  ".dra-lux-col-title{font-family:\\'Noto Serif Display\\',Georgia,serif;font-size:27px;font-weight:700;line-height:1.24;color:#001B3D;margin:0 0 22px;letter-spacing:-.01em}",
  ".dra-lux-btn-gold{display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;max-width:240px;padding:14px 22px;border-radius:999px;background:linear-gradient(180deg,#F5D38A 0%,#D8A74D 48%,#BE882E 100%);color:#001B3D;font-family:Raleway,Montserrat,sans-serif;font-size:15px;font-weight:800;letter-spacing:.02em;text-decoration:none;box-shadow:0 6px 18px rgba(184,143,62,.42),inset 0 1px 1px rgba(255,255,255,.8),inset 0 -2px 2px rgba(120,80,16,.3);border:1px solid #FFE7B3;transition:transform .2s ease,box-shadow .2s ease,filter .2s ease;box-sizing:border-box}",
  ".dra-lux-btn-gold:hover{transform:translateY(-2px);filter:brightness(1.05);box-shadow:0 10px 24px rgba(184,143,62,.52)}",
  ".dra-lux-or-wrap{display:flex;align-items:center;justify-content:center}",
  ".dra-lux-or-badge{width:44px;height:44px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#FFFFFF,#FAF3E6);border:1.5px solid #D6B783;display:flex;align-items:center;justify-content:center;font-family:Raleway,Montserrat,sans-serif;font-size:13px;font-weight:800;color:#001B3D;letter-spacing:.08em;box-shadow:0 4px 12px rgba(0,27,61,.08)}",
  ".dra-lux-col2{display:flex;flex-direction:column;align-items:center;text-align:center;padding:8px 12px}",
  ".dra-lux-laurel-badge{display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:14px}",
  ".dra-lux-card-icon{width:38px;height:24px;background:linear-gradient(135deg,#DEBA74,#AA7D2E);border-radius:4px;position:relative;box-shadow:0 3px 8px rgba(154,114,42,.4);border:1px solid #FFE7B5}",
  ".dra-lux-laurel{color:#CFA655;font-size:24px;line-height:1;user-select:none}",
  ".dra-lux-btn-navy{display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;max-width:320px;padding:14px 22px;border-radius:999px;background:linear-gradient(180deg,#0A264F 0%,#001B3D 60%,#00132B 100%);color:#FFFFFF;font-family:Raleway,Montserrat,sans-serif;font-size:14px;font-weight:800;letter-spacing:.02em;text-decoration:none;box-shadow:0 6px 18px rgba(0,27,61,.35),inset 0 1px 1px rgba(255,255,255,.35),0 0 0 1.5px #D4AF67;border:1px solid #EAC87E;transition:transform .2s ease,box-shadow .2s ease,filter .2s ease;box-sizing:border-box}",
  ".dra-lux-btn-navy:hover{transform:translateY(-2px);filter:brightness(1.08);box-shadow:0 10px 24px rgba(0,27,61,.45),0 0 0 2px #F3D288}",
  ".dra-lux-vsep{width:1px;height:240px;background:linear-gradient(180deg,transparent,rgba(206,172,107,.45) 20%,rgba(206,172,107,.45) 80%,transparent);margin:0 auto}",
  ".dra-lux-col3{display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 4px}",
  ".dra-lux-gauge-panel{width:100%;max-width:350px;margin:0 auto;display:flex;flex-direction:column;align-items:center}",
  ".dra-lux-gauge-stage{position:relative;width:100%;max-width:320px}",
  ".dra-lux-gauge-svg{display:block;width:100%;height:auto;overflow:visible}",
  ".dra-lux-needle{transform-origin:165px 158px;transform-box:view-box;transition:transform .35s cubic-bezier(.34,1.25,.5,1)}",
  ".dra-lux-score-pill{margin-top:6px;display:inline-block;padding:6px 24px;border-radius:999px;background:#00875A;color:#FFFFFF;font-family:Raleway,Montserrat,sans-serif;font-size:13px;font-weight:800;letter-spacing:.1em;box-shadow:0 3px 10px rgba(0,135,90,.32);transition:background .25s ease}",
  ".dra-lux-slider-wrap{width:100%;max-width:280px;margin-top:14px;display:flex;flex-direction:column;align-items:center}",
  ".dra-lux-slider-track{position:relative;width:100%;height:14px;border-radius:999px;background:linear-gradient(90deg,#DC2626 0%,#EA580C 20%,#EAB308 45%,#84CC16 70%,#059669 100%);border:1px solid rgba(255,255,255,.85);box-shadow:inset 0 1px 3px rgba(0,0,0,.25),0 2px 6px rgba(0,27,61,.08);display:flex;align-items:center}",
  ".dra-lux-range-input{-webkit-appearance:none;appearance:none;position:absolute;inset:0;width:100%;height:100%;background:transparent;outline:none;cursor:pointer;margin:0;z-index:2}",
  ".dra-lux-range-input::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:24px;height:24px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#153258,#001B3D);border:2.5px solid #EAC87E;box-shadow:0 3px 8px rgba(0,27,61,.45);cursor:pointer}",
  ".dra-lux-range-input::-moz-range-thumb{width:24px;height:24px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#153258,#001B3D);border:2.5px solid #EAC87E;box-shadow:0 3px 8px rgba(0,27,61,.45);cursor:pointer}",
  ".dra-lux-hint{font-family:Raleway,Montserrat,sans-serif;font-size:11.5px;font-style:italic;font-weight:600;color:#4B5563;margin-top:6px;letter-spacing:.02em}",
  ".dra-lux-stat-bar{display:grid;grid-template-columns:1fr 1fr 1fr;align-items:center;width:100%;max-width:280px;margin-top:12px;padding:8px 12px;border-radius:12px;background:rgba(255,255,255,.75);border:1px solid rgba(214,183,131,.4);box-shadow:0 2px 8px rgba(0,27,61,.04);box-sizing:border-box}",
  ".dra-lux-stat-item{display:flex;align-items:center;justify-content:center;gap:5px;font-family:Raleway,Montserrat,sans-serif;font-size:11px;font-weight:700;color:#001B3D;white-space:nowrap}",
  ".dra-lux-stat-item:not(:last-child){border-right:1px solid rgba(206,172,107,.35)}",
  ".dra-lux-stat-item svg{width:13px;height:13px;color:#B88E3E;flex-shrink:0}",
  "@media (max-width:1024px){.dra-lux-card{padding:36px 20px}.dra-lux-grid{grid-template-columns:1fr 36px 1fr;gap:24px 0}.dra-lux-vsep{display:none}.dra-lux-col3{grid-column:1 / -1;margin-top:16px;padding-top:24px;border-top:1px solid rgba(206,172,107,.35)}}",
  "@media (max-width:640px){.dra-lux-card{padding:28px 14px;border-radius:20px}.dra-lux-grid{grid-template-columns:1fr;gap:24px}.dra-lux-or-wrap{display:none}.dra-lux-col-title{font-size:23px}}"
].join("");

const htmlContent = [
  "<style>" + cssRules + "</style>",
  "<div class=\\\"dra-lux-sec\\\">",
  "<div class=\\\"dra-lux-card\\\">",
  "<div class=\\\"dra-lux-grid\\\">",
  "<div class=\\\"dra-lux-col1\\\">",
  "<div class=\\\"dra-lux-icon-box\\\" aria-hidden=\\\"true\\\">",
  "<svg viewBox=\\\"0 0 60 52\\\" fill=\\\"none\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\"><path d=\\\"M30 4L54 16V36L30 48L6 36V16L30 4Z\\\" fill=\\\"#FBF6ED\\\" stroke=\\\"#C49B4C\\\" stroke-width=\\\"2.5\\\" stroke-linejoin=\\\"round\\\"/><path d=\\\"M6 16L30 28L54 16\\\" stroke=\\\"#C49B4C\\\" stroke-width=\\\"2.5\\\" stroke-linejoin=\\\"round\\\"/><path d=\\\"M30 28V48\\\" stroke=\\\"#C49B4C\\\" stroke-width=\\\"2.5\\\"/><rect x=\\\"22\\\" y=\\\"22\\\" width=\\\"16\\\" height=\\\"10\\\" rx=\\\"2\\\" fill=\\\"#DEB666\\\" stroke=\\\"#001B3D\\\" stroke-width=\\\"1.5\\\"/><line x1=\\\"22\\\" y1=\\\"25\\\" x2=\\\"38\\\" y2=\\\"25\\\" stroke=\\\"#001B3D\\\" stroke-width=\\\"1.5\\\"/></svg>",
  "</div>",
  "<h3 class=\\\"dra-lux-col-title\\\">Start DIY Kit for<br>$77/Mo</h3>",
  "<a class=\\\"dra-lux-btn-gold\\\" href=\\\"/credit-repair.html\\\">Get Started Now <span aria-hidden=\\\"true\\\">&rsaquo;</span></a>",
  "</div>",
  "<div class=\\\"dra-lux-or-wrap\\\"><div class=\\\"dra-lux-or-badge\\\">OR</div></div>",
  "<div class=\\\"dra-lux-col2\\\">",
  "<div class=\\\"dra-lux-laurel-badge\\\" aria-hidden=\\\"true\\\"><span class=\\\"dra-lux-laurel\\\">&#10086;</span><div class=\\\"dra-lux-card-icon\\\"></div><span class=\\\"dra-lux-laurel\\\">&#10087;</span></div>",
  "<h3 class=\\\"dra-lux-col-title\\\">Prefer We Handle<br>It All For You?</h3>",
  "<a class=\\\"dra-lux-btn-navy\\\" href=\\\"https://downrightausomewealth.com/cro-8784\\\">I Will Pay More To Have It Done For Me <span aria-hidden=\\\"true\\\">&rsaquo;</span></a>",
  "</div>",
  "<div class=\\\"dra-lux-vsep\\\"></div>",
  "<div class=\\\"dra-lux-col3\\\">",
  "<div class=\\\"dra-lux-gauge-panel\\\" data-fico-gauge>",
  "<div class=\\\"dra-lux-gauge-stage\\\">",
  "<svg class=\\\"dra-lux-gauge-svg\\\" viewBox=\\\"0 0 330 210\\\" width=\\\"330\\\" height=\\\"210\\\" aria-hidden=\\\"true\\\">",
  "<defs>",
  "<linearGradient id=\\\"draRainbowArc\\\" x1=\\\"0\\\" y1=\\\"0\\\" x2=\\\"1\\\" y2=\\\"0\\\">",
  "<stop offset=\\\"0%\\\" stop-color=\\\"#DC2626\\\"/>",
  "<stop offset=\\\"18%\\\" stop-color=\\\"#EA580C\\\"/>",
  "<stop offset=\\\"38%\\\" stop-color=\\\"#F59E0B\\\"/>",
  "<stop offset=\\\"60%\\\" stop-color=\\\"#84CC16\\\"/>",
  "<stop offset=\\\"82%\\\" stop-color=\\\"#10B981\\\"/>",
  "<stop offset=\\\"100%\\\" stop-color=\\\"#047857\\\"/>",
  "</linearGradient>",
  "<filter id=\\\"gaugeShadow\\\" x=\\\"-10%\\\" y=\\\"-10%\\\" width=\\\"120%\\\" height=\\\"120%\\\">",
  "<feDropShadow dx=\\\"0\\\" dy=\\\"3\\\" stdDeviation=\\\"4\\\" flood-color=\\\"#001B3D\\\" flood-opacity=\\\"0.15\\\"/>",
  "</filter>",
  "</defs>",
  "<g stroke=\\\"#BCA474\\\" stroke-width=\\\"1.5\\\" stroke-linecap=\\\"round\\\">",
  "<line x1=\\\"50\\\" y1=\\\"158\\\" x2=\\\"40\\\" y2=\\\"158\\\"/>",
  "<line x1=\\\"56\\\" y1=\\\"128\\\" x2=\\\"47\\\" y2=\\\"124\\\"/>",
  "<line x1=\\\"75\\\" y1=\\\"100\\\" x2=\\\"68\\\" y2=\\\"93\\\"/>",
  "<line x1=\\\"102\\\" y1=\\\"78\\\" x2=\\\"97\\\" y2=\\\"70\\\"/>",
  "<line x1=\\\"134\\\" y1=\\\"65\\\" x2=\\\"132\\\" y2=\\\"55\\\"/>",
  "<line x1=\\\"165\\\" y1=\\\"60\\\" x2=\\\"165\\\" y2=\\\"50\\\"/>",
  "<line x1=\\\"196\\\" y1=\\\"65\\\" x2=\\\"198\\\" y2=\\\"55\\\"/>",
  "<line x1=\\\"228\\\" y1=\\\"78\\\" x2=\\\"233\\\" y2=\\\"70\\\"/>",
  "<line x1=\\\"255\\\" y1=\\\"100\\\" x2=\\\"262\\\" y2=\\\"93\\\"/>",
  "<line x1=\\\"274\\\" y1=\\\"128\\\" x2=\\\"283\\\" y2=\\\"124\\\"/>",
  "<line x1=\\\"280\\\" y1=\\\"158\\\" x2=\\\"290\\\" y2=\\\"158\\\"/>",
  "</g>",
  "<path d=\\\"M 54 158 A 111 111 0 0 1 276 158\\\" fill=\\\"none\\\" stroke=\\\"#F3ECE0\\\" stroke-width=\\\"20\\\" stroke-linecap=\\\"round\\\"/>",
  "<path d=\\\"M 54 158 A 111 111 0 0 1 276 158\\\" fill=\\\"none\\\" stroke=\\\"url(#draRainbowArc)\\\" stroke-width=\\\"18\\\" stroke-linecap=\\\"round\\\" filter=\\\"url(#gaugeShadow)\\\"/>",
  "<text x=\\\"165\\\" y=\\\"104\\\" text-anchor=\\\"middle\\\" font-family=\\\"Raleway, Montserrat, sans-serif\\\" font-size=\\\"10.5\\\" font-weight=\\\"800\\\" letter-spacing=\\\"0.16em\\\" fill=\\\"#001B3D\\\">CREDIT SCORE</text>",
  "<text x=\\\"165\\\" y=\\\"142\\\" text-anchor=\\\"middle\\\" font-family=\\'Noto Serif Display\\', Georgia, serif font-size=\\\"40\\\" font-weight=\\\"700\\\" fill=\\\"#001B3D\\\" data-fico-num>720</text>",
  "<text x=\\\"165\\\" y=\\\"158\\\" text-anchor=\\\"middle\\\" font-family=\\\"Raleway, Montserrat, sans-serif\\\" font-size=\\\"9.5\\\" font-weight=\\\"700\\\" letter-spacing=\\\"0.06em\\\" fill=\\\"#5A6578\\\">300 – 850</text>",
  "<g class=\\\"dra-lux-needle\\\" data-fico-needle>",
  "<line x1=\\\"165\\\" y1=\\\"158\\\" x2=\\\"232\\\" y2=\\\"86\\\" stroke=\\\"#001B3D\\\" stroke-width=\\\"4\\\" stroke-linecap=\\\"round\\\"/>",
  "<circle cx=\\\"165\\\" cy=\\\"158\\\" r=\\\"10\\\" fill=\\\"#001B3D\\\"/>",
  "<circle cx=\\\"165\\\" cy=\\\"158\\\" r=\\\"5.5\\\" fill=\\\"#EAC87E\\\"/>",
  "<circle cx=\\\"165\\\" cy=\\\"158\\\" r=\\\"2.5\\\" fill=\\\"#001B3D\\\"/>",
  "</g>",
  "</svg>",
  "</div>",
  "<div class=\\\"dra-lux-score-pill\\\" data-fico-pill>GOOD &bull; 670–739</div>",
  "<div class=\\\"dra-lux-slider-wrap\\\">",
  "<div class=\\\"dra-lux-slider-track\\\">",
  "<input class=\\\"dra-lux-range-input\\\" data-fico-slider type=\\\"range\\\" min=\\\"300\\\" max=\\\"850\\\" value=\\\"720\\\" aria-label=\\\"Drag to preview credit score tiers\\\">",
  "</div>",
  "<span class=\\\"dra-lux-hint\\\">Drag to preview score tiers</span>",
  "</div>",
  "<div class=\\\"dra-lux-stat-bar\\\">",
  "<div class=\\\"dra-lux-stat-item\\\">",
  "<svg viewBox=\\\"0 0 24 24\\\" fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-width=\\\"2.5\\\"><path d=\\\"M18 20V10M12 20V4M6 20v-6\\\"/></svg>",
  "<span>Score: <b data-fico-stat-score>720</b></span>",
  "</div>",
  "<div class=\\\"dra-lux-stat-item\\\">",
  "<svg viewBox=\\\"0 0 24 24\\\" fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-width=\\\"2.5\\\"><path d=\\\"m2 12 10 5 10-5M2 17l10 5 10-5M12 2 2 7l10 5 10-5-10-5Z\\\"/></svg>",
  "<span>Tier: <b data-fico-stat-tier>Good</b></span>",
  "</div>",
  "<div class=\\\"dra-lux-stat-item\\\">",
  "<svg viewBox=\\\"0 0 24 24\\\" fill=\\\"none\\\" stroke=\\\"currentColor\\\" stroke-width=\\\"2.5\\\"><path d=\\\"M7 17 17 7M7 7h10v10\\\"/></svg>",
  "<span>Range: 300–850</span>",
  "</div>",
  "</div>",
  "</div>",
  "</div>",
  "</div>",
  "</div>",
  "</div>\\n  </div>\\n</section>\\n\\n"
].join("");

content = content.slice(0, pStart) + htmlContent + content.slice(pSectionStart);
writeFileSync(file, content, "utf8");
console.log("Successfully replaced banner with exact luxury interactive section!");
