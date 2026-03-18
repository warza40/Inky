/**
 * HeroBg — interactive animated pixel grid background
 *
 * Pixel shapes slide along grid lines. Click:
 *   - Direct hit → shape spins, scales up, changes colour + type, snaps back
 *   - Nearby → shapes scatter outward elastically then return
 *   - Ripple → expanding rings from click point
 *
 * Config: new HeroBg(canvas, { cell, density, scatterRadius, rippleDur, ... })
 */

const DEFAULTS = {
  cell: 28,
  density: 0.048,
  minSpeed: 0.003,
  maxSpeed: 0.018,
  minAlpha: 0.28,
  maxAlpha: 0.52,
  scatterRadius: 80,
  rippleDur: 40,
  colors: [
    "#E8392A", "#F5B800", "#378ADD", "#44B86A",
    "#D4537E", "#7F77DD", "#E07030", "#1D9E75",
    "#C84090", "#0099CC", "#88AA00", "#FF6644",
    "#5544CC", "#00AAAA", "#DD4488", "#BBAA00",
  ],
};

const TYPES = [
  "dot2", "dot2", "dot4",
  "checker", "checker",
  "cross", "plus", "lshape",
  "arrow", "arrow",
  "tricheck", "row3",
];

const P = 3;

function shapeSize(type) {
  const map = {
    dot2: { w: P * 2, h: P * 2 },
    dot4: { w: P * 4, h: P * 4 },
    checker: { w: P * 4, h: P * 4 },
    tricheck: { w: P * 4, h: P * 4 },
    cross: { w: P * 5, h: P * 5 },
    plus: { w: P * 3, h: P * 3 },
    lshape: { w: P * 3, h: P * 3 },
    arrow: { w: P * 3, h: P * 5 },
    row3: { w: P * 5, h: P * 2 },
  };
  return map[type] || { w: P * 4, h: P * 4 };
}

class HeroBg {
  constructor(canvas, config = {}) {
    this.cv = canvas;
    this.cfg = { ...DEFAULTS, ...config };
    this.ctx = canvas.getContext("2d");

    this._pieces = [];
    this._ripples = [];
    this._t = 0;
    this._raf = null;

    this._onResize = () => {
      this._resize();
      this._init();
    };
    this._onClick = (e) => this._handleClick(e);

    if (typeof window !== "undefined") {
      window.addEventListener("resize", this._onResize);
    }
    canvas.addEventListener("click", this._onClick);

    this._resize();
  }

  _resize() {
    this.cv.width = this.cv.offsetWidth || 800;
    this.cv.height = this.cv.offsetHeight || 480;
  }

  _rnd(a, b) {
    return a + Math.random() * (b - a);
  }
  _pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  _makePiece() {
    const { cell, minSpeed, maxSpeed, minAlpha, maxAlpha, colors } = this.cfg;
    const W = this.cv.width,
      H = this.cv.height;
    const cols = Math.ceil(W / cell) + 4;
    const rows = Math.ceil(H / cell) + 4;
    const speed = this._rnd(minSpeed, maxSpeed);
    const alpha = this._rnd(minAlpha, maxAlpha);
    return {
      col: Math.random() * cols,
      row: Math.random() * rows,
      axis: Math.random() > 0.5 ? 0 : 1,
      dir: Math.random() > 0.5 ? 1 : -1,
      speed,
      baseSpeed: speed,
      color: this._pick(colors),
      color2: this._pick(colors),
      type: this._pick(TYPES),
      alpha,
      baseAlpha: alpha,
      scattered: false,
      scatterX: 0,
      scatterY: 0,
      spin: 0,
      spinSpeed: 0,
      burst: false,
    };
  }

  _init() {
    const { cell, density } = this.cfg;
    const W = this.cv.width,
      H = this.cv.height;
    const count = Math.floor((W / cell) * (H / cell) * density);
    this._pieces = Array.from({ length: count }, () => this._makePiece());
  }

