import { readFileSync } from "fs";

const c = readFileSync("/app/src/content/dra-pages.ts", "utf8");

// The parse error is at offset 201993: "Expected , or } but found Identifier"
// This means the JS parser thinks the credit-resources object's html string
// ended early, and it hit an identifier where it expected , or }
// That happens when there's an unescaped single quote inside the string.

const crStart = c.indexOf('"credit-resources": {');
const htmlIdx = c.indexOf("html: '", crStart);
const strStart = htmlIdx + "html: '".length;

// Find the FIRST single quote that is NOT a backslash-escaped \'
// We scan from strStart looking for ' that is not preceded by backslash
let i = strStart;
let found = [];
while (i < c.length) {
  if (c[i] === "'" && c[i - 1] !== "\\") {
    found.push(i);
    break;
  }
  i++;
}

if (found.length > 0) {
  const pos = found[0];
  console.log("First unescaped single quote at offset:", pos);
  console.log("Context:", JSON.stringify(c.substring(pos - 60, pos + 60)));
} else {
  console.log("No unescaped single quote found via simple scan");
}

// Also: the error offset 201993 — what character is there?
console.log("\nChar at 201993:", JSON.stringify(c[201993]));
console.log("Context at 201993:", JSON.stringify(c.substring(201990, 202010)));

// Let's also check: does the string contain a literal ' that isn't \'
// by looking at the raw bytes. The issue might be an apostrophe in text
// like "won't" or "Let's" that was a real ' not &rsquo;
// Let's search for common patterns
const patterns = ["won't", "Let's", "don't", "can't", "It's", "you won", "regret"];
patterns.forEach((p) => {
  const idx = c.indexOf(p, strStart);
  if (idx !== -1) {
    console.log(`\nFound "${p}" at offset ${idx}:`, JSON.stringify(c.substring(idx - 20, idx + 30)));
  }
});
