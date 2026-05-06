/** Latin Anybody 700 (TrueType) — ImageResponse / Satori expects TTF, not WOFF2 */
const ANYBODY_700_TTF =
  "https://fonts.gstatic.com/s/anybody/v13/VuJbdNvK2Ib2ppdWYq311GH32hxIv0sd5grncSUi2F_Wim4JMGfPrg.ttf";

export async function loadAnybody700(): Promise<ArrayBuffer> {
  const res = await fetch(ANYBODY_700_TTF);
  if (!res.ok) {
    throw new Error(`Failed to load Anybody 700: ${res.status}`);
  }
  return res.arrayBuffer();
}
