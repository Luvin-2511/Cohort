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

function HelixCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf, t = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      t += 0.012;
      const STRANDS = 3, POINTS = 28;
      for (let s = 0; s < STRANDS; s++) {
        const offset = (s / STRANDS) * Math.PI * 2;
        const baseX = W * (0.2 + s * 0.3);
        for (let i = 0; i < POINTS - 1; i++) {
          const p1 = i / POINTS, p2 = (i + 1) / POINTS;
          const y1 = p1 * H, y2 = p2 * H;
          const x1 = baseX + Math.sin(p1 * Math.PI * 4 + t + offset) * 50;
          const x2 = baseX + Math.sin(p2 * Math.PI * 4 + t + offset) * 50;
          const bright = (Math.sin(p1 * Math.PI * 4 + t + offset) + 1) / 2;
          ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(20,184,166,${0.08 + bright * 0.25})`; ctx.lineWidth = 1.5; ctx.stroke();
          if (i % 4 === 0) {
            const g = ctx.createRadialGradient(x1, y1, 0, x1, y1, 5);
            g.addColorStop(0, `rgba(45,212,191,${0.6 * bright + 0.1})`); g.addColorStop(1, "rgba(45,212,191,0)");
            ctx.beginPath(); ctx.arc(x1, y1, 5, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
          }
        }
        if (s < STRANDS - 1) {
          for (let i = 0; i < POINTS; i += 5) {
            const p = i / POINTS, y = p * H;
            const x1 = baseX + Math.sin(p * Math.PI * 4 + t + offset) * 50;
            const nextOffset = ((s + 1) / STRANDS) * Math.PI * 2;
            const nextBase = W * (0.2 + (s + 1) * 0.3);
            const x2 = nextBase + Math.sin(p * Math.PI * 4 + t + nextOffset) * 50;
            ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y);
            ctx.strokeStyle = "rgba(20,184,166,0.08)"; ctx.lineWidth = 0.8; ctx.stroke();
          }
        }
      }
      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(t * 0.3 + i * 0.7) * 0.4 + 0.5) * W;
        const y = (Math.cos(t * 0.2 + i * 1.1) * 0.4 + 0.5) * H;
        const r = Math.sin(t + i) * 1 + 1.5;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(103,232,249,${0.1 + Math.abs(Math.sin(t + i)) * 0.15})`; ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.7 }} />;
}


function SmartInput({ label, type = "text", value, onChange, hint, validate }) {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const lineRef = useRef(null);
  const valid = validate ? validate(value) : null;
  const showValid = touched && value && valid !== null;

  useEffect(() => {
    gsap.to(lineRef.current, {
      scaleX: focused ? 1 : 0,
      background: showValid
        ? valid ? "linear-gradient(90deg,transparent,#22c55e,transparent)" : "linear-gradient(90deg,transparent,#ef4444,transparent)"
        : "linear-gradient(90deg,transparent,#14b8a6,transparent)",
      duration: focused ? 0.35 : 0.25, ease: "power2.out",
    });
  }, [focused, showValid, valid]);

  return (
    <div style={{ marginBottom: 18, position: "relative" }}>
      <label style={{ display: "block", fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", color: focused ? "#14b8a6" : "#1f4e3d", marginBottom: 7, textTransform: "uppercase", transition: "color 0.2s" }}>
        {label}{hint && <span style={{ color: "#1f2937", fontWeight: 400, marginLeft: 8, textTransform: "none", letterSpacing: 0 }}>{hint}</span>}
      </label>
      <div style={{ position: "relative" }}>
        <input type={type} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => { setFocused(false); setTouched(true); }}
          style={{ width: "100%", background: "rgba(255,255,255,0.025)", border: `1px solid ${showValid ? (valid ? "#22c55e" : "#ef4444") : focused ? "rgba(20,184,166,0.5)" : "rgba(255,255,255,0.07)"}`, borderRadius: 10, padding: "12px 16px", color: "#ecfdf5", fontFamily: "'Space Mono', monospace", fontSize: 13, outline: "none", transition: "border-color 0.2s", boxShadow: focused ? "0 0 0 3px rgba(20,184,166,0.06)" : "none" }}
        />
        {showValid && <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: valid ? "#22c55e" : "#ef4444" }}>{valid ? "✓" : "✗"}</span>}
      </div>
      <div ref={lineRef} style={{ position: "absolute", bottom: 0, left: 10, right: 10, height: 1.5, background: "linear-gradient(90deg,transparent,#14b8a6,transparent)", transformOrigin: "center", transform: "scaleX(0)", borderRadius: 2 }} />
    </div>
  );
}

