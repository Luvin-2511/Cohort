import { useState, useEffect, useRef } from "react";
import { gsap } from "https://cdn.skypack.dev/gsap";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { PerplexityLoader } from "../../shared/components/Loader";

/* ─── Neural Canvas (purple, matching login) ─────────────────────────────── */
function NeuralCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const N = 65;
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00042,
      vy: (Math.random() - 0.5) * 0.00042,
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
          if (d < 145) {
            ctx.beginPath(); ctx.moveTo(a.x * W, a.y * H); ctx.lineTo(b.x * W, b.y * H);
            ctx.strokeStyle = `rgba(124,92,252,${(1 - d / 145) * 0.22})`; ctx.lineWidth = 0.7; ctx.stroke();
          }
        }
      }
      nodes.forEach(n => {
        n.phase += 0.020;
        const glow = (Math.sin(n.phase) + 1) / 2;
        const mx = (n.x - mouse.x) * W, my = (n.y - mouse.y) * H;
        const md = Math.sqrt(mx * mx + my * my);
        const pull = md < 120 ? (1 - md / 120) * 0.0028 : 0;
        n.vx -= (n.x - mouse.x) * pull; n.vy -= (n.y - mouse.y) * pull;
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1; if (n.y < 0 || n.y > 1) n.vy *= -1;
        const g = ctx.createRadialGradient(n.x * W, n.y * H, 0, n.x * W, n.y * H, n.r * 5);
        g.addColorStop(0, `rgba(124,92,252,${0.82 * glow + 0.12})`);
        g.addColorStop(1, "rgba(124,92,252,0)");
        ctx.beginPath(); ctx.arc(n.x * W, n.y * H, n.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x * W, n.y * H, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(192,170,255,${0.55 + 0.4 * glow})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", onMove); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.48 }} />;
}

function GridOverlay() {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }}>
      <defs><pattern id="reg-grid" width="48" height="48" patternUnits="userSpaceOnUse">
        <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#7c5cfc" strokeWidth="0.5"/>
      </pattern></defs>
      <rect width="100%" height="100%" fill="url(#reg-grid)"/>
    </svg>
  );
}

function BrainLogo({ size = 1 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 * size }}>
      <svg width={38 * size} height={38 * size} viewBox="0 0 38 38">
        <polygon points="19,2 35,11 35,27 19,36 3,27 3,11" fill="none" stroke="#7c5cfc" strokeWidth="1.2"/>
        <polygon points="19,8 29,14 29,24 19,30 9,24 9,14" fill="rgba(124,92,252,0.08)" stroke="#7c5cfc" strokeWidth="0.7" strokeDasharray="2,2"/>
        <polygon points="19,13 24,16 24,22 19,25 14,22 14,16" fill="rgba(124,92,252,0.15)" stroke="#9273ff" strokeWidth="0.5"/>
        <circle cx="19" cy="19" r="3.5" fill="#7c5cfc"/>
        <circle cx="19" cy="19" r="5.5" fill="none" stroke="rgba(124,92,252,0.35)" strokeWidth="0.8"/>
        {[0,60,120,180,240,300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return <line key={i} x1={19 + 5.5 * Math.cos(rad)} y1={19 + 5.5 * Math.sin(rad)} x2={19 + 9.5 * Math.cos(rad)} y2={19 + 9.5 * Math.sin(rad)} stroke="#7c5cfc" strokeWidth="0.9" opacity="0.7"/>;
        })}
      </svg>
      <div>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 20 * size, fontWeight: 800, letterSpacing: "0.04em", color: "#f0eeff", lineHeight: 1 }}>
          brain<span style={{ color: "#7c5cfc" }}>EX</span>
        </div>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 8 * size, color: "#9273ff", letterSpacing: "0.2em", marginTop: 2 }}>
          INTELLIGENCE LAYER
        </div>
      </div>
    </div>
  );
}

