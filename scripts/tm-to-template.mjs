// Convert the tax-mentorship html value from a single-quoted string to a
// template literal (backticks). This lets the bare apostrophes in the CSS
// (font-family: 'Noto Serif Display') stay unescaped, eliminating the parse
// errors. Also unescape any \' back to ' and ensure no backticks exist.
import fs from "node:fs";

const FILE = "src/content/dra-pages.ts";
let s = fs.readFileSync(FILE, "utf8");

const marker = '"tax-mentorship":';
const startIdx = s.indexOf(marker);

// Locate  html: '  (opening single quote)
const openPat = "html: '";
const openIdx = s.indexOf(openPat, startIdx);
const valueStart = openIdx + openPat.length; // index just after the opening '

// Locate the closing  ',\n  },\n  "interior-review"
const closeMarker = "',\n  },\n  \"interior-review\"";
const closeIdx = s.indexOf(closeMarker, valueStart);
const valueEnd = closeIdx; // index of the closing '

const before = s.slice(0, openIdx); // ...html: 
const value = s.slice(valueStart, valueEnd); // the raw value (with \' escapes)
const after = s.slice(closeIdx + 1); // ,\n  },\n  "interior-review":...  (skip the closing ')

// Unescape \' -> '  and ensure no backticks (would break template literal).
let fixed = value.split("\\'").join("'");
if (fixed.includes("`")) throw new Error("value contains a backtick — cannot use template literal");

// Rebuild:  html: `...value...`  (template literal)
s = before + "`" + fixed + "`" + after;
fs.writeFileSync(FILE, s);

console.log("converted to template literal");
console.log("open now:", s.slice(openIdx, openIdx + 10));
const newClose = s.indexOf("`" + ",\n  },\n  \"interior-review\"", openIdx);
console.log("close at", newClose, "->", s.slice(newClose, newClose + 25));
