import { readFileSync, writeFileSync } from "node:fs";

const file = "src/content/dra-pages.ts";
let src = readFileSync(file, "utf8");
const N = "\\n";

const replacements = [
  // main cr-options CSS block -> compact icon strip CSS (single line, \n joined)
  {
    old: [
      ".cr-page .cr-options{padding:32px 0 37px;background:var(--cr-ivory);color:var(--cr-navy);border-top:1px solid #A99369}",
      ".cr-options h2{font-size:clamp(34px,4vw,48px);line-height:1;margin-bottom:22px}",
      ".cr-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-block:1px solid #A99369}",
      ".cr-option{display:grid;grid-template-rows:auto auto 1fr auto;align-items:start;gap:8px;padding:18px 19px 14px;transition:background-color .25s ease}",
      ".cr-option:first-child{padding-left:0}",
      ".cr-option+.cr-option{border-left:1px solid #A99369}",
      ".cr-option:hover,.cr-option:focus-within{background:rgba(169,147,105,0.12)}",
      ".cr-path-number{color:#A99369;font:600 22px/1 Montserrat,Arial,sans-serif;padding-bottom:4px}",
      ".cr-option h3{font-size:clamp(23px,2.25vw,31px);line-height:1}",
      ".cr-option p{font-size:13px;line-height:1.55}",
      ".cr-option .cr-link{color:#001B3D;justify-self:start}",
    ].join(N),
    new: [
      ".cr-page .cr-options{padding:0;background:var(--cr-ivory);color:var(--cr-navy);border-top:1px solid #A99369}",
      ".cr-strip{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-block:1px solid #A99369}",
      ".cr-strip-item{display:flex;align-items:center;gap:13px;padding:15px 18px;text-decoration:none;color:var(--cr-navy);transition:background-color .25s ease}",
      ".cr-strip-item+.cr-strip-item{border-left:1px solid #A99369}",
      ".cr-strip-item:hover,.cr-strip-item:focus-visible{background:rgba(169,147,105,0.12)}",
      ".cr-strip-item:focus-visible{outline:2px solid #A99369;outline-offset:-2px}",
      ".cr-icon{flex:0 0 auto;width:30px;height:30px;color:var(--cr-gold)}",
      ".cr-icon svg{display:block;width:100%;height:100%}",
      ".cr-strip-text{display:block;font:600 13.5px/1.3 Montserrat,Arial,sans-serif;letter-spacing:.01em}",
      ".cr-strip-text strong{display:block;font-weight:700}",
      ".cr-strip-text small{display:block;font:400 12px/1.4 Montserrat,Arial,sans-serif;color:#5b5547;margin-top:2px}",
    ].join(N),
  },
  // 900px responsive
  {
    old: ".cr-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.cr-option:nth-child(3){border-left:0;padding-left:0}.cr-option:nth-child(n+3){border-top:1px solid #A99369}",
    new: ".cr-strip{grid-template-columns:repeat(2,minmax(0,1fr))}.cr-strip-item:nth-child(3){border-left:0;padding-left:0}.cr-strip-item:nth-child(n+3){border-top:1px solid #A99369}",
  },
  // 600px responsive
  {
    old: ".cr-grid{grid-template-columns:minmax(0,1fr)}.cr-option,.cr-option+.cr-option{padding:12px 0;border-left:0;grid-template-columns:34px minmax(0,1fr);grid-template-rows:auto auto auto;column-gap:12px;row-gap:4px}.cr-option+.cr-option{border-top:1px solid #A99369}.cr-option .cr-path-number{grid-row:1/4;font-size:18px;padding-top:2px}.cr-option h3,.cr-option p{grid-column:2}.cr-option .cr-link{grid-column:2}",
    new: ".cr-strip{grid-template-columns:minmax(0,1fr)}.cr-strip-item,.cr-strip-item+.cr-strip-item{padding:14px 0;border-left:0}.cr-strip-item+.cr-strip-item{border-top:1px solid #A99369}",
  },
  // reduced-motion dead selector
  {
    old: ".cr-options{scroll-margin-top:16px}.cr-option{transition:background-color .25s ease}",
    new: ".cr-options{scroll-margin-top:16px}.cr-strip-item{transition:background-color .25s ease}",
  },
  // HTML block
  {
    old: [
      '<section class="cr-options" id="credit-pathways" aria-labelledby="credit-options"><div class="cr-shell">',
      '<h2 id="credit-options">Credit Services</h2><div class="cr-grid">',
      '<article class="cr-option"><span class="cr-path-number" aria-hidden="true">01</span><h3>Full-Service Credit Restoration</h3><p>Professional support to review your credit and address potential inaccuracies.</p><a class="cr-link" href="https://downrightausomewealth.com/cro-8784">Explore Full-Service Restoration <span aria-hidden="true">→</span></a></article>',
      '<article class="cr-option"><span class="cr-path-number" aria-hidden="true">02</span><h3>DIY Credit Repair</h3><p>Review your credit reports at your own pace with guided tools.</p><a class="cr-link" href="/credit-repair.html">Explore the DIY Program <span aria-hidden="true">→</span></a></article>',
      '<article class="cr-option"><span class="cr-path-number" aria-hidden="true">03</span><h3>Homebuyer Credit Readiness</h3><p>Get guidance on preparing your credit before buying a home.</p><a class="cr-link" href="/book-an-appointment.html">Book a Blueprint Review <span aria-hidden="true">→</span></a></article>',
      '<article class="cr-option"><span class="cr-path-number" aria-hidden="true">04</span><h3>Credit Guides & Workbooks</h3><p>Find e-books and workbooks to build your credit knowledge.</p><a class="cr-link" href="/resources.html">Browse the Resource Shop <span aria-hidden="true">→</span></a></article>',
      "</div></div></section>",
    ].join(N),
    new: [
      '<section class="cr-options" id="credit-pathways" aria-label="Credit services"><div class="cr-shell">',
      '<div class="cr-strip">',
      '<a class="cr-strip-item" href="https://downrightausomewealth.com/cro-8784"><span class="cr-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg></span><span class="cr-strip-text"><strong>Full-Service Credit Restoration</strong><small>Professional support to review your credit.</small></span></a>',
      '<a class="cr-strip-item" href="/credit-repair.html"><span class="cr-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></span><span class="cr-strip-text"><strong>DIY Credit Repair</strong><small>Guided tools to review reports yourself.</small></span></a>',
      '<a class="cr-strip-item" href="/book-an-appointment.html"><span class="cr-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></span><span class="cr-strip-text"><strong>Homebuyer Credit Readiness</strong><small>Prepare your credit before buying.</small></span></a>',
      '<a class="cr-strip-item" href="/resources.html"><span class="cr-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg></span><span class="cr-strip-text"><strong>Credit Guides & Workbooks</strong><small>E-books and workbooks to build knowledge.</small></span></a>',
      "</div></div></section>",
    ].join(N),
  },
];

for (const r of replacements) {
  if (!src.includes(r.old)) {
    console.error("NOT FOUND:\n" + r.old.slice(0, 140));
    process.exit(1);
  }
  src = src.replace(r.old, r.new);
}

writeFileSync(file, src, "utf8");
console.log("OK — all replacements applied");
