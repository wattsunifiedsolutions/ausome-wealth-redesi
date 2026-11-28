import fs from "node:fs";

// Refine the tax-mentorship entry below the hero:
// - compact 5-icon strip with premium dimensional gold icons
// - Who This Is For: images + titles only
// - Inside the Mentorship: remove photo, 4 premium icon-based benefits
// - What You'll Learn: 5 consistent educational cards
// - The Blueprint: restore all 14 original benefits
// - Software & Enrollment: compact Tier 1 / Tier 2 packages
// - Preserve consultation + referral links
// - Compact application CTA + FAQ link + footer
// - Hero stays EXACTLY as-is.

const file = "src/content/dra-pages.ts";
let raw = fs.readFileSync(file, "utf8");

// --- locate the tax-mentorship html value ---
const key = '"tax-mentorship": ';
const idx = raw.indexOf(key);
if (idx === -1) throw new Error("tax-mentorship not found");
const htmlStart = raw.indexOf("html: '", idx) + "html: '".length;
const htmlEnd = raw.indexOf("',\n", htmlStart);
const oldHtml = raw.slice(htmlStart, htmlEnd);

// --- extract the hero block (the <section class="tm-hero-luxury" ...> ... </section>) ---
const heroStart = oldHtml.indexOf('<section class="tm-hero-luxury"');
const heroEnd = oldHtml.indexOf("</section>", heroStart) + "</section>".length;
const heroBlock = oldHtml.slice(heroStart, heroEnd);

// --- extract the <style>...</style> block ---
const styleStart = oldHtml.indexOf("<style>");
const styleEnd = oldHtml.indexOf("</style>", styleStart) + "</style>".length;
const oldStyle = oldHtml.slice(styleStart, styleEnd);

// --- extract the <main class="tm-page"> opening + hero, up to the pillar strip ---
// We keep everything from <main class="tm-page"> through the hero section, then
// replace everything after with our rebuilt sections.

const mainStart = oldHtml.indexOf('<main class="tm-page">');
const mainOpenEnd = oldHtml.indexOf(">", mainStart) + 1; // end of <main class="tm-page">
const mainOpen = oldHtml.slice(mainStart, mainOpenEnd);

// --- CSS: we keep the old style but append refinements ---
const newCss = oldStyle
  // compact the pillar strip
  .replace(
    /\.tm-pillar-strip \{[^}]*\}/,
    ".tm-pillar-strip { background-color: #001B3D; border-top: 1px solid rgba(214,183,131,0.3); border-bottom: 1px solid rgba(214,183,131,0.3); padding: 18px 0; }",
  )
  .replace(
    /\.tm-pillar-icon-box \{[^}]*\}/,
    ".tm-pillar-icon-box { display: flex; align-items: center; justify-content: center; }",
  )
  .replace(
    /\.tm-gold-svg \{[^}]*\}/,
    ".tm-gold-svg { width: 34px; height: 34px; }",
  )
  .replace(
    /\.tm-pillar-label \{[^}]*\}/,
    ".tm-pillar-label { color: #F5F1E8; font-size: 12px; font-weight: 600; letter-spacing: 0.3px; margin-top: 2px; }",
  )
  // Inside the Mentorship: 2-col with 4 icon benefits (no photo)
  .replace(
    /\.tm-includes-grid \{[^}]*\}/,
    ".tm-includes-grid { display: grid; grid-template-columns: 1fr; gap: 0; }",
  )
  .replace(
    /\.tm-includes-visual[^}]*\}/,
    ".tm-includes-visual { display: none; }",
  )
  .replace(
    /\.tm-features-grid \{[^}]*\}/,
    ".tm-features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px 28px; }",
  )
  .replace(
    /\.tm-section-header \{[^}]*\}/,
    ".tm-section-header { text-align: center; max-width: 720px; margin: 0 auto 36px; }",
  )
  // Blueprint: 7-col x 2-row grid for 14 items
  .replace(
    /\.tm-compact-grid \{[^}]*\}/,
    ".tm-compact-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 18px; position: relative; z-index: 2; }",
  )
  .replace(
    /\.tm-compact-grid article \{[^}]*\}/,
    ".tm-compact-grid article { background-color: rgba(255,255,255,0.05); border: 1px solid rgba(214,183,131,0.35); border-radius: 12px; padding: 18px 14px; text-align: center; }",
  )
  .replace(
    /\.tm-compact-grid span \{[^}]*\}/,
    ".tm-compact-grid span { display: inline-flex; width: 24px; height: 24px; align-items: center; justify-content: center; border-radius: 50%; background-color: #D6B783; color: #001B3D; font-weight: 700; font-size: 13px; margin-bottom: 8px; }",
  )
  .replace(
    /\.tm-compact-grid h3 \{[^}]*\}/,
    ".tm-compact-grid h3 { font-size: 14px; font-weight: 700; color: #FFFFFF; margin: 0 0 6px; line-height: 1.3; }",
  )
  .replace(
    /\.tm-compact-grid p \{[^}]*\}/,
    ".tm-compact-grid p { font-size: 11.5px; line-height: 1.5; color: #C9D3E0; margin: 0; }",
  )
  // responsive: blueprint 7 -> 4 -> 2
  .replace(
    /\.tm-learn-grid \{[^}]*\}/,
    ".tm-learn-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }",
  );

