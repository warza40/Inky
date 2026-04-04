"use client";

import { useEffect, useRef } from "react";
import { closeDoor, enterStudio, initInkyWalkers } from "./walkers";
import { INKY_LILY_DOOR_SVG } from "./doorSvgString";
import "@/app/inky-lily/inky-lily.css";

export function InkyLilyStudio() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return initInkyWalkers(root);
  }, []);

  return (
    <div id="inky-lily-root" ref={rootRef} className="inky-lily-root">
      <div className="page">
        <div className="pg-tag">Warmth DS · Inky Lily&apos;s Studio · Easter Egg</div>
        <div className="pg-title">
          The portfolio as
          <br />
          <em>Arrietty&apos;s house.</em>
        </div>
        <div className="pg-body">
          Something small moves near the floor when the house is quiet. They only come out when they think no one is
          watching. If one of them looks at you — click it.
        </div>

        <div className="pg-rule" />

        <div className="cards">
          <div className="card">
            <div className="card-title">The work happens before the file opens</div>
            <div className="card-body">
              I read rooms. Not whether an idea landed — but how people process it. Which format makes a stakeholder
              digest something versus perform agreement.
            </div>
          </div>
          <div className="card">
            <div className="card-title">The design usually follows</div>
            <div className="card-body">
              Once I understand what the room can actually hear, the direction becomes obvious. The hard part was never
              the design.
            </div>
          </div>
          <div className="card">
            <div className="card-title">The thinking outlasts the project</div>
            <div className="card-body">
              If I gave a team a sharper question, a better frame — that persists. Even if the product never ships.
            </div>
          </div>
          <div className="card">
            <div className="card-title">The room is part of the design</div>
            <div className="card-body">
              What happens in the meeting shapes what gets built. A designer who only works at the desk is solving half
              the problem.
            </div>
          </div>
        </div>

        <div className="pg-footer">
          <div className="pf-copy">© {new Date().getFullYear()} · Warmth DS</div>
          <div className="pf-mark">Rigorous enough to be trusted. Human enough to be felt.</div>
        </div>
      </div>

      <div className="stage" aria-hidden="true">
        <div className="group" id="group" />
      </div>

      <div className="veil" id="veil">
        <div className="veil-wash" />
        <div className="veil-lines" />

        <div className="door-scene">
          <button type="button" className="door-back" onClick={closeDoor}>
            ← back to the portfolio
          </button>

          <button type="button" className="door-click" onClick={enterStudio} aria-label="Enter Inky Lily&apos;s studio">
            <span dangerouslySetInnerHTML={{ __html: INKY_LILY_DOOR_SVG }} />
          </button>

          <div className="door-caption">
            <div className="dc-name">
              <em>Inky Lily&apos;s Studio</em> — step inside.
            </div>
            <div className="dc-jp">間 · the space between</div>
          </div>
        </div>
      </div>

      <div className="candle-cursor" id="candle-cursor" aria-hidden="true">
        <svg viewBox="0 0 24 48" width="24" height="48" fill="none">
          <g style={{ transformOrigin: "12px 18px", animation: "flame-flicker 0.4s ease-in-out infinite" }}>
            <path
              d="M 12 4 C 12 4 7 10 7 15 C 7 18.5 9 20 12 20 C 15 20 17 18.5 17 15 C 17 10 12 4 12 4 Z"
              fill="#f0c060"
              opacity=".9"
            />
            <path
              d="M 12 8 C 12 8 9 13 9 16 C 9 18 10.5 19 12 19 C 13.5 19 15 18 15 16 C 15 13 12 8 12 8 Z"
              fill="#f0d080"
              opacity=".7"
            />
            <ellipse cx="12" cy="17" rx="2" ry="1.5" fill="white" opacity=".3" />
          </g>
          <line x1="12" y1="19" x2="12" y2="24" stroke="#3d3428" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="9" y="24" width="6" height="20" rx="1" fill="#f0ece0" opacity=".85" />
          <path d="M 9 28 C 8 28 7.5 30 8 32 L 9 32 Z" fill="#f0ece0" opacity=".5" />
          <line x1="12.5" y1="26" x2="12.5" y2="40" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
          <ellipse cx="12" cy="44" rx="5" ry="2" fill="#e4dccf" opacity=".5" />
        </svg>
      </div>
    </div>
  );
}
