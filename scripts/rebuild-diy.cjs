const fs = require("fs");
const body = fs.readFileSync("/tmp/diy-body.txt", "utf8");

const style = `
.diy-page{--navy:#001B3D;--gold:#D6B783;--gold-deep:#A99369;--ivory:#F4F0E9;color:#3A4149;font-family:Raleway,Arial,sans-serif}
.diy-page *{box-sizing:border-box}
.diy-page .diy-wrap{width:min(1120px,calc(100% - 48px));margin-inline:auto}
.diy-page h1,.diy-page h2,.diy-page h3{font-family:"Noto Serif Display",Georgia,serif;color:var(--navy);line-height:1.12;font-weight:600}
.diy-page h1{font-size:clamp(2.4rem,4.6vw,3.9rem);letter-spacing:-.02em;margin:0 0 18px}
.diy-page h2{font-size:clamp(1.8rem,3vw,2.6rem);letter-spacing:-.015em;margin:0 0 16px}
.diy-page h3{font-size:1.25rem;margin:0 0 10px}
.diy-page p{line-height:1.75;margin:0 0 16px}
.diy-page .diy-eyebrow{font-family:Raleway,Arial,sans-serif;font-size:.75rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--gold-deep);margin-bottom:14px}
.diy-page .diy-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:48px;padding:12px 26px;background:var(--navy);border:1px solid var(--navy);color:#fff;text-decoration:none;font-family:Raleway,Arial,sans-serif;font-weight:700;font-size:.95rem;letter-spacing:.02em;border-radius:999px;transition:background .25s ease,color .25s ease,border-color .25s ease}
.diy-page .diy-btn:hover{background:var(--gold);border-color:var(--gold);color:var(--navy)}
.diy-page .diy-btn-ghost{background:transparent;border-color:var(--navy);color:var(--navy)}
.diy-page .diy-btn-ghost:hover{background:var(--navy);border-color:var(--navy);color:#fff}
.diy-page .diy-hero{background:var(--ivory);padding:56px 0}
.diy-page .diy-hero-grid{display:grid;grid-template-columns:1fr 1.04fr;gap:56px;align-items:center}
.diy-page .diy-hero-copy{padding:12px 0}
.diy-page .diy-hero-copy>p{font-size:1.05rem;max-width:520px;margin-bottom:26px}
.diy-page .diy-hero-image{display:block;width:100%;height:clamp(340px,42vw,560px);object-fit:cover;object-position:center}
.diy-page .diy-hero-note{font-size:.82rem;color:#6A7078;margin-top:14px}
.diy-page .diy-facts{background:var(--navy);color:#fff;padding:18px 0}
.diy-page .diy-facts-row{display:flex;justify-content:center;gap:48px;flex-wrap:wrap}
.diy-page .diy-fact{font-size:.9rem;letter-spacing:.02em}
.diy-page .diy-fact strong{color:var(--gold)}
.diy-page .diy-section{padding:76px 0}
.diy-page .diy-section.ivory{background:var(--ivory)}
.diy-page .diy-section-head{max-width:740px;margin-bottom:36px}
.diy-page .diy-intro-grid{display:grid;grid-template-columns:1fr 1fr;gap:52px;align-items:center}
.diy-page .diy-video{width:100%;aspect-ratio:16/9;background:var(--navy)}
.diy-page .diy-video video{display:block;width:100%;height:100%;object-fit:contain}
.diy-page .diy-feature-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
.diy-page .diy-feature{padding:26px 0;border-top:2px solid var(--gold)}
.diy-page .diy-feature img{display:block;width:100%;height:190px;object-fit:cover;margin-bottom:20px}
.diy-page .diy-feature p{font-size:.95rem}
.diy-page .diy-benefits{display:grid;grid-template-columns:repeat(3,1fr);gap:36px}
.diy-page .diy-benefit{padding-top:20px;border-top:1px solid var(--gold-deep)}
.diy-page .diy-benefit-num{font-family:"Noto Serif Display",Georgia,serif;font-size:1.9rem;font-weight:600;color:var(--gold-deep);margin-bottom:14px}
.diy-page .diy-program{display:grid;grid-template-columns:.82fr 1.18fr;gap:48px;align-items:center;padding:44px;background:#fff;border:1px solid #E3DCCB}
.diy-page .diy-price{font-family:"Noto Serif Display",Georgia,serif;font-size:clamp(2.8rem,4.6vw,4rem);font-weight:600;line-height:1;color:var(--navy);letter-spacing:-.03em;margin:10px 0}
.diy-page .diy-price span{font-family:Raleway,Arial,sans-serif;font-size:1rem;font-weight:500;letter-spacing:0}
.diy-page .diy-checklist{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:1fr 1fr;gap:14px 30px}
.diy-page .diy-checklist li{position:relative;padding-left:24px;line-height:1.5}
.diy-page .diy-checklist li:before{content:"";position:absolute;left:0;top:.42em;width:8px;height:8px;border:2px solid var(--gold-deep);transform:rotate(45deg)}
.diy-page .diy-disclosure{font-size:.86rem;color:#6A7078;margin-top:22px}
.diy-page .diy-what{display:grid;grid-template-columns:1fr 1fr;gap:36px 56px}
.diy-page .diy-what-item{border-bottom:1px solid #DDD5C2;padding:0 0 18px}
.diy-page .diy-what-item h3{margin-bottom:8px}
.diy-page .diy-what-item p{font-size:.95rem;margin:0}
.diy-page .diy-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
.diy-page .diy-step{border-top:2px solid var(--gold);padding-top:20px}
.diy-page .diy-step img{display:block;width:100%;height:190px;object-fit:cover;margin:0 0 18px}
.diy-page .diy-step-label{font-size:.72rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--gold-deep);margin-bottom:10px}
.diy-page .diy-score{display:grid;grid-template-columns:1fr 280px;gap:44px;align-items:center}
.diy-page .diy-score img{display:block;width:100%;max-width:260px;height:auto;margin:auto}
.diy-page .diy-faq{max-width:880px;margin:32px auto 0;border-top:1px solid #DDD5C2}
.diy-page .diy-faq details{padding:20px 4px;border-bottom:1px solid #DDD5C2}
.diy-page .diy-faq summary{cursor:pointer;color:var(--navy);font-weight:700;font-family:Raleway,Arial,sans-serif}
.diy-page .diy-faq details p{margin:12px 0 0}
.diy-page .diy-close{background:var(--navy);color:#fff;text-align:center;padding:70px 0}
.diy-page .diy-close h2{color:#fff;max-width:780px;margin:0 auto 18px}
.diy-page .diy-close p{max-width:660px;margin:0 auto 26px;color:#EDE9E0}
.diy-page .diy-close .diy-eyebrow{color:var(--gold)}
.diy-page .diy-close .diy-btn{background:var(--gold);border-color:var(--gold);color:var(--navy)}
.diy-page .diy-close .diy-btn:hover{background:#fff;border-color:#fff;color:var(--navy)}
.diy-page img,.diy-page video{opacity:1!important;filter:none!important;box-shadow:none!important;-webkit-filter:none!important}
@media(max-width:850px){.diy-page .diy-hero-grid,.diy-page .diy-intro-grid,.diy-page .diy-program,.diy-page .diy-score{grid-template-columns:1fr}.diy-page .diy-hero-grid{gap:24px}.diy-page .diy-hero-image{height:auto;max-height:440px}.diy-page .diy-feature-grid,.diy-page .diy-benefits,.diy-page .diy-steps{grid-template-columns:1fr}.diy-page .diy-what{grid-template-columns:1fr}.diy-page .diy-program{padding:28px}.diy-page .diy-checklist{grid-template-columns:1fr}.diy-page .diy-section{padding:54px 0}.diy-page .diy-facts-row{gap:12px 24px}.diy-page .diy-wrap{width:min(100% - 32px,1120px)}.diy-page .diy-hero{padding:36px 0}}
`;

