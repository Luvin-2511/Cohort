import { useEffect, useRef, useState, Suspense } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";
import StarsBackground from "../../shared/components/StarsBackground";
import useAuth from "../hooks/useAuth";

gsap.registerPlugin(SplitText);



function getStrength(p) {
  if (!p) return 0;
  let s = 0;
  if (p.length >= 8)          s++;
  if (/[A-Z]/.test(p))        s++;
  if (/[0-9]/.test(p))        s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
}
const STRENGTH_COLORS = ["", "#ff6b6b", "#ffb347", "#C8441A", "#c7f300"];
const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];


export default function Register() {
  const navigate = useNavigate();
  const { handleRegister, loading } = useAuth();
  const [showPw, setShowPw]   = useState(false);
  const [fields, setFields]   = useState({ username: "", email: "", password: "" });
  const [errors, setErrors]   = useState({});

  const set = (k) => (e) => setFields((p) => ({ ...p, [k]: e.target.value }));
  const clearErr = (k) => () => setErrors((p) => ({ ...p, [k]: "" }));
  const strength = getStrength(fields.password);

  const titleRef  = useRef();
  const formRef   = useRef();
  const canvasRef = useRef();
  const curRef    = useRef();

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(canvasRef.current, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 1.0 }, 0);

    if (titleRef.current) {
      const split = new SplitText(titleRef.current, { type: "chars" });
      tl.fromTo(split.chars,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, duration: 0.75 },
        0.2
      );
    }

    tl.fromTo(
      formRef.current?.querySelectorAll(".reg-anim") || [],
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.07, duration: 0.6 },
      0.5
    );

    const move = (e) =>
      gsap.to(curRef.current, { x: e.clientX, y: e.clientY, duration: 0.07, ease: "none" });
    document.addEventListener("mousemove", move);

    const onEnter = () => curRef.current?.classList.add("hovering");
    const onLeave = () => curRef.current?.classList.remove("hovering");
    const obs = new MutationObserver(() => {
      document.querySelectorAll("button, a, input").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    });
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", move);
      obs.disconnect();
    };
  }, []);

  /* ── Validation ── */
  const validate = () => {
    const e = {};
    if (!fields.username.trim())
      e.username = "Required";
    else if (fields.username.trim().length < 3)
      e.username = "At least 3 characters";
    else if (/\s/.test(fields.username))
      e.username = "No spaces allowed";

    if (!fields.email)
      e.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(fields.email))
      e.email = "Invalid email address";

    if (!fields.password)
      e.password = "Required";
    else if (strength < 2)
      e.password = "Too weak — add uppercase, numbers, or symbols";

    return e;
  };

  /* ── Submit ── */
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      gsap.to(formRef.current, {
        x: [0, -9, 9, -7, 7, -4, 4, 0],
        duration: 0.45,
        ease: "none",
      });
      return;
    }
    const response = await handleRegister(fields.username, fields.email, fields.password);
    if (response && response.success) {
      await new Promise((r) => setTimeout(r, 800));
      gsap.to([canvasRef.current, formRef.current], {
        opacity: 0, y: -30, duration: 0.5, ease: "power3.in", stagger: 0.06,
        onComplete: () => navigate("/dashboard"),
      });
    }
  };

  return (
    <div className="register-page">
      <div id="cursor-reg" ref={curRef} />

      {/* ── LEFT VISUAL PANEL ── */}
      <div className="reg-visual" ref={canvasRef}>
        <div className="reg-canvas-wrap">
          <StarsBackground />
        </div>

        <div className="reg-visual-copy">
          <div className="rv-eyebrow">Create Account</div>
          <h2 className="rv-title">
            BUILD YOUR<br />
            <em>SECOND</em><br />
            BRAIN.
          </h2>
          <p className="rv-desc">
            Join 40,000+ knowledge workers who never lose an idea.
            Start saving. The AI does the rest.
          </p>
          <div className="rv-features">
            {[
              "Browser extension ready in 30 seconds",
              "First save triggers AI graph building",
              "Free forever on the basic plan",
            ].map((f) => (
              <div className="rv-feature" key={f}>
                <span className="rv-feature-dot" />
                {f}
              </div>
            ))}
          </div>
        </div>

        <Link to="/" className="reg-back">← MEMEX</Link>
      </div>

      {/* ── RIGHT FORM PANEL ── */}
      <div className="reg-form-panel" ref={formRef}>
        <div className="reg-form-inner">

          <div className="reg-form-top reg-anim">
            <div className="rf-logo">MEMEX</div>
            <div className="rf-step-label">CREATE ACCOUNT</div>
          </div>

          <h1 className="reg-title reg-anim" ref={titleRef}>
            JOIN THE GRID.
          </h1>
          <p className="reg-sub reg-anim">
            One account. Infinite knowledge. Let's get you set up.
          </p>

          <p className="reg-signin reg-anim">
            Already have an account?{" "}
            <Link to="/login" className="reg-link">Sign in →</Link>
          </p>

          <form className="reg-form" onSubmit={handleSubmit} noValidate>

            {/* Username */}
            <div className="rf-group lf-group reg-anim">
              <label className="rf-label">Username</label>
              <div className={`rf-input-wrap ${errors.username ? "has-error" : ""}`}>
                <input
                  type="text"
                  className="rf-input"
                  placeholder="ada_lovelace"
                  value={fields.username}
                  onChange={set("username")}
                  onFocus={clearErr("username")}
                  autoComplete="username"
                  spellCheck={false}
                />
                <div className="rf-line" />
              </div>
              {errors.username && <span className="rf-error">{errors.username}</span>}
            </div>

            {/* Email */}
            <div className="rf-group lf-group reg-anim">
              <label className="rf-label">Email address</label>
              <div className={`rf-input-wrap ${errors.email ? "has-error" : ""}`}>
                <input
                  type="email"
                  className="rf-input"
                  placeholder="your@email.com"
                  value={fields.email}
                  onChange={set("email")}
                  onFocus={clearErr("email")}
                  autoComplete="email"
                />
                <div className="rf-line" />
              </div>
              {errors.email && <span className="rf-error">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="rf-group lf-group reg-anim">
              <label className="rf-label">Password</label>
              <div className={`rf-input-wrap ${errors.password ? "has-error" : ""}`}>
                <input
                  type={showPw ? "text" : "password"}
                  className="rf-input"
                  placeholder="Make it strong"
                  value={fields.password}
                  onChange={set("password")}
                  onFocus={clearErr("password")}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="lf-eye"
                  onClick={() => setShowPw((p) => !p)}
                  tabIndex={-1}
                >
                  {showPw ? "○" : "●"}
                </button>
                <div className="rf-line" />
              </div>

              {fields.password && (
                <div className="strength-wrap">
                  <div className="strength-bar">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="strength-seg"
                        style={{
                          background: i <= strength
                            ? STRENGTH_COLORS[strength]
                            : "rgba(240,235,225,0.1)",
                        }}
                      />
                    ))}
                  </div>
                  <span className="strength-label" style={{ color: STRENGTH_COLORS[strength] }}>
                    {STRENGTH_LABELS[strength]}
                  </span>
                </div>
              )}
              {errors.password && <span className="rf-error">{errors.password}</span>}
            </div>

            {/* Terms */}
            <p className="rf-terms reg-anim">
              By creating an account you agree to our{" "}
              <a href="#" className="reg-link">Terms</a> and{" "}
              <a href="#" className="reg-link">Privacy Policy</a>.
            </p>

            {/* Submit */}
            <button
              type="submit"
              className={`rf-next lf-submit reg-anim ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <span className="lf-spinner" />
              ) : (
                <>
                  <span>CREATE BRAIN</span>
                  <span className="lf-arrow">→</span>
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}