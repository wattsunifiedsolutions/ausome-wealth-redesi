// Fix the tax-mentorship html string: it is single-quoted but contains bare
// apostrophes (font-family: 'Noto Serif Display', 'Raleway', etc.) which
// terminate the JS string and break the build. Escape every ' inside the
// tax-mentorship html value to \'.
import fs from "node:fs";

const FILE = "src/content/dra-pages.ts";
let s = fs.readFileSync(FILE, "utf8");

// Match the tax-mentorship html: '....' value (single-quoted), non-greedy to
// the closing ',\n  },\n  "interior-review".
const marker = '"tax-mentorship":';
const startIdx = s.indexOf(marker);
if (startIdx === -1) throw new Error("tax-mentorship entry not found");

// Find html: ' after the marker
const htmlKey = s.indexOf("html: '", startIdx);
if (htmlKey === -1) throw new Error("html key not found");
const valueStart = htmlKey + "html: '".length;

// Find the closing ' that ends this value: it is followed by ,\n  },\n
const closeMarker = "',\n  },\n  \"interior-review\"";
const closeIdx = s.indexOf(closeMarker, valueStart);
if (closeIdx === -1) throw new Error("closing quote not found");

const before = s.slice(0, valueStart);
const value = s.slice(valueStart, closeIdx);
const after = s.slice(closeIdx);

// Escape every single quote in the value.
const fixed = value.replace(/'/g, "\\'");

s = before + fixed + after;
fs.writeFileSync(FILE, s);

console.log("escaped apostrophes:", (value.match(/'/g) || []).length);
console.log("remaining bare ' in value:", (fixed.match(/(?<!\\)'/g) || []).length);
