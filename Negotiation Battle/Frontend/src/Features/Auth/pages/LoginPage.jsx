import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "../styles/AuthPages.css";

/* ═══ CONSTANTS ═══ */
const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const BATTLE_LINES = [
  "A wild MERCHANT appears!",
  "MERCHANT: \"Price is firm. $1,200.\"",
  "Your move, negotiator...",
  "MERCHANT uses HARD ANCHOR!",
  "It's not very effective...",
  "You used GUILT TRIP!",
  "MERCHANT's resolve weakens!",
];

const MOVES = [
  { label: "LOGIC STRIKE", type: "NORMAL"  },
  { label: "GUILT TRIP",   type: "PSYCHIC" },
  { label: "FINAL OFFER",  type: "FIRE"    },
  { label: "WALK AWAY",    type: "GHOST"   },
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

/* ═══ Player pixel sprite ═══ */
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
function PixelSprite({ rows, scale = 1 }) {
  const px = 6 * scale;
  return (
    <div style={{ transform: `scale(1)`, imageRendering: "pixelated", lineHeight: 0 }}>
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
  const [lineIdx,   setLineIdx]   = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [activeBtn, setActiveBtn] = useState(0);
  const twRef = useRef(null);

  // Typewriter
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
      typewrite(BATTLE_LINES[idx], () => cycle((idx + 1) % BATTLE_LINES.length));
    };
    cycle(0);
    return () => { stopped = true; clearInterval(twRef.current); };
  }, []);

  // Cycle active move button
  useEffect(() => {
    const iv = setInterval(() => setActiveBtn(b => (b + 1) % MOVES.length), 2800);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="gba-frame">
      {/* Arena */}
      <div className="mini-arena">
        <div className="mini-arena-bg" />
        <div className="mini-hor" />
        <div className="plat-e" />
        <div className="plat-p" />
        <div className="atk-flash" />

        {/* Enemy HUD */}
        <div className="hud-box hud-e">
          <div className="hud-name">
            <span>MERCHANT</span>
            <span className="hud-lv">Lv.42</span>
          </div>
          <div className="hud-track">
            <div className="hud-fill" />
          </div>
          <div className="hud-lbl">HP</div>
        </div>

        {/* Merchant sprite */}
        <div className="sprite-merchant">
          <PixelSprite rows={MERCHANT_ROWS} />
        </div>

        {/* Player sprite */}
        <div className="sprite-player">
          <PixelSprite rows={PLAYER_ROWS} />
        </div>

        {/* Player HUD */}
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

      {/* Dialog */}
      <div className="battle-msg">
        <div className="btag">// BATTLE LOG</div>
        <div className="btext">
          {displayed}
          <span className="bcur" />
        </div>
        <div className="barr">▼</div>
      </div>

      {/* Moves */}
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

/* ═══ Field ═══ */
function Field({ label, type, name, value, onChange, placeholder, error, autoComplete }) {
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

/* ═══ LOGIN PAGE ═══ */
export default function LoginPage() {
  const [form,   setForm]   = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.email.trim())                       e.email    = "EMAIL IS REQUIRED";
    else if (!/\S+@\S+\.\S+/.test(form.email))   e.email    = "INVALID EMAIL FORMAT";
    if (!form.password)                            e.password = "PASSWORD IS REQUIRED";
    else if (form.password.length < 6)             e.password = "MIN 6 CHARACTERS";
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    // TODO: call POST /api/auth/login
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
              <div className="left-tagline-ey">SEASON 1 · LIVE</div>
              <div className="left-tagline-title">
                OUT<br />
                <span className="left-tagline-acc">NEGOTIATE</span><br />
                THE AI.
              </div>
            </div>

            <BattlePreview />
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="auth-right">
          <div className="form-card">
            <div className="form-inner">
              <div className="form-topbar">// PLAYER AUTHENTICATION</div>

              <div className="form-heading">
                ENTER<br />
                <span className="acc">ARENA</span>
              </div>
              <p className="form-sub">
                Welcome back, negotiator.<br />Your leaderboard spot awaits.
              </p>

              <form onSubmit={onSubmit} noValidate>
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
                  autoComplete="current-password"
                />

                <button
                  type="submit"
                  className="submit-btn magnetic"
                  disabled={loading}
                >
                  <span>
                    {loading && <span className="spinner" />}
                    {loading ? "AUTHENTICATING..." : "⚔ START DEAL"}
                  </span>
                </button>
              </form>

              <div className="form-divider">
                <span>OR</span>
              </div>

              <div className="switch-link">
                No account?&nbsp;
                <Link to="/register">CREATE TRAINER</Link>
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
              AI MART ✦ ENTER THE ARENA ✦ NEGOTIATE THE MACHINE ✦ 10 ROUNDS ✦ GLOBAL LEADERBOARD ✦&nbsp;
            </span>
          ))}
        </div>
      </div>
    </>
  );
}