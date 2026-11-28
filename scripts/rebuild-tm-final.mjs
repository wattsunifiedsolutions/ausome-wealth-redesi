import fs from "node:fs";

// Complete rebuild of the tax-mentorship entry with:
// - hero preserved (luxury corridor)
// - compact 5-icon strip (premium dimensional gold icons)
// - Who This Is For: images + titles only
// - Inside the Mentorship: 4 premium icon benefits (no photo)
// - What You'll Learn: 5 cards
// - The Blueprint: 14 original benefits
// - Software & Enrollment: compact Tier 1 / Tier 2 packages
// - Consultation + referral links preserved
// - Compact application CTA + FAQ link + footer
// All newlines properly escaped into the single-quoted JS string.

const file = "src/content/dra-pages.ts";
const raw = fs.readFileSync(file, "utf8");

const HERO_BG = "https://vibe.filesafe.space/1795100135767119492/assets/bd0e7810-52ff-4894-b043-f232382696c2.png";
const WHO_IMAGES = [
  "https://vibe.filesafe.space/1795100135767119492/assets/adca5dd5-a91d-49d7-b0d8-5fc49165dc88.png",
  "https://vibe.filesafe.space/1795100135767119492/assets/748c74ce-180b-4d79-a740-c26e3e40bb99.png",
  "https://vibe.filesafe.space/1795100135767119492/assets/96172032-e3e2-4819-a28b-eb1b0391ed5e.png",
  "https://vibe.filesafe.space/1795100135767119492/assets/029f635f-f016-47a6-a4fd-775004a2de88.png",
];
const LEARN_IMAGES = [
  "https://vibe.filesafe.space/1795100135767119492/assets/577b13fb-269a-4bcd-b510-1acab73dc5a2.png",
  "https://vibe.filesafe.space/1795100135767119492/assets/d8a3f48c-2aca-44e2-9f1a-caed55465c0a.png",
  "https://vibe.filesafe.space/1795100135767119492/assets/917a42c3-0615-4871-a487-43a38f978b4c.png",
  "https://vibe.filesafe.space/1795100135767119492/assets/ddd12dff-82f4-40b9-b787-2020d193cdc0.png",
  "https://vibe.filesafe.space/1795100135767119492/assets/db3b5783-8545-4b19-a5af-ecdc1835aadf.png",
];
const BOOKING_URL = "https://draw.downrightausomewealth.com/widget/booking/Eo6P4A5bLSnnPldXZ38e";
const TIER1_URL = "https://thetaxadvisorandassociates.com/tier-1";
const TIER2_URL = "https://thetaxadvisorandassociates.com/tier-2";

const goldDefs = (id) =>
  `<defs><linearGradient id="gold-grad-${id}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFFDF5"/><stop offset="25%" stop-color="#F2DDAD"/><stop offset="55%" stop-color="#D6B783"/><stop offset="85%" stop-color="#9C773B"/><stop offset="100%" stop-color="#6E5020"/></linearGradient><filter id="gold-shadow-${id}" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="1.6" flood-color="#0B192E" flood-opacity="0.35"/></filter></defs>`;

const svg = (id, inner) =>
  `<svg class="tm-gold-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">${goldDefs(id)}<g filter="url(#gold-shadow-${id})">${inner}</g></svg>`;