/* ─── Smart Input with floating label ───────────────────────────────────── */
function SmartInput({ label, type = "text", value, onChange, hint, validate }) {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const lineRef = useRef(null);
  const valid = validate ? validate(value) : null;
  const showValid = touched && value && valid !== null;

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        scaleX: focused ? 1 : 0,
        background: showValid
          ? valid
            ? "linear-gradient(90deg,transparent,#22c55e,transparent)"
            : "linear-gradient(90deg,transparent,#ef4444,transparent)"
          : "linear-gradient(90deg,transparent,#7c5cfc,transparent)",
        duration: focused ? 0.35 : 0.25,
        ease: "power2.out",
      });
    });
    return () => ctx.revert();
  }, [focused, showValid, valid]);

  const borderColor = showValid
    ? valid ? "rgba(34,197,94,0.7)" : "rgba(239,68,68,0.7)"
    : focused ? "rgba(124,92,252,0.55)" : "rgba(124,92,252,0.12)";

  const boxShadow = focused
    ? showValid && !valid
      ? "0 0 0 3px rgba(239,68,68,0.08)"
      : "0 0 0 3px rgba(124,92,252,0.08), 0 0 20px rgba(124,92,252,0.07)"
    : "none";

  return (
    <div style={{ marginBottom: 18, position: "relative" }}>
      <label style={{ display: "block", fontFamily: "'Space Mono',monospace", fontSize: 9, fontWeight: 700,
        letterSpacing: "0.15em", color: focused ? "#7c5cfc" : "rgba(124,92,252,0.45)", marginBottom: 7,
        textTransform: "uppercase", transition: "color 0.2s" }}>
        {label}
        {hint && <span style={{ color: "#2a2440", fontWeight: 400, marginLeft: 8, textTransform: "none", letterSpacing: 0 }}>{hint}</span>}
      </label>
      <div style={{ position: "relative" }}>
        <input type={type} value={value} onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); setTouched(true); }}
          style={{ width: "100%", background: focused ? "rgba(124,92,252,0.04)" : "rgba(255,255,255,0.02)",
            border: `1.5px solid ${borderColor}`, borderRadius: 10,
            padding: "12px 42px 12px 16px", color: "#ede8ff",
            fontFamily: "'Space Mono',monospace", fontSize: 13, outline: "none",
            transition: "border-color 0.2s,background 0.2s,box-shadow 0.2s", boxShadow }}/>
        {showValid && <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: valid ? "#22c55e" : "#ef4444" }}>{valid ? "✓" : "✗"}</span>}
      </div>
      <div ref={lineRef} style={{ position: "absolute", bottom: 0, left: 10, right: 10, height: 1.5,
        background: "linear-gradient(90deg,transparent,#7c5cfc,transparent)",
        transformOrigin: "center", transform: "scaleX(0)", borderRadius: 2 }}/>
    </div>
  );
}

/* ─── Password Strength ──────────────────────────────────────────────────── */
function PasswordStrength({ value }) {
  const checks = [
    { label: "8+ characters", pass: value.length >= 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(value) },
    { label: "Number", pass: /[0-9]/.test(value) },
    { label: "Special character", pass: /[^a-zA-Z0-9]/.test(value) },
  ];
  const score = checks.filter(c => c.pass).length;
  const colors = ["#1f2937", "#ef4444", "#f97316", "#eab308", "#22c55e"];
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  if (!value) return null;
  return (
    <div style={{ marginBottom: 18, padding: "14px 16px", background: "rgba(124,92,252,0.04)",
      border: "1px solid rgba(124,92,252,0.12)", borderRadius: 10 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "rgba(124,92,252,0.45)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Password Strength</span>
        <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 12, fontWeight: 700, color: colors[score] }}>{labels[score]}</span>
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 2,
            background: i < score ? colors[score] : "rgba(255,255,255,0.06)", transition: "background 0.3s" }}/>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px" }}>
        {checks.map(c => (
          <span key={c.label} style={{ fontFamily: "'Space Mono',monospace", fontSize: 9,
            color: c.pass ? "#9273ff" : "rgba(124,92,252,0.28)", display: "flex", alignItems: "center", gap: 4, transition: "color 0.3s" }}>
            <span>{c.pass ? "✓" : "○"}</span>{c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Step Indicator ─────────────────────────────────────────────────────── */
function StepIndicator({ current, total }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 28 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: i < current ? 24 : 8, height: 8, borderRadius: 4,
            background: i < current ? "linear-gradient(90deg,#5b3fd4,#7c5cfc)"
              : i === current ? "rgba(124,92,252,0.3)" : "rgba(255,255,255,0.05)",
            border: i === current ? "1px solid rgba(124,92,252,0.45)" : "none",
            transition: "width 0.4s,background 0.3s" }}/>
          {i < total - 1 && <div style={{ width: 16, height: 1, background: i < current ? "rgba(124,92,252,0.45)" : "rgba(255,255,255,0.05)" }}/>}
        </div>
      ))}
      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "rgba(124,92,252,0.45)", letterSpacing: "0.1em", marginLeft: 4 }}>
        STEP {current + 1}/{total}
      </span>
    </div>
  );
}

