// ══ CAFINDER — GLOBAL SCRIPT ══

// === NAV SCROLL ===
window.addEventListener("scroll", function() {
  var nav = document.getElementById("nav");
  if (nav) nav.classList.toggle("scrolled", window.scrollY > 50);
  rev();
}, { passive: true });

// === REVEAL ANIMATION ===
function rev() {
  document.querySelectorAll(".rv:not(.in)").forEach(function(el) {
    if (el.getBoundingClientRect().top < window.innerHeight - 30) el.classList.add("in");
  });
}

// === CLOCK (Algoritma sayfası) ===
function tick() {
  var n = new Date();
  var h = String(n.getHours()).padStart(2,"0");
  var m = String(n.getMinutes()).padStart(2,"0");
  var c = document.getElementById("clk");
  var s = document.getElementById("clkS");
  if (c) c.textContent = h + ":" + m;
  if (s) {
    var hr = n.getHours();
    s.textContent = hr>=6&&hr<11 ? "Sabah kategorileri aktif"
                  : hr>=11&&hr<17 ? "Öğle kategorileri aktif"
                  : hr>=17&&hr<22 ? "Akşam kategorileri aktif"
                  : "Gece kategorileri aktif";
  }
}
setInterval(tick, 1000);

// === CHIP SELECT ===
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("chip")) {
    document.querySelectorAll(".chip").forEach(function(c){ c.classList.remove("on"); });
    e.target.classList.add("on");
  }
});

// === WHEEL / ÇARKIFELEK ===
var spinning = false, deg = 0;
var opts = ["En yakın açık kafe","Manzaralı mekan","WiFi'li çalışma yeri","Bahçeli kafe","Gece geç kapanan","Hayvan dostu mekan"];
document.addEventListener("click", function(e) {
  var wo = document.getElementById("wheelOuter");
  var sb = document.getElementById("spinBtn");
  if ((wo && wo.contains(e.target)) || e.target === sb) {
    if (spinning) return;
    spinning = true;
    var sr = document.getElementById("sr");
    if (sr) sr.textContent = "";
    deg += Math.floor(Math.random() * 360) + 1080;
    var wi = document.getElementById("wi");
    if (wi) wi.style.transform = "rotate(" + deg + "deg)";
    setTimeout(function() {
      spinning = false;
      if (sr) sr.textContent = opts[Math.floor(Math.random() * opts.length)];
    }, 3100);
  }
});

// === HAMBURGER MENU ===
function closeMobile() {
  var hbtn = document.getElementById("hamburger");
  var mmenu = document.getElementById("mobileMenu");
  if (hbtn) hbtn.classList.remove("open");
  if (mmenu) mmenu.classList.remove("open");
  document.body.style.overflow = "";
}

// === FEAT STAR POPUP ===
function toggleFeatStarPopup(e) {
  if (e) e.stopPropagation();
  var popup = document.getElementById('featStarPopup');
  if (popup) popup.classList.toggle('open');
}
function closeFeatStarPopup(e) {
  if (e) e.stopPropagation();
  var popup = document.getElementById('featStarPopup');
  if (popup) popup.classList.remove('open');
}
document.addEventListener('click', function(e) {
  var popup = document.getElementById('featStarPopup');
  var btn = document.getElementById('featStarBtn');
  if (popup && popup.classList.contains('open')) {
    if (!popup.contains(e.target) && (!btn || !btn.contains(e.target))) {
      popup.classList.remove('open');
    }
  }
});

