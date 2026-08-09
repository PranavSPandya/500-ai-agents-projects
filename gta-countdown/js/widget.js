(() => {
  "use strict";
  const RELEASE = new Date("2026-11-19T00:00:00");

  function pad(n, len = 2) {
    return String(n).padStart(len, "0");
  }

  function tick() {
    const diff = RELEASE - new Date();
    if (diff <= 0) {
      document.getElementById("w-days").textContent = "000";
      document.getElementById("w-hours").textContent = "00";
      document.getElementById("w-mins").textContent = "00";
      document.getElementById("w-secs").textContent = "00";
      return;
    }
    const s = Math.floor(diff / 1000);
    document.getElementById("w-days").textContent = pad(Math.floor(s / 86400), 3);
    document.getElementById("w-hours").textContent = pad(Math.floor((s % 86400) / 3600));
    document.getElementById("w-mins").textContent = pad(Math.floor((s % 3600) / 60));
    document.getElementById("w-secs").textContent = pad(s % 60);
  }

  tick();
  setInterval(tick, 1000);
})();