/* ─── Checkbox ───────────────────────────────────────────────────────────── */
function Checkbox({ checked, onChange, children }) {
  const boxRef = useRef(null);
  const handle = () => {
    onChange(!checked);
    gsap.fromTo(boxRef.current, { scale: 0.8 }, { scale: 1, duration: 0.25, ease: "back.out(3)" });
  };
  return (
    <div onClick={handle} style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer", marginBottom: 18 }}>
      <div ref={boxRef} style={{ width: 18, height: 18, minWidth: 18, borderRadius: 5,
        border: `1.5px solid ${checked ? "#7c5cfc" : "rgba(124,92,252,0.22)"}`,
        background: checked ? "rgba(124,92,252,0.15)" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1,
        transition: "border-color 0.2s,background 0.2s" }}>
        {checked && <span style={{ color: "#9273ff", fontSize: 10 }}>✓</span>}
      </div>
      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#4b5569", lineHeight: 1.7 }}>{children}</span>
    </div>
  );
}

/* ─── Submit Button ──────────────────────────────────────────────────────── */
function SubmitBtn({ children, disabled, handleForm }) {
  const ref = useRef(null);
  const rippleRef = useRef(null);
  const handleClick = (e) => {
    if (disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    gsap.fromTo(rippleRef.current,
      { left: x, top: y, width: 0, height: 0, opacity: 0.35, x: 0, y: 0 },
      { width: 350, height: 350, x: -175, y: -175, opacity: 0, duration: 0.6, ease: "power2.out" });
    handleForm?.();
  };
  return (
    <button ref={ref} onClick={handleClick} disabled={disabled}
      onMouseEnter={() => !disabled && gsap.to(ref.current, { scale: 1.02, duration: 0.2 })}
      onMouseLeave={() => gsap.to(ref.current, { scale: 1, duration: 0.2 })}
      style={{ width: "100%", padding: "15px 0", position: "relative", overflow: "hidden",
        background: disabled ? "rgba(255,255,255,0.04)" : "linear-gradient(135deg,#5b3fd4 0%,#7c5cfc 45%,#9273ff 100%)",
        border: disabled ? "1px solid rgba(255,255,255,0.06)" : "none",
        borderRadius: 12, cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: "0.12em",
        color: disabled ? "#3d3a55" : "#fff",
        boxShadow: disabled ? "none" : "0 8px 32px rgba(124,92,252,0.5)",
        transition: "background 0.3s,box-shadow 0.3s" }}>
      <div ref={rippleRef} style={{ position: "absolute", borderRadius: "50%", background: "rgba(255,255,255,0.25)", pointerEvents: "none" }}/>
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </button>
  );
}

/* ─── GlitchText ─────────────────────────────────────────────────────────── */
function GlitchText({ text, style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    let timeout;
    let ctx = gsap.context(() => {});
    const glitch = () => {
      ctx.add(() => {
        gsap.to(ref.current, { x: -3, skewX: 3, opacity: 0.8, duration: 0.05, yoyo: true, repeat: 3, ease: "none",
          onComplete: () => gsap.set(ref.current, { x: 0, skewX: 0, opacity: 1 }) });
      });
      timeout = setTimeout(glitch, 3000 + Math.random() * 4000);
    };
    timeout = setTimeout(glitch, 2500);
    return () => { clearTimeout(timeout); ctx.revert(); };
  }, []);
  return <span ref={ref} style={style}>{text}</span>;
}

/* ─── ScanLine ───────────────────────────────────────────────────────────── */
function ScanLine() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", borderRadius: 24,
      background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.022) 2px,rgba(0,0,0,0.022) 4px)" }}/>
  );
}

