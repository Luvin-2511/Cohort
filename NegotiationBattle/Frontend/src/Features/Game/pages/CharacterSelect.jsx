import { useState, useEffect, useRef, useCallback } from "react";
import "../styles/CharacterSelect.css";

// Import images — update paths as needed
import MalFront from "../../../assets/MalFront.png";
import MalBack from "../../../assets/MalBack.png";
import FemFront from "../../../assets/FemFront.png";
import FemBack from "../../../assets/FemBack.png";
import useAuth from "../../Auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

/* ─── Cursor ────────────────────────────────────────────────── */
function Cursor() {
  const curRef = useRef(null);
  const trailRef = useRef(null);
  const pos = useRef({
    mx: window.innerWidth / 2,
    my: window.innerHeight / 2,
    cx: window.innerWidth / 2,
    cy: window.innerHeight / 2,
    // trail lags further behind
    tx: window.innerWidth / 2,
    ty: window.innerHeight / 2,
  });
  const [isBig, setIsBig] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  /* Smooth follow + trail */
  useEffect(() => {
    const onMove = (e) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
    };
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    let raf;
    const tick = () => {
      const p = pos.current;
      // main dot — snappy
      p.cx += (p.mx - p.cx) * 0.13;
      p.cy += (p.my - p.cy) * 0.13;
      // trail ring — lazy
      p.tx += (p.mx - p.tx) * 0.06;
      p.ty += (p.my - p.ty) * 0.06;

      if (curRef.current) {
        curRef.current.style.transform = `translate(${p.cx}px,${p.cy}px) translate(-50%,-50%)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${p.tx}px,${p.ty}px) translate(-50%,-50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Magnetic behaviour for any .magnetic element */
  useEffect(() => {
    const attach = () => {
      document.querySelectorAll(".magnetic").forEach((el) => {
        if (el._cursorBound) return;
        el._cursorBound = true;

        el.addEventListener("mouseenter", () => setIsBig(true));
        el.addEventListener("mouseleave", () => setIsBig(false));

        el.addEventListener("mousemove", (e) => {
          const r = el.getBoundingClientRect();
          const ox = (e.clientX - (r.left + r.width / 2)) * 0.42;
          const oy = (e.clientY - (r.top + r.height / 2)) * 0.42;
          el.style.transition =
            "transform 0.4s cubic-bezier(0.165,0.84,0.44,1)";
          el.style.transform = `translate(${ox}px,${oy}px)`;
        });
        el.addEventListener("mouseleave", () => {
          el.style.transition =
            "transform 0.6s cubic-bezier(0.68,-0.6,0.32,1.6)";
          el.style.transform = "";
        });
      });
    };

    attach();
    const t = setTimeout(attach, 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Trailing ring */}
      <div
        ref={trailRef}
        id="cursor-trail"
        className={isBig ? "big" : ""}
        aria-hidden="true"
      />
      {/* Main dot */}
      <div
        ref={curRef}
        id="cursor"
        className={[isBig ? "big" : "", isClicking ? "clicking" : ""]
          .join(" ")
          .trim()}
        aria-hidden="true"
      />
    </>
  );
}

/* ─── Hacker Text Hook ─────────────────────────────────────── */
const HACK_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*!?<>/\\|[]{}~";

function useHackerText(targetText, trigger) {
  const [display, setDisplay] = useState(targetText);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;
    let iteration = 0;
    const total = targetText.length * 3;
    cancelAnimationFrame(rafRef.current);

    const step = () => {
      setDisplay(
        targetText
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < iteration / 3) return targetText[i];
            return HACK_CHARS[Math.floor(Math.random() * HACK_CHARS.length)];
          })
          .join(""),
      );
      iteration++;
      if (iteration < total) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger, targetText]);

  return display;
}

/* ─── Magnetic Button ───────────────────────────────────────── */
function MagneticButton({ children, className, onClick, disabled }) {
  const btnRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (disabled) return;
    const rect = btnRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({
      x: (e.clientX - cx) * 0.35,
      y: (e.clientY - cy) * 0.35,
    });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  return (
    <button
      ref={btnRef}
      /* 'magnetic' class hooks into the Cursor's magnetic binding */
      className={`mag-btn magnetic ${className || ""}`}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

/* ─── Particle Burst ─────────────────────────────────────────── */
function Particles({ active }) {
  return (
    <div className="particle-field" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className={`particle ${active ? "burst" : ""}`}
          style={{
            "--delay": `${(i * 0.12).toFixed(2)}s`,
            "--angle": `${(i / 18) * 360}deg`,
            "--dist": `${60 + Math.random() * 60}px`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Stat Bar ───────────────────────────────────────────────── */
function StatBar({ label, value, active }) {
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    if (!active) {
      setFilled(0);
      return;
    }
    const t = setTimeout(() => setFilled(value), 100);
    return () => clearTimeout(t);
  }, [active, value]);

  return (
    <div className="stat-row">
      <div className="stat-labels">
        <span className="stat-name">{label}</span>
        <span className="stat-val">{filled}%</span>
      </div>
      <div className="stat-track">
        <div className="stat-fill" style={{ width: `${filled}%` }} />
        <div className="stat-scanline" />
      </div>
    </div>
  );
}

/* ─── Character Data ──────────────────────────────────────────── */
const CHARS_DATA = {
  male: {
    id: "male",
    label: "ALPHA-01",
    cls: "ASSAULT VANGUARD",
    stats: { POWER: 85, AGILITY: 70, ENDURANCE: 80, SYNC: 92 },
    front: MalFront,
    back: MalBack,
  },
  female: {
    id: "female",
    label: "OMEGA-02",
    cls: "TACTICAL GHOST",
    stats: { POWER: 75, AGILITY: 90, ENDURANCE: 70, SYNC: 96 },
    front: FemFront,
    back: FemBack,
  },
};

/* ─── Main Component ─────────────────────────────────────────── */
export default function CharacterSelect() {
  const [flipped, setFlipped] = useState({ male: false, female: false });
  const [launched, setLaunched] = useState(false);
  const [scanline, setScanline] = useState(true);
  const { handleCharacter, user } = useAuth();
  const [active, setActive] = useState(user.character);

  useEffect(() => {
    if (user?.character) {
      setActive(user.character);
    }
  }, [user?.character]);
  
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.character) {
      navigate('/home');
    }
  },[user?.character])


  const charData = active ? CHARS_DATA[active] : null;
  const titleText = useHackerText("SELECT CHARACTER", !!active);
  const nameText = useHackerText(charData?.label || "---", !!active);

  /* Mouse parallax */
  const stageRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: null });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.tx = (e.clientX / window.innerWidth - 0.5) * 14;
      mouse.current.ty = (e.clientY / window.innerHeight - 0.5) * -8;
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.05;
      if (stageRef.current)
        stageRef.current.style.transform = `rotateY(${mouse.current.x}deg) rotateX(${mouse.current.y}deg)`;
      mouse.current.raf = requestAnimationFrame(tick);
    };
    mouse.current.raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(mouse.current.raf);
    };
  }, []);

  /* Keyboard nav */
  useEffect(() => {
    const kd = (e) => {
      // Don't handle keyboard if already has character
      if (user.character) return;

      if (e.key === "ArrowLeft") setActive("male");
      if (e.key === "ArrowRight") setActive("female");
      if (e.key === " " && active) {
        e.preventDefault(); // Prevent page scroll
        setFlipped((f) => ({ ...f, [active]: !f[active] }));
      }
      if (e.key === "Enter" && active && !user.character) {
        e.preventDefault();
        handleCharacter(active);
        setLaunched(true);
      }
    };

    window.addEventListener("keydown", kd);
    return () => window.removeEventListener("keydown", kd);
  }, [active, user.character, handleCharacter]);

  const toggleFlip = (e, id) => {
    e.stopPropagation();
    setFlipped((f) => ({ ...f, [id]: !f[id] }));
  };

  return (
    <>
      {/* Custom cursor — rendered outside viewport so fixed positioning works */}
      <Cursor />

      <div className="viewport">
        {/* CRT scanlines overlay */}
        {scanline && <div className="crt-overlay" aria-hidden="true" />}

        {/* Ambient grid */}
        <div className="grid-floor" aria-hidden="true" />

        {/* Corner decorations */}
        <div className="corner tl" aria-hidden="true" />
        <div className="corner tr" aria-hidden="true" />
        <div className="corner bl" aria-hidden="true" />
        <div className="corner br" aria-hidden="true" />

        {/* Top HUD */}
        <header className="hud-top">
          <div className="hud-line" />
          <div className="hud-center">
            <div className="sys-tag">SYS.v4.2.1</div>
            <h1 className="title">{titleText}</h1>
            <div className="subtitle">
              {active
                ? `TARGET: ${active.toUpperCase()} LOCKED`
                : "AWAITING BIOLOGICAL INPUT"}
            </div>
          </div>
          <div className="hud-line" />
        </header>

        {/* Stage */}
        <div className="scene">
          <div className="stage" ref={stageRef}>
            {Object.values(CHARS_DATA).map((ch) => {
              const isActive = active === ch.id;
              const isFlipped = flipped[ch.id];

              return (
                <div
                  key={ch.id}
                  style={{
                    position: "relative",
                  }}
                  className={`podium-wrapper magnetic ${isActive ? "active" : ""}`}
                  onClick={() => {
                    if (!user?.character) {
                      setActive(ch.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${ch.label}`}
                >
                  {/* Spotlight cone */}
                  <div
                    className={`spotlight ${isActive ? "on" : ""}`}
                    aria-hidden="true"
                  >
                    <Particles active={isActive} />
                  </div>

                  {/* Character image card */}
                  <div className={`char-card ${isFlipped ? "flipped" : ""}`}>
                    <div className="char-face front">
                      <img style={{
                        height: "26rem",
                        width: "26rem",
                      }} src={ch.front} alt={`${ch.label} front`} />
                      <div className="char-glow" aria-hidden="true" />
                    </div>
                    <div className="char-face back">
                      <img src={ch.back} alt={`${ch.label} back`} />
                      <div className="char-glow" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Flip toggle */}
                  <button
                    className={`flip-btn ${isActive ? "visible" : ""}`}
                    onClick={(e) => toggleFlip(e, ch.id)}
                    aria-label="Rotate character"
                  >
                    <span className="flip-icon">↺</span>
                    ROTATE
                  </button>

                  {/* Podium base */}
                  <div className="podium-base">
                    <div className="podium-ring" />
                    <div className="podium-body" />
                    <div className="podium-shadow" aria-hidden="true" />
                  </div>

                  {/* Name tag below podium */}
                  <div className={`name-tag ${isActive ? "lit" : ""}`}>
                    <span className="bracket">[</span>
                    {ch.label}
                    <span className="bracket">]</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats HUD */}
        <aside className={`stats-hud ${active ? "visible" : ""}`}>
          <div className="hud-corner-tl" aria-hidden="true" />
          <div className="stats-inner">
            <div className="char-name">{nameText}</div>
            <div className="char-cls">{charData?.cls || "---"}</div>
            <div className="divider" />
            {charData &&
              Object.entries(charData.stats).map(([k, v]) => (
                <StatBar key={k} label={k} value={v} active={!!active} />
              ))}
          </div>
          <div className="hud-corner-br" aria-hidden="true" />
        </aside>

        {/* Bottom controls */}
        <footer className="hud-bottom">
          <div className="key-hints">
            <span>← → SELECT</span>
            <span>SPACE ROTATE</span>
            <span>ENTER CONFIRM</span>
          </div>

          <MagneticButton
            className={`confirm-btn ${active ? "ready" : ""}`}
            onClick={async () => {
              await handleCharacter(active);
              active && setLaunched(true);
              setTimeout(() => navigate("/home"), 100);
            }}
            disabled={!active}
          >
            <span className="btn-clip" aria-hidden="true" />
            {active ? "DEPLOY PROTOCOL" : "INITIALIZE"}
            <span className="btn-scan" aria-hidden="true" />
          </MagneticButton>

          <div className={`sys-status ${active ? "locked" : ""}`}>
            SYS.STATUS: {active ? "TARGET ACQUIRED" : "STANDBY"}
          </div>
        </footer>

        {/* Launch overlay */}
        <div className={`launch-overlay ${launched ? "active" : ""}`}>
          <div className="launch-ring" />
          <div className="launch-text">LINK START INITIALIZED</div>
          <div className="launch-sub">DEPLOYING {charData?.label}...</div>
        </div>
      </div>
    </>
  );
}
