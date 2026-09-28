(function () {
  var listEl = document.getElementById("blog-list");
  var articleEl = document.getElementById("blog-article");
  if (!listEl || !articleEl) return;

  function posts() {
    return (window.POSTS || []).slice().sort(function (a, b) {
      return a.date < b.date ? 1 : -1;
    });
  }

  function formatDate(iso, lang) {
    var parts = String(iso).split("-");
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return d.toLocaleDateString(lang === "en" ? "en-GB" : "es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function paragraphs(parent, text) {
    parent.textContent = "";
    String(text || "").split(/\n\n+/).forEach(function (chunk) {
      var trimmed = chunk.trim();
      if (!trimmed) return;
      var p = document.createElement("p");
      p.textContent = trimmed;
      parent.appendChild(p);
    });
  }

  function render(lang) {
    var all = posts();
    var id = (location.hash || "").replace("#", "");
    var post = id ? all.filter(function (item) { return item.id === id; })[0] : null;

    if (post) {
      listEl.hidden = true;
      articleEl.hidden = false;
      document.getElementById("blog-kicker").textContent = formatDate(post.date, lang);
      document.getElementById("blog-title").textContent = post.title[lang] || post.title.es;
      paragraphs(document.getElementById("blog-body"), post.body[lang] || post.body.es);
      document.title = (post.title[lang] || post.title.es) + " · Montessori Kaalam";
      return;
    }

    articleEl.hidden = true;
    listEl.hidden = false;
    listEl.textContent = "";
    document.title = (lang === "en" ? "Notes" : "Notas") + " · Montessori Kaalam";
    if (!all.length) {
      var empty = document.createElement("p");
      empty.className = "prose";
      empty.textContent = lang === "en" ? "The next note will be published here." : "La próxima nota se publica aquí.";
      listEl.appendChild(empty);
      return;
    }
    all.forEach(function (item) {
      var link = document.createElement("a");
      link.className = "note-link";
      link.href = "blog.html#" + item.id;
      var when = document.createElement("span");
      when.className = "note-link__date";
      when.textContent = formatDate(item.date, lang);
      var title = document.createElement("span");
      title.className = "note-link__title";
      title.textContent = item.title[lang] || item.title.es;
      link.appendChild(when);
      link.appendChild(title);
      listEl.appendChild(link);
    });
  }

  window.kaalamAfterLang = render;
  window.addEventListener("hashchange", function () {
    var lang = document.documentElement.lang.indexOf("en") === 0 ? "en" : "es";
    render(lang);
  });
  render(document.documentElement.lang.indexOf("en") === 0 ? "en" : "es");
})();