/* ─── MAIN REGISTER PAGE ─────────────────────────────────────────────────── */
export default function RegisterPage({ onNavigateToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [updates, setUpdates] = useState(false);
  const [step, setStep] = useState(0);
  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();

  const handleForm = async () => {
    const response = await handleRegister({ email, username, password });
    if (response.success) navigate("/login");
  };

  const leftRef  = useRef(null);
  const rightRef = useRef(null);
  const cardRef  = useRef(null);
  const headRef  = useRef(null);
  const formRef  = useRef(null);
  const benefitsRef = useRef(null);

  const canSubmit = username && email && password.length >= 8 && confirm === password && agreed;
  const filledFields = [username, email, password, confirm].filter(Boolean).length;
  const progress = filledFields / 4;

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(leftRef.current,  { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 1 }, 0)
        .fromTo(rightRef.current, { opacity: 0, x: 60 },  { opacity: 1, x: 0, duration: 1 }, 0.1)
        .fromTo(cardRef.current,  { opacity: 0, y: 30, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.9 }, 0.25)
        .fromTo(headRef.current.children,  { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.6 }, 0.5)
        .fromTo(formRef.current.children,  { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.5 }, 0.7)
        .fromTo(benefitsRef.current.children, { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.09, duration: 0.6 }, 0.7);

      gsap.to(".reg-orb-1", { y: -28, x: 16, duration: 5.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".reg-orb-2", { y: 20, x: -12, duration: 4.5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.5 });
      gsap.to(".reg-orb-3", { y: -14, duration: 3.8, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.8 });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    setStep(Math.min(Math.floor(progress * 3), 2));
  }, [progress]);

  if (loading) return <PerplexityLoader/>;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0812; }
        input::placeholder { color: transparent; }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 100px #0d0b1c inset !important; -webkit-text-fill-color: #ede8ff !important; }
        ::-webkit-scrollbar { width: 0; }
        .link-hover { transition: color 0.2s; } .link-hover:hover { color: #7c5cfc !important; }
        @keyframes pulse-ring { 0%,100%{transform:scale(0.9);opacity:0.5} 50%{transform:scale(1.1);opacity:1} }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh", background: "#0a0812", overflow: "hidden", position: "relative" }}>

        {/* Ambient orbs */}
        <div className="reg-orb-1" style={{ position:"fixed",top:"8%",left:"8%",width:550,height:550,borderRadius:"50%",background:"radial-gradient(circle,rgba(124,92,252,0.12),transparent 70%)",filter:"blur(50px)",pointerEvents:"none",zIndex:0 }}/>
        <div className="reg-orb-2" style={{ position:"fixed",bottom:"5%",right:"4%",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(91,63,212,0.08),transparent 70%)",filter:"blur(60px)",pointerEvents:"none",zIndex:0 }}/>
        <div className="reg-orb-3" style={{ position:"fixed",top:"55%",left:"42%",width:320,height:320,borderRadius:"50%",background:"radial-gradient(circle,rgba(146,115,255,0.07),transparent 70%)",filter:"blur(45px)",pointerEvents:"none",zIndex:0 }}/>

        {/* ══ LEFT PANEL ══ */}
        <div ref={leftRef} style={{ flex:1, position:"relative", display:"flex", flexDirection:"column",
          justifyContent:"space-between", padding:"52px 56px", overflow:"hidden",
          borderRight:"1px solid rgba(124,92,252,0.09)" }}>
          <NeuralCanvas/>
          <GridOverlay/>
          {/* Right edge accent */}
          <div style={{ position:"absolute",top:0,right:0,width:1,height:"100%",
            background:"linear-gradient(180deg,transparent,rgba(124,92,252,0.38) 40%,rgba(124,92,252,0.38) 60%,transparent)",zIndex:2 }}/>

          {/* Logo */}
          <div style={{ position:"relative",zIndex:3 }}><BrainLogo/></div>

          {/* Center copy */}
          <div style={{ position:"relative",zIndex:3,maxWidth:420 }}>
            <div style={{ fontFamily:"'Space Mono',monospace",fontSize:11,color:"#7c5cfc",letterSpacing:"0.2em",marginBottom:16 }}>
              // JOIN THE NETWORK
            </div>
            <h1 style={{ fontFamily:"'Syne',sans-serif",fontSize:52,fontWeight:800,lineHeight:1.05,color:"#f0eeff",marginBottom:20 }}>
              Your brain,<br/>
              <span style={{ background:"linear-gradient(90deg,#7c5cfc,#9273ff,#c4b5fd)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>
                amplified.
              </span>
            </h1>
            <p style={{ fontFamily:"'Space Mono',monospace",fontSize:13,color:"#3d3a55",lineHeight:1.8,marginBottom:40 }}>
              Join 2.4M+ researchers, students, and professionals who use brainEX to search smarter and think deeper.
            </p>
            {/* Stats */}
            <div style={{ display:"flex",gap:36,marginBottom:44 }}>
              {[["2.4B+","Sources indexed"],["<200ms","Response time"],["99.9%","Uptime SLA"]].map(([val,lbl])=>(
                <div key={lbl}>
                  <div style={{ fontFamily:"'Syne',sans-serif",fontSize:26,fontWeight:800,color:"#7c5cfc",lineHeight:1 }}>{val}</div>
                  <div style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"#3d3a55",marginTop:4,letterSpacing:"0.08em" }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div ref={benefitsRef} style={{ position:"relative",zIndex:3,display:"flex",flexDirection:"column",gap:12 }}>
            {[["∞","Unlimited AI-powered queries"],["⚡","Real-time web synthesis"],["◈","Personalized knowledge graph"],["🔒","Privacy-first architecture"]].map(([icon,text])=>(
              <div key={text} style={{ display:"flex",alignItems:"center",gap:14 }}>
                <div style={{ width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",
                  background:"rgba(124,92,252,0.07)",border:"1px solid rgba(124,92,252,0.18)",borderRadius:8,
                  color:"#9273ff",fontSize:14,flexShrink:0 }}>{icon}</div>
                <span style={{ fontFamily:"'Space Mono',monospace",fontSize:12,color:"#4b5569" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══ RIGHT FORM ══ */}
        <div ref={rightRef} style={{ width:520,minWidth:520,display:"flex",alignItems:"center",justifyContent:"center",
          padding:"36px 52px",position:"relative",zIndex:2,overflowY:"auto" }}>
          <div ref={cardRef} style={{ width:"100%",
            background:"rgba(12,9,24,0.85)", backdropFilter:"blur(40px)", borderRadius:24,
            border:"1px solid rgba(124,92,252,0.13)", padding:"44px 42px",
            position:"relative",overflow:"hidden",
            boxShadow:"0 32px 80px rgba(0,0,0,0.5),0 0 0 1px rgba(124,92,252,0.06),inset 0 1px 0 rgba(124,92,252,0.09)" }}>
            <ScanLine/>

            {/* Corner accents */}
            {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h])=>(
              <div key={v+h} style={{ position:"absolute",[v]:0,[h]:0,width:28,height:28,
                borderTop:    v==="top"    ?"1.5px solid rgba(124,92,252,0.45)":"none",
                borderBottom: v==="bottom" ?"1.5px solid rgba(124,92,252,0.45)":"none",
                borderLeft:   h==="left"   ?"1.5px solid rgba(124,92,252,0.45)":"none",
                borderRight:  h==="right"  ?"1.5px solid rgba(124,92,252,0.45)":"none" }}/>
            ))}

            {/* Top glow */}
            <div style={{ position:"absolute",top:-1,left:"15%",right:"15%",height:1,
              background:"linear-gradient(90deg,transparent,#7c5cfc,transparent)" }}/>

            {/* Progress bar */}
            <div style={{ position:"absolute",top:0,left:0,height:3,width:`${progress*100}%`,
              background:"linear-gradient(90deg,#5b3fd4,#9273ff)", borderRadius:"24px 0 0 0",
              transition:"width 0.4s ease",boxShadow:"0 0 14px rgba(124,92,252,0.55)" }}/>

            {/* Header */}
            <div ref={headRef} style={{ marginBottom:28 }}>
              <StepIndicator current={step} total={3}/>
              <div style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"#7c5cfc",letterSpacing:"0.18em",marginBottom:10 }}>
                CREATE ACCOUNT
              </div>
              <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:30,fontWeight:800,color:"#ede8ff",lineHeight:1.1,marginBottom:6 }}>
                Start exploring with{" "}<GlitchText text="brainEX" style={{color:"#7c5cfc"}}/>
              </h2>
              <p style={{ fontFamily:"'Space Mono',monospace",fontSize:11,color:"rgba(124,92,252,0.4)",lineHeight:1.6 }}>
                Set up your account in under 60 seconds
              </p>
            </div>

            {/* Form */}
            <div ref={formRef}>
              <SmartInput label="Username" hint="@handle" value={username}
                onChange={e=>setUsername(e.target.value.replace(/[^a-z0-9_]/g,""))}
                validate={v=>v.length>=3&&/^[a-z0-9_]+$/.test(v)}/>
              <SmartInput label="Email Address" type="email" value={email} onChange={e=>setEmail(e.target.value)}
                validate={v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)}/>
              <SmartInput label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}
                validate={v=>v.length>=8&&/[A-Z]/.test(v)&&/[0-9]/.test(v)}/>
              <PasswordStrength value={password}/>
              <SmartInput label="Confirm Password" type="password" value={confirm} onChange={e=>setConfirm(e.target.value)}
                validate={v=>v===password&&v.length>0}/>

              <Checkbox checked={agreed} onChange={setAgreed}>
                I agree to the{" "}
                <span className="link-hover" style={{color:"#7c5cfc",cursor:"pointer"}}>Terms of Service</span>{" "}and{" "}
                <span className="link-hover" style={{color:"#7c5cfc",cursor:"pointer"}}>Privacy Policy</span>
              </Checkbox>
              <Checkbox checked={updates} onChange={setUpdates}>
                <span style={{color:"rgba(124,92,252,0.35)"}}>Send me product updates and research insights (optional)</span>
              </Checkbox>

              <SubmitBtn handleForm={handleForm} disabled={!canSubmit}>
                {canSubmit?"LAUNCH MY ACCOUNT →":"COMPLETE ALL FIELDS"}
              </SubmitBtn>

              {/* Divider */}
              <div style={{ display:"flex",alignItems:"center",gap:12,margin:"20px 0" }}>
                <div style={{ flex:1,height:1,background:"linear-gradient(90deg,transparent,rgba(124,92,252,0.18))" }}/>
                <span style={{ fontFamily:"'Space Mono',monospace",fontSize:9,color:"rgba(124,92,252,0.3)",letterSpacing:"0.12em" }}>OR SIGN UP WITH</span>
                <div style={{ flex:1,height:1,background:"linear-gradient(90deg,rgba(124,92,252,0.18),transparent)" }}/>
              </div>

              {/* Socials */}
              <div style={{ display:"flex",gap:10,marginBottom:20 }}>
                {[["G","Google"],["⌘","Apple"],["𝕏","Twitter"]].map(([icon,label])=>(
                  <button key={label} style={{ flex:1,padding:"10px 0",display:"flex",alignItems:"center",justifyContent:"center",gap:6,
                    background:"rgba(255,255,255,0.02)",border:"1px solid rgba(124,92,252,0.15)",borderRadius:10,cursor:"pointer",
                    color:"rgba(124,92,252,0.45)",fontFamily:"'Space Mono',monospace",fontSize:10,transition:"all 0.2s" }}
                    onMouseOver={e=>{ e.currentTarget.style.borderColor="rgba(124,92,252,0.5)"; e.currentTarget.style.color="#c4b5fd"; }}
                    onMouseOut={e=>{ e.currentTarget.style.borderColor="rgba(124,92,252,0.15)"; e.currentTarget.style.color="rgba(124,92,252,0.45)"; }}>
                    <span style={{fontSize:14}}>{icon}</span>{label}
                  </button>
                ))}
              </div>

              {/* Login link */}
              <div style={{textAlign:"center"}}>
                <span style={{ fontFamily:"'Space Mono',monospace",fontSize:12,color:"rgba(124,92,252,0.35)" }}>
                  Already have an account?{" "}
                  <span onClick={()=>navigate("/login")} className="link-hover"
                    style={{ color:"#7c5cfc",cursor:"pointer",fontWeight:700,transition:"color 0.2s" }}>Sign in →</span>
                </span>
              </div>

              {/* Security badge */}
              <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginTop:24,
                padding:"8px 16px",background:"rgba(124,92,252,0.04)",border:"1px solid rgba(124,92,252,0.09)",borderRadius:8 }}>
                <span style={{color:"#7c5cfc",fontSize:12}}>🔒</span>
                <span style={{ fontFamily:"'Space Mono',monospace",fontSize:9,color:"#2a2440",letterSpacing:"0.1em" }}>
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