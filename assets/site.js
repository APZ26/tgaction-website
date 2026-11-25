/* ------------------------------------------------------------------
   SITE SETTINGS
   siteAddress  used in the share messages
   ------------------------------------------------------------------ */
var SITE_ADDRESS = "https://www.tgaction.co.uk";

(function () {
  // Old Canva links (for example tgaction.co.uk/#page-3) go to the new pages.
  var oldPages = { "#page-0": "about.html", "#page-1": "documents.html", "#page-2": "documents.html", "#page-3": "object.html", "#page-4": "get-involved.html", "#page-5": "get-involved.html#donate", "#page-6": "get-involved.html#sign" };
  if (oldPages[location.hash]) { location.replace(oldPages[location.hash]); return; }

  function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }
  function copyText(t) {
    function fallback() { var b = document.createElement("textarea"); b.value = t; document.body.appendChild(b); b.select(); var ok = document.execCommand("copy"); b.remove(); return ok ? Promise.resolve() : Promise.reject(); }
    if (navigator.clipboard && window.isSecureContext) { return navigator.clipboard.writeText(t).catch(fallback); }
    return fallback();
  }

  // Phone menu
  var menuBtn = document.querySelector(".menu-btn"), nav = document.getElementById("nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () { var open = nav.classList.toggle("open"); menuBtn.setAttribute("aria-expanded", String(open)); menuBtn.textContent = open ? "Close" : "Menu"; });
  }

  // Myth or fact
  each(".myth button", function (b) {
    b.addEventListener("click", function () { var open = b.getAttribute("aria-expanded") !== "true"; b.setAttribute("aria-expanded", String(open)); b.nextElementSibling.hidden = !open; });
  });

  // Share kit
  var shareText = "Developers propose around 1,700+ homes on the Green Belt in Tidbury Green. Please read this and send your objection: " + SITE_ADDRESS;
  each("[data-share]", function (a) {
    var kind = a.getAttribute("data-share");
    if (kind === "whatsapp") { a.href = "https://wa.me/?text=" + encodeURIComponent(shareText); }
    if (kind === "facebook") { a.href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(SITE_ADDRESS); }
    if (kind === "email") { a.href = "mailto:?subject=" + encodeURIComponent("Have you seen the plans for Tidbury Green?") + "&body=" + encodeURIComponent("Hi,\n\n" + shareText + "\n\nIt only takes a few minutes and every objection is counted.\n"); }
  });

  // Copy buttons
  each("[data-copy]", function (button) {
    button.addEventListener("click", function () {
      var label = button.textContent;
      copyText(button.getAttribute("data-copy")).then(function () { button.textContent = "Copied"; setTimeout(function () { button.textContent = label; }, 2200); });
    });
  });

  // Document search
  var search = document.getElementById("doc-search");
  if (search) {
    var count = document.getElementById("doc-count");
    search.addEventListener("input", function () {
      var term = search.value.trim().toLowerCase(), shown = 0;
      each(".doc", function (d) { var hit = d.textContent.toLowerCase().indexOf(term) !== -1; d.hidden = !hit; if (hit) { shown++; } });
      each(".doc-group", function (g) { g.hidden = !g.querySelector(".doc:not([hidden])"); });
      count.textContent = term ? (shown === 1 ? "1 document found" : shown + " documents found") : "";
    });
  }
})();
