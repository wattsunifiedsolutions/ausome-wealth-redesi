import fs from "node:fs";

const FILE = "src/content/dra-pages.ts";
let s = fs.readFileSync(FILE, "utf8");

// The tax-mentorship html value is DOUBLE-quoted and contains two regions
// where a previous script injected CSS with REAL newlines, breaking the
// string. We re-escape real newlines -> \n and real double quotes -> \"
// inside the double-quoted html value.

const tmKey = '"tax-mentorship": {';
const tmStart = s.indexOf(tmKey);
if (tmStart === -1) { console.error("tax-mentorship key not found"); process.exit(1); }

// html value starts with: html: "<style>\n.tm-page {
const htmlMarker = 'html: "<style>\\n.tm-page {';
const htmlStart = s.indexOf(htmlMarker, tmStart);
if (htmlStart === -1) { console.error("tax-mentorship html open not found"); process.exit(1); }
const valueTextStart = htmlStart + 'html: "'.length;

// The value ends at the closing double quote followed by ,\n    css:
const closeMarker = '",\n    css:';
const valueEnd = s.indexOf(closeMarker, valueTextStart);
if (valueEnd === -1) { console.error("tax-mentorship html close not found"); process.exit(1); }

const raw = s.slice(valueTextStart, valueEnd);

// Re-escape: real newlines -> \n, real CR -> \r, bare double quote -> \"
// Existing \n escapes are backslash+n (2 chars), not 0x0A, so this is safe.
let fixed = raw
  .replace(/\r\n/g, "\n")
  .replace(/\n/g, "\\n")
  .replace(/\r/g, "\\r")
  .replace(/"/g, '\\"');

s = s.slice(0, valueTextStart) + fixed + s.slice(valueEnd);
fs.writeFileSync(FILE, s);
console.log("repaired: raw", raw.length, "-> fixed", fixed.length);