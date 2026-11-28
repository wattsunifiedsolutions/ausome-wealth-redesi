import { readFileSync, writeFileSync } from "fs";

const path = "src/content/dra-pages.ts";
let src = readFileSync(path, "utf8");

// 1. Add the full-service secondary button under the DIY package button.
const btnMarker =
  '<a class="diy-btn" href="https://diy.downrightausomewealth.com/payment" target="_blank" rel="noopener">Get Started Now <span aria-hidden="true">→</span></a></div>';
if (!src.includes(btnMarker)) throw new Error("package button marker not found");
src = src.replace(
  btnMarker,
  '<a class="diy-btn" href="https://diy.downrightausomewealth.com/payment" target="_blank" rel="noopener">Get Started Now <span aria-hidden="true">→</span></a>\\n<a class="diy-btn diy-btn-ghost" style="margin-top:14px" href="/full-service-credit-repair.html">I Will Pay More To Have It Done For Me <span aria-hidden="true">→</span></a></div>',
);

// 2. Add the original "Credit Repair Services for your Business" three-card
// section (original copy, DRA brand styling) after the What We Do section.
const sectionMarker = '\\n<section class="diy-section ivory">';
if (!src.includes(sectionMarker)) throw new Error("section marker not found");

const svcSection = `\\n<section class="diy-section diy-svc-band"><div class="diy-wrap"><div class="diy-section-head diy-svc-head"><h2>Credit Repair Services for Your Business.</h2></div><div class="diy-svc-grid">\\n<article class="diy-svc-card"><span class="diy-svc-icon" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none" stroke-linecap="round" stroke-linejoin="round"><defs><linearGradient id="draSvcGold1" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stop-color="#F1DCAE"/><stop offset=".55" stop-color="#D6B783"/><stop offset="1" stop-color="#A99369"/></linearGradient></defs><rect x="6" y="12" width="36" height="26" rx="4" fill="url(#draSvcGold1)" fill-opacity=".16" stroke="url(#draSvcGold1)" stroke-width="2"/><path d="M6 20h36" stroke="url(#draSvcGold1)" stroke-width="2"/><path d="m14 31 3 3 5-6" stroke="#001B3D" stroke-width="2.4"/><path d="M27 30h9" stroke="url(#draSvcGold1)" stroke-width="2"/></svg></span><h3>Credit Repair</h3><p>By law, information reported about you to credit bureaus must be fair, accurate, relevant, substantiated and verifiable. Our 3-step process will help you get a better credit score.</p></article>\\n<article class="diy-svc-card"><span class="diy-svc-icon" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none" stroke-linecap="round" stroke-linejoin="round"><defs><linearGradient id="draSvcGold2" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stop-color="#F1DCAE"/><stop offset=".55" stop-color="#D6B783"/><stop offset="1" stop-color="#A99369"/></linearGradient></defs><rect x="10" y="6" width="28" height="38" rx="3" fill="url(#draSvcGold2)" fill-opacity=".16" stroke="url(#draSvcGold2)" stroke-width="2"/><path d="M17 14h14M17 21h14" stroke="url(#draSvcGold2)" stroke-width="2"/><path d="m20 31 3 3 6-7" stroke="#001B3D" stroke-width="2.4"/><circle cx="34" cy="36" r="8" fill="#001B3D"/><path d="m30 36 3 3 5-6" stroke="#D6B783" stroke-width="2.2"/></svg></span><h3>Credit Audit</h3><p>We deal with every credit issue, ranging from inquiries to charge-offs to bankruptcies and repossessions.</p></article>\\n<article class="diy-svc-card"><span class="diy-svc-icon" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none" stroke-linecap="round" stroke-linejoin="round"><defs><linearGradient id="draSvcGold3" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop stop-color="#F1DCAE"/><stop offset=".55" stop-color="#D6B783"/><stop offset="1" stop-color="#A99369"/></linearGradient></defs><circle cx="24" cy="17" r="9" fill="url(#draSvcGold3)" fill-opacity=".16" stroke="url(#draSvcGold3)" stroke-width="2"/><circle cx="24" cy="14" r="2.6" fill="url(#draSvcGold3)"/><path d="M24 18v3M20 25c1 4-1 8-5 12m9-12c1 4 1 8 0 13" stroke="url(#draSvcGold3)" stroke-width="2"/><path d="M14 40c4-2 8-2 10 0 2 2 6 2 10 0" stroke="url(#draSvcGold3)" stroke-width="2"/></svg></span><h3>Credit Coaching</h3><p>Our team of credit professionals will assist you in establishing and maintaining good credit for better improvement in your credit score.</p></article>\\n</div></div></section>`;

const first = src.indexOf(sectionMarker);
src = src.slice(0, first) + svcSection + src.slice(first);

// 3. Band styles for the new section (brand navy/gold/ivory).
const styleAnchor = ".diy-page img,.diy-page video{opacity:1!important";
if (!src.includes(styleAnchor)) throw new Error("style anchor not found");
src = src.replace(
  styleAnchor,
  `.diy-page .diy-svc-band{background:var(--ivory)}\n.diy-page .diy-svc-head{text-align:center;margin-inline:auto}\n.diy-page .diy-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}\n.diy-page .diy-svc-card{background:#fff;border:1px solid #E3DCCB;border-top:3px solid var(--gold);border-radius:10px;padding:30px 26px 34px;display:flex;flex-direction:column;align-items:flex-start}\n.diy-page .diy-svc-card h3{margin:0 0 10px}\n.diy-page .diy-svc-card p{font-size:.93rem;color:#5A6470;margin:0}\n.diy-page .diy-svc-icon{display:block;width:46px;height:46px;margin-bottom:18px}\n.diy-page .diy-svc-icon svg{display:block;width:100%;height:100%}\n@media(max-width:850px){.diy-page .diy-svc-grid{grid-template-columns:1fr}}\n.diy-page .diy-program .diy-btn-ghost{margin-top:14px}\n.diy-page img,.diy-page video{opacity:1!important`,
);

writeFileSync(path, src);
console.log("credit-repair page updated OK");
