import { readFileSync, writeFileSync } from "fs";

const path = "src/content/dra-pages.ts";
let src = readFileSync(path, "utf8");

const JOT = "https://form.jotform.com/drawtaxgroup/2027VIPWAITLIST";

// 1) Hero button on /tax-waitlist.html: scroll-to-form -> direct jotform link (new tab)
src = src.replace(
  '<a class="wl-hero-btn" href="#waitlist-form">Join the VIP Waitlist &rarr;</a>',
  `<a class="wl-hero-btn" href="${JOT}" target="_blank" rel="noopener">Join the VIP Waitlist &rarr;</a>`
);

// 2) Homepage service card pointing to the waitlist page -> direct jotform link
src = src.replace(
  '<a class="service-row" href="/tax-waitlist.html">',
  `<a class="service-row" href="${JOT}" target="_blank" rel="noopener">`
);

// 3) Any other "Join the 2027 VIP Waitlist" buttons pointing to the waitlist page
src = src.split('href="/tax-waitlist.html"').join(`href="${JOT}" target="_blank" rel="noopener"`);

writeFileSync(path, src);

// verify
const after = readFileSync(path, "utf8");
console.log("jotform hrefs:", (after.match(new RegExp(JOT.replace(/[.]/g, "\\."), "g")) || []).length);
console.log("waitlist-form scroll hrefs:", (after.match(/href="#waitlist-form"/g) || []).length);
console.log("/tax-waitlist.html hrefs:", (after.match(/href="\/tax-waitlist\.html"/g) || []).length);
