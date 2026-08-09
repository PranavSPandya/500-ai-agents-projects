/* Official GTA VI sneak peeks — fixed display order (pre-order → snapshots → follow → rest) */

const SNEAK_PEEKS = [
  /* ── 1. Pre-order ── */
  {
    title: "Pre-Orders Now Open",
    description:
      "Standard Edition ($79.99) and Ultimate Edition ($99.99) are live. Vintage Vice City Pack included for purchases before Nov 20, 2026. Pre-load starts Nov 12.",
    platform: "Newswire",
    url: "https://www.rockstargames.com/VI",
    thumbnail: null,
    platformColor: "#fcaf17",
    date: "June 25, 2026",
    source: "Rockstar Games",
    category: "preorder",
  },
  {
    title: "Official Cover Art Revealed",
    description:
      "Rockstar unveils the GTA VI box art starring Jason & Lucia and confirms pre-orders begin June 25 with the November 19, 2026 release locked in.",
    platform: "X (Twitter)",
    url: "https://x.com/rockstargames/status/2067594067030979053",
    thumbnail: null,
    platformColor: "#1da1f2",
    date: "June 18, 2026",
    source: "@rockstargames",
    category: "preorder",
  },
  {
    title: "Take-Two Confirms Launch Details",
    description:
      "CEO Strauss Zelnick reaffirms GTA VI ships November 19, 2026 on PS5 & Xbox Series X|S. Single-player experience at $79.99 standard.",
    platform: "Press Release",
    url: "https://taketwointeractivesoftwareinc.gcs-web.com/news-releases/news-release-details/rockstar-games-announces-pre-orders-grand-theft-auto-vi",
    thumbnail: null,
    platformColor: "#e31937",
    date: "June 2026",
    source: "Take-Two Interactive",
    category: "preorder",
  },

  /* ── 2. Snapshots & official media ── */
  {
    title: "New Screenshots Drop",
    description:
      "Rockstar releases in-engine screenshots teasing wildlife, interiors, vehicles, and the scale of Leonida ahead of launch.",
    platform: "Website",
    url: "https://www.rockstargames.com/VI",
    thumbnail: "https://img.youtube.com/vi/VQRLujxTm3c/hqdefault.jpg",
    date: "June 2026",
    source: "rockstargames.com/VI",
    category: "snapshots",
  },
  {
    title: "Grand Theft Auto VI Trailer 2",
    description:
      '"Vice City, baby!" — Jason & Lucia navigate robberies, police chases, and life on the run across Leonida.',
    platform: "YouTube",
    url: "https://www.youtube.com/watch?v=VQRLujxTm3c",
    thumbnail: "https://img.youtube.com/vi/VQRLujxTm3c/maxresdefault.jpg",
    date: "May 6, 2025",
    source: "Rockstar Games",
    category: "snapshots",
  },
  {
    title: "Grand Theft Auto VI Trailer 1",
    description:
      "First official look at Vice City and Leonida. Lucia on parole, Jason by her side — the Bonnie & Clyde of the 2020s.",
    platform: "YouTube",
    url: "https://www.youtube.com/watch?v=QdBZY2fkU-0",
    thumbnail: "https://img.youtube.com/vi/QdBZY2fkU-0/maxresdefault.jpg",
    date: "December 4, 2023",
    source: "Rockstar Games",
    category: "snapshots",
  },
  {
    title: "Grand Theft Auto VI: An Extended Look",
    description:
      "Netflix premiere August 27 at 3 PM ET — then YouTube and rockstargames.com/VI at 9 PM ET the same day.",
    platform: "Netflix",
    url: "https://www.netflix.com/title/81761351",
    thumbnail: "https://img.youtube.com/vi/VQRLujxTm3c/maxresdefault.jpg",
    date: "August 6, 2026",
    source: "Rockstar Games × Netflix",
    category: "snapshots",
  },
  {
    title: "Trailer Leaked — Watch the Real Thing",
    description:
      'Rockstar posted: "Our trailer has leaked so please watch the real thing on YouTube." 90M+ views in 24 hours.',
    platform: "X (Twitter)",
    url: "https://x.com/rockstargames/status/1731675005342486737",
    thumbnail: "https://img.youtube.com/vi/QdBZY2fkU-0/maxresdefault.jpg",
    date: "December 4, 2023",
    source: "@rockstargames",
    category: "snapshots",
  },

  /* ── 3. Follow official pages ── */
  {
    title: "Follow Rockstar on Instagram",
    description:
      "Behind-the-scenes art, character spotlights, and marketing drops land here before every major beat.",
    platform: "Instagram",
    url: "https://www.instagram.com/rockstargames/",
    thumbnail: null,
    platformColor: "#e1306c",
    date: "Ongoing",
    source: "@rockstargames",
    category: "follow",
  },
  {
    title: "Follow Rockstar on X",
    description:
      "Trailers, release updates, and breaking news drop on Rockstar's official X account first.",
    platform: "X (Twitter)",
    url: "https://x.com/rockstargames",
    thumbnail: null,
    platformColor: "#1da1f2",
    date: "Ongoing",
    source: "@rockstargames",
    category: "follow",
  },
  {
    title: "Rockstar on Facebook",
    description:
      "Official announcements, trailer drops, and community updates on Rockstar's Facebook page.",
    platform: "Facebook",
    url: "https://www.facebook.com/rockstargames",
    thumbnail: null,
    platformColor: "#1877f2",
    date: "Ongoing",
    source: "Rockstar Games",
    category: "follow",
  },
  {
    title: "Rockstar Games YouTube",
    description:
      "Both official trailers premiered here. Subscribe for the Extended Look and any future drops.",
    platform: "YouTube",
    url: "https://www.youtube.com/rockstargames",
    thumbnail: null,
    platformColor: "#ff0000",
    date: "Ongoing",
    source: "Rockstar Games",
    category: "follow",
  },

  /* ── 4. Everything else ── */
  {
    title: "Extended Look — YouTube & Website",
    description:
      "Same Extended Look hits Rockstar's YouTube channel and rockstargames.com/VI at 9 PM ET — six hours after Netflix.",
    platform: "X (Twitter)",
    url: "https://x.com/rockstargames",
    thumbnail: null,
    platformColor: "#1da1f2",
    date: "August 6, 2026",
    source: "@rockstargames",
    category: "other",
  },
];

