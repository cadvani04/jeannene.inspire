(function () {
  var nav = document.getElementById("siteNav");
  var links = document.getElementById("navLinks");
  var menuBtn = document.getElementById("menuBtn");

  function onScroll() {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 12);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (menuBtn && links) {
    menuBtn.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open menu");
      });
    });
  }

  document.querySelectorAll("[data-quotes]").forEach(function (root) {
    var cards = Array.prototype.slice.call(root.querySelectorAll(".quote-card"));
    var dots = root.querySelector(".dots");
    var index = 0;
    if (!cards.length || !dots) return;
    cards.forEach(function (_, i) {
      var button = document.createElement("button");
      button.type = "button";
      button.setAttribute("aria-label", "Quote " + (i + 1));
      if (i === 0) button.setAttribute("aria-current", "true");
      button.addEventListener("click", function () { show(i); });
      dots.appendChild(button);
    });
    function show(next) {
      index = next;
      cards.forEach(function (card, i) { card.classList.toggle("active", i === index); });
      Array.prototype.forEach.call(dots.children, function (dot, i) {
        if (i === index) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    }
    setInterval(function () { show((index + 1) % cards.length); }, 7000);
  });

  document.querySelectorAll("form[data-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.hidden = true;
      var success = form.parentElement.querySelector(".form-success");
      if (success) success.classList.add("show");
    });
  });
})();
