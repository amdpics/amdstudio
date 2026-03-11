// ---- CMS CONTENT LOADER ----
async function loadContent() {
  try {
    const res = await fetch('/data/content.json?t=' + Date.now());
    if (!res.ok) return;
    const c = await res.json();

    const set = (id, val, html) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (html) el.innerHTML = val; else el.textContent = val;
    };
    const setBg = (id, url) => {
      const el = document.getElementById(id);
      if (el) el.style.backgroundImage = 'url(' + url + ')';
    };

    // Hero
    set('cms-hero-tag', c.hero_tag);
    set('cms-hero-title', c.hero_title, true);
    set('cms-hero-sub', c.hero_subtitle);
    set('cms-stat1-num', c.stat1_num + '<span>+</span>', true);
    set('cms-stat1-label', c.stat1_label);
    set('cms-stat2-num', c.stat2_num + '<span>+</span>', true);
    set('cms-stat2-label', c.stat2_label);
    set('cms-stat3-num', c.stat3_num + '<span>+</span>', true);
    set('cms-stat3-label', c.stat3_label);

    // Brand strip
    if (Array.isArray(c.brands)) {
      const track = document.getElementById('cms-brand-track');
      if (track) {
        track.innerHTML = c.brands.map((b, i) =>
          (i > 0 ? '<span class="brand-sep">·</span>' : '') +
          '<span class="brand-item">' + b + '</span>'
        ).join('');
      }
    }

    // Who We Work With
    set('cms-for-label', c.for_label);
    set('cms-for-title', c.for_title, true);
    set('cms-for-subtitle', c.for_subtitle);
    setBg('cms-card1-bg', c.card1_image);
    set('cms-card1-title', c.card1_title);
    set('cms-card1-desc', c.card1_desc);
    setBg('cms-card2-bg', c.card2_image);
    set('cms-card2-title', c.card2_title);
    set('cms-card2-desc', c.card2_desc);
    setBg('cms-card3-bg', c.card3_image);
    set('cms-card3-title', c.card3_title);
    set('cms-card3-desc', c.card3_desc);

    // Process
    set('cms-process-label', c.process_label);
    set('cms-process-title', c.process_title, true);
    set('cms-step1-title', c.step1_title);
    set('cms-step1-desc', c.step1_desc);
    set('cms-step2-title', c.step2_title);
    set('cms-step2-desc', c.step2_desc);
    set('cms-step3-title', c.step3_title);
    set('cms-step3-desc', c.step3_desc);
    set('cms-step4-title', c.step4_title);
    set('cms-step4-desc', c.step4_desc);

    // Before/After Slider
    set('cms-slider-label', c.slider_label);
    set('cms-slider-title', c.slider_title);
    set('cms-slider-subtitle', c.slider_subtitle);
    setBg('cms-ba-before', c.slider_before);
    setBg('baAfter', c.slider_after);

    // Testimonials
    set('cms-t1-quote', c.t1_quote);
    set('cms-t1-name', c.t1_name);
    set('cms-t1-role', c.t1_role);
    if (c.t1_name) set('cms-t1-avatar', c.t1_name.charAt(0).toUpperCase());
    set('cms-t2-quote', c.t2_quote);
    set('cms-t2-name', c.t2_name);
    set('cms-t2-role', c.t2_role);
    if (c.t2_name) set('cms-t2-avatar', c.t2_name.charAt(0).toUpperCase());
    set('cms-t3-quote', c.t3_quote);
    set('cms-t3-name', c.t3_name);
    set('cms-t3-role', c.t3_role);
    if (c.t3_name) set('cms-t3-avatar', c.t3_name.charAt(0).toUpperCase());

    // About
    set('cms-about-label', c.about_label);
    set('cms-about-headline', c.about_headline, true);
    set('cms-about-p1', c.about_p1, true);
    set('cms-about-p2', c.about_p2, true);
    set('cms-about-p3', c.about_p3, true);
    set('cms-about-p4', c.about_p4, true);
    set('cms-about-stat1-num', c.about_stat1_num);
    set('cms-about-stat1-label', c.about_stat1_label);
    set('cms-about-stat2-num', c.about_stat2_num);
    set('cms-about-stat2-label', c.about_stat2_label);
    set('cms-about-stat3-num', c.about_stat3_num);
    set('cms-about-stat3-label', c.about_stat3_label);
    set('cms-about-stat4-num', c.about_stat4_num);
    set('cms-about-stat4-label', c.about_stat4_label);

    // Niche — Automotive
    setBg('nicheAutoBgImg', c.auto_hero_bg);
    set('cms-auto-hero-title', c.auto_hero_title, true);
    set('cms-auto-hero-sub', c.auto_hero_sub);
    set('cms-auto-overview-h2', c.auto_overview_h2, true);
    set('cms-auto-p1', c.auto_p1);
    set('cms-auto-p2', c.auto_p2);
    if (Array.isArray(c.auto_bullets)) {
      const ul = document.getElementById('cms-auto-bullets');
      if (ul) ul.innerHTML = c.auto_bullets.map(b => '<li>' + b + '</li>').join('');
    }
    set('cms-auto-stat1-num', c.auto_stat1_num); set('cms-auto-stat1-label', c.auto_stat1_label);
    set('cms-auto-stat2-num', c.auto_stat2_num); set('cms-auto-stat2-label', c.auto_stat2_label);
    set('cms-auto-stat3-num', c.auto_stat3_num); set('cms-auto-stat3-label', c.auto_stat3_label);
    set('cms-auto-stat4-num', c.auto_stat4_num); set('cms-auto-stat4-label', c.auto_stat4_label);
    set('cms-auto-cta-h2', c.auto_cta_h2, true);
    set('cms-auto-cta-p', c.auto_cta_p);
    set('cms-auto-p1-tier', c.auto_pkg1_tier); set('cms-auto-p1-name', c.auto_pkg1_name); set('cms-auto-p1-price', c.auto_pkg1_price);
    set('cms-auto-p2-tier', c.auto_pkg2_tier); set('cms-auto-p2-name', c.auto_pkg2_name); set('cms-auto-p2-price', c.auto_pkg2_price);
    set('cms-auto-p3-tier', c.auto_pkg3_tier); set('cms-auto-p3-name', c.auto_pkg3_name); set('cms-auto-p3-price', c.auto_pkg3_price);

    // Niche — Apparel
    setBg('nicheApparelBgImg', c.app_hero_bg);
    set('cms-app-hero-title', c.app_hero_title, true);
    set('cms-app-hero-sub', c.app_hero_sub);
    set('cms-app-overview-h2', c.app_overview_h2, true);
    set('cms-app-p1', c.app_p1);
    set('cms-app-p2', c.app_p2);
    if (Array.isArray(c.app_bullets)) {
      const ul = document.getElementById('cms-app-bullets');
      if (ul) ul.innerHTML = c.app_bullets.map(b => '<li>' + b + '</li>').join('');
    }
    set('cms-app-stat1-num', c.app_stat1_num); set('cms-app-stat1-label', c.app_stat1_label);
    set('cms-app-stat2-num', c.app_stat2_num); set('cms-app-stat2-label', c.app_stat2_label);
    set('cms-app-stat3-num', c.app_stat3_num); set('cms-app-stat3-label', c.app_stat3_label);
    set('cms-app-stat4-num', c.app_stat4_num); set('cms-app-stat4-label', c.app_stat4_label);
    set('cms-app-cta-h2', c.app_cta_h2, true);
    set('cms-app-cta-p', c.app_cta_p);
    set('cms-app-p1-tier', c.app_pkg1_tier); set('cms-app-p1-name', c.app_pkg1_name); set('cms-app-p1-price', c.app_pkg1_price);
    set('cms-app-p2-tier', c.app_pkg2_tier); set('cms-app-p2-name', c.app_pkg2_name); set('cms-app-p2-price', c.app_pkg2_price);
    set('cms-app-p3-tier', c.app_pkg3_tier); set('cms-app-p3-name', c.app_pkg3_name); set('cms-app-p3-price', c.app_pkg3_price);

    // Niche — Business
    setBg('nicheBusinessBgImg', c.biz_hero_bg);
    set('cms-biz-hero-title', c.biz_hero_title, true);
    set('cms-biz-hero-sub', c.biz_hero_sub);
    set('cms-biz-overview-h2', c.biz_overview_h2, true);
    set('cms-biz-p1', c.biz_p1);
    set('cms-biz-p2', c.biz_p2);
    if (Array.isArray(c.biz_bullets)) {
      const ul = document.getElementById('cms-biz-bullets');
      if (ul) ul.innerHTML = c.biz_bullets.map(b => '<li>' + b + '</li>').join('');
    }
    set('cms-biz-stat1-num', c.biz_stat1_num); set('cms-biz-stat1-label', c.biz_stat1_label);
    set('cms-biz-stat2-num', c.biz_stat2_num); set('cms-biz-stat2-label', c.biz_stat2_label);
    set('cms-biz-stat3-num', c.biz_stat3_num); set('cms-biz-stat3-label', c.biz_stat3_label);
    set('cms-biz-stat4-num', c.biz_stat4_num); set('cms-biz-stat4-label', c.biz_stat4_label);
    set('cms-biz-cta-h2', c.biz_cta_h2, true);
    set('cms-biz-cta-p', c.biz_cta_p);
    set('cms-biz-p1-tier', c.biz_pkg1_tier); set('cms-biz-p1-name', c.biz_pkg1_name); set('cms-biz-p1-price', c.biz_pkg1_price);
    set('cms-biz-p2-tier', c.biz_pkg2_tier); set('cms-biz-p2-name', c.biz_pkg2_name); set('cms-biz-p2-price', c.biz_pkg2_price);
    set('cms-biz-p3-tier', c.biz_pkg3_tier); set('cms-biz-p3-name', c.biz_pkg3_name);

    // Main Pricing Prices
    set('cms-price-vid-ai1', c.price_vid_ai1);
    set('cms-price-vid-ai2', c.price_vid_ai2);
    set('cms-price-vid-ai3', c.price_vid_ai3);
    set('cms-price-vid-cam1', c.price_vid_cam1);
    set('cms-price-vid-cam2', c.price_vid_cam2);
    set('cms-price-photo1', c.price_photo1);
    set('cms-price-photo2', c.price_photo2);
    set('cms-price-aiphoto1', c.price_aiphoto1);
    set('cms-price-aiphoto2', c.price_aiphoto2);
    set('cms-price-mgmt1', c.price_mgmt1);
    set('cms-price-mgmt2', c.price_mgmt2);
    set('cms-price-mgmt3', c.price_mgmt3);
    set('cms-price-pkg1', c.price_pkg1);
    set('cms-price-pkg2', c.price_pkg2);
    set('cms-price-pkg3', c.price_pkg3);

  } catch (e) {
    // Silently fail — hardcoded HTML content remains as fallback
  }
}
document.addEventListener('DOMContentLoaded', loadContent);

