import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";

/* ── Icons ── */
const EyeOpen = () => (
  <svg
    width="15"
    height="15"
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
    width="15"
    height="15"
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
  <svg width="15" height="15" viewBox="0 0 24 24">
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

const IconDrop = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);
const IconBolt = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IconStar = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const PERKS = [
  {
    icon: <IconDrop />,
    title: "Exclusive Drops",
    desc: "First access to limited-edition releases before anyone else.",
  },
  {
    icon: <IconBolt />,
    title: "Member Pricing",
    desc: "Save up to 20% on every order with member-only deals.",
  },
  {
    icon: <IconStar />,
    title: "Earn Sole Points",
    desc: "Collect points on every purchase and redeem for free kicks.",
  },
];

/* Password strength helper */
function getStrength(pw) {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const [vals, setVals] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
  });
  const { handleRegister } = useAuth();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const progressRef = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const logoRef = useRef(null);
  const preRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const perksRef = useRef([]);
  const formHeadRef = useRef(null);
  const fieldsRef = useRef([]);
  const checkRef = useRef(null);
  const btnRef = useRef(null);
  const dividerRef = useRef(null);
  const socialRef = useRef(null);
  const switchRef = useRef(null);
  const sbRefs = useRef([]);

  const strength = getStrength(vals.password);
  const strengthClass = ["", "s-weak", "s-medium", "s-strong"][strength];

  useEffect(() => {
    gsap.to(progressRef.current, {
      scaleX: 1,
      duration: 1.4,
      ease: "power3.out",
      onComplete: () =>
        gsap.to(progressRef.current, { opacity: 0, duration: 0.4, delay: 0.2 }),
    });
    gsap.to(blob1Ref.current, {
      x: -25,
      y: 20,
      duration: 8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    gsap.to(blob2Ref.current, {
      x: 20,
      y: -15,
      duration: 10,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.to(logoRef.current, { opacity: 1, x: 0, duration: 0.7 }, 0.35);
    tl.to(preRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.6);
    tl.to(line1Ref.current, { y: "0%", opacity: 1, duration: 0.75 }, 0.7);
    tl.to(line2Ref.current, { y: "0%", opacity: 1, duration: 0.75 }, 0.83);
    tl.to(line3Ref.current, { y: "0%", opacity: 1, duration: 0.75 }, 0.96);
    tl.to(
      perksRef.current,
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.13 },
      1.05,
    );
    tl.to(formHeadRef.current, { opacity: 1, y: 0, duration: 0.65 }, 0.4);
    tl.to(
      fieldsRef.current,
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
      0.58,
    );
    tl.to(checkRef.current, { opacity: 1, y: 0, duration: 0.5 }, 1.0);
    tl.to(btnRef.current, { opacity: 1, y: 0, duration: 0.5 }, 1.1);
    tl.to(dividerRef.current, { opacity: 1, duration: 0.4 }, 1.2);
    tl.to(socialRef.current, { opacity: 1, y: 0, duration: 0.5 }, 1.25);
    tl.to(switchRef.current, { opacity: 1, y: 0, duration: 0.45 }, 1.35);
  }, []);

  useEffect(() => {
    sbRefs.current.forEach((el, i) => {
      if (!el) return;
      const active = strength > i;
      gsap.to(el, {
        scaleX: active ? 1 : 0.3,
        opacity: active ? 1 : 0.2,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  }, [strength]);
  const handleBtnMove = (e) => {
    const r = btnRef.current.getBoundingClientRect();
    gsap.to(btnRef.current, {
      x: (e.clientX - r.left - r.width / 2) * 0.16,
      y: (e.clientY - r.top - r.height / 2) * 0.16,
      duration: 0.4,
      ease: "power2.out",
    });
  };
  const handleBtnLeave = () => {
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  };

  const onFocus = (e) =>
    gsap.to(e.currentTarget.closest(".field"), {
      scale: 1.01,
      duration: 0.3,
      ease: "power2.out",
    });
  const onBlur = (e) =>
    gsap.to(e.currentTarget.closest(".field"), {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await handleRegister(vals);
    if (res.success) {
      navigate("/");
    }
    gsap.to(btnRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });
  };

  const addFieldRef = (el) => {
    if (el && !fieldsRef.current.includes(el)) fieldsRef.current.push(el);
  };
  const addPerkRef = (el) => {
    if (el && !perksRef.current.includes(el)) perksRef.current.push(el);
  };
  const addSbRef = (el) => {
    if (el && !sbRefs.current.includes(el)) sbRefs.current.push(el);
  };

  return (
    <>
      <div className="cursor-line" ref={progressRef} />

      <div className="register-page">
        <main className="rp-form-side">
          <div
            className="form-head"
            ref={formHeadRef}
            style={{ transform: "translateY(16px)" }}
          >
            <div className="eyebrow">New Member</div>
            <h2>
              Create Your
              <br />
              Account
            </h2>
            <p>Join 40,000+ sneaker obsessives worldwide.</p>
          </div>

          {error && <div className="error-shower">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div
                className="field"
                ref={addFieldRef}
                style={{ transform: "translateY(14px)" }}
              >
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Jordan"
                  value={vals.name}
                  onChange={(e) => setVals({ ...vals, name: e.target.value })}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>
              <div
                className="field"
                ref={addFieldRef}
                style={{ transform: "translateY(14px)" }}
              >
                <label>Contact</label>
                <input
                  type="text"
                  placeholder="+91 9919191012"
                  value={vals.contact}
                  onChange={(e) =>
                    setVals({ ...vals, contact: e.target.value })
                  }
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
              </div>
            </div>

            <div
              className="field"
              ref={addFieldRef}
              style={{ transform: "translateY(14px)" }}
            >
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={vals.email}
                onChange={(e) => setVals({ ...vals, email: e.target.value })}
                onFocus={onFocus}
                onBlur={onBlur}
                autoComplete="email"
              />
            </div>

            <div
              className="field"
              ref={addFieldRef}
              style={{ transform: "translateY(14px)" }}
            >
              <label>Password</label>
              <div className="pass-wrap">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={vals.password}
                  onChange={(e) =>
                    setVals({ ...vals, password: e.target.value })
                  }
                  onFocus={onFocus}
                  onBlur={onBlur}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPass((s) => !s)}
                >
                  {showPass ? <EyeOff /> : <EyeOpen />}
                </button>
              </div>
              {vals.password && (
                <div className="strength-bar">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      ref={addSbRef}
                      className={strength > i ? strengthClass : ""}
                      style={{
                        transformOrigin: "left",
                        transform: "scaleX(0.3)",
                        opacity: 0.2,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div
              className="field-check"
              ref={checkRef}
              style={{ transform: "translateY(10px)" }}
            >
              <input
                type="checkbox"
                id="terms"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              className="btn-cta"
              ref={btnRef}
              style={{ transform: "translateY(12px)" }}
              onMouseMove={handleBtnMove}
              onMouseLeave={handleBtnLeave}
            >
              <span className="btn-shine" />
              {loading ? <div className="loader"></div> : "Create Account"}
            </button>

            <div className="divider" ref={dividerRef}>
              or sign up with
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
            style={{ marginTop: 20, transform: "translateY(8px)" }}
          >
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </main>

        {/* ── Right Visual Panel ── */}
        <aside className="rp-visual">
          <div className="blob blob-a" ref={blob1Ref} />
          <div className="blob blob-b" ref={blob2Ref} />

          <div className="vert-ticker">
            <div className="vert-inner">
              {"STEPPERS · NEW DROP · MEMBERS ONLY · EXCLUSIVE · "
                .repeat(6)
                .split(" · ")
                .map((t, i) => (
                  <span key={i}>
                    {t} <em>·</em>{" "}
                  </span>
                ))}
            </div>
          </div>

          <a
            href="/"
            className="rp-logo"
            ref={logoRef}
            style={{ transform: "translateX(-10px)" }}
          >
            <div className="logo-mark">S</div>
            <span className="logo-text">Steppers</span>
          </a>

          <div className="rp-hero">
            <p
              className="pre"
              ref={preRef}
              style={{ transform: "translateY(10px)" }}
            >
              Join The Movement
            </p>
            <h1>
              <span className="line" ref={line1Ref}>
                Own
              </span>
              <span className="line accent" ref={line2Ref}>
                Every
              </span>
              <span className="line" ref={line3Ref}>
                Step.
              </span>
            </h1>
          </div>

          <div className="perks">
            {PERKS.map((p) => (
              <div
                className="perk"
                key={p.title}
                ref={addPerkRef}
                style={{ transform: "translateX(16px)" }}
              >
                <div className="perk-icon">{p.icon}</div>
                <div className="perk-body">
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}
