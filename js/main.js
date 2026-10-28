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

  var infoDialog = document.createElement("dialog");
  infoDialog.className = "info-dialog";
  infoDialog.id = "infoDialog";
  infoDialog.innerHTML =
    '<button type="button" class="info-close" aria-label="Close">×</button>' +
    '<p class="kicker">Information</p>' +
    '<h2>Take care of people, and the sales follow.</h2>' +
    '<p>Jeannene Meisman helps young professionals increase their sales by teaching them how to build loyal clients through real customer service.</p>' +
    '<ul>' +
    '<li>Speaking for a chapter, a company, or a room that has to sell.</li>' +
    '<li>Mentoring for one younger person, on the account they are working.</li>' +
    '<li>Workshops and classes built around the work in front of the group.</li>' +
    '</ul>' +
    '<p>Clients stay because they say, “You take good care of me.” She is in Florida. Instagram is @jeanneneym.</p>' +
    '<a class="btn" href="contact.html">Work with Jeannene</a>';
  document.body.appendChild(infoDialog);

  function openInfo() {
    if (typeof infoDialog.showModal === "function") infoDialog.showModal();
    else infoDialog.setAttribute("open", "");
  }
  function closeInfo() {
    if (typeof infoDialog.close === "function") infoDialog.close();
    else infoDialog.removeAttribute("open");
  }

  if (links) {
    var infoItem = document.createElement("li");
    var infoButton = document.createElement("button");
    infoButton.type = "button";
    infoButton.className = "info-open";
    infoButton.textContent = "Information";
    infoButton.addEventListener("click", function () {
      links.classList.remove("open");
      if (menuBtn) {
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open menu");
      }
      openInfo();
    });
    infoItem.appendChild(infoButton);
    var contactItem = links.querySelector(".nav-contact");
    if (contactItem && contactItem.parentElement) links.insertBefore(infoItem, contactItem.parentElement);
    else links.appendChild(infoItem);
  }

  infoDialog.querySelector(".info-close").addEventListener("click", closeInfo);
  infoDialog.addEventListener("click", function (event) {
    if (event.target === infoDialog) closeInfo();
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