const header = `<a class="skip-link" href="#main">Skip to content</a>\n<header class="dra-header"><div class="dra-header-inner"><a class="brand" href="/"><img src="/assets/dra-nav-logo.webp" alt="DRA Tax &amp; Financial Solutions logo" decoding="async"></a><nav aria-label="Main navigation"><a href="/">Home</a><a href="/credit-resources.html">Credit Services</a><a href="/tax-services.html">Tax Preparation</a><a href="/resources.html">Digital Resource Shop</a><a href="/tax-mentorship.html">Tax Mentorship &amp; Opportunities</a><a href="/promotions.html">Current Promotions</a><a href="/about.html">About / Contact</a></nav><a class="dra-contact" href="/book-an-appointment.html">Book a Review</a></div></header>\n<main id="main" class="diy-page">\n<style>${style}</style>\n`;

const footer = `</main>\n<footer class="interior-footer"><div class="footer-grid"><div class="footer-col"><img src="/assets/dra-nav-logo.webp" alt="DRA Tax &amp; Financial Solutions logo" decoding="async"><p><strong>Deneshia Renee</strong><br>CEO<br>Down Right Ausome Wealth</p></div><div class="footer-col"><h4>Explore</h4><a href="/">Home</a><a href="/credit-resources.html">Credit Services</a><a href="/tax-services.html">Tax Preparation</a><a href="/resources.html">Digital Resource Shop</a><a href="/tax-mentorship.html">Tax Mentorship &amp; Opportunities</a><a href="/promotions.html">Current Promotions</a><a href="/about.html">About / Contact</a></div><div class="footer-col"><h4>Services</h4><a href="/credit-resources.html">Credit Services</a><a href="/book-an-appointment.html">Financial Blueprint Review</a><a href="/testimonials.html">Client Testimonials</a></div><div class="footer-col"><h4>Contact</h4><p><a href="tel:+14705161141">470-516-1141</a></p><p><a href="mailto:admin@downrightausomewealth.com">admin@downrightausomewealth.com</a></p><p>3205 Woodward Crossing Blvd, Suite F, Buford, GA</p></div></div><div class="footer-bottom"><span>&copy; 2026 Down Right Ausome Wealth. All rights reserved.</span><span><a href="/testimonials.html">Testimonials</a> <a href="/privacy-policy.html">Privacy Policy</a> &middot; <a href="/terms-of-service.html">Terms of Service</a> &middot; <a href="/disclaimer.html">Disclaimer</a></span></div><div class="compliance">No outcome, score increase, refund, or approval is guaranteed.</div></footer>`;

const full = header + body + footer;
const esc = full.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n");
const entry = "    html: '" + esc + "',";
const s = fs.readFileSync("src/content/dra-pages.ts", "utf8");
const lines = s.split("\n");
lines[125] = entry;
fs.writeFileSync("src/content/dra-pages.ts", lines.join("\n"));
console.log("written, html length", full.length);
