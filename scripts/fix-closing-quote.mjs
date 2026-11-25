import { readFileSync, writeFileSync } from "fs";

const filePath = "/app/src/content/dra-pages.ts";
let content = readFileSync(filePath, "utf8");

// The credit-resources html string ends with &rsquo;,\n    css: — the closing
// single quote was wrongly converted to &rsquo;. Restore it to '.
const broken = "footer>&rsquo;,\n    css:";
const fixed = "footer>',\n    css:";

if (!content.includes(broken)) {
  console.error("Pattern not found — already fixed or different state");
  process.exit(1);
}

content = content.replace(broken, fixed);
writeFileSync(filePath, content, "utf8");
console.log("Restored closing quote of credit-resources html string.");
