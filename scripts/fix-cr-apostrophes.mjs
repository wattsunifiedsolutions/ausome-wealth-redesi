import { readFileSync, writeFileSync } from "fs";

const filePath = "/app/src/content/dra-pages.ts";
let content = readFileSync(filePath, "utf8");

const crStart = content.indexOf('"credit-resources": {');
const htmlIdx = content.indexOf("html: '", crStart);
const strStart = htmlIdx + "html: '".length;

// Find the real end: the closing ' that precedes ,\n    css:
const cssMarker = "',\n    css:";
const cssIdx = content.indexOf(cssMarker, strStart);
const strEnd = cssIdx + 1; // include closing quote

let strContent = content.substring(strStart, strEnd);

// Replace bare apostrophes (used in contractions like won't, Let's) with
// the HTML entity &rsquo; — typographically correct and avoids escaping.
// We only target apostrophes that are NOT already escaped (\' ) and NOT
// part of an HTML entity. A bare ' inside this HTML string is always a
// contraction apostrophe since the string delimiters are the opening and
// closing quotes.
strContent = strContent.replace(/(?<!\\)'/g, "&rsquo;");

content = content.substring(0, strStart) + strContent + content.substring(strEnd);

writeFileSync(filePath, content, "utf8");

// Verify: count remaining unescaped single quotes
const verify = content.substring(strStart, strStart + strContent.length);
const remaining = (verify.match(/(?<!\\)'/g) || []).length;
console.log("Remaining unescaped single quotes:", remaining);
console.log("Fixed apostrophes in credit-resources html string.");