const ICONS = {
  mentorship: `<path d="M8 30C8 24 11 18 15 14M6 35C6 41 11 45 17 45M40 30C40 24 37 18 33 14M42 35C42 41 37 45 31 45" stroke="url(#gold-grad-pm)" stroke-width="2" stroke-linecap="round"/><path d="M24 18C21 14 15 13 9 14V36C15 35 21 36 24 40C27 36 33 35 39 36V14C33 13 27 14 24 18Z" fill="url(#gold-grad-pm)" fill-opacity="0.3" stroke="url(#gold-grad-pm)" stroke-width="2" stroke-linejoin="round"/><path d="M24 18V40" stroke="url(#gold-grad-pm)" stroke-width="2.2"/>`,
  software: `<rect x="10" y="13" width="28" height="20" rx="2" fill="url(#gold-grad-ps)" fill-opacity="0.3" stroke="url(#gold-grad-ps)" stroke-width="2"/><path d="M6 36C6 34 8 33 10 33H38C40 33 42 34 42 36H6Z" fill="url(#gold-grad-ps)" stroke="url(#gold-grad-ps)" stroke-width="1.8"/><rect x="14" y="23" width="3" height="6" rx="0.6" fill="#FFFDF5"/><rect x="20" y="19" width="3" height="10" rx="0.6" fill="#FFFDF5"/><rect x="26" y="16" width="3" height="13" rx="0.6" fill="#FFFDF5"/><rect x="32" y="22" width="3" height="7" rx="0.6" fill="#FFFDF5"/>`,
  training: `<path d="M24 12L42 20L24 28L6 20L24 12Z" fill="url(#gold-grad-pt)" fill-opacity="0.35" stroke="url(#gold-grad-pt)" stroke-width="2" stroke-linejoin="round"/><path d="M13 24V32C13 36 18 39 24 39C30 39 35 36 35 32V24" stroke="url(#gold-grad-pt)" stroke-width="2" stroke-linecap="round"/><path d="M38 22V32M36 32H40" stroke="url(#gold-grad-pt)" stroke-width="2" stroke-linecap="round"/>`,
  business: `<path d="M9 38V19L17 13V38" fill="url(#gold-grad-pb)" fill-opacity="0.25" stroke="url(#gold-grad-pb)" stroke-width="1.8" stroke-linejoin="round"/><path d="M17 38V11L31 5V38" fill="url(#gold-grad-pb)" fill-opacity="0.35" stroke="url(#gold-grad-pb)" stroke-width="2" stroke-linejoin="round"/><path d="M31 38V18L39 23V38" fill="url(#gold-grad-pb)" fill-opacity="0.25" stroke="url(#gold-grad-pb)" stroke-width="1.8" stroke-linejoin="round"/><line x1="5" y1="38" x2="43" y2="38" stroke="url(#gold-grad-pb)" stroke-width="2.4" stroke-linecap="round"/>`,
  enrollment: `<rect x="11" y="10" width="26" height="30" rx="2.5" fill="url(#gold-grad-pe)" fill-opacity="0.3" stroke="url(#gold-grad-pe)" stroke-width="2"/><rect x="17" y="7" width="14" height="6" rx="1.5" fill="url(#gold-grad-pe)" stroke="#FFFDF5" stroke-width="1.2"/><path d="M17 26L21 30L31 18" stroke="#FFFDF5" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`,
  hands: `<circle cx="24" cy="13" r="6" fill="url(#gold-grad-fh)" fill-opacity="0.35" stroke="url(#gold-grad-fh)" stroke-width="2"/><path d="M12 38C12 30 17 25 24 25C31 25 36 30 36 38" stroke="url(#gold-grad-fh)" stroke-width="2.2" stroke-linecap="round"/><path d="M29 34L34 29M34 29L37 32M34 29L37 26" stroke="url(#gold-grad-fh)" stroke-width="2" stroke-linecap="round"/>`,
  growth: `<line x1="8" y1="40" x2="42" y2="40" stroke="url(#gold-grad-fg)" stroke-width="2.4" stroke-linecap="round"/><rect x="12" y="30" width="6" height="8" fill="url(#gold-grad-fg)" fill-opacity="0.4" stroke="url(#gold-grad-fg)" stroke-width="1.6"/><rect x="22" y="24" width="6" height="14" fill="url(#gold-grad-fg)" fill-opacity="0.55" stroke="url(#gold-grad-fg)" stroke-width="1.6"/><rect x="32" y="16" width="6" height="22" fill="url(#gold-grad-fg)" fill-opacity="0.7" stroke="url(#gold-grad-fg)" stroke-width="1.6"/><path d="M10 20L20 14L28 17L40 8" stroke="url(#gold-grad-fg)" stroke-width="2.2" stroke-linecap="round"/><path d="M34 8H40V14" stroke="url(#gold-grad-fg)" stroke-width="2.2" stroke-linecap="round"/>`,
  laptop: `<rect x="7" y="10" width="34" height="23" rx="2" fill="url(#gold-grad-fl)" fill-opacity="0.3" stroke="url(#gold-grad-fl)" stroke-width="2"/><path d="M4 37C4 35 6 34 8 34H40C42 34 44 35 44 37H4Z" fill="url(#gold-grad-fl)" stroke="url(#gold-grad-fl)" stroke-width="1.8"/><circle cx="24" cy="21" r="5" stroke="url(#gold-grad-fl)" stroke-width="2"/><path d="M24 13V17M24 25V29M16 21H20M28 21H32" stroke="url(#gold-grad-fl)" stroke-width="1.8" stroke-linecap="round"/>`,
  headset: `<path d="M10 30V24C10 16 16 10 24 10C32 10 38 16 38 24V30" stroke="url(#gold-grad-fs)" stroke-width="2.2" stroke-linecap="round"/><rect x="7" y="28" width="7" height="12" rx="3" fill="url(#gold-grad-fs)" fill-opacity="0.4" stroke="url(#gold-grad-fs)" stroke-width="1.8"/><rect x="34" y="28" width="7" height="12" rx="3" fill="url(#gold-grad-fs)" fill-opacity="0.4" stroke="url(#gold-grad-fs)" stroke-width="1.8"/><path d="M38 36C38 39 34 41 30 41" stroke="url(#gold-grad-fs)" stroke-width="2" stroke-linecap="round"/><circle cx="29" cy="41" r="1.5" fill="url(#gold-grad-fs)"/>`,
};

