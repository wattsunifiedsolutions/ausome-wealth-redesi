import fs from "node:fs";

const FILE = "src/content/dra-pages.ts";
let s = fs.readFileSync(FILE, "utf8");

// The tax-mentorship html value got broken: real newlines and real single-quotes
// were inserted into a single-quoted TS string. Re-encode the whole value.
const startKey = '"tax-mentorship":';
const i = s.indexOf(startKey);
const j = s.indexOf('"interior-review":', i);

// Find html: ' ... ' within the block. The opening is `html: '` and the value
// currently contains raw newlines. We rebuild by locating the closing `',`
// that precedes the next property key (css). The block structure is:
//   html: '...',
//   css: "...",
// We find `css: "` after the html opening and take everything between.
const block = s.slice(i, j);
const htmlOpen = block.indexOf("html: '") + "html: '".length;
const cssMarker = block.indexOf("css: \"", htmlOpen);
// The html value ends with `'` right before `,\n    css:` — back up over whitespace/comma.
const rawHtml = block.slice(htmlOpen, cssMarker);
// rawHtml currently ends with something like `',\n    ` — strip trailing `',` and ws.
const closingIdx = rawHtml.lastIndexOf("'");
const htmlContent = rawHtml.slice(0, closingIdx); // the inner content (with raw newlines/quotes)

// Re-escape: backslash-escape any real single-quote and real newline.
const escaped = htmlContent
  .replace(/\\/g, "\\\\")
  .replace(/'/g, "\\'")
  .replace(/\r?\n/g, "\\n");

const newBlock = block.slice(0, block.indexOf("html: '")) + "html: '" + escaped + "',\n    " + block.slice(cssMarker);

s = s.slice(0, i) + newBlock + s.slice(j);

fs.writeFileSync(FILE, s);
console.log("rebuilt html value, escaped length", escaped.length);
