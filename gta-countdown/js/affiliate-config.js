/**
 * Affiliate configuration — fill in after joining partner programs.
 *
 * Rockstar does NOT offer a public affiliate program.
 * Realistic options:
 *   • Amazon Associates — physical GTA VI box pre-orders
 *   • IGN Finds / media commerce (requires publisher approval)
 *   • Impact/CJ affiliate networks (some retailers)
 *
 * Set enabled: true only after your links are approved and tagged.
 */
const AFFILIATE_CONFIG = {
  enabled: false,
  amazonAssociateTag: "", // e.g. "yourtag-20"
  disclaimer:
    "Links go to official retailers. We may earn a small commission on qualifying purchases at no extra cost to you.",
};

function buildStoreUrl(store) {
  if (!AFFILIATE_CONFIG.enabled) return store.url;

  if (store.name === "Amazon" && AFFILIATE_CONFIG.amazonAssociateTag) {
    const sep = store.url.includes("?") ? "&" : "?";
    return `${store.url}${sep}tag=${AFFILIATE_CONFIG.amazonAssociateTag}`;
  }

  return store.url;
}
