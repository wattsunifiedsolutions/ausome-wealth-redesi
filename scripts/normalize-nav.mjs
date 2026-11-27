// Normalize the DRA header across every page:
//  - one uniform .brand img size (72px) so the logo is consistent and legible
//  - fix the 2 pages whose header markup has escaped quotes (rendered broken)
import fs from "node:fs";

const FILE = "src/content/dra-pages.ts";
let s = fs.readFileSync(FILE, "utf8");

// 1) Uniform logo size across all inline styles.
s = s.replace(
  /\.brand img\{[^}]*\}/g,
  ".brand img{height:72px;width:auto;display:block;border-radius:0;box-shadow:none;background:transparent}",
);

// 2) Fix escaped quotes inside the 2 broken header markup strings.
s = s.replace(/<header class=\\"dra-header\\">/g, '<header class="dra-header">');
s = s.replace(/<div class=\\"dra-header-inner\\">/g, '<div class="dra-header-inner">');
s = s.replace(/<a class=\\"brand\\"/g, '<a class="brand"');
s = s.replace(/<nav aria-label=\\"Main navigation\\">/g, '<nav aria-label="Main navigation">');
s = s.split('<\\/nav><\\/div><\\/header>').join('</nav></div></header>');

fs.writeFileSync(FILE, s);

console.log("brand img rules:", (s.match(/\.brand img\{[^}]*\}/g) || []).length);
console.log("escaped headers remaining:", (s.match(/\\"dra-header/g) || []).length);
console.log("total headers:", (s.match(/<header class="dra-header">/g) || []).length);
