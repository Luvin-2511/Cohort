import { useState, useEffect, useRef } from "react";
import { gsap } from "https://cdn.skypack.dev/gsap";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { PerplexityLoader } from "../../shared/components/Loader";

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
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00045,
      vy: (Math.random() - 0.5) * 0.00045,
      r: Math.random() * 1.8 + 0.8,
      phase: Math.random() * Math.PI * 2,
    }));

    let mouse = { x: -999, y: -999 };
    const onMove = (e) => { mouse.x = e.clientX / canvas.width; mouse.y = e.clientY / canvas.height; };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = (a.x - b.x) * W, dy = (a.y - b.y) * H;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            const alpha = (1 - d / 140) * 0.25;
            ctx.beginPath();
            ctx.moveTo(a.x * W, a.y * H);
            ctx.lineTo(b.x * W, b.y * H);
            ctx.strokeStyle = `rgba(124,92,252,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        n.phase += 0.022;
        const glow = (Math.sin(n.phase) + 1) / 2;
        const mx = (n.x - mouse.x) * W, my = (n.y - mouse.y) * H;
        const md = Math.sqrt(mx * mx + my * my);
        const pull = md < 120 ? (1 - md / 120) * 0.003 : 0;
        n.vx -= (n.x - mouse.x) * pull;
        n.vy -= (n.y - mouse.y) * pull;
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;

        const g = ctx.createRadialGradient(n.x * W, n.y * H, 0, n.x * W, n.y * H, n.r * 5);
        g.addColorStop(0, `rgba(124,92,252,${0.85 * glow + 0.15})`);
        g.addColorStop(1, "rgba(124,92,252,0)");
        ctx.beginPath(); ctx.arc(n.x * W, n.y * H, n.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x * W, n.y * H, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(192,170,255,${0.6 + 0.4 * glow})`; ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMove); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 }} />;
}

function GridOverlay() {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }}>
      <defs>
        <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#7c5cfc" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

function BrainLogo({ size = 1 }) {
  const s = size;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 * s }}>
      <svg width={38 * s} height={38 * s} viewBox="0 0 38 38">
        <polygon points="19,2 35,11 35,27 19,36 3,27 3,11" fill="none" stroke="#7c5cfc" strokeWidth="1.2" />
        <polygon points="19,8 29,14 29,24 19,30 9,24 9,14" fill="rgba(124,92,252,0.08)" stroke="#7c5cfc" strokeWidth="0.7" strokeDasharray="2,2" />
        <polygon points="19,13 24,16 24,22 19,25 14,22 14,16" fill="rgba(124,92,252,0.15)" stroke="#9273ff" strokeWidth="0.5" />
        <circle cx="19" cy="19" r="3.5" fill="#7c5cfc" />
        <circle cx="19" cy="19" r="5.5" fill="none" stroke="rgba(124,92,252,0.35)" strokeWidth="0.8" />
        {[0,60,120,180,240,300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 19 + 5.5 * Math.cos(rad), y1 = 19 + 5.5 * Math.sin(rad);
          const x2 = 19 + 9.5 * Math.cos(rad), y2 = 19 + 9.5 * Math.sin(rad);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#7c5cfc" strokeWidth="0.9" opacity="0.7" />;
        })}
      </svg>
      <div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20 * s, fontWeight: 800, letterSpacing: "0.04em", color: "#f0eeff", lineHeight: 1 }}>
          brain<span style={{ color: "#7c5cfc" }}>EX</span>
        </div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8 * s, color: "#9273ff", letterSpacing: "0.2em", marginTop: 2 }}>
          INTELLIGENCE LAYER
        </div>
      </div>
    </div>
  );
}

