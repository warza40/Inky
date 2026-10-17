import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function channel(hex, shift) {
  const value = parseInt(hex.slice(1), 16);
  const channelValue = (value >> shift) & 255;
  const srgb = channelValue / 255;
  return srgb <= 0.04045
    ? srgb / 12.92
    : ((srgb + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  return (
    0.2126 * channel(hex, 16) +
    0.7152 * channel(hex, 8) +
    0.0722 * channel(hex, 0)
  );
}

function contrast(foreground, background) {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

function declaredColor(css, pattern) {
  const match = css.match(pattern);
  assert.ok(match, `missing color declaration for ${pattern}`);
  return match[1].toLowerCase();
}

test("writing card publication label meets WCAG AAA on the card", () => {
  const css = readFileSync(new URL("./article-card.css", import.meta.url), "utf8");
  const background = declaredColor(
    css,
    /\.article-card\s*\{[^}]*background:\s*(#[0-9a-fA-F]{6})/,
  );
  const foreground = declaredColor(
    css,
    /\.article-card__published\s*\{[^}]*color:\s*(#[0-9a-fA-F]{6})/,
  );

  assert.equal(background, "#f8f7f4");
  assert.ok(
    contrast(foreground, background) >= 7,
    `${foreground} on ${background} is ${contrast(foreground, background).toFixed(2)}:1`,
  );
});

test("footer secondary copy meets WCAG AAA on the footer ground", () => {
  const css = readFileSync(new URL("./site-footer.css", import.meta.url), "utf8");
  const background = declaredColor(css, /--footer-bg:\s*(#[0-9a-fA-F]{6})/);
  const foreground = declaredColor(css, /--footer-muted:\s*(#[0-9a-fA-F]{6})/);

  assert.equal(background, "#141413");
  assert.ok(
    contrast(foreground, background) >= 7,
    `${foreground} on ${background} is ${contrast(foreground, background).toFixed(2)}:1`,
  );
});
