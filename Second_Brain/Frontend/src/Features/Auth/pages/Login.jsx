import { useEffect, useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Environment } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import useAuth from "../hooks/useAuth";

gsap.registerPlugin(SplitText);

function AuthOrb() {
  const meshRef = useRef();
  const geo = useMemo(() => new THREE.IcosahedronGeometry(1.15, 4), []);

  useEffect(() => {
    if (meshRef.current) {
      const pos = meshRef.current.geometry.attributes.position;
      meshRef.current.geometry.userData.original = new Float32Array(pos.array);
    }
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.12;
    meshRef.current.rotation.x = Math.sin(t * 0.18) * 0.25;

    const breathe = 1 + Math.sin(t * 0.6) * 0.035;
    meshRef.current.scale.setScalar(breathe);

    const pos = meshRef.current.geometry.attributes.position;
    const orig = meshRef.current.geometry.userData.original;
    if (orig) {
      for (let i = 0; i < pos.count; i++) {
        const ox = orig[i * 3], oy = orig[i * 3 + 1], oz = orig[i * 3 + 2];
        const w = Math.sin(ox * 2.5 + t * 0.8) * Math.cos(oy * 2 + t * 0.6) * 0.07;
        pos.setXYZ(i, ox + w, oy + w * 0.7, oz + w * 0.5);
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.6}>
      <mesh ref={meshRef} geometry={geo}>
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.45}
          chromaticAberration={0.09}
          anisotropy={0.2}
          distortion={0.3}
          distortionScale={0.55}
          temporalDistortion={0.1}
          iridescence={1.3}
          iridescenceIOR={1.45}
          iridescenceThicknessRange={[0, 1400]}
          roughness={0}
          color="#C8441A"
          attenuationColor="#3D5A4C"
          attenuationDistance={0.4}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function AuthScene() {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 4, 4]}   intensity={1.3} color="#C8441A" />
      <directionalLight position={[-3, -2, -3]} intensity={0.5} color="#3D5A4C" />
      <AuthOrb />
    </>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [errors,   setErrors]   = useState({});
  const {handleLogin, loading} =  useAuth()
  const titleRef  = useRef();
  const formRef   = useRef();
  const canvasRef = useRef();
  const curRef    = useRef();

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(canvasRef.current,
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.0 }, 0
    );

    // Title chars
    const split = new SplitText(titleRef.current, { type: "chars" });
    tl.fromTo(split.chars,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.035, duration: 0.8 }, 0.15
    );

    tl.fromTo(formRef.current.querySelectorAll(".login-anim"),
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.65 }, 0.5
    );

    // Custom cursor
    const move = (e) => {
      gsap.to(curRef.current, { x: e.clientX, y: e.clientY, duration: 0.07, ease: "none" });
    };
    document.addEventListener("mousemove", move);

    const onEnter = () => curRef.current?.classList.add("hovering");
    const onLeave = () => curRef.current?.classList.remove("hovering");
    document.querySelectorAll("button, a, input").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => document.removeEventListener("mousemove", move);
  }, []);

  /* ── Validation ── */
  const validate = () => {
    const e = {};
    if (!email) e.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Invalid email";
    if (!password) e.password = "Required";
    else if (password.length < 6) e.password = "Min 6 characters";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    const response = await handleLogin(email,password)
    if (Object.keys(e).length) {
      setErrors(e);
      gsap.to(formRef.current, {
        x: [0, -10, 10, -8, 8, -4, 4, 0],
        duration: 0.5, ease: "none",
      });
      if(response.success){
        navigate('/home')
      }
      return;
    }
    await new Promise((r) => setTimeout(r, 1300));

    gsap.to([canvasRef.current, formRef.current], {
      opacity: 0, y: -30,
      duration: 0.5, ease: "power3.in",
      stagger: 0.06,
      onComplete: () => navigate("/"),
    });
  };

  return (
    <div className="login-page">
      <div id="cursor-auth" ref={curRef} />

      {/* ── LEFT: 3D CANVAS PANEL ── */}
      <div className="login-visual" ref={canvasRef}>
        <div className="login-canvas-wrap">
          <Canvas
            camera={{ position: [0, 0, 3.5], fov: 42 }}
            gl={{ alpha: true, antialias: true }}
            dpr={[1, 1.5]}
          >
            <Suspense fallback={null}>
              <AuthScene />
            </Suspense>
          </Canvas>
        </div>

        <div className="login-visual-copy">
          <div className="lv-eyebrow">Second Brain Infrastructure</div>
          <h2 className="lv-title">
            WELCOME<br />
            <em>BACK.</em>
          </h2>
          <p className="lv-desc">
            Your knowledge graph has been growing while you were away.
            New connections formed. Ideas waiting to resurface.
          </p>
          <div className="lv-stats">
            <div className="lv-stat">
              <div className="lv-stat-n">48K+</div>
              <div className="lv-stat-l">Items indexed</div>
            </div>
            <div className="lv-stat">
              <div className="lv-stat-n">0</div>
              <div className="lv-stat-l">Manual tags</div>
            </div>
          </div>
        </div>

        {/* Back link */}
        <Link to="/" className="login-back">← MEMEX</Link>
      </div>

      {/* ── RIGHT: FORM PANEL ── */}
      <div className="login-form-panel" ref={formRef}>
        <div className="login-form-inner">

          <div className="login-form-top login-anim">
            <div className="lf-logo">MEMEX</div>
            <div className="lf-step">01 / 01</div>
          </div>

          <h1 className="login-title login-anim" ref={titleRef}>
            SIGN IN
          </h1>
          <p className="login-sub login-anim">
            No account?{" "}
            <Link to="/register" className="login-link">Create one free →</Link>
          </p>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="lf-group login-anim">
              <label className="lf-label">Email address</label>
              <div className={`lf-input-wrap ${errors.email ? "has-error" : ""}`}>
                <input
                  type="email"
                  className="lf-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
                  autoComplete="email"
                />
                <div className="lf-input-line" />
              </div>
              {errors.email && <span className="lf-error">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="lf-group login-anim">
              <div className="lf-label-row">
                <label className="lf-label">Password</label>
                <button type="button" className="lf-forgot">Forgot?</button>
              </div>
              <div className={`lf-input-wrap ${errors.password ? "has-error" : ""}`}>
                <input
                  type={showPw ? "text" : "password"}
                  className="lf-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: "" })); }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="lf-eye"
                  onClick={() => setShowPw((p) => !p)}
                  tabIndex={-1}
                >
                  {showPw ? "○" : "●"}
                </button>
                <div className="lf-input-line" />
              </div>
              {errors.password && <span className="lf-error">{errors.password}</span>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`lf-submit login-anim ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <span className="lf-spinner" />
              ) : (
                <>
                  <span>ACCESS BRAIN</span>
                  <span className="lf-arrow">→</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="lf-divider login-anim">
            <span>or</span>
          </div>

          {/* Google */}
          <button className="lf-google login-anim">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <p className="login-footer-note login-anim">
            By signing in you agree to our{" "}
            <a href="#" className="login-link">Terms</a> and{" "}
            <a href="#" className="login-link">Privacy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}