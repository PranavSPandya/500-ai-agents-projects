(() => {
  "use strict";

  const RELEASE = new Date("2026-11-19T00:00:00");
  const ANNOUNCE = new Date("2023-12-04T00:00:00");

  const els = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
    weeks: document.getElementById("weeks"),
    progress: document.getElementById("progress"),
    sunsets: document.getElementById("sunsets"),
    wasted: document.getElementById("wasted"),
    parallax: document.getElementById("parallax"),
    canvas: document.getElementById("particles"),
  };

  let prev = { days: "", hours: "", minutes: "", seconds: "" };

  function pad(n, len = 2) {
    return String(n).padStart(len, "0");
  }

  function tick(el, key, value) {
    if (prev[key] !== value) {
      el.textContent = value;
      el.classList.remove("tick");
      void el.offsetWidth;
      el.classList.add("tick");
      prev[key] = value;
    }
  }

  function updateCountdown() {
    const now = new Date();
    const diff = RELEASE - now;

    if (diff <= 0) {
      els.days.textContent = "000";
      els.hours.textContent = "00";
      els.minutes.textContent = "00";
      els.seconds.textContent = "00";
      els.wasted.classList.add("active");
      return;
    }

    const totalSec = Math.floor(diff / 1000);
    const d = Math.floor(totalSec / 86400);
    const h = Math.floor((totalSec % 86400) / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;

    tick(els.days, "days", pad(d, 3));
    tick(els.hours, "hours", pad(h));
    tick(els.minutes, "minutes", pad(m));
    tick(els.seconds, "seconds", pad(s));

    els.weeks.textContent = Math.ceil(d / 7);

    const totalWait = RELEASE - ANNOUNCE;
    const elapsed = now - ANNOUNCE;
    const pct = Math.min(100, Math.max(0, (elapsed / totalWait) * 100));
    els.progress.textContent = `${pct.toFixed(1)}%`;

    els.sunsets.textContent = d.toLocaleString();
  }

  /* ── Parallax on mouse move ── */
  function initParallax() {
    const layers = els.parallax.querySelectorAll(".layer");

    document.addEventListener("mousemove", (e) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;

      layers.forEach((layer) => {
        const depth = parseFloat(layer.dataset.depth) || 0.1;
        const x = cx * depth * 40;
        const y = cy * depth * 20;
        layer.style.transform = `translateX(calc(-50% + ${x}px)) translateY(${y}px)`;
      });
    });

    if ("DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", (e) => {
        const cx = (e.gamma || 0) / 45;
        const cy = (e.beta || 0) / 45;

        layers.forEach((layer) => {
          const depth = parseFloat(layer.dataset.depth) || 0.1;
          const x = cx * depth * 30;
          const y = cy * depth * 15;
          layer.style.transform = `translateX(calc(-50% + ${x}px)) translateY(${y}px)`;
        });
      });
    }
  }

  /* ── Floating neon particles ── */
  function initParticles() {
    const canvas = els.canvas;
    const ctx = canvas.getContext("2d");
    const particles = [];
    const colors = ["#ff2d95", "#00f0ff", "#b537f2", "#ffd700", "#ff6b35"];
    const count = 60;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: Math.random() * -0.3 - 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.2,
        pulse: Math.random() * Math.PI * 2,
      };
    }

    for (let i = 0; i < count; i++) particles.push(createParticle());

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.02;
        const a = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = a;
        ctx.fill();

        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener("resize", resize);
    animate();
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
  initParallax();
  initParticles();
})();
