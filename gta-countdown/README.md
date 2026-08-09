# GTA VI Countdown

A fan-made countdown to **Grand Theft Auto VI** (November 19, 2026) with a Vice City / Miami synthwave aesthetic.

> **Disclaimer:** This is an unofficial fan project. Not affiliated with Rockstar Games or Take-Two Interactive.

## Features

- Live countdown (days, hours, minutes, seconds)
- **Sneak Peeks** — shuffled carousel of official Rockstar posts from YouTube, X, Netflix, Instagram & more (clickable links)
- **Game Modes & Editions** — confirmed story mode, dual protagonists, Standard/Ultimate editions, GTA Online status
- Parallax Miami synthwave cityscape background
- Animated pixel-art sports car on the highway
- Neon glow effects, scanlines, and floating particles
- **Leonida Preview** — static display-only artwork gallery
- **Embeddable widget** — iframe or script tag for blogs and fansites
- Fully responsive design

## Run locally

```bash
cd gta-countdown
python3 -m http.server 8080
```

Then visit [http://localhost:8080](http://localhost:8080).

## Embed the widget

**Iframe:**
```html
<iframe src="https://your-domain.com/gta-countdown/widget.html" width="340" height="160" frameborder="0" scrolling="no" title="GTA VI Countdown" style="border:none;border-radius:12px;"></iframe>
```

**Script:**
```html
<div id="gta6-countdown"></div>
<script src="https://your-domain.com/gta-countdown/js/widget-loader.js"></script>
```

Use the **Embed Widget** section on the main page to copy code with your hosted URL.

## Open-source assets & licenses

| Asset | Source | License |
|-------|--------|---------|
| Miami synthwave layers, car sprites, previews | [Warped Miami Synth](https://opengameart.org/content/warped-miami-synth) by Ansimuz | Free for personal & commercial use |
| Sunset photograph | [Pixabay #1867616](https://pixabay.com/photo/astronomy-1867616/) | Pixabay License (CC0) |
| Fonts (Bebas Neue, Orbitron, Rajdhani) | [Google Fonts](https://fonts.google.com) | Open Font License |

Sneak peek thumbnails use official YouTube preview images; all post links point to official Rockstar/social sources.

No official Rockstar Games logos, trademarks, or copyrighted artwork are used in the Leonida Preview gallery.

## Release date

**November 19, 2026** — PlayStation 5 & Xbox Series X|S (confirmed by Rockstar Games).
