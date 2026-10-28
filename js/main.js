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

  var signinDialog = document.createElement("dialog");
  signinDialog.className = "info-dialog signin-dialog";
  signinDialog.id = "signinDialog";
  var lockClosed = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
  var lockOpen = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 7.2-2.4"/></svg>';
  signinDialog.innerHTML =
    '<button type="button" class="info-close" aria-label="Close">×</button>' +
    '<div class="signin-lock">' + lockClosed + '</div>' +
    '<p class="kicker">Sign in</p>' +
    '<h2>This page is locked.</h2>' +
    '<p class="signin-lead">Enter your email and password.</p>' +
    '<form>' +
    '<label>Email<input type="email" name="email" required autocomplete="username"></label>' +
    '<label>Password<input type="password" name="password" required minlength="4" autocomplete="current-password"></label>' +
    '<button class="btn" type="submit">Sign in</button>' +
    '</form>' +
    '<p class="form-success"></p>';
  document.body.appendChild(signinDialog);

  var signinKey = "jeannene-signin";
  var signinButton = document.createElement("button");
  signinButton.type = "button";
  signinButton.className = "nav-signin";

  function signedInEmail() {
    try { return sessionStorage.getItem(signinKey) || ""; }
    catch (err) { return ""; }
  }

  function paintSignin() {
    var email = signedInEmail();
    var lock = signinDialog.querySelector(".signin-lock");
    var lead = signinDialog.querySelector(".signin-lead");
    var form = signinDialog.querySelector("form");
    var success = signinDialog.querySelector(".form-success");
    if (email) {
      signinButton.innerHTML = lockOpen + "Signed in";
      lock.innerHTML = lockOpen;
      signinDialog.querySelector("h2").textContent = "You're signed in.";
      lead.textContent = email;
      form.hidden = true;
      success.className = "form-success show";
      success.innerHTML = '<button class="btn" type="button" data-signout>Sign out</button>';
    } else {
      signinButton.innerHTML = lockClosed + "Sign in";
      lock.innerHTML = lockClosed;
      signinDialog.querySelector("h2").textContent = "This page is locked.";
      lead.textContent = "Enter your email and password.";
      form.hidden = false;
      form.reset();
      success.className = "form-success";
      success.textContent = "";
    }
  }

  function closeMenu() {
    if (!links || !menuBtn) return;
    links.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");
  }

  function openSignin() {
    closeMenu();
    closeInfo();
    paintSignin();
    if (typeof signinDialog.showModal === "function") signinDialog.showModal();
    else signinDialog.setAttribute("open", "");
  }
  function closeSignin() {
    if (typeof signinDialog.close === "function") signinDialog.close();
    else signinDialog.removeAttribute("open");
  }

  signinButton.addEventListener("click", openSignin);
  if (links) {
    var signinItem = document.createElement("li");
    signinItem.appendChild(signinButton);
    var contactItemForSignin = links.querySelector(".nav-contact");
    if (contactItemForSignin && contactItemForSignin.parentElement) links.insertBefore(signinItem, contactItemForSignin.parentElement);
    else links.appendChild(signinItem);
  }
  paintSignin();

  signinDialog.querySelector(".info-close").addEventListener("click", closeSignin);
  signinDialog.addEventListener("click", function (event) {
    if (event.target === signinDialog) closeSignin();
    if (event.target && event.target.closest && event.target.closest("[data-signout]")) {
      try { sessionStorage.removeItem(signinKey); } catch (err) {}
      paintSignin();
      closeSignin();
    }
  });
  signinDialog.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    var form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    var email = form.elements.email.value.trim();
    try { sessionStorage.setItem(signinKey, email); } catch (err) {}
    paintSignin();
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
