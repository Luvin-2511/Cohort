import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "../styles/AuthPages.css";

/* ═══ CONSTANTS ═══ */
const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const BATTLE_LINES = [
  "NEW TRAINER detected!",
  "Choose your trainer name...",
  "Your journey begins here.",
  "MERCHANT: \"Hope you can negotiate.\"",
  "10 rounds. One floor price.",
  "ZERO mercy. Good luck.",
  "Will you ENTER THE ARENA?",
];

const MOVES = [
  { label: "LOGIC STRIKE", type: "NORMAL"  },
  { label: "GUILT TRIP",   type: "PSYCHIC" },
  { label: "FINAL OFFER",  type: "FIRE"    },
  { label: "WALK AWAY",    type: "GHOST"   },
];

const PERSONALITY_TIPS = [
  { type: "STUBBORN",  color: "#f5a623", tip: "USE: SMALL CONCESSIONS + SCARCITY COUNTER" },
  { type: "EMOTIONAL", color: "#e8324a", tip: "USE: STORIES, RAPPORT, PERSONAL CONTEXT"    },
  { type: "FLEXIBLE",  color: "#23d48a", tip: "USE: MARKET DATA + MUTUAL BENEFIT LOGIC"    },
];

/* ═══ Merchant pixel sprite ═══ */
const MERCHANT_ROWS = [
  ["#000",    "#000",    "#c84000","#c84000","#000",    "#000"   ],
  ["#c84000","#c84000","#c84000","#c84000","#c84000","#c84000"],
  ["#f8c878","#f8c878","#f8c878","#f8c878","#f8c878","#f8c878"],
  ["#f8c878","#1a0a00","#f8c878","#f8c878","#1a0a00","#f8c878"],
  ["#f8c878","#f8c878","#f8c878","#f8c878","#f8c878","#f8c878"],
  ["#f8c878","#c84000","#c84000","#c84000","#c84000","#f8c878"],
  ["#304898","#304898","#304898","#304898","#304898","#304898"],
  ["#f8c878","#304898","#f5a623","#f5a623","#304898","#f8c878"],
  ["#304898","#304898","#f5a623","#f5a623","#304898","#304898"],
  ["#1a0a00","#1a0a00","#603820","#603820","#1a0a00","#1a0a00"],
  ["#000",    "#1a0a00","#603820","#603820","#1a0a00","#000"    ],
];

const PLAYER_ROWS = [
  ["_",       "#f8c878","#f8c878","#f8c878","#f8c878","_"      ],
  ["#f5a623","#f8c878","#f8c878","#f8c878","#f8c878","#f5a623"],
  ["#f5a623","#f5a623","#f5a623","#f5a623","#f5a623","#f5a623"],
  ["_",       "#f5a623","#f8c878","#f8c878","#f5a623","_"      ],
  ["_",       "#f8c878","#f8c878","#f8c878","#f8c878","_"      ],
  ["_",       "#204880","#204880","#204880","#204880","_"      ],
  ["#204880","#204880","#204880","#204880","#204880","#204880"],
  ["#f8c878","#204880","#204880","#204880","#204880","#f8c878"],
  ["_",       "#204880","#204880","#204880","#204880","_"      ],
  ["_",       "#1a0a00","_",       "_",       "#1a0a00","_"    ],
  ["_",       "#1a0a00","_",       "_",       "#1a0a00","_"    ],
];

/* ═══ Hooks ═══ */
function useHackerText(original) {
  const [text, setText] = useState(original);
  const timerRef    = useRef(null);
  const progressRef = useRef(0);

  const startHack = useCallback(() => {
    clearInterval(timerRef.current);
    progressRef.current = 0;
    timerRef.current = setInterval(() => {
      const p = progressRef.current;
      setText(
        original.split("").map((ch, idx) =>
          idx < p ? original[idx] : ch === " " ? " " : ALPHA[Math.floor(Math.random() * 26)]
        ).join("")
      );
      progressRef.current += 1 / 3;
      if (progressRef.current >= original.length) {
        clearInterval(timerRef.current);
        setText(original);
      }
    }, 28);
  }, [original]);

  const stopHack = useCallback(() => {
    clearInterval(timerRef.current);
    progressRef.current = 0;
    setText(original);
  }, [original]);

  useEffect(() => () => clearInterval(timerRef.current), []);
  return { text, startHack, stopHack };
}

