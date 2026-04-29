import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "../styles/Login.css";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import ShoeModel from "../components/ShoeModel";
import { useNavigate } from "react-router-dom";

// ─── Shoe SVG (inline) ────────────────────────────────────────────────────────
function ShoeSVG() {
  return (
    <svg viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sole */}
      <ellipse
        cx="300"
        cy="260"
        rx="240"
        ry="28"
        fill="#0d0d1a"
        opacity="0.6"
      />
      {/* Main body */}
      <path
        d="M60 220 C60 200 80 170 130 155 L200 140 L300 120 L420 110 C470 108 520 125 540 155 C555 178 545 205 520 215 L100 230 C78 232 60 228 60 220Z"
        fill="url(#shoeBody)"
      />
      {/* Midsole */}
      <path
        d="M65 222 C65 215 85 210 110 210 L520 210 C540 210 548 218 545 225 C542 232 520 238 490 238 L100 240 C75 240 65 230 65 222Z"
        fill="url(#midSole)"
      />
      {/* Upper detail swoosh */}
      <path
        d="M180 145 C220 135 310 128 390 125 C430 124 470 130 490 145"
        stroke="#c8ff00"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Laces area */}
      <rect
        x="210"
        y="130"
        width="160"
        height="60"
        rx="6"
        fill="url(#lacesArea)"
        opacity="0.5"
      />
      {/* Lace lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1={225 + i * 28}
          y1="135"
          x2={225 + i * 28}
          y2="185"
          stroke="#c8ff00"
          strokeWidth="1.5"
          opacity="0.4"
        />
      ))}
      {/* Toe box highlight */}
      <path
        d="M60 220 C60 200 78 175 115 162 L155 155 C130 168 108 190 108 215Z"
        fill="url(#toeHighlight)"
        opacity="0.4"
      />
      {/* Heel tab */}
      <path
        d="M490 150 C510 148 535 158 540 175 L535 210 L500 208 L490 150Z"
        fill="url(#heel)"
        opacity="0.85"
      />
      {/* Accent stripe */}
      <path
        d="M160 215 C250 200 380 195 500 205"
        stroke="#c8ff00"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />

      <defs>
        <linearGradient
          id="shoeBody"
          x1="60"
          y1="110"
          x2="540"
          y2="240"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1a1a3e" />
          <stop offset="50%" stopColor="#0f0f2e" />
          <stop offset="100%" stopColor="#070714" />
        </linearGradient>
        <linearGradient
          id="midSole"
          x1="65"
          y1="210"
          x2="548"
          y2="240"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#c8ff00" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7aff00" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient
          id="lacesArea"
          x1="210"
          y1="130"
          x2="370"
          y2="190"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#c8ff00" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#c8ff00" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient
          id="toeHighlight"
          x1="60"
          y1="155"
          x2="155"
          y2="220"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#c8ff00" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#c8ff00" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="heel"
          x1="490"
          y1="148"
          x2="540"
          y2="210"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1e1e50" />
          <stop offset="100%" stopColor="#0a0a20" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── Google Icon ──────────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="currentColor"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="currentColor"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="currentColor"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

