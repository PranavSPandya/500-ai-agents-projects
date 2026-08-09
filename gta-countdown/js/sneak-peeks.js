(() => {
  "use strict";

  const PLATFORM_ICONS = {
    YouTube: "▶",
    "X (Twitter)": "𝕏",
    Instagram: "📷",
    Newswire: "📰",
    Website: "🌐",
    "Press Release": "📋",
    Netflix: "🎬",
  };

  let peekOrder = [];
  let currentIndex = 0;
  let timer = null;
  const INTERVAL = 6000;

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function buildThumb(peek) {
    if (peek.thumbnail) {
      return `<img src="${peek.thumbnail}" alt="" class="peek-thumb-img" loading="lazy" />`;
    }
    const color = peek.platformColor || "#ff2d95";
    const icon = PLATFORM_ICONS[peek.platform] || "🔗";
    return `
      <div class="peek-thumb-fallback" style="--peek-color: ${color}">
        <span class="peek-platform-icon">${icon}</span>
        <span class="peek-platform-name">${peek.platform}</span>
      </div>`;
  }

  function renderPeek(peek, animate = true) {
    const card = document.getElementById("peek-card");
    if (!card) return;

    if (animate) card.classList.add("peek-exit");

    setTimeout(() => {
      card.innerHTML = `
        <a href="${peek.url}" target="_blank" rel="noopener noreferrer" class="peek-link">
          <div class="peek-media">${buildThumb(peek)}</div>
          <div class="peek-body">
            <div class="peek-meta">
              <span class="peek-platform-badge">${peek.platform}</span>
              <span class="peek-date">${peek.date}</span>
            </div>
            <h3 class="peek-title">${peek.title}</h3>
            <p class="peek-desc">${peek.description}</p>
            <span class="peek-cta">View original post →</span>
            <span class="peek-source">via ${peek.source}</span>
          </div>
        </a>`;

      card.classList.remove("peek-exit");
      card.classList.add("peek-enter");
      void card.offsetWidth;
      card.classList.remove("peek-enter");
    }, animate ? 300 : 0);

    updateDots();
    updateCounter();
  }

  function updateDots() {
    const dots = document.getElementById("peek-dots");
    if (!dots) return;
    dots.innerHTML = peekOrder
      .map(
        (_, i) =>
          `<button class="peek-dot${i === currentIndex ? " active" : ""}" data-i="${i}" aria-label="Sneak peek ${i + 1}"></button>`
      )
      .join("");
  }

  function updateCounter() {
    const counter = document.getElementById("peek-counter");
    if (counter) counter.textContent = `${currentIndex + 1} / ${peekOrder.length}`;
  }

  function goTo(index) {
    currentIndex = ((index % peekOrder.length) + peekOrder.length) % peekOrder.length;
    renderPeek(peekOrder[currentIndex]);
    resetTimer();
  }

  function next() {
    goTo(currentIndex + 1);
  }

  function prev() {
    goTo(currentIndex - 1);
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(next, INTERVAL);
  }

  function init() {
    peekOrder = shuffle(SNEAK_PEEKS);
    renderPeek(peekOrder[0], false);
    resetTimer();

    document.getElementById("peek-prev")?.addEventListener("click", prev);
    document.getElementById("peek-next")?.addEventListener("click", next);
    document.getElementById("peek-shuffle")?.addEventListener("click", () => {
      peekOrder = shuffle(SNEAK_PEEKS);
      currentIndex = 0;
      renderPeek(peekOrder[0]);
      resetTimer();
    });

    document.getElementById("peek-dots")?.addEventListener("click", (e) => {
      const dot = e.target.closest(".peek-dot");
      if (dot) goTo(parseInt(dot.dataset.i, 10));
    });

    const card = document.getElementById("peek-card");
    card?.addEventListener("mouseenter", () => clearInterval(timer));
    card?.addEventListener("mouseleave", resetTimer);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
