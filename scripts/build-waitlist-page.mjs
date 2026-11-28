import { readFileSync, writeFileSync } from "fs";

const pagesPath = "src/content/dra-pages.ts";
let src = readFileSync(pagesPath, "utf8");

const states = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];
const abbr = ["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
const stateOptions = states.map((s, i) => `<option value="${abbr[i]}">${s}</option>`).join("");

const incomeTypes = ["Wages / Salary (W-2)","Self-employment / Business income","Retirement / Social Security","Rental income","Interest / Dividends / Investments","Other","Not sure yet"];
const incomeBoxes = incomeTypes.map((t) => `<label class="wl-check"><input type="checkbox" name="income_types" value="${t}"><span>${t}</span></label>`).join("");

const header = '<a class="skip-link" href="#main">Skip to content</a><header class="dra-header"><div class="dra-header-inner"><a class="brand" href="/"><img src="/assets/dra-nav-logo.webp" alt="DRA Tax &amp; Financial Solutions logo" decoding="async"></a><nav aria-label="Main navigation"><a href="/">Home</a><a href="/credit-resources.html">Credit Services</a><a href="/tax-services.html">Tax Preparation</a><a href="/tax-mentorship.html">Tax Mentorship</a><a href="/about.html">About</a></nav></div></header>';

const footer = '<footer class="footer-compact"><div class="footer-compact-inner"><p class="footer-contact"><a href="tel:4705161141">470-516-1141</a><a href="mailto:admin@downrightausomewealth.com">admin@downrightausomewealth.com</a><span>3205 Woodward Crossing Blvd, Suite F, Buford, GA</span><span>Mon&ndash;Sat 9:00am&ndash;8:00pm, Sunday closed</span></p><div class="footer-social"><a class="social-icon" href="https://www.facebook.com/DownRightAwesomeWealth/" aria-label="Facebook"><img src="/assets/icon-facebook.svg" alt="Facebook" width="22" height="22"><span>Facebook</span></a><a class="social-icon" href="https://www.instagram.com/downrightawesomewealth/" aria-label="Instagram"><img src="/assets/icon-instagram.svg" alt="Instagram" width="22" height="22"><span>Instagram</span></a><a class="social-icon" href="https://www.tiktok.com/@deneshiarenee" aria-label="TikTok"><img src="/assets/icon-tiktok.svg" alt="TikTok" width="22" height="22"><span>TikTok</span></a></div><div class="footer-legal"><span>&copy; 2026 Down Right Ausome Wealth. All rights reserved.</span><span class="footer-legal-links"><a href="testimonials.html">Testimonials</a><a href="faqs.html">FAQs</a><a href="privacy-policy.html">Privacy Policy</a><a href="terms-of-service.html">Terms of Service</a><a href="disclaimer.html">Disclaimer</a></span></div><p class="compliance">No outcome, score increase, refund, or approval is guaranteed.</p></div></footer>';

const eyebrowStyle = 'color:var(--navy);border-bottom:3px solid var(--gold);display:inline-block;padding-bottom:6px;letter-spacing:3px;font-size:13px;font-weight:700;text-transform:uppercase';

const css = `
:root{--navy:#00183d;--gold:#d6c08f;--ivory:#f5f0e8;--line:#d6c08f}
.wl-hero{display:grid;grid-template-columns:1.05fr .95fr;background:var(--ivory);overflow:hidden}
.wl-hero-copy{padding:72px 56px;display:flex;flex-direction:column;justify-content:center;align-items:flex-start}
.wl-hero-copy h1{font-size:48px;margin:12px 0;color:var(--navy);max-width:520px}
.wl-hero-copy h1 em{color:var(--gold);font-style:italic}
.wl-hero-copy p{max-width:480px;font-size:18px;color:var(--navy)}
.wl-hero-media{min-height:460px}
.wl-hero-media img{display:block;width:100%;height:100%;object-fit:cover;object-position:center 20%}
.wl-section{background:var(--ivory);padding:64px 20px 80px}
.wl-wrap{max-width:720px;margin:0 auto}
.wl-head{text-align:center;margin-bottom:32px}
.wl-head .eyebrow{color:var(--navy);border-bottom:3px solid var(--gold);display:inline-block;padding-bottom:6px;letter-spacing:3px;font-size:13px;font-weight:700;text-transform:uppercase}
.wl-head h2{font-size:38px;color:var(--navy);margin:14px 0 8px}
.wl-head p{color:var(--navy);font-size:17px;max-width:520px;margin:0 auto}
.wl-form-card{background:#fff;border:1px solid var(--line);border-top:8px solid var(--gold);border-radius:12px;padding:40px 36px}
.wl-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.wl-field{display:flex;flex-direction:column;gap:6px;border:0;padding:0;margin:0}
.wl-field.wl-full{grid-column:1/-1}
.wl-field label{font-size:14px;font-weight:700;color:var(--navy)}
.wl-field label .opt{font-weight:400;font-size:12px;color:rgba(0,24,61,.7)}
.wl-field label .req{color:#b8860b}
.wl-field input,.wl-field select,.wl-field textarea{padding:12px 14px;border:1px solid #d4cdb8;border-radius:8px;font-size:15px;font-family:inherit;color:var(--navy);background:#fff;width:100%;box-sizing:border-box}
.wl-field input:focus,.wl-field select:focus,.wl-field textarea:focus{outline:2px solid var(--gold);outline-offset:1px;border-color:var(--gold)}
.wl-check{display:flex;align-items:center;gap:10px;padding:11px 14px;border:1px solid #d4cdb8;border-radius:8px;background:#fff;font-size:14px;color:var(--navy);cursor:pointer}
.wl-check:hover{border-color:var(--gold)}
.wl-check input{width:16px;height:16px;accent-color:var(--gold)}
.wl-types{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.wl-consent,.wl-ack{border:1px solid #d4cdb8;border-radius:8px;background:#fff;padding:14px 16px}
.wl-ack{border-color:var(--gold);background:#fbf6e8}
.wl-consent label,.wl-ack label{display:flex;gap:10px;align-items:flex-start;font-size:14px;color:var(--navy);cursor:pointer;line-height:1.5}
.wl-consent input,.wl-ack input{margin-top:3px;width:16px;height:16px;accent-color:var(--gold);flex-shrink:0}
.wl-submit{width:100%;display:inline-block;background:var(--gold);color:var(--navy);border:0;text-decoration:none;padding:16px 28px;border-radius:999px;font-weight:700;font-size:16px;cursor:pointer;margin-top:8px}
.wl-submit:hover{background:var(--navy);color:#fff}
.wl-fineprint{text-align:center;font-size:12px;color:rgba(0,24,61,.7);margin-top:14px}
.wl-fineprint p{margin:2px 0}
.form-notice{margin-top:18px;padding:14px 18px;background:var(--ivory);border:1px solid var(--gold);border-radius:8px;color:var(--navy);font-size:15px;text-align:center;font-weight:600}
@media (max-width:760px){.wl-hero{grid-template-columns:1fr}.wl-hero-media{order:-1;min-height:0;height:320px}.wl-hero-copy{padding:40px 24px}.wl-hero-copy h1{font-size:34px}.wl-grid{grid-template-columns:1fr}.wl-types{grid-template-columns:1fr}.wl-form-card{padding:28px 20px}}
`;

const form = `<section class="wl-section" id="waitlist-form"><div class="wl-wrap"><div class="wl-head"><div class="eyebrow">2027 VIP Waitlist</div><h2>Join the 2027 VIP Tax Waitlist</h2><p>Receive service updates and notification when tax appointments open.</p></div><div class="wl-form-card"><form class="wl-form" data-form-id="vip-waitlist" data-form-name="2027 VIP Waitlist" autocomplete="on"><div class="wl-grid">
<div class="wl-field"><label for="wl-first">First name <span class="req">*</span></label><input id="wl-first" name="first_name" type="text" required placeholder="Jane"></div>
<div class="wl-field"><label for="wl-last">Last name <span class="req">*</span></label><input id="wl-last" name="last_name" type="text" required placeholder="Doe"></div>
<div class="wl-field wl-full"><label for="wl-email">Email address <span class="req">*</span></label><input id="wl-email" name="email" type="email" required placeholder="jane.doe@example.com"></div>
<div class="wl-field"><label for="wl-phone">Phone number <span class="req">*</span></label><input id="wl-phone" name="phone" type="tel" required placeholder="(555) 000-0000"></div>
<div class="wl-field"><label for="wl-city">City <span class="req">*</span></label><input id="wl-city" name="city" type="text" required placeholder="Your city"></div>
<div class="wl-field"><label for="wl-state">State <span class="req">*</span></label><select id="wl-state" name="state" required><option value="" disabled selected>Select your state</option>${stateOptions}</select></div>
<div class="wl-field"><label for="wl-contact">Preferred contact method <span class="req">*</span></label><select id="wl-contact" name="contact_method" required><option value="" disabled selected>Select your preferred contact method</option><option value="Email">Email</option><option value="Phone call">Phone call</option><option value="Text message">Text message</option></select></div>
<div class="wl-field wl-full"><label for="wl-needs">Tax needs <span class="req">*</span></label><select id="wl-needs" name="tax_needs" required><option value="" disabled selected>Select your tax needs</option><option value="Individual / Family">Individual / Family</option><option value="Self-employed">Self-employed</option><option value="Small Business">Small Business</option><option value="Not sure yet">Not sure yet</option></select></div>
<fieldset class="wl-field wl-full"><legend style="font-size:14px;font-weight:700;color:var(--navy);padding:0">Income types <span class="opt">(optional &mdash; select all that apply)</span></legend><div class="wl-types" style="margin-top:8px">${incomeBoxes}</div></fieldset>
<div class="wl-field wl-full"><label for="wl-dep">Will you be claiming any dependents on your 2027 tax return? <span class="opt">(optional)</span></label><select id="wl-dep" name="dependents"><option value="" disabled selected>Select an option</option><option value="Yes">Yes</option><option value="No">No</option><option value="Not Sure">Not Sure</option></select></div>
<div class="wl-field wl-full"><label for="wl-income">What is your estimated total household income for 2026? <span class="opt">(optional)</span></label><select id="wl-income" name="household_income"><option value="" disabled selected>Select an income range</option><option>Under $25,000</option><option>$25,000&ndash;$49,999</option><option>$50,000&ndash;$74,999</option><option>$75,000&ndash;$99,999</option><option>$100,000&ndash;$149,999</option><option>$150,000&ndash;$249,999</option><option>$250,000 or More</option><option>Prefer Not to Say</option></select></div>
<div class="wl-field wl-full"><label for="wl-notes">Is there anything else you would like us to know?</label><textarea id="wl-notes" name="notes" rows="4" maxlength="500" placeholder="Share a question or a brief note about the tax help you&#39;re looking for."></textarea><p class="wl-fineprint" style="text-align:left;margin-top:6px">Do not include Social Security numbers, account numbers, or sensitive tax information.</p></div>
<div class="wl-consent wl-full"><label><input type="checkbox" name="consent" value="I agree to receive tax service updates and appointment availability notifications through my selected contact method. I understand I can opt out."><span>I agree to receive tax service updates and appointment availability notifications from Down Right Ausome Wealth through my selected contact method. I understand I can opt out.</span></label></div>
<div class="wl-ack wl-full"><label><input type="checkbox" name="acknowledgment" value="I understand that joining the VIP Tax Waitlist does not guarantee an appointment or establish a tax preparation engagement." required><span>I understand that joining the VIP Tax Waitlist does not guarantee an appointment or establish a tax preparation engagement. Down Right Ausome Wealth will notify me when tax preparation appointments become available. <span class="req">*</span></span></label></div>
</div>
<button type="submit" class="wl-submit">Join the VIP Waitlist</button>
<p id="preview-notice" class="form-notice" style="display:none">Thank you! You&rsquo;re on the list &mdash; watch your inbox for 2027 tax season updates.</p>
<div class="wl-fineprint"><p>Joining does not book an appointment.</p><p>Please do not submit sensitive tax information.</p></div>
</form></div></div></section>`;

const html = [header, `<main id="main" class="waitlist-landing"><style>${css}</style>`, `<section class="wl-hero"><div class="wl-hero-copy"><div class="eyebrow" style="${eyebrowStyle}">2027 Tax Season</div><h1>More than tax preparation. <em>A plan for what&rsquo;s next.</em></h1><p>Join the VIP waitlist to receive service updates and a notification when tax appointments open for the 2027 season.</p></div><div class="wl-hero-media"><img src="/assets/deneshia-blue-suit-hero.webp" alt="Deneshia Renee standing in a navy blue suit beside a bookshelf and fireplace" fetchpriority="high"></div></section>`, form, "</main>", footer].join("\\n");

if (src.includes('"tax-waitlist"')) {
  console.log("tax-waitlist already exists");
} else {
  const entry = `  "tax-waitlist": {\n    title: "2027 VIP Tax Waitlist | Down Right Ausome Wealth",\n    html: ${JSON.stringify(html)},\n    css: "/styles.css",\n  },\n`;
  const anchor = "  about: {";
  if (!src.includes(anchor)) throw new Error("anchor not found");
  src = src.replace(anchor, entry + anchor);
}

src = src.replaceAll('href="#vip-waitlist"', 'href="/tax-waitlist.html"');
src = src.replaceAll('href="/tax-services.html#vip-waitlist"', 'href="/tax-waitlist.html"');

const sectionStart = src.indexOf('<section class="band-white" id="vip-waitlist"');
if (sectionStart !== -1) {
  const sectionEnd = src.indexOf("</section>", sectionStart) + "</section>".length;
  const cta = '<div class="final-cta"><div class="wrap"><h2>Get ready for the 2027 tax season</h2><p>Join the VIP waitlist for filing updates and next steps.</p><a class="btn" href="/tax-waitlist.html">Join the 2027 VIP Waitlist</a></div></div>';
  src = src.slice(0, sectionStart) + cta + src.slice(sectionEnd);
  console.log("tax-services embedded form replaced with final CTA");
}

writeFileSync(pagesPath, src);
console.log("done. jotform refs:", (src.match(/jotform/gi) || []).length, "| tax-waitlist refs:", (src.match(/tax-waitlist/g) || []).length);
