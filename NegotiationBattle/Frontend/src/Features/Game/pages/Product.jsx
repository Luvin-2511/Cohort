import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Product.css";
import { rawProducts } from "../utils/Product";

import Cam from "../../../assets/cam.png";
import Head from "../../../assets/head.png";
import Watch from "../../../assets/watch.png";
import Laptop from "../../../assets/laptop.png";
import Phone from "../../../assets/phone.png";
import { setCurrentProduct } from "../slices/game.slice";
import { useDispatch } from "react-redux";

// ── Map raw product data → UI shape ──────────────────────────────────────────
// Images assigned in the same order as the source array
const ICONS = [Laptop, Head, Cam, Watch, Phone];

// Derive three stat bars from the fields we have
function deriveStats(p) {
  const personalityScore =
    { stubborn: 88, emotional: 74, flexible: 62 }[p.personality] ?? 70;
  // value score: cheaper items score higher relativity (log-inverse)
  const valueScore = Math.round(
    Math.min(100, Math.max(30, 100 - Math.log10(p.listPrice) * 18)),
  );
  // stamina: maxRounds / 10 × 100
  const staminaScore = Math.round((p.maxRounds / 10) * 100);
  return [
    { label: "Seller Stubbornness", value: personalityScore },
    { label: "Item Value", value: valueScore },
    { label: "Battle Stamina", value: staminaScore },
  ];
}

function deriveCategory(p) {
  const d = p.description.toLowerCase();
  if (d.includes("camera") || d.includes("lens")) return "Optical Gear";
  if (d.includes("laptop") || d.includes("macbook")) return "Computing";
  if (d.includes("watch")) return "Wearables";
  if (d.includes("jacket") || d.includes("leather")) return "Apparel";
  if (d.includes("pc") || d.includes("rtx") || d.includes("ryzen"))
    return "Gaming Rig";
  return "Electronics";
}

const products = rawProducts.map((p, i) => ({
  id: i,
  rawId: p.id,
  icon: ICONS[i % ICONS.length],
  name: p.name,
  category: deriveCategory(p),
  description: p.description,
  price: `$${p.listPrice.toLocaleString()}`,
  personality: p.personality,
  maxRounds: p.maxRounds,
  stats: deriveStats(p),
}));

