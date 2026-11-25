import { readFileSync, writeFileSync } from "node:fs";

const file = "src/content/dra-pages.ts";
let src = readFileSync(file, "utf8");

const p1 = src.indexOf("<style>\\n.dra-choice-panel");
if (p1 === -1) {
  console.error("p1 not found");
  process.exit(1);
}

const endSection = src.indexOf("</section>", p1);
if (endSection === -1) {
  console.error("endSection not found");
  process.exit(1);
}

const bannerImageUrl = "https://vibe.filesafe.space/1795100135767119492/attachments/ba9fe6d6-c717-48ba-a14f-6f10716cd8ac.png";

// Responsive banner section with exact image visual, clickable interactive overlay buttons, and responsive fallback for mobile
const replacement = `<style>
.dra-exact-banner-wrap{max-width:1160px;margin:32px auto 0;padding:0 20px;box-sizing:border-box}
.dra-exact-banner-card{position:relative;width:100%;border-radius:18px;overflow:hidden;box-shadow:0 12px 36px rgba(0,27,61,.12);border:1px solid #D6B783;background:#FAF7F2;box-sizing:border-box}
.dra-exact-banner-img{display:block;width:100%;height:auto;aspect-ratio:1920 / 830;object-fit:cover;pointer-events:none;user-select:none}
.dra-exact-banner-overlay{position:absolute;inset:0;z-index:2}
.dra-exact-btn-hit{position:absolute;display:flex;align-items:center;justify-content:center;text-decoration:none;border-radius:999px;font-family:Raleway,Montserrat,Arial,sans-serif;font-weight:700;font-size:16px;letter-spacing:.02em;transition:transform .2s ease,box-shadow .2s ease,filter .2s ease;cursor:pointer;outline:none}
.dra-exact-btn-hit:focus-visible{outline:3px solid #001B3D;outline-offset:2px}
.dra-exact-btn-hit:hover{transform:translateY(-2px);filter:brightness(1.06)}
.dra-exact-btn-diy{left:5.8%;bottom:12.8%;width:24.8%;height:10.5%;background:transparent}
.dra-exact-btn-dfy{left:37.2%;bottom:12.8%;width:27.2%;height:10.5%;background:transparent}
.dra-exact-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}

/* Mobile fallback: when the image text becomes small on mobile screens (< 768px), provide comfortable tap targets */
@media (max-width:767px){
  .dra-exact-btn-diy{left:4%;bottom:8%;width:44%;height:15%;background:rgba(214,183,131,0.2)}
  .dra-exact-btn-dfy{left:52%;bottom:8%;width:44%;height:15%;background:rgba(0,27,61,0.2)}
}
</style>

<div class="dra-exact-banner-wrap">
  <div class="dra-exact-banner-card">
    <img class="dra-exact-banner-img" src="${bannerImageUrl}" alt="Do It Yourself Credit Repair for $77 per month, or prefer we handle it all for you with full-service restoration beside a credit score wheel showing 720 Good score" width="1920" height="830" loading="lazy">
    <div class="dra-exact-banner-overlay" aria-label="Credit repair enrollment choices">
      <a class="dra-exact-btn-hit dra-exact-btn-diy" href="/credit-repair.html" aria-label="Get Started Now with Do It Yourself Credit Repair for $77 a month">
        <span class="dra-exact-sr-only">Get Started Now with Do It Yourself Credit Repair</span>
      </a>
      <a class="dra-exact-btn-hit dra-exact-btn-dfy" href="https://downrightausomewealth.com/cro-8784" aria-label="I Will Pay More To Have It Done For Me - Full Service Credit Restoration">
        <span class="dra-exact-sr-only">I Will Pay More To Have It Done For Me - Full Service Restoration</span>
      </a>
    </div>
  </div>
</div>\\n  </div>\\n`;

src = src.slice(0, p1) + replacement + src.slice(endSection);
writeFileSync(file, src, "utf8");
console.log("Replaced with exact banner image and interactive overlay!");
