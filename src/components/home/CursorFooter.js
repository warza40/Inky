/**
 * CursorFooter — animated pixel footer
 *
 * Bot (Cursor logo style) rolls right → tows a paper banner on a string
 * ("hand-coded with cursor" in pixel font) → two parachutes lift the
 * left end of the paper. Loops seamlessly. Sunflower bobs on bot's head.
 *
 * Config: new CursorFooter(canvas, { speed: 0.32, scale: 3, text: '...' })
 */

const DEFAULT_CONFIG = {
  speed: 0.32,
  scale: 3,
  text: "hand-coded with cursor",
};

const COLORS = {
  body: "#2B2F37",
  bodyH: "#373C47",
  bodyS: "#1E2228",
  eyeB: "#151820",
  eyeW: "#EFEFEF",
  pupil: "#FFFFFF",
  wRim: "#555A60",
  wMid: "#7A8088",
  wHub: "#9DA3AB",
  wShi: "#BCC0C6",
  wDark: "#3A3E44",
  axle: "#48505A",
  stem: "#4A7A2A",
  stemD: "#2E5218",
  leaf: "#5A9A32",
  leafD: "#3A6A1A",
  pA: "#F5B800",
  pB: "#E08800",
  pC: "#FFDA40",
  ctr: "#5A3010",
  ctrH: "#7A4818",
  seed: "#3A1E08",
  paper: "#F2EDD8",
  paperS: "#DDD5B8",
  paperL: "#C8C0A0",
  paperT: "#1E1E1E",
  str: "#888070",
  c1: "#D04020",
  c1d: "#902810",
  c1l: "#F06040",
  c2: "#2848C8",
  c2d: "#1428A0",
  c2l: "#4868E8",
  cs: "#666666",
  ground: "rgba(0,0,0,0.12)",
};