const pillarItems = [
  { icon: "mentorship", label: "Mentorship", id: "pm" },
  { icon: "software", label: "Tax Software", id: "ps" },
  { icon: "training", label: "Training", id: "pt" },
  { icon: "business", label: "Business Startup", id: "pb" },
  { icon: "enrollment", label: "Enrollment", id: "pe" },
];

const whoItems = [
  { img: WHO_IMAGES[0], alt: "Beginner tax professionals reference books", title: "Beginner Tax Professionals" },
  { img: WHO_IMAGES[1], alt: "Growing tax preparers growth chart", title: "Growing Preparers" },
  { img: WHO_IMAGES[2], alt: "Aspiring business owners keys to new office", title: "Aspiring Business Owners" },
  { img: WHO_IMAGES[3], alt: "Structured training notebook and calendar", title: "Structured Training Seekers" },
];

const featureItems = [
  { icon: "hands", id: "fh", title: "Hands-On Training", desc: "Real-world instruction and practice to build your skills and confidence." },
  { icon: "growth", id: "fg", title: "Business Development Guidance", desc: "Strategies to launch, market, and grow a profitable tax business." },
  { icon: "laptop", id: "fl", title: "Software Exposure", desc: "Guidance on industry-leading tax software and workflow setup." },
  { icon: "headset", id: "fs", title: "Ongoing Support", desc: "Continued access to guidance, resources, and mentorship as you grow." },
];

const learnItems = [
  { img: LEARN_IMAGES[0], alt: "Tax Preparation Foundations", title: "Tax Preparation Foundations" },
  { img: LEARN_IMAGES[1], alt: "Business Setup", title: "Business Setup" },
  { img: LEARN_IMAGES[2], alt: "Client Acquisition", title: "Client Acquisition" },
  { img: LEARN_IMAGES[3], alt: "Systems & Compliance", title: "Systems & Compliance" },
  { img: LEARN_IMAGES[4], alt: "Leadership & Confidence", title: "Leadership & Confidence" },
];

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

