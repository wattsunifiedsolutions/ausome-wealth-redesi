import fs from "node:fs";

const s = fs.readFileSync("src/content/dra-pages.ts", "utf8");

// 1. New clean crisp background without embedded text or dark washes
const NEW_HERO_BG = "https://vibe.filesafe.space/1795100135767119492/assets/33a65a23-0129-40b2-8ef8-05b63dcb732c.png";

// Dimensional champagne-gold SVG icons with realistic metallic highlights, bevels, and warm glow
const iconBook = `<svg class="tm-pillar-gold-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gold-bevel-1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF5" />
      <stop offset="25%" stop-color="#F2DDAD" />
      <stop offset="55%" stop-color="#D6B783" />
      <stop offset="85%" stop-color="#9C773B" />
      <stop offset="100%" stop-color="#6E5020" />
    </linearGradient>
    <linearGradient id="gold-sheen-1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#D6B783" stop-opacity="0.1" />
    </linearGradient>
    <filter id="gold-glow-1" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.45" />
    </filter>
  </defs>
  <g filter="url(#gold-glow-1)">
    <path d="M7 26C7 20 10 14 14 11M6 31C6 36 10 40 14 41M41 26C41 20 38 14 34 11M42 31C42 36 38 40 34 41" stroke="url(#gold-bevel-1)" stroke-width="1.6" stroke-linecap="round"/>
    <circle cx="7" cy="23" r="1.2" fill="#FFFDF5"/>
    <circle cx="41" cy="23" r="1.2" fill="#FFFDF5"/>
    <path d="M24 16C21 12.5 15.5 12 9 12.5V36C15.5 35.5 21 36 24 39C27 36 32.5 35.5 39 36V12.5C32.5 12 27 12.5 24 16Z" fill="url(#gold-bevel-1)" fill-opacity="0.28" stroke="url(#gold-bevel-1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M24 16V39" stroke="url(#gold-bevel-1)" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M13 18H20M13 22H20M13 26H18M28 18H35M28 22H35M28 26H33" stroke="url(#gold-sheen-1)" stroke-width="1.4" stroke-linecap="round"/>
    <polygon points="24,11 25.5,14 22.5,14" fill="#FFFDF5"/>
  </g>
</svg>`;

const iconSoftware = `<svg class="tm-pillar-gold-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gold-bevel-2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF5" />
      <stop offset="25%" stop-color="#F2DDAD" />
      <stop offset="55%" stop-color="#D6B783" />
      <stop offset="85%" stop-color="#9C773B" />
      <stop offset="100%" stop-color="#6E5020" />
    </linearGradient>
    <filter id="gold-glow-2" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.45" />
    </filter>
  </defs>
  <g filter="url(#gold-glow-2)">
    <rect x="10" y="12" width="28" height="19" rx="2" fill="url(#gold-bevel-2)" fill-opacity="0.25" stroke="url(#gold-bevel-2)" stroke-width="2"/>
    <rect x="13" y="15" width="22" height="13" rx="1" stroke="url(#gold-bevel-2)" stroke-width="0.9" stroke-opacity="0.7"/>
    <path d="M6 34C6 32.5 8 31 10 31H38C40 31 42 32.5 42 34H6Z" fill="url(#gold-bevel-2)" stroke="url(#gold-bevel-2)" stroke-width="1.8" stroke-linejoin="round"/>
    <line x1="21" y1="31" x2="27" y2="31" stroke="#FFFDF5" stroke-width="1.5" stroke-linecap="round"/>
    <rect x="15.5" y="22" width="3" height="4" rx="0.6" fill="#FFFDF5"/>
    <rect x="20.5" y="19" width="3" height="7" rx="0.6" fill="#FFFDF5"/>
    <rect x="25.5" y="17" width="3" height="9" rx="0.6" fill="#FFFDF5"/>
    <rect x="30.5" y="15" width="3" height="11" rx="0.6" fill="#FFFDF5"/>
  </g>
</svg>`;

