import { CONFIG } from "./config";

const SPD_MIN = 0.024;
const SPD_MAX = 0.056;

type EyeMode = "walk" | "look" | "wide";

function makeInky(sz: number, variant: number, eyeMode: EyeMode) {
  const w = sz * 0.54;
  const h = sz * 0.92;

  const shapes = [
    { rx: w, ry: h * 0.5, ox: 0.02 },
    { rx: w * 0.88, ry: h * 0.55, ox: -0.03 },
    { rx: w * 1.12, ry: h * 0.44, ox: 0.01 },
    { rx: w * 0.96, ry: h * 0.48, ox: -0.05 },
    { rx: w * 1.05, ry: h * 0.52, ox: 0.04 },
  ];
  const b = shapes[variant % 5]!;
  const cx = b.ox * sz;
  const cy = -(h * 0.54);

  const er = sz * 0.118;
  const eyeY = -(h * 0.57);
  const positions = {
    walk: { lx: -(sz * 0.13), ly: eyeY, rx: sz * 0.13, ry: eyeY },
    look: { lx: -(sz * 0.115), ly: eyeY + sz * 0.02, rx: sz * 0.145, ry: eyeY - sz * 0.015 },
    wide: { lx: -(sz * 0.13), ly: eyeY - sz * 0.01, rx: sz * 0.13, ry: eyeY - sz * 0.01 },
  };
  const ep = positions[eyeMode] ?? positions.walk;
  const eR = eyeMode === "wide" ? er * 1.38 : er;
  const pdx = eyeMode === "look" ? 1.8 : 0;
  const pdy = eyeMode === "look" ? 1.5 : 0;

  const tLen = sz * 0.19;
  const tW = sz * 0.058;
  const tSp = b.rx * 0.65;
  const tY = -(h * 0.06);

  const tuft =
    variant === 1 || variant === 3
      ? `
    <path d="M ${cx - sz * 0.04} ${-(h * 1.0)} C ${-(sz * 0.18)} ${-(h * 1.18)} ${-(sz * 0.1)} ${-(h * 1.24)} ${-(sz * 0.03)} ${-(h * 1.26)}"
      stroke="#1c1812" stroke-width="${tW * 0.75}" fill="none" stroke-linecap="round"/>
    <path d="M ${cx + sz * 0.04} ${-(h * 1.0)} C  ${sz * 0.2} ${-(h * 1.16)}  ${sz * 0.12} ${-(h * 1.22)}  ${sz * 0.05} ${-(h * 1.24)}"
      stroke="#1c1812" stroke-width="${tW * 0.65}" fill="none" stroke-linecap="round"/>
  `
      : "";

  const vw = (b.rx + sz * 0.28) * 2;
  const vh = h * 1.35 + tLen;
  const vx = -(b.rx + sz * 0.28);
  const vy = -(h * 1.28);

  return `<svg viewBox="${vx.toFixed(1)} ${vy.toFixed(1)} ${vw.toFixed(1)} ${vh.toFixed(1)}"
    width="${vw.toFixed(0)}" height="${vh.toFixed(0)}" overflow="visible" fill="none">

    <ellipse cx="${cx}" cy="${cy}" rx="${(b.rx * 1.28).toFixed(1)}" ry="${(b.ry * 1.22).toFixed(1)}"
      fill="#1c1812" opacity=".055"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${(b.rx * 1.15).toFixed(1)}" ry="${(b.ry * 1.12).toFixed(1)}"
      fill="#1c1812" opacity=".13"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${b.rx.toFixed(1)}" ry="${b.ry.toFixed(1)}"
      fill="#1c1812" opacity=".9"/>
    <ellipse cx="${(cx * 0.6).toFixed(1)}" cy="${(cy - h * 0.06).toFixed(1)}"
      rx="${(b.rx * 0.68).toFixed(1)}" ry="${(b.ry * 0.55).toFixed(1)}"
      fill="#3d3428" opacity=".22"/>
    <ellipse cx="${cx}" cy="${(-(h * 0.16)).toFixed(1)}"
      rx="${(b.rx * 0.88).toFixed(1)}" ry="${(h * 0.22).toFixed(1)}"
      fill="#1c1812" opacity=".65"/>

    ${tuft}

    <circle cx="${ep.lx.toFixed(1)}" cy="${ep.ly.toFixed(1)}" r="${eR.toFixed(1)}"
      fill="rgba(255,255,255,.95)"/>
    <circle cx="${ep.rx.toFixed(1)}" cy="${ep.ry.toFixed(1)}" r="${eR.toFixed(1)}"
      fill="rgba(255,255,255,.95)"/>
    <circle cx="${(ep.lx + pdx).toFixed(1)}" cy="${(ep.ly + pdy).toFixed(1)}" r="${(eR * 0.46).toFixed(1)}"
      fill="#080604"/>
    <circle cx="${(ep.rx + pdx).toFixed(1)}" cy="${(ep.ry + pdy).toFixed(1)}" r="${(eR * 0.46).toFixed(1)}"
      fill="#080604"/>
    <circle cx="${(ep.lx - eR * 0.3).toFixed(1)}" cy="${(ep.ly - eR * 0.3).toFixed(1)}" r="${(eR * 0.22).toFixed(1)}"
      fill="rgba(255,255,255,.88)"/>
    <circle cx="${(ep.rx - eR * 0.3).toFixed(1)}" cy="${(ep.ry - eR * 0.3).toFixed(1)}" r="${(eR * 0.22).toFixed(1)}"
      fill="rgba(255,255,255,.88)"/>
    <circle cx="${(ep.lx + eR * 0.2).toFixed(1)}" cy="${(ep.ly + eR * 0.2).toFixed(1)}" r="${(eR * 0.1).toFixed(1)}"
      fill="rgba(255,255,255,.42)"/>
    <circle cx="${(ep.rx + eR * 0.2).toFixed(1)}" cy="${(ep.ry + eR * 0.2).toFixed(1)}" r="${(eR * 0.1).toFixed(1)}"
      fill="rgba(255,255,255,.42)"/>

    <path d="M ${(-tSp * 0.72).toFixed(1)} ${tY.toFixed(1)} C ${(-tSp * 0.8).toFixed(1)} ${(tY + tLen * 0.4).toFixed(1)} ${(-tSp * 0.78).toFixed(1)} ${(tY + tLen * 0.75).toFixed(1)} ${(-tSp * 0.72).toFixed(1)} ${(tY + tLen).toFixed(1)}"
      stroke="#1c1812" stroke-width="${tW.toFixed(1)}" fill="none" stroke-linecap="round" class="lf"/>
    <path d="M ${(-tSp * 0.3).toFixed(1)} ${(tY + h * 0.02).toFixed(1)} C ${(-tSp * 0.3).toFixed(1)} ${(tY + tLen * 0.5).toFixed(1)} ${(-tSp * 0.25).toFixed(1)} ${(tY + tLen * 0.85).toFixed(1)} ${(-tSp * 0.22).toFixed(1)} ${(tY + tLen).toFixed(1)}"
      stroke="#1c1812" stroke-width="${(tW * 0.82).toFixed(1)}" fill="none" stroke-linecap="round" class="lb"/>
    <path d="M ${(tSp * 0.72).toFixed(1)} ${tY.toFixed(1)} C ${(tSp * 0.8).toFixed(1)} ${(tY + tLen * 0.4).toFixed(1)} ${(tSp * 0.78).toFixed(1)} ${(tY + tLen * 0.75).toFixed(1)} ${(tSp * 0.72).toFixed(1)} ${(tY + tLen).toFixed(1)}"
      stroke="#1c1812" stroke-width="${tW.toFixed(1)}" fill="none" stroke-linecap="round" class="rf"/>
    <path d="M ${(tSp * 0.3).toFixed(1)} ${(tY + h * 0.02).toFixed(1)} C ${(tSp * 0.3).toFixed(1)} ${(tY + tLen * 0.5).toFixed(1)} ${(tSp * 0.25).toFixed(1)} ${(tY + tLen * 0.85).toFixed(1)} ${(tSp * 0.22).toFixed(1)} ${(tY + tLen).toFixed(1)}"
      stroke="#1c1812" stroke-width="${(tW * 0.82).toFixed(1)}" fill="none" stroke-linecap="round" class="rb"/>

    <ellipse cx="0" cy="${(tY + tLen + sz * 0.04).toFixed(1)}"
      rx="${(b.rx * 0.52).toFixed(1)}" ry="${(sz * 0.055).toFixed(1)}"
      fill="rgba(28,24,18,.14)"/>
  </svg>`;
}

