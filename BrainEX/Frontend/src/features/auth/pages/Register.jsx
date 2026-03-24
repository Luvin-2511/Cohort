import { useState, useEffect, useRef } from "react";
import { gsap } from "https://cdn.skypack.dev/gsap";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {PerplexityLoader} from "../../shared/components/Loader";

function HelixCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf,
      t = 0;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const W = canvas.width,
        H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      t += 0.012;

      const STRANDS = 3;
      const POINTS = 28;
      for (let s = 0; s < STRANDS; s++) {
        const offset = (s / STRANDS) * Math.PI * 2;
        const baseX = W * (0.2 + s * 0.3);

        for (let i = 0; i < POINTS - 1; i++) {
          const p1 = i / POINTS,
            p2 = (i + 1) / POINTS;
          const y1 = p1 * H,
            y2 = p2 * H;
          const x1 = baseX + Math.sin(p1 * Math.PI * 4 + t + offset) * 50;
          const x2 = baseX + Math.sin(p2 * Math.PI * 4 + t + offset) * 50;
          const bright = (Math.sin(p1 * Math.PI * 4 + t + offset) + 1) / 2;
          const alpha = 0.08 + bright * 0.25;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(20,184,166,${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          if (i % 4 === 0) {
            const cx = baseX + Math.sin(p1 * Math.PI * 4 + t + offset) * 50;
            const cy = y1;
            const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 5);
            g.addColorStop(0, `rgba(45,212,191,${0.6 * bright + 0.1})`);
            g.addColorStop(1, "rgba(45,212,191,0)");
            ctx.beginPath();
            ctx.arc(cx, cy, 5, 0, Math.PI * 2);
            ctx.fillStyle = g;
            ctx.fill();
          }
        }

        if (s < STRANDS - 1) {
          for (let i = 0; i < POINTS; i += 5) {
            const p = i / POINTS,
              y = p * H;
            const x1 = baseX + Math.sin(p * Math.PI * 4 + t + offset) * 50;
            const nextOffset = ((s + 1) / STRANDS) * Math.PI * 2;
            const nextBase = W * (0.2 + (s + 1) * 0.3);
            const x2 =
              nextBase + Math.sin(p * Math.PI * 4 + t + nextOffset) * 50;
            ctx.beginPath();
            ctx.moveTo(x1, y);
            ctx.lineTo(x2, y);
            ctx.strokeStyle = "rgba(20,184,166,0.08)";
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(t * 0.3 + i * 0.7) * 0.4 + 0.5) * W;
        const y = (Math.cos(t * 0.2 + i * 1.1) * 0.4 + 0.5) * H;
        const r = Math.sin(t + i) * 1 + 1.5;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(103,232,249,${0.1 + Math.abs(Math.sin(t + i)) * 0.15})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.7,
      }}
    />
  );
}

