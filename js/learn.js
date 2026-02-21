/**
 * learn.js — Learn mode: labeled diagram with info panel on click/hover.
 */

(function () {
  "use strict";

  var initialized = false;
  var activeGroup = null;

  window.initLearn = function () {
    if (initialized) return;
    initialized = true;

    var infoPanel = document.getElementById("info-panel");
    var infoName = document.getElementById("info-name");
    var infoDesc = document.getElementById("info-desc");
    var infoFun = document.getElementById("info-fun");

    renderHotspots("hotspots-learn", HORSE_PARTS, {
      showLabels: true,
      onClick: function (part, group) {
        showInfo(part, group);
      },
      onHover: function (part, group) {
        showInfo(part, group);
      },
      onLeave: function (part, group) {
        // Keep info shown if it was clicked — only clear hover highlight
        if (activeGroup !== group) {
          group.classList.remove("active");
        }
      }
    });

    function showInfo(part, group) {
      // Remove previous active
      if (activeGroup) {
        activeGroup.classList.remove("active");
      }
      activeGroup = group;
      group.classList.add("active");

      infoName.textContent = part.name;
      infoDesc.textContent = part.description;
      infoFun.textContent = part.funFact;
      infoPanel.hidden = false;
    }
  };
})();
