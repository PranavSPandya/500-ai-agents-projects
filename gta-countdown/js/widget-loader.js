(function () {
  var container = document.getElementById("gta6-countdown");
  if (!container) return;
  var script = document.currentScript;
  var base = script && script.src ? script.src.replace(/js\/widget-loader\.js.*$/, "") : "";
  var iframe = document.createElement("iframe");
  iframe.src = base + "widget.html";
  iframe.width = "340";
  iframe.height = "160";
  iframe.frameBorder = "0";
  iframe.scrolling = "no";
  iframe.title = "GTA VI Countdown";
  iframe.style.cssText = "border:none;border-radius:12px;overflow:hidden;";
  container.appendChild(iframe);
})();