function BrainLogo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg width="38" height="38" viewBox="0 0 38 38">
        <polygon
          points="19,2 35,11 35,27 19,36 3,27 3,11"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="1.2"
        />
        <polygon
          points="19,8 29,14 29,24 19,30 9,24 9,14"
          fill="rgba(20,184,166,0.08)"
          stroke="#14b8a6"
          strokeWidth="0.7"
          strokeDasharray="2,2"
        />
        <polygon
          points="19,13 24,16 24,22 19,25 14,22 14,16"
          fill="rgba(20,184,166,0.15)"
          stroke="#14b8a6"
          strokeWidth="0.5"
        />
        <circle cx="19" cy="19" r="3.5" fill="#14b8a6" />
        <circle
          cx="19"
          cy="19"
          r="5.5"
          fill="none"
          stroke="rgba(20,184,166,0.3)"
          strokeWidth="0.8"
        />
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 19 + 5.5 * Math.cos(rad),
            y1 = 19 + 5.5 * Math.sin(rad);
          const x2 = 19 + 9.5 * Math.cos(rad),
            y2 = 19 + 9.5 * Math.sin(rad);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#14b8a6"
              strokeWidth="0.9"
              opacity="0.7"
            />
          );
        })}
      </svg>
      <div>
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: "0.04em",
            color: "#f0fdf4",
            lineHeight: 1,
          }}
        >
          brain<span style={{ color: "#14b8a6" }}>EX</span>
        </div>
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 8,
            color: "#2dd4bf",
            letterSpacing: "0.2em",
            marginTop: 2,
          }}
        >
          INTELLIGENCE LAYER
        </div>
      </div>
    </div>
  );
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
        ? valid
          ? "linear-gradient(90deg, transparent, #22c55e, transparent)"
          : "linear-gradient(90deg, transparent, #ef4444, transparent)"
        : "linear-gradient(90deg, transparent, #14b8a6, transparent)",
      duration: focused ? 0.35 : 0.25,
      ease: "power2.out",
    });
  }, [focused, showValid, valid]);

  const borderColor = showValid
    ? valid
      ? "rgba(34,197,94,0.7)"
      : "rgba(239,68,68,0.7)"
    : focused
      ? "rgba(20,184,166,0.8)"
      : "rgba(20,184,166,0.25)";

  const boxShadow = focused
    ? showValid && !valid
      ? "0 0 0 3px rgba(239,68,68,0.08)"
      : "0 0 0 3px rgba(20,184,166,0.08), 0 0 16px rgba(20,184,166,0.08)"
    : "none";

  return (
    <div style={{ marginBottom: 18, position: "relative" }}>
      <label
        style={{
          display: "block",
          fontFamily: "'Space Mono', monospace",
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.15em",
          color: focused ? "#14b8a6" : "rgba(20,184,166,0.5)",
          marginBottom: 7,
          textTransform: "uppercase",
          transition: "color 0.2s",
        }}
      >
        {label}
        {hint && (
          <span
            style={{
              color: "#374151",
              fontWeight: 400,
              marginLeft: 8,
              textTransform: "none",
              letterSpacing: 0,
            }}
          >
            {hint}
          </span>
        )}
      </label>
      <div style={{ position: "relative" }}>
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            setTouched(true);
          }}
          style={{
            width: "100%",
            background: focused
              ? "rgba(20,184,166,0.04)"
              : "rgba(255,255,255,0.02)",
            border: `1.5px solid ${borderColor}`,
            borderRadius: 10,
            padding: "12px 42px 12px 16px",
            color: "#ecfdf5",
            fontFamily: "'Space Mono', monospace",
            fontSize: 13,
            outline: "none",
            transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
            boxShadow,
          }}
        />
        {showValid && (
          <span
            style={{
              position: "absolute",
              right: 14,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 14,
              color: valid ? "#22c55e" : "#ef4444",
            }}
          >
            {valid ? "✓" : "✗"}
          </span>
        )}
      </div>
      <div
        ref={lineRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: 10,
          right: 10,
          height: 1.5,
          background:
            "linear-gradient(90deg, transparent, #14b8a6, transparent)",
          transformOrigin: "center",
          transform: "scaleX(0)",
          borderRadius: 2,
        }}
      />
    </div>
  );
}

function PasswordStrength({ value }) {
  const checks = [
    { label: "8+ characters", pass: value.length >= 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(value) },
    { label: "Number", pass: /[0-9]/.test(value) },
    { label: "Special character", pass: /[^a-zA-Z0-9]/.test(value) },
  ];
  const score = checks.filter((c) => c.pass).length;
  const colors = ["#1f2937", "#ef4444", "#f97316", "#eab308", "#22c55e"];
  const labels = ["", "Weak", "Fair", "Good", "Strong"];

  if (!value) return null;

  return (
    <div
      style={{
        marginBottom: 18,
        padding: "14px 16px",
        background: "rgba(20,184,166,0.04)",
        border: "1px solid rgba(20,184,166,0.12)",
        borderRadius: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 9,
            color: "rgba(20,184,166,0.5)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Password Strength
        </span>
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 12,
            fontWeight: 700,
            color: colors[score],
          }}
        >
          {labels[score]}
        </span>
      </div>
      <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 3,
              borderRadius: 2,
              background: i < score ? colors[score] : "rgba(255,255,255,0.06)",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px" }}>
        {checks.map((c) => (
          <span
            key={c.label}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              color: c.pass ? "#2dd4bf" : "rgba(20,184,166,0.3)",
              display: "flex",
              alignItems: "center",
              gap: 4,
              transition: "color 0.3s",
            }}
          >
            <span>{c.pass ? "✓" : "○"}</span>
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function StepIndicator({ current, total }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 28,
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: i < current ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background:
                i < current
                  ? "linear-gradient(90deg, #14b8a6, #2dd4bf)"
                  : i === current
                    ? "rgba(20,184,166,0.3)"
                    : "rgba(255,255,255,0.05)",
              border: i === current ? "1px solid rgba(20,184,166,0.4)" : "none",
              transition: "width 0.4s, background 0.3s",
            }}
          />
          {i < total - 1 && (
            <div
              style={{
                width: 16,
                height: 1,
                background:
                  i < current
                    ? "rgba(20,184,166,0.4)"
                    : "rgba(255,255,255,0.05)",
              }}
            />
          )}
        </div>
      ))}
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 9,
          color: "rgba(20,184,166,0.45)",
          letterSpacing: "0.1em",
          marginLeft: 4,
        }}
      >
        STEP {current + 1}/{total}
      </span>
    </div>
  );
}

