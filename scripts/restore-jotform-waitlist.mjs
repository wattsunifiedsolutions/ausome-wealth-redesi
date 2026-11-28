import { readFileSync, writeFileSync } from "fs";

const path = "src/content/dra-pages.ts";
const src = readFileSync(path, "utf8");

const start = src.indexOf('"tax-waitlist"');
if (start < 0) { console.error("tax-waitlist entry not found"); process.exit(1); }
const q = src.indexOf("html: '", start) + 7;
const end = src.indexOf("',\n", q);
const html = src.slice(q, end);

// Find the native form card and replace everything from <div class="wl-form-card">
// through the closing </form></div> with the JotForm embed.
const cardStart = html.indexOf('<div class="wl-form-card">');
const formClose = html.indexOf('</form></div>', cardStart);
if (cardStart < 0 || formClose < 0) { console.error("form card markers not found"); process.exit(1); }
const after = formClose + '</form></div>'.length;

const embed = '<div class="wl-form-card">'
  + '<iframe id="jotform-2027vipwaitlist" title="2027 Tax Season VIP Waitlist Form" src="https://form.jotform.com/drawtaxgroup/2027VIPWAITLIST" style="width:100%;height:1520px;border:0;background:transparent" allow="autoplay; clipboard-write; encrypted-media" allowtransparency="true" loading="lazy"></iframe>'
  + '</div>';

const next = html.slice(0, cardStart) + embed + html.slice(after);
writeFileSync(path, src.slice(0, q) + next + src.slice(end));
console.log("done. native form swapped for jotform embed.");