type Walker = {
  el: HTMLDivElement;
  inner: HTMLDivElement;
  sz: number;
  v: number;
  dur: string;
  del: string;
};

let ST: "idle" | "walking" | "stopped" | "scattering" | "door" = "idle";
let walkers: Walker[] = [];
let rafId: number | null = null;
let timer: ReturnType<typeof setTimeout> | null = null;
/** Only the first scheduled spawn uses `firstSpawnDelay*`; all later uses `minInterval`/`maxInterval`. */
let useFirstSpawnDelay = true;
const prints: HTMLDivElement[] = [];

const BOBS = ["bob-a", "bob-b", "bob-c", "bob-d", "bob-e"];

function mkPrint(x: number) {
  const p = document.createElement("div");
  p.className = "print";
  p.style.left = `${x}px`;
  const o = 0.018 + Math.random() * 0.014;
  p.style.opacity = String(o);
  document.body.appendChild(p);
  prints.push(p);
  setTimeout(() => {
    p.style.opacity = "0";
  }, 3200);
  setTimeout(() => p.remove(), 5200);
}

function schedule() {
  const d = useFirstSpawnDelay
    ? CONFIG.firstSpawnDelayMin +
      Math.random() * (CONFIG.firstSpawnDelayMax - CONFIG.firstSpawnDelayMin)
    : CONFIG.minInterval + Math.random() * (CONFIG.maxInterval - CONFIG.minInterval);
  useFirstSpawnDelay = false;
  timer = setTimeout(spawn, d);
}

