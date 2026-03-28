import { useState, useEffect, useRef, useCallback } from "react";
import "../styles/CharacterSelect.css";

// Import images — update paths as needed
import MalFront from "../../../assets/MalFront.png";
import MalBack from "../../../assets/MalBack.png";
import FemFront from "../../../assets/FemFront.png";
import FemBack from "../../../assets/FemBack.png";

/* ─── Hacker Text Hook ─────────────────────────────────────────── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*!?<>/\\|[]{}~";

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
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iteration++;
      if (iteration < total) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger, targetText]);

  return display;
}

/* ─── Magnetic Button ───────────────────────────────────────────── */
function MagneticButton({ children, className, onClick, disabled }) {
  const btnRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (disabled) return;
    const rect = btnRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.35;
    const dy = (e.clientY - cy) * 0.35;
    setPos({ x: dx, y: dy });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  return (
    <button
      ref={btnRef}
      className={`mag-btn ${className || ""}`}
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

/* ─── Particle Burst ─────────────────────────────────────────────── */
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

/* ─── Stat Bar ───────────────────────────────────────────────────── */
function StatBar({ label, value, active }) {
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    if (!active) { setFilled(0); return; }
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

/* ─── Character Data ──────────────────────────────────────────────── */
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

/* ─── Main Component ─────────────────────────────────────────────── */
export default function CharacterSelect() {
  const [active, setActive] = useState(null);
  const [flipped, setFlipped] = useState({ male: false, female: false });
  const [launched, setLaunched] = useState(false);
  const [scanline, setScanline] = useState(true);

  const charData = active ? CHARS_DATA[active] : null;
  const titleText = useHackerText("SELECT PROTOCOL", !!active);
  const nameText = useHackerText(charData?.label || "---", !!active);

  // Mouse parallax
  const stageRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: null });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.tx = ((e.clientX / window.innerWidth) - 0.5) * 14;
      mouse.current.ty = ((e.clientY / window.innerHeight) - 0.5) * -8;
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.05;
      if (stageRef.current)
        stageRef.current.style.transform =
          `rotateY(${mouse.current.x}deg) rotateX(${mouse.current.y}deg)`;
      mouse.current.raf = requestAnimationFrame(tick);
    };
    mouse.current.raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(mouse.current.raf);
    };
  }, []);

  // Keyboard nav
  useEffect(() => {
    const kd = (e) => {
      if (e.key === "ArrowLeft") setActive("male");
      if (e.key === "ArrowRight") setActive("female");
      if (e.key === " " && active)
        setFlipped((f) => ({ ...f, [active]: !f[active] }));
      if (e.key === "Enter" && active) setLaunched(true);
    };
    window.addEventListener("keydown", kd);
    return () => window.removeEventListener("keydown", kd);
  }, [active]);

  const toggleFlip = (e, id) => {
    e.stopPropagation();
    setFlipped((f) => ({ ...f, [id]: !f[id] }));
  };

  return (
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
            {active ? `TARGET: ${active.toUpperCase()} LOCKED` : "AWAITING BIOLOGICAL INPUT"}
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
                className={`podium-wrapper ${isActive ? "active" : ""}`}
                onClick={() => setActive(ch.id)}
                role="button"
                tabIndex={0}
                aria-label={`Select ${ch.label}`}
              >
                {/* Spotlight cone */}
                <div className={`spotlight ${isActive ? "on" : ""}`} aria-hidden="true">
                  <Particles active={isActive} />
                </div>

                {/* Character image card */}
                <div className={`char-card ${isFlipped ? "flipped" : ""}`}>
                  <div className="char-face front">
                    <img src={ch.front} alt={`${ch.label} front`} />
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
          onClick={() => active && setLaunched(true)}
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
  );
}