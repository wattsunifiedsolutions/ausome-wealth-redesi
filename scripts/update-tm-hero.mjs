// Re-apply hero image swap + gradient removal now that quotes are escaped.
import fs from "node:fs";

const FILE = "src/content/dra-pages.ts";
let s = fs.readFileSync(FILE, "utf8");

const NEW_IMG =
  "https://vibe.filesafe.space/1795100135767119492/assets/4d457572-f145-4958-81ae-31c66cf2287b.png";

// 1) Replace hero background image with the new luxury executive corridor.
const beforeImg = (s.match(/c86251cb-93fd-4de6-ad23-f6b9dc7df173/g) || []).length;
s = s.replace(
  /c86251cb-93fd-4de6-ad23-f6b9dc7df173/g,
  "4d457572-f145-4958-81ae-31c66cf2287b",
);

// 2) Remove gold gradient on primary button -> solid champagne gold.
s = s.replace(
  /background:\s*linear-gradient\(135deg,\s*#E6CA92 0%,\s*#D6B783 50%,\s*#B89657 100%\)/g,
  "background: #D6B783",
);
// Remove gradient on path number bubble.
s = s.replace(
  /background:\s*linear-gradient\(135deg,\s*#E6CA92 0%,\s*#D6B783 100%\)/g,
  "background: #D6B783",
);

// 3) Remove radial gradient on CTA section -> solid deep navy.
s = s.replace(
  /background:\s*radial-gradient\(circle at 50% 50%,\s*#06234D 0%,\s*#001B3D 100%\)/g,
  "background: #001B3D",
);

// 4) Remove glow box-shadows on primary button.
s = s.replace(
  /box-shadow:\s*0 6px 20px rgba\(214,\s*183,\s*131,\s*0\.35\);/g,
  "box-shadow: none;",
);
s = s.replace(
  /box-shadow:\s*0 10px 28px rgba\(214,\s*183,\s*131,\s*0\.45\);/g,
  "box-shadow: none;",
);

fs.writeFileSync(FILE, s);

console.log("old img removed:", beforeImg);
console.log("new img refs:", (s.match(/4d457572-f145-4958-81ae-31c66cf2287b/g) || []).length);
console.log("old img refs:", (s.match(/c86251cb-93fd-4de6-ad23-f6b9dc7df173/g) || []).length);
console.log("linear-gradient #E6CA92:", (s.match(/linear-gradient\(135deg,#E6CA92/g) || []).length);
console.log("radial-gradient:", (s.match(/radial-gradient\(circle at 50% 50%/g) || []).length);