function PasswordStrength({ value }) {
  const checks = [
    { label: "8+ chars", pass: value.length >= 8 },
    { label: "Uppercase", pass: /[A-Z]/.test(value) },
    { label: "Number", pass: /[0-9]/.test(value) },
    { label: "Special char", pass: /[^a-zA-Z0-9]/.test(value) },
  ];
  const score = checks.filter(c => c.pass).length;
  const colors = ["#1f2937","#ef4444","#f97316","#eab308","#22c55e"];
  const labels = ["","Weak","Fair","Good","Strong"];
  if (!value) return null;
  return (
    <div style={{ marginBottom: 18, padding: "14px 16px", background: "rgba(20,184,166,0.04)", border: "1px solid rgba(20,184,166,0.08)", borderRadius: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "#374151", letterSpacing: "0.12em", textTransform: "uppercase" }}>Password Strength</span>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: colors[score] }}>{labels[score]}</span>
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
        {[0,1,2,3].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i < score ? colors[score] : "rgba(255,255,255,0.06)", transition: "background 0.3s" }} />)}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px" }}>
        {checks.map(c => <span key={c.label} style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: c.pass ? "#2dd4bf" : "#1f4e3d", display: "flex", alignItems: "center", gap: 4 }}><span>{c.pass ? "✓" : "○"}</span>{c.label}</span>)}
      </div>
    </div>
  );
}

function StepIndicator({ current, total }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 28 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: i < current ? 24 : 8, height: 8, borderRadius: 4, background: i < current ? "linear-gradient(90deg,#14b8a6,#2dd4bf)" : i === current ? "rgba(20,184,166,0.3)" : "rgba(255,255,255,0.05)", border: i === current ? "1px solid rgba(20,184,166,0.4)" : "none", transition: "width 0.4s,background 0.3s" }} />
          {i < total - 1 && <div style={{ width: 16, height: 1, background: i < current ? "rgba(20,184,166,0.4)" : "rgba(255,255,255,0.05)" }} />}
        </div>
      ))}
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "#1f4e3d", letterSpacing: "0.1em", marginLeft: 4 }}>STEP {current + 1}/{total}</span>
    </div>
  );
}

