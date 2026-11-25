import { readFileSync, writeFileSync } from "fs";
const f = "/app/src/content/dra-pages.ts";
let c = readFileSync(f, "utf8");
const old = ".cr-hero-copy{position:absolute;left:0;top:0;bottom:0;width:44%;max-width:560px;display:flex;flex-direction:column;justify-content:center;padding:40px 24px 40px 48px}";
const neu = ".cr-hero-copy{position:absolute;left:0;top:0;bottom:0;width:44%;max-width:560px;display:flex;flex-direction:column;justify-content:flex-start;padding:56px 24px 40px 48px}";
if (!c.includes(old)) { console.error("PATTERN NOT FOUND"); process.exit(1); }
c = c.replace(old, neu);
writeFileSync(f, c, "utf8");
console.log("Moved hero copy to top-aligned (justify-content:flex-start, top padding 56px).");
