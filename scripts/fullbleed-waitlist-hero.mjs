import { readFileSync, writeFileSync } from "fs";

const pagesPath = "src/content/dra-pages.ts";
let src = readFileSync(pagesPath, "utf8");

// --- Replace the hero CSS ---
const oldCss = `.wl-hero{display:grid;grid-template-columns:1.05fr .95fr;background:var(--ivory);overflow:hidden}\\n.wl-hero-copy{padding:72px 56px;display:flex;flex-direction:column;justify-content:center;align-items:flex-start}\\n.wl-hero-copy h1{font-size:48px;margin:12px 0;color:var(--navy);max-width:520px}\\n.wl-hero-copy h1 em{color:var(--gold);font-style:italic}\\n.wl-hero-copy p{max-width:480px;font-size:18px;color:var(--navy)}\\n.wl-hero-media{min-height:460px}\\n.wl-hero-media img{display:block;width:100%;height:100%;object-fit:cover;object-position:center 20%}`;

const newCss = `.wl-hero{position:relative;display:flex;align-items:center;justify-content:center;min-height:600px;background:url('https://vibe.filesafe.space/1795100135767119492/attachments/690a2214-aacb-493a-ae24-b7960ad70bc7.png') center center/cover no-repeat;overflow:hidden;text-align:center}\\n.wl-hero::before{content:'';position:absolute;inset:0;background:rgba(0,24,61,.45)}\\n.wl-hero-inner{position:relative;z-index:1;max-width:680px;padding:80px 40px;display:flex;flex-direction:column;align-items:center;gap:18px}\\n.wl-hero-inner .eyebrow{color:var(--gold);border-bottom:2px solid var(--gold);display:inline-block;padding-bottom:6px;letter-spacing:3px;font-size:13px;font-weight:700;text-transform:uppercase}\\n.wl-hero-inner h1{font-size:52px;margin:6px 0;color:#fff;max-width:600px;line-height:1.15}\\n.wl-hero-inner h1 em{color:var(--gold);font-style:italic}\\n.wl-hero-inner p{max-width:480px;font-size:19px;color:rgba(255,255,255,.92);line-height:1.5}\\n.wl-hero-btn{display:inline-flex;align-items:center;gap:8px;background:var(--gold);color:var(--navy);border:0;text-decoration:none;padding:16px 36px;border-radius:999px;font-weight:700;font-size:16px;cursor:pointer;margin-top:10px;transition:background .24s ease,color .24s ease,transform .28s ease}\\n.wl-hero-btn:hover{background:#fff;color:var(--navy);transform:translateY(-2px)}\\n@media (max-width:760px){.wl-hero{min-height:480px}.wl-hero-inner{padding:48px 24px}.wl-hero-inner h1{font-size:34px}.wl-hero-inner p{font-size:17px}}`;

if (!src.includes(oldCss)) {
  console.error("ERROR: hero CSS block not found");
  process.exit(1);
}
src = src.replace(oldCss, newCss);

// --- Replace the hero HTML ---
const oldHero = `<section class="wl-hero"><div class="wl-hero-copy"><div class="eyebrow" style="color:var(--navy);border-bottom:3px solid var(--gold);display:inline-block;padding-bottom:6px;letter-spacing:3px;font-size:13px;font-weight:700;text-transform:uppercase">2027 Tax Season</div><h1>More than tax preparation. <em>A plan for what&rsquo;s next.</em></h1><p>Join the VIP waitlist to receive service updates and a notification when tax appointments open for the 2027 season.</p></div><div class="wl-hero-media"><img src="https://vibe.filesafe.space/1795100135767119492/attachments/690a2214-aacb-493a-ae24-b7960ad70bc7.png" alt="Tax planning documents, laptop, and financial calculator on a desk" fetchpriority="high"></div></section>`;

const newHero = `<section class="wl-hero"><div class="wl-hero-inner"><div class="eyebrow">2027 Tax Season</div><h1>More than tax preparation. <em>A plan for what&rsquo;s next.</em></h1><p>Join the VIP waitlist to receive service updates and a notification when tax appointments open for the 2027 season.</p><a class="wl-hero-btn" href="#waitlist-form">Join the VIP Waitlist &rarr;</a></div></section>`;

if (!src.includes(oldHero)) {
  console.error("ERROR: hero HTML block not found");
  process.exit(1);
}
src = src.replace(oldHero, newHero);

writeFileSync(pagesPath, src);
console.log("done. hero converted to full-bleed background with overlay button.");