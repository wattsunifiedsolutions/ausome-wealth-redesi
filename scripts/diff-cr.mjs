import { readFileSync, writeFileSync } from "node:fs";

const file = "src/content/dra-pages.ts";
let src = readFileSync(file, "utf8");
const N = "\\n";
const ARROW = "→";

const old = [
  '<section class="cr-options" id="credit-pathways" aria-labelledby="credit-options"><div class="cr-shell">',
  '<h2 id="credit-options">Credit Services</h2><div class="cr-grid">',
  `<article class="cr-option"><span class="cr-path-number" aria-hidden="true">01</span><h3>Full-Service Credit Restoration</h3><p>Professional support to review your credit and address potential inaccuracies.</p><a class="cr-link" href="https://downrightausomewealth.com/cro-8784">Explore Full-Service Restoration <span aria-hidden="true">${ARROW}</span></a></article>`,
  `<article class="cr-option"><span class="cr-path-number" aria-hidden="true">02</span><h3>DIY Credit Repair</h3><p>Review your credit reports at your own pace with guided tools.</p><a class="cr-link" href="/credit-repair.html">Explore the DIY Program <span aria-hidden="true">${ARROW}</span></a></article>`,
  `<article class="cr-option"><span class="cr-path-number" aria-hidden="true">03</span><h3>Homebuyer Credit Readiness</h3><p>Get guidance on preparing your credit before buying a home.</p><a class="cr-link" href="/book-an-appointment.html">Book a Blueprint Review <span aria-hidden="true">${ARROW}</span></a></article>`,
  `<article class="cr-option"><span class="cr-path-number" aria-hidden="true">04</span><h3>Credit Guides & Workbooks</h3><p>Find e-books and workbooks to build your credit knowledge.</p><a class="cr-link" href="/resources.html">Browse the Resource Shop <span aria-hidden="true">${ARROW}</span></a></article>`,
  "</div></div></section>",
].join(N);

writeFileSync("/tmp/old-block.txt", old, "utf8");

// Extract the actual block from source
const start = src.indexOf('<section class="cr-options"');
const end = src.indexOf("</section>", start) + "</section>".length;
const actual = src.slice(start, end);
writeFileSync("/tmp/actual-block.txt", actual, "utf8");
console.log("old len:", old.length, "actual len:", actual.length);
console.log("equal:", old === actual);