// ─── Particle component ───────────────────────────────────────────────────────
function Particles() {
  return (
    <div className="particles" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, i) => (
        <span key={i} className={`particle particle-${i + 1}`} />
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  // Left panel refs
  const brandRef = useRef(null);
  const tagLine1Ref = useRef(null);
  const tagLine2Ref = useRef(null);
  const tagSubRef = useRef(null);
  const shoeRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);
  const logoIconRef = useRef(null);
  const scanlineRef = useRef(null);
  const gridRef = useRef(null);

  // Right panel refs
  const pillRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const optionsRef = useRef(null);
  const submitRef = useRef(null);
  const dividerRef = useRef(null);
  const googleRef = useRef(null);
  const signupRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Scanline sweep ───────────────────────────────────────────
      gsap.fromTo(
        scanlineRef.current,
        { top: "-4px", opacity: 0.7 },
        {
          top: "100%",
          opacity: 0,
          duration: 2.4,
          ease: "none",
          repeat: -1,
          repeatDelay: 3,
        },
      );

      // ── Grid reveal ──────────────────────────────────────────────
      gsap.fromTo(
        gridRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.8, ease: "power2.out" },
      );

      // ── Left panel timeline ──────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        brandRef.current,
        { opacity: 0, y: -40, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 },
      )
        .fromTo(
          tagLine1Ref.current,
          { opacity: 0, x: -80, skewX: -12 },
          { opacity: 1, x: 0, skewX: 0, duration: 0.9 },
          "-=0.6",
        )
        .fromTo(
          tagLine2Ref.current,
          { opacity: 0, x: -80, skewX: -12 },
          { opacity: 1, x: 0, skewX: 0, duration: 0.9 },
          "-=0.72",
        )
        .fromTo(
          tagSubRef.current,
          { opacity: 0, y: 20, letterSpacing: "0px" },
          { opacity: 1, y: 0, letterSpacing: "4px", duration: 0.7 },
          "-=0.5",
        )
        .fromTo(
          shoeRef.current,
          { opacity: 0, scale: 0.75, rotation: -25, y: 40 },
          {
            opacity: 1,
            scale: 1,
            rotation: -6,
            y: 0,
            duration: 1.6,
            ease: "back.out(1.6)",
          },
          "-=1.0",
        );

      // ── Form stagger entrance ────────────────────────────────────
      const formEls = [
        pillRef.current,
        titleRef.current,
        subtitleRef.current,
        emailRef.current,
        passwordRef.current,
        optionsRef.current,
        submitRef.current,
        dividerRef.current,
        googleRef.current,
        signupRef.current,
      ];

      gsap.fromTo(
        formEls,
        { opacity: 0, y: 36, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.5,
        },
      );

      // ── Orb ambient float ────────────────────────────────────────
      gsap.to(orb1Ref.current, {
        y: -30,
        x: 15,
        duration: 7,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(orb2Ref.current, {
        y: 25,
        x: -20,
        duration: 9,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 2,
      });
      gsap.to(orb3Ref.current, {
        y: -18,
        x: 22,
        duration: 6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 1,
      });

      // ── Shoe float + rotate ──────────────────────────────────────
      gsap.to(shoeRef.current, {
        y: -22,
        rotation: "-=3",
        duration: 5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // ── Logo spin ────────────────────────────────────────────────
      gsap.to(logoIconRef.current, {
        rotation: 360,
        duration: 12,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });
    });

    return () => ctx.revert();
  }, []);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    gsap
      .timeline()
      .to(submitRef.current, { scale: 0.95, duration: 0.1, ease: "power1.in" })
      .to(submitRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1.3, 0.5)",
      });

    // Glitch flash on the title
    gsap.to(titleRef.current, {
      skewX: 8,
      opacity: 0.6,
      duration: 0.06,
      yoyo: true,
      repeat: 3,
      ease: "none",
      onComplete: () => gsap.set(titleRef.current, { skewX: 0, opacity: 1 }),
    });

    setTimeout(() => setLoading(false), 2400);
  };

  const handleLineFocus = (lineEl) => {
    gsap.to(lineEl, { scaleX: 1, duration: 0.45, ease: "expo.out" });
  };

  const handleLineBlur = (lineEl, val) => {
    if (!val) gsap.to(lineEl, { scaleX: 0, duration: 0.3, ease: "power2.in" });
  };

  const handleSubmitEnter = () => {
    if (loading) return;
    gsap.to(submitRef.current.querySelector(".btn-fill"), {
      x: "0%",
      duration: 0.45,
      ease: "expo.out",
    });
    gsap.to(submitRef.current.querySelector(".btn-arrow"), {
      x: 6,
      duration: 0.3,
      ease: "expo.out",
    });
  };

  const handleSubmitLeave = () => {
    if (loading) return;
    gsap.to(submitRef.current.querySelector(".btn-fill"), {
      x: "-101%",
      duration: 0.35,
      ease: "power2.in",
    });
    gsap.to(submitRef.current.querySelector(".btn-arrow"), {
      x: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  };

  const handleGoogleEnter = (el) => {
    gsap.to(el, { y: -3, scale: 1.025, duration: 0.3, ease: "expo.out" });
    gsap.to(el.querySelector(".g-fill"), {
      scaleX: 1,
      duration: 0.4,
      ease: "expo.out",
    });
  };

  const handleGoogleLeave = (el) => {
    gsap.to(el, { y: 0, scale: 1, duration: 0.3, ease: "expo.out" });
    gsap.to(el.querySelector(".g-fill"), {
      scaleX: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  };

  const navigate = useNavigate();

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="sz-container">
      {/* ════════════ LEFT PANEL ════════════ */}
      <section className="sz-left">
        {/* Background layers */}
        <div className="sz-bg-noise" />
        <div className="sz-grid" ref={gridRef} />
        <div className="sz-scanline" ref={scanlineRef} />

        {/* Ambient orbs */}
        <div className="sz-orb sz-orb-1" ref={orb1Ref} />
        <div className="sz-orb sz-orb-2" ref={orb2Ref} />
        <div className="sz-orb sz-orb-3" ref={orb3Ref} />

        {/* Particles */}
        <Particles />

        {/* Shoe */}
        <Canvas
          style={{
            height: "100vh",
            width: "50vw",
            zIndex: 100,
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} intensity={5} />
          <ShoeModel position={[0, 0, 0]} />
          <OrbitControls enableZoom={false} />
        </Canvas>

        {/* Brand */}
        <div className="sz-brand" ref={brandRef}>
          <span className="sz-logo-icon" ref={logoIconRef}>
            /
          </span>
          <span className="sz-brand-name">STEPZY</span>
          <img className="sz-shoe" src="./floating-shoe.png" alt="shoe" />
        </div>

        {/* Tagline */}
        <div className="sz-tagline">
          <p className="sz-tag-line" ref={tagLine1Ref}>
            MOVE
          </p>
          <p className="sz-tag-line sz-tag-accent" ref={tagLine2Ref}>
            DIFFERENT
          </p>
          <p className="sz-tag-sub" ref={tagSubRef}>
            Next-gen kicks for the streets
          </p>
        </div>

        {/* Corner accents */}
        <span className="corner corner-tl" />
        <span className="corner corner-br" />
      </section>

      {/* ════════════ RIGHT PANEL ════════════ */}
      <section className="sz-right">
        {/* Subtle top gradient */}
        <div className="sz-right-glow" />

        <div className="sz-form-wrap">
          {/* NEW pill badge */}
          <div className="sz-pill" ref={pillRef}>
            <span className="pill-dot" />
            <span>Season 25 Drop</span>
          </div>

          {/* Header */}
          <div className="sz-form-header">
            <h1 className="sz-title" ref={titleRef}>
              Welcome
              <br />
              Back.
            </h1>
            <p className="sz-subtitle" ref={subtitleRef}>
              Sign in to your Stepzy account
            </p>
          </div>

          {/* Form */}
          <form className="sz-form" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="sz-input-group" ref={emailRef}>
              <label className="sz-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="sz-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={(e) =>
                  handleLineFocus(e.currentTarget.nextElementSibling)
                }
                onBlur={(e) =>
                  handleLineBlur(e.currentTarget.nextElementSibling, email)
                }
                required
                autoComplete="email"
              />
              <span className="sz-line" />
            </div>

            {/* Password */}
            <div className="sz-input-group" ref={passwordRef}>
              <label className="sz-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="sz-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={(e) =>
                  handleLineFocus(e.currentTarget.nextElementSibling)
                }
                onBlur={(e) =>
                  handleLineBlur(e.currentTarget.nextElementSibling, password)
                }
                required
                autoComplete="current-password"
              />
              <span className="sz-line" />
            </div>

            {/* Options */}
            <div className="sz-options" ref={optionsRef}>
              <label className="sz-check-wrap">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span className="sz-checkbox" />
                <span className="sz-check-text">Remember me</span>
              </label>
              <a href="#" className="sz-forgot">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              ref={submitRef}
              type="submit"
              className={`sz-submit${loading ? " sz-loading" : ""}`}
              onMouseEnter={handleSubmitEnter}
              onMouseLeave={handleSubmitLeave}
            >
              <span className="btn-fill" />
              <span className="btn-text">
                {loading ? "Signing In…" : "Sign In"}
              </span>
              <span className="btn-arrow">{loading ? "↻" : "→"}</span>
            </button>

            {/* Divider */}
            <div className="sz-divider" ref={dividerRef}>
              <span>or</span>
            </div>

            {/* Google only */}
            <button
              ref={googleRef}
              type="button"
              className="sz-google-btn"
              onMouseEnter={(e) => handleGoogleEnter(e.currentTarget)}
              onMouseLeave={(e) => handleGoogleLeave(e.currentTarget)}
            >
              <span className="g-fill" />
              <GoogleIcon />
              <a className="google-login" href="/api/auth/google">
                <span className="g-text">Continue with Google</span>
              </a>
            </button>

            {/* Sign up */}
            <p className="sz-signup" ref={signupRef}>
              No account?{" "}
              <a href="#" className="sz-signup-link">
                Create one free →
              </a>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