/* ═══ Cursor ═══ */
function Cursor() {
  const curRef = useRef(null);
  const pos    = useRef({ mx: 0, my: 0, cx: 0, cy: 0 });
  const [isBig, setIsBig] = useState(false);

  useEffect(() => {
    pos.current.mx = window.innerWidth  / 2;
    pos.current.my = window.innerHeight / 2;
    pos.current.cx = pos.current.mx;
    pos.current.cy = pos.current.my;

    const onMove = (e) => { pos.current.mx = e.clientX; pos.current.my = e.clientY; };
    window.addEventListener("mousemove", onMove);
    let raf;
    const tick = () => {
      pos.current.cx += (pos.current.mx - pos.current.cx) * 0.13;
      pos.current.cy += (pos.current.my - pos.current.cy) * 0.13;
      if (curRef.current) {
        curRef.current.style.transform = `translate(${pos.current.cx}px,${pos.current.cy}px) translate(-50%,-50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const attach = () => {
      document.querySelectorAll(".magnetic").forEach((el) => {
        if (el._cb) return;
        el._cb = true;
        el.addEventListener("mouseenter", () => setIsBig(true));
        el.addEventListener("mouseleave", () => setIsBig(false));
        el.addEventListener("mousemove", (e) => {
          const r  = el.getBoundingClientRect();
          const ox = (e.clientX - (r.left + r.width  / 2)) * 0.4;
          const oy = (e.clientY - (r.top  + r.height / 2)) * 0.4;
          el.style.transition = "transform 0.4s cubic-bezier(0.165,0.84,0.44,1)";
          el.style.transform  = `translate(${ox}px,${oy}px)`;
        });
        el.addEventListener("mouseleave", () => {
          el.style.transition = "transform 0.6s cubic-bezier(0.68,-0.6,0.32,1.6)";
          el.style.transform  = "";
        });
      });
    };
    attach();
    const t = setTimeout(attach, 300);
    return () => clearTimeout(t);
  }, []);

  return <div ref={curRef} id="cursor" className={isBig ? "big" : ""} />;
}

/* ═══ Nav ═══ */
function AuthNav() {
  const [scrolled, setScrolled] = useState(false);
  const logo = useHackerText("AI MART");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? " sc" : ""}`}>
      <a
        href="/"
        className="nav-logo magnetic"
        onMouseEnter={logo.startHack}
        onMouseLeave={logo.stopHack}
      >
        {logo.text}
      </a>
      <Link to="/" className="nav-back magnetic">BACK TO ARENA</Link>
    </nav>
  );
}

/* ═══ Pixel Sprite ═══ */
function PixelSprite({ rows }) {
  const px = 6;
  return (
    <div style={{ imageRendering: "pixelated", lineHeight: 0 }}>
      {rows.map((row, ri) => (
        <div key={ri} className="sp-row">
          {row.map((color, ci) => (
            <div
              key={ci}
              className="sp"
              style={{
                width:  px,
                height: px,
                background: color === "_" ? "transparent" : color,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ═══ Battle Preview ═══ */
function BattlePreview() {
  const [displayed, setDisplayed] = useState("");
  const [lineIdx,   setLineIdx]   = useState(0);
  const [activeBtn, setActiveBtn] = useState(0);
  const twRef = useRef(null);

  useEffect(() => {
    let stopped = false;
    const typewrite = (str, cb) => {
      let i = 0;
      setDisplayed("");
      clearInterval(twRef.current);
      twRef.current = setInterval(() => {
        setDisplayed(str.slice(0, i + 1));
        i++;
        if (i >= str.length) {
          clearInterval(twRef.current);
          if (!stopped) setTimeout(cb, 2200);
        }
      }, 42);
    };
    const cycle = (idx) => {
      if (stopped) return;
      setLineIdx(idx);
      typewrite(BATTLE_LINES[idx], () => cycle((idx + 1) % BATTLE_LINES.length));
    };
    cycle(0);
    return () => { stopped = true; clearInterval(twRef.current); };
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setActiveBtn(b => (b + 1) % MOVES.length), 2800);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="gba-frame">
      <div className="mini-arena">
        <div className="mini-arena-bg" />
        <div className="mini-hor" />
        <div className="plat-e" />
        <div className="plat-p" />
        <div className="atk-flash" />

        <div className="hud-box hud-e">
          <div className="hud-name">
            <span>MERCHANT</span>
            <span className="hud-lv">Lv.42</span>
          </div>
          <div className="hud-track"><div className="hud-fill" /></div>
          <div className="hud-lbl">HP</div>
        </div>

        <div className="sprite-merchant">
          <PixelSprite rows={MERCHANT_ROWS} />
        </div>

        <div className="sprite-player">
          <PixelSprite rows={PLAYER_ROWS} />
        </div>

        <div className="hud-box hud-p">
          <div className="hud-name">
            <span>YOU</span>
            <span className="hud-lv">Lv.01</span>
          </div>
          <div className="hud-track">
            <div className="hud-fill full" style={{ width: "78%", animation: "none" }} />
          </div>
          <div className="hud-lbl">HP</div>
        </div>
      </div>

      <div className="battle-msg">
        <div className="btag">// BATTLE LOG</div>
        <div className="btext">
          {displayed}
          <span className="bcur" />
        </div>
        <div className="barr">▼</div>
      </div>

      <div className="move-grid">
        {MOVES.map((m, i) => (
          <button
            key={i}
            className={`mbtn${activeBtn === i ? " act" : ""}`}
            onMouseEnter={() => setActiveBtn(i)}
          >
            {m.label}
            <span className="mtype">{m.type}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══ Personality Tips (register-only extra section) ═══ */
function PersonalityHints() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setActive(a => (a + 1) % PERSONALITY_TIPS.length), 3200);
    return () => clearInterval(iv);
  }, []);

  const p = PERSONALITY_TIPS[active];

  return (
    <div style={{
      border: `1.5px solid ${p.color}22`,
      background: "rgba(0,0,0,0.45)",
      padding: "12px 14px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        top: 0, left: 0,
        width: "100%",
        height: "2px",
        background: p.color,
        boxShadow: `0 0 8px ${p.color}`,
        transition: "background 0.4s, box-shadow 0.4s",
      }} />
      <div style={{
        fontFamily: "'Press Start 2P'",
        fontSize: "6.5px",
        color: p.color,
        letterSpacing: "0.1em",
        marginBottom: "7px",
        transition: "color 0.3s",
      }}>
        {p.type} TYPE
      </div>
      <div style={{
        fontFamily: "'Press Start 2P'",
        fontSize: "6px",
        color: "rgba(245,240,232,0.55)",
        lineHeight: 1.8,
        letterSpacing: "0.04em",
      }}>
        {p.tip}
      </div>
      <div style={{ display: "flex", gap: 5, marginTop: 9 }}>
        {PERSONALITY_TIPS.map((_, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: 6, height: 6,
              background: i === active ? p.color : "rgba(245,240,232,0.15)",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══ Field ═══ */
function Field({ label, type, name, value, onChange, placeholder, error, hint, autoComplete }) {
  return (
    <div className="field">
      <div className="field-label">{label}</div>
      <input
        className={`field-input magnetic${error ? " error" : ""}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        spellCheck={false}
      />
      {error && <div className="field-error">{error}</div>}
    </div>
  );
}

/* ═══ REGISTER PAGE ═══ */
export default function RegisterPage() {
  const [form,    setForm]    = useState({ username: "", email: "", password: "", confirm: "" });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.username.trim())                       e.username = "TRAINER NAME IS REQUIRED";
    else if (form.username.length < 3)               e.username = "MIN 3 CHARACTERS";
    else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) e.username = "LETTERS, NUMBERS, UNDERSCORE ONLY";

    if (!form.email.trim())                          e.email    = "EMAIL IS REQUIRED";
    else if (!/\S+@\S+\.\S+/.test(form.email))      e.email    = "INVALID EMAIL FORMAT";

    if (!form.password)                              e.password = "PASSWORD IS REQUIRED";
    else if (form.password.length < 6)               e.password = "MIN 6 CHARACTERS";

    if (!form.confirm)                               e.confirm  = "PLEASE CONFIRM PASSWORD";
    else if (form.confirm !== form.password)         e.confirm  = "PASSWORDS DO NOT MATCH";
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    // TODO: call POST /api/auth/register
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
  };

  return (
    <>
      <div className="noise" />
      <div className="scanlines" />
      <Cursor />
      <AuthNav />

      <div className="auth-page">
        {/* ── LEFT ── */}
        <div className="auth-left">
          <div className="auth-left-content">
            <div className="left-tagline">
              <div className="left-tagline-ey">NEW TRAINER REGISTRATION</div>
              <div className="left-tagline-title">
                CREATE<br />
                <span className="left-tagline-acc">YOUR</span><br />
                TRAINER.
              </div>
            </div>

            <BattlePreview />

            <PersonalityHints />
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="auth-right">
          <div className="form-card">
            <div className="form-inner">
              <div className="form-topbar">// NEW TRAINER REGISTRATION</div>

              <div className="form-heading">
                JOIN THE<br />
                <span className="acc">ARENA</span>
              </div>
              <p className="form-sub">
                Create your trainer profile.<br />
                Your leaderboard legacy starts here.
              </p>

              <form onSubmit={onSubmit} noValidate>
                <Field
                  label="TRAINER NAME"
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={onChange}
                  placeholder="XRAY_99"
                  error={errors.username}
                  autoComplete="username"
                />
                <Field
                  label="EMAIL ADDRESS"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="trainer@aimart.gg"
                  error={errors.email}
                  autoComplete="email"
                />
                <Field
                  label="PASSWORD"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  placeholder="••••••••••••"
                  error={errors.password}
                  autoComplete="new-password"
                />
                <Field
                  label="CONFIRM PASSWORD"
                  type="password"
                  name="confirm"
                  value={form.confirm}
                  onChange={onChange}
                  placeholder="••••••••••••"
                  error={errors.confirm}
                  autoComplete="new-password"
                />

                <button
                  type="submit"
                  className="submit-btn magnetic"
                  disabled={loading}
                >
                  <span>
                    {loading && <span className="spinner" />}
                    {loading ? "CREATING TRAINER..." : "⚔ CREATE TRAINER"}
                  </span>
                </button>
              </form>

              <div className="form-divider">
                <span>OR</span>
              </div>

              <div className="switch-link">
                Already have an account?&nbsp;
                <Link to="/login">LOGIN HERE</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="auth-ticker">
        <div className="ticker-in">
          {[0, 1].map(i => (
            <span key={i} className="ticker-txt">
              AI MART ✦ CREATE YOUR TRAINER ✦ NEGOTIATE THE MACHINE ✦ 10 ROUNDS ✦ ZERO MERCY ✦&nbsp;
            </span>
          ))}
        </div>
      </div>
    </>
  );
}