// ---- HERO IMAGE ----
// HERO_IMG extracted → images/hero.jpg
// Hero background is now a <video> element

// ---- ROUTING ----
function goTo(page, pushState = true) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  const navEl = document.getElementById('nav-' + page);
  if (navEl) navEl.classList.add('active');
  window.scrollTo(0, 0);
  if (pushState) history.pushState({ page }, '', '#' + page);
  // Auto-load gallery on first open
  if (page === 'gallery') {
    const activeTab = document.querySelector('.gallery-tab.active');
    if (activeTab) activeTab.click();
  }
  // Auto-load niche page galleries
  if (page === 'niche-automotive') loadNicheGallery('cars', 'niche-gallery-auto');
  if (page === 'niche-apparel')    loadNicheGallery('apparel', 'niche-gallery-apparel');
  if (page === 'niche-business')   loadNicheGallery('business', 'niche-gallery-biz');
}

window.addEventListener('popstate', e => {
  const page = (e.state && e.state.page) || (location.hash.slice(1)) || 'home';
  goTo(page, false);
});

// ---- GALLERY ----
let _galleryData = null;
let _lbItems = [];
let _lbIndex = 0;

function _isVideo(path) {
  return /\.(mp4|webm|mov)$/i.test(path || '');
}

async function _loadGalleryData() {
  if (_galleryData) return _galleryData;
  try {
    const res = await fetch('/data/gallery.json?t=' + Date.now());
    if (!res.ok) { _galleryData = []; return []; }
    const json = await res.json();
    _galleryData = Array.isArray(json) ? json : (json.items || []);
  } catch (e) {
    _galleryData = [];
  }
  return _galleryData;
}

