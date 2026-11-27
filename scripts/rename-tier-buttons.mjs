import fs from "node:fs";

const FILE = "src/content/dra-pages.ts";
let s = fs.readFileSync(FILE, "utf8");

// Build the regex from parts to avoid any entity decoding of "&".
const amp = String.fromCharCode(38) + "amp;"; // "&"
const arrow = String.fromCharCode(38) + "rarr;"; // "&rarr;"
const re = new RegExp("View Tier [0-9]+ " + amp + " Enroll " + arrow, "g");

let c = 0;
const newLabel = "View Package Details " + arrow;
s = s.replace(re, () => { c++; return newLabel; });

fs.writeFileSync(FILE, s);
console.log("replaced", c);
