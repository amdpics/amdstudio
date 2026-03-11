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
