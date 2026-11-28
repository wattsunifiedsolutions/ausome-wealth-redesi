import fs from "node:fs";

const FILE = "src/content/dra-pages.ts";
let content = fs.readFileSync(FILE, "utf8");

const tmStart = content.indexOf('"tax-mentorship":');
if (tmStart === -1) {
  console.error("Could not find tax-mentorship");
  process.exit(1);
}

const nextKey = content.indexOf('"interior-review":', tmStart);
const tmBlock = content.substring(tmStart, nextKey);

// Find <section class="tm-hero"> ... </section>
const heroOpen = tmBlock.indexOf('<section class="tm-hero">');
const heroClose = tmBlock.indexOf('</section>', heroOpen) + '</section>'.length;

const oldHeroHtml = tmBlock.substring(heroOpen, heroClose);
console.log("Found old hero HTML of length:", oldHeroHtml.length);

