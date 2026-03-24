import { useEffect, useRef, useState } from "react";
import { gsap } from "https://esm.sh/gsap@3.12.5";

const NUM_ORBS = 6;
const SEARCH_PHRASES = [
  "Scouring the cosmos...",
  "Weaving neural threads...",
  "Distilling knowledge...",
  "Synthesizing answers...",
  "Almost there...",
];

export function PerplexityLoader({ onComplete }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const ringRef = useRef(null);
  const orbsRef = useRef([]);
  const glowRef = useRef(null);
  const phraseRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressFillRef = useRef(null);
  const particlesRef = useRef([]);
  const scanlineRef = useRef(null);
  const gridRef = useRef(null);
  const [phrase, setPhrase] = useState(SEARCH_PHRASES[0]);
  const [progress, setProgress] = useState(0);
  const tlRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── Initial States ────────────────────────────────────────
      gsap.set(containerRef.current, { opacity: 0 });
      gsap.set(logoRef.current, { scale: 0, opacity: 0, rotation: -180 });
      gsap.set(ringRef.current, { scale: 0, opacity: 0 });
      gsap.set(glowRef.current, { scale: 0.5, opacity: 0 });
      gsap.set(phraseRef.current, { opacity: 0, y: 20 });
      gsap.set(progressBarRef.current, { scaleX: 0, opacity: 0 });
      gsap.set(progressFillRef.current, { scaleX: 0 });
      gsap.set(scanlineRef.current, { y: "-100%", opacity: 0 });
      gsap.set(gridRef.current, { opacity: 0 });

      orbsRef.current.forEach((orb, i) => {
        const angle = (i / NUM_ORBS) * Math.PI * 2;
        gsap.set(orb, {
          x: Math.cos(angle) * 90,
          y: Math.sin(angle) * 90,
          scale: 0,
          opacity: 0,
        });
      });

      particlesRef.current.forEach((p) => {
        gsap.set(p, {
          x: gsap.utils.random(-200, 200),
          y: gsap.utils.random(-200, 200),
          scale: 0,
          opacity: 0,
        });
      });

      const tl = gsap.timeline({ onComplete: () => onComplete?.() });
      tlRef.current = tl;

      // ─── Phase 0: Fade in ──────────────────────────────────────
      tl.to(containerRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" });

      // ─── Phase 1: Grid + Glow ─────────────────────────────────
      tl.to(gridRef.current, { opacity: 0.15, duration: 1, ease: "power1.inOut" }, "-=0.1");
      tl.to(glowRef.current, { scale: 1.2, opacity: 0.6, duration: 1.2, ease: "power3.out" }, "-=0.8");

      // ─── Phase 2: Logo pop + ring ─────────────────────────────
      tl.to(logoRef.current, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.9,
        ease: "back.out(1.7)",
      }, "-=0.5");

      tl.to(ringRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(2)",
      }, "-=0.4");

      // ─── Phase 3: Orbs bloom ──────────────────────────────────
      orbsRef.current.forEach((orb, i) => {
        tl.to(orb, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(2.5)",
          delay: i * 0.06,
        }, "-=0.4");
      });

      // ─── Phase 4: Particles ───────────────────────────────────
      particlesRef.current.forEach((p, i) => {
        tl.to(p, {
          scale: gsap.utils.random(0.4, 1.2),
          opacity: gsap.utils.random(0.3, 0.9),
          duration: 0.4,
          ease: "power2.out",
        }, `-=${i === 0 ? 0.2 : 0.38}`);
      });

      // ─── Phase 5: Progress bar ────────────────────────────────
      tl.to(progressBarRef.current, { scaleX: 1, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2");
      tl.to(phraseRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.4");

      // ─── Phase 6: Scanline sweep ──────────────────────────────
      tl.to(scanlineRef.current, {
        opacity: 0.6,
        duration: 0.2,
        ease: "none",
      }, "-=0.3");

      tl.to(scanlineRef.current, {
        y: "100%",
        duration: 0.8,
        ease: "power1.inOut",
        onComplete: () => gsap.set(scanlineRef.current, { opacity: 0 }),
      });

      // ─── Phase 7: Progress fill + phrase cycling ──────────────
      tl.to(progressFillRef.current, {
        scaleX: 1,
        duration: 3.2,
        ease: "power1.inOut",
        onUpdate: function () {
          const p = Math.round(this.progress() * 100);
          setProgress(p);
          const idx = Math.floor(this.progress() * SEARCH_PHRASES.length);
          setPhrase(SEARCH_PHRASES[Math.min(idx, SEARCH_PHRASES.length - 1)]);
        },
      }, "-=0.2");

      // ─── Phase 8: Exit ────────────────────────────────────────
      tl.to([logoRef.current, ringRef.current, ...orbsRef.current, glowRef.current], {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: "power3.in",
      }, "+=0.15");

      tl.to([phraseRef.current, progressBarRef.current, gridRef.current], {
        opacity: 0,
        y: -10,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.in",
      }, "-=0.35");

      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      }, "-=0.2");

      // ─── Ambient Loops ────────────────────────────────────────
      gsap.to(ringRef.current, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
      });

      orbsRef.current.forEach((orb, i) => {
        gsap.to(orb, {
          rotation: i % 2 === 0 ? 360 : -360,
          duration: 5 + i * 0.5,
          repeat: -1,
          ease: "none",
        });

        // Drift orbs slightly
        gsap.to(orb, {
          x: `+=${gsap.utils.random(-12, 12)}`,
          y: `+=${gsap.utils.random(-12, 12)}`,
          duration: 2 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Glow pulse
      gsap.to(glowRef.current, {
        scale: 1.45,
        opacity: 0.85,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Logo subtle breathe
      gsap.to(logoRef.current, {
        scale: 1.06,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const orbColors = [
    "from-cyan-400 to-blue-500",
    "from-violet-500 to-purple-600",
    "from-teal-400 to-emerald-500",
    "from-blue-400 to-indigo-500",
    "from-fuchsia-400 to-pink-500",
    "from-sky-400 to-cyan-500",
  ];

  const orbSizes = [10, 8, 12, 9, 7, 11];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 40%, #0a0f1e 0%, #020408 100%)",
        fontFamily: "'DM Mono', 'Fira Code', monospace",
      }}
    >
      {/* ── Animated Grid ─────────────────────────────────────── */}
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,179,237,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* ── Scanline ──────────────────────────────────────────── */}
      <div
        ref={scanlineRef}
        className="absolute inset-x-0 h-px pointer-events-none z-30"
        style={{
          top: 0,
          background: "linear-gradient(90deg, transparent, rgba(99,202,255,0.7) 30%, rgba(99,202,255,0.9) 50%, rgba(99,202,255,0.7) 70%, transparent)",
          boxShadow: "0 0 20px 4px rgba(99,202,255,0.3)",
        }}
      />

      {/* ── Ambient Glow ──────────────────────────────────────── */}
      <div
        ref={glowRef}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 340,
          height: 340,
          background: "radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(99,102,241,0.12) 50%, transparent 75%)",
          filter: "blur(24px)",
        }}
      />

      {/* ── Central Stage ─────────────────────────────────────── */}
      <div className="relative flex items-center justify-center" style={{ width: 260, height: 260 }}>

        {/* ── Spinning Ring ─────────────────────────────────────── */}
        <div
          ref={ringRef}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 210,
            height: 210,
            border: "1.5px solid transparent",
            background: "linear-gradient(#020408, #020408) padding-box, conic-gradient(from 0deg, rgba(56,189,248,0) 0%, rgba(56,189,248,0.9) 40%, rgba(139,92,246,0.9) 60%, rgba(56,189,248,0) 100%) border-box",
            boxShadow: "0 0 30px 2px rgba(56,189,248,0.12)",
          }}
        />

        {/* ── Second counter-ring ─────────────────────────────── */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 170,
            height: 170,
            border: "1px dashed rgba(139,92,246,0.25)",
            animation: "spin-ccw 14s linear infinite",
          }}
        />

        {/* ── Orbs ──────────────────────────────────────────────── */}
        {Array.from({ length: NUM_ORBS }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (orbsRef.current[i] = el)}
            className={`absolute rounded-full bg-gradient-to-br ${orbColors[i]}`}
            style={{
              width: orbSizes[i],
              height: orbSizes[i],
              boxShadow: `0 0 ${orbSizes[i] * 2}px ${orbSizes[i]}px ${
                i % 2 === 0 ? "rgba(56,189,248,0.35)" : "rgba(139,92,246,0.35)"
              }`,
            }}
          />
        ))}

        {/* ── Floating Particles ────────────────────────────────── */}
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={`p-${i}`}
            ref={(el) => (particlesRef.current[i] = el)}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: gsap ? Math.random() * 3 + 1.5 : 2,
              height: gsap ? Math.random() * 3 + 1.5 : 2,
              background: i % 3 === 0
                ? "rgba(56,189,248,0.85)"
                : i % 3 === 1
                ? "rgba(139,92,246,0.8)"
                : "rgba(52,211,153,0.8)",
              left: "50%",
              top: "50%",
              marginLeft: -1,
              marginTop: -1,
            }}
          />
        ))}

        {/* ── Logo Mark ─────────────────────────────────────────── */}
        <div ref={logoRef} className="relative z-10 flex items-center justify-center">
          {/* Frosted glass core */}
          <div
            className="flex items-center justify-center rounded-2xl"
            style={{
              width: 72,
              height: 72,
              background: "rgba(10, 20, 40, 0.7)",
              border: "1px solid rgba(99,202,255,0.2)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 0 40px rgba(56,189,248,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            {/* The mark — a stylised 'P' / search neural node */}
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
                <filter id="logoGlow">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              {/* Outer ring */}
              <circle cx="18" cy="18" r="15" stroke="url(#logoGrad)" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
              {/* Inner diamond cross */}
              <path d="M18 7 L29 18 L18 29 L7 18 Z" stroke="url(#logoGrad)" strokeWidth="1.5" fill="none" filter="url(#logoGlow)" />
              {/* Central dot */}
              <circle cx="18" cy="18" r="3.5" fill="url(#logoGrad)" filter="url(#logoGlow)" />
              {/* Node lines */}
              <line x1="18" y1="7" x2="18" y2="14.5" stroke="url(#logoGrad)" strokeWidth="1" strokeOpacity="0.7" />
              <line x1="29" y1="18" x2="21.5" y2="18" stroke="url(#logoGrad)" strokeWidth="1" strokeOpacity="0.7" />
              <line x1="18" y1="29" x2="18" y2="21.5" stroke="url(#logoGrad)" strokeWidth="1" strokeOpacity="0.7" />
              <line x1="7" y1="18" x2="14.5" y2="18" stroke="url(#logoGrad)" strokeWidth="1" strokeOpacity="0.7" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Text + Progress ───────────────────────────────────── */}
      <div className="absolute flex flex-col items-center" style={{ top: "calc(50% + 148px)" }}>
        {/* Phrase */}
        <p
          ref={phraseRef}
          className="text-xs tracking-widest uppercase mb-5"
          style={{
            color: "rgba(148,186,220,0.8)",
            letterSpacing: "0.22em",
            textShadow: "0 0 12px rgba(56,189,248,0.3)",
          }}
        >
          {phrase}
        </p>

        {/* Progress bar */}
        <div
          ref={progressBarRef}
          className="relative overflow-hidden rounded-full"
          style={{
            width: 220,
            height: 2,
            background: "rgba(255,255,255,0.06)",
            transformOrigin: "left center",
          }}
        >
          {/* Track shimmer */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "rgba(255,255,255,0.04)",
            }}
          />
          {/* Fill */}
          <div
            ref={progressFillRef}
            className="absolute inset-y-0 left-0 right-0 rounded-full"
            style={{
              background: "linear-gradient(90deg, rgba(56,189,248,0.9), rgba(139,92,246,0.9), rgba(52,211,153,0.9))",
              transformOrigin: "left center",
              boxShadow: "0 0 10px 2px rgba(56,189,248,0.5)",
            }}
          />
        </div>

        {/* Percentage */}
        <p
          className="mt-3 tabular-nums"
          style={{
            fontSize: "10px",
            color: "rgba(99,202,255,0.5)",
            letterSpacing: "0.15em",
          }}
        >
          {progress}%
        </p>
      </div>

      {/* CSS keyframes injected inline */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400&display=swap');
        @keyframes spin-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}