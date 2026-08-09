# Publishing, Monetization & Affiliate Guide

Complete guide for taking **Grand Theft Auto VI Countdown** to iOS, Google Play, earning from ads, and pre-order affiliate links.

> **Legal:** This app uses the Grand Theft Auto name as an unofficial fan project. See [LEGAL.md](LEGAL.md) for trademark risks. App Store rejection is possible even with disclaimers.

---

## Part 1: Phone App (What You Have Now)

The app is a **Progressive Web App (PWA)** with bottom-tab navigation — tap **Home, Peeks, Modes, Order, Art** to move between screens like a native app.

### Add to Home Screen (free, no store needed)

**iPhone (Safari):**
1. Open your hosted URL in Safari
2. Tap **Share** → **Add to Home Screen**
3. The countdown appears as an app icon on your home screen

**Android (Chrome):**
1. Open the URL in Chrome
2. Tap **⋮** menu → **Install app** or **Add to Home screen**

This gives you a home-screen icon and full-screen experience — similar to a lightweight app, **no store fees**.

### Native home-screen widgets (iOS/Android)

True **widgets** (the small countdown on your lock screen / home screen that update without opening the app) require **native code**:

| Platform | What's needed |
|----------|---------------|
| **iOS** | Swift/SwiftUI Widget Extension in Xcode |
| **Android** | Kotlin App Widget in Android Studio |

PWAs cannot add iOS/Android system widgets directly. To ship widgets you must wrap the app in a native shell (see Part 2).

---

## Part 2: Publishing to App Stores

### Costs at a glance

| Store | Fee | Type | Notes |
|-------|-----|------|-------|
| **Apple App Store** | **$99 USD/year** | Recurring annual | Required to publish. Renews every year or you lose distribution. |
| **Google Play** | **$25 USD** | **One-time** | Pay once when creating your Play Console account. No annual fee. |
| **Updates** | Free | — | No per-update charge on either store |
| **Revenue cut** | 15–30% | Per sale | Only applies if you sell the app or use in-app purchases |

**5-year cost comparison:** Apple ≈ $495 vs Google ≈ $25 (account fees only).

### Google Play — extra requirement (2024+)

New **personal** developer accounts must run a **14-day closed test** with at least **12 testers** before production release. Plan for this early.

---

### Option A: PWA only (fastest, cheapest)

1. Host on **GitHub Pages**, **Netlify**, or **Vercel** (free tiers available)
2. Users install via **Add to Home Screen**
3. **Cost:** $0
4. **Limitation:** No App Store listing, no native widgets, no AdMob in a simple PWA without extra setup

---

### Option B: Wrap as native app (recommended for stores)

Use a wrapper to put your web app inside a native shell:

