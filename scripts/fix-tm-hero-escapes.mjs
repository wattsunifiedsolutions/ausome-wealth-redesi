import fs from "node:fs";

const FILE = "src/content/dra-pages.ts";
let s = fs.readFileSync(FILE, "utf8");

// --- 1. Fix the hero CSS block (real newlines -> \n escapes) ---
const cssStart = s.indexOf(".tm-hero {");
const cssEnd = s.indexOf(".tm-section-header {", cssStart);
if (cssStart === -1 || cssEnd === -1) {
  console.error("hero CSS block not found");
  process.exit(1);
}
const cssBlock = s.slice(cssStart, cssEnd);
const cssEscaped = cssBlock
  .replace(/\\/g, "\\\\")
  .replace(/\r?\n/g, "\\n")
  .replace(/'/g, "\\'");
s = s.slice(0, cssStart) + cssEscaped + s.slice(cssEnd);
console.log("css fixed, length", cssEscaped.length);

// --- 2. Fix the hero HTML markup ---
// Locate by the unique headline text, then expand to the surrounding <section>...</section>
const headlineIdx = s.indexOf("Tax Mentorship &<span");
if (headlineIdx === -1) {
  console.error("hero headline not found");
  process.exit(1);
}
const secStart = s.lastIndexOf("<section", headlineIdx);
let secEnd = s.indexOf("</section>", headlineIdx);
if (secStart === -1 || secEnd === -1) {
  console.error("hero section boundaries not found");
  process.exit(1);
}
secEnd += "</section>".length;
const heroHtml = s.slice(secStart, secEnd);
const heroEscaped = heroHtml
  .replace(/\\/g, "\\\\")
  .replace(/\r?\n/g, "\\n")
  .replace(/'/g, "\\'");
s = s.slice(0, secStart) + heroEscaped + s.slice(secEnd);
console.log("html fixed, length", heroEscaped.length);

fs.writeFileSync(FILE, s);
console.log("done");
