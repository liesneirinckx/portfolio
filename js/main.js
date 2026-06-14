/* ============================================================
   Portfolio — shared interactions
   - Header scroll state
   - Mobile nav
   - Scroll reveal
   - Gallery filtering + Lightbox (images & video embeds)
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Header scroll state ---------- */
  function bindHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile nav ---------- */
  function bindNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") nav.classList.remove("open");
    });
  }

  /* ---------- Scroll reveal ---------- */
  function bindReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Gallery filtering ---------- */
  function bindFilters() {
    var chips = document.querySelectorAll(".chip");
    var items = document.querySelectorAll(".gallery [data-cat]");
    if (!chips.length || !items.length) return;
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        var cat = chip.getAttribute("data-filter");
        items.forEach(function (it) {
          var show = cat === "all" || it.getAttribute("data-cat") === cat;
          it.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* ---------- Lightbox ---------- */
  function bindLightbox() {
    var triggers = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
    if (!triggers.length) return;

    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.innerHTML =
      '<button class="lb-btn lb-close" aria-label="Close">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
      '<button class="lb-btn lb-prev" aria-label="Previous">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M15 5l-7 7 7 7"/></svg></button>' +
      '<button class="lb-btn lb-next" aria-label="Next">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 5l7 7-7 7"/></svg></button>' +
      '<div class="lightbox__wrapper"><div class="lightbox__media"></div><div class="lightbox__cap"></div></div>';
    document.body.appendChild(box);

    var media = box.querySelector(".lightbox__media");
    var cap = box.querySelector(".lightbox__cap");
    var current = -1;

    function render(i) {
      var el = triggers[i];
      var type = el.getAttribute("data-type") || "image";
      var caption = el.getAttribute("data-caption") || "";
      var tag = el.getAttribute("data-tag") || "";
      var capHtml = (tag ? '<span>' + tag + '</span>  ' : "") + caption;

      if (type === "video") {
        var src = el.getAttribute("data-src");
        media.innerHTML = '<iframe src="' + src + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
      } else {
        var full = el.getAttribute("data-full") || (el.querySelector("img") && el.querySelector("img").src);
        media.innerHTML = '<img src="' + full + '" alt="' + caption + '">';
      }
      cap.innerHTML = capHtml;
      current = i;
    }

    function open(i) {
      render(i);
      box.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function close() {
      box.classList.remove("open");
      document.body.style.overflow = "";
      media.innerHTML = "";  // stop video playback
      current = -1;
    }
    function step(dir) {
      if (current < 0) return;
      var n = (current + dir + triggers.length) % triggers.length;
      render(n);
    }

    triggers.forEach(function (el, i) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        open(i);
      });
    });

    box.querySelector(".lb-close").addEventListener("click", close);
    box.querySelector(".lb-next").addEventListener("click", function () { step(1); });
    box.querySelector(".lb-prev").addEventListener("click", function () { step(-1); });
    box.addEventListener("click", function (e) {
      if (e.target === box || e.target.classList.contains("lightbox__wrapper")) close();
    });
    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    });
  }

  /* ---------- Footer year ---------- */
  function setYear() {
    var el = document.querySelector("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    bindHeader();
    bindNav();
    bindReveal();
    bindFilters();
    bindLightbox();
    setYear();
  });
})();
