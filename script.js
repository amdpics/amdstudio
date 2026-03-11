// ---- HERO IMAGE ----
// HERO_IMG extracted → images/hero.jpg
// Hero background is now a <video> element

// ---- ROUTING ----
function goTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  const navEl = document.getElementById('nav-' + page);
  if (navEl) navEl.classList.add('active');
  window.scrollTo(0, 0);
}

// ---- GALLERY TABS ----
const galleryContent = {
  cars: [
    {icon:'',sub:'Automotive',label:'AI Commercial'},
    {icon:'',sub:'Automotive',label:'Studio Shot'},
    {icon:'',sub:'Automotive',label:'AI VFX'},
    {icon:'',sub:'Wheels & Parts',label:'Product Visual'},
    {icon:'',sub:'Automotive',label:'AI Cinematic'},
    {icon:'',sub:'Automotive',label:'Brand Campaign'},
  ],
  apparel: [
    {icon:'',sub:'Apparel',label:'Product Shot'},
    {icon:'',sub:'Footwear',label:'Editorial'},
    {icon:'',sub:'Accessories',label:'Lifestyle'},
    {icon:'',sub:'Apparel',label:'AI Visual'},
    {icon:'',sub:'E-Commerce',label:'Product Pack'},
    {icon:'',sub:'Apparel',label:'Brand Campaign'},
  ],
  portraits: [
    {icon:'',sub:'Portrait',label:'Editorial'},
    {icon:'',sub:'Portrait',label:'Professional'},
    {icon:'',sub:'Portrait',label:'AI Enhanced'},
    {icon:'',sub:'Personal Brand',label:'Campaign'},
    {icon:'',sub:'Portrait',label:'Corporate'},
    {icon:'',sub:'Creative',label:'Artistic'},
  ]
};
function switchGalleryTab(el, tab) {
  document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const grid = document.getElementById('galleryGrid');
  const items = galleryContent[tab];
  grid.innerHTML = items.map(item => `
    <div class="gallery-item">
      <div class="gallery-placeholder"><span>${item.icon}</span><small>${item.sub}</small></div>
      <div class="gallery-label">${item.label}</div>
    </div>
  `).join('');
}

// ---- PRICING TABS ----
function switchPricingTab(el, tab) {
  document.querySelectorAll('.pricing-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.pricing-panel').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('pricing-' + tab).classList.add('active');
}

// ---- CARD BACKGROUNDS ----
// PORSCHE_B64 extracted → images/hero.jpg
document.querySelectorAll('.porsche-bg').forEach(el => {
  el.style.backgroundImage = 'url(images/hero.jpg)';
});

// Niche hero backgrounds
const nicheAutoEl = document.getElementById('nicheAutoBgImg');
if (nicheAutoEl) nicheAutoEl.style.backgroundImage = 'url(images/hero.jpg)';

// APPAREL_B64 extracted → images/card-apparel.webp
const nicheApparelEl = document.getElementById('nicheApparelBgImg');
if (nicheApparelEl) nicheApparelEl.style.backgroundImage = 'url(images/card-apparel.webp)';

// PRODUCT_B64 extracted → images/card-business.jpg
const nicheBusinessEl = document.getElementById('nicheBusinessBgImg');
if (nicheBusinessEl) nicheBusinessEl.style.backgroundImage = 'url(images/card-business.jpg)';

// ---- HAMBURGER ----
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

// ---- BEFORE/AFTER SLIDER ----
function initBASlider() {
  const slider  = document.getElementById('baSlider');
  if (!slider) return;
  const handle  = document.getElementById('baHandle');
  const afterEl = document.getElementById('baAfter');

  function setPos(clientX) {
    const r          = slider.getBoundingClientRect();
    const pct        = Math.max(0.02, Math.min(0.98, (clientX - r.left) / r.width));
    const rightClip  = (1 - pct) * 100;
    afterEl.style.clipPath = `inset(0 ${rightClip}% 0 0)`;
    handle.style.left      = pct * 100 + '%';
  }

  let active = false;
  slider.addEventListener('mousedown',  e => { active = true;  setPos(e.clientX); });
  window.addEventListener('mouseup',    ()  => { active = false; });
  window.addEventListener('mousemove',  e => { if (active) setPos(e.clientX); });
  slider.addEventListener('touchstart', e => { active = true;  setPos(e.touches[0].clientX); }, {passive:true});
  window.addEventListener('touchend',   ()  => { active = false; });
  window.addEventListener('touchmove',  e => { if (active) setPos(e.touches[0].clientX); }, {passive:true});
}
document.addEventListener('DOMContentLoaded', initBASlider);

// ---- FORM ----
// Form is now handled by Netlify Forms (see form element with netlify attribute)
