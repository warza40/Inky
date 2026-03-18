"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

export function NebulaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    const mouse = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let t = 0;
    let frameId: number;
    const particles: Particle[] = [];

    const spawnParticles = (cx: number, cy: number, strength: number) => {
      const count = Math.floor(8 + strength * 12);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 2.5 * strength;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 40 + Math.random() * 40,
        });
      }
    };

    const updateParticles = () => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life += 1;
        if (p.life > p.maxLife) {
          particles.splice(i, 1);
        }
      }
    };

    const drawParticles = () => {
      for (const p of particles) {
        const alpha = 1 - p.life / p.maxLife;
        const radius = 2 + (1 - alpha) * 2;
        const grad = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          radius * 4
        );
        grad.addColorStop(0, `rgba(255,255,255,${0.9 * alpha})`);
        grad.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawNebula = (cx: number, cy: number, baseRadius: number) => {
      ctx.beginPath();

      const influenceRadius = 250; // between 200–300px
      let maxInfluence = 0;

      for (let i = 0; i < 360; i += 3) {
        const angle = (i * Math.PI) / 180;

        const distortion =
          Math.sin(angle * 4 + t) * 50 + // 50–80px distortion range
          Math.cos(angle * 3 + t) * 30;

        let r = baseRadius + distortion;

        const dx = mouse.x - cx;
        const dy = mouse.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence =
          Math.max(0, influenceRadius - dist) / influenceRadius;
        maxInfluence = Math.max(maxInfluence, influence);

        r += influence * 80;

        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.closePath();

      const gradient = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        baseRadius
      );

      // Soft coral core → violet → blue, fading into deep space
      gradient.addColorStop(0, "#F0675D"); // nebula coral
      gradient.addColorStop(0.35, "rgba(240,103,93,0.75)");
      gradient.addColorStop(0.6, "rgba(110,102,217,0.7)"); // nebula violet
      gradient.addColorStop(0.8, "rgba(127,167,230,0.65)"); // nebula blue
      gradient.addColorStop(1, "rgba(13,28,71,0)"); // deep space to transparent

      ctx.fillStyle = gradient;
      ctx.filter = "blur(70px)";
      ctx.fill();
      ctx.filter = "none";

      if (maxInfluence > 0.1) {
        spawnParticles(
          mouse.x,
          mouse.y,
          Math.min(1, maxInfluence * 2)
        );
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const radius = 300 + Math.sin(t) * 20;
      drawNebula(canvas.width / 2, canvas.height / 2, radius);

      updateParticles();
      drawParticles();

      t += 0.009; // animation speed between 0.008–0.012
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      id="nebula"
      ref={canvasRef}
      className="nebula-canvas"
      aria-hidden="true"
    />
  );
}

