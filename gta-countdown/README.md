# GTA VI Countdown App

Mobile-first fan countdown to **Grand Theft Auto VI** (November 19, 2026).

> Unofficial fan project — not affiliated with Rockstar Games or Take-Two Interactive.

## Features

- **Bottom-tab app navigation** — Home, Peeks, Modes, Order, Art
- Live countdown with hype stats
- **Sneak Peeks** — ordered carousel: pre-orders → snapshots → follow pages → more (swipeable)
- **Game Modes** — confirmed editions & features
- **Pre-Order** tab with official store links + affiliate config
- **PWA** — Add to Home Screen for full-screen phone experience
- Leonida Preview gallery (display only)

## Run locally

```bash
cd gta-countdown
python3 -m http.server 8080
```

Open on your phone (same Wi-Fi): `http://<your-ip>:8080`

## Add to Home Screen (phone widget experience)

- **iPhone:** Safari → Share → Add to Home Screen
- **Android:** Chrome → Install app / Add to Home screen

See **[PUBLISHING.md](PUBLISHING.md)** for App Store / Google Play submission, costs, ads, and affiliate setup.

## Affiliate setup

Edit `js/affiliate-config.js` after joining Amazon Associates:

```javascript
enabled: true,
amazonAssociateTag: "your-tag-20",
```

## Open-source assets

| Asset | Source |
|-------|--------|
| Miami synthwave art | [Warped Miami Synth](https://opengameart.org/content/warped-miami-synth) by Ansimuz |
| Sunset photo | [Pixabay CC0](https://pixabay.com/photo/astronomy-1867616/) |
| Fonts | Google Fonts (OFL) |