const GAME_MODES = [
  {
    icon: "🎬",
    name: "Story Mode",
    tag: "Launch Day",
    description:
      "A single-player cinematic experience — Rockstar's biggest, most immersive open-world story yet. No multiplayer at launch.",
    details: ["Jason & Lucia dual narrative", "Mission-based progression", "Cinematic cutscenes"],
    confirmed: true,
  },
  {
    icon: "👫",
    name: "Dual Protagonists",
    tag: "Core Mechanic",
    description:
      "Switch between Jason Duval and Lucia Caminos during missions and free roam. Their relationship drives every decision.",
    details: ["Bonnie & Clyde dynamic", "Seamless character swap", "Shared criminal empire"],
    confirmed: true,
  },
  {
    icon: "🌴",
    name: "Open World Free Roam",
    tag: "Exploration",
    description:
      "Explore the entire state of Leonida — Vice City's neon strips, swamps, keys, national parks, and everything in between.",
    details: ["Largest GTA map ever", "Dynamic day/night cycle", "Wildlife & ecosystems"],
    confirmed: true,
  },
  {
    icon: "💎",
    name: "Standard Edition",
    tag: "$79.99",
    description:
      "The full single-player game on PS5 or Xbox Series X|S. Physical copies include a download code (no disc).",
    details: ["Full story campaign", "Digital pre-load Nov 12", "Vintage Vice City Pack*"],
    confirmed: true,
  },
  {
    icon: "👑",
    name: "Ultimate Edition",
    tag: "$99.99",
    description:
      "Premium vehicles, weapons, apparel, and story-integrated action woven throughout Jason & Lucia's journey.",
    details: ["Exclusive vehicles & weapons", "Premium apparel sets", "Upgrade available later"],
    confirmed: true,
  },
  {
    icon: "🌐",
    name: "GTA Online",
    tag: "Post-Launch TBD",
    description:
      "Rockstar has not confirmed a GTA Online mode for launch. A Leonida-based online world is widely expected to follow.",
    details: ["Not at Nov 19 launch", "GTA+ includes GTA V Online", "Future updates likely"],
    confirmed: false,
  },
];

/* Pre-order store links — set affiliate IDs in js/affiliate-config.js */
const PREORDER_STORES = [
  {
    name: "PlayStation Store",
    platform: "PS5",
    url: "https://store.playstation.com/",
    icon: "🎮",
    note: "Standard & Ultimate Edition",
  },
  {
    name: "Xbox Store",
    platform: "Xbox Series X|S",
    url: "https://www.xbox.com/games/store",
    icon: "🟢",
    note: "Standard & Ultimate Edition",
  },
  {
    name: "Rockstar Store",
    platform: "Official",
    url: "https://www.rockstargames.com/VI",
    icon: "⭐",
    note: "Official pre-order hub",
  },
  {
    name: "Amazon",
    platform: "Physical",
    url: "https://www.amazon.com/s?k=grand+theft+auto+vi",
    icon: "📦",
    note: "Physical box (download code inside)",
  },
];
