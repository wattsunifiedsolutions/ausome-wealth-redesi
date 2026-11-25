import { readFileSync, writeFileSync } from "fs";
const f = "src/content/dra-pages.ts";
let c = readFileSync(f, "utf8");

const cssOld = ".im-hero{position:relative;background-image:url(\\'/assets/mentorship-hero-bg.jpg\\');background-size:cover;background-position:center top;padding:96px 16px 96px;text-align:center;overflow:hidden;}\\n\\n.im-hero-inner{position:relative;z-index:10;max-width:900px;margin:0 auto;}";
const cssNew = ".im-hero{background:#05070B;padding:0;overflow:hidden;}\\n.im-hero-grid{display:grid;grid-template-columns:1fr 1fr;align-items:stretch;min-height:540px;}\\n.im-hero-copy{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:72px 48px;text-align:left;}\\n.im-hero-copy .im-hero-inner{max-width:560px;margin:0;}\\n.im-hero-photo{position:relative;min-height:360px;}\\n.im-hero-photo img{display:block;width:100%;height:100%;object-fit:cover;object-position:center top;}\\n@media(max-width:820px){.im-hero-grid{grid-template-columns:1fr;min-height:0;}.im-hero-photo{order:-1;min-height:300px;max-height:420px;}.im-hero-copy{padding:48px 20px;}}";
if (!c.includes(cssOld)) { console.error("CSS OLD NOT FOUND"); process.exit(1); }
c = c.replace(cssOld, cssNew);

const h1Old = "color:#fff;text-shadow:0 2px 14px rgba(0,0,0,.6);}";
const h1New = "color:#fff;}";
if (!c.includes(h1Old)) { console.error("H1 OLD NOT FOUND"); process.exit(1); }
c = c.replace(h1Old, h1New);

const pOld = "font-weight:500;text-shadow:0 1px 8px rgba(0,0,0,.6);}";
const pNew = "font-weight:500;}";
if (!c.includes(pOld)) { console.error("P OLD NOT FOUND"); process.exit(1); }
c = c.replace(pOld, pNew);

const htmlOld = "<section class=\\\"im-hero\\\"><div class=\\\"im-hero-inner\\\"><h1>Learn how to grow your own profitable <span class=\\\"im-red\\\">Tax Mentorship &amp; Practice</span></h1><p>We help all types of tax pros &amp; service bureaus <span class=\\\"im-gold\\\">(Beginner, Intermediate, &amp; Experienced)</span> launch &amp; scale to the next level</p><a href=\\\"https://draw.downrightausomewealth.com/widget/booking/Eo6P4A5bLSnnPldXZ38e\\\" class=\\\"im-btn-gold\\\">Book Your Call Now! u2193</a></div></section>";
const htmlNew = "<section class=\\\"im-hero\\\"><div class=\\\"im-hero-grid\\\"><div class=\\\"im-hero-copy\\\"><div class=\\\"im-hero-inner\\\"><h1>Learn how to grow your own profitable <span class=\\\"im-red\\\">Tax Mentorship &amp; Practice</span></h1><p>We help all types of tax pros &amp; service bureaus <span class=\\\"im-gold\\\">(Beginner, Intermediate, &amp; Experienced)</span> launch &amp; scale to the next level</p><a href=\\\"https://draw.downrightausomewealth.com/widget/booking/Eo6P4A5bLSnnPldXZ38e\\\" class=\\\"im-btn-gold\\\">Book Your Call Now! \\u2193</a></div></div><div class=\\\"im-hero-photo\\\"><img src=\\\"/assets/mentorship-hero-bg.jpg\\\" alt=\\\"Tax mentorship coaching session\\\"></div></div></section>";
if (!c.includes(htmlOld)) { console.error("HTML OLD NOT FOUND"); process.exit(1); }
c = c.replace(htmlOld, htmlNew);

writeFileSync(f, c, "utf8");
console.log("Mentorship hero split applied.");
