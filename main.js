(function () {
  var STR = {
    es: {
      title: "Montessori Kaalam · Playa del Carmen",
      skip: "Saltar al contenido",
      navDay: "El día",
      navAges: "Edades",
      navVisit: "Visita",
      menu: "Menú",
      close: "Cerrar",
      book: "Agendar visita",
      heroKicker: "Montessori Kaalam · Playa del Carmen",
      heroH1: "Sin perder la infancia.",
      heroLede: "En Playa del Carmen, un niño puede avanzar tan lejos como pueda, y seguir con ganas de aprender al final del día.",
      heroCap: "Patio de la escuela",
      dayH2: "Así se vive una mañana.",
      dayLede: "Fotos de la escuela. No es un horario inventado: es lo que se ve cuando el día ya empezó.",
      s1cap: "Pizarra en el patio.",
      s1h: "Dibujan",
      s1p: "Hay pizarra y caballete. Se quedan el tiempo que el dibujo pide.",
      s2cap: "Un libro de verdad, en Taller.",
      s2h: "Leen",
      s2p: "Se investiga con un libro abierto y tiempo para seguir la pregunta.",
      musicH: "También hay música.",
      musicP: "La flauta entra en el día. No es un extra del viernes.",
      s3cap: "Plantas en el patio.",
      s3h: "Cuidan",
      s3p: "Agua, maceta y mesa. El patio es otro ambiente, no el recreo de después.",
      s4cap: "El patio, en hora de trabajo.",
      s4h: "Salen",
      s4p: "Se trabaja afuera con la misma calma que adentro.",
      agesH2: "Cuatro edades, el mismo cuidado.",
      agesLede: "De los 2 meses a los 12 años. En Casa de Niños y en Taller, las guías tienen certificación AMI. No todo el equipo la tiene, y lo decimos así.",
      a1t: "Nido",
      a1d: "2 meses a 18 meses. Un lugar cálido para empezar a explorar.",
      a2t: "Comunidad infantil",
      a2d: "18 meses a 3 años. Autonomía, lenguaje, movimiento y orden.",
      a3t: "Casa de niños",
      a3d: "3 a 6 años. Vida práctica, sensorial, lenguaje, matemáticas y arte, al ritmo de cada niño.",
      a4t: "Taller",
      a4d: "6 a 12 años. En el ciclo nuevo: lunes, miércoles y viernes en español. Martes y jueves en inglés.",
      extra: "También hay arte, cocina, inglés, música y yoga. En Taller se suman mandarín, tecnología y taekwondo.",
      visitH2: "Venga en hora de trabajo.",
      visitLede: "La visita es un día real, no un recorrido armado. Lunes de 11:00 a 14:00. Martes a viernes de 9:00 a 12:00.",
      footLine: "El ambiente se entiende al pisarlo.",
      footNote: "Organización sin fines de lucro · Playa del Carmen",
    },
    en: {
      title: "Montessori Kaalam · Playa del Carmen",
      skip: "Skip to content",
      navDay: "The day",
      navAges: "Ages",
      navVisit: "Visit",
      menu: "Menu",
      close: "Close",
      book: "Book a visit",
      heroKicker: "Montessori Kaalam · Playa del Carmen",
      heroH1: "Without losing childhood.",
      heroLede: "In Playa del Carmen, a child can go as far as they are able, and still want to learn at the end of the day.",
      heroCap: "The school patio",
      dayH2: "What a morning looks like.",
      dayLede: "Photographs from the school. This is a morning already underway, not a made-up timetable.",
      s1cap: "Chalkboard in the patio.",
      s1h: "They draw",
      s1p: "There is a chalkboard and an easel. They stay as long as the drawing needs.",
      s2cap: "A real book, in Taller.",
      s2h: "They read",
      s2p: "They research with an open book and time to follow the question.",
      musicH: "There is music, too.",
      musicP: "The recorder is part of the day. It is not a Friday extra.",
      s3cap: "Plants in the patio.",
      s3h: "They tend",
      s3p: "Water, a pot, a table. The patio is another classroom, not the recess that comes after.",
      s4cap: "The patio, during work time.",
      s4h: "They go out",
      s4p: "Outdoor work has the same calm as the room inside.",
      agesH2: "Four ages, the same care.",
      agesLede: "From 2 months to 12 years. In Casa de Niños and Taller, the guides are AMI-certified. Not every guide is, and we say so.",
      a1t: "Nido",
      a1d: "2 months to 18 months. A warm place to start exploring.",
      a2t: "Children's community",
      a2d: "18 months to 3 years. Autonomy, language, movement, and order.",
      a3t: "Children's house",
      a3d: "3 to 6 years. Practical life, sensorial, language, math, and art, at each child's pace.",
      a4t: "Taller",
      a4d: "6 to 12 years. In the new cycle: Monday, Wednesday, and Friday in Spanish. Tuesday and Thursday in English.",
      extra: "There is also art, cooking, English, music, and yoga. Taller adds Mandarin, technology, and taekwondo.",
      visitH2: "Come during a working morning.",
      visitLede: "The visit is a real day, not a staged tour. Monday 11:00 to 14:00. Tuesday to Friday 9:00 to 12:00.",
      footLine: "You understand the classroom by standing in it.",
      footNote: "A nonprofit · Playa del Carmen",
    },
  };

  var lang = "es";
  try {
    if (localStorage.getItem("kaalam-lang") === "en") lang = "en";
  } catch (e) {}

  function apply(next) {
    lang = next === "en" ? "en" : "es";
    var pack = STR[lang];
    document.documentElement.lang = lang === "en" ? "en" : "es-MX";
    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      var key = node.getAttribute("data-i18n");
      if (pack[key] != null) node.textContent = pack[key];
    });
    document.querySelectorAll(".js-lang").forEach(function (btn) {
      btn.textContent = lang === "en" ? "ES" : "EN";
      btn.setAttribute("aria-pressed", lang === "en" ? "true" : "false");
    });
    var menuBtn = document.getElementById("menu-btn");
    if (menuBtn && menuBtn.getAttribute("aria-expanded") !== "true") {
      menuBtn.textContent = pack.menu;
    }
    document.title = pack.title;
    var og = document.querySelector('meta[property="og:title"]');
    if (og) og.setAttribute("content", pack.title);
    try { localStorage.setItem("kaalam-lang", lang); } catch (e) {}
  }

  apply(lang);

  document.querySelectorAll(".js-lang").forEach(function (btn) {
    btn.addEventListener("click", function () {
      apply(lang === "en" ? "es" : "en");
    });
  });

  var menuBtn = document.getElementById("menu-btn");
  var menu = document.getElementById("menu");

  function closeMenu() {
    menu.hidden = true;
    menu.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.textContent = STR[lang].menu;
  }

  menuBtn.addEventListener("click", function () {
    var open = menu.hidden;
    menu.hidden = !open;
    menu.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.textContent = open ? STR[lang].close : STR[lang].menu;
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenu();
  });
})();
