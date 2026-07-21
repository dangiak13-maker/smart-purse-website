(function () {
  "use strict";

  /* ============================================================
     CONFIG — edit your WhatsApp number here only
     ============================================================ */
  var WHATSAPP_NUMBER = "916354150331";
  var WHATSAPP_MESSAGE = "Hello, I want to buy Smart Purse.";
  var WHATSAPP_URL = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(WHATSAPP_MESSAGE);

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    setYear();
    wireBuyButtons();
    wireLivingFrame();
    wireGalleryAndLightbox();
    wireFaq();
    wireScrollReveal();
    wireHeaderShrink();
  }

  function setYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------------- Buy Now → WhatsApp ---------------- */
  function wireBuyButtons() {
    var buttons = document.querySelectorAll("[data-buy-btn]");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        window.open(WHATSAPP_URL, "_blank", "noopener");
      });
    });
  }

  /* ---------------- Hero living photo frame ---------------- */
  function wireLivingFrame() {
    var photos = document.querySelectorAll("[data-frame-photo]");
    if (!photos.length) return;
    var current = 0;
    setInterval(function () {
      photos[current].classList.remove("active");
      current = (current + 1) % photos.length;
      photos[current].classList.add("active");
    }, 3200);
  }

  /* ---------------- Gallery + Lightbox ---------------- */
  function wireGalleryAndLightbox() {
    var cards = Array.prototype.slice.call(document.querySelectorAll(".gallery-card"));
    if (!cards.length) return;

    var mediaEls = Array.prototype.slice.call(document.querySelectorAll(".gallery-media"));

    var lightbox = document.getElementById("lightbox");
    var lightboxImg = document.getElementById("lightboxImg");
    var lightboxCount = document.getElementById("lightboxCount");
    var closeBtn = document.getElementById("lightboxClose");
    var prevBtn = document.getElementById("lightboxPrev");
    var nextBtn = document.getElementById("lightboxNext");

    var images = cards.map(function (card) {
      var img = card.querySelector("img");
      return { src: img.getAttribute("src"), alt: img.getAttribute("alt") };
    });

    var activeIndex = 0;

    function openAt(index) {
      activeIndex = (index + images.length) % images.length;
      var item = images[activeIndex];
      lightboxImg.setAttribute("src", item.src);
      lightboxImg.setAttribute("alt", item.alt);
      lightboxCount.textContent = (activeIndex + 1) + " / " + images.length;
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }

    function close() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    mediaEls.forEach(function (media, i) {
      media.addEventListener("click", function () { openAt(i); });
      media.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openAt(i);
        }
      });
    });

    var downloadLinks = document.querySelectorAll(".gallery-download");
    downloadLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    });

    var buyLinks = document.querySelectorAll(".gallery-buy");
    buyLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    });

    closeBtn.addEventListener("click", close);
    nextBtn.addEventListener("click", function () { openAt(activeIndex + 1); });
    prevBtn.addEventListener("click", function () { openAt(activeIndex - 1); });

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") openAt(activeIndex + 1);
      if (e.key === "ArrowLeft") openAt(activeIndex - 1);
    });
  }

  /* ---------------- FAQ accordion ---------------- */
  function wireFaq() {
    var items = document.querySelectorAll(".faq-item");
    items.forEach(function (item) {
      var question = item.querySelector(".faq-question");
      var answer = item.querySelector(".faq-answer");

      question.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");

        items.forEach(function (other) {
          other.classList.remove("is-open");
          other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
          other.querySelector(".faq-answer").style.maxHeight = null;
        });

        if (!isOpen) {
          item.classList.add("is-open");
          question.setAttribute("aria-expanded", "true");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------------- Scroll reveal for sections ---------------- */
  function wireScrollReveal() {
    var targets = document.querySelectorAll(
      ".gallery-section, .features-section, .specs-section, .video-section, .reviews-section, .faq-section, .cta-section"
    );
    targets.forEach(function (el) { el.classList.add("reveal"); });

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------- Header background on scroll ---------------- */
  function wireHeaderShrink() {
    var header = document.getElementById("siteHeader");
    if (!header) return;
    window.addEventListener("scroll", function () {
      if (window.scrollY > 24) header.style.borderBottomColor = "rgba(201,162,75,.25)";
      else header.style.borderBottomColor = "rgba(244,236,224,.08)";
    });
  }
})();
