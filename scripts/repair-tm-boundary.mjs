// Repair the over-escaped tax-mentorship html string boundaries.
// The escape script turned  html: '....'  into  html: \\'....\\'  which broke
// the JS string. Fix ONLY the boundary quotes: \\' -> ' at the open and close.
import fs from "node:fs";

const FILE = "src/content/dra-pages.ts";
let s = fs.readFileSync(FILE, "utf8");

const marker = '"tax-mentorship":';
const startIdx = s.indexOf(marker);
if (startIdx === -1) throw new Error("tax-mentorship entry not found");

// The opening boundary:  html: \\'   ->  html: '
const openPat = "html: \\'";
const openIdx = s.indexOf(openPat, startIdx);
if (openIdx === -1) throw new Error("over-escaped open not found");
s = s.slice(0, openIdx) + "html: '" + s.slice(openIdx + openPat.length);

// The closing boundary:  \\',\n  },\n  "interior-review"  ->  ',\n  },\n  "interior-review"
const closePat = "\\'";
const closeMarker = "\\'" + ",\n  },\n  \"interior-review\"";
const closeIdx = s.indexOf(closeMarker, openIdx);
if (closeIdx === -1) throw new Error("over-escaped close not found");
s = s.slice(0, closeIdx) + "',\n  },\n  \"interior-review\":" + s.slice(closeIdx + closeMarker.length);

fs.writeFileSync(FILE, s);

// Verify the boundaries are now correct.
const after = s.indexOf(marker);
const o = s.indexOf("html: '", after);
console.log("open html: ' at", o, "->", s.slice(o, o + 9));
const c = s.indexOf("',\n  },\n  \"interior-review\"", after);
console.log("close at", c, "->", s.slice(c, c + 30));
