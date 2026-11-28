import { readFileSync, writeFileSync } from "fs";

const path = "src/content/dra-pages.ts";
let src = readFileSync(path, "utf8");
const before = src;

// On the tax-waitlist line the html value is a single-quoted JS string.
// CSS `content:''` needs both inner quotes escaped -> content:\'\'
// In the file the broken form is content:\''  (first escaped, second NOT)
// We only operate on the tax-waitlist html line to avoid touching other pages
// whose html uses backticks / double quotes.

const lines = src.split("\n");
let fixed = 0;
for (let i = 0; i < lines.length; i++) {
  // tax-waitlist html line starts with:  html: '
  if (lines[i].startsWith("    html: '")) {
    // Escape the broken `content:\''` (escaped + literal) into `content:\'\'`
    const l = lines[i];
    // Replace content:\'' -> content:\'\'  (escape the second quote too)
    const fixedLine = l.split("content:\\''").join("content:\\'\\'");
    if (fixedLine !== l) {
      lines[i] = fixedLine;
      fixed++;
    }
  }
}

src = lines.join("\n");
if (fixed === 0) {
  console.log("no broken content:\\'' pattern found on html:' lines");
} else {
  writeFileSync(path, src);
  console.log("fixed", fixed, "line(s).");
}