const iconTraining = `<svg class="tm-pillar-gold-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gold-bevel-3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF5" />
      <stop offset="25%" stop-color="#F2DDAD" />
      <stop offset="55%" stop-color="#D6B783" />
      <stop offset="85%" stop-color="#9C773B" />
      <stop offset="100%" stop-color="#6E5020" />
    </linearGradient>
    <filter id="gold-glow-3" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.45" />
    </filter>
  </defs>
  <g filter="url(#gold-glow-3)">
    <path d="M7 26C7 20 10 14 14 11M6 31C6 36 10 40 14 41M41 26C41 20 38 14 34 11M42 31C42 36 38 40 34 41" stroke="url(#gold-bevel-3)" stroke-width="1.6" stroke-linecap="round"/>
    <polygon points="24,13 40,19 24,25 8,19" fill="url(#gold-bevel-3)" fill-opacity="0.32" stroke="url(#gold-bevel-3)" stroke-width="2" stroke-linejoin="round"/>
    <polygon points="24,15 36,19 24,23 12,19" stroke="#FFFDF5" stroke-width="0.8" fill="none" stroke-opacity="0.8"/>
    <path d="M14 22V28C14 32 18.5 35 24 35C29.5 35 34 32 34 28V22" stroke="url(#gold-bevel-3)" stroke-width="2" stroke-linecap="round"/>
    <path d="M37 19.5V28M35.5 28H38.5" stroke="url(#gold-bevel-3)" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="24" cy="19" r="1.5" fill="#FFFDF5"/>
  </g>
</svg>`;

const iconStartup = `<svg class="tm-pillar-gold-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gold-bevel-4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF5" />
      <stop offset="25%" stop-color="#F2DDAD" />
      <stop offset="55%" stop-color="#D6B783" />
      <stop offset="85%" stop-color="#9C773B" />
      <stop offset="100%" stop-color="#6E5020" />
    </linearGradient>
    <filter id="gold-glow-4" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.45" />
    </filter>
  </defs>
  <g filter="url(#gold-glow-4)">
    <path d="M9 37V19L17 13V37" fill="url(#gold-bevel-4)" fill-opacity="0.22" stroke="url(#gold-bevel-4)" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M17 37V12L31 6V37" fill="url(#gold-bevel-4)" fill-opacity="0.35" stroke="url(#gold-bevel-4)" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M31 37V18L39 23V37" fill="url(#gold-bevel-4)" fill-opacity="0.22" stroke="url(#gold-bevel-4)" stroke-width="1.8" stroke-linejoin="round"/>
    <line x1="6" y1="37" x2="42" y2="37" stroke="url(#gold-bevel-4)" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M21 14H27M21 18H27M21 22H27M21 26H27M21 30H27M12 22H15M12 26H15M12 30H15M34 26H37M34 30H37" stroke="#FFFDF5" stroke-width="1.4" stroke-linecap="round" opacity="0.9"/>
  </g>
</svg>`;