| Tool | iOS | Android | Cost |
|------|-----|---------|------|
| [Capacitor](https://capacitorjs.com/) | ✅ | ✅ | Free (open source) |
| [Cordova](https://cordova.apache.org/) | ✅ | ✅ | Free |
| [PWA Builder](https://www.pwabuilder.com/) | ✅ | ✅ | Free |

**Steps (Capacitor example):**
```bash
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
npx cap init "GTA VI Countdown" com.yourname.gta6countdown
npx cap add ios
npx cap add android
# Copy gta-countdown/ into www/ or point webDir to it
npx cap sync
npx cap open ios    # Xcode → Archive → App Store Connect
npx cap open android  # Android Studio → Build → Play Console
```

---

### Apple App Store — step by step

1. **Enroll** in [Apple Developer Program](https://developer.apple.com/programs/) — **$99/year**
2. Create an **App ID** and **Bundle ID** (e.g. `com.yourname.gta6countdown`)
3. Build in **Xcode** (native or Capacitor wrapper)
4. Add **privacy policy URL** (required) — host a simple page stating you're unofficial
5. Upload via **App Store Connect**
6. Fill metadata: description, screenshots (6.7", 6.5", 5.5" iPhones), age rating
7. Submit for **review** (typically 1–3 days)

**Common rejection reasons for fan apps:**
- Using "Grand Theft Auto" in the app name without permission
- Missing disclaimer that you're not affiliated with Rockstar
- Scraping copyrighted images from trailers

---

### Google Play — step by step

1. Create [Google Play Console](https://play.google.com/console) account — **$25 one-time**
2. Complete **14-day closed test** (if new personal account)
3. Create app listing with store graphics, description, content rating questionnaire
4. Upload **AAB** (Android App Bundle) from Android Studio
5. Add **privacy policy** URL
6. Submit for review (often faster than Apple, hours to a few days)

---

## Part 3: Ads — Better Options Than Forced Video

You hate **interstitial video ads** (full-screen, wait 5 seconds, tap X) — most users do. Apple and Google also penalize apps that show too many intrusive ads.

### Ad types ranked (best → worst UX)

| Type | User experience | Revenue | Best for |
|------|-----------------|---------|----------|
| **Banner** (small bar top/bottom) | Low annoyance | Low | Always-on passive income |
| **Native ads** (styled like content) | Medium | Medium | Feed/list apps |
| **Rewarded video** (user chooses to watch for a perk) | Good — opt-in | Medium–High | Optional bonus content |
| **Interstitial** (forced full-screen) | Bad | High | Avoid for fan apps |

### Recommended setup

1. **Google AdMob** — works on both iOS and Android native wrappers
   - Use **banner ads** only on secondary screens (e.g. bottom of Peeks or Modes)
   - Never show ads on the Home countdown screen
   - Optionally offer **rewarded ads** ("Watch to unlock exclusive peek shuffle" — if you add features)

2. **Apple Search Ads** — you pay to promote, not earn (skip unless marketing)

3. **Sponsorship** — reach out to gaming accessory brands, VPN companies, etc. for a fixed monthly banner — often better money than AdMob for small apps

### AdMob rough earnings (fan app, 1,000 daily users)

- Banner only: **$1–5/day**
- Interstitials every screen: **$5–20/day** but higher uninstall rate
- Realistic for a niche countdown app: **$50–300/month** at moderate traffic

### PWA + ads

AdMob requires a native app wrapper. Pure browser PWA cannot use AdMob directly — use a Capacitor plugin or host with minimal banner via an ad network that supports web (e.g. Ezoic, Mediavine — need significant traffic).

---

## Part 4: Pre-Order Affiliate Income

### The honest answer

**Rockstar Games does not offer a public affiliate program** for GTA VI pre-orders. You cannot earn commission from PlayStation Store or Xbox Store links directly unless you're an approved media/commerce partner.

### What actually works

| Program | What you can earn | How to join |
|---------|-------------------|-------------|
| **Amazon Associates** | ~1–4% on physical GTA VI box pre-orders | [affiliate-program.amazon.com](https://affiliate-program.amazon.com) — free to apply |
| **IGN Finds / media commerce** | Commission on game sales | Requires publisher partnership (IGN-scale) |
| **Impact / CJ Affiliate** | Varies by retailer | Some third-party game key sellers — **avoid grey-market keys** |
| **Honey / Rakuten** | User cashback, not developer revenue | Not for app developers |

### Setup in this app

1. Apply for **Amazon Associates**
2. Get your tag (e.g. `yourname-20`)
3. Edit `js/affiliate-config.js`:

```javascript
const AFFILIATE_CONFIG = {
  enabled: true,
  amazonAssociateTag: "yourname-20",
  disclaimer: "We may earn a small commission on qualifying Amazon purchases at no extra cost to you.",
};
```

4. **Legally required:** Show the disclaimer (already in the Order tab when `enabled: true`)
5. **FTC requirement (US):** Clearly disclose affiliate links — our disclaimer handles this

### Realistic affiliate earnings

- GTA VI Ultimate Edition ≈ $100
- Amazon commission ≈ **$1–4 per sale**
- 100 pre-orders/month via your link ≈ **$100–400/month** (optimistic; most fan apps get far fewer)

PS5/Xbox digital pre-orders through Rockstar's site = **$0 affiliate** unless you become an official partner.

---

## Part 5: Recommended Launch Path

| Phase | Action | Cost |
|-------|--------|------|
| **1. Now** | Host PWA, share link, Add to Home Screen | $0 |
| **2. Week 1** | Apply Amazon Associates, enable affiliate config | $0 |
| **3. Week 2** | Wrap with Capacitor, submit to Google Play | $25 |
| **4. Month 1** | Enroll Apple Developer, submit to App Store | $99/year |
| **5. After launch** | Add AdMob banners (native build only), optional iOS widget | Free SDK |

---

## Part 6: Legal Checklist

- [ ] App name does not imply official Rockstar product
- [ ] Disclaimer visible: "Fan-made, not affiliated with Rockstar Games or Take-Two Interactive"
- [ ] No Rockstar logos or copyrighted trailer footage stored in the app
- [ ] Sneak peek links go to **official** sources (YouTube, X, Rockstar) — you link out, don't re-host
- [ ] Privacy policy page (required by both stores) — even if you collect no data, state that
- [ ] Affiliate disclosure if enabled

---

## Quick FAQ

**Q: Is the annual fee only for Apple?**  
Yes. Google is one-time $25. Apple is $99 every year.

**Q: Can I publish for free?**  
Yes — host as PWA and skip app stores entirely.

**Q: Will Rockstar sue me?**  
Unlikely for a free fan countdown with disclaimers, but using their trademarks in the **store listing title** increases risk. Use generic naming on stores.

**Q: Best way to make money?**  
Amazon affiliate on physical pre-orders + optional banner ads in a native wrapper. Avoid forced video ads.

**Q: Native widget on iPhone?**  
Requires rebuilding countdown logic in Swift WidgetKit — separate from the web app. Budget for iOS development or hire a dev.