function Checkbox({ checked, onChange, children }) {
  const boxRef = useRef(null);
  const handle = () => { onChange(!checked); gsap.fromTo(boxRef.current, { scale: 0.85 }, { scale: 1, duration: 0.2, ease: "back.out(3)" }); };
  return (
    <div onClick={handle} style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer", marginBottom: 18 }}>
      <div ref={boxRef} style={{ width: 18, height: 18, minWidth: 18, borderRadius: 5, border: `1.5px solid ${checked ? "#14b8a6" : "rgba(255,255,255,0.1)"}`, background: checked ? "rgba(20,184,166,0.15)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1, transition: "border-color 0.2s,background 0.2s" }}>
        {checked && <span style={{ color: "#14b8a6", fontSize: 10 }}>✓</span>}
      </div>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#374151", lineHeight: 1.7 }}>{children}</span>
    </div>
  );
}

function SubmitBtnRegister({ children, onClick, disabled }) {
  const ref = useRef(null);
  return (
    <button ref={ref} onClick={onClick} disabled={disabled}
      onMouseEnter={() => !disabled && gsap.to(ref.current, { scale: 1.02, duration: 0.2 })}
      onMouseLeave={() => gsap.to(ref.current, { scale: 1, duration: 0.2 })}
      style={{ width: "100%", padding: "15px 0", background: disabled ? "rgba(255,255,255,0.04)" : "linear-gradient(135deg,#0d9488 0%,#14b8a6 45%,#2dd4bf 100%)", border: disabled ? "1px solid rgba(255,255,255,0.06)" : "none", borderRadius: 12, cursor: disabled ? "not-allowed" : "pointer", fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.12em", color: disabled ? "#1f2937" : "#021a16", boxShadow: disabled ? "none" : "0 8px 32px rgba(20,184,166,0.4)", transition: "background 0.3s,box-shadow 0.3s" }}>
      {children}
    </button>
  );
}

export function RegisterPage({ onNavigateToLogin }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [updates, setUpdates] = useState(false);
  const [step, setStep] = useState(0);

  const rightRef = useRef(null);
  const cardRef = useRef(null);
  const headRef = useRef(null);
  const formRef = useRef(null);

  const canSubmit = name && email && password.length >= 8 && confirm === password && agreed;
  const filledFields = [name, username, email, password, confirm].filter(Boolean).length;
  const progress = filledFields / 5;

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(rightRef.current, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 1 }, 0)
      .fromTo(cardRef.current, { opacity: 0, y: 30, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.9 }, 0.2)
      .fromTo(headRef.current.children, { opacity: 0, y: 18 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.6 }, 0.4)
      .fromTo(formRef.current.children, { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.5 }, 0.6);
    gsap.to(".reg-orb-1", { y: -25, x: 15, duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1 });
    gsap.to(".reg-orb-2", { y: 18, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.5 });
  }, []);

  useEffect(() => { setStep(Math.min(Math.floor(progress * 3), 2)); }, [progress]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #020c09; }
        input::placeholder { color: #1a2e28; font-family: 'Space Mono', monospace; }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 100px #051a14 inset !important; -webkit-text-fill-color: #ecfdf5 !important; }
        ::-webkit-scrollbar { width: 0; }
        .link-hover { transition: color 0.2s; } .link-hover:hover { color: #14b8a6 !important; }
      `}</style>
      <div style={{ display: "flex", minHeight: "100vh", background: "#020c09", overflow: "hidden", position: "relative" }}>
        <div className="reg-orb-1" style={{ position: "fixed", top: "5%", right: "5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(20,184,166,0.10) 0%,transparent 70%)", filter: "blur(50px)", pointerEvents: "none", zIndex: 0 }} />
        <div className="reg-orb-2" style={{ position: "fixed", bottom: "0%", left: "15%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(6,182,212,0.07) 0%,transparent 70%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />

        {/* LEFT */}
        <div style={{ width: 420, minWidth: 420, position: "relative", overflow: "hidden", borderRight: "1px solid rgba(20,184,166,0.07)", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "52px 44px" }}>
          <HelixCanvas />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(2,12,9,0.6) 0%,rgba(2,12,9,0.2) 100%)", pointerEvents: "none", zIndex: 1 }} />
          <div style={{ position: "relative", zIndex: 2 }}><BrainLogo /></div>
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#14b8a6", letterSpacing: "0.18em", marginBottom: 14 }}>// JOIN THE NETWORK</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 42, fontWeight: 800, color: "#f0fdf4", lineHeight: 1.1, marginBottom: 20 }}>
              Your brain,<br /><span style={{ background: "linear-gradient(90deg,#14b8a6,#67e8f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>amplified.</span>
            </h2>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#374151", lineHeight: 1.9, marginBottom: 36 }}>
              Join 2.4M+ researchers, students, and professionals who use brainEX to search smarter and think deeper.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[["∞","Unlimited AI-powered queries"],["⚡","Real-time web synthesis"],["◈","Personalized knowledge graph"],["🔒","Privacy-first architecture"]].map(([icon, text]) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(20,184,166,0.07)", border: "1px solid rgba(20,184,166,0.15)", borderRadius: 8, color: "#14b8a6", fontSize: 14, flexShrink: 0 }}>{icon}</div>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#4b5563" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Testimonial REMOVED */}
          <div style={{ position: "relative", zIndex: 2, height: 20 }} />
        </div>

        {/* RIGHT */}
        <div ref={rightRef} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 52px", position: "relative", zIndex: 2, overflowY: "auto" }}>
          <div ref={cardRef} style={{ width: "100%", maxWidth: 520, background: "rgba(5,20,15,0.82)", backdropFilter: "blur(40px)", borderRadius: 24, border: "1px solid rgba(20,184,166,0.1)", padding: "44px 44px", position: "relative", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.5),inset 0 1px 0 rgba(20,184,166,0.07)" }}>
            {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
              <div key={v+h} style={{ position: "absolute", [v]: 0, [h]: 0, width: 28, height: 28, borderTop: v==="top"?"1.5px solid rgba(20,184,166,0.35)":"none", borderBottom: v==="bottom"?"1.5px solid rgba(20,184,166,0.35)":"none", borderLeft: h==="left"?"1.5px solid rgba(20,184,166,0.35)":"none", borderRight: h==="right"?"1.5px solid rgba(20,184,166,0.35)":"none" }} />
            ))}
            <div style={{ position: "absolute", top: -1, left: "20%", right: "20%", height: 1, background: "linear-gradient(90deg,transparent,#14b8a6,transparent)" }} />
            <div style={{ position: "absolute", top: 0, left: 0, height: 3, width: `${progress * 100}%`, background: "linear-gradient(90deg,#0d9488,#2dd4bf)", borderRadius: "24px 0 0 0", transition: "width 0.4s ease", boxShadow: "0 0 12px rgba(20,184,166,0.5)" }} />
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: 24, background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.02) 2px,rgba(0,0,0,0.02) 4px)" }} />

            <div ref={headRef} style={{ marginBottom: 28 }}>
              <StepIndicator current={step} total={3} />
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#14b8a6", letterSpacing: "0.18em", marginBottom: 8 }}>CREATE ACCOUNT</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 30, fontWeight: 800, color: "#ecfdf5", lineHeight: 1.1, marginBottom: 6 }}>Start exploring for free</h2>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#1f4e3d", lineHeight: 1.6 }}>Set up your brainEX account in under 60 seconds</p>
            </div>

            <div ref={formRef}>
              <div style={{ display: "flex", gap: 14 }}>
                <div style={{ flex: 1 }}><SmartInput label="Full Name" value={name} onChange={e => setName(e.target.value)} validate={v => v.trim().split(" ").length >= 2} /></div>
                <div style={{ flex: 1 }}><SmartInput label="Username" hint="@handle" value={username} onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g,""))} validate={v => v.length >= 3 && /^[a-z0-9_]+$/.test(v)} /></div>
              </div>
              <SmartInput label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} validate={v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)} />
              <SmartInput label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} validate={v => v.length >= 8 && /[A-Z]/.test(v) && /[0-9]/.test(v)} />
              <PasswordStrength value={password} />
              <SmartInput label="Confirm Password" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} validate={v => v === password && v.length > 0} />
              <Checkbox checked={agreed} onChange={setAgreed}>
                I agree to the <span className="link-hover" style={{ color: "#14b8a6", cursor: "pointer" }}>Terms of Service</span> and <span className="link-hover" style={{ color: "#14b8a6", cursor: "pointer" }}>Privacy Policy</span>
              </Checkbox>
              <Checkbox checked={updates} onChange={setUpdates}>
                <span style={{ color: "#1f4e3d" }}>Send me product updates and research insights (optional)</span>
              </Checkbox>
              <SubmitBtnRegister disabled={!canSubmit}>{canSubmit ? "LAUNCH MY ACCOUNT →" : "COMPLETE ALL FIELDS"}</SubmitBtnRegister>
              <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,transparent,rgba(20,184,166,0.12))" }} />
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "#1f2937", letterSpacing: "0.12em" }}>OR SIGN UP WITH</span>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,rgba(20,184,166,0.12),transparent)" }} />
              </div>
              <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                {[["G","Google"],["⌘","Apple"],["𝕏","Twitter"]].map(([icon,label]) => (
                  <button key={label} style={{ flex: 1, padding: "10px 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, cursor: "pointer", color: "#374151", fontFamily: "'Space Mono', monospace", fontSize: 10, transition: "border-color 0.2s,color 0.2s" }}
                    onMouseOver={e => { e.currentTarget.style.borderColor="rgba(20,184,166,0.3)"; e.currentTarget.style.color="#d1fae5"; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"; e.currentTarget.style.color="#374151"; }}
                  ><span style={{ fontSize: 14 }}>{icon}</span>{label}</button>
                ))}
              </div>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#1f2937" }}>
                  Already have an account?{" "}
                  <span onClick={onNavigateToLogin} className="link-hover" style={{ color: "#14b8a6", cursor: "pointer", fontWeight: 700 }}>Sign in →</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


function NeuralCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const N = 70;
    const nodes = Array.from({ length: N }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random()-0.5)*0.00045, vy: (Math.random()-0.5)*0.00045, r: Math.random()*1.8+0.8, phase: Math.random()*Math.PI*2 }));
    let mouse = { x: -999, y: -999 };
    const onMove = (e) => { mouse.x = e.clientX/canvas.width; mouse.y = e.clientY/canvas.height; };
    window.addEventListener("mousemove", onMove);
    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0,0,W,H);
      for (let i=0;i<N;i++) for (let j=i+1;j<N;j++) {
        const a=nodes[i],b=nodes[j];
        const dx=(a.x-b.x)*W,dy=(a.y-b.y)*H,d=Math.sqrt(dx*dx+dy*dy);
        if(d<140){ctx.beginPath();ctx.moveTo(a.x*W,a.y*H);ctx.lineTo(b.x*W,b.y*H);ctx.strokeStyle=`rgba(20,184,166,${(1-d/140)*0.3})`;ctx.lineWidth=0.7;ctx.stroke();}
      }
      nodes.forEach(n => {
        n.phase+=0.022;
        const glow=(Math.sin(n.phase)+1)/2;
        const mx=(n.x-mouse.x)*W,my=(n.y-mouse.y)*H,md=Math.sqrt(mx*mx+my*my);
        const pull=md<120?(1-md/120)*0.003:0;
        n.vx-=(n.x-mouse.x)*pull;n.vy-=(n.y-mouse.y)*pull;
        n.x+=n.vx;n.y+=n.vy;
        if(n.x<0||n.x>1)n.vx*=-1;if(n.y<0||n.y>1)n.vy*=-1;
        const g=ctx.createRadialGradient(n.x*W,n.y*H,0,n.x*W,n.y*H,n.r*5);
        g.addColorStop(0,`rgba(20,184,166,${0.85*glow+0.15})`);g.addColorStop(1,"rgba(20,184,166,0)");
        ctx.beginPath();ctx.arc(n.x*W,n.y*H,n.r*5,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();
        ctx.beginPath();ctx.arc(n.x*W,n.y*H,n.r,0,Math.PI*2);ctx.fillStyle=`rgba(167,243,208,${0.6+0.4*glow})`;ctx.fill();
      });
      raf=requestAnimationFrame(draw);
    };
    draw();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);window.removeEventListener("mousemove",onMove);};
  },[]);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.55}}/>;
}

function FloatingInput({ label, type="text", value, onChange, icon: Icon }) {
  const [focused, setFocused] = useState(false);
  const lineRef = useRef(null);
  const labelRef = useRef(null);
  useEffect(() => {
    if(focused){gsap.to(lineRef.current,{scaleX:1,duration:0.35,ease:"power2.out"});gsap.to(labelRef.current,{color:"#14b8a6",y:-2,duration:0.2});}
    else{gsap.to(lineRef.current,{scaleX:0,duration:0.3,ease:"power2.in"});gsap.to(labelRef.current,{color:"#4b5563",y:0,duration:0.2});}
  },[focused]);
  const active=focused||value;
  return (
    <div style={{position:"relative",marginBottom:24}}>
      <div style={{display:"flex",alignItems:"center",background:"rgba(255,255,255,0.03)",border:`1px solid ${focused?"rgba(20,184,166,0.5)":"rgba(255,255,255,0.07)"}`,borderRadius:12,padding:"0 16px",transition:"border-color 0.2s",boxShadow:focused?"0 0 0 4px rgba(20,184,166,0.06),inset 0 1px 3px rgba(0,0,0,0.4)":"inset 0 1px 3px rgba(0,0,0,0.3)"}}>
        {Icon&&<span style={{color:focused?"#14b8a6":"#374151",marginRight:12,fontSize:16,transition:"color 0.2s",flexShrink:0}}><Icon/></span>}
        <div style={{flex:1,position:"relative",paddingTop:20,paddingBottom:8}}>
          <label ref={labelRef} style={{position:"absolute",top:active?6:"50%",transform:active?"none":"translateY(-50%)",fontFamily:"'Space Mono',monospace",fontSize:active?9:13,color:"#4b5563",letterSpacing:active?"0.12em":"0.05em",textTransform:active?"uppercase":"none",pointerEvents:"none",transition:"top 0.2s,font-size 0.2s,transform 0.2s"}}>{label}</label>
          <input type={type} value={value} onChange={onChange} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} style={{width:"100%",background:"transparent",border:"none",outline:"none",color:"#ecfdf5",fontFamily:"'Space Mono',monospace",fontSize:14,paddingTop:4}}/>
        </div>
      </div>
      <div ref={lineRef} style={{position:"absolute",bottom:0,left:12,right:12,height:1.5,background:"linear-gradient(90deg,transparent,#14b8a6 30%,#2dd4bf 70%,transparent)",transformOrigin:"center",transform:"scaleX(0)",borderRadius:2}}/>
    </div>
  );
}

function GlitchText({ text, style={} }) {
  const ref=useRef(null);
  useEffect(()=>{
    let timeout;
    const glitch=()=>{
      gsap.to(ref.current,{x:-3,skewX:3,opacity:0.8,duration:0.05,yoyo:true,repeat:3,ease:"none",onComplete:()=>gsap.set(ref.current,{x:0,skewX:0,opacity:1})});
      timeout=setTimeout(glitch,3000+Math.random()*4000);
    };
    timeout=setTimeout(glitch,2000);
    return()=>clearTimeout(timeout);
  },[]);
  return <span ref={ref} style={style}>{text}</span>;
}

const EmailIcon=()=>(<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="3"/><polyline points="2,4 12,14 22,4"/></svg>);
const LockIcon=()=>(<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>);

export function LoginPage({ onNavigateToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const leftRef=useRef(null),cardRef=useRef(null),logoRef=useRef(null),headRef=useRef(null),formRef=useRef(null),taglineRef=useRef(null),featuresRef=useRef(null);

  useEffect(()=>{
    const tl=gsap.timeline({defaults:{ease:"power3.out"}});
    tl.fromTo(leftRef.current,{opacity:0,x:-60},{opacity:1,x:0,duration:1},0)
      .fromTo(logoRef.current,{opacity:0,y:-20},{opacity:1,y:0,duration:0.7},0.3)
      .fromTo(taglineRef.current,{opacity:0,y:20},{opacity:1,y:0,duration:0.8},0.5)
      .fromTo(featuresRef.current.children,{opacity:0,x:-20},{opacity:1,x:0,stagger:0.1,duration:0.6},0.7)
      .fromTo(cardRef.current,{opacity:0,x:60,scale:0.95},{opacity:1,x:0,scale:1,duration:0.9},0.2)
      .fromTo(headRef.current.children,{opacity:0,y:20},{opacity:1,y:0,stagger:0.08,duration:0.6},0.5)
      .fromTo(formRef.current.children,{opacity:0,y:16},{opacity:1,y:0,stagger:0.07,duration:0.5},0.7);
    gsap.to(".orb-1",{y:-20,duration:4,ease:"sine.inOut",yoyo:true,repeat:-1});
    gsap.to(".orb-2",{y:15,x:-10,duration:5.5,ease:"sine.inOut",yoyo:true,repeat:-1,delay:1});
    gsap.to(".orb-3",{y:-12,x:8,duration:3.5,ease:"sine.inOut",yoyo:true,repeat:-1,delay:2});
  },[]);

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}body{background:#020c09;}input::placeholder{color:transparent;}input:-webkit-autofill{-webkit-box-shadow:0 0 0 100px #051a14 inset!important;-webkit-text-fill-color:#ecfdf5!important;}::-webkit-scrollbar{width:0;}.hover-link:hover{color:#14b8a6!important;text-decoration:underline;}`}</style>
      <div style={{display:"flex",minHeight:"100vh",background:"#020c09",overflow:"hidden",position:"relative"}}>
        <div className="orb-1" style={{position:"fixed",top:"15%",left:"10%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(20,184,166,0.12) 0%,transparent 70%)",filter:"blur(40px)",pointerEvents:"none",zIndex:0}}/>
        <div className="orb-2" style={{position:"fixed",bottom:"10%",right:"5%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(6,182,212,0.08) 0%,transparent 70%)",filter:"blur(60px)",pointerEvents:"none",zIndex:0}}/>
        <div className="orb-3" style={{position:"fixed",top:"60%",left:"40%",width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(16,185,129,0.06) 0%,transparent 70%)",filter:"blur(40px)",pointerEvents:"none",zIndex:0}}/>

        {/* Left */}
        <div ref={leftRef} style={{flex:1,position:"relative",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"52px 56px",overflow:"hidden",borderRight:"1px solid rgba(20,184,166,0.08)"}}>
          <NeuralCanvas/>
          <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.04,pointerEvents:"none"}}><defs><pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M 48 0 L 0 0 0 48" fill="none" stroke="#14b8a6" strokeWidth="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>
          <div style={{position:"absolute",top:0,right:0,width:1,height:"100%",background:"linear-gradient(180deg,transparent 0%,rgba(20,184,166,0.3) 40%,rgba(20,184,166,0.3) 60%,transparent 100%)",zIndex:2}}/>
          <div ref={logoRef} style={{position:"relative",zIndex:3}}><BrainLogo/></div>
          <div ref={taglineRef} style={{position:"relative",zIndex:3,maxWidth:420}}>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#14b8a6",letterSpacing:"0.2em",marginBottom:16}}>// INTELLIGENCE SEARCH ENGINE</div>
            <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:52,fontWeight:800,lineHeight:1.05,color:"#f0fdf4",marginBottom:20}}>Ask anything.<br/><span style={{background:"linear-gradient(90deg,#14b8a6,#2dd4bf,#67e8f9)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Know everything.</span></h1>
            <p style={{fontFamily:"'Space Mono',monospace",fontSize:13,color:"#374151",lineHeight:1.8,marginBottom:40}}>brainEX fuses real-time web search with AI synthesis — delivering cited, deep answers in milliseconds.</p>
            <div style={{display:"flex",gap:40}}>
              {[["2.4B+","Sources indexed"],["<200ms","Response time"],["99.9%","Uptime SLA"]].map(([val,lbl])=>(
                <div key={lbl}><div style={{fontFamily:"'Syne',sans-serif",fontSize:26,fontWeight:800,color:"#14b8a6",lineHeight:1}}>{val}</div><div style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:"#374151",marginTop:4,letterSpacing:"0.08em"}}>{lbl}</div></div>
              ))}
            </div>
          </div>
          <div ref={featuresRef} style={{position:"relative",zIndex:3,display:"flex",flexWrap:"wrap",gap:10}}>
            {["Neural Search","Live Web Index","Source Citations","Deep Research","Multi-modal"].map(tag=>(
              <div key={tag} style={{padding:"6px 14px",background:"rgba(20,184,166,0.06)",border:"1px solid rgba(20,184,166,0.18)",borderRadius:20,fontFamily:"'Space Mono',monospace",fontSize:10,color:"#2dd4bf",letterSpacing:"0.08em"}}>{tag}</div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{width:520,minWidth:520,display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 52px",position:"relative",zIndex:2}}>
          <div ref={cardRef} style={{width:"100%",background:"rgba(5,20,15,0.8)",backdropFilter:"blur(40px)",borderRadius:24,border:"1px solid rgba(20,184,166,0.12)",padding:"44px 40px",position:"relative",overflow:"hidden",boxShadow:"0 32px 80px rgba(0,0,0,0.5),0 0 0 1px rgba(20,184,166,0.05),inset 0 1px 0 rgba(20,184,166,0.08)"}}>
            <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden",borderRadius:24,background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px)"}}/>
            {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h])=>(
              <div key={v+h} style={{position:"absolute",[v]:0,[h]:0,width:28,height:28,borderTop:v==="top"?"1.5px solid rgba(20,184,166,0.4)":"none",borderBottom:v==="bottom"?"1.5px solid rgba(20,184,166,0.4)":"none",borderLeft:h==="left"?"1.5px solid rgba(20,184,166,0.4)":"none",borderRight:h==="right"?"1.5px solid rgba(20,184,166,0.4)":"none"}}/>
            ))}
            <div style={{position:"absolute",top:-1,left:"15%",right:"15%",height:1,background:"linear-gradient(90deg,transparent,#14b8a6,transparent)"}}/>
            <div ref={headRef} style={{marginBottom:32}}>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:"#14b8a6",letterSpacing:"0.18em",marginBottom:10}}>WELCOME BACK</div>
              <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:32,fontWeight:800,color:"#ecfdf5",lineHeight:1.1,marginBottom:8}}>Sign in to <GlitchText text="brainEX" style={{color:"#14b8a6"}}/></h2>
              <p style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#374151",lineHeight:1.7}}>Continue your intelligence journey</p>
            </div>
            <div ref={formRef}>
              <div style={{display:"flex",gap:10,marginBottom:24}}>
                {[["G","Google"],["⌘","Apple"],["𝕏","Twitter"]].map(([icon,label])=>(
                  <button key={label} style={{flex:1,padding:"11px 0",display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:10,cursor:"pointer",color:"#6b7280",fontFamily:"'Space Mono',monospace",fontSize:11,transition:"color 0.2s"}}
                    onMouseOver={e=>{e.currentTarget.style.color="#d1fae5";e.currentTarget.style.borderColor="rgba(20,184,166,0.5)";}}
                    onMouseOut={e=>{e.currentTarget.style.color="#6b7280";e.currentTarget.style.borderColor="rgba(255,255,255,0.06)";}}
                  ><span style={{fontSize:15}}>{icon}</span>{label}</button>
                ))}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
                <div style={{flex:1,height:1,background:"linear-gradient(90deg,transparent,rgba(20,184,166,0.15))"}}/>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:"#1f2937",letterSpacing:"0.12em"}}>OR</span>
                <div style={{flex:1,height:1,background:"linear-gradient(90deg,rgba(20,184,166,0.15),transparent)"}}/>
              </div>
              <FloatingInput label="Email address" type="email" value={email} onChange={e=>setEmail(e.target.value)} icon={EmailIcon}/>
              <div style={{position:"relative"}}>
                <FloatingInput label="Password" type={showPass?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} icon={LockIcon}/>
                <button onClick={()=>setShowPass(!showPass)} style={{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#374151",fontSize:13,fontFamily:"'Space Mono',monospace"}}>{showPass?"HIDE":"SHOW"}</button>
              </div>
              <div style={{textAlign:"right",marginTop:-14,marginBottom:24}}>
                <span className="hover-link" style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#1f4e3d",cursor:"pointer",transition:"color 0.2s"}}>Forgot password?</span>
              </div>
              <button onClick={()=>{}} style={{width:"100%",padding:"15px 0",position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#0d9488 0%,#14b8a6 45%,#2dd4bf 100%)",border:"none",borderRadius:12,cursor:"pointer",fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,letterSpacing:"0.12em",color:"#021a16",boxShadow:"0 8px 32px rgba(20,184,166,0.4)",transition:"transform 0.15s"}}
                onMouseEnter={e=>e.currentTarget.style.transform="scale(1.02)"}
                onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
              >SIGN IN →</button>
              <div style={{textAlign:"center",marginTop:28}}>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#1f2937"}}>No account yet?{" "}<span onClick={onNavigateToRegister} className="hover-link" style={{color:"#14b8a6",cursor:"pointer",fontWeight:700}}>Create one →</span></span>
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginTop:28,padding:"8px 16px",background:"rgba(20,184,166,0.04)",border:"1px solid rgba(20,184,166,0.08)",borderRadius:8}}>
                <span style={{color:"#14b8a6",fontSize:12}}>🔒</span>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:"#1f4e3d",letterSpacing:"0.1em"}}>END-TO-END ENCRYPTED · SOC 2 COMPLIANT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}