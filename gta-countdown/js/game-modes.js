(() => {
  "use strict";

  function init() {
    const grid = document.getElementById("modes-grid");
    if (!grid || typeof GAME_MODES === "undefined") return;

    grid.innerHTML = GAME_MODES.map(
      (mode) => `
      <article class="mode-card${mode.confirmed ? "" : " mode-tbd"}">
        <div class="mode-header">
          <span class="mode-icon">${mode.icon}</span>
          <div>
            <h3 class="mode-name">${mode.name}</h3>
            <span class="mode-tag">${mode.tag}</span>
          </div>
        </div>
        <p class="mode-desc">${mode.description}</p>
        <ul class="mode-details">
          ${mode.details.map((d) => `<li>${d}</li>`).join("")}
        </ul>
        ${mode.confirmed ? '<span class="mode-status confirmed">✓ Confirmed</span>' : '<span class="mode-status tbd">? Not confirmed for launch</span>'}
      </article>`
    ).join("");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