const css = `
.tm-page { background-color: #FAF8F5; color: #001B3D; font-family: 'Raleway', sans-serif; overflow-x: hidden; padding: 0; margin: 0; }
.tm-page h1, .tm-page h2, .tm-page h3, .tm-page .tm-serif { font-family: 'Noto Serif Display', Georgia, serif; }
.tm-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

/* Hero */
.tm-hero-luxury { position: relative; min-height: 560px; display: flex; align-items: center; justify-content: center; text-align: center; overflow: hidden; background-color: #0B1F3A; }
.tm-hero-bg-layer { position: absolute; inset: 0; background-size: cover; background-position: center; background-repeat: no-repeat; }
.tm-hero-luxury-inner { position: relative; z-index: 2; padding: 110px 24px 90px; max-width: 900px; }
.tm-hero-main-title { font-size: 58px; line-height: 1.1; color: #FFFFFF; font-weight: 700; margin: 0 0 18px; text-shadow: 0 2px 14px rgba(0,0,0,0.55); }
.tm-hero-title-italic { display: block; font-style: italic; color: #E9C987; font-weight: 500; }
.tm-hero-main-tagline { font-size: 18px; line-height: 1.6; color: #F5F1E8; margin: 0 auto 32px; max-width: 620px; text-shadow: 0 2px 10px rgba(0,0,0,0.5); }
.tm-hero-main-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.tm-hero-btn-primary { display: inline-flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #F0D6A0 0%, #D6B783 55%, #B89657 100%); color: #001B3D; font-weight: 700; font-size: 14px; letter-spacing: 0.5px; padding: 14px 30px; border-radius: 8px; text-decoration: none; border: 1px solid rgba(255,255,255,0.35); transition: transform .25s ease, box-shadow .25s ease; }
.tm-hero-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 22px rgba(0,0,0,0.3); }
.tm-hero-btn-secondary { display: inline-flex; align-items: center; justify-content: center; background: #001B3D; color: #F5F1E8; font-weight: 600; font-size: 14px; letter-spacing: 0.5px; padding: 14px 30px; border-radius: 8px; text-decoration: none; border: 1px solid rgba(214,183,131,0.7); transition: transform .25s ease, box-shadow .25s ease, background .25s ease; }
.tm-hero-btn-secondary:hover { background: #0A2B57; transform: translateY(-2px); }

/* Pillar strip — compact */
.tm-pillar-strip { background-color: #001B3D; border-top: 1px solid rgba(214,183,131,0.3); border-bottom: 1px solid rgba(214,183,131,0.3); padding: 18px 0; }
.tm-pillar-strip-grid { display: grid; grid-template-columns: repeat(5, 1fr); align-items: center; max-width: 1080px; margin: 0 auto; }
.tm-pillar-item { display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center; padding: 4px 12px; border-right: 1px solid rgba(214,183,131,0.35); }
.tm-pillar-item:last-child { border-right: none; }
.tm-pillar-icon-box { display: flex; align-items: center; justify-content: center; }
.tm-gold-svg { width: 34px; height: 34px; }
.tm-pillar-label { color: #F5F1E8; font-size: 12px; font-weight: 600; letter-spacing: 0.3px; }

/* Section headers */
.tm-section-header { text-align: center; max-width: 720px; margin: 0 auto 36px; }
.tm-section-title { font-size: 40px; font-weight: 700; color: #001B3D; margin: 0 0 12px; }
.tm-section-title em { font-style: italic; color: #A99369; }
.tm-section-subtitle { font-size: 15.5px; line-height: 1.65; color: #33404F; margin: 0; }

/* Who This Is For */
.tm-who-section { padding: 64px 0; background-color: #FAF8F5; }
.tm-who-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; }
.tm-who-card { background-color: #FFFFFF; border: 1px solid rgba(169,147,105,0.35); border-radius: 12px; overflow: hidden; text-align: center; padding-bottom: 18px; transition: transform .28s ease, box-shadow .28s ease; }
.tm-who-card:hover { transform: translateY(-5px); box-shadow: 0 14px 28px rgba(0,0,0,0.10); }
.tm-who-img { width: 100%; height: 160px; object-fit: cover; display: block; }
.tm-who-card h3 { font-size: 19px; font-weight: 700; color: #001B3D; margin: 16px 14px 0; }

/* Inside the Mentorship — 4 icon benefits, no photo */
.tm-includes-section { padding: 64px 0; background-color: #FAF8F5; }
.tm-includes-grid { display: grid; grid-template-columns: 1fr; gap: 0; }
.tm-includes-eyebrow { font-size: 12px; letter-spacing: 2.2px; text-transform: uppercase; color: #A99369; font-weight: 700; margin: 0 0 10px; text-align: center; }
.tm-includes-title { font-size: 36px; font-weight: 700; color: #001B3D; margin: 0 0 14px; text-align: center; }
.tm-includes-title em { font-style: italic; color: #A99369; }
.tm-includes-desc { font-size: 15px; line-height: 1.65; color: #33404F; margin: 0 0 30px; text-align: center; max-width: 640px; margin-left: auto; margin-right: auto; }
.tm-features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px 28px; }
.tm-feature-item { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 10px; }
.tm-feature-icon { flex: 0 0 42px; width: 42px; height: 42px; border-radius: 10px; background-color: #F7F0E2; border: 1px solid rgba(169,147,105,0.4); display: flex; align-items: center; justify-content: center; color: #A99369; }
.tm-feature-icon svg { width: 22px; height: 22px; }
.tm-feature-item h4 { font-size: 15px; font-weight: 700; color: #001B3D; margin: 0 0 4px; font-family: 'Raleway', sans-serif; }
.tm-feature-item p { font-size: 13px; line-height: 1.55; color: #33404F; margin: 0; }

/* What You'll Learn */
.tm-learn-section { padding: 64px 0; background-color: #FAF8F5; }
.tm-learn-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
.tm-learn-card { background-color: #FFFFFF; border: 1px solid rgba(169,147,105,0.35); border-radius: 12px; padding: 22px 16px; text-align: center; transition: transform .28s ease, box-shadow .28s ease; }
.tm-learn-card:hover { transform: translateY(-5px); box-shadow: 0 14px 28px rgba(0,0,0,0.10); }
.tm-learn-card h3 { font-size: 16px; font-weight: 700; color: #001B3D; margin: 0; }
.tm-learn-img { width: 44px; height: 44px; margin: 0 auto 12px; object-fit: contain; }

/* Blueprint — 14 items */
.tm-blueprint-section { padding: 64px 0; background-color: #001B3D; color: #F5F1E8; position: relative; overflow: hidden; }
.tm-blueprint-section::before, .tm-blueprint-section::after { content: ''; position: absolute; width: 260px; height: 260px; border: 1px solid rgba(214,183,131,0.35); transform: rotate(45deg); }
.tm-blueprint-section::before { top: -180px; left: -140px; }
.tm-blueprint-section::after { bottom: -180px; right: -140px; }
.tm-blueprint-header { text-align: center; margin-bottom: 34px; }
.tm-blueprint-header .im-eyebrow { font-size: 12px; letter-spacing: 2.6px; text-transform: uppercase; color: #D6B783; font-weight: 700; margin: 0 0 10px; }
.tm-blueprint-header h2 { font-size: 38px; font-weight: 700; color: #FFFFFF; margin: 0; }
.tm-blueprint-header h2 em { font-style: italic; color: #D6B783; }
.tm-compact-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 18px; position: relative; z-index: 2; }
.tm-compact-grid article { background-color: rgba(255,255,255,0.05); border: 1px solid rgba(214,183,131,0.35); border-radius: 12px; padding: 18px 14px; text-align: center; }
.tm-compact-grid span { display: inline-flex; width: 24px; height: 24px; align-items: center; justify-content: center; border-radius: 50%; background-color: #D6B783; color: #001B3D; font-weight: 700; font-size: 13px; margin-bottom: 8px; }
.tm-compact-grid h3 { font-size: 14px; font-weight: 700; color: #FFFFFF; margin: 0 0 6px; line-height: 1.3; }
.tm-compact-grid p { font-size: 11.5px; line-height: 1.5; color: #C9D3E0; margin: 0; }

/* Software & Enrollment */
.tm-pkgs-section { padding: 64px 0; background-color: #FAF8F5; }
.tm-pkgs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 26px; max-width: 980px; margin: 0 auto; }
.tm-pkg-card { background-color: #FFFFFF; border: 1px solid rgba(169,147,105,0.4); border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; transition: transform .28s ease, box-shadow .28s ease; }
.tm-pkg-card:hover { transform: translateY(-5px); box-shadow: 0 16px 34px rgba(0,0,0,0.12); }
.tm-pkg-heading { background-color: #001B3D; padding: 20px 24px; border-bottom: 2px solid #D6B783; }
.tm-pkg-heading span { font-size: 11.5px; letter-spacing: 1.6px; text-transform: uppercase; color: #D6B783; font-weight: 700; }
.tm-pkg-heading h3 { font-size: 26px; color: #FFFFFF; font-weight: 700; margin: 4px 0 4px; }
.tm-pkg-heading p { font-size: 13.5px; color: #C9D3E0; margin: 0; }
.tm-pkg-body { padding: 22px 24px 26px; display: flex; flex-direction: column; flex: 1; }
.tm-pkg-body > p { font-size: 14px; line-height: 1.6; color: #33404F; margin: 0 0 16px; }
.tm-pkg-body h4 { font-size: 12px; letter-spacing: 1.4px; text-transform: uppercase; color: #A99369; font-weight: 700; margin: 0 0 10px; }
.tm-pkg-body ul { list-style: none; padding: 0; margin: 0 0 22px; }
.tm-pkg-body li { font-size: 13.5px; line-height: 1.5; color: #33404F; padding-left: 22px; position: relative; margin-bottom: 8px; }
.tm-pkg-body li::before { content: '\\2713'; position: absolute; left: 0; color: #A99369; font-weight: 700; }
.tm-pkg-btn { margin-top: auto; display: inline-flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #F0D6A0 0%, #D6B783 55%, #B89657 100%); color: #001B3D; font-weight: 700; font-size: 14px; padding: 13px 26px; border-radius: 8px; text-decoration: none; border: 1px solid rgba(255,255,255,0.3); transition: transform .25s ease, box-shadow .25s ease; }
.tm-pkg-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 22px rgba(0,0,0,0.18); }
.tm-pkg-referral { text-align: center; font-size: 12.5px; color: #5A6675; max-width: 760px; margin: 22px auto 0; }

/* Application CTA */
.tm-cta-section { background-color: #001B3D; padding: 56px 0; position: relative; overflow: hidden; }
.tm-cta-section::before { content: ''; position: absolute; top: -140px; right: -120px; width: 240px; height: 240px; border: 1px solid rgba(214,183,131,0.35); transform: rotate(45deg); }
.tm-cta-title { font-size: 34px; font-weight: 700; color: #FFFFFF; margin: 0 0 12px; text-align: center; }
.tm-cta-title em { font-style: italic; color: #D6B783; }
.tm-cta-desc { font-size: 15px; line-height: 1.6; color: #C9D3E0; max-width: 640px; margin: 0 auto 28px; text-align: center; }
.tm-cta-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

.tm-faq-link { text-align: center; padding: 26px 24px 44px; background-color: #FAF8F5; }
.tm-faq-link p { margin: 0; font-size: 14px; color: #33404F; }
.tm-faq-link a { color: #001B3D; font-weight: 700; text-decoration: none; border-bottom: 2px solid #D6B783; padding-bottom: 2px; }
.tm-faq-link a:hover { color: #A99369; }

/* Footer */
.dra-footer { background-color: #001B3D; }

/* Responsive */
@media (max-width: 1024px) {
  .tm-hero-main-title { font-size: 46px; }
  .tm-who-grid { grid-template-columns: repeat(2, 1fr); }
  .tm-learn-grid { grid-template-columns: repeat(3, 1fr); }
  .tm-features-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
  .tm-compact-grid { grid-template-columns: repeat(4, 1fr); }
  .tm-pillar-strip-grid { grid-template-columns: repeat(3, 1fr); row-gap: 18px; }
  .tm-pillar-item:nth-child(3) { border-right: none; }
}
@media (max-width: 640px) {
  .tm-hero-luxury-inner { padding: 84px 20px 70px; }
  .tm-hero-main-title { font-size: 34px; }
  .tm-hero-title-italic { font-size: 36px; }
  .tm-hero-main-tagline { font-size: 15px; }
  .tm-hero-main-actions { flex-direction: column; align-items: stretch; }
  .tm-who-grid { grid-template-columns: 1fr; }
  .tm-learn-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .tm-features-grid { grid-template-columns: 1fr; }
  .tm-compact-grid { grid-template-columns: repeat(2, 1fr); }
  .tm-pkgs-grid { grid-template-columns: 1fr; }
  .tm-pillar-strip-grid { grid-template-columns: repeat(2, 1fr); }
  .tm-pillar-item:nth-child(3) { border-right: 1px solid rgba(214,183,131,0.35); }
  .tm-pillar-item:nth-child(2n) { border-right: none; }
  .tm-section-title { font-size: 30px; }
  .tm-includes-title { font-size: 28px; }
  .tm-blueprint-header h2 { font-size: 30px; }
  .tm-cta-title { font-size: 27px; }
}
`;