function despawn() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;
  const g = document.getElementById("group");
  if (!g) return;
  g.innerHTML = "";
  g.classList.remove("live");
  prints.forEach((p) => p.remove());
  prints.length = 0;
  walkers = [];
  ST = "idle";
  schedule();
}

function scatter(grp: HTMLElement) {
  ST = "scattering";
  walkers.forEach((w, i) => {
    const dx = (Math.random() - 0.5) * 150;
    const dy = -(58 + Math.random() * 95);
    const dx2 = dx * 1.25 + (Math.random() - 0.5) * 50;
    w.el.style.setProperty("--dx", `${dx}px`);
    w.el.style.setProperty("--dy", `${dy}px`);
    w.el.style.setProperty("--dx2", `${dx2}px`);
    w.el.style.animation = `scatter .62s ${i * 0.07}s cubic-bezier(.4,0,1,1) both`;
  });
  setTimeout(() => {
    grp.innerHTML = "";
    grp.classList.remove("live");
    prints.forEach((p) => p.remove());
    prints.length = 0;
    walkers = [];
    openDoor();
  }, 750);
}

export function openDoor() {
  document.getElementById("veil")?.classList.add("open");
  ST = "door";
}

export function closeDoor() {
  const v = document.getElementById("veil");
  if (!v) return;
  v.style.transition = "opacity .45s";
  v.style.opacity = "0";
  setTimeout(() => {
    v.classList.remove("open");
    v.style.opacity = "";
    v.style.transition = "";
    ST = "idle";
    schedule();
  }, 450);
}

