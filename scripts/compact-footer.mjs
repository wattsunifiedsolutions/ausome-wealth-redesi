import { readFileSync, writeFileSync } from "fs";

const path = "src/content/dra-pages.ts";
let src = readFileSync(path, "utf8");

// Compact the footer-compact spacing across all pages.
// Reduce vertical padding, margins between subsections, and gaps.

const replacements = [
  // Outer padding: 28px 20px 24px -> 16px 20px 14px
  [
    ".footer-compact{background:var(--navy);color:#fff;padding:28px 20px 24px;font-size:13px;text-align:left}",
    ".footer-compact{background:var(--navy);color:#fff;padding:16px 20px 14px;font-size:13px;text-align:left}",
  ],
  // Contact margin-bottom: 16px -> 8px; gap 8px 32px -> 6px 24px
  [
    ".footer-compact .footer-contact{display:flex;flex-wrap:wrap;justify-content:flex-start;gap:8px 32px;margin:0 0 16px;font-size:14px}",
    ".footer-compact .footer-contact{display:flex;flex-wrap:wrap;justify-content:flex-start;gap:6px 24px;margin:0 0 8px;font-size:13px}",
  ],
  // Social margin-bottom: 16px -> 8px; gap 28px -> 20px
  [
    ".footer-compact .footer-social{display:flex;justify-content:flex-start;gap:28px;margin:0 0 16px}",
    ".footer-compact .footer-social{display:flex;justify-content:flex-start;gap:20px;margin:0 0 8px}",
  ],
  // Legal margin-bottom: 12px -> 6px; padding-top: 16px -> 8px
  [
    ".footer-compact .footer-legal{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px 24px;margin:0 0 12px;padding-top:16px;border-top:1px solid rgba(255,255,255,.15);font-size:12px;color:rgba(255,255,255,.8)}",
    ".footer-compact .footer-legal{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:6px 20px;margin:0 0 6px;padding-top:8px;border-top:1px solid rgba(255,255,255,.15);font-size:11px;color:rgba(255,255,255,.8)}",
  ],
  // Legal links gap 24px -> 18px
  [
    ".footer-compact .footer-legal-links{display:flex;gap:24px}",
    ".footer-compact .footer-legal-links{display:flex;gap:18px}",
  ],
];

let count = 0;
for (const [from, to] of replacements) {
  const before = src.split(from).length - 1;
  if (before > 0) {
    src = src.split(from).join(to);
    count += before;
  }
}

writeFileSync(path, src);

const after = readFileSync(path, "utf8");
console.log("replacements made:", count);
console.log("old 28px padding refs:", (after.match(/padding:28px 20px 24px/g) || []).length);
console.log("new compact padding refs:", (after.match(/padding:16px 20px 14px/g) || []).length);
console.log("old 16px contact margin refs:", (after.match(/margin:0 0 16px;font-size:14px/g) || []).length);
console.log("old 28px social gap refs:", (after.match(/gap:28px;margin:0 0 16px/g) || []).length);