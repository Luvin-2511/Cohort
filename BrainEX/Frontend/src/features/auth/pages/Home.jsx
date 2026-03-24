import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "https://cdn.skypack.dev/gsap";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function BrainLogo({ size = 1, onClick }) {
  return (
    <div onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 10 * size, cursor: onClick ? "pointer" : "default" }}>
      <svg width={38 * size} height={38 * size} viewBox="0 0 38 38">
        <polygon points="19,2 35,11 35,27 19,36 3,27 3,11" fill="none" stroke="#14b8a6" strokeWidth="1.2" />
        <polygon points="19,8 29,14 29,24 19,30 9,24 9,14" fill="rgba(20,184,166,0.08)" stroke="#14b8a6" strokeWidth="0.7" strokeDasharray="2,2" />
        <polygon points="19,13 24,16 24,22 19,25 14,22 14,16" fill="rgba(20,184,166,0.15)" stroke="#14b8a6" strokeWidth="0.5" />
        <circle cx="19" cy="19" r="3.5" fill="#14b8a6" />
        <circle cx="19" cy="19" r="5.5" fill="none" stroke="rgba(20,184,166,0.3)" strokeWidth="0.8" />
        {[0,60,120,180,240,300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return <line key={i} x1={19 + 5.5 * Math.cos(rad)} y1={19 + 5.5 * Math.sin(rad)} x2={19 + 9.5 * Math.cos(rad)} y2={19 + 9.5 * Math.sin(rad)} stroke="#14b8a6" strokeWidth="0.9" opacity="0.7" />;
        })}
      </svg>
      <div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20 * size, fontWeight: 800, letterSpacing: "0.04em", color: "#f0fdf4", lineHeight: 1 }}>
          brain<span style={{ color: "#14b8a6" }}>EX</span>
        </div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8 * size, color: "#2dd4bf", letterSpacing: "0.2em", marginTop: 2 }}>
          INTELLIGENCE LAYER
        </div>
      </div>
    </div>
  );
}


function NeuralBg() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf, t = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const N = 60;
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      r: Math.random() * 2 + 1,
      phase: Math.random() * Math.PI * 2,
    }));
    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      t += 0.008;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = (a.x - b.x) * W, dy = (a.y - b.y) * H;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 160) {
            ctx.beginPath(); ctx.moveTo(a.x * W, a.y * H); ctx.lineTo(b.x * W, b.y * H);
            ctx.strokeStyle = `rgba(20,184,166,${(1 - d / 160) * 0.18})`; ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
      }
      nodes.forEach(n => {
        n.phase += 0.015;
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
        const glow = (Math.sin(n.phase) + 1) / 2;
        const g = ctx.createRadialGradient(n.x * W, n.y * H, 0, n.x * W, n.y * H, n.r * 6);
        g.addColorStop(0, `rgba(20,184,166,${0.5 * glow + 0.1})`);
        g.addColorStop(1, "rgba(20,184,166,0)");
        ctx.beginPath(); ctx.arc(n.x * W, n.y * H, n.r * 6, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x * W, n.y * H, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,243,208,${0.4 + 0.4 * glow})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.35 }} />;
}

function TypewriterText({ phrases }) {
  const [displayed, setDisplayed] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = phrases[phraseIdx];
    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => { setDisplayed(current.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }, 55);
      return () => clearTimeout(t);
    } else if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), 2200);
      return () => clearTimeout(t);
    } else if (deleting && charIdx > 0) {
      const t = setTimeout(() => { setDisplayed(current.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, 28);
      return () => clearTimeout(t);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx(i => (i + 1) % phrases.length);
    }
  }, [charIdx, deleting, phraseIdx, phrases]);
  return (
    <span>
      {displayed}
      <span style={{ opacity: Math.sin(Date.now() / 400) > 0 ? 1 : 0, color: "#14b8a6", animation: "blink 1s step-end infinite" }}>|</span>
    </span>
  );
}