export function enterStudio() {
  if (typeof window !== "undefined") {
    window.location.href = CONFIG.hiddenURL;
  }
}

function trigger(grp: HTMLElement, left: boolean) {
  ST = "stopped";
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;

  walkers.forEach((w, i) => {
    setTimeout(() => {
      w.el.style.animation = "stop-squish .42s ease both";
    }, i * 55);
  });

  setTimeout(() => {
    walkers.forEach((w) => {
      w.inner.innerHTML = makeInky(w.sz, w.v, "wide");
      if (!left) {
        const s = w.inner.querySelector("svg");
        if (s) (s as SVGSVGElement).style.transform = "scaleX(-1)";
      }
    });
  }, 480);

  setTimeout(() => {
    walkers.forEach((w) => {
      w.inner.innerHTML = makeInky(w.sz, w.v, "look");
      if (!left) {
        const s = w.inner.querySelector("svg");
        if (s) (s as SVGSVGElement).style.transform = "scaleX(-1)";
      }
    });
  }, 940);

  const pauseAfterLook = 1000 + Math.random() * 1000;
  setTimeout(() => scatter(grp), 940 + pauseAfterLook);
}

function spawn() {
  if (ST !== "idle") return;
  const grpEl = document.getElementById("group");
  if (!grpEl) return;
  const grp = grpEl;
  grp.innerHTML = "";
  walkers = [];

  const n = 3 + Math.floor(Math.random() * 4);
  const left = Math.random() > 0.5;
  const spdBase = SPD_MIN + Math.random() * (SPD_MAX - SPD_MIN);
  const vw = window.innerWidth;
  const startX = left ? vw + 60 : -(n * 72 + 60);
  const endX = left ? -(n * 72 + 80) : vw + 80;

  grp.style.transform = `translateX(${startX}px)`;
  grp.style.bottom = `${12 + Math.floor(Math.random() * 8)}px`;

  for (let i = 0; i < n; i++) {
    const sz = 26 + Math.random() * 24;
    const v = Math.floor(Math.random() * 5);
    const bob = BOBS[Math.floor(Math.random() * BOBS.length)]!;
    const dur = (0.28 + Math.random() * 0.26).toFixed(2) + "s";
    const del = (i * 0.07 + Math.random() * 0.1).toFixed(2) + "s";

    const outer = document.createElement("div");
    outer.className = "creature";
    outer.style.marginRight = `${4 + Math.random() * 18}px`;
    outer.style.marginBottom = `${2 + Math.random() * 12}px`;

    const inner = document.createElement("div");
    inner.className = "creature-bob";
    inner.style.cssText = `animation:${bob} ${dur} ${del} ease-in-out infinite;transform-origin:bottom center;`;
    inner.innerHTML = makeInky(sz, v, "walk");

    if (!left) {
      const svg = inner.querySelector("svg");
      if (svg) svg.style.transform = "scaleX(-1)";
    }

    const fd = (parseFloat(dur) * 0.72).toFixed(2) + "s";
    const bd = (parseFloat(dur) * 0.88).toFixed(2) + "s";
    inner.querySelectorAll(".lf,.rf").forEach((t) => {
      (t as SVGPathElement).style.animation = `leg-f ${fd} ${del} ease-in-out infinite`;
    });
    inner.querySelectorAll(".lb,.rb").forEach((t) => {
      (t as SVGPathElement).style.animation = `leg-b ${bd} ${del} ease-in-out infinite`;
    });

    const sh = document.createElement("div");
    sh.className = "creature-shadow";
    sh.style.cssText = `width:${sz * 0.55}px;height:${sz * 0.06}px;`;

    outer.appendChild(inner);
    outer.appendChild(sh);
    grp.appendChild(outer);
    walkers.push({ el: outer, inner, sz, v, dur, del });
  }

  grp.classList.add("live");
  grp.onclick = () => {
    if (ST === "walking") trigger(grp, left);
  };

  let t0: number | null = null;
  let cx = startX;
  const dir = left ? -1 : 1;

  ST = "walking";

  function step(ts: number) {
    if (!t0) t0 = ts;
    if (ST !== "walking") return;
    const drift = Math.sin(ts * 0.0018) * 4 + Math.cos(ts * 0.00135) * 2.5;
    cx = startX + dir * spdBase * (ts - t0) + drift;
    grp.style.transform = `translateX(${cx}px)`;

    walkers.forEach((w, i) => {
      const str =
        Math.sin(ts * 0.0019 + i * 1.7) * 3 + Math.cos(ts * 0.0014 + i * 0.9) * 1.8;
      w.el.style.transform = `translateX(${str}px)`;
    });

    if (Math.random() < 0.004) {
      mkPrint(cx + (left ? grp.offsetWidth * 0.2 : grp.offsetWidth * 0.78));
    }

    if (left ? cx < endX : cx > endX) {
      despawn();
      return;
    }
    rafId = requestAnimationFrame(step);
  }
  rafId = requestAnimationFrame(step);
}

