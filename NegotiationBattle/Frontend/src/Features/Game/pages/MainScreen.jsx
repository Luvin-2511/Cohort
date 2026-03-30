import { useEffect, useRef, useState, useCallback } from "react";
import "../styles/MainScreen.css"
import { useNavigate } from "react-router-dom";

// ── Constants ─────────────────────────────────────────────────────────────────
const HACK_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&!?<>/\\|[]{}";
const MENU_ITEMS = [
  { label: "START BATTLE", action: "start" },
  { label: "OPTIONS",      action: "options" },
  { label: "ABOUT",        action: "about" },
];

// ── useHackerText ─────────────────────────────────────────────────────────────
// Returns a displayed string that scrambles then resolves to `text`.
function useHackerText(text, { trigger = true, speed = 40, delay = 0 } = {}) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef(null);

  const scramble = useCallback(() => {
    let iteration = 0;
    const totalFrames = text.length * 3; // frames to fully reveal

    const tick = () => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " " || char === "\n") return char;
            if (i < Math.floor(iteration / 3)) return text[i];
            return HACK_CHARS[Math.floor(Math.random() * HACK_CHARS.length)];
          })
          .join("")
      );

      iteration++;
      if (iteration <= totalFrames) {
        rafRef.current = setTimeout(tick, speed);
      }
    };

    rafRef.current = setTimeout(tick, delay);
  }, [text, speed, delay]);

  useEffect(() => {
    if (!trigger) return;
    scramble();
    return () => clearTimeout(rafRef.current);
  }, [trigger, scramble]);

  return { display, rescramble: scramble };
}

// ── HackerTitle ───────────────────────────────────────────────────────────────
function HackerTitle() {
  const line1 = useHackerText("THE NEGOTIATION", { speed: 35, delay: 300 });
  const line2 = useHackerText("BATTLE",          { speed: 35, delay: 900 });

  return (
    <h1 className="main-title" data-text={`THE NEGOTIATION\nBATTLE`}>
      {line1.display}
      <br />
      <span className="title-highlight">{line2.display}</span>
    </h1>
  );
}

// ── SysStatus ─────────────────────────────────────────────────────────────────
function SysStatus() {
  const { display } = useHackerText("SYSTEM READY", { speed: 50, delay: 0 });
  return <div className="sys-status">{display}</div>;
}

// ── useMagnetic ───────────────────────────────────────────────────────────────
// Returns ref + inline style for a magnetic pull effect.
function useMagnetic(strength = 0.35) {
  const wrapperRef = useRef(null);
  const [btnStyle, setBtnStyle]  = useState({});
  const [dotStyle, setDotStyle]  = useState({ left: "50%", top: "50%" });

  const onMouseMove = useCallback(
    (e) => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      setBtnStyle({ transform: `translate(${dx * strength}px, ${dy * strength}px)` });
      // Move the dot to cursor-relative position inside the element
      setDotStyle({
        left: `${e.clientX - rect.left}px`,
        top:  `${e.clientY - rect.top}px`,
      });
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    setBtnStyle({ transform: "translate(0px, 0px)" });
  }, []);

  return { wrapperRef, btnStyle, dotStyle, onMouseMove, onMouseLeave };
}

// ── MagneticMenuBtn ───────────────────────────────────────────────────────────
function MagneticMenuBtn({ label, isActive, onHover, onClick }) {
  const { wrapperRef, btnStyle, dotStyle, onMouseMove, onMouseLeave } = useMagnetic(0.3);
  const { display, rescramble } = useHackerText(label, { trigger: false });

  // Scramble on hover
  const handleMouseEnter = () => {
    onHover();
    rescramble();
  };

  return (
    <div
      className="magnetic-wrapper"
      ref={wrapperRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Magnetic follower dot */}
      <div
        className="magnetic-dot"
        style={dotStyle}
      />

      <button
        className={`menu-btn${isActive ? " active" : ""}`}
        style={btnStyle}
        onClick={onClick}
      >
        <span className="btn-text">{display}</span>
        <span className="btn-decorator">◄</span>
      </button>
    </div>
  );
}

