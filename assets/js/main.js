(function () {
  "use strict";

  /* Мени за мобилни уреди ------------------------------------------ */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
  }

  /* Паѓачко мени „За училиштето“ ----------------------------------- */
  var subToggles = document.querySelectorAll("[data-subnav-toggle]");
  function closeAllSubnavs(except) {
    subToggles.forEach(function (btn) {
      if (btn === except) return;
      btn.setAttribute("aria-expanded", "false");
      btn.parentElement.classList.remove("is-open");
    });
  }
  subToggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      closeAllSubnavs(btn);
      btn.setAttribute("aria-expanded", String(!open));
      btn.parentElement.classList.toggle("is-open", !open);
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav__item--has-sub")) closeAllSubnavs();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var openBtn = document.querySelector('[data-subnav-toggle][aria-expanded="true"]');
    closeAllSubnavs();
    if (openBtn) openBtn.focus();
  });
  // На мобилен, отвореното мени се затвора кога ќе се избере врска до делот „Контакт“.
  if (nav) {
    nav.addEventListener("click", function (e) {
      var link = e.target.closest("a[href^='#']");
      if (link && toggle && nav.classList.contains("is-open")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });
  }

  /* Копче „нагоре“ -------------------------------------------------- */
  var toTop = document.querySelector(".to-top");
  if (toTop) {
    var onScroll = function () { toTop.classList.toggle("is-visible", window.scrollY > 700); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Тековна година во подножјето ----------------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* Документи што сè уште не се прикачени ----------------------------
     Ако PDF-датотеката не постои во папката „dokumenti/“, наместо
     скршена врска се прикажува „Наскоро достапно“. */
  if (location.protocol.indexOf("http") === 0 && window.fetch) {
    document.querySelectorAll("a[data-doc]").forEach(function (link) {
      fetch(link.getAttribute("href"), { method: "HEAD", cache: "no-store" })
        .then(function (res) { if (!res.ok) markMissing(link); })
        .catch(function () { markMissing(link); });
    });
  }
  function markMissing(link) {
    var row = link.closest(".doc");
    if (row) row.classList.add("is-missing");
    var span = document.createElement("span");
    span.className = "doc__action doc__action--pending";
    span.textContent = "Наскоро достапно";
    link.replaceWith(span);
  }

  /* Галерија со преглед на цел екран ------------------------------- */
  var items = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
  if (items.length && typeof HTMLDialogElement === "function") {
    var icon = function (d) {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="' + d + '"/></svg>';
    };
    var dlg = document.createElement("dialog");
    dlg.className = "lightbox";
    dlg.setAttribute("aria-label", "Преглед на фотографија");
    dlg.innerHTML =
      '<figure class="lightbox__stage"><img alt=""></figure>' +
      '<p class="lightbox__caption" aria-live="polite"></p>' +
      '<button class="lightbox__btn lightbox__close" type="button" aria-label="Затвори">' + icon("M6 6l12 12M18 6L6 18") + "</button>" +
      '<button class="lightbox__btn lightbox__prev" type="button" aria-label="Претходна фотографија">' + icon("M15 5l-7 7 7 7") + "</button>" +
      '<button class="lightbox__btn lightbox__next" type="button" aria-label="Следна фотографија">' + icon("M9 5l7 7-7 7") + "</button>";
    document.body.appendChild(dlg);

    var img = dlg.querySelector("img");
    var caption = dlg.querySelector(".lightbox__caption");
    var current = 0;

    var show = function (i) {
      current = (i + items.length) % items.length;
      var link = items[current];
      var thumb = link.querySelector("img");
      img.src = link.getAttribute("href");
      img.alt = thumb ? thumb.alt : "";
      caption.textContent = (thumb ? thumb.alt + " " : "") + "(" + (current + 1) + " од " + items.length + ")";
    };

    items.forEach(function (link, i) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        show(i);
        dlg.showModal();
      });
    });
    dlg.querySelector(".lightbox__close").addEventListener("click", function () { dlg.close(); });
    dlg.querySelector(".lightbox__prev").addEventListener("click", function () { show(current - 1); });
    dlg.querySelector(".lightbox__next").addEventListener("click", function () { show(current + 1); });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
    dlg.addEventListener("click", function (e) {
      if (e.target === dlg || e.target.classList.contains("lightbox__stage")) dlg.close();
    });
  }
})();