const iconEnrollment = `<svg class="tm-pillar-gold-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gold-bevel-5" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF5" />
      <stop offset="25%" stop-color="#F2DDAD" />
      <stop offset="55%" stop-color="#D6B783" />
      <stop offset="85%" stop-color="#9C773B" />
      <stop offset="100%" stop-color="#6E5020" />
    </linearGradient>
    <filter id="gold-glow-5" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.45" />
    </filter>
  </defs>
  <g filter="url(#gold-glow-5)">
    <path d="M7 26C7 20 10 14 14 11M6 31C6 36 10 40 14 41M41 26C41 20 38 14 34 11M42 31C42 36 38 40 34 41" stroke="url(#gold-bevel-5)" stroke-width="1.6" stroke-linecap="round"/>
    <rect x="12" y="11" width="24" height="28" rx="2.5" fill="url(#gold-bevel-5)" fill-opacity="0.26" stroke="url(#gold-bevel-5)" stroke-width="2"/>
    <rect x="18" y="8" width="12" height="5" rx="1.5" fill="url(#gold-bevel-5)" stroke="#FFFDF5" stroke-width="1.2"/>
    <path d="M18 25L22.5 29.5L30 19.5" stroke="#FFFDF5" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;

const tmStart = s.indexOf('"tax-mentorship": {');
const nextKey = s.indexOf('"interior-review": {', tmStart);
const tmSlice = s.slice(tmStart, nextKey);

const heroTarget = '<section class="tm-hero-luxury"';
const heroIdxRel = tmSlice.indexOf(heroTarget);
const whoTarget = '<section class="tm-who-section">';
const whoIdxRel = tmSlice.indexOf(whoTarget, heroIdxRel);

if (heroIdxRel === -1 || whoIdxRel === -1) {
  console.error("Targets not found:", { heroIdxRel, whoIdxRel });
  process.exit(1);
}

const heroIdxAbs = tmStart + heroIdxRel;
const whoIdxAbs = tmStart + whoIdxRel;

const heroAndPillars = [
  `<section class="tm-hero-luxury" aria-label="Tax Mentorship & Opportunities Overview">`,
  `  <div class="tm-hero-bg-layer" style="background-image: url('${NEW_HERO_BG}');"></div>`,
  `  <div class="tm-hero-luxury-inner tm-container">`,
  `    <h1 class="tm-hero-main-title">Tax Mentorship &amp;<span class="tm-hero-title-italic">Opportunities</span></h1>`,
  `    <p class="tm-hero-main-tagline">Training, tools, and business opportunities to help you build a profitable, long-term tax business.</p>`,
  `    <div class="tm-hero-main-actions">`,
  `      <a href="#packages" class="tm-hero-btn-primary">Explore Opportunities</a>`,
  `      <a href="https://draw.downrightausomewealth.com/widget/booking/Eo6P4A5bLSnnPldXZ38e" class="tm-hero-btn-secondary" target="_blank" rel="noopener noreferrer">Schedule a Consultation</a>`,
  `    </div>`,
  `  </div>`,
  `</section>`,
  `\\n\\n    <section class="tm-pillar-strip" aria-label="Opportunity Highlights">`,
  `      <div class="tm-container">`,
  `        <div class="tm-pillar-strip-grid">`,
  `          <div class="tm-pillar-item">`,
  `            <div class="tm-pillar-icon-box" aria-hidden="true">${iconBook.replace(/\r?\n\s*/g, " ")}</div>`,
  `            <span class="tm-pillar-label">Mentorship</span>`,
  `          </div>`,
  `          <div class="tm-pillar-item">`,
  `            <div class="tm-pillar-icon-box" aria-hidden="true">${iconSoftware.replace(/\r?\n\s*/g, " ")}</div>`,
  `            <span class="tm-pillar-label">Tax Software</span>`,
  `          </div>`,
  `          <div class="tm-pillar-item">`,
  `            <div class="tm-pillar-icon-box" aria-hidden="true">${iconTraining.replace(/\r?\n\s*/g, " ")}</div>`,
  `            <span class="tm-pillar-label">Training</span>`,
  `          </div>`,
  `          <div class="tm-pillar-item">`,
  `            <div class="tm-pillar-icon-box" aria-hidden="true">${iconStartup.replace(/\r?\n\s*/g, " ")}</div>`,
  `            <span class="tm-pillar-label">Business Startup</span>`,
  `          </div>`,
  `          <div class="tm-pillar-item">`,
  `            <div class="tm-pillar-icon-box" aria-hidden="true">${iconEnrollment.replace(/\r?\n\s*/g, " ")}</div>`,
  `            <span class="tm-pillar-label">Enrollment</span>`,
  `          </div>`,
  `        </div>`,
  `      </div>`,
  `    </section>\\n\\n    `
].join("");

let updated = s.slice(0, heroIdxAbs) + heroAndPillars + s.slice(whoIdxAbs);

fs.writeFileSync("src/content/dra-pages.ts", updated, "utf8");
console.log("Successfully updated hero and pillar strip in src/content/dra-pages.ts!");