// ── DataParticles ─────────────────────────────────────────────────────────────
function useDataParticles(viewportRef, active) {
  useEffect(() => {
    if (!active) return;

    const spawn = () => {
      const container = viewportRef.current;
      if (!container) return;

      const p = document.createElement("div");
      p.className = "data-particle";

      const height   = Math.random() * 40 + 10;
      const left     = Math.random() * 100;
      const duration = (Math.random() * 2 + 1) * 1000;

      p.style.height = `${height}px`;
      p.style.left   = `${left}%`;
      container.appendChild(p);

      const anim = p.animate(
        [
          { transform: "translateY(0)",     opacity: 0 },
          { opacity: Math.random() * 0.5 + 0.2, offset: 0.1 },
          { opacity: Math.random() * 0.5 + 0.2, offset: 0.9 },
          { transform: "translateY(-100vh)", opacity: 0 },
        ],
        { duration, easing: "linear" }
      );

      anim.onfinish = () => p.remove();
    };

    const id = setInterval(() => {
      if (Math.random() > 0.3) spawn();
    }, 100);

    return () => clearInterval(id);
  }, [active, viewportRef]);
}

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

// ── NegotiationBattle (main) ──────────────────────────────────────────────────
export default function NegotiationBattle() {
  const [activeIndex,    setActiveIndex]    = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [overlayState,   setOverlayState]   = useState("idle"); // idle | flash | fade-black
  const navigate = useNavigate();

  const uiRef      = useRef(null);
  const viewportRef = useRef(null);

  // Mouse parallax
  const mouseRef  = useRef({ tx: 0, ty: 0, x: 0, y: 0 });
  const [uiTransform, setUiTransform] = useState("");

  // Particles (disabled during transition)
  useDataParticles(viewportRef, !isTransitioning);

  // ── Parallax RAF ──────────────────────────────────────────────────────────
  useEffect(() => {
    let rafId;
    const loop = () => {
      if (!isTransitioning) {
        const m = mouseRef.current;
        m.x += (m.tx - m.x) * 0.05;
        m.y += (m.ty - m.y) * 0.05;
        setUiTransform(`rotateY(${m.x * 10}deg) rotateX(${m.y * -10}deg)`);
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [isTransitioning]);

  // ── Mouse tracking ────────────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e) => {
      if (isTransitioning) return;
      mouseRef.current.tx = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseRef.current.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [isTransitioning]);

  // ── Keyboard navigation ───────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (isTransitioning) return;
      if (e.key === "ArrowDown" || e.key === "s") {
        setActiveIndex((p) => (p + 1) % MENU_ITEMS.length);
      } else if (e.key === "ArrowUp" || e.key === "w") {
        setActiveIndex((p) => (p - 1 + MENU_ITEMS.length) % MENU_ITEMS.length);
      } else if (e.key === "Enter") {
        executeAction(MENU_ITEMS[activeIndex].action);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTransitioning, activeIndex]);

  // ── Action ────────────────────────────────────────────────────────────────
 const executeAction = (action) => {
  if (isTransitioning) return;

  if (action === "start") {
    setIsTransitioning(true);
    setOverlayState("flash");

    setTimeout(() => {
      setOverlayState("fade-black");
    }, 150);
    setTimeout(() => {
      navigate("/product");
    }, 800);
  }
};

  // ── Overlay class ──────────────────────────────────────────────────────────
  const overlayClass =
    overlayState === "flash"      ? "start-overlay flash"
    : overlayState === "fade-black" ? "start-overlay fade-black"
    : "start-overlay";

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="viewport" ref={viewportRef}>
      <Cursor />
      {/* Environment */}
      <div className="grid-floor" />
      <div className="core-glow" />
      <div className="ring-container">
        <div className="ring" />
        <div className="ring" />
        <div className="ring" />
      </div>
      <div className="scanlines" />

      {/* Main UI */}
      <div
        className={`ui-container${isTransitioning ? " zooming" : ""}`}
        ref={uiRef}
        style={{ transform: isTransitioning ? undefined : uiTransform }}
      >
        <div className="header-group">
          <SysStatus />
          <HackerTitle />
        </div>

        <nav className="nav-menu">
          {MENU_ITEMS.map((item, i) => (
            <MagneticMenuBtn
              key={item.action}
              label={item.label}
              isActive={activeIndex === i}
              onHover={() => setActiveIndex(i)}
              onClick={() => executeAction(item.action)}
            />
          ))}
        </nav>
      </div>

      {/* Footer */}
      <footer className="footer-info">
        <span>VERSION 2.4.9 // OMEGA PROTOCOL</span>
        <span>USE ARROW KEYS &amp; ENTER TO NAVIGATE</span>
      </footer>

      {/* Transition Overlay */}
      <div className={overlayClass}>
        <div className="loading-text">INITIALIZING COMBAT ARENA...</div>
      </div>
    </div>
  );
}