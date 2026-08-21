import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { scrollRevealPresence } from "./scroll-reveal-presence";

describe("scrollRevealPresence", () => {
  it("keeps content visible while reduced-motion preference is unknown (SSR)", () => {
    const presence = scrollRevealPresence(null);
    assert.equal(presence.initial, "visible");
    assert.equal(presence.animate, "visible");
    assert.equal(presence.whileInView, undefined);
  });

  it("forces visible when the user prefers reduced motion", () => {
    const presence = scrollRevealPresence(true);
    assert.equal(presence.initial, "visible");
    assert.equal(presence.animate, "visible");
    assert.equal(presence.whileInView, undefined);
  });

  it("defers reveal to whileInView only when motion is explicitly allowed", () => {
    const presence = scrollRevealPresence(false);
    assert.equal(presence.initial, "hidden");
    assert.equal(presence.animate, undefined);
    assert.equal(presence.whileInView, "visible");
  });
});
