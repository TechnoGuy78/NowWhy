/* NOW WHY — script.js
   Petit script : menu mobile, galerie (lightbox), jour en cours,
   animations d'apparition au défilement. */

document.addEventListener("DOMContentLoaded", function () {
    /* ---------- Menu mobile (burger) ---------- */
    var burger = document.getElementById("burger");
    var navMobile = document.getElementById("nav-mobile");

    burger.addEventListener("click", function () {
        burger.classList.toggle("open");
        navMobile.classList.toggle("open");
    });

    // Ferme le menu mobile quand on clique sur un lien
    navMobile.querySelectorAll("a").forEach(function (lien) {
        lien.addEventListener("click", function () {
            burger.classList.remove("open");
            navMobile.classList.remove("open");
        });
    });

    /* ---------- Galerie : agrandissement au clic (lightbox) ---------- */
    var lightbox = document.getElementById("lightbox");
    var lightboxContent = document.getElementById("lightbox-content");
    var lightboxClose = document.getElementById("lightbox-close");

    document.querySelectorAll(".gallery-item").forEach(function (item) {
        item.addEventListener("click", function () {
            // Si vous avez mis une <img> dans le bouton, elle sera agrandie.
            // Sinon on affiche le placeholder en grand.
            var contenu = item.querySelector("img");
            if (contenu) {
                lightboxContent.innerHTML = '<img src="' + contenu.src + '" alt="' + (contenu.alt || "") + '" />';
            } else {
                lightboxContent.innerHTML =
                    '<div class="photo-placeholder" style="height:100%"><span>PHOTO — ' +
                    (item.dataset.label || "") + "</span></div>";
            }
            lightbox.classList.add("open");
        });
    });

    function fermerLightbox() {
        lightbox.classList.remove("open");
    }
    lightboxClose.addEventListener("click", fermerLightbox);
    lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) fermerLightbox();
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") fermerLightbox();
    });

    /* ---------- Surligne le jour en cours dans les horaires ---------- */
    var aujourdhui = new Date().getDay(); // 0 = dimanche, 1 = lundi...
    document.querySelectorAll(".hours-table tr").forEach(function (ligne) {
        if (parseInt(ligne.dataset.day, 10) === aujourdhui) {
            ligne.classList.add("today");
            ligne.cells[0].insertAdjacentHTML("beforeend", '<span class="badge-today">Aujourd\'hui</span>');
        }
    });

    /* ---------- Animations d'apparition au défilement ---------- */
    var observateur = new IntersectionObserver(
        function (entrees) {
            entrees.forEach(function (entree) {
                if (entree.isIntersecting) {
                    entree.target.classList.add("visible");
                    observateur.unobserve(entree.target);
                }
            });
        },
        { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
        observateur.observe(el);
    });
});