// Add extra responsive rules for 14-item blueprint before </style>
const extraResponsive = `
@media (max-width: 1024px) {
  .tm-features-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
  .tm-compact-grid { grid-template-columns: repeat(4, 1fr); }
}
@media (max-width: 640px) {
  .tm-compact-grid { grid-template-columns: repeat(2, 1fr); }
  .tm-features-grid { grid-template-columns: 1fr; }
}
</style>`;

const finalStyle = newCss.replace(/<\/style>$/, extraResponsive);

// --- 14 blueprint benefits (original program content) ---
const blueprint14 = [
  ["1-on-1 Mentorship", "Personal coaching and guidance tailored to your goals."],
  ["Group Mentorship Calls", "Live calls with Deneshia and the DRA community."],
  ["Tax Preparation Software", "Industry-leading software with bank registration."],
  ["Technical Support", "Ongoing technical support for your software setup."],
  ["Client Forms", "Client intake forms and document management tools."],
  ["Return Review", "Return review guidance to catch errors before filing."],
  ["Software Training", "Hands-on training on your tax preparation software."],
  ["PTIN Registration", "Guidance on obtaining and maintaining your PTIN."],
  ["EFIN Registration", "Step-by-step EFIN registration guidance."],
  ["Tax Loan Info", "Tax loan product information and client options."],
  ["LLC & EIN Setup", "LLC formation and EIN setup guidance for your business."],
  ["Marketing", "Marketing strategies to attract and retain clients."],
  ["Social Media", "Social media setup and content guidance."],
  ["Business Automation", "Business automation tools and workflow systems."],
];