function devSpawn() {
  if (timer) clearTimeout(timer);
  timer = null;
  if (ST === "idle") spawn();
  else if (ST === "walking") {
    const g = document.getElementById("group");
    if (g) trigger(g, true);
  }
}

export function initInkyWalkers(root: HTMLElement) {
  useFirstSpawnDelay = true;
  schedule();

  let kb = "";

  const onKey = (e: KeyboardEvent) => {
    const t = e.target as HTMLElement | null;
    if (t && (t.closest("input, textarea, [contenteditable='true']") || t.isContentEditable)) {
      return;
    }

    // Use e.code (physical key), not e.key — Option/Alt combos often change e.key on macOS.
    // Avoid Cmd/Ctrl+Shift+G: Chrome uses Cmd+G / Cmd+Shift+G for Find and may not deliver the event to the page.
    if (e.code === "KeyG" && e.shiftKey && e.altKey && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      devSpawn();
      return;
    }
    // Fallback: Cmd+Shift+9 / Ctrl+Shift+9 (usually not bound by the browser).
    if (e.code === "Digit9" && e.shiftKey && (e.metaKey || e.ctrlKey) && !e.altKey) {
      e.preventDefault();
      devSpawn();
      return;
    }

    kb = (kb + e.key).slice(-4);
    if (kb.includes("花")) {
      kb = "";
      devSpawn();
    }
  };

  window.addEventListener("keydown", onKey, true);

  const candle = document.getElementById("candle-cursor");
  const onMove = (e: MouseEvent) => {
    if (!candle) return;
    candle.style.left = `${e.clientX}px`;
    candle.style.top = `${e.clientY}px`;
  };
  document.addEventListener("mousemove", onMove);

  const doorClick = root.querySelector(".door-click");
  const onEnter = () => {
    candle?.classList.add("visible");
    root.style.cursor = "none";
  };
  const onLeave = () => {
    candle?.classList.remove("visible");
    root.style.cursor = "";
  };
  doorClick?.addEventListener("mouseenter", onEnter);
  doorClick?.addEventListener("mouseleave", onLeave);

  document.head.appendChild(
    document.createComment(`
  you're the kind of person who reads source code. follow the small ones.
`)
  );

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    root.querySelectorAll(".creature-bob").forEach((c) => {
      (c as HTMLElement).style.animation = "none";
    });
  }

  return () => {
    if (timer) clearTimeout(timer);
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener("keydown", onKey, true);
    document.removeEventListener("mousemove", onMove);
    doorClick?.removeEventListener("mouseenter", onEnter);
    doorClick?.removeEventListener("mouseleave", onLeave);
    const g = document.getElementById("group");
    if (g) {
      g.innerHTML = "";
      g.classList.remove("live");
    }
    prints.forEach((p) => p.remove());
    prints.length = 0;
    walkers = [];
  };
}
