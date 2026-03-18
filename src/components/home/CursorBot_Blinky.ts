/**
 * BLINKY — Cursor-logo pixel bot · stationary
 * Grid: 24x30 · Scale: 3 · Display: 96x120px
 * Features: smooth eye-squeeze blink, sunflower head wobble, grey wheels
 */

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
  petalA: "#F5B800",
  petalB: "#E08800",
  petalC: "#FFDA40",
  centre: "#5A3010",
  centreH: "#7A4818",
  seed: "#3A1E08",
};

const BLINK_EVERY = 200;
const BLINK_DUR = 36;

export default class BlinkyBot {
  cv: HTMLCanvasElement;
  S: number;
  ctx: CanvasRenderingContext2D | null;
  CW: number;
  CH: number;
  YOFF: number;
  t: number;
  blinkPhase: number;
  blinkNext: number;
  _raf: number | null;

  constructor(canvas: HTMLCanvasElement, scale = 3) {
    this.cv = canvas;
    this.S = scale;
    this.ctx = canvas.getContext("2d");
    this.CW = 24;
    this.CH = 30;
    this.YOFF = 6;

    canvas.width = this.CW * scale;
    canvas.height = this.CH * scale;
    canvas.style.width = this.CW * scale + "px";
    canvas.style.height = this.CH * scale + "px";
    canvas.style.imageRendering = "pixelated";

    this.t = 0;
    this.blinkPhase = -1;
    this.blinkNext = BLINK_EVERY;
    this._raf = null;
  }

  _r(x: number, y: number, w: number, h: number, c: string) {
    if (!this.ctx) return;
    this.ctx.fillStyle = c;
    this.ctx.fillRect(x * this.S, y * this.S, w * this.S, h * this.S);
  }
  _p(x: number, y: number, c: string) {
    if (!this.ctx) return;
    this.ctx.fillStyle = c;
    this.ctx.fillRect(x * this.S, y * this.S, this.S, this.S);
  }

  _drawSunflower(stemBaseY: number, wobble: number) {
    const C = COLORS;
    const ox = 9 + Math.round(wobble * 0.6);
    this._p(ox + 1, stemBaseY - 1, C.stemD);
    this._r(ox, stemBaseY - 2, 3, 1, C.stem);
    this._r(ox, stemBaseY - 3, 3, 1, C.stem);
    this._p(ox + 1, stemBaseY - 4, C.stem);
    this._p(ox - 1, stemBaseY - 2, C.leaf);
    this._p(ox - 2, stemBaseY - 3, C.leafD);
    this._p(ox + 3, stemBaseY - 2, C.leaf);
    this._p(ox + 4, stemBaseY - 3, C.leafD);
    const cx = ox + 1,
      cy = stemBaseY - 6;
    this._r(cx, cy - 3, 2, 2, C.petalA);
    this._r(cx, cy + 3, 2, 2, C.petalB);
    this._r(cx - 3, cy, 2, 2, C.petalA);
    this._r(cx + 3, cy, 2, 2, C.petalB);
    this._p(cx + 2, cy - 2, C.petalC);
    this._p(cx + 3, cy - 3, C.petalA);
    this._p(cx - 2, cy - 2, C.petalC);
    this._p(cx - 3, cy - 3, C.petalA);
    this._p(cx + 2, cy + 2, C.petalC);
    this._p(cx + 3, cy + 3, C.petalB);
    this._p(cx - 2, cy + 2, C.petalC);
    this._p(cx - 3, cy + 3, C.petalB);
    this._p(cx + 1, cy - 3, C.petalA);
    this._p(cx, cy - 4, C.petalC);
    this._p(cx + 1, cy + 4, C.petalB);
    this._p(cx, cy + 4, C.petalC);
    this._p(cx - 4, cy, C.petalC);
    this._p(cx - 4, cy + 1, C.petalB);
    this._p(cx + 4, cy, C.petalC);
    this._p(cx + 4, cy + 1, C.petalA);
    this._r(cx - 1, cy - 1, 4, 4, C.centre);
    this._p(cx - 1, cy - 1, C.centreH);
    this._p(cx + 1, cy - 1, C.centreH);
    this._p(cx, cy, C.seed);
    this._p(cx + 1, cy + 1, C.seed);
    this._p(cx - 1, cy + 1, C.seed);
    this._p(cx + 2, cy, C.seed);
  }