async function switchGalleryTab(el, tab) {
  document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = '<div class="gallery-loading">Loading...</div>';

  const all = await _loadGalleryData();
  const items = all.filter(item => item.category === tab).slice(0, 24);
  _lbItems = items;

  if (items.length === 0) {
    grid.innerHTML = '<div class="gallery-empty">No items yet — add them in the CMS at /admin</div>';
    return;
  }

  grid.innerHTML = items.map((item, i) => {
    if (_isVideo(item.file)) {
      const poster = item.poster ? `style="background-image:url(${item.poster});background-size:cover;background-position:center;"` : '';
      return `<div class="gallery-item gallery-item-video" onclick="openLightbox(${i})" ${poster}>
        <div class="gallery-play-btn">▶</div>
        <div class="gallery-label">${item.label || ''}</div>
      </div>`;
    } else {
      return `<div class="gallery-item" onclick="openLightbox(${i})">
        <img src="${item.file}" alt="${item.label || ''}" loading="lazy">
        <div class="gallery-label">${item.label || ''}</div>
      </div>`;
    }
  }).join('');
}

// ---- LIGHTBOX ----
function openLightbox(index) {
  _lbIndex = index;
  _renderLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  lb.classList.remove('open');
  document.body.style.overflow = '';
  // Stop any playing video
  const vid = lb.querySelector('video');
  if (vid) { vid.pause(); vid.src = ''; }
}