const html = `<style>${css}</style>
<main class="tm-page">
  <section class="tm-hero-luxury" aria-label="Tax Mentorship & Opportunities Overview">
    <div class="tm-hero-bg-layer" style="background-image: url('${HERO_BG}');"></div>
    <div class="tm-hero-luxury-inner tm-container">
      <h1 class="tm-hero-main-title">Tax Mentorship &<span class="tm-hero-title-italic">Opportunities</span></h1>
      <p class="tm-hero-main-tagline">Training, tools, and business opportunities to help you build a profitable, long-term tax business.</p>
      <div class="tm-hero-main-actions">
        <a href="#packages" class="tm-hero-btn-primary">Explore Opportunities</a>
        <a href="${BOOKING_URL}" class="tm-hero-btn-secondary" target="_blank" rel="noopener noreferrer">Schedule a Consultation</a>
      </div>
    </div>
  </section>

  <section class="tm-pillar-strip" aria-label="Opportunity Highlights">
    <div class="tm-container">
      <div class="tm-pillar-strip-grid">${pillarItems
        .map(
          (p) =>
            `<div class="tm-pillar-item"><div class="tm-pillar-icon-box" aria-hidden="true">${svg(p.id, ICONS[p.icon])}</div><span class="tm-pillar-label">${p.label}</span></div>`,
        )
        .join("")}</div>
    </div>
  </section>

  <section class="tm-who-section">
    <div class="tm-container">
      <div class="tm-section-header">
        <h2 class="tm-section-title">Who <em>This Is For</em></h2>
        <p class="tm-section-subtitle">A results-focused mentorship for individuals ready to learn, sharpen their skills, and build a career or business in taxes.</p>
      </div>
      <div class="tm-who-grid">${whoItems
        .map(
          (w) =>
            `<div class="tm-who-card"><img src="${w.img}" alt="${w.alt}" class="tm-who-img"><h3>${w.title}</h3></div>`,
        )
        .join("")}</div>
    </div>
  </section>

  <section class="tm-includes-section">
    <div class="tm-container">
      <div class="tm-includes-grid">
        <div class="tm-includes-content">
          <p class="tm-includes-eyebrow">Inside the Mentorship</p>
          <h2 class="tm-includes-title">What the Program <em>Includes</em></h2>
          <p class="tm-includes-desc">A practical, hands-on mentorship experience designed to give you real knowledge, real tools, and real results.</p>
          <div class="tm-features-grid">${featureItems
            .map(
              (f) =>
                `<div class="tm-feature-item"><div class="tm-feature-icon" aria-hidden="true">${svg(f.id, ICONS[f.icon])}</div><div><h4>${f.title}</h4><p>${f.desc}</p></div></div>`,
            )
            .join("")}</div>
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
      <div class="tm-learn-grid">${learnItems
        .map(
          (l) =>
            `<div class="tm-learn-card"><img src="${l.img}" alt="${l.alt}" class="tm-learn-img"><h3>${l.title}</h3></div>`,
        )
        .join("")}</div>
    </div>
  </section>

  <section class="tm-blueprint-section" aria-labelledby="tm-blueprint-title">
    <div class="tm-container">
      <div class="tm-blueprint-header">
        <p class="im-eyebrow">DRA Tax Gives You Everything You Need</p>
        <h2 id="tm-blueprint-title"><em>The Blueprint:</em> Everything You Need To Succeed</h2>
      </div>
      <div class="tm-compact-grid">${blueprint14
        .map(
          ([title, desc]) =>
            `<article><span aria-hidden="true">&#10003;</span><h3>${title}</h3><p>${desc}</p></article>`,
        )
        .join("")}</div>
    </div>
  </section>

  <section class="tm-pkgs-section" id="packages" aria-labelledby="tm-pkgs-title">
    <div class="tm-container">
      <div class="tm-section-header">
        <h2 class="tm-section-title" id="tm-pkgs-title">Software <em>Packages</em></h2>
        <p class="tm-section-subtitle">Explore the options and choose a package aligned with your tax business goals.</p>
      </div>
      <div class="tm-pkgs-grid"><article class="tm-pkg-card"><div class="tm-pkg-heading"><span>Beginner pathway</span><h3>Tier 1</h3><p>Start your tax preparation journey</p></div><div class="tm-pkg-body"><p>Explore professional tax software and a pathway for getting started in the tax industry.</p><h4>What to review</h4><ul><li>Tax preparation software and training</li><li>PTIN and EFIN requirements</li><li>Revenue-sharing terms</li><li>Setup and support options</li></ul><a class="tm-pkg-btn" href="${TIER1_URL}" target="_blank" rel="noopener noreferrer">View Package Details &rarr;</a></div></article><article class="tm-pkg-card"><div class="tm-pkg-heading"><span>Business growth pathway</span><h3>Tier 2</h3><p>Build your tax preparation business</p></div><div class="tm-pkg-body"><p>Explore a software package for professionals planning to operate and grow a tax business.</p><h4>What to review</h4><ul><li>Professional tax software and workflow</li><li>EFIN and PTIN requirements</li><li>Preparer access and fee arrangements</li><li>Business training and support</li></ul><a class="tm-pkg-btn" href="${TIER2_URL}" target="_blank" rel="noopener noreferrer">View Package Details &rarr;</a></div></article></div>
      <p class="tm-pkg-referral">When enrolling through the software provider, identify <strong>Deneshia Renee</strong> as your referral agent where requested. Confirm current pricing, eligibility and package terms with the provider.</p>
    </div>
  </section>

  <section class="tm-cta-section">
    <div class="tm-container">
      <h2 class="tm-cta-title">Ready to Build Your Tax <em>Career or Business?</em></h2>
      <p class="tm-cta-desc">Discuss your goals, training options and next steps for starting or growing your tax business.</p>
      <div class="tm-cta-actions">
        <a href="${BOOKING_URL}" class="tm-hero-btn-primary" target="_blank" rel="noopener noreferrer">Schedule a Consultation</a>
      </div>
    </div>
  </section>

  <div class="tm-faq-link"><p>Have questions? <a href="/faqs.html#tax-mentorship">View our FAQs</a></p></div>