function SearchOrb({ onSearch }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const orbRef = useRef(null);
  const inputRef = useRef(null);

  const suggestions = [
    "How does CRISPR gene editing work?",
    "Explain quantum entanglement simply",
    "Latest breakthroughs in fusion energy",
    "What caused the 2008 financial crisis?",
    "How do neural networks learn?",
  ];

  useEffect(() => {
    if (focused) {
      gsap.to(orbRef.current, { scale: 1.02, duration: 0.4, ease: "power2.out" });
    } else {
      gsap.to(orbRef.current, { scale: 1, duration: 0.3 });
    }
  }, [focused]);

  return (
    <div ref={orbRef} style={{ width: "100%", maxWidth: 720, position: "relative" }}>
      {/* Main search container */}
      <div style={{
        display: "flex", alignItems: "center",
        background: "rgba(5,25,18,0.9)",
        border: `1.5px solid ${focused ? "rgba(20,184,166,0.6)" : "rgba(20,184,166,0.2)"}`,
        borderRadius: 20,
        padding: "6px 6px 6px 24px",
        backdropFilter: "blur(30px)",
        boxShadow: focused
          ? "0 0 0 6px rgba(20,184,166,0.08), 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(20,184,166,0.1)"
          : "0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(20,184,166,0.05)",
        transition: "all 0.3s",
      }}>
        {/* Search icon */}
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={focused ? "#14b8a6" : "#374151"} strokeWidth="2" style={{ flexShrink: 0, marginRight: 12, transition: "stroke 0.2s" }}>
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          onKeyDown={e => e.key === "Enter" && query && onSearch(query)}
          placeholder="Ask anything, explore everything..."
          style={{
            flex: 1, background: "transparent", border: "none", outline: "none",
            color: "#ecfdf5", fontFamily: "'Space Mono', monospace", fontSize: 15,
            padding: "12px 0",
          }}
        />
        <button onClick={() => query && onSearch(query)} style={{
          padding: "12px 24px",
          background: "linear-gradient(135deg, #0d9488, #14b8a6, #2dd4bf)",
          border: "none", borderRadius: 14, cursor: "pointer",
          fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700,
          color: "#021a16", letterSpacing: "0.08em",
          boxShadow: "0 4px 16px rgba(20,184,166,0.4)",
          transition: "transform 0.15s, box-shadow 0.15s",
          flexShrink: 0,
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(20,184,166,0.6)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(20,184,166,0.4)"; }}
        >
          SEARCH →
        </button>
      </div>

      {/* Suggestion pills */}
      {focused && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0,
          background: "rgba(5,20,15,0.95)", backdropFilter: "blur(30px)",
          border: "1px solid rgba(20,184,166,0.15)", borderRadius: 16,
          padding: "8px", zIndex: 100,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}>
          {suggestions.map((s, i) => (
            <div key={i} onMouseDown={() => { setQuery(s); onSearch(s); }} style={{
              padding: "11px 16px", borderRadius: 10, cursor: "pointer",
              fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#4b5563",
              display: "flex", alignItems: "center", gap: 12,
              transition: "background 0.15s, color 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(20,184,166,0.08)"; e.currentTarget.style.color = "#d1fae5"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#4b5563"; }}
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.5, flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FeatureCard({ icon, title, desc, delay, accent }) {
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, delay, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" } }
    );
  }, []);
  return (
    <div ref={ref} style={{
      padding: "28px 28px",
      background: "rgba(5,20,15,0.7)",
      border: "1px solid rgba(20,184,166,0.1)",
      borderRadius: 20,
      backdropFilter: "blur(20px)",
      position: "relative", overflow: "hidden",
      transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
      cursor: "default",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(20,184,166,0.35)";
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 24px 60px rgba(0,0,0,0.4), 0 0 30px rgba(20,184,166,0.08)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(20,184,166,0.1)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Accent glow */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${accent || "#14b8a6"}, transparent)`, opacity: 0.6 }} />
      <div style={{
        width: 48, height: 48, borderRadius: 14,
        background: `rgba(20,184,166,0.07)`,
        border: "1px solid rgba(20,184,166,0.18)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22, marginBottom: 18,
      }}>
        {icon}
      </div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: "#ecfdf5", marginBottom: 10 }}>{title}</div>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#374151", lineHeight: 1.9 }}>{desc}</div>
    </div>
  );
}

function StatCounter({ value, label, delay }) {
  const ref = useRef(null);
  const numRef = useRef(null);
  useEffect(() => {
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.fromTo(ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, delay, ease: "power3.out" });
      }
    });
  }, []);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div ref={numRef} style={{ fontFamily: "'Syne', sans-serif", fontSize: 48, fontWeight: 800, color: "#14b8a6", lineHeight: 1, marginBottom: 8 }}>
        {value}
      </div>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#374151", letterSpacing: "0.1em" }}>{label}</div>
    </div>
  );
}

function DemoAnswer() {
  const ref = useRef(null);
  const lines = [
    { type: "query", text: "How does CRISPR-Cas9 gene editing work at the molecular level?" },
    { type: "source", text: "Synthesizing 847 sources · Nature, Science, Cell, PubMed..." },
    { type: "answer", text: "CRISPR-Cas9 works by using a guide RNA (gRNA) that matches the target DNA sequence. The Cas9 protein acts as molecular scissors, creating a double-strand break at the specified location. The cell's natural repair mechanisms then either introduce errors (gene knockout) or incorporate new genetic material (gene insertion). The precision comes from Watson-Crick base pairing — the gRNA only matches sequences complementary to its 20-nucleotide spacer region, minimizing off-target effects..." },
    { type: "cite", text: "↗ Doudna & Charpentier, Science 2012  ·  ↗ Zhang Lab, Cell 2013  ·  +844 more" },
  ];

  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" } }
    );
  }, []);

  return (
    <div ref={ref} style={{
      background: "rgba(5,20,15,0.85)", backdropFilter: "blur(30px)",
      border: "1px solid rgba(20,184,166,0.15)", borderRadius: 20,
      overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
      maxWidth: 720, margin: "0 auto",
    }}>
      {/* Chrome bar */}
      <div style={{ padding: "12px 18px", borderBottom: "1px solid rgba(20,184,166,0.08)", display: "flex", alignItems: "center", gap: 8 }}>
        {["#ef4444","#f59e0b","#22c55e"].map((c,i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.6 }} />)}
        <div style={{ flex: 1, marginLeft: 8, background: "rgba(20,184,166,0.06)", border: "1px solid rgba(20,184,166,0.1)", borderRadius: 6, padding: "4px 12px", fontFamily: "'Space Mono', monospace", fontSize: 9, color: "#1f4e3d", letterSpacing: "0.08em" }}>
          app.brainex.ai/search
        </div>
      </div>
      {/* Content */}
      <div style={{ padding: "28px 32px" }}>
        {lines.map((l, i) => (
          <div key={i} style={{ marginBottom: i < lines.length - 1 ? 18 : 0 }}>
            {l.type === "query" && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #14b8a6, #0891b2)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>U</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 600, color: "#ecfdf5", lineHeight: 1.5, paddingTop: 4 }}>{l.text}</div>
              </div>
            )}
            {l.type === "source" && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", background: "rgba(20,184,166,0.05)", border: "1px solid rgba(20,184,166,0.1)", borderRadius: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#14b8a6", animation: "pulse 1.5s ease-in-out infinite" }} />
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#2dd4bf", letterSpacing: "0.08em" }}>{l.text}</span>
              </div>
            )}
            {l.type === "answer" && (
              <div style={{ display: "flex", gap: 14 }}>
                <div style={{ width: 2, background: "linear-gradient(180deg, #14b8a6, transparent)", borderRadius: 2, flexShrink: 0 }} />
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#6b7280", lineHeight: 2 }}>{l.text}</div>
              </div>
            )}
            {l.type === "cite" && (
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#14b8a6", letterSpacing: "0.06em", paddingLeft: 16 }}>{l.text}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PricingCard({ plan, price, features, highlighted, delay }) {
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.9, delay, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" } }
    );
  }, []);
  return (
    <div ref={ref} style={{
      padding: "32px 28px",
      background: highlighted ? "linear-gradient(145deg, rgba(20,184,166,0.12), rgba(6,182,212,0.06))" : "rgba(5,20,15,0.7)",
      border: `1.5px solid ${highlighted ? "rgba(20,184,166,0.45)" : "rgba(20,184,166,0.1)"}`,
      borderRadius: 22,
      backdropFilter: "blur(20px)",
      position: "relative",
      transform: highlighted ? "scale(1.04)" : "scale(1)",
      boxShadow: highlighted ? "0 0 60px rgba(20,184,166,0.15), 0 30px 80px rgba(0,0,0,0.4)" : "none",
    }}>
      {highlighted && (
        <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(90deg, #0d9488, #2dd4bf)", borderRadius: 20, padding: "4px 16px", fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700, color: "#021a16", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
          MOST POPULAR
        </div>
      )}
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#14b8a6", letterSpacing: "0.15em", marginBottom: 10 }}>{plan}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 24 }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 42, fontWeight: 800, color: "#ecfdf5" }}>{price}</span>
        {price !== "Free" && <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#374151" }}>/month</span>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
        {features.map(f => (
          <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#4b5563" }}>
            <span style={{ color: "#14b8a6", fontSize: 12 }}>✓</span>{f}
          </div>
        ))}
      </div>
      <button style={{
        width: "100%", padding: "13px 0",
        background: highlighted ? "linear-gradient(135deg, #0d9488, #14b8a6, #2dd4bf)" : "rgba(20,184,166,0.08)",
        border: highlighted ? "none" : "1px solid rgba(20,184,166,0.25)",
        borderRadius: 12, cursor: "pointer",
        fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700,
        color: highlighted ? "#021a16" : "#14b8a6",
        letterSpacing: "0.08em",
        boxShadow: highlighted ? "0 6px 24px rgba(20,184,166,0.4)" : "none",
        transition: "all 0.2s",
      }}
        onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
      >
        GET STARTED →
      </button>
    </div>
  );
}

function FloatingSearchResult({ text, x, y, delay }) {
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8, delay, ease: "back.out(2)" });
    gsap.to(ref.current, { y: -12, duration: 3 + Math.random() * 2, ease: "sine.inOut", yoyo: true, repeat: -1, delay: delay + 0.5 });
  }, []);
  return (
    <div ref={ref} style={{
      position: "absolute", left: x, top: y,
      background: "rgba(5,20,15,0.9)", backdropFilter: "blur(20px)",
      border: "1px solid rgba(20,184,166,0.2)", borderRadius: 12,
      padding: "10px 16px",
      fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#4b5563",
      maxWidth: 200, lineHeight: 1.6, zIndex: 3,
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    }}>
      <div style={{ color: "#14b8a6", fontSize: 8, letterSpacing: "0.12em", marginBottom: 4 }}>↗ SOURCE CITED</div>
      {text}
    </div>
  );
}

export function HomePage({ onNavigateToLogin, onNavigateToRegister }) {
  const heroRef = useRef(null);
  const navRef = useRef(null);
  const h1Ref = useRef(null);
  const subRef = useRef(null);
  const searchRef = useRef(null);
  const tagsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(navRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 }, 0)
      .fromTo(h1Ref.current.children, { opacity: 0, y: 60, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, stagger: 0.12, duration: 1 }, 0.3)
      .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.9)
      .fromTo(searchRef.current, { opacity: 0, y: 30, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.9 }, 1.1)
      .fromTo(tagsRef.current.children, { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.5 }, 1.4);

    gsap.to(".hero-orb-1", { y: -30, x: 20, duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1 });
    gsap.to(".hero-orb-2", { y: 20, x: -15, duration: 8, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2 });
    gsap.to(".hero-orb-3", { y: -15, duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1 });
  }, []);

  const handleSearch = useCallback((q) => {
    alert(`Searching: "${q}"\n\n(Connect to your search backend here!)`);
  }, []);

  const features = [
    { icon: "⚡", title: "Real-time Web Synthesis", desc: "Indexes the live web continuously. Ask about breaking news, recent papers, or today's market data — brainEX always has the latest.", accent: "#14b8a6" },
    { icon: "◈", title: "Cited Intelligence", desc: "Every claim is traceable. brainEX surfaces primary sources inline, so you can verify, dive deeper, or cite with confidence.", accent: "#06b6d4" },
    { icon: "∞", title: "Infinite Knowledge Graph", desc: "Connect disparate concepts across domains. brainEX builds a personalized map of your intellectual explorations.", accent: "#10b981" },
    { icon: "🧬", title: "Deep Research Mode", desc: "Multi-step reasoning that reads dozens of papers, cross-references data, and synthesizes a comprehensive report in seconds.", accent: "#8b5cf6" },
    { icon: "🔒", title: "Privacy First Architecture", desc: "Zero-knowledge query processing. Your searches are never logged, profiled, or sold. Intelligence without surveillance.", accent: "#f59e0b" },
    { icon: "⌘", title: "Multi-modal Understanding", desc: "Upload PDFs, images, or paste code. brainEX understands context across formats and returns unified, coherent answers.", accent: "#ec4899" },
  ];

  const hotTopics = ["Quantum Computing", "CRISPR", "Fusion Energy", "AGI Timeline", "Dark Matter", "mRNA Vaccines", "Neuroplasticity", "Black Holes"];

  return (
    <div style={{ background: "#020c09", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #020c09; }
        input::placeholder { color: #2d5a4a; font-family: 'Space Mono', monospace; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%,100%{opacity:0.4;transform:scale(0.9)} 50%{opacity:1;transform:scale(1.1)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #020c09; }
        ::-webkit-scrollbar-thumb { background: rgba(20,184,166,0.3); border-radius: 2px; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav ref={navRef} style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: "16px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(2,12,9,0.85)", backdropFilter: "blur(30px)",
        borderBottom: "1px solid rgba(20,184,166,0.07)",
      }}>
        <BrainLogo />
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {["Features", "Research", "Pricing", "API"].map(item => (
            <span key={item} style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#374151", cursor: "pointer", letterSpacing: "0.1em", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#14b8a6"}
              onMouseLeave={e => e.currentTarget.style.color = "#374151"}
            >{item}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={onNavigateToLogin} style={{ padding: "9px 20px", background: "transparent", border: "1px solid rgba(20,184,166,0.25)", borderRadius: 10, cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#14b8a6", letterSpacing: "0.08em", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(20,184,166,0.6)"; e.currentTarget.style.background = "rgba(20,184,166,0.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(20,184,166,0.25)"; e.currentTarget.style.background = "transparent"; }}
          >SIGN IN</button>
          <button onClick={onNavigateToRegister} style={{ padding: "9px 20px", background: "linear-gradient(135deg, #0d9488, #14b8a6)", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 700, color: "#021a16", letterSpacing: "0.08em", boxShadow: "0 4px 16px rgba(20,184,166,0.35)", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(20,184,166,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(20,184,166,0.35)"; }}
          >START FREE</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div ref={heroRef} style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 24px 80px", overflow: "hidden" }}>
        <NeuralBg />

        {/* Ambient orbs */}
        <div className="hero-orb-1" style={{ position: "absolute", top: "10%", left: "5%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(20,184,166,0.09) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div className="hero-orb-2" style={{ position: "absolute", bottom: "5%", right: "2%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)", filter: "blur(70px)", pointerEvents: "none" }} />
        <div className="hero-orb-3" style={{ position: "absolute", top: "40%", right: "20%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)", filter: "blur(50px)", pointerEvents: "none" }} />

        {/* Grid */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.035, pointerEvents: "none" }}>
          <defs>
            <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#14b8a6" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>

        {/* Floating result snippets */}
        <FloatingSearchResult text="Cas9 creates a blunt-ended double-strand break 3bp upstream of the PAM sequence..." x="2%" y="25%" delay={2.2} />
        <FloatingSearchResult text="Quantum superposition allows qubits to exist in multiple states simultaneously..." x="76%" y="20%" delay={2.5} />
        <FloatingSearchResult text="Net energy gain achieved for the first time at NIF — December 2022..." x="80%" y="68%" delay={2.8} />

        {/* Badge */}
        <div style={{ position: "relative", zIndex: 4, display: "flex", alignItems: "center", gap: 8, padding: "6px 16px", background: "rgba(20,184,166,0.07)", border: "1px solid rgba(20,184,166,0.2)", borderRadius: 30, marginBottom: 32, animation: "none" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#14b8a6", animation: "pulse 2s ease-in-out infinite" }} />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#2dd4bf", letterSpacing: "0.15em" }}>LIVE · 2.4B+ SOURCES INDEXED</span>
        </div>

        {/* H1 */}
        <div ref={h1Ref} style={{ position: "relative", zIndex: 4, textAlign: "center", marginBottom: 24, overflow: "hidden" }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(52px,8vw,96px)", fontWeight: 800, lineHeight: 1.0, color: "#f0fdf4", letterSpacing: "-0.02em" }}>
            The search engine
          </div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(52px,8vw,96px)", fontWeight: 800, lineHeight: 1.0, background: "linear-gradient(90deg, #14b8a6, #06b6d4, #67e8f9, #14b8a6)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s linear infinite" }}>
            that thinks with you.
          </div>
        </div>

        {/* Sub */}
        <p ref={subRef} style={{ position: "relative", zIndex: 4, fontFamily: "'Space Mono', monospace", fontSize: "clamp(12px,1.4vw,15px)", color: "#4b5563", lineHeight: 2, textAlign: "center", maxWidth: 580, marginBottom: 48 }}>
          brainEX fuses live web intelligence with AI synthesis — delivering <span style={{ color: "#2dd4bf" }}>cited, deep answers</span> instead of a list of links.{" "}
          Ask anything. <TypewriterText phrases={["Understand everything.", "Cite with confidence.", "Research at lightspeed.", "Think deeper."]} />
        </p>

        {/* Search */}
        <div ref={searchRef} style={{ position: "relative", zIndex: 4, width: "100%", maxWidth: 720, marginBottom: 32 }}>
          <SearchOrb onSearch={handleSearch} />
        </div>

        {/* Hot topic tags */}
        <div ref={tagsRef} style={{ position: "relative", zIndex: 4, display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 600 }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#1f4e3d", letterSpacing: "0.1em", display: "flex", alignItems: "center" }}>TRY:</span>
          {hotTopics.map(tag => (
            <div key={tag} onClick={() => handleSearch(tag)} style={{
              padding: "6px 14px", background: "rgba(20,184,166,0.05)", border: "1px solid rgba(20,184,166,0.15)", borderRadius: 20,
              fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#2dd4bf", cursor: "pointer",
              letterSpacing: "0.06em", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(20,184,166,0.12)"; e.currentTarget.style.borderColor = "rgba(20,184,166,0.4)"; e.currentTarget.style.color = "#ecfdf5"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(20,184,166,0.05)"; e.currentTarget.style.borderColor = "rgba(20,184,166,0.15)"; e.currentTarget.style.color = "#2dd4bf"; }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.4 }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "#14b8a6", letterSpacing: "0.15em" }}>SCROLL TO EXPLORE</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(180deg, #14b8a6, transparent)" }} />
        </div>
      </div>

      {/* ── DEMO SECTION ── */}
      <div style={{ padding: "100px 24px", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#14b8a6", letterSpacing: "0.2em", marginBottom: 14 }}>// SEE IT IN ACTION</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, color: "#ecfdf5", lineHeight: 1.1 }}>
            Not just answers —<br /><span style={{ color: "#14b8a6" }}>understanding.</span>
          </h2>
        </div>
        <DemoAnswer />
      </div>

      {/* ── STATS ── */}
      <div style={{ padding: "60px 24px 100px", borderTop: "1px solid rgba(20,184,166,0.06)", borderBottom: "1px solid rgba(20,184,166,0.06)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 40 }}>
          {[
            ["2.4B+", "Sources indexed"],
            ["<200ms", "Response time"],
            ["99.97%", "Uptime SLA"],
            ["2.4M+", "Researchers trust us"],
          ].map(([v, l], i) => <StatCounter key={l} value={v} label={l} delay={i * 0.12} />)}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#14b8a6", letterSpacing: "0.2em", marginBottom: 14 }}>// CAPABILITIES</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, color: "#ecfdf5", lineHeight: 1.1 }}>
              Built for serious<br /><span style={{ color: "#14b8a6" }}>thinkers.</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {features.map((f, i) => <FeatureCard key={f.title} {...f} delay={i * 0.1} />)}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div style={{ padding: "100px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "linear-gradient(180deg, transparent, rgba(20,184,166,0.2), transparent)", transform: "translateX(-50%)" }} />
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#14b8a6", letterSpacing: "0.2em", marginBottom: 14 }}>// HOW IT WORKS</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, color: "#ecfdf5", lineHeight: 1.1 }}>
              Three steps to<br /><span style={{ color: "#14b8a6" }}>deep intelligence.</span>
            </h2>
          </div>
          {[
            { num: "01", title: "You ask anything", desc: "Natural language, complex multi-part questions, follow-ups, hypotheticals — brainEX handles the full spectrum of human curiosity.", icon: "💬" },
            { num: "02", title: "We synthesize the web", desc: "Our neural indexer scans thousands of sources in real-time — academic papers, news, databases, official docs — and cross-references them.", icon: "🌐" },
            { num: "03", title: "You get cited intelligence", desc: "A structured, deep answer with inline citations, confidence indicators, and links to dig deeper. No hallucinations. No blue links.", icon: "✦" },
          ].map((step, i) => (
            <HowItWorksStep key={step.num} {...step} align={i % 2 === 0 ? "left" : "right"} delay={i * 0.15} />
          ))}
        </div>
      </div>

      {/* ── PRICING ── */}
      <div style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#14b8a6", letterSpacing: "0.2em", marginBottom: 14 }}>// PRICING</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, color: "#ecfdf5", lineHeight: 1.1 }}>
              Start free.<br /><span style={{ color: "#14b8a6" }}>Scale with your curiosity.</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, alignItems: "center" }}>
            <PricingCard plan="EXPLORER" price="Free" features={["100 queries/month", "Standard response depth", "5 deep research reports", "Community support"]} delay={0} />
            <PricingCard plan="RESEARCHER" price="$19" features={["Unlimited queries", "Maximum response depth", "Unlimited deep research", "PDF & image upload", "API access (1000 calls/mo)", "Priority support"]} highlighted delay={0.1} />
            <PricingCard plan="ENTERPRISE" price="Custom" features={["Everything in Researcher", "Unlimited API access", "Custom knowledge bases", "SSO & team management", "SLA guarantee", "Dedicated support"]} delay={0.2} />
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ padding: "100px 24px 120px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(20,184,166,0.08) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
        <CTASection onNavigateToRegister={onNavigateToRegister} />
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "40px 48px", borderTop: "1px solid rgba(20,184,166,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <BrainLogo size={0.85} />
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#1f2937", letterSpacing: "0.08em" }}>
          © 2025 brainEX · INTELLIGENCE LAYER
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "API", "Blog"].map(l => (
            <span key={l} style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#1f4e3d", cursor: "pointer", letterSpacing: "0.08em", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#14b8a6"}
              onMouseLeave={e => e.currentTarget.style.color = "#1f4e3d"}
            >{l}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}

function HowItWorksStep({ num, title, desc, icon, align, delay }) {
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, x: align === "left" ? -50 : 50 },
      { opacity: 1, x: 0, duration: 0.9, delay, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" } }
    );
  }, []);
  return (
    <div ref={ref} style={{ display: "flex", gap: 32, marginBottom: 60, flexDirection: align === "right" ? "row-reverse" : "row" }}>
      <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: "rgba(5,20,15,0.9)", border: "1.5px solid rgba(20,184,166,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24, zIndex: 2, position: "relative",
          boxShadow: "0 0 30px rgba(20,184,166,0.15)",
        }}>
          {icon}
        </div>
      </div>
      <div style={{ paddingTop: 12 }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "#14b8a6", letterSpacing: "0.2em", marginBottom: 8 }}>{num}</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 700, color: "#ecfdf5", marginBottom: 12 }}>{title}</div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#4b5563", lineHeight: 1.9 }}>{desc}</div>
      </div>
    </div>
  );
}

function CTASection({ onNavigateToRegister }) {
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(ref.current.children, { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" } }
    );
  }, []);
  return (
    <div ref={ref} style={{ position: "relative", zIndex: 2 }}>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#14b8a6", letterSpacing: "0.2em", marginBottom: 16 }}>// JOIN THE NETWORK</div>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(40px,6vw,80px)", fontWeight: 800, color: "#ecfdf5", lineHeight: 1.05, marginBottom: 24 }}>
        Ready to think<br /><span style={{ background: "linear-gradient(90deg, #14b8a6, #67e8f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>without limits?</span>
      </h2>
      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "#374151", lineHeight: 1.9, marginBottom: 40, maxWidth: 500, margin: "0 auto 40px" }}>
        Join 2.4M+ researchers and thinkers. Free to start — no credit card required.
      </p>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={onNavigateToRegister} style={{
          padding: "16px 40px", background: "linear-gradient(135deg, #0d9488, #14b8a6, #2dd4bf)",
          border: "none", borderRadius: 14, cursor: "pointer",
          fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700,
          color: "#021a16", letterSpacing: "0.1em",
          boxShadow: "0 8px 40px rgba(20,184,166,0.45)",
          transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 16px 60px rgba(20,184,166,0.6)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(20,184,166,0.45)"; }}
        >
          START FOR FREE →
        </button>
        <button style={{
          padding: "16px 40px", background: "transparent",
          border: "1.5px solid rgba(20,184,166,0.3)", borderRadius: 14, cursor: "pointer",
          fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700,
          color: "#14b8a6", letterSpacing: "0.1em",
          transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(20,184,166,0.7)"; e.currentTarget.style.background = "rgba(20,184,166,0.06)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(20,184,166,0.3)"; e.currentTarget.style.background = "transparent"; }}
        >
          WATCH DEMO
        </button>
      </div>
    </div>
  );
}
