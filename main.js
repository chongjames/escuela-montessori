(function () {
  var school = window.ESCUELA || {};
  var pending = /confirmar/i;

  document.querySelectorAll("[data-fill]").forEach(function (node) {
    var key = node.getAttribute("data-fill");
    var value = school[key];
    if (!value) return;
    node.textContent = value;
    if (pending.test(value)) node.classList.add("is-pending");
  });

  if (school.nombre) {
    document.title = school.nombre + " · Montessori";
    var og = document.querySelector('meta[property="og:title"]');
    if (og) og.setAttribute("content", document.title);
  }

  var nav = document.getElementById("nav");
  var bannerX = document.getElementById("banner-x");
  var menuBtn = document.getElementById("menu-btn");
  var menu = document.getElementById("menu");
  var lastY = 0;

  bannerX.addEventListener("click", function () {
    document.documentElement.style.setProperty("--banner-h", "0px");
    nav.classList.add("is-dismissed");
    nav.classList.remove("is-compact");
  });

  window.addEventListener("scroll", function () {
    if (nav.classList.contains("is-dismissed")) return;
    var y = window.scrollY;
    if (y > 48 && y > lastY) nav.classList.add("is-compact");
    else nav.classList.remove("is-compact");
    if (y < 8) nav.classList.remove("is-compact");
    lastY = y;
  }, { passive: true });

  function closeMenu() {
    menu.hidden = true;
    menu.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.textContent = "Menú";
  }

  menuBtn.addEventListener("click", function () {
    var open = menu.hidden;
    menu.hidden = !open;
    menu.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.textContent = open ? "Cerrar" : "Menú";
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenu();
  });

  var form = document.getElementById("visita-form");
  var note = document.getElementById("form-note");
  var submit = document.getElementById("form-submit");

  function burst(target) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var star = document.createElement("span");
    star.className = "star-burst";
    star.setAttribute("aria-hidden", "true");
    target.appendChild(star);
    star.addEventListener("animationend", function () { star.remove(); });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var nombre = form.nombre.value.trim();
    var telefono = form.telefono.value.trim();
    if (!nombre || !telefono) {
      note.textContent = "Escriba su nombre y un teléfono para pedir la visita.";
      note.classList.add("is-error");
      note.classList.remove("is-ok");
      if (!nombre) form.nombre.focus();
      else form.telefono.focus();
      return;
    }
    note.classList.remove("is-error");
    var correo = (school.correo || "").trim();
    var real = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo) && !pending.test(correo);
    var body = [
      "Nombre: " + nombre,
      "Teléfono: " + telefono,
      "Nota: " + form.nota.value.trim()
    ].join("\n");
    if (real) {
      window.location.href = "mailto:" + correo
        + "?subject=" + encodeURIComponent("Visita a " + (school.nombre || "la escuela"))
        + "&body=" + encodeURIComponent(body);
      note.textContent = "Se abrió su correo para enviar la solicitud a la escuela.";
    } else {
      note.textContent = "Quedó anotado en esta página. Todavía no hay correo de la escuela, así que no se envió.";
    }
    note.classList.add("is-ok");
    submit.textContent = "Anotado";
    submit.disabled = true;
    burst(submit);
  });
})();
