/**
 * app.js — Hash routing, page toggling, shared SVG hotspot rendering, debug mode.
 */

(function () {
  "use strict";

  // ===== PAGE ROUTING =====
  const PAGES = ["landing", "learn", "quiz", "quiz-play", "results"];

  function showPage(id) {
    PAGES.forEach(function (p) {
      var el = document.getElementById("page-" + p);
      if (el) el.classList.toggle("active", p === id);
    });
  }

  function route() {
    var hash = location.hash.replace("#", "") || "landing";
    if (PAGES.indexOf(hash) === -1) hash = "landing";
    showPage(hash);

    // Initialize page-specific logic
    if (hash === "learn" && typeof initLearn === "function") {
      initLearn();
    }
    if (hash === "quiz" && typeof initQuizSetup === "function") {
      initQuizSetup();
    }

    // Scroll to top on page change
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", route);
  window.addEventListener("DOMContentLoaded", function () {
    // Clone horse body into quiz SVG
    cloneHorseBody();
    route();

    // Debug mode
    if (location.search.indexOf("debug=1") !== -1) {
      enableDebug();
    }
  });

  // ===== CLONE HORSE BODY =====
  function cloneHorseBody() {
    var src = document.getElementById("horse-body-learn");
    var dest = document.getElementById("horse-body-quiz");
    if (src && dest) {
      dest.innerHTML = src.innerHTML;
      // Copy classes to child elements
      dest.querySelectorAll(".horse-silhouette").forEach(function (el) {
        el.classList.add("horse-silhouette");
      });
    }
  }

  // ===== SVG HOTSPOT RENDERING =====

  /**
   * Render hotspots into a given SVG <g> element.
   * @param {string} groupId   — ID of the <g> to render into
   * @param {Array}  parts     — Array of horse part objects
   * @param {Object} options
   *   - showLabels: boolean (true for learn, false for quiz "find" mode)
   *   - onClick: function(part, groupEl) — callback when hotspot clicked
   *   - onHover: function(part, groupEl) — callback on mouseenter
   *   - onLeave: function(part, groupEl) — callback on mouseleave
   */
  window.renderHotspots = function (groupId, parts, options) {
    options = options || {};
    var g = document.getElementById(groupId);
    if (!g) return;
    g.innerHTML = "";

    var ns = "http://www.w3.org/2000/svg";

    parts.forEach(function (part) {
      var group = document.createElementNS(ns, "g");
      group.classList.add("hotspot-group");
      group.setAttribute("data-id", part.id);

      // Label position
      var lx = part.x + (part.labelOffset ? part.labelOffset.dx : 0);
      var ly = part.y + (part.labelOffset ? part.labelOffset.dy : 0);

      // Leader line
      var line = document.createElementNS(ns, "line");
      line.setAttribute("x1", part.x);
      line.setAttribute("y1", part.y);
      line.setAttribute("x2", lx);
      line.setAttribute("y2", ly);
      line.classList.add("hotspot-line");

      // Label text
      var text = document.createElementNS(ns, "text");
      text.setAttribute("x", lx);
      text.setAttribute("y", ly - 4);
      text.setAttribute("text-anchor", part.labelAnchor || "middle");
      text.classList.add("hotspot-label");
      text.textContent = part.name;

      // Visible dot
      var dot = document.createElementNS(ns, "circle");
      dot.setAttribute("cx", part.x);
      dot.setAttribute("cy", part.y);
      dot.setAttribute("r", "8");
      dot.classList.add("hotspot-dot");

      // Invisible hit area (larger)
      var hit = document.createElementNS(ns, "circle");
      hit.setAttribute("cx", part.x);
      hit.setAttribute("cy", part.y);
      hit.setAttribute("r", "22");
      hit.classList.add("hotspot-hit");

      // Assemble
      if (options.showLabels !== false) {
        group.appendChild(line);
        group.appendChild(text);
      }
      group.appendChild(dot);
      group.appendChild(hit);

      // Events
      if (options.onClick) {
        hit.addEventListener("click", function () {
          options.onClick(part, group);
        });
      }
      if (options.onHover) {
        hit.addEventListener("mouseenter", function () {
          options.onHover(part, group);
        });
      }
      if (options.onLeave) {
        hit.addEventListener("mouseleave", function () {
          options.onLeave(part, group);
        });
      }

      g.appendChild(group);
    });
  };

  // ===== UTILITY: navigate =====
  window.navigateTo = function (page) {
    location.hash = "#" + page;
  };

  // ===== UTILITY: shuffle array =====
  window.shuffleArray = function (arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  };

  // ===== DEBUG MODE =====
  function enableDebug() {
    var svgs = document.querySelectorAll(".horse-svg");
    var ns = "http://www.w3.org/2000/svg";

    svgs.forEach(function (svg) {
      var debugG = document.createElementNS(ns, "g");
      debugG.classList.add("debug-grid");

      // Vertical lines every 100px
      for (var x = 0; x <= 1000; x += 100) {
        var line = document.createElementNS(ns, "line");
        line.setAttribute("x1", x);
        line.setAttribute("y1", 0);
        line.setAttribute("x2", x);
        line.setAttribute("y2", 700);
        line.classList.add("debug-line");
        debugG.appendChild(line);

        var txt = document.createElementNS(ns, "text");
        txt.setAttribute("x", x + 2);
        txt.setAttribute("y", 12);
        txt.classList.add("debug-text");
        txt.textContent = x;
        debugG.appendChild(txt);
      }

      // Horizontal lines every 100px
      for (var y = 0; y <= 665; y += 100) {
        var hline = document.createElementNS(ns, "line");
        hline.setAttribute("x1", 0);
        hline.setAttribute("y1", y);
        hline.setAttribute("x2", 1000);
        hline.setAttribute("y2", y);
        hline.classList.add("debug-line");
        debugG.appendChild(hline);

        var htxt = document.createElementNS(ns, "text");
        htxt.setAttribute("x", 4);
        htxt.setAttribute("y", y + 14);
        htxt.classList.add("debug-text");
        htxt.textContent = y;
        debugG.appendChild(htxt);
      }

      // Insert at beginning so it's behind everything
      svg.insertBefore(debugG, svg.firstChild);
    });

    // Show coordinates on click
    document.querySelectorAll(".horse-svg").forEach(function (svg) {
      svg.addEventListener("click", function (e) {
        var pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        var svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
        console.log("SVG coords:", Math.round(svgP.x), Math.round(svgP.y));
      });
    });
  }
})();