</main>

<footer class="dra-footer">
  <div class="dra-footer-inner" style="max-width:1200px;margin:0 auto;padding:48px 24px 28px;text-align:center;color:#94a3b8;font-size:13px;border-top:1px solid rgba(214,183,131,0.2);background:#001B3D;">
    <p style="margin:0 0 8px;color:#cbd5e1;">&copy; 2026 DRA Tax & Financial Solutions / Down Right Ausome Wealth. All rights reserved.</p>
    <p style="margin:0;font-size:11.5px;color:#64748b;">No outcome, tax refund amount, or business revenue is guaranteed. Results depend on individual effort and market conditions.</p>
  </div>
</footer>`;

const htmlEscaped = html.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, "\\n");

const entry = `  "tax-mentorship": {
    title: "Tax Mentorship & Opportunities | Down Right Ausome Wealth",
    css: "/styles.css",
    html: '${htmlEscaped}',
  },
`;

const tmStart = raw.indexOf('"tax-mentorship": {');
const nextKey = raw.indexOf('"interior-review": {', tmStart);
if (tmStart === -1 || nextKey === -1) {
  console.error("Could not locate tax-mentorship entry boundaries");
  process.exit(1);
}

const updated = raw.slice(0, tmStart) + entry + raw.slice(nextKey);
fs.writeFileSync(file, updated, "utf8");
console.log("Tax mentorship rebuilt. Blueprint items:", blueprint14.length);
console.log("html length:", htmlEscaped.length);
