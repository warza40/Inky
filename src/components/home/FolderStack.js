/**
 * FolderStack — tabbed folder card stack with flip interaction
 *
 * Features:
 *  - Three tabs (Work / Experiments / Reads) — amber selected state
 *  - Stacked folder-style cards with depth offset + rotation
 *  - Smooth SVG bezier fold instead of hard clip-path
 *  - Click to flip through; auto-resets after 6s idle
 *  - "Click to flip through" label sits tight below the stack
 *  - Card image area accepts image URL OR gradient palette
 *
 * ── Vanilla usage ─────────────────────────────────────────────────────────
 *
 *   import FolderStack from './FolderStack.js';
 *
 *   const fs = new FolderStack(document.getElementById('folder-root'), {
 *     accentColor: '#F5B800',
 *     tabs: {
 *       work: [
 *         {
 *           title:    'Redesigning Checkout',
 *           sub:      'E-commerce · 2024',
 *           tag:      'UX Design',
 *           tagColor: 'red',
 *           image:    '/images/checkout.jpg',   // ← real image
 *           // palette: ['#E8392A','#FF8844','#F5B800'], // ← or gradient fallback
 *         },
 *       ],
 *       experiments: [...],
 *       reads:       [...],
 *     }
 *   });
 *
 *   fs.destroy(); // cleanup
 *
 * ── React usage ───────────────────────────────────────────────────────────
 *   See FolderStackReact at the bottom of this file.
 *
 * ── Card data shape ───────────────────────────────────────────────────────
 *   {
 *     title:    string
 *     sub:      string
 *     tag:      string
 *     tagColor: 'red' | 'blue' | 'green' | 'purple' | 'amber'
 *     image?:   string           — URL, takes priority over palette
 *     palette?: [string, string, string]  — gradient fallback
 *   }
 *
 * ── Config ────────────────────────────────────────────────────────────────
 *   {
 *     accentColor?:  string   — selected tab bg     (default '#F5B800')
 *     accentText?:   string   — selected tab text   (default '#1a1a1a')
 *     idleReset?:    number   — ms before auto-reset (default 6000)
 *     tabLabels?:    { work, experiments, reads }
 *   }
 */

const DEFAULTS = {
  accentColor: "#F5B800",
  accentText: "#1a1a1a",
  idleReset: 6000,
  tabLabels: {
    work: "Work",
    experiments: "Experiments",
    reads: "Reads",
  },
  tabs: {
    work: [
      {
        title: "Fixing the Fragility in Enterprise SIM Activation flows",
        sub: "Omantel · UX",
        tag: "Case Study",
        tagColor: "blue",
        palette: ["#E8392A", "#FF8844", "#F5B800"],
        href: "/case/omantel-bulk-activation",
      },
      {
        title:
          "Making Bulk Connectivity Purchases Transparent for Property Owners",
        sub: "Real Estate",
        tag: "Case Study",
        tagColor: "blue",
        palette: ["#378ADD", "#7F77DD", "#5544CC"],
        href: "/case/real-estate-connectivity",
      },
      {
        title:
          "Bringing Clarity to Warehouse Operations Across Distributed Teams",
        sub: "Logistics · Amazon",
        tag: "Case Study",
        tagColor: "blue",
        palette: ["#1D9E75", "#44B86A", "#88AA00"],
        href: "/case/warehouse-operations",
      },
    ],
    experiments: [
      {
        title: "Coming soon",
        sub: "Experiments in the pipeline",
        tag: "—",
        tagColor: "blue",
        palette: ["#e0ddd8", "#d0cdc8", "#c0bdb8"],
      },
    ],
    reads: [
      {
        title: "Entry & Exit in Digital Lending",
        sub: "Substack",
        tag: "Article",
        tagColor: "blue",
        palette: ["#1D9E75", "#88AA00", "#F5B800"],
        href: "https://open.substack.com/pub/thelilyput/p/entry-and-exit-in-digital-lending?r=g3nqv&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true",
      },
    ],
  },
};

const TAG_COLORS = {
  red: { bg: "#fff0ee", text: "#E8392A" },
  blue: { bg: "#eef5ff", text: "#378ADD" },
  green: { bg: "#eefaf5", text: "#1D9E75" },
  purple: { bg: "#f3f0ff", text: "#5544CC" },
  amber: { bg: "#fffbee", text: "#9a7000" },
};

