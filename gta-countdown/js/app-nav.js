(() => {
  "use strict";

  const screens = document.querySelectorAll(".app-screen");
  const tabs = document.querySelectorAll(".app-tab");
  let active = "home";

  function showScreen(id) {
    active = id;
    screens.forEach((s) => {
      const on = s.dataset.screen === id;
      s.classList.toggle("active", on);
      s.setAttribute("aria-hidden", on ? "false" : "true");
    });
    tabs.forEach((t) => {
      const on = t.dataset.tab === id;
      t.classList.toggle("active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function initTabs() {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => showScreen(tab.dataset.tab));
    });
  }

  function initPreorder() {
    const grid = document.getElementById("preorder-grid");
    if (!grid || typeof PREORDER_STORES === "undefined") return;

    const disclaimer = document.getElementById("affiliate-disclaimer");
    if (disclaimer && typeof AFFILIATE_CONFIG !== "undefined") {
      disclaimer.textContent = AFFILIATE_CONFIG.disclaimer;
      disclaimer.hidden = !AFFILIATE_CONFIG.enabled;
    }

    grid.innerHTML = PREORDER_STORES.map(
      (store) => `
      <a href="${buildStoreUrl(store)}" target="_blank" rel="noopener noreferrer" class="preorder-card">
        <span class="preorder-icon">${store.icon}</span>
        <div class="preorder-info">
          <span class="preorder-name">${store.name}</span>
          <span class="preorder-platform">${store.platform}</span>
          <span class="preorder-note">${store.note}</span>
        </div>
        <span class="preorder-arrow">→</span>
      </a>`
    ).join("");
  }

  function initInstallHint() {
    const hint = document.getElementById("install-hint");
    const dismiss = document.getElementById("install-dismiss");
    if (!hint) return;

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isStandalone || localStorage.getItem("install-hint-dismissed")) {
      hint.hidden = true;
      return;
    }

    dismiss?.addEventListener("click", () => {
      hint.hidden = true;
      localStorage.setItem("install-hint-dismissed", "1");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initTabs();
      initPreorder();
      initInstallHint();
    });
  } else {
    initTabs();
    initPreorder();
    initInstallHint();
  }
})();