const blueprintHtml = `<div class="tm-compact-grid">${blueprint14
  .map(
    ([title, desc]) =>
      `<article><span aria-hidden="true">&#10003;</span><h3>${title}</h3><p>${desc}</p></article>`,
  )
  .join("")}</div>`;

// --- Sections below hero ---
// Helper to reuse the gold SVG defs for feature icons
const goldDefs = (id) =>
  `<defs><linearGradient id="gold-grad-${id}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFFDF5"/><stop offset="25%" stop-color="#F2DDAD"/><stop offset="55%" stop-color="#D6B783"/><stop offset="85%" stop-color="#9C773B"/><stop offset="100%" stop-color="#6E5020"/></linearGradient><filter id="gold-shadow-${id}" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="1.6" flood-color="#0B192E" flood-opacity="0.35"/></filter></defs>`;

const featureIcons = {
  hands: `${goldDefs("fh")}<g filter="url(#gold-shadow-fh)"><circle cx="24" cy="13" r="6" fill="url(#gold-grad-fh)" fill-opacity="0.35" stroke="url(#gold-grad-fh)" stroke-width="2"/><path d="M12 38C12 30 17 25 24 25C31 25 36 30 36 38" stroke="url(#gold-grad-fh)" stroke-width="2.2" stroke-linecap="round"/><path d="M29 34L34 29M34 29L37 32M34 29L37 26" stroke="url(#gold-grad-fh)" stroke-width="2" stroke-linecap="round"/></g></svg>`,
  growth: `${goldDefs("fg")}<g filter="url(#gold-shadow-fg)"><line x1="8" y1="40" x2="42" y2="40" stroke="url(#gold-grad-fg)" stroke-width="2.4" stroke-linecap="round"/><rect x="12" y="30" width="6" height="8" fill="url(#gold-grad-fg)" fill-opacity="0.4" stroke="url(#gold-grad-fg)" stroke-width="1.6"/><rect x="22" y="24" width="6" height="14" fill="url(#gold-grad-fg)" fill-opacity="0.55" stroke="url(#gold-grad-fg)" stroke-width="1.6"/><rect x="32" y="16" width="6" height="22" fill="url(#gold-grad-fg)" fill-opacity="0.7" stroke="url(#gold-grad-fg)" stroke-width="1.6"/><path d="M10 20L20 14L28 17L40 8" stroke="url(#gold-grad-fg)" stroke-width="2.2" stroke-linecap="round"/><path d="M34 8H40V14" stroke="url(#gold-grad-fg)" stroke-width="2.2" stroke-linecap="round"/></g></svg>`,
  laptop: `${goldDefs("fl")}<g filter="url(#gold-shadow-fl)"><rect x="7" y="10" width="34" height="23" rx="2" fill="url(#gold-grad-fl)" fill-opacity="0.3" stroke="url(#gold-grad-fl)" stroke-width="2"/><path d="M4 37C4 35 6 34 8 34H40C42 34 44 35 44 37H4Z" fill="url(#gold-grad-fl)" stroke="url(#gold-grad-fl)" stroke-width="1.8"/><circle cx="24" cy="21" r="5" stroke="url(#gold-grad-fl)" stroke-width="2"/><path d="M24 13V17M24 25V29M16 21H20M28 21H32" stroke="url(#gold-grad-fl)" stroke-width="1.8" stroke-linecap="round"/></g></svg>`,
  headset: `${goldDefs("fs")}<g filter="url(#gold-shadow-fs)"><path d="M10 30V24C10 16 16 10 24 10C32 10 38 16 38 24V30" stroke="url(#gold-grad-fs)" stroke-width="2.2" stroke-linecap="round"/><rect x="7" y="28" width="7" height="12" rx="3" fill="url(#gold-grad-fs)" fill-opacity="0.4" stroke="url(#gold-grad-fs)" stroke-width="1.8"/><rect x="34" y="28" width="7" height="12" rx="3" fill="url(#gold-grad-fs)" fill-opacity="0.4" stroke="url(#gold-grad-fs)" stroke-width="1.8"/><path d="M38 36C38 39 34 41 30 41" stroke="url(#gold-grad-fs)" stroke-width="2" stroke-linecap="round"/><circle cx="29" cy="41" r="1.5" fill="url(#gold-grad-fs)"/></g></svg>`,
};

const iconOpen = `<svg class="tm-gold-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">`;

// --- the section markup below the hero ---
const sections = `\n  ${heroBlock}\n
  <section class="tm-pillar-strip" aria-label="Opportunity Highlights">
    <div class="tm-container">
      <div class="tm-pillar-strip-grid"><div class="tm-pillar-item"><div class="tm-pillar-icon-box" aria-hidden="true"><svg class="tm-gold-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">${goldDefs("pm")}<g filter="url(#gold-shadow-pm)"><path d="M8 30C8 24 11 18 15 14M6 35C6 41 11 45 17 45M40 30C40 24 37 18 33 14M42 35C42 41 37 45 31 45" stroke="url(#gold-grad-pm)" stroke-width="2" stroke-linecap="round"/><path d="M24 18C21 14 15 13 9 14V36C15 35 21 36 24 40C27 36 33 35 39 36V14C33 13 27 14 24 18Z" fill="url(#gold-grad-pm)" fill-opacity="0.3" stroke="url(#gold-grad-pm)" stroke-width="2" stroke-linejoin="round"/><path d="M24 18V40" stroke="url(#gold-grad-pm)" stroke-width="2.2"/></g></svg></div><span class="tm-pillar-label">Mentorship</span></div><div class="tm-pillar-item"><div class="tm-pillar-icon-box" aria-hidden="true"><svg class="tm-gold-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">${goldDefs("ps")}<g filter="url(#gold-shadow-ps)"><rect x="10" y="13" width="28" height="20" rx="2" fill="url(#gold-grad-ps)" fill-opacity="0.3" stroke="url(#gold-grad-ps)" stroke-width="2"/><path d="M6 36C6 34 8 33 10 33H38C40 33 42 34 42 36H6Z" fill="url(#gold-grad-ps)" stroke="url(#gold-grad-ps)" stroke-width="1.8"/><rect x="14" y="23" width="3" height="6" rx="0.6" fill="#FFFDF5"/><rect x="20" y="19" width="3" height="10" rx="0.6" fill="#FFFDF5"/><rect x="26" y="16" width="3" height="13" rx="0.6" fill="#FFFDF5"/><rect x="32" y="22" width="3" height="7" rx="0.6" fill="#FFFDF5"/></g></svg></div><span class="tm-pillar-label">Tax Software</span></div><div class="tm-pillar-item"><div class="tm-pillar-icon-box" aria-hidden="true"><svg class="tm-gold-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">${goldDefs("pt")}<g filter="url(#gold-shadow-pt)"><path d="M24 12L42 20L24 28L6 20L24 12Z" fill="url(#gold-grad-pt)" fill-opacity="0.35" stroke="url(#gold-grad-pt)" stroke-width="2" stroke-linejoin="round"/><path d="M13 24V32C13 36 18 39 24 39C30 39 35 36 35 32V24" stroke="url(#gold-grad-pt)" stroke-width="2" stroke-linecap="round"/><path d="M38 22V32M36 32H40" stroke="url(#gold-grad-pt)" stroke-width="2" stroke-linecap="round"/></g></svg></div><span class="tm-pillar-label">Training</span></div><div class="tm-pillar-item"><div class="tm-pillar-icon-box" aria-hidden="true"><svg class="tm-gold-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">${goldDefs("pb")}<g filter="url(#gold-shadow-pb)"><path d="M9 38V19L17 13V38" fill="url(#gold-grad-pb)" fill-opacity="0.25" stroke="url(#gold-grad-pb)" stroke-width="1.8" stroke-linejoin="round"/><path d="M17 38V11L31 5V38" fill="url(#gold-grad-pb)" fill-opacity="0.35" stroke="url(#gold-grad-pb)" stroke-width="2" stroke-linejoin="round"/><path d="M31 38V18L39 23V38" fill="url(#gold-grad-pb)" fill-opacity="0.25" stroke="url(#gold-grad-pb)" stroke-width="1.8" stroke-linejoin="round"/><line x1="5" y1="38" x2="43" y2="38" stroke="url(#gold-grad-pb)" stroke-width="2.4" stroke-linecap="round"/></g></svg></div><span class="tm-pillar-label">Business Startup</span></div><div class="tm-pillar-item"><div class="tm-pillar-icon-box" aria-hidden="true"><svg class="tm-gold-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">${goldDefs("pe")}<g filter="url(#gold-shadow-pe)"><rect x="11" y="10" width="26" height="30" rx="2.5" fill="url(#gold-grad-pe)" fill-opacity="0.3" stroke="url(#gold-grad-pe)" stroke-width="2"/><rect x="17" y="7" width="14" height="6" rx="1.5" fill="url(#gold-grad-pe)" stroke="#FFFDF5" stroke-width="1.2"/><path d="M17 26L21 30L31 18" stroke="#FFFDF5" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></g></svg></div><span class="tm-pillar-label">Enrollment</span></div></div>
    </div>
  </section>

  <section class="tm-who-section">
    <div class="tm-container">
      <div class="tm-section-header">
        <h2 class="tm-section-title">Who <em>This Is For</em></h2>
        <p class="tm-section-subtitle">A results-focused mentorship for individuals ready to learn, sharpen their skills, and build a career or business in taxes.</p>
      </div>
      <div class="tm-who-grid"><div class="tm-who-card"><img src="https://vibe.filesafe.space/1795100135767119492/assets/adca5dd5-a91d-49d7-b0d8-5fc49165dc88.png" alt="Beginner tax professionals reference books" class="tm-who-img"><h3>Beginner Tax Professionals</h3></div><div class="tm-who-card"><img src="https://vibe.filesafe.space/1795100135767119492/assets/748c74ce-180b-4d79-a740-c26e3e40bb99.png" alt="Growing tax preparers growth chart" class="tm-who-img"><h3>Growing Preparers</h3></div><div class="tm-who-card"><img src="https://vibe.filesafe.space/1795100135767119492/assets/96172032-e3e2-4819-a28b-eb1b0391ed5e.png" alt="Aspiring business owners keys to new office" class="tm-who-img"><h3>Aspiring Business Owners</h3></div><div class="tm-who-card"><img src="https://vibe.filesafe.space/1795100135767119492/assets/029f635f-f016-47a6-a4fd-775004a2de88.png" alt="Structured training notebook and calendar" class="tm-who-img"><h3>Structured Training Seekers</h3></div></div>
    </div>
  </section>

  <section class="tm-includes-section">
    <div class="tm-container">
      <div class="tm-includes-grid">
        <div class="tm-includes-content">
          <p class="tm-includes-eyebrow">Inside the Mentorship</p>
          <h2 class="tm-includes-title">What the Program <em>Includes</em></h2>
          <p class="tm-includes-desc">A practical, hands-on mentorship experience designed to give you real knowledge, real tools, and real results.</p>
          <div class="tm-features-grid"><div class="tm-feature-item"><div class="tm-feature-icon" aria-hidden="true">${iconOpen}${featureIcons.hands}</div><div><h4>Hands-On Training</h4><p>Real-world instruction and practice to build your skills and confidence.</p></div></div><div class="tm-feature-item"><div class="tm-feature-icon" aria-hidden="true">${iconOpen}${featureIcons.growth}</div><div><h4>Business Development Guidance</h4><p>Strategies to launch, market, and grow a profitable tax business.</p></div></div><div class="tm-feature-item"><div class="tm-feature-icon" aria-hidden="true">${iconOpen}${featureIcons.laptop}</div><div><h4>Software Exposure</h4><p>Guidance on industry-leading tax software and workflow setup.</p></div></div><div class="tm-feature-item"><div class="tm-feature-icon" aria-hidden="true">${iconOpen}${featureIcons.headset}</div><div><h4>Ongoing Support</h4><p>Continued access to guidance, resources, and mentorship as you grow.</p></div></div></div>
        </div>
      </div>
    </div>
  </section>

  <section class="tm-learn-section">
    <div class="tm-container">
      <div class="tm-section-header">
        <h2 class="tm-section-title">What <em>You&rsquo;ll Learn</em></h2>
        <p class="tm-section-subtitle">A comprehensive learning experience that equips you with the knowledge, tools, and confidence to succeed in the tax industry.</p>
      </div>
      <div class="tm-learn-grid"><div class="tm-learn-card"><img src="https://vibe.filesafe.space/1795100135767119492/assets/577b13fb-269a-4bcd-b510-1acab73dc5a2.png" alt="Tax Preparation Foundations" class="tm-learn-img"><h3>Tax Preparation Foundations</h3></div><div class="tm-learn-card"><img src="https://vibe.filesafe.space/1795100135767119492/assets/d8a3f48c-2aca-44e2-9f1a-caed55465c0a.png" alt="Business Setup" class="tm-learn-img"><h3>Business Setup</h3></div><div class="tm-learn-card"><img src="https://vibe.filesafe.space/1795100135767119492/assets/917a42c3-0615-4871-a487-43a38f978b4c.png" alt="Client Acquisition" class="tm-learn-img"><h3>Client Acquisition</h3></div><div class="tm-learn-card"><img src="https://vibe.filesafe.space/1795100135767119492/assets/ddd12dff-82f4-40b9-b787-2020d193cdc0.png" alt="Systems & Compliance" class="tm-learn-img"><h3>Systems &amp; Compliance</h3></div><div class="tm-learn-card"><img src="https://vibe.filesafe.space/1795100135767119492/assets/db3b5783-8545-4b19-a5af-ecdc1835aadf.png" alt="Leadership & Confidence" class="tm-learn-img"><h3>Leadership &amp; Confidence</h3></div></div>
    </div>
  </section>

  <section class="tm-blueprint-section" aria-labelledby="tm-blueprint-title">
    <div class="tm-container">
      <div class="tm-blueprint-header">
        <p class="im-eyebrow">DRA Tax Gives You Everything You Need</p>
        <h2 id="tm-blueprint-title"><em>The Blueprint:</em> Everything You Need To Succeed</h2>
      </div>
      ${blueprintHtml}
    </div>
  </section>

  <section class="tm-pkgs-section" id="packages" aria-labelledby="tm-pkgs-title">
    <div class="tm-container">
      <div class="tm-section-header">
        <h2 class="tm-section-title" id="tm-pkgs-title">Software <em>Packages</em></h2>
        <p class="tm-section-subtitle">Explore the options and choose a package aligned with your tax business goals.</p>
      </div>
      <div class="tm-pkgs-grid"><article class="tm-pkg-card"><div class="tm-pkg-heading"><span>Beginner pathway</span><h3>Tier 1</h3><p>Start your tax preparation journey</p></div><div class="tm-pkg-body"><p>Explore professional tax software and a pathway for getting started in the tax industry.</p><h4>What to review</h4><ul><li>Tax preparation software and training</li><li>PTIN and EFIN requirements</li><li>Revenue-sharing terms</li><li>Setup and support options</li></ul><a class="tm-pkg-btn" href="https://thetaxadvisorandassociates.com/tier-1" target="_blank" rel="noopener noreferrer">View Package Details &rarr;</a></div></article><article class="tm-pkg-card"><div class="tm-pkg-heading"><span>Business growth pathway</span><h3>Tier 2</h3><p>Build your tax preparation business</p></div><div class="tm-pkg-body"><p>Explore a software package for professionals planning to operate and grow a tax business.</p><h4>What to review</h4><ul><li>Professional tax software and workflow</li><li>EFIN and PTIN requirements</li><li>Preparer access and fee arrangements</li><li>Business training and support</li></ul><a class="tm-pkg-btn" href="https://thetaxadvisorandassociates.com/tier-2" target="_blank" rel="noopener noreferrer">View Package Details &rarr;</a></div></article></div>
      <p class="tm-pkg-referral">When enrolling through the software provider, identify <strong>Deneshia Renee</strong> as your referral agent where requested. Confirm current pricing, eligibility and package terms with the provider.</p>
    </div>
  </section>

  <section class="tm-cta-section">
    <div class="tm-container">
      <h2 class="tm-cta-title">Ready to Build Your Tax <em>Career or Business?</em></h2>
      <p class="tm-cta-desc">Discuss your goals, training options and next steps for starting or growing your tax business.</p>
      <div class="tm-cta-actions">
        <a href="https://draw.downrightausomewealth.com/widget/booking/Eo6P4A5bLSnnPldXZ38e" class="tm-hero-btn-primary" target="_blank" rel="noopener noreferrer">Schedule a Consultation</a>
      </div>
    </div>
  </section>

  <div class="tm-faq-link"><p>Have questions? <a href="/faqs.html#tax-mentorship">View our FAQs</a></p></div>
</main>
`;

// --- assemble: style + main open + hero (from sections) + rest + footer ---
// Reconstruct: <style>...</style>\n<main class="tm-page">\n  [hero + sections + </main>] [footer]
// The footer is everything from the old </main> onward... but old html had </main> then footer.
// Extract the footer from oldHtml (after the first </main>).
const oldMainEnd = oldHtml.indexOf("</main>");
const oldAfterMain = oldHtml.slice(oldMainEnd); // includes </main>... but we already added </main>
// We want the footer block only (after </main>).
const footerBlock = oldAfterMain.replace(/^<\/main>/, "");

const newHtml = finalStyle + "\n" + mainOpen + sections + "\n" + footerBlock;

// Replace in raw
const updatedRaw = raw.slice(0, htmlStart) + newHtml + raw.slice(htmlEnd);
fs.writeFileSync(file, updatedRaw);

console.log("tax-mentorship html rebuilt. Old len:", oldHtml.length, "New len:", newHtml.length);
console.log("Blueprint items:", blueprint14.length);
console.log("Has hero block:", newHtml.includes('tm-hero-luxury'));
console.log("Has 14 blueprint:", (newHtml.match(/<article><span/g) || []).length);