function FloatingInput({ label, type = "text", value, onChange, icon: Icon }) {
  const [focused, setFocused] = useState(false);
  const lineRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (focused) {
      gsap.to(lineRef.current, { scaleX: 1, duration: 0.35, ease: "power2.out" });
      gsap.to(labelRef.current, { color: "#7c5cfc", y: -2, duration: 0.2 });
    } else {
      gsap.to(lineRef.current, { scaleX: 0, duration: 0.3, ease: "power2.in" });
      gsap.to(labelRef.current, { color: "#4b5569", y: 0, duration: 0.2 });
    }
  }, [focused]);

  const active = focused || value;
  return (
    <div style={{ position: "relative", marginBottom: 24 }}>
      <div style={{
        display: "flex", alignItems: "center",
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${focused ? "rgba(124,92,252,0.5)" : "rgba(160,140,255,0.08)"}`,
        borderRadius: 12,
        padding: "0 16px",
        transition: "border-color 0.2s",
        boxShadow: focused ? "0 0 0 4px rgba(124,92,252,0.07), inset 0 1px 3px rgba(0,0,0,0.4)" : "inset 0 1px 3px rgba(0,0,0,0.3)",
      }}>
        {Icon && (
          <span style={{ color: focused ? "#7c5cfc" : "#3d3a55", marginRight: 12, fontSize: 16, transition: "color 0.2s", flexShrink: 0 }}>
            <Icon />
          </span>
        )}
        <div style={{ flex: 1, position: "relative", paddingTop: 20, paddingBottom: 8 }}>
          <label ref={labelRef} style={{
            position: "absolute", top: active ? 6 : "50%",
            transform: active ? "none" : "translateY(-50%)",
            fontFamily: "'Space Mono', monospace",
            fontSize: active ? 9 : 13,
            color: "#4b5569",
            letterSpacing: active ? "0.12em" : "0.05em",
            textTransform: active ? "uppercase" : "none",
            pointerEvents: "none",
            transition: "top 0.2s, font-size 0.2s, transform 0.2s",
          }}>
            {label}
          </label>
          <input
            type={type}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              width: "100%", background: "transparent", border: "none", outline: "none",
              color: "#ede8ff", fontFamily: "'Space Mono', monospace", fontSize: 14,
              paddingTop: 4,
            }}
          />
        </div>
      </div>
      <div ref={lineRef} style={{
        position: "absolute", bottom: 0, left: 12, right: 12, height: 1.5,
        background: "linear-gradient(90deg, transparent, #7c5cfc 30%, #9273ff 70%, transparent)",
        transformOrigin: "center",
        transform: "scaleX(0)",
        borderRadius: 2,
      }} />
    </div>
  );
}

function GlitchText({ text, style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    let timeout;
    const glitch = () => {
      gsap.to(el, { x: -3, skewX: 3, opacity: 0.8, duration: 0.05, yoyo: true, repeat: 3, ease: "none",
        onComplete: () => gsap.set(el, { x: 0, skewX: 0, opacity: 1 }) });
      timeout = setTimeout(glitch, 3000 + Math.random() * 4000);
    };
    timeout = setTimeout(glitch, 2000);
    return () => clearTimeout(timeout);
  }, []);
  return <span ref={ref} style={style}>{text}</span>;
}

function SubmitBtn({ children, onClick }) {
  const ref = useRef(null);
  const rippleRef = useRef(null);

  const handleClick = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    gsap.fromTo(rippleRef.current,
      { left: x, top: y, width: 0, height: 0, opacity: 0.35, x: 0, y: 0 },
      { width: 300, height: 300, x: -150, y: -150, opacity: 0, duration: 0.6, ease: "power2.out" }
    );
    onClick?.();
  };

  return (
    <button ref={ref} onClick={handleClick}
      onMouseEnter={() => gsap.to(ref.current, { scale: 1.02, duration: 0.2 })}
      onMouseLeave={() => gsap.to(ref.current, { scale: 1, duration: 0.2 })}
      style={{
        width: "100%", padding: "15px 0", position: "relative", overflow: "hidden",
        background: "linear-gradient(135deg, #5b3fd4 0%, #7c5cfc 45%, #9273ff 100%)",
        border: "none", borderRadius: 12, cursor: "pointer",
        fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700,
        letterSpacing: "0.12em", color: "#fff",
        boxShadow: "0 8px 32px rgba(124,92,252,0.45), 0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      <div ref={rippleRef} style={{
        position: "absolute", borderRadius: "50%",
        background: "rgba(255,255,255,0.25)", pointerEvents: "none",
      }} />
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </button>
  );
}

function SocialBtn({ label, icon }) {
  const ref = useRef(null);
  return (
    <button ref={ref}
      onMouseEnter={() => gsap.to(ref.current, { y: -3, borderColor: "rgba(124,92,252,0.5)", duration: 0.2 })}
      onMouseLeave={() => gsap.to(ref.current, { y: 0, borderColor: "rgba(160,140,255,0.07)", duration: 0.2 })}
      style={{
        flex: 1, padding: "11px 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        background: "rgba(255,255,255,0.025)", border: "1px solid rgba(160,140,255,0.07)",
        borderRadius: 10, cursor: "pointer", color: "#6b6888",
        fontFamily: "'Space Mono', monospace", fontSize: 11,
        transition: "color 0.2s",
      }}
      onMouseOver={e => e.currentTarget.style.color = "#e2d9ff"}
      onMouseOut={e => e.currentTarget.style.color = "#6b6888"}
    >
      <span style={{ fontSize: 15 }}>{icon}</span>{label}
    </button>
  );
}

function ScanLine() {
  return (
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", borderRadius: 24,
      background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px)",
    }} />
  );
}

const EmailIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <polyline points="2,4 12,14 22,4" />
  </svg>
);
const LockIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

export default function LoginPage({ onNavigateToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await handleLogin({ email, password });
    if (response.success) navigate("/");
  };

  if (loading) return <PerplexityLoader/>;

  const leftRef     = useRef(null);
  const cardRef     = useRef(null);
  const logoRef     = useRef(null);
  const headRef     = useRef(null);
  const formRef     = useRef(null);
  const taglineRef  = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(leftRef.current,      { opacity: 0, x: -60 },             { opacity: 1, x: 0, duration: 1 }, 0)
      .fromTo(logoRef.current,      { opacity: 0, y: -20 },             { opacity: 1, y: 0, duration: 0.7 }, 0.3)
      .fromTo(taglineRef.current,   { opacity: 0, y: 20 },              { opacity: 1, y: 0, duration: 0.8 }, 0.5)
      .fromTo(featuresRef.current.children, { opacity: 0, x: -20 },     { opacity: 1, x: 0, stagger: 0.1, duration: 0.6 }, 0.7)
      .fromTo(cardRef.current,      { opacity: 0, x: 60, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.9 }, 0.2)
      .fromTo(headRef.current.children, { opacity: 0, y: 20 },          { opacity: 1, y: 0, stagger: 0.08, duration: 0.6 }, 0.5)
      .fromTo(formRef.current.children, { opacity: 0, y: 16 },          { opacity: 1, y: 0, stagger: 0.07, duration: 0.5 }, 0.7);

    gsap.to(".orb-1", { y: -20,       duration: 4,   ease: "sine.inOut", yoyo: true, repeat: -1 });
    gsap.to(".orb-2", { y: 15, x: -10, duration: 5.5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1 });
    gsap.to(".orb-3", { y: -12, x: 8,  duration: 3.5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2 });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0812; }
        input::placeholder { color: transparent; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 100px #100d1e inset !important;
          -webkit-text-fill-color: #ede8ff !important;
        }
        ::-webkit-scrollbar { width: 0; }
        .hover-link:hover { color: #7c5cfc !important; text-decoration: underline; }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh", background: "#0a0812", overflow: "hidden", position: "relative" }}>

        {/* ── AMBIENT ORBS ── */}
        <div className="orb-1" style={{ position: "fixed", top: "15%", left: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,92,252,0.13) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none", zIndex: 0 }} />
        <div className="orb-2" style={{ position: "fixed", bottom: "10%", right: "5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,71,219,0.09) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />
        <div className="orb-3" style={{ position: "fixed", top: "60%", left: "40%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(146,115,255,0.07) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none", zIndex: 0 }} />

        {/* ══════════════ LEFT PANEL ══════════════ */}
        <div ref={leftRef} style={{
          flex: 1, position: "relative", display: "flex", flexDirection: "column",
          justifyContent: "space-between", padding: "52px 56px", overflow: "hidden",
          borderRight: "1px solid rgba(124,92,252,0.09)",
        }}>
          <NeuralCanvas />
          <GridOverlay />

          {/* Right edge accent */}
          <div style={{
            position: "absolute", top: 0, right: 0, width: 1, height: "100%",
            background: "linear-gradient(180deg, transparent 0%, rgba(124,92,252,0.35) 40%, rgba(124,92,252,0.35) 60%, transparent 100%)",
            zIndex: 2,
          }} />

          {/* Logo */}
          <div ref={logoRef} style={{ position: "relative", zIndex: 3 }}>
            <BrainLogo />
          </div>

          {/* Center content */}
          <div ref={taglineRef} style={{ position: "relative", zIndex: 3, maxWidth: 420 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#7c5cfc", letterSpacing: "0.2em", marginBottom: 16 }}>
              // INTELLIGENCE SEARCH ENGINE
            </div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 52, fontWeight: 800, lineHeight: 1.05, color: "#f0eeff", marginBottom: 20 }}>
              Ask anything.
              <br />
              <span style={{ background: "linear-gradient(90deg, #7c5cfc, #9273ff, #c4b5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Know everything.
              </span>
            </h1>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "#3d3a55", lineHeight: 1.8, marginBottom: 40 }}>
              brainEX fuses real-time web search with AI synthesis — delivering cited, deep answers in milliseconds.
            </p>

            {/* Stats */}
            <div style={{ display: "flex", gap: 40 }}>
              {[["2.4B+", "Sources indexed"], ["<200ms", "Response time"], ["99.9%", "Uptime SLA"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: "#7c5cfc", lineHeight: 1 }}>{val}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#3d3a55", marginTop: 4, letterSpacing: "0.08em" }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature pills */}
          <div ref={featuresRef} style={{ position: "relative", zIndex: 3, display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["Neural Search", "Live Web Index", "Source Citations", "Deep Research", "Multi-modal"].map(tag => (
              <div key={tag} style={{
                padding: "6px 14px",
                background: "rgba(124,92,252,0.07)",
                border: "1px solid rgba(124,92,252,0.2)",
                borderRadius: 20,
                fontFamily: "'Space Mono', monospace",
                fontSize: 10, color: "#9273ff", letterSpacing: "0.08em",
              }}>
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════ RIGHT CARD ══════════════ */}
        <div style={{
          width: 520, minWidth: 520, display: "flex", alignItems: "center",
          justifyContent: "center", padding: "40px 52px", position: "relative", zIndex: 2,
        }}>
          <div ref={cardRef} style={{
            width: "100%",
            background: "rgba(12,9,24,0.82)",
            backdropFilter: "blur(40px)",
            borderRadius: 24,
            border: "1px solid rgba(124,92,252,0.13)",
            padding: "44px 40px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,92,252,0.06), inset 0 1px 0 rgba(124,92,252,0.09)",
          }}>
            <ScanLine />

            {/* Corner accents */}
            {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
              <div key={v+h} style={{
                position: "absolute", [v]: 0, [h]: 0, width: 28, height: 28,
                borderTop:    v === "top"    ? "1.5px solid rgba(124,92,252,0.4)" : "none",
                borderBottom: v === "bottom" ? "1.5px solid rgba(124,92,252,0.4)" : "none",
                borderLeft:   h === "left"   ? "1.5px solid rgba(124,92,252,0.4)" : "none",
                borderRight:  h === "right"  ? "1.5px solid rgba(124,92,252,0.4)" : "none",
              }} />
            ))}

            {/* Top glow line */}
            <div style={{
              position: "absolute", top: -1, left: "15%", right: "15%", height: 1,
              background: "linear-gradient(90deg, transparent, #7c5cfc, transparent)",
            }} />

            {/* Header */}
            <div ref={headRef} style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#7c5cfc", letterSpacing: "0.18em", marginBottom: 10 }}>
                WELCOME BACK
              </div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: "#ede8ff", lineHeight: 1.1, marginBottom: 8 }}>
                Sign in to{" "}
                <GlitchText text="brainEX" style={{ color: "#7c5cfc" }} />
              </h2>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#3d3a55", lineHeight: 1.7 }}>
                Continue your intelligence journey
              </p>
            </div>

            {/* Form */}
            <div ref={formRef}>
              {/* Social */}
              <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
                <SocialBtn icon="G" label="Google" />
                <SocialBtn icon="⌘" label="Apple" />
                <SocialBtn icon="𝕏" label="Twitter" />
              </div>

              {/* Divider */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(124,92,252,0.18))" }} />
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#2a2440", letterSpacing: "0.12em" }}>OR</span>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(124,92,252,0.18), transparent)" }} />
              </div>

              {/* Inputs */}
              <FloatingInput label="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} icon={EmailIcon} />
              <div style={{ position: "relative" }}>
                <FloatingInput label="Password" type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} icon={LockIcon} />
                <button onClick={() => setShowPass(!showPass)} style={{
                  position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "#3d3a55", fontSize: 13, fontFamily: "'Space Mono', monospace",
                  transition: "color 0.2s",
                }}
                  onMouseOver={e => e.currentTarget.style.color = "#7c5cfc"}
                  onMouseOut={e => e.currentTarget.style.color = "#3d3a55"}
                >
                  {showPass ? "HIDE" : "SHOW"}
                </button>
              </div>

              {/* Forgot */}
              <div style={{ textAlign: "right", marginTop: -14, marginBottom: 24 }}>
                <span className="hover-link" style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#2a2440", cursor: "pointer", transition: "color 0.2s" }}>
                  Forgot password?
                </span>
              </div>

              {/* Submit */}
              <SubmitBtn onClick={handleSubmit}>SIGN IN →</SubmitBtn>

              {/* Bottom link */}
              <div style={{ textAlign: "center", marginTop: 28 }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#2a2440" }}>
                  No account yet?{" "}
                  <span
                    onClick={() => navigate("/register")}
                    className="hover-link"
                    style={{ color: "#7c5cfc", cursor: "pointer", fontWeight: 700, transition: "color 0.2s" }}
                  >
                    Create one →
                  </span>
                </span>
              </div>

              {/* Security badge */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                marginTop: 28, padding: "8px 16px",
                background: "rgba(124,92,252,0.04)", border: "1px solid rgba(124,92,252,0.09)",
                borderRadius: 8,
              }}>
                <span style={{ color: "#7c5cfc", fontSize: 12 }}>🔒</span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "#2a2440", letterSpacing: "0.1em" }}>
                  END-TO-END ENCRYPTED · SOC 2 COMPLIANT
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}