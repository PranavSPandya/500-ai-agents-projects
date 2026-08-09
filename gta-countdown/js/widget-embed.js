(() => {
  "use strict";

  function getBaseUrl() {
    const { origin, pathname } = window.location;
    const base = pathname.replace(/\/[^/]*$/, "/");
    return `${origin}${base}`;
  }

  function init() {
    const base = getBaseUrl();
    const iframeCode = `<iframe src="${base}widget.html" width="340" height="160" frameborder="0" scrolling="no" title="GTA VI Countdown" style="border:none;border-radius:12px;overflow:hidden;"></iframe>`;
    const scriptCode = `<div id="gta6-countdown"></div>\n<script src="${base}js/widget-loader.js"><\/script>`;

    const iframeEl = document.getElementById("embed-iframe-code");
    const scriptEl = document.getElementById("embed-script-code");
    if (iframeEl) iframeEl.textContent = iframeCode;
    if (scriptEl) scriptEl.textContent = scriptCode;

    document.querySelectorAll(".copy-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = document.getElementById(btn.dataset.copy);
        if (!target) return;
        navigator.clipboard.writeText(target.textContent).then(() => {
          const orig = btn.textContent;
          btn.textContent = "Copied!";
          setTimeout(() => { btn.textContent = orig; }, 2000);
        });
      });
    });

    const preview = document.getElementById("widget-preview");
    if (preview) {
      preview.innerHTML = `<iframe src="${base}widget.html" width="340" height="160" frameborder="0" scrolling="no" title="GTA VI Countdown preview" style="border:none;border-radius:12px;"></iframe>`;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