  _getCanvasPos(e) {
    const rect = this.cv.getBoundingClientRect();
    const scaleX = this.cv.width / rect.width;
    const scaleY = this.cv.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  _pieceScreenPos(p) {
    const { cell } = this.cfg;
    return {
      x: (p.axis === 0 ? p.col : Math.round(p.col)) * cell + (p.scattered ? p.scatterX : 0),
      y: (p.axis === 1 ? p.row : Math.round(p.row)) * cell + (p.scattered ? p.scatterY : 0),
    };
  }

  _handleClick(e) {
    const { x, y } = this._getCanvasPos(e);
    const { scatterRadius, rippleDur, colors } = this.cfg;

    this._ripples.push({ x, y, r: 0, maxR: 120, alpha: 0.5, born: this._t });

    for (const p of this._pieces) {
      const { x: px, y: py } = this._pieceScreenPos(p);
      const sz = shapeSize(p.type);
      const cx = px + sz.w / 2;
      const cy = py + sz.h / 2;
      const dist = Math.hypot(cx - x, cy - y);

      const directHit =
        x >= px - 4 && x <= px + sz.w + 4 &&
        y >= py - 4 && y <= py + sz.h + 4;

      if (directHit) {
        p.type = this._pick(TYPES);
        p.color = this._pick(colors);
        p.color2 = this._pick(colors);
        p.speed = p.baseSpeed * this._rnd(4, 8);
        p.alpha = Math.min(0.9, p.baseAlpha * 1.8);
        p.burst = true;
        p.spin = 0;
        p.spinSpeed = this._rnd(0.08, 0.18) * (Math.random() > 0.5 ? 1 : -1);
        setTimeout(() => {
          p.speed = p.baseSpeed;
          p.alpha = p.baseAlpha;
          p.burst = false;
          p.spinSpeed = 0;
        }, 600);
      }

      if (dist < scatterRadius && dist > 0) {
        const force = 1 - dist / scatterRadius;
        const angle = Math.atan2(cy - y, cx - x);
        const pushDist = force * this._rnd(12, 36);

        p.scattered = true;
        p.scatterX = Math.cos(angle) * pushDist;
        p.scatterY = Math.sin(angle) * pushDist;
        p.alpha = Math.min(0.9, p.baseAlpha + force * 0.4);
        if (force > 0.6) p.color = this._pick(colors);

        const startX = p.scatterX;
        const startY = p.scatterY;
        const dur = Math.round(this._rnd(25, 50));
        let frame = 0;
        const anim = () => {
          frame++;
          const ease = 1 - Math.pow(1 - frame / dur, 3);
          p.scatterX = startX * (1 - ease);
          p.scatterY = startY * (1 - ease);
          if (frame < dur) requestAnimationFrame(anim);
          else {
            p.scattered = false;
            p.scatterX = 0;
            p.scatterY = 0;
            p.alpha = p.baseAlpha;
          }
        };
        requestAnimationFrame(anim);
      }
    }
  }

  _drawGrid() {
    const { cell } = this.cfg;
    const ctx = this.ctx;
    const W = this.cv.width,
      H = this.cv.height;
    const cols = Math.ceil(W / cell) + 1;
    const rows = Math.ceil(H / cell) + 1;

    ctx.strokeStyle = "rgba(0,0,0,0.042)";
    ctx.lineWidth = 0.5;
    for (let c = 0; c <= cols; c++) {
      ctx.beginPath();
      ctx.moveTo(c * cell, 0);
      ctx.lineTo(c * cell, H);
      ctx.stroke();
    }
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * cell);
      ctx.lineTo(W, r * cell);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(0,0,0,0.055)";
    for (let c = 0; c <= cols; c++)
      for (let r = 0; r <= rows; r++)
        ctx.fillRect(c * cell - 0.5, r * cell - 0.5, 1, 1);
  }

  _drawConnectors() {
    const { cell } = this.cfg;
    const ctx = this.ctx;
    const W = this.cv.width,
      H = this.cv.height;
    const nodes = [
      [1, 2, 4, 2], [5, 5, 5, 8], [9, 1, 12, 1], [14, 3, 14, 6],
      [18, 2, 21, 2], [3, 10, 3, 13], [7, 9, 10, 9], [15, 8, 15, 11],
      [20, 7, 23, 7], [2, 15, 5, 15], [11, 13, 14, 13], [18, 12, 18, 15],
    ];
    const a = 0.1 + 0.03 * Math.sin(this._t * 0.008);
    ctx.strokeStyle = `rgba(0,0,0,${a})`;
    ctx.lineWidth = 0.7;
    for (const [c1, r1, c2, r2] of nodes) {
      if (c1 * cell > W || r1 * cell > H) continue;
      ctx.beginPath();
      ctx.moveTo(c1 * cell, r1 * cell);
      ctx.lineTo(c2 * cell, r2 * cell);
      ctx.stroke();
      ctx.fillStyle = `rgba(0,0,0,${a * 2})`;
      ctx.fillRect(c1 * cell - 1.5, r1 * cell - 1.5, 3, 3);
      ctx.fillRect(c2 * cell - 1.5, r2 * cell - 1.5, 3, 3);
    }
  }

