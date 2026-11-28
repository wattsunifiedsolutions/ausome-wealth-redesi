import { readFileSync, writeFileSync } from "fs";

// ── 1. Update DraPage.tsx: make the onSubmit handler form-aware ──────────────
const draPath = "src/components/DraPage.tsx";
let dra = readFileSync(draPath, "utf8");

// Replace the hardcoded formId/formName with data-attribute detection.
const oldFormId = '          formId: "contact-form",';
if (!dra.includes(oldFormId)) throw new Error("formId anchor not found in DraPage.tsx");

dra = dra.replace(
  oldFormId,
  `          // Detect which form was submitted via data-form-id / data-form-name.
          const submittedForm = form as HTMLElement;
          const formIdAttr = (submittedForm.getAttribute("data-form-id") || "").trim();
          const formNameAttr = (submittedForm.getAttribute("data-form-name") || "").trim();
          const formId = formIdAttr || "contact-form";
          const formName = formNameAttr || "Contact Form";`,
);

// Replace the hardcoded formName: "Contact Form" with the dynamic one.
const oldFormName = '              formName: "Contact Form",';
if (!dra.includes(oldFormName)) throw new Error("formName anchor not found");
dra = dra.replace(oldFormName, '              formName,');

writeFileSync(draPath, dra);
console.log("DraPage.tsx updated OK");

// ── 2. Update dra-pages.ts: replace JotForm links with CRM form ──────────────
const pagesPath = "src/content/dra-pages.ts";
let src = readFileSync(pagesPath, "utf8");

// The waitlist form section (replaces the final-cta on tax-services page).
const waitlistForm = `<div class="wrap"><div class="waitlist-form-card"><div class="waitlist-form-head"><div class="eyebrow">2027 VIP Waitlist</div><h2>Join the 2027 VIP Waitlist</h2><p>Be the first to know when filing opens for the 2027 tax season. Get filing updates, reminders, and next steps delivered to your inbox.</p></div><form class="waitlist-form" data-form-id="vip-waitlist" data-form-name="2027 VIP Waitlist" autocomplete="on" novalidate><div class="form-row"><label for="wl-name">Name<span aria-hidden="true">*</span></label><input id="wl-name" name="first_name" type="text" required placeholder="Your full name"></div><div class="form-row"><label for="wl-email">Email<span aria-hidden="true">*</span></label><input id="wl-email" name="email" type="email" required placeholder="you@email.com"></div><div class="form-row"><label for="wl-phone">Phone</label><input id="wl-phone" name="phone" type="tel" placeholder="470-555-0000"></div><button type="submit" class="btn">Join the VIP Waitlist &rarr;</button><p id="preview-notice" class="form-notice" style="display:none">Thank you! You&rsquo;re on the list &mdash; watch your inbox for 2027 tax season updates.</p></form></div></div>`;

// CSS for the waitlist form card (navy/gold/ivory, responsive)
const waitlistCss = `.waitlist-form-card{max-width:720px;margin:40px auto;background:#fff;border:1px solid var(--line);border-top:8px solid var(--gold);border-radius:12px;padding:40px 36px;box-shadow:0 4px 16px rgba(0,24,61,.08)}.waitlist-form-head{text-align:center;margin-bottom:28px}.waitlist-form-head h2{font-size:32px;color:var(--navy);margin:12px 0 8px}.waitlist-form-head p{color:var(--muted);font-size:16px;line-height:1.5;max-width:520px;margin:0 auto}.waitlist-form .form-row{display:flex;flex-direction:column;gap:6px;margin-bottom:18px}.waitlist-form label{font-size:14px;font-weight:700;color:var(--navy);letter-spacing:.5px}.waitlist-form input{padding:12px 14px;border:1px solid #d4cdb8;border-radius:8px;font-size:15px;font-family:inherit;color:var(--navy);background:#fff}.waitlist-form input:focus{outline:2px solid var(--gold);outline-offset:1px;border-color:var(--gold)}.waitlist-form .btn{width:100%;margin-top:8px;text-align:center}.form-notice{margin-top:18px;padding:14px 18px;background:var(--ivory);border:1px solid var(--gold);border-radius:8px;color:var(--navy);font-size:15px;text-align:center;font-weight:600}`;

// --- Replace occurrence #1: tax-services hero button ---
// "href="https://form.jotform.com/drawtaxgroup/2027VIPWAITLIST">Join the 2027 VIP Waitlist</a>"
const heroBtnOld = '<a class="btn" href="https://form.jotform.com/drawtaxgroup/2027VIPWAITLIST">Join the 2027 VIP Waitlist</a>';
if (src.includes(heroBtnOld)) {
  src = src.replace(heroBtnOld, '<a class="btn" href="#vip-waitlist">Join the 2027 VIP Waitlist</a>');
  console.log("Replaced hero button");
}

// --- Replace occurrence #2: tax-services final-cta ---
// The final-cta div with jotform link → replace with the waitlist form section
const finalCtaOld = '<div class="final-cta"><div class="wrap"><h2>Get ready for the 2027 tax season</h2><p>Join the VIP waitlist for filing updates and next steps.</p><a class="btn" href="https://form.jotform.com/drawtaxgroup/2027VIPWAITLIST">Join the 2027 VIP Waitlist</a></div></div>';
if (src.includes(finalCtaOld)) {
  src = src.replace(finalCtaOld, `<section class="band-white" id="vip-waitlist" style="scroll-margin-top:80px">${waitlistCss}<style>${waitlistCss}</style>${waitlistForm}</section>`);
  console.log("Replaced final-cta with waitlist form section");
}

// --- Replace occurrence #3: homepage service-row link ---
const svcRowOld = 'href="https://form.jotform.com/drawtaxgroup/2027VIPWAITLIST" target="_blank" rel="noopener"';
if (src.includes(svcRowOld)) {
  src = src.replace(svcRowOld, 'href="/tax-services.html#vip-waitlist"');
  console.log("Replaced homepage service-row link");
}

// --- Replace occurrence #4: another page final-cta ---
const otherCtaOld = '<a class="btn" href="https://form.jotform.com/drawtaxgroup/2027VIPWAITLIST">Join the 2027 VIP Waitlist</a>';
// This may appear on a different page (promotions or similar)
if (src.includes(otherCtaOld)) {
  src = src.replace(otherCtaOld, '<a class="btn" href="/tax-services.html#vip-waitlist">Join the 2027 VIP Waitlist</a>');
  console.log("Replaced other page CTA link");
}

// Verify no jotform remains
const remaining = (src.match(/jotform/gi) || []).length;
console.log("Remaining jotform references:", remaining);

writeFileSync(pagesPath, src);
console.log("dra-pages.ts updated OK");