const CSS = `
.fs-wrapper{display:flex;flex-direction:column;align-items:flex-start;width:460px;font-family:-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',sans-serif;}
.fs-tabs{display:flex;flex-direction:row;flex-wrap:nowrap;align-items:center;justify-content:center;gap:10px;margin-bottom:16px;width:100%;}
.fs-tab{display:inline-flex;align-items:center;gap:6px;white-space:nowrap;padding:8px 14px;font-family:var(--font-inter,'Inter'),system-ui,sans-serif;font-size:13px;font-weight:500;color:#171717;cursor:pointer;border:none;outline:none;background:transparent;border:1px solid rgba(0,0,0,0.2);border-radius:6px;transition:border-color .2s,color .2s,background .2s;}
.fs-tab:focus-visible{outline:2px solid #c41e3a;outline-offset:2px;}
.fs-tab:not(.fs-active):hover{border-color:#171717;background:rgba(0,0,0,0.04);}
.fs-outer{width:460px;padding-top:0;margin-bottom:0;}
.fs-stack{position:relative;width:460px;height:400px;cursor:pointer;touch-action:pan-y;}
.fs-card{position:absolute;width:440px;border-radius:24px;overflow:visible;border:none;background:transparent;box-shadow:none;transform-origin:center bottom;transition:transform .45s cubic-bezier(.34,1.56,.64,1),box-shadow .3s ease,opacity .3s ease;will-change:transform;left:50%;top:0;margin-left:-220px;user-select:none;cursor:pointer;}
.fs-card-shadow{position:absolute;inset:0;border-radius:24px;border:2px solid #1a1a1a;background:#F5B800;transform:translate(7px,7px);z-index:0;transition:transform .45s cubic-bezier(.34,1.56,.64,1);}
.fs-card-inner{border-radius:24px;overflow:hidden;border:2px solid #1a1a1a;background:#fff;position:relative;z-index:1;}
.fs-img{width:100%;height:196px;position:relative;overflow:hidden;border-bottom:2px solid #1a1a1a;}
.fs-img img,.fs-img canvas{width:100%;height:100%;display:block;object-fit:cover;}
.fs-fold{position:absolute;bottom:0;left:0;width:100%;pointer-events:none;}
.fs-body{padding:14px 18px 18px;background:#fff;}
.fs-title{font-size:16px;font-weight:800;color:#1a1a1a;line-height:1.25;letter-spacing:-0.02em;margin-bottom:14px;}
.fs-sub{font-size:11px;font-weight:500;color:#bbbbbb;margin-bottom:7px;letter-spacing:.01em;}
.fs-footer{display:flex;justify-content:space-between;align-items:center;padding-top:0;border-top:none;}
.fs-tag{font-size:9px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;padding:4px 12px;border-radius:20px;background:#F5B800;color:#7a5a00;}
.fs-meta{font-size:11px;color:#ccc;font-weight:700;letter-spacing:.04em;}
.fs-arrows-row{display:flex;align-items:center;justify-content:center;gap:24px;width:100%;}
.fs-carousel-prev,.fs-carousel-next{display:flex;align-items:center;justify-content:center;width:36px;height:36px;padding:0;border:1px solid rgba(0,0,0,0.2);border-radius:6px;background:transparent;cursor:pointer;color:#171717;transition:border-color .2s,background .2s,color .2s;flex-shrink:0;}
.fs-carousel-prev:hover,.fs-carousel-next:hover{border-color:#171717;background:rgba(0,0,0,0.04);}
`;

const FOLD_SVG = `<svg class="fs-fold" viewBox="0 0 440 52" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
  <path d="M0,52 L0,22 C0,22 10,8 28,4 C38,1.5 48,0 48,0 L440,0 L440,52 Z" fill="#fff"/>
</svg>`;

class FolderStack {
  /**
   * @param {HTMLElement} root
   * @param {object}      config
   */
  constructor(root, config = {}) {
    this.root = root;
    this.cfg = this._merge(DEFAULTS, config);
    this._top = 0;
    this._busy = false;
    this._idle = null;
    this._tab = "work";
    this._injectStyles();
    this._build();
  }

