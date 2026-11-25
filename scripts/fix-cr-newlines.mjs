import { readFileSync, writeFileSync } from "fs";

const filePath = "/app/src/content/dra-pages.ts";
let content = readFileSync(filePath, "utf8");

const startMarker = '"credit-resources": {';
const crStart = content.indexOf(startMarker);
if (crStart === -1) { console.error("Could not find credit-resources"); process.exit(1); }

const htmlIdx = content.indexOf("html: '", crStart);
if (htmlIdx === -1) { console.error("Could not find html start"); process.exit(1); }

const strStart = htmlIdx + "html: '".length;

const cssMarker = "',\n    css:";
const cssIdx = content.indexOf(cssMarker, strStart);
if (cssIdx === -1) { console.error("Could not find css marker"); process.exit(1); }

const strEnd = cssIdx + 1; // include the closing quote

let strContent = content.substring(strStart, strEnd);

const rawNewlines = (strContent.match(/\n/g) || []).length;
console.log(`Found ${rawNewlines} raw newlines in the credit-resources html string`);

// Replace each raw newline (plus any trailing indentation) with the escape sequence \n
let fixed = strContent.replace(/\n\s*/g, "\\n");

content = content.substring(0, strStart) + fixed + content.substring(strEnd);

writeFileSync(filePath, content, "utf8");
console.log("Fixed! File written.");
