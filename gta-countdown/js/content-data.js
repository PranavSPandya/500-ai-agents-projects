/* Official GTA VI sneak peeks & confirmed game info — links to Rockstar/social posts */

const SNEAK_PEEKS = [
  {
    title: "Grand Theft Auto VI: An Extended Look",
    description:
      "Rockstar confirms a first-of-its-kind Netflix premiere on August 27 — extended footage hits YouTube and rockstargames.com/VI later the same day.",
    platform: "Netflix",
    url: "https://www.netflix.com/title/81761351",
    thumbnail: "https://img.youtube.com/vi/VQRLujxTm3c/maxresdefault.jpg",
    date: "August 6, 2026",
    source: "Rockstar Games × Netflix",
  },
  {
    title: "Official Cover Art Revealed",
    description:
      "Rockstar unveils the GTA VI box art starring Jason & Lucia, confirms pre-orders begin June 25 and locks the November 19, 2026 release date.",
    platform: "X (Twitter)",
    url: "https://x.com/rockstargames/status/2067594067030979053",
    thumbnail: null,
    platformColor: "#1da1f2",
    date: "June 18, 2026",
    source: "@rockstargames",
  },
  {
    title: "Pre-Orders Now Open",
    description:
      "Standard Edition ($79.99) and Ultimate Edition ($99.99) go live. Includes Vintage Vice City Pack for purchases before Nov 20, 2026.",
    platform: "Newswire",
    url: "https://www.rockstargames.com/newswire",
    thumbnail: null,
    platformColor: "#fcaf17",
    date: "June 25, 2026",
    source: "Rockstar Games",
  },
  {
    title: "Grand Theft Auto VI Trailer 2",
    description:
      '"Vice City, baby!" — Jason & Lucia navigate robberies, police chases, and life on the run across Leonida. Over 200M views.',
    platform: "YouTube",
    url: "https://www.youtube.com/watch?v=VQRLujxTm3c",
    thumbnail: "https://img.youtube.com/vi/VQRLujxTm3c/maxresdefault.jpg",
    date: "May 6, 2025",
    source: "Rockstar Games",
  },
  {
    title: "Trailer Leaked — Watch the Real Thing",
    description:
      'After an early leak, Rockstar posted: "Our trailer has leaked so please watch the real thing on YouTube." The internet obliged — 90M+ views in 24 hours.',
    platform: "X (Twitter)",
    url: "https://x.com/rockstargames/status/1731675005342486737",
    thumbnail: "https://img.youtube.com/vi/QdBZY2fkU-0/maxresdefault.jpg",
    date: "December 4, 2023",
    source: "@rockstargames",
  },
  {
    title: "Grand Theft Auto VI Trailer 1",
    description:
      "First official look at Vice City and the state of Leonida. Lucia on parole, Jason by her side — the Bonnie & Clyde of the 2020s.",
    platform: "YouTube",
    url: "https://www.youtube.com/watch?v=QdBZY2fkU-0",
    thumbnail: "https://img.youtube.com/vi/QdBZY2fkU-0/maxresdefault.jpg",
    date: "December 4, 2023",
    source: "Rockstar Games",
  },
  {
    title: "New Screenshots Drop",
    description:
      "Rockstar releases a batch of in-engine screenshots teasing wildlife, interiors, vehicles, and the scale of Leonida ahead of launch.",
    platform: "Website",
    url: "https://www.rockstargames.com/VI",
    thumbnail: "https://img.youtube.com/vi/VQRLujxTm3c/hqdefault.jpg",
    date: "June 2026",
    source: "rockstargames.com/VI",
  },
  {
    title: "Take-Two Earnings Call — Nov 19 Locked",
    description:
      "CEO Strauss Zelnick reaffirms GTA VI ships November 19, 2026 on PS5 & Xbox Series X|S. Marketing campaign kicks off summer 2026.",
    platform: "Press Release",
    url: "https://taketwointeractivesoftwareinc.gcs-web.com/news-releases/news-release-details/rockstar-games-announces-pre-orders-grand-theft-auto-vi",
    thumbnail: null,
    platformColor: "#e31937",
    date: "June 2026",
    source: "Take-Two Interactive",
  },
  {
    title: "Extended Look — YouTube & Website Too",
    description:
      "Rockstar confirms the same Extended Look hits the official YouTube channel and rockstargames.com/VI at 9 PM ET — six hours after the Netflix premiere.",
    platform: "X (Twitter)",
    url: "https://x.com/rockstargames",
    thumbnail: null,
    platformColor: "#1da1f2",
    date: "August 6, 2026",
    source: "@rockstargames",
  },
  {
    title: "Rockstar on Facebook",
    description:
      "Official announcements, trailer drops, and community updates post to Rockstar's Facebook page alongside every major marketing beat.",
    platform: "Facebook",
    url: "https://www.facebook.com/rockstargames",
    thumbnail: null,
    platformColor: "#1877f2",
    date: "Ongoing",
    source: "Rockstar Games",
  },
  {
    title: "Follow Rockstar on Instagram",
    description:
      "Behind-the-scenes art, character spotlights, and marketing drops land on Rockstar's official Instagram before every major beat.",
    platform: "Instagram",
    url: "https://www.instagram.com/rockstargames/",
    thumbnail: null,
    platformColor: "#e1306c",
    date: "Ongoing",
    source: "@rockstargames",
  },
  {
    title: "Netflix × GTA VI Partnership",
    description:
      '"Grand Theft Auto VI: An Extended Look" streams exclusively on Netflix Aug 27 at 3 PM ET — a new frontier for game marketing.',
    platform: "Netflix",
    url: "https://www.netflix.com/title/81761351",
    thumbnail: null,
    platformColor: "#e50914",
    date: "August 27, 2026",
    source: "Netflix",
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
      "Rockstar has not confirmed a GTA Online mode for launch. A Leonida-based online world is widely expected to follow, as with GTA V.",
    details: ["Not at Nov 19 launch", "GTA+ includes GTA V Online", "Future updates likely"],
    confirmed: false,
  },
];