// ── Custom Cursor ─────────────────────────────────────────────────────────────
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({
    mx: window.innerWidth / 2,
    my: window.innerHeight / 2,
    cx: window.innerWidth / 2,
    cy: window.innerHeight / 2,
    rx: window.innerWidth / 2,
    ry: window.innerHeight / 2,
  });
  const [isBig, setIsBig] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

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
      p.cx += (p.mx - p.cx) * 0.14;
      p.cy += (p.my - p.cy) * 0.14;
      p.rx += (p.mx - p.rx) * 0.07;
      p.ry += (p.my - p.ry) * 0.07;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${p.cx}px,${p.cy}px) translate(-50%,-50%)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${p.rx}px,${p.ry}px) translate(-50%,-50%)`;
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

  useEffect(() => {
    const attach = () => {
      document.querySelectorAll(".cur-magnetic").forEach((el) => {
        if (el._curBound) return;
        el._curBound = true;
        el.addEventListener("mouseenter", () => setIsBig(true));
        el.addEventListener("mouseleave", () => setIsBig(false));
      });
    };
    attach();
    const t = setTimeout(attach, 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className={`cur-ring${isBig ? " big" : ""}`}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className={`cur-dot${isBig ? " big" : ""}${isClicking ? " click" : ""}`}
        aria-hidden="true"
      />
    </>
  );
}

// ── Key Hint ──────────────────────────────────────────────────────────────────
function KeyHint({ keys, label, pulse = false }) {
  return (
    <div className={`key-hint${pulse ? " pulse" : ""}`}>
      <div className="key-pills">
        {keys.map((k) => (
          <span key={k} className="key-pill">
            {k}
          </span>
        ))}
      </div>
      <span className="key-label">{label}</span>
    </div>
  );
}

// ── Controls HUD ──────────────────────────────────────────────────────────────
function ControlsHUD({ onPrev, onNext, activeIndex, total }) {
  return (
    <div className="controls-hud">
      <button
        className={`hud-arrow-btn cur-magnetic${activeIndex === 0 ? " disabled" : ""}`}
        onClick={onPrev}
        disabled={activeIndex === 0}
        aria-label="Previous"
      >
        <span className="hud-arrow-inner">
          <span className="hud-arrow-icon">◄</span>
        </span>
      </button>

      <div className="hud-center-hints">
        <KeyHint keys={["◄", "►"]} label="NAVIGATE" />
        <div className="hud-divider" />
        <KeyHint keys={["ENTER"]} label="SELECT" pulse />
        <div className="hud-divider" />
        <div className="hud-progress">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`hud-dot${i === activeIndex ? " active" : ""}`}
            />
          ))}
        </div>
      </div>

      <button
        className={`hud-arrow-btn cur-magnetic${activeIndex === total - 1 ? " disabled" : ""}`}
        onClick={onNext}
        disabled={activeIndex === total - 1}
        aria-label="Next"
      >
        <span className="hud-arrow-inner">
          <span className="hud-arrow-icon">►</span>
        </span>
      </button>
    </div>
  );
}

// ── StatBar ───────────────────────────────────────────────────────────────────
function StatBar({ label, value, animate }) {
  const [displayVal, setDisplayVal] = useState(0);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    if (!animate) return;
    setBarWidth(0);
    setDisplayVal(0);
    const t = setTimeout(() => {
      setBarWidth(value);
      let count = 0;
      const iv = setInterval(() => {
        count += Math.ceil(value / 15);
        if (count >= value) {
          count = value;
          clearInterval(iv);
        }
        setDisplayVal(count);
      }, 30);
      return () => clearInterval(iv);
    }, 300);
    return () => clearTimeout(t);
  }, [value, animate]);

  return (
    <div className="stat-row">
      <div className="stat-label">
        <span>{label}</span>
        <span>{displayVal}%</span>
      </div>
      <div className="stat-bar-bg">
        <div className="stat-bar-fill" style={{ width: `${barWidth}%` }} />
      </div>
    </div>
  );
}

// ── PodiumItem ────────────────────────────────────────────────────────────────
function PodiumItem({ product, style, isActive, onClick, spotlightRef }) {
  return (
    <div
      className={`podium-wrapper cur-magnetic${isActive ? " is-active" : ""}`}
      style={style}
      onClick={onClick}
    >
      <div className="spotlight" ref={spotlightRef} />
      <div className="product-graphic">
        <img className="product-image" src={product.icon} alt={product.name} />
      </div>
      <div className="podium-base">
        <div className="podium-top" />
        <div className="podium-body" />
        <div className="podium-glow" />
      </div>
    </div>
  );
}

// ── DetailsPanel ─────────────────────────────────────────────────────────────
function DetailsPanel({ product, visible, onBuy }) {
  const [animateStats, setAnimateStats] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setAnimateStats(false);
    const t = setTimeout(() => setAnimateStats(true), 400);
    return () => clearTimeout(t);
  }, [product]);

  const badgeColor =
    { stubborn: "#e05252", emotional: "#e0a952", flexible: "#52c4e0" }[
      product.personality
    ] ?? "var(--theme)";

  return (
    <div className={`details-panel${visible ? " visible" : ""}`}>
      <div className="info-left">
        <div className="prod-category">{product.category}</div>
        <div className="prod-name">{product.name}</div>
        <div className="prod-price">{product.price}</div>
        <div className="prod-desc">{product.description}</div>
        <div
          className="prod-personality"
          style={{ "--badge-color": badgeColor }}
        >
          <span className="personality-dot" />
          {product.personality.toUpperCase()} SELLER
        </div>
      </div>

      <div className="info-right">
        {product.stats.map((s) => (
          <StatBar
            key={s.label}
            label={s.label}
            value={s.value}
            animate={animateStats && visible}
          />
        ))}
      </div>

      <div className="action-row">
        <div className="panel-key-hint">
          <span className="key-pill sm">ENTER</span>
          <span className="panel-key-label">to confirm</span>
        </div>
        <button
          className="buy-btn cur-magnetic"
          onClick={() => {
            onBuy();
          }}
        >
          Begin the battle
        </button>
      </div>
    </div>
  );
}

// ── TransitionOverlay ─────────────────────────────────────────────────────────
function TransitionOverlay({ active, complete }) {
  return (
    <div className={`overlay${active ? " active" : ""}`}>
      <div>
        {!complete && <div className="cart-loader" />}
        <div className="cart-text">
          {complete ? "BATTLE INITIALISED." : "PREPARING ARENA..."}
        </div>
      </div>
    </div>
  );
}

// ── HardwareTerminal ──────────────────────────────────────────────────────────
export default function HardwareTerminal() {
  const totalItems = products.length;
  const currentIndexRef = useRef(2);
  const [targetIndex, setTargetIndex] = useState(2);
  const [activeIndex, setActiveIndex] = useState(2);
  const [itemStyles, setItemStyles] = useState(() =>
    products.map(() => ({ transform: "", zIndex: 0, opacity: 1 })),
  );
  const nav = useNavigate();
  const [sceneTransform, setSceneTransform] = useState("");
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const lerpedRef = useRef(
    products.map(() => ({ x: 0, z: 0, rotY: 0, scale: 1 })),
  );
  const spotlightRefs = useRef(products.map(() => ({ current: null })));
  const particleIntervalRef = useRef(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);
  const [overlayComplete, setOverlayComplete] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPanelVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const createParticle = useCallback((el) => {
    if (!el) return;
    const p = document.createElement("div");
    p.className = "particle";
    const s = Math.random() * 4 + 2;
    p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random() * 100}%;bottom:0`;
    el.appendChild(p);
    const anim = p.animate(
      [
        { transform: "translateY(0) scale(1)", opacity: 0.8 },
        {
          transform: `translateY(-${Math.random() * 300 + 400}px) scale(0)`,
          opacity: 0,
        },
      ],
      {
        duration: Math.random() * 2000 + 2000,
        easing: "cubic-bezier(0.25,0.46,0.45,0.94)",
      },
    );
    anim.onfinish = () => p.remove();
  }, []);

  const manageParticles = useCallback(
    (idx) => {
      clearInterval(particleIntervalRef.current);
      const ref = spotlightRefs.current[idx];
      if (ref?.current)
        particleIntervalRef.current = setInterval(
          () => createParticle(ref.current),
          250,
        );
    },
    [createParticle],
  );

  useEffect(() => {
    let rafId,
      lastActive = -1;
    const loop = () => {
      currentIndexRef.current += (targetIndex - currentIndexRef.current) * 0.1;
      const m = mouseRef.current;
      m.x += (m.tx - m.x) * 0.05;
      m.y += (m.ty - m.y) * 0.05;
      setSceneTransform(`rotateY(${m.x * 10}deg) rotateX(${m.y * -5}deg)`);

      const rounded = Math.round(currentIndexRef.current);
      if (rounded !== lastActive) {
        lastActive = rounded;
        setActiveIndex(rounded);
        setPanelVisible(false);
        setTimeout(() => setPanelVisible(true), 50);
        manageParticles(rounded);
      }

      const mob = window.innerWidth <= 768;
      const newStyles = products.map((_, i) => {
        const off = i - currentIndexRef.current;
        const abs = Math.abs(off);
        const l = lerpedRef.current[i];
        l.x += (off * (mob ? 120 : 250) - l.x) * 0.1;
        l.z += (abs * (mob ? -150 : -250) - l.z) * 0.1;
        l.rotY += (off * (mob ? -30 : -45) - l.rotY) * 0.1;
        l.scale += (Math.max(1 - abs * 0.15, 0.5) - l.scale) * 0.1;
        return {
          transform: `translateX(${l.x}px) translateZ(${l.z}px) rotateY(${l.rotY}deg) scale(${l.scale})`,
          zIndex: Math.round(100 - abs * 10),
          opacity: Math.max(1 - abs * 0.4, 0.1),
        };
      });
      setItemStyles(newStyles);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(particleIntervalRef.current);
    };
  }, [targetIndex, manageParticles]);

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  const dispatch = useDispatch();

  const navigate = useCallback(
    (dir) => {
      setTargetIndex((p) => Math.max(0, Math.min(totalItems - 1, p + dir)));
    },
    [totalItems],
  );

  const startBattle = useCallback(() => {
    const product = products[activeIndex]
    setOverlayActive(true);
    setOverlayComplete(false);
    setTimeout(() => {
      setOverlayComplete(true);
      setTimeout(() => {
        dispatch(setCurrentProduct(product.rawId));
        nav(`/battle/${product.rawId}`);
      }, 2000);
    }, 2000);
  }, [activeIndex,nav]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "Enter") startBattle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, startBattle]);

  return (
    <>
      <Cursor />
      <div className="viewport">
        <div className="grid-floor" />

        <div className="scene" style={{ transform: sceneTransform }}>
          <div className="carousel">
            {products.map((prod, i) => {
              if (!spotlightRefs.current[i])
                spotlightRefs.current[i] = { current: null };
              return (
                <PodiumItem
                  key={prod.rawId}
                  product={prod}
                  style={itemStyles[i]}
                  isActive={activeIndex === i}
                  onClick={() => setTargetIndex(i)}
                  spotlightRef={(el) => {
                    spotlightRefs.current[i] = { current: el };
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="ui-layer">
          <div className="header">
            <h1 className="title">
              Select a product to proceed for the battle
            </h1>
            <div className="subtitle">Choose your negotiation target</div>
          </div>
          <DetailsPanel
            product={products[activeIndex]}
            visible={panelVisible}
            onBuy={startBattle}
          />
        </div>

        <ControlsHUD
          onPrev={() => navigate(-1)}
          onNext={() => navigate(1)}
          activeIndex={activeIndex}
          total={totalItems}
        />

        <TransitionOverlay active={overlayActive} complete={overlayComplete} />
      </div>
    </>
  );
}
