import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "../styles/login.css";
import "../../shared/styles/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import ShoeModel from "../../shared/components/ShoeModel";
import InteractiveTags from "../components/InteractiveTags";

const EyeOpen = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeOff = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);
const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [vals, setVals] = useState({ email: "", password: "" });
  const { handleLogin } = useAuth();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate("/");

  const progressRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const logoRef = useRef(null);
  const preRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const statsRef = useRef([]);
  const formHeadRef = useRef(null);
  const fieldsRef = useRef([]);
  const extrasRef = useRef(null);
  const btnRef = useRef(null);
  const dividerRef = useRef(null);
  const socialRef = useRef(null);
  const switchRef = useRef(null);

  useEffect(() => {
    gsap.to(progressRef.current, {
      scaleX: 1,
      duration: 1.2,
      ease: "power2.out",
      onComplete: () =>
        gsap.to(progressRef.current, { opacity: 0, duration: 0.4, delay: 0.3 }),
    });

    gsap.to(blob1Ref.current, {
      x: 30,
      y: -20,
      duration: 7,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    gsap.to(blob2Ref.current, {
      x: -20,
      y: 15,
      duration: 9,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.to(logoRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.4);
    tl.to(preRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.65);
    tl.to(line1Ref.current, { y: "0%", opacity: 1, duration: 0.8 }, 0.75);
    tl.to(line2Ref.current, { y: "0%", opacity: 1, duration: 0.8 }, 0.88);
    tl.to(line3Ref.current, { y: "0%", opacity: 1, duration: 0.8 }, 1.01);
    tl.to(
      statsRef.current,
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
      1.15,
    );
    tl.to(formHeadRef.current, { opacity: 1, y: 0, duration: 0.65 }, 0.5);
    tl.to(
      fieldsRef.current,
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 },
      0.68,
    );
    tl.to(extrasRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.95);
    tl.to(btnRef.current, { opacity: 1, y: 0, duration: 0.5 }, 1.05);
    tl.to(dividerRef.current, { opacity: 1, duration: 0.4 }, 1.15);
    tl.to(socialRef.current, { opacity: 1, y: 0, duration: 0.5 }, 1.2);
    tl.to(switchRef.current, { opacity: 1, y: 0, duration: 0.45 }, 1.3);
  }, []);

  /* Magnetic button */
  const handleBtnMouseMove = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    gsap.to(btnRef.current, {
      x: (e.clientX - rect.left - rect.width / 2) * 0.18,
      y: (e.clientY - rect.top - rect.height / 2) * 0.18,
      duration: 0.4,
      ease: "power2.out",
    });
  };
  const handleBtnMouseLeave = () => {
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  };

  /* Field focus scale */
  const handleFocus = (e) =>
    gsap.to(e.currentTarget.closest(".field"), {
      scale: 1.01,
      duration: 0.3,
      ease: "power2.out",
    });
  const handleBlur = (e) =>
    gsap.to(e.currentTarget.closest(".field"), {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await handleLogin(vals);
    if (res.success) {
      navigate("/home");
    }
    gsap.to(btnRef.current, {
      scale: 0.96,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });
  };

  const addFieldRef = (el) => {
    if (el && !fieldsRef.current.includes(el)) fieldsRef.current.push(el);
  };
  const addStatRef = (el) => {
    if (el && !statsRef.current.includes(el)) statsRef.current.push(el);
  };

  return (
    <>
      <ShoeModel
        style={{
          height: "70%",
          width: "50%",
          position: "absolute",
          zIndex: 10,
          left: "10vw",
          top: "8vw",
          pointerEvents: "none",
        }}
        color="#FF6B35"
        rotationDir={1}
        rotationSpeed={0.005}
        modelPosition={[0, 0, -600]}
        modelRotation={[0, 0, Math.PI / 4]}
      />
      <svg
        className="wave-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#060606"
          fill-opacity="1"
          d="M0,160L48,170.7C96,181,192,203,288,186.7C384,171,480,117,576,122.7C672,128,768,192,864,218.7C960,245,1056,235,1152,197.3C1248,160,1344,96,1392,64L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      <div className="cursor-line" ref={progressRef} />

      <div className="login-page">
        <aside className="lp-visual">
          <div className="blob blob-1" ref={blob1Ref} />
          <div className="blob blob-2" ref={blob2Ref} />
          <InteractiveTags />

          <div className="ticker-wrap">
            <div className="ticker-inner">
              {"STEPPERS · NEW DROP · EXCLUSIVE ACCESS · MEMBERS ONLY · FRESH KICKS · "
                .repeat(4)
                .split(" · ")
                .map((t, i) => (
                  <span key={i}>
                    {t} <em>·</em>{" "}
                  </span>
                ))}
            </div>
          </div>
          <div className="ticker-wrap-2">
            <div className="ticker-inner-2">
              {"STEPPERS · NEW DROP · EXCLUSIVE ACCESS · MEMBERS ONLY · FRESH KICKS · "
                .repeat(4)
                .split(" · ")
                .map((t, i) => (
                  <span key={i}>
                    {t} <em>·</em>{" "}
                  </span>
                ))}
            </div>
          </div>

          <Link
            to="/"
            className="sh-logo-block"
            ref={logoRef}
            style={{ opacity: 0, transform: "translateY(-10px)", textDecoration: "none" }}
          >
            <div className="sh-logo">
              <span className="sh-logo-white">STEP</span>
              <span className="sh-logo-accent">PERS</span>
              <span className="sh-logo-dot">.</span>
            </div>
            <div className="sh-logo-sub">STREETWEAR COLLECTIVE</div>
          </Link>

          <div className="lp-hero">
            <p
              className="pre"
              ref={preRef}
              style={{ transform: "translateY(10px)" }}
            >
              Welcome Back
            </p>
            <h1>
              <span className="line" ref={line1Ref}>
                Step
              </span>
              <span className="line line-accent" ref={line2Ref}>
                Back
              </span>
              <span className="line" ref={line3Ref}>
                In.
              </span>
            </h1>
          </div>

          <div className="lp-stats">
            {[
              { num: "40K", sup: "+", label: "Members" },
              { num: "12K", sup: "+", label: "Styles" },
              { num: "99", sup: "%", label: "Satisfaction" },
            ].map((s) => (
              <div
                className="stat"
                key={s.label}
                ref={addStatRef}
                style={{ transform: "translateY(14px)" }}
              >
                <div className="stat-num">
                  {s.num}
                  <sup>{s.sup}</sup>
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </aside>

        {/* ── Right Form ── */}
        <main className="lp-form-side">
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--muted, #787878)",
              fontSize: "0.75rem",
              textDecoration: "none",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 500,
              marginBottom: "2rem",
              transition: "color 0.25s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--white, #fff)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--muted, #787878)"}
          >
            ← Back to Home
          </Link>
          <div
            className="form-head"
            ref={formHeadRef}
            style={{ transform: "translateY(16px)" }}
          >
            <div className="eyebrow">Members Area</div>
            <h2>
              Sign In to
              <br />
              Steppers
            </h2>
            <p>Your next drop is waiting.</p>
          </div>

          {error && <p className="error-shower">{error}</p>}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div
              className="field"
              ref={addFieldRef}
              style={{ transform: "translateY(14px)" }}
            >
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={vals.email}
                onChange={(e) => setVals({ ...vals, email: e.target.value })}
                onFocus={handleFocus}
                onBlur={handleBlur}
                autoComplete="email"
              />
            </div>

            <div
              className="field"
              ref={addFieldRef}
              style={{ transform: "translateY(14px)" }}
            >
              <label htmlFor="password">Password</label>
              <div className="pass-wrap">
                <input
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={vals.password}
                  onChange={(e) =>
                    setVals({ ...vals, password: e.target.value })
                  }
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPass((s) => !s)}
                >
                  {showPass ? <EyeOff /> : <EyeOpen />}
                </button>
              </div>
            </div>

            <div
              className="extras"
              ref={extrasRef}
              style={{ transform: "translateY(10px)" }}
            >
              <div className="check-wrap">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="/forgot" className="forgot-link">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn-cta"
              ref={btnRef}
              style={{ transform: "translateY(12px)" }}
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={handleBtnMouseLeave}
            >
              <span className="btn-shine" />
              {loading ? <div className="loader"></div> : "Sign In"}
            </button>

            <div className="divider" ref={dividerRef}>
              or continue with
            </div>

            <div
              className="social-row"
              ref={socialRef}
              style={{ transform: "translateY(10px)" }}
            >
              <a href="/api/auth/google" className="btn-social">
                <GoogleIcon /> Google
              </a>
            </div>
          </form>

          <p
            className="switch-line"
            ref={switchRef}
            style={{ marginTop: 22, transform: "translateY(8px)" }}
          >
            New to Steppers? <Link to="/register">Create an account</Link>
          </p>
        </main>
      </div>
    </>
  );
}