// 4×5 pixel font glyphs (row-major, 1=filled)
const FONT = {
  h: [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 1, 0, 1], [0, 1, 0, 1]],
  a: [[0, 1, 1, 0], [1, 0, 0, 1], [1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1]],
  n: [[0, 0, 0, 0], [1, 1, 0, 0], [1, 0, 1, 0], [1, 0, 0, 1], [1, 0, 0, 1]],
  d: [[0, 0, 1, 0], [0, 0, 1, 0], [0, 1, 1, 0], [1, 0, 1, 0], [0, 1, 1, 0]],
  " ": [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
  c: [[0, 1, 1, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [0, 1, 1, 0]],
  o: [[0, 1, 1, 0], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [0, 1, 1, 0]],
  e: [[1, 1, 1, 0], [1, 0, 0, 0], [1, 1, 1, 0], [1, 0, 0, 0], [1, 1, 1, 0]],
  i: [[0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 1, 1, 0]],
  r: [[0, 0, 0, 0], [1, 0, 1, 0], [1, 1, 0, 0], [1, 0, 1, 0], [1, 0, 1, 0]],
  s: [[0, 1, 1, 0], [1, 0, 0, 0], [0, 1, 1, 0], [0, 0, 0, 1], [1, 1, 1, 0]],
  u: [[0, 0, 0, 0], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [0, 1, 1, 0]],
  w: [[1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 1, 0], [1, 1, 0, 0], [1, 0, 0, 0]],
  t: [[1, 1, 1, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0]],
  k: [[1, 0, 0, 1], [1, 0, 1, 0], [1, 1, 0, 0], [1, 0, 1, 0], [1, 0, 0, 1]],
  "-": [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
};

class CursorFooter {
  constructor(canvas, config = {}) {
    this.cv = canvas;
    this.cfg = { ...DEFAULT_CONFIG, ...config };
    this.ctx = canvas.getContext("2d");
    this.S = this.cfg.scale;

    const TSC = 2;
    const PAD = 10;
    const PW = PAD * 2 + this.cfg.text.length * 5 * TSC;
    const PH = 40;
    this._paper = { PW, PH, TSC, PAD };

    this._t = 0;
    this._pos = 0;
    this._blinkPhase = -1;
    this._blinkNext = 260;
    this._raf = null;

    this._onResize = () => this._resize();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", this._onResize);
    }
    this._resize();
  }

  _resize() {
    this.cv.width = this.cv.offsetWidth;
    this.cv.height = this.cv.offsetHeight;
  }

  _rr(x, y, w, h, c) {
    this.ctx.fillStyle = c;
    this.ctx.fillRect(x, y, w, h);
  }
  _pp(x, y, c) {
    this.ctx.fillStyle = c;
    this.ctx.fillRect(x, y, this.S, this.S);
  }

  _easeInOut(v) {
    return v < 0.5 ? 2 * v * v : -1 + (4 - 2 * v) * v;
  }

  _pixelText(text, bx, by, color, sc = 2) {
    let x = bx;
    for (const ch of text.toLowerCase()) {
      const g = FONT[ch] || FONT[" "];
      for (let row = 0; row < 5; row++)
        for (let col = 0; col < 4; col++)
          if (g[row][col]) {
            this.ctx.fillStyle = color;
            this.ctx.fillRect(x + col * sc, by + row * sc, sc, sc);
          }
      x += 5 * sc;
    }
  }

  _drawFlower(ox, oy, wobble) {
    const S = this.S,
      C = COLORS;
    const sx = ox + (9 + Math.round(wobble * 0.6)) * S;
    const base = oy + S;
    this._pp(sx + S, base - S, C.stemD);
    this._rr(sx, base - 2 * S, 3 * S, S, C.stem);
    this._rr(sx, base - 3 * S, 3 * S, S, C.stem);
    this._pp(sx + S, base - 4 * S, C.stem);
    this._pp(sx - S, base - 2 * S, C.leaf);
    this._pp(sx - 2 * S, base - 3 * S, C.leafD);
    this._pp(sx + 3 * S, base - 2 * S, C.leaf);
    this._pp(sx + 4 * S, base - 3 * S, C.leafD);
    const fx = sx + S,
      fy = base - 6 * S;
    this._rr(fx, fy - 3 * S, 2 * S, 2 * S, C.pA);
    this._rr(fx, fy + 3 * S, 2 * S, 2 * S, C.pB);
    this._rr(fx - 3 * S, fy, 2 * S, 2 * S, C.pA);
    this._rr(fx + 3 * S, fy, 2 * S, 2 * S, C.pB);
    this._pp(fx + 2 * S, fy - 2 * S, C.pC);
    this._pp(fx + 3 * S, fy - 3 * S, C.pA);
    this._pp(fx - 2 * S, fy - 2 * S, C.pC);
    this._pp(fx - 3 * S, fy - 3 * S, C.pA);
    this._pp(fx + 2 * S, fy + 2 * S, C.pC);
    this._pp(fx + 3 * S, fy + 3 * S, C.pB);
    this._pp(fx - 2 * S, fy + 2 * S, C.pC);
    this._pp(fx - 3 * S, fy + 3 * S, C.pB);
    this._pp(fx + S, fy - 3 * S, C.pA);
    this._pp(fx, fy - 4 * S, C.pC);
    this._pp(fx + S, fy + 4 * S, C.pB);
    this._pp(fx, fy + 4 * S, C.pC);
    this._pp(fx - 4 * S, fy, C.pC);
    this._pp(fx - 4 * S, fy + S, C.pB);
    this._pp(fx + 4 * S, fy, C.pC);
    this._pp(fx + 4 * S, fy + S, C.pA);
    this._rr(fx - S, fy - S, 4 * S, 4 * S, C.ctr);
    this._pp(fx - S, fy - S, C.ctrH);
    this._pp(fx + S, fy - S, C.ctrH);
    this._pp(fx, fy, C.seed);
    this._pp(fx + S, fy + S, C.seed);
    this._pp(fx - S, fy + S, C.seed);
    this._pp(fx + 2 * S, fy, C.seed);
  }

  _drawBot(bx, by, eyeH, wAngle) {
    const S = this.S,
      C = COLORS;
    this._drawFlower(bx, by, Math.sin(Date.now() * 0.0012) * 0.6);
    for (let row = 2; row <= 19; row++) {
      const cut = row >= 12 ? Math.min(9, Math.round((row - 11) * 1.05)) : 0;
      this._rr(bx + (4 + cut) * S, by + row * S, (16 - cut) * S, S, C.body);
    }
    this._rr(bx + 5 * S, by + S, 14 * S, 2 * S, C.body);
    this._rr(bx + 6 * S, by, 12 * S, 2 * S, C.body);
    for (let y = 2; y <= 11; y++) this._pp(bx + 4 * S, by + y * S, C.bodyH);
    for (let x = 5; x <= 18; x++) this._pp(bx + x * S, by + S, C.bodyH);
    for (let y = 14; y <= 19; y++) this._pp(bx + 19 * S, by + y * S, C.bodyS);

    this._rr(bx + 10 * S, by + 5 * S, 3 * S, 6 * S, C.eyeB);
    this._rr(bx + 14 * S, by + 5 * S, 3 * S, 6 * S, C.eyeB);
    if (eyeH > 0) {
      const eh = eyeH * S;
      const et = by + 5 * S + Math.floor((6 * S - eh) / 2);
      this._rr(bx + 10 * S, et, 3 * S, eh, C.eyeW);
      this._rr(bx + 14 * S, et, 3 * S, eh, C.eyeW);
      if (eyeH >= 2) {
        this._pp(bx + 10 * S, et, C.pupil);
        this._pp(bx + 14 * S, et, C.pupil);
      }
      this._pp(bx + 12 * S, by + 5 * S, C.eyeB);
      this._pp(bx + 16 * S, by + 5 * S, C.eyeB);
      this._pp(bx + 12 * S, by + 10 * S, C.eyeB);
      this._pp(bx + 16 * S, by + 10 * S, C.eyeB);
    }

    [
      { cx: 8, cy: 20 },
      { cx: 16, cy: 20 },
    ].forEach((w) => {
      const wx = bx + w.cx * S,
        wy = by + w.cy * S;
      this._rr(wx - 2 * S, wy - S, 5 * S, 3 * S, C.wDark);
      this._rr(wx - S, wy - 2 * S, 3 * S, 5 * S, C.wDark);
      this._rr(wx - 2 * S, wy - S, 5 * S, 3 * S, C.wRim);
      this._rr(wx - S, wy - 2 * S, 3 * S, 5 * S, C.wRim);
      this._rr(wx - S, wy - S, 3 * S, 3 * S, C.wHub);
      this._pp(wx, wy, C.wShi);
      for (let d = 0; d < 4; d++) {
        const a = wAngle + d * (Math.PI / 2);
        const tx = wx + Math.round(Math.cos(a) * 1.5) * S;
        const ty = wy + Math.round(Math.sin(a) * 1.5) * S;
        this._pp(tx, ty, C.wMid);
      }
    });
    this._rr(bx + 6 * S, by + 20 * S, 12 * S, S, C.axle);
  }

  _drawPaper(bx, by, swing) {
    const { PW, PH, TSC, PAD } = this._paper;
    const ctx = this.ctx,
      C = COLORS;
    ctx.save();
    ctx.translate(bx + PW, by + PH / 2);
    ctx.rotate(swing * 0.04);
    ctx.translate(-PW, -PH / 2);
    this._rr(0, 0, PW, PH, C.paper);
    this._rr(0, 0, PW, 2, C.paperS);
    this._rr(0, PH - 2, PW, 2, C.paperS);
    this._rr(0, 0, 2, PH, C.paperS);
    this._rr(PW - 2, 0, 2, PH, C.paperS);
    for (let l = 0; l < 2; l++) this._rr(6, 10 + l * 14, PW - 12, 1, C.paperL);
    this._pixelText(this.cfg.text, PAD, Math.round((PH - 5 * TSC) / 2), C.paperT, TSC);
    this._rr(PW - 5, PH / 2 - 1, 3, 3, C.paperS);
    this._rr(3, 8, 3, 3, C.paperS);
    this._rr(3, PH - 11, 3, 3, C.paperS);
    ctx.restore();
  }

  _drawChute(bx, by, col, cold, coll, swing) {
    const ctx = this.ctx,
      C = COLORS,
      R = 28;
    ctx.save();
    ctx.translate(bx, by);
    ctx.rotate(swing * 0.04);
    for (let s = 0; s < 8; s++) {
      const a1 = -Math.PI + s * (Math.PI / 8);
      const a2 = a1 + Math.PI / 8;
      const xL = Math.cos(a1) * R,
        xR = Math.cos(a2) * R;
      const yM = Math.sin((a1 + a2) / 2) * R * 0.55;
      ctx.fillStyle = s % 2 === 0 ? col : cold;
      ctx.fillRect(Math.min(xL, xR), yM - 5, Math.abs(xR - xL) + 1, 10);
    }
    this._rr(-R, 0, R * 2, 4, cold);
    this._rr(-R + 2, Math.round(-R * 0.3), 4, Math.round(R * 0.25), coll);
    ctx.strokeStyle = C.cs;
    ctx.lineWidth = 1;
    [-R * 0.6, -R * 0.2, R * 0.2, R * 0.6].forEach((hx) => {
      ctx.beginPath();
      ctx.moveTo(hx, 2);
      ctx.lineTo(0, 28);
      ctx.stroke();
    });
    ctx.restore();
  }

  _drawStrings(botAx, botAy, papRx, papRy, papLx, papLy, p1x, p1y, p2x, p2y) {
    const ctx = this.ctx;
    const { PH } = this._paper;
    ctx.strokeStyle = COLORS.str;
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(botAx, botAy);
    ctx.lineTo(papRx, papRy);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(papLx + 3, papLy + 8);
    ctx.lineTo(p1x, p1y + 28);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(papLx + 3, papLy + PH - 10);
    ctx.lineTo(p2x, p2y + 28);
    ctx.stroke();
  }

  _tick() {
    this._t++;
    const t = this._t;
    const ctx = this.ctx;
    const S = this.S;
    const W = this.cv.width;
    const H = this.cv.height;
    const { PW, PH } = this._paper;
    const C = COLORS;

    ctx.clearRect(0, 0, W, H);

    this._pos += this.cfg.speed;
    if (this._pos > W + PW + 200) this._pos = -200;
    const pos = this._pos;

    if (this._blinkPhase < 0) {
      this._blinkNext--;
      if (this._blinkNext <= 0) {
        this._blinkPhase = 0;
        this._blinkNext = 260 + Math.round(Math.random() * 100);
      }
    } else {
      this._blinkPhase++;
      if (this._blinkPhase >= 40) this._blinkPhase = -1;
    }
    let eyeH = 6;
    if (this._blinkPhase >= 0) {
      const p = this._blinkPhase / 40;
      const squeeze = p < 0.5 ? this._easeInOut(p * 2) : this._easeInOut((1 - p) * 2);
      eyeH = Math.round(6 * (1 - squeeze));
    }

    const sw = Math.sin(t * 0.025) * 2;
    const groundY = H - 22;
    const BH = 30;
    const botX = pos;
    const botY = groundY - BH * S;
    const botAx = botX + 4 * S;
    const botAy = botY + 12 * S;
    const papRx = botAx - 6;
    const papRy = botAy - PH / 2;
    const papLx = papRx - PW;
    const papLy = papRy;

    const p1x = papLx - 16 + Math.sin(t * 0.018 + 1) * 4;
    const p1y = papRy - 85 + Math.sin(t * 0.015) * 5;
    const p2x = papLx - 56 + Math.sin(t * 0.017 + 2) * 3;
    const p2y = papRy - 105 + Math.sin(t * 0.018) * 4;

    this._drawChute(p1x, p1y, C.c1, C.c1d, C.c1l, sw);
    this._drawChute(p2x, p2y, C.c2, C.c2d, C.c2l, sw + 0.5);
    this._drawStrings(botAx, botAy, papRx, papRy + PH / 2, papLx, papLy, p1x, p1y, p2x, p2y);
    this._drawPaper(papLx, papRy, sw);
    this._drawBot(botX, botY, eyeH, pos / 9);

    ctx.fillStyle = C.ground;
    ctx.fillRect(0, groundY, W, 1);

    this._raf = requestAnimationFrame(() => this._tick());
  }

  start() {
    this._raf = requestAnimationFrame(() => this._tick());
  }

  stop() {
    if (this._raf) cancelAnimationFrame(this._raf);
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this._onResize);
    }
  }
}

export default CursorFooter;
