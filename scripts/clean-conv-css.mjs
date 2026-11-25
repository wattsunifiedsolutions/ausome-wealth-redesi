import { readFileSync, writeFileSync } from "node:fs";

const file = "src/content/dra-pages.ts";
let src = readFileSync(file, "utf8");

// Remove the orphaned diy-conversion-card CSS block. It starts at
// ".diy-conversion-card{" and ends right before the @media (max-width:820px)
// rule that targets .diy-steps-grid (which we keep).
const startAnchor = ".diy-conversion-card{";
const startIdx = src.indexOf(startAnchor);
if (startIdx === -1) {
  console.error("orphan CSS start not found");
  process.exit(1);
}
const endAnchor = "  @media (max-width: 820px){\\n    .diy-steps-grid{";
const endIdx = src.indexOf(endAnchor, startIdx);
if (endIdx === -1) {
  console.error("orphan CSS end not found");
  process.exit(1);
}

// Back up over the leading "\\n  " that precedes ".diy-conversion-card".
let cutStart = startIdx;
const back = src.lastIndexOf("\\n", startIdx);
if (back !== -1 && back >= startIdx - 6) cutStart = back;

src = src.slice(0, cutStart) + src.slice(endIdx);

writeFileSync(file, src, "utf8");
console.log("Orphaned diy-conv CSS removed.");
console.log("Remaining diy-conv refs:", (src.match(/diy-conversion-card|diy-conv-col|diy-conv-or-pill|diy-conv-gauge-col/g) || []).length);
console.log("dra-conv-grid refs:", (src.match(/dra-conv-grid/g) || []).length);
console.log("diy-steps-grid refs (kept):", (src.match(/diy-steps-grid/g) || []).length);
