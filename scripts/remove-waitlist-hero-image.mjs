import { readFileSync, writeFileSync } from "fs";

const path = "src/content/dra-pages.ts";
let src = readFileSync(path, "utf8");

// The file stores the CSS inside a single-quoted JS string, so quotes are backslash-escaped.
// Remove the background image URL from .wl-hero -> solid navy
src = src.replace(
  ".wl-hero{position:relative;display:flex;align-items:center;justify-content:center;min-height:600px;background:url(\\'https://vibe.filesafe.space/1795100135767119492/attachments/690a2214-aacb-493a-ae24-b7960ad70bc7.png\\') center center/cover no-repeat;overflow:hidden;text-align:center}",
  ".wl-hero{position:relative;display:flex;align-items:center;justify-content:center;min-height:600px;background:var(--navy);overflow:hidden;text-align:center}"
);

// Remove the ::before overlay rule entirely (escaped quotes)
src = src.replace(
  ".wl-hero::before{content:\\'\\';position:absolute;inset:0;background:rgba(0,24,61,.45)}",
  ""
);

writeFileSync(path, src);

const after = readFileSync(path, "utf8");
console.log("wl-hero::before refs:", (after.match(/wl-hero::before/g) || []).length);
console.log("wl-hero solid navy:", after.includes(".wl-hero{position:relative;display:flex;align-items:center;justify-content:center;min-height:600px;background:var(--navy)") ? "yes" : "no");
console.log("waitlist hero image refs:", (after.match(/690a2214-aacb-493a-ae24-b7960ad70bc7/g) || []).length);