  // ── helpers ─────────────────────────────────────────────────────────────

  _merge(defaults, overrides) {
    const out = { ...defaults, ...overrides };
    if (overrides.tabs) out.tabs = { ...defaults.tabs, ...overrides.tabs };
    if (overrides.tabLabels)
      out.tabLabels = { ...defaults.tabLabels, ...overrides.tabLabels };
    return out;
  }

  _injectStyles() {
    let s = document.getElementById("fs-styles");
    if (!s) {
      s = document.createElement("style");
      s.id = "fs-styles";
      document.head.appendChild(s);
    }
    s.textContent = CSS;
  }

  // ── build DOM ────────────────────────────────────────────────────────────

  _build() {
    const { accentColor, accentText, tabLabels } = this.cfg;

    this.root.innerHTML = `
      <div class="fs-wrapper">
        <div class="fs-tabs" id="fs-tabbar">
          ${Object.keys(tabLabels)
            .map(
              (k) => `
            <button class="fs-tab${k === this._tab ? " fs-active" : ""}" data-tab="${k}"
              style="${k === this._tab ? `background:${accentColor};color:${accentText};border-color:${accentColor};` : ""}">
              ${tabLabels[k]}
            </button>`,
            )
            .join("")}
        </div>
        <div class="fs-arrows-row">
          <button type="button" class="fs-carousel-prev" id="fs-prev" aria-label="Previous card">←</button>
          <div class="fs-outer">
            <div class="fs-stack" id="fs-stack"></div>
          </div>
          <button type="button" class="fs-carousel-next" id="fs-next" aria-label="Next card">→</button>
        </div>
      </div>`;

    this._stackEl = this.root.querySelector("#fs-stack");
    this._tabBar = this.root.querySelector("#fs-tabbar");
    this._prevBtn = this.root.querySelector("#fs-prev");
    this._nextBtn = this.root.querySelector("#fs-next");

    this._stackEl.addEventListener("click", (e) => this._onStackClick(e));
    this._prevBtn.addEventListener("click", () => {
      this._flipPrev();
      this._scheduleReset();
    });
    this._nextBtn.addEventListener("click", () => {
      this._flip();
      this._scheduleReset();
    });
    this._tabBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".fs-tab");
      if (!btn) return;
      this._switchTab(btn.dataset.tab);
    });

    this._loadTab(this._tab);
  }

  // ── tab switching ────────────────────────────────────────────────────────

  _switchTab(tab) {
    const { accentColor, accentText } = this.cfg;
    this._tab = tab;
    this._tabBar.querySelectorAll(".fs-tab").forEach((btn) => {
      const active = btn.dataset.tab === tab;
      btn.classList.toggle("fs-active", active);
      btn.style.cssText = active
        ? `background:${accentColor};color:${accentText};border-color:${accentColor};`
        : "";
    });
    this._loadTab(tab);
    this._scheduleReset();
  }

  // ── card loading ─────────────────────────────────────────────────────────

  _loadTab(tab) {
    this._stackEl.innerHTML = "";
    this._top = 0;
    this._busy = false;
    const cards = this.cfg.tabs[tab] || [];
    cards.forEach((data, i) => this._createCard(data, i, cards.length));
    this._layout(false);
  }

  _createCard(data, index, total) {
    const tc = TAG_COLORS[data.tagColor] || TAG_COLORS.red;
    const card = document.createElement("div");
    card.className = "fs-card";
    if (data.href) card.dataset.href = data.href;

    // Image: URL → <img>, otherwise → <canvas> gradient
    const imgHTML = data.image
      ? `<img src="${data.image}" alt="${data.title}" />`
      : `<canvas width="600" height="336"></canvas>`;

    card.innerHTML = `
      <div class="fs-card-shadow"></div>
      <div class="fs-card-inner">
        <div class="fs-img">
          ${imgHTML}
          ${FOLD_SVG}
        </div>
        <div class="fs-body">
          <div class="fs-sub">${data.sub}</div>
          <div class="fs-title">${data.title}</div>
          <div class="fs-footer">
            <span class="fs-tag" style="background:${tc.bg};color:${tc.text};">${data.tag}</span>
            <span class="fs-meta">${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}</span>
          </div>
        </div>
      </div>`;

    if (!data.image && data.palette) {
      this._paintGradient(card.querySelector("canvas"), data.palette);
    }

    this._stackEl.appendChild(card);
  }

  // ── gradient painter ─────────────────────────────────────────────────────

  _paintGradient(canvas, palette) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width,
      h = canvas.height;
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, palette[0]);
    g.addColorStop(0.5, palette[1]);
    g.addColorStop(1, palette[2]);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    // pixel grain
    for (let i = 0; i < 600; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.1})`;
      const s = Math.random() * 3 + 1;
      ctx.fillRect(
        Math.round(Math.random() * w),
        Math.round(Math.random() * h),
        s,
        s,
      );
    }
    // grid overlay
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 0.5;
    for (let x = 0; x < w; x += 14) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 14) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  }

  // ── stack layout ─────────────────────────────────────────────────────────

  _layout(animate) {
    const cards = [...this._stackEl.querySelectorAll(".fs-card")];
    const total = cards.length;
    cards.forEach((card, i) => {
      const vp = (i - this._top + total) % total;
      card.style.zIndex = total - vp;
      card.style.opacity = vp >= 4 ? 0 : 1;
      card.style.transform = `translate(${vp * 3}px,${vp * 11}px) scale(${1 - vp * 0.038}) rotate(${vp * 1.4}deg)`;
      const shadow = card.querySelector(".fs-card-shadow");
      if (shadow) {
        shadow.style.transform =
          vp === 0
            ? "translate(7px, 7px)"
            : `translate(${4 + vp}px, ${4 + vp}px)`;
      }
      if (!animate) {
        card.style.transition = "none";
        requestAnimationFrame(() => (card.style.transition = ""));
      }
    });
  }

  // ── flip animation ────────────────────────────────────────────────────────

  _onStackClick(e) {
    const cards = [...this._stackEl.querySelectorAll(".fs-card")];
    if (cards.length === 0) return;
    const front = cards[this._top];
    const href = front.dataset.href;
    if (href && front.contains(e.target)) {
      window.location.href = href;
      return;
    }
    this._flip();
    this._scheduleReset();
  }

  _flip() {
    if (this._busy) return;
    this._busy = true;
    const cards = [...this._stackEl.querySelectorAll(".fs-card")];
    const total = cards.length;
    const front = cards[this._top];

    front.style.transition =
      "transform .32s cubic-bezier(.4,0,.2,1),opacity .2s ease";
    front.style.transform = "translate(-18px,-56px) scale(0.88) rotate(-5deg)";
    front.style.opacity = "0";

    setTimeout(() => {
      this._top = (this._top + 1) % total;
      front.style.transition = "none";
      front.style.opacity = "1";
      this._layout(true);
      this._busy = false;
    }, 300);
  }

  _flipPrev() {
    if (this._busy) return;
    const cards = [...this._stackEl.querySelectorAll(".fs-card")];
    const total = cards.length;
    if (total === 0 || this._top === 0) return;
    this._busy = true;
    this._top = (this._top - 1 + total) % total;
    this._layout(true);
    this._busy = false;
  }

  // ── idle reset ────────────────────────────────────────────────────────────

  _scheduleReset() {
    clearTimeout(this._idle);
    this._idle = setTimeout(() => {
      const total = [...this._stackEl.querySelectorAll(".fs-card")].length;
      if (this._top === 0) return;
      let steps = this._top;
      const back = () => {
        if (steps <= 0) return;
        this._top = (this._top - 1 + total) % total;
        this._layout(true);
        steps--;
        setTimeout(back, 180);
      };
      back();
    }, this.cfg.idleReset);
  }

  // ── public API ────────────────────────────────────────────────────────────

  /** Update cards for a tab at runtime */
  updateTab(tab, cards) {
    this.cfg.tabs[tab] = cards;
    if (this._tab === tab) this._loadTab(tab);
  }

  /** Switch tab programmatically */
  goTo(tab) {
    this._switchTab(tab);
  }

  /** Tear down */
  destroy() {
    clearTimeout(this._idle);
    this.root.innerHTML = "";
  }
}

export default FolderStack;