// === TAB POPUPS (Ana sayfa) ===
function closeTabPopups() {
  ['popup-search','popup-fav','popup-reviews','popup-profile','popup-algo'].forEach(function(id){
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
}
function togglePopup(id) {
  var pop = document.getElementById(id);
  if (!pop) return;
  var isOpen = pop.style.display !== 'none';
  closeTabPopups();
  if (!isOpen) pop.style.display = 'block';
}

// === SCROLL TO SECTION ===
function scrollToSection(id) {
  var el = document.getElementById(id);
  if (!el) return;
  var top = el.getBoundingClientRect().top + window.scrollY - 120;
  window.scrollTo({ top: top, behavior: 'smooth' });
}

// === ACTIVE NAV LINK ===
function setActiveNav() {
  var path = window.location.pathname.replace(/\/+$/, '') || '/';
  var map = {
    '/': 'home',
    '/ozellikler': 'feats',
    '/algoritma': 'algo',
    '/mudavim': 'muda',
    '/kararsizlar-kulubu': 'club',
    '/isletmeler': 'biz'
  };
  var activeId = map[path] || '';
  document.querySelectorAll(".nav-links a[data-nav-id]").forEach(function(a) {
    a.classList.toggle("active", a.getAttribute("data-nav-id") === activeId);
  });
  document.querySelectorAll(".mobile-menu a[data-nav-id]").forEach(function(a) {
    a.classList.toggle("active", a.getAttribute("data-nav-id") === activeId);
  });
}

// === DOM READY ===
window.addEventListener("DOMContentLoaded", function() {
  // Hamburger
  var hbtn = document.getElementById("hamburger");
  if (hbtn) {
    hbtn.addEventListener("click", function(e) {
      e.preventDefault();
      var mmenu = document.getElementById("mobileMenu");
      hbtn.classList.toggle("open");
      mmenu.classList.toggle("open");
      document.body.style.overflow = mmenu.classList.contains("open") ? "hidden" : "";
    });
  }

  // data-scroll
  document.body.addEventListener("click", function(e) {
    var el = e.target.closest("[data-scroll]");
    if (el) {
      e.preventDefault();
      var target = document.getElementById(el.getAttribute("data-scroll"));
      if (target) target.scrollIntoView({behavior:"smooth"});
    }
  });

  // Tab popup (ana sayfa)
  var tabAlgo = document.getElementById('tab-algo');
  var tabSearch = document.getElementById('tab-search');
  var tabFav = document.getElementById('tab-fav');
  var tabReviews = document.getElementById('tab-reviews');
  var tabProfile = document.getElementById('tab-profile');
  if (tabAlgo) tabAlgo.addEventListener('click', function(e){ e.stopPropagation(); togglePopup('popup-algo'); });
  if (tabSearch) tabSearch.addEventListener('click', function(e){ e.stopPropagation(); togglePopup('popup-search'); });
  if (tabFav) tabFav.addEventListener('click', function(e){ e.stopPropagation(); togglePopup('popup-fav'); });
  if (tabReviews) tabReviews.addEventListener('click', function(e){ e.stopPropagation(); togglePopup('popup-reviews'); });
  if (tabProfile) tabProfile.addEventListener('click', function(e){ e.stopPropagation(); togglePopup('popup-profile'); });
  document.addEventListener('click', closeTabPopups);

  // Set active nav
  setActiveNav();

  // Init
  tick();
  rev();
});

// === PHONE CLUSTER TILT (Ana sayfa) ===
(function() {
  var cluster = document.getElementById("phoneCluster");
  if (!cluster) return;
  var phL = document.getElementById("ph-left");
  var phC = document.getElementById("ph-center");
  var phR = document.getElementById("ph-right");
  function tilt(dx, dy) {
    var rx = Math.max(-20, Math.min(20, -dy * 0.035));
    var ry = Math.max(-20, Math.min(20,  dx * 0.035));
    if (phL) phL.style.transform = "rotateY("+(22+ry)+"deg) rotateX("+(4+rx)+"deg) translateX(20px)";
    if (phC) phC.style.transform = "rotateY("+ry+"deg) rotateX("+(2+rx)+"deg)";
    if (phR) phR.style.transform = "rotateY("+(-22+ry)+"deg) rotateX("+(4+rx)+"deg) translateX(-20px)";
  }
  function reset() {
    if (phL) phL.style.transform = "";
    if (phC) phC.style.transform = "";
    if (phR) phR.style.transform = "";
  }
  document.addEventListener("mousemove", function(e) {
    var r = cluster.getBoundingClientRect();
    var cx = r.left + r.width/2, cy = r.top + r.height/2;
    tilt(e.clientX - cx, e.clientY - cy);
  });
  document.addEventListener("mouseleave", reset);
  cluster.addEventListener("touchmove", function(e) {
    if (e.touches.length < 1) return;
    var r = cluster.getBoundingClientRect();
    var cx = r.left + r.width/2, cy = r.top + r.height/2;
    tilt(e.touches[0].clientX - cx, e.touches[0].clientY - cy);
  }, {passive:true});
  cluster.addEventListener("touchend", reset);
})();
