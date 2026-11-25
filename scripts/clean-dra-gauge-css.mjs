import { readFileSync, writeFileSync } from "node:fs";

const file = "src/content/dra-pages.ts";
let src = readFileSync(file, "utf8");

// Remove the orphaned dra-gauge style block. It starts at "<style>\n.dra-gauge{"
// and ends at the closing "</style>\n" that precedes our new fico-gauge style.
const startMarker = "<style>\\n.dra-gauge{";
const startIdx = src.indexOf(startMarker);
if (startIdx === -1) {
  console.error("Orphaned dra-gauge style start NOT found");
  process.exit(1);
}
// Find the closing </style> after the start marker.
const endTag = "</style>";
const endIdx = src.indexOf(endTag, startIdx);
if (endIdx === -1) {
  console.error("Orphaned dra-gauge style end NOT found");
  process.exit(1);
}
// Include the trailing escaped newline that follows </style>.
const cutEnd = endIdx + endTag.length + 2; // +2 for "\\n"
const before = src;
src = src.slice(0, startIdx) + src.slice(cutEnd);
if (src === before) {
  console.error("No change made");
  process.exit(1);
}

writeFileSync(file, src, "utf8");
console.log("Orphaned dra-gauge CSS removed.");
console.log("Remaining dra-gauge refs:", (src.match(/dra-gauge/g) || []).length);
console.log("fico-gauge refs:", (src.match(/fico-gauge/g) || []).length);
