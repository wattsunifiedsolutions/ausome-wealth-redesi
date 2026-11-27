// The file literally contains the 3-byte sequence  \ \ '  (two backslashes
// then a single quote) inside the tax-mentorship html value. We need the
// 2-byte sequence  \ '  (one backslash then quote) so the JS string parses.
import fs from "node:fs";

const FILE = "src/content/dra-pages.ts";
let s = fs.readFileSync(FILE, "utf8");

const marker = '"tax-mentorship":';
const startIdx = s.indexOf(marker);
const openPat = "html: '";
const openIdx = s.indexOf(openPat, startIdx) + openPat.length;
const closeMarker = "',\n  },\n  \"interior-review\"";
const closeIdx = s.indexOf(closeMarker, openIdx);

const before = s.slice(0, openIdx);
const value = s.slice(openIdx, closeIdx);
const after = s.slice(closeIdx);

// In the file bytes, the bad sequence is: backslash backslash quote.
// Replace it with: backslash quote.
const bad = "\\\\'"; // JS string for backslash-backslash-quote = 3 bytes \ \ '
const good = "\\'"; // JS string for backslash-quote = 2 bytes \ '
const fixed = value.split(bad).join(good);
const count = value.split(bad).length - 1;

s = before + fixed + after;
fs.writeFileSync(FILE, s);

console.log("bad sequences replaced:", count);
console.log("sample:", fixed.slice(90, 120));