  _drawBody(eyeH: number) {
    const C = COLORS;
    const yOff = this.YOFF;
    for (let row = 2; row <= 19; row++) {
      const cut = row >= 12 ? Math.min(9, Math.round((row - 11) * 1.05)) : 0;
      this._r(4 + cut, row + yOff, 16 - cut, 1, C.body);
    }
    this._r(5, 1 + yOff, 14, 2, C.body);
    this._r(6, 0 + yOff, 12, 2, C.body);
    for (let y = 2; y <= 11; y++) this._p(4, y + yOff, C.bodyH);
    for (let x = 5; x <= 18; x++) this._p(x, 1 + yOff, C.bodyH);
    for (let y = 14; y <= 19; y++) this._p(19, y + yOff, C.bodyS);
    this._r(10, 5 + yOff, 3, 6, C.eyeB);
    this._r(14, 5 + yOff, 3, 6, C.eyeB);
    const sockTop = 5 + yOff,
      sockH = 6;
    const eyeTop = sockTop + Math.floor((sockH - eyeH) / 2);
    if (eyeH > 0) {
      this._r(10, eyeTop, 3, eyeH, C.eyeW);
      this._r(14, eyeTop, 3, eyeH, C.eyeW);
      if (eyeH >= 2) {
        this._p(10, eyeTop, C.pupil);
        this._p(14, eyeTop, C.pupil);
      }
      this._p(12, sockTop, C.eyeB);
      this._p(16, sockTop, C.eyeB);
      this._p(12, sockTop + sockH - 1, C.eyeB);
      this._p(16, sockTop + sockH - 1, C.eyeB);
    }
    const wheels = [
      { cx: 8, cy: 20 + yOff },
      { cx: 16, cy: 20 + yOff },
    ];
    for (const w of wheels) {
      this._r(w.cx - 2, w.cy - 1, 5, 3, C.wDark);
      this._r(w.cx - 1, w.cy - 2, 3, 5, C.wDark);
      this._r(w.cx - 2, w.cy - 1, 5, 3, C.wRim);
      this._r(w.cx - 1, w.cy - 2, 3, 5, C.wRim);
      this._r(w.cx - 1, w.cy - 1, 3, 3, C.wHub);
      this._p(w.cx, w.cy, C.wShi);
    }
    this._r(6, 20 + yOff, 12, 1, C.axle);
  }

  _easeInOut(t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  _getEyeH() {
    if (this.blinkPhase < 0) return 6;
    const p = this.blinkPhase / BLINK_DUR;
    const squeeze =
      p < 0.5 ? this._easeInOut(p * 2) : this._easeInOut((1 - p) * 2);
    return Math.round(6 * (1 - squeeze));
  }

  draw(eyeH: number, wobble: number) {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.CW * this.S, this.CH * this.S);
    this._drawSunflower(this.YOFF + 1, wobble);
    this._drawBody(eyeH);
  }

  _tick() {
    this.t++;
    if (this.blinkPhase < 0) {
      this.blinkNext--;
      if (this.blinkNext <= 0) {
        this.blinkPhase = 0;
        this.blinkNext = BLINK_EVERY + Math.round(Math.random() * 80);
      }
    } else {
      this.blinkPhase++;
      if (this.blinkPhase >= BLINK_DUR) this.blinkPhase = -1;
    }
    const wobble = Math.sin(this.t * 0.04) * 1.2;
    this.draw(this._getEyeH(), wobble);
    this._raf = requestAnimationFrame(() => this._tick());
  }

  start() {
    this.draw(6, 0);
    this._raf = requestAnimationFrame(() => this._tick());
  }

  stop() {
    if (this._raf) cancelAnimationFrame(this._raf);
  }
}
