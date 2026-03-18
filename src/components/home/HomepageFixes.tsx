"use client";

import { useEffect } from "react";

export function HomepageFixes() {
  useEffect(() => {
    // 1) Scroll cue — fade out on first scroll
    const scrollCue = document.getElementById("scrollCue");
    if (scrollCue) {
      const hideCue = () => scrollCue.classList.add("hidden");
      window.addEventListener("scroll", hideCue, { passive: true, once: true });
    }
  }, []);

  return null;
}