  _drawRipples() {
    const { rippleDur } = this.cfg;
    const ctx = this.ctx;
    for (let i = this._ripples.length - 1; i >= 0; i--) {
      const rp = this._ripples[i];
      const progress = (this._t - rp.born) / rippleDur;
      if (progress >= 1) {
        this._ripples.splice(i, 1);
        continue;
      }

      rp.r = rp.maxR * progress;
      const a = rp.alpha * (1 - progress);

      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,0,0,${a * 0.35})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      if (rp.r > 20) {
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,0,0,${a * 0.2})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      const age = this._t - rp.born;
      if (age < 8) {
        const a2 = ((8 - age) / 8) * 0.4;
        ctx.fillStyle = `rgba(0,0,0,${a2})`;
        ctx.fillRect(rp.x - 10, rp.y - 0.5, 20, 1);
        ctx.fillRect(rp.x - 0.5, rp.y - 10, 1, 20);
      }
    }
  }

  _drawShape(type, color, color2, alpha) {
    const ctx = this.ctx;
    ctx.globalAlpha = alpha;

    if (type === "dot2") {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, P * 2, P * 2);
    } else if (type === "dot4") {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, P * 4, P * 4);
    } else if (type === "checker") {
      for (let r = 0; r < 4; r++)
        for (let c = 0; c < 4; c++) {
          ctx.fillStyle = (r + c) % 2 === 0 ? color : color2;
          ctx.globalAlpha = (r + c) % 2 !== 0 ? alpha * 0.6 : alpha;
          ctx.fillRect(c * P, r * P, P, P);
        }
      ctx.globalAlpha = alpha;
    } else if (type === "tricheck") {
      ctx.fillStyle = color;
      for (let r = 0; r < 4; r++)
        for (let c = 0; c < 4; c++)
          if (c <= r) ctx.fillRect(c * P, r * P, P, P);
    } else if (type === "cross") {
      ctx.fillStyle = color;
      ctx.fillRect(P, 0, P, P * 5);
      ctx.fillRect(0, P * 2, P * 5, P);
      ctx.fillStyle = color2;
      ctx.globalAlpha = alpha * 0.7;
      ctx.fillRect(P, P * 2, P, P);
      ctx.globalAlpha = alpha;
    } else if (type === "plus") {
      ctx.fillStyle = color;
      ctx.fillRect(P, 0, P, P * 3);
      ctx.fillRect(0, P, P * 3, P);
    } else if (type === "lshape") {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, P, P * 3);
      ctx.fillRect(0, P * 2, P * 3, P);
      ctx.fillStyle = color2;
      ctx.globalAlpha = alpha * 0.55;
      ctx.fillRect(P, 0, P, P * 2);
      ctx.globalAlpha = alpha;
    } else if (type === "arrow") {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, P, P);
      ctx.fillRect(P, P, P, P);
      ctx.fillRect(P * 2, P * 2, P, P);
      ctx.fillRect(P, P * 3, P, P);
      ctx.fillRect(0, P * 4, P, P);
    } else if (type === "row3") {
      ctx.fillStyle = color;
      for (let i = 0; i < 3; i++) ctx.fillRect(i * P * 2, 0, P, P);
      ctx.fillStyle = color2;
      ctx.globalAlpha = alpha * 0.5;
      for (let i = 0; i < 3; i++) ctx.fillRect(i * P * 2, P, P, P);
    }

    ctx.globalAlpha = 1;
  }

  _tick() {
    this._t++;
    const ctx = this.ctx;
    const { cell } = this.cfg;
    const W = this.cv.width,
      H = this.cv.height;
    const cols = Math.ceil(W / cell) + 6;
    const rows = Math.ceil(H / cell) + 6;

    ctx.clearRect(0, 0, W, H);
    this._drawGrid();
    this._drawConnectors();
    this._drawRipples();

    for (const p of this._pieces) {
      if (p.axis === 0) p.col += p.dir * p.speed;
      else p.row += p.dir * p.speed;

      if (p.axis === 0) {
        if (p.col > cols + 2) p.col = -3;
        if (p.col < -3) p.col = cols + 2;
      } else {
        if (p.row > rows + 2) p.row = -3;
        if (p.row < -3) p.row = rows + 2;
      }

      if (p.spinSpeed) p.spin += p.spinSpeed;

      const sx = p.scattered ? p.scatterX : 0;
      const sy = p.scattered ? p.scatterY : 0;
      const x = (p.axis === 0 ? p.col : Math.round(p.col)) * cell + sx;
      const y = (p.axis === 1 ? p.row : Math.round(p.row)) * cell + sy;

      if (x < -60 || x > W + 60 || y < -60 || y > H + 60) continue;

      const sz = shapeSize(p.type);
      const bScale = p.burst ? 1.8 : 1;

      ctx.save();
      ctx.translate(Math.round(x) + sz.w / 2, Math.round(y) + sz.h / 2);
      if (bScale !== 1) ctx.scale(bScale, bScale);
      if (p.spinSpeed) ctx.rotate(p.spin);
      ctx.translate(-sz.w / 2, -sz.h / 2);
      this._drawShape(p.type, p.color, p.color2, p.alpha);
      ctx.restore();
    }

    this._raf = requestAnimationFrame(() => this._tick());
  }

  start() {
    this._init();
    this._raf = requestAnimationFrame(() => this._tick());
  }

  stop() {
    if (this._raf) cancelAnimationFrame(this._raf);
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this._onResize);
    }
    this.cv.removeEventListener("click", this._onClick);
  }
}

export default HeroBg;
