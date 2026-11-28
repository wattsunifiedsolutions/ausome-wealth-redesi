import { readFileSync, writeFileSync } from "fs";

const path = "src/content/dra-pages.ts";
let src = readFileSync(path, "utf8");

// The tax-waitlist html value is a single-quoted JS string but contains
// unescaped single quotes inside CSS url('...') and content:''.
// Replace those single quotes with escaped \' so the string stays intact.
const before = src;

// Escape the background url() single quotes.
src = src.replace(
  /background:url\('https:\/\/vibe\.filesafe\.space\/[^']+'\)/,
  (m) => m.replace(/'/g, "\\'"),
);

// Escape the content:'' single quotes (wl-hero::before overlay).
src = src.replace(/content:''/, "content:\\''");

if (src === before) {
  console.error("No replacements made — patterns not found.");
  process.exit(1);
}

writeFileSync(path, src);
console.log("done. escaped unescaped single quotes in tax-waitlist html.");
