window.addEventListener("DOMContentLoaded", function() {
    // 1. Kaydırma Animasyonları (Görünür Olunca Yükle)
    function rev() {
        document.querySelectorAll(".rv:not(.in)").forEach(function(el) {
            if (el.getBoundingClientRect().top < window.innerHeight - 30) {
                el.classList.add("in");
            }
        });
    }
    
    // 2. Navigasyon (Menü) Arka Plan Kontrolü
    window.addEventListener("scroll", function() {
        var nav = document.getElementById("nav");
        if (nav) nav.classList.toggle("scrolled", window.scrollY > 50);
        rev();
    }, { passive: true });
    
    // İlk Yüklemede Kontrol Et
    rev();
    
    // 3. Hamburger Menü Mobil
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

    // 4. Tab Popup Sistemi (Ana Sayfa İçin)
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

    // 5. Algoritma Sayfası Saati
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
    if(document.getElementById("clk")) {
        setInterval(tick, 1000);
        tick();
    }

    // 6. Kararsızlar Kulübü Çark Sistemi
    var spinning = false, deg = 0;
    var opts = ["En yakın açık kafe","Manzaralı mekan","WiFi'li çalışma yeri","Bahçeli kafe","Gece geç kapanan","Hayvan dostu mekan"];
    var wo = document.getElementById("wheelOuter");
    var sb = document.getElementById("spinBtn");
    if(wo || sb) {
        document.addEventListener("click", function(e) {
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
    }

    // 7. Anasayfa Telefon 3D Tilt Efekti
    var cluster = document.getElementById("phoneCluster");
    if (cluster) {
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
    }
});

// 8. Özellikler Sayfası Yıldız Popup Sistemi
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

// 9. FİREBASE + EMAİLJS (Sadece form olduğunda çalışır)
window.addEventListener("load", function() {
    var form = document.getElementById("bizForm");
    if(!form) return;

    try {
        var firebaseConfig = {
            apiKey: "AIzaSyB88lKl9GyHLkI-rER9Rvyv48lyiIob5b4",
            authDomain: "cinder-9a8fd.firebaseapp.com",
            projectId: "cinder-9a8fd",
            storageBucket: "cinder-9a8fd.firebasestorage.app",
            messagingSenderId: "258380746486",
            appId: "1:258380746486:web:24d6666654611ecfc126d7"
        };
        if(!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        var db = firebase.firestore();
        emailjs.init("UdGI5oCdfYhPj7whK");

        form.addEventListener("submit", async function(e) {
            e.preventDefault();
            var btn    = document.getElementById("fsubBtn");
            var fok    = document.getElementById("fok");
            var ferr   = document.getElementById("ferr");
            var kafe   = document.getElementById("f-kafe").value;
            var kisi   = document.getElementById("f-kisi").value;
            var tel    = document.getElementById("f-tel").value;
            var mail   = document.getElementById("f-mail").value;
            var sehir  = document.getElementById("f-sehir").value;
            var acik   = document.getElementById("f-aciklama").value;

            btn.textContent = "Gönderiliyor...";
            btn.disabled = true;
            ferr.style.display = "none";

            try {
                await db.collection("basvurular").add({
                    kafeAdi: kafe, iletisimKisi: kisi, telefon: tel, eposta: mail, sehir: sehir, aciklama: acik, kaynak: "web", tarih: firebase.firestore.FieldValue.serverTimestamp()
                });
                await emailjs.send("service_zftyk1i", "template_1708e89", {
                    kafe_adi: kafe, iletisim_kisi: kisi, telefon: tel, eposta: mail, sehir: sehir, aciklama: acik, to_email: "cafinderisletme@gmail.com"
                });
                btn.style.display = "none";
                fok.style.display = "block";
            } catch(err) {
                console.error(err);
                ferr.style.display = "block";
                btn.textContent = "Başvuruyu Gönder";
                btn.disabled = false;
            }
        });
    } catch(initErr) {
        console.warn("Firebase/EmailJS yüklenemedi:", initErr.message);
    }
});