function navigateLightbox(dir) {
  // Stop current video before switching
  const vid = document.querySelector('#lightbox video');
  if (vid) { vid.pause(); vid.src = ''; }
  _lbIndex = (_lbIndex + dir + _lbItems.length) % _lbItems.length;
  _renderLightbox();
}

function _renderLightbox() {
  const item = _lbItems[_lbIndex];
  if (!item) return;
  const content = document.getElementById('lbContent');
  const caption = document.getElementById('lbCaption');
  const prevBtn = document.getElementById('lbPrev');
  const nextBtn = document.getElementById('lbNext');

  // Show/hide nav arrows
  const showNav = _lbItems.length > 1;
  prevBtn.style.display = showNav ? '' : 'none';
  nextBtn.style.display = showNav ? '' : 'none';

  if (_isVideo(item.file)) {
    content.innerHTML = `<video controls autoplay playsinline>
      <source src="${item.file}" type="video/mp4">
    </video>`;
  } else {
    content.innerHTML = `<img src="${item.file}" alt="${item.label || ''}">`;
  }

  caption.textContent = item.label || '';
}

document.addEventListener('DOMContentLoaded', () => {
  // Land on correct page if URL has a hash
  const initialPage = location.hash.slice(1);
  if (initialPage && document.getElementById('page-' + initialPage)) {
    goTo(initialPage, false);
  } else {
    history.replaceState({ page: 'home' }, '', '#home');
  }

  // Close lightbox on backdrop click
  const lb = document.getElementById('lightbox');
  if (lb) {
    lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  }
  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lb || !lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft')  navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
});

// ---- NICHE PAGE GALLERIES ----
const _nicheLbCache = {};

async function loadNicheGallery(category, gridId) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = '<div class="gallery-loading" style="grid-column:1/-1">Loading...</div>';
  const all = await _loadGalleryData();
  const items = all.filter(item => item.category === category).slice(0, 6);
  _nicheLbCache[gridId] = items;
  if (items.length === 0) {
    grid.innerHTML = '<div class="gallery-loading" style="grid-column:1/-1;opacity:0.4;">No items yet — upload in the CMS at /admin</div>';
    return;
  }
  grid.innerHTML = items.map((item, i) => {
    if (_isVideo(item.file)) {
      const bg = item.poster ? `background-image:url(${item.poster});background-size:cover;background-position:center;` : '';
      return `<div class="niche-gallery-item" onclick="openNicheItem(${i},'${gridId}')" style="${bg}">
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;">
          <div class="gallery-play-btn">▶</div>
        </div>
      </div>`;
    } else {
      return `<div class="niche-gallery-item" onclick="openNicheItem(${i},'${gridId}')">
        <img src="${item.file}" alt="${item.label || ''}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:12px;">
      </div>`;
    }
  }).join('');
}

function openNicheItem(index, gridId) {
  _lbItems = _nicheLbCache[gridId] || [];
  openLightbox(index);
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

// Niche hero backgrounds are now CMS-controlled via loadContent()

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
