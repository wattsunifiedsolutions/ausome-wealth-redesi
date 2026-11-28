import { readFileSync, writeFileSync } from "fs";

const path = "src/content/dra-pages.ts";
let src = readFileSync(path, "utf8");
const before = src;

// Fix tax-waitlist line: background:url('...') -> url(\'...\') and content:'' -> content:\'\'
// The html value is a single-quoted JS string, so every inner single quote must be
// backslash-escaped. My previous run escaped only the first quote of each pair.

// Re-escape the url() pair if it reverted to unescaped form.
src = src.replace(
  /background:url\('https:\/\/vibe\.filesafe\.space\/[^']+'\)/,
  (m) => m.replace(/'/g, "\\'"),
);

// content:'' inside CSS -> content:\'\'  (both quotes escaped)
src = src.replace(/content:''/, "content:\\'\\'");

if (src === before) {
  console.log("no changes needed (already escaped).");
} else {
  writeFileSync(path, src);
  console.log("done. escaped inner single quotes in tax-waitlist html.");
}