function Checkbox({ checked, onChange, children }) {
  const boxRef = useRef(null);
  const handle = () => {
    onChange(!checked);
    gsap.fromTo(
      boxRef.current,
      { scale: 0.85 },
      { scale: 1, duration: 0.2, ease: "back.out(3)" },
    );
  };
  return (
    <div
      onClick={handle}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        cursor: "pointer",
        marginBottom: 18,
      }}
    >
      <div
        ref={boxRef}
        style={{
          width: 18,
          height: 18,
          minWidth: 18,
          borderRadius: 5,
          border: `1.5px solid ${checked ? "#14b8a6" : "rgba(20,184,166,0.25)"}`,
          background: checked ? "rgba(20,184,166,0.15)" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 1,
          transition: "border-color 0.2s, background 0.2s",
        }}
      >
        {checked && <span style={{ color: "#14b8a6", fontSize: 10 }}>✓</span>}
      </div>
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          color: "#4b5563",
          lineHeight: 1.7,
        }}
      >
        {children}
      </span>
    </div>
  );
}

function SubmitBtn({ children, disabled, handleForm }) {
  const ref = useRef(null);
  return (
    <button
      onClick={handleForm}
      ref={ref}
      disabled={disabled}
      onMouseEnter={() =>
        !disabled && gsap.to(ref.current, { scale: 1.02, duration: 0.2 })
      }
      onMouseLeave={() => gsap.to(ref.current, { scale: 1, duration: 0.2 })}
      style={{
        width: "100%",
        padding: "15px 0",
        position: "relative",
        overflow: "hidden",
        background: disabled
          ? "rgba(255,255,255,0.04)"
          : "linear-gradient(135deg, #0d9488 0%, #14b8a6 45%, #2dd4bf 100%)",
        border: disabled ? "1px solid rgba(255,255,255,0.06)" : "none",
        borderRadius: 12,
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "'Syne', sans-serif",
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: "0.12em",
        color: disabled ? "#1f2937" : "#021a16",
        boxShadow: disabled ? "none" : "0 8px 32px rgba(20,184,166,0.4)",
        transition: "background 0.3s, box-shadow 0.3s",
      }}
    >
      {children}
    </button>
  );
}

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

  const payload = {
    email,
    username,
    password,
  };

  const handleForm = async () => {
    const response = await handleRegister(payload);
    if (response.success) {
      navigate("/login");
    }
  };

  const rightRef = useRef(null);
  const cardRef = useRef(null);
  const headRef = useRef(null);
  const formRef = useRef(null);

  const canSubmit =
    username && email && password.length >= 8 && confirm === password && agreed;
  const filledFields = [username, email, password, confirm].filter(
    Boolean,
  ).length;
  const progress = filledFields / 4;

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      rightRef.current,
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: 1 },
      0,
    )
      .fromTo(
        cardRef.current,
        { opacity: 0, y: 30, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9 },
        0.2,
      )
      .fromTo(
        headRef.current.children,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.6 },
        0.4,
      )
      .fromTo(
        formRef.current.children,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.5 },
        0.6,
      );

    gsap.to(".reg-orb-1", {
      y: -25,
      x: 15,
      duration: 5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    gsap.to(".reg-orb-2", {
      y: 18,
      duration: 4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1.5,
    });
  }, []);

  useEffect(() => {
    setStep(Math.min(Math.floor(progress * 3), 2));
  }, [progress]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #020c09; }
        input::placeholder { color: rgba(20,184,166,0.2); font-family: 'Space Mono', monospace; }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 100px #051a14 inset !important; -webkit-text-fill-color: #ecfdf5 !important; }
        ::-webkit-scrollbar { width: 0; }
        .link-hover { transition: color 0.2s; }
        .link-hover:hover { color: #14b8a6 !important; }
      `}</style>

      {loading ? (
        <PerplexityLoader />
      ) : (
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            background: "#020c09",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Ambient */}
          <div
            className="reg-orb-1"
            style={{
              position: "fixed",
              top: "5%",
              right: "5%",
              width: 600,
              height: 600,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(20,184,166,0.10) 0%, transparent 70%)",
              filter: "blur(50px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <div
            className="reg-orb-2"
            style={{
              position: "fixed",
              bottom: "0%",
              left: "15%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)",
              filter: "blur(60px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* ══ LEFT HELIX ══ */}
          <div
            style={{
              width: 420,
              minWidth: 420,
              position: "relative",
              overflow: "hidden",
              borderRight: "1px solid rgba(20,184,166,0.07)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "52px 44px",
            }}
          >
            <HelixCanvas />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(2,12,9,0.6) 0%, rgba(2,12,9,0.2) 100%)",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />

            {/* Logo */}
            <div style={{ position: "relative", zIndex: 2 }}>
              <BrainLogo />
            </div>

            {/* Center copy */}
            <div style={{ position: "relative", zIndex: 2 }}>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10,
                  color: "#14b8a6",
                  letterSpacing: "0.18em",
                  marginBottom: 14,
                }}
              >
                // JOIN THE NETWORK
              </div>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 42,
                  fontWeight: 800,
                  color: "#f0fdf4",
                  lineHeight: 1.1,
                  marginBottom: 20,
                }}
              >
                Your brain,
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #14b8a6, #67e8f9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  amplified.
                </span>
              </h2>
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 12,
                  color: "#4b5563",
                  lineHeight: 1.9,
                  marginBottom: 36,
                }}
              >
                Join 2.4M+ researchers, students, and professionals who use
                brainEX to search smarter and think deeper.
              </p>

              {/* Benefits */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                {[
                  ["∞", "Unlimited AI-powered queries"],
                  ["⚡", "Real-time web synthesis"],
                  ["◈", "Personalized knowledge graph"],
                  ["🔒", "Privacy-first architecture"],
                ].map(([icon, text]) => (
                  <div
                    key={text}
                    style={{ display: "flex", alignItems: "center", gap: 14 }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(20,184,166,0.07)",
                        border: "1px solid rgba(20,184,166,0.15)",
                        borderRadius: 8,
                        color: "#14b8a6",
                        fontSize: 14,
                        flexShrink: 0,
                      }}
                    >
                      {icon}
                    </div>
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 12,
                        color: "#4b5563",
                      }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom spacer — testimonial removed */}
            <div style={{ position: "relative", zIndex: 2, height: 28 }} />
          </div>

          {/* ══ RIGHT FORM ══ */}
          <div
            ref={rightRef}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px 52px",
              position: "relative",
              zIndex: 2,
              overflowY: "auto",
            }}
          >
            <div
              ref={cardRef}
              style={{
                width: "100%",
                maxWidth: 520,
                background: "rgba(5,20,15,0.82)",
                backdropFilter: "blur(40px)",
                borderRadius: 24,
                border: "1px solid rgba(20,184,166,0.12)",
                padding: "44px 44px",
                position: "relative",
                overflow: "hidden",
                boxShadow:
                  "0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(20,184,166,0.07)",
              }}
            >
              {/* Corner accents */}
              {[
                ["top", "left"],
                ["top", "right"],
                ["bottom", "left"],
                ["bottom", "right"],
              ].map(([v, h]) => (
                <div
                  key={v + h}
                  style={{
                    position: "absolute",
                    [v]: 0,
                    [h]: 0,
                    width: 28,
                    height: 28,
                    borderTop:
                      v === "top" ? "1.5px solid rgba(20,184,166,0.4)" : "none",
                    borderBottom:
                      v === "bottom"
                        ? "1.5px solid rgba(20,184,166,0.4)"
                        : "none",
                    borderLeft:
                      h === "left"
                        ? "1.5px solid rgba(20,184,166,0.4)"
                        : "none",
                    borderRight:
                      h === "right"
                        ? "1.5px solid rgba(20,184,166,0.4)"
                        : "none",
                  }}
                />
              ))}

              {/* Top glow line */}
              <div
                style={{
                  position: "absolute",
                  top: -1,
                  left: "20%",
                  right: "20%",
                  height: 1,
                  background:
                    "linear-gradient(90deg, transparent, #14b8a6, transparent)",
                }}
              />

              {/* Progress bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: 3,
                  width: `${progress * 100}%`,
                  background: "linear-gradient(90deg, #0d9488, #2dd4bf)",
                  borderRadius: "24px 0 0 0",
                  transition: "width 0.4s ease",
                  boxShadow: "0 0 12px rgba(20,184,166,0.5)",
                }}
              />

              {/* Scanlines */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  borderRadius: 24,
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)",
                }}
              />

              {/* Header */}
              <div ref={headRef} style={{ marginBottom: 28 }}>
                <StepIndicator current={step} total={3} />
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 10,
                    color: "#14b8a6",
                    letterSpacing: "0.18em",
                    marginBottom: 8,
                  }}
                >
                  CREATE ACCOUNT
                </div>
                <h2
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 30,
                    fontWeight: 800,
                    color: "#ecfdf5",
                    lineHeight: 1.1,
                    marginBottom: 6,
                  }}
                >
                  Start exploring for free
                </h2>
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 11,
                    color: "rgba(20,184,166,0.4)",
                    lineHeight: 1.6,
                  }}
                >
                  Set up your brainEX account in under 60 seconds
                </p>
              </div>

              {/* Form */}
              <div ref={formRef}>
                <SmartInput
                  label="Username"
                  hint="@handle"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value.replace(/[^a-z0-9_]/g, ""))
                  }
                  validate={(v) => v.length >= 3 && /^[a-z0-9_]+$/.test(v)}
                />

                <SmartInput
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  validate={(v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)}
                />

                <SmartInput
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  validate={(v) =>
                    v.length >= 8 && /[A-Z]/.test(v) && /[0-9]/.test(v)
                  }
                />

                <PasswordStrength value={password} />

                <SmartInput
                  label="Confirm Password"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  validate={(v) => v === password && v.length > 0}
                />

                <Checkbox checked={agreed} onChange={setAgreed}>
                  I agree to the{" "}
                  <span
                    className="link-hover"
                    style={{ color: "#14b8a6", cursor: "pointer" }}
                  >
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span
                    className="link-hover"
                    style={{ color: "#14b8a6", cursor: "pointer" }}
                  >
                    Privacy Policy
                  </span>
                </Checkbox>

                <Checkbox checked={updates} onChange={setUpdates}>
                  <span style={{ color: "rgba(20,184,166,0.35)" }}>
                    Send me product updates and research insights (optional)
                  </span>
                </Checkbox>

                <SubmitBtn handleForm={handleForm} disabled={!canSubmit}>
                  {canSubmit ? "LAUNCH MY ACCOUNT →" : "COMPLETE ALL FIELDS"}
                </SubmitBtn>

                {/* Divider */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    margin: "20px 0",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      height: 1,
                      background:
                        "linear-gradient(90deg, transparent, rgba(20,184,166,0.12))",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 9,
                      color: "rgba(20,184,166,0.3)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    OR SIGN UP WITH
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: 1,
                      background:
                        "linear-gradient(90deg, rgba(20,184,166,0.12), transparent)",
                    }}
                  />
                </div>

                {/* Socials */}
                <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                  {[
                    ["G", "Google"],
                    ["⌘", "Apple"],
                    ["𝕏", "Twitter"],
                  ].map(([icon, label]) => (
                    <button
                      key={label}
                      style={{
                        flex: 1,
                        padding: "10px 0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(20,184,166,0.2)",
                        borderRadius: 10,
                        cursor: "pointer",
                        color: "rgba(20,184,166,0.5)",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 10,
                        transition: "border-color 0.2s, color 0.2s",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(20,184,166,0.55)";
                        e.currentTarget.style.color = "#d1fae5";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(20,184,166,0.2)";
                        e.currentTarget.style.color = "rgba(20,184,166,0.5)";
                      }}
                    >
                      <span style={{ fontSize: 14 }}>{icon}</span>
                      {label}
                    </button>
                  ))}
                </div>

                {/* Login link */}
                <div style={{ textAlign: "center" }}>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 12,
                      color: "rgba(20,184,166,0.35)",
                    }}
                  >
                    Already have an account?{" "}
                    <span
                      onClick={()=>{
                        navigate('/login')
                      }}
                      className="link-hover"
                      style={{
                        color: "#14b8a6",
                        cursor: "pointer",
                        fontWeight: 700,
                        transition: "color 0.2s",
                      }}
                    >
                      Sign in →
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
