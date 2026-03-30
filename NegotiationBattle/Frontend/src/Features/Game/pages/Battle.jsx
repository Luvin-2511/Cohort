import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import "../styles/battle.css";
import useAuth from "../../Auth/hooks/useAuth";

/* ── product images ── */
import ImgCam from "../../../assets/cam.png";
import ImgHead from "../../../assets/head.png";
import laptop from "../../../assets/laptop.png";
import ImgWatch from "../../../assets/watch.png";
import ImgPhone from "../../../assets/phone.png";

import ImgStubborn from "../../../assets/sellers/stubborn.png";
import ImgEmotional from "../../../assets/sellers/emotional.png";
import ImgFlexible from "../../../assets/sellers/flexible.png";

import ImgMale from "../../../assets/MalBack.png";
import ImgFemale from "../../../assets/FemBack.png";
import playerImg1 from "../../../assets/MalFront.png";
import useGame from "../hooks/useGame";

/* ═══ PRODUCTS ═══ */
export const rawProducts = [
  {
    id: "neon-pro-2019",
    name: "Neon Pro 2019",
    description: "15-inch, Core i9, 16GB RAM, 512GB SSD. Minor scratches on lid.",
    listPrice: 1200,
    personality: "stubborn",
    maxRounds: 10,
    image: laptop,
  },
  {
    id: "neon-headphone",
    name: "Neon Headphone",
    description: "Active noise cancelling headphones with pure beat.",
    listPrice: 450,
    personality: "emotional",
    maxRounds: 10,
    image: ImgHead,
  },
  {
    id: "neon-a7iii",
    name: "Neon A7III Camera",
    description: "Full-frame mirrorless, 24MP, with 28-70mm kit lens. 2000 shutter count.",
    listPrice: 1800,
    personality: "stubborn",
    maxRounds: 10,
    image: ImgCam,
  },
  {
    id: "neon-watch",
    name: "Neon 59 Watch",
    description: "Watch the right time at the right moment.",
    listPrice: 2200,
    personality: "flexible",
    maxRounds: 10,
    image: ImgWatch,
  },
  {
    id: "neon-homage",
    name: "Neon Deepset Phone",
    description: "Change the way you see your content.",
    listPrice: 800,
    personality: "emotional",
    maxRounds: 10,
    image: ImgPhone,
  },
];

/* derive game values from listPrice */
const buildProduct = (raw) => ({
  ...raw,
  minPrice: Math.round(raw.listPrice * 0.5),     // AI kabhi isse neeche nahi jaayega
  targetPrice: Math.round(raw.listPrice * 0.65), // itna neeche aane par victory
});

/* ═══ PERSONALITIES ═══ */
const PERSONALITIES = {
  stubborn: {
    label: "STUBBORN",
    color: "#ff3a3a",
    desc: "Holds firm. Rarely moves.",
    sellerImage: ImgStubborn,
  },
  emotional: {
    label: "EMOTIONAL",
    color: "#ff9f1c",
    desc: "Responds to rapport.",
    sellerImage: ImgEmotional,
  },
  flexible: {
    label: "FLEXIBLE",
    color: "#00e676",
    desc: "Open to logic and data.",
    sellerImage: ImgFlexible,
  },
};

const SPARK_COLORS = ["#f0a500", "#fff", "#ff6b00", "#ffd700", "#ff4444", "#ffaa00", "#00e676"];
const fmt = (n) => `$${Number(n).toLocaleString()}`;

function hpCls(pct) {
  return pct > 50 ? "g" : pct > 25 ? "y" : "r";
}
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/* ═══ CURSOR ═══ */
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ mx: 0, my: 0, cx: 0, cy: 0, rx: 0, ry: 0 });
  const [big, setBig] = useState(false);
  const [clk, setClk] = useState(false);

  useEffect(() => {
    pos.current = {
      mx: window.innerWidth / 2,
      my: window.innerHeight / 2,
      cx: window.innerWidth / 2,
      cy: window.innerHeight / 2,
      rx: window.innerWidth / 2,
      ry: window.innerHeight / 2,
    };
    const mv = (e) => { pos.current.mx = e.clientX; pos.current.my = e.clientY; };
    const md = () => setClk(true);
    const mu = () => setClk(false);
    window.addEventListener("mousemove", mv);
    window.addEventListener("mousedown", md);
    window.addEventListener("mouseup", mu);
    let raf;
    const tick = () => {
      const p = pos.current;
      p.cx += (p.mx - p.cx) * 0.14;
      p.cy += (p.my - p.cy) * 0.14;
      p.rx += (p.mx - p.rx) * 0.07;
      p.ry += (p.my - p.ry) * 0.07;
      if (dot.current) dot.current.style.transform = `translate(${p.cx}px,${p.cy}px) translate(-50%,-50%)`;
      if (ring.current) ring.current.style.transform = `translate(${p.rx}px,${p.ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", mv);
      window.removeEventListener("mousedown", md);
      window.removeEventListener("mouseup", mu);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const at = () =>
      document.querySelectorAll(".cmag").forEach((el) => {
        if (el._b) return;
        el._b = true;
        el.addEventListener("mouseenter", () => setBig(true));
        el.addEventListener("mouseleave", () => setBig(false));
      });
    at();
    const t = setTimeout(at, 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <div ref={ring} className={`c-ring${big ? " big" : ""}`} aria-hidden />
      <div ref={dot} className={`c-dot${big ? " big" : ""}${clk ? " clk" : ""}`} aria-hidden />
    </>
  );
}

/* ═══ HP BAR ═══ */
function HpBar({ val, max, type = "buyer" }) {
  const pct = Math.max(0, (val / max) * 100);
  const cls = type === "seller" ? "seller-fill" : hpCls(pct);
  return (
    <div className="hp-track">
      <div className={`hp-fill ${cls}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ═══ SPARKS ═══ */
function Sparks({ list }) {
  return list.map(({ id, x, y }) =>
    [...Array(14)].map((_, i) => {
      const ang = (i / 14) * 360 + Math.random() * 12;
      const d = 50 + Math.random() * 70;
      return (
        <div
          key={`${id}-${i}`}
          className="spark"
          style={{
            left: x,
            top: y,
            width: i % 3 === 0 ? 10 : 5,
            height: i % 3 === 0 ? 10 : 5,
            borderRadius: i % 2 === 0 ? "50%" : "1px",
            background: SPARK_COLORS[i % SPARK_COLORS.length],
            "--dx": `${Math.cos((ang * Math.PI) / 180) * d}px`,
            "--dy": `${Math.sin((ang * Math.PI) / 180) * d - 28}px`,
            animationDelay: `${i * 0.02}s`,
          }}
        />
      );
    }),
  );
}

/* ═══ FIGHTER IMAGE ═══ */
function FighterImage({ src, alt, className, style }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div className={`fighter-img-fallback ${className || ""}`} style={style}>
        {alt?.[0]?.toUpperCase() ?? "?"}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={`fighter-img ${className || ""}`}
      style={style}
      onError={() => setErrored(true)}
      draggable={false}
    />
  );
}

/* ═══ MAIN COMPONENT ═══ */
export default function BattleArena() {
  const { productId } = useParams();
  const rawProduct = rawProducts.find((p) => p.id === productId) || rawProducts[0];
  const product = buildProduct(rawProduct);
  const personality = PERSONALITIES[product.personality] || PERSONALITIES.stubborn;

  const [price, setPrice] = useState(product.listPrice);
  const [sellerHp, setSellerHp] = useState(100);
  const [buyerHp, setBuyerHp] = useState(100);
  const [round, setRound] = useState(1);
  const [phase, setPhase] = useState("INTRO");
  const [endType, setEndType] = useState(null);
  const [shown, setShown] = useState("");
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [priceAnim, setPriceAnim] = useState("");
  const [shaking, setShaking] = useState(false);
  const [splash, setSplash] = useState("show");
  const [sparks, setSparks] = useState([]);
  const [flashes, setFlashes] = useState([]);
  const [turnLabel, setTurnLabel] = useState({ text: "", show: false, color: "#fff" });

  const sparkId = useRef(0);
  const flashId = useRef(0);
  const tymerRef = useRef(null);
  const inputRef = useRef(null);
  const priceRef = useRef(product.listPrice);
  const roundRef = useRef(1);

  /* ── typewriter ── */
  const type = useCallback(
    (text) =>
      new Promise((resolve) => {
        setTyping(true);
        setShown("");
        let i = 0;
        clearInterval(tymerRef.current);
        tymerRef.current = setInterval(() => {
          i++;
          setShown(text.slice(0, i));
          if (i >= text.length) {
            clearInterval(tymerRef.current);
            setTyping(false);
            resolve();
          }
        }, 16);
      }),
    [],
  );

  const burst = useCallback((x, y) => {
    const id = sparkId.current++;
    setSparks((s) => [...s, { id, x, y }]);
    setTimeout(() => setSparks((s) => s.filter((p) => p.id !== id)), 800);
  }, []);

  const flash = useCallback((color, dur = 220) => {
    const id = flashId.current++;
    setFlashes((f) => [...f, { id, color }]);
    setTimeout(() => setFlashes((f) => f.filter((p) => p.id !== id)), dur);
  }, []);

  const shake = useCallback(() => {
    setShaking(true);
    setTimeout(() => setShaking(false), 420);
  }, []);

  const showTurn = useCallback(
    (text, color) =>
      new Promise((resolve) => {
        setTurnLabel({ text, color, show: true });
        setTimeout(() => {
          setTurnLabel((t) => ({ ...t, show: false }));
          resolve();
        }, 1200);
      }),
    [],
  );

  const popPrice = useCallback((dir) => {
    setPriceAnim(dir === "down" ? "pop-down" : "pop-up");
    setTimeout(() => setPriceAnim(""), 400);
  }, []);

  /* ── INTRO ── */
  useEffect(() => {
    (async () => {
      await sleep(1600);
      setSplash("fade");
      await sleep(800);
      setSplash("gone");
      await sleep(300);
      await type(
        `Welcome, NEGOTIATOR.\n\nYour target: ${product.name}\n${product.description}\nListed at ${fmt(product.listPrice)} — negotiate it down.\nSeller personality: ${personality.label}\n\nUse logic, data, empathy — or cold hard offers.\nGood luck.`,
      );
      setPhase("IDLE");
    })();
    return () => clearInterval(tymerRef.current);
  }, []);

  useEffect(() => {
    if (phase === "IDLE") inputRef.current?.focus();
  }, [phase]);

  /* ── SEND ── */
  const { handleAiResponse, allMsg, loading } = useGame();

  const send = useCallback(async () => {
    const msg = input.trim();
    if (!msg || phase !== "IDLE") return;

    setInput("");
    setPhase("BUSY");

    const priceBeforeAi = priceRef.current;
    const currentRound = roundRef.current;

    // Show player message first
    await type(`NEGOTIATOR:\n"${msg}"`);
    await sleep(600);

    // Fetch AI response
    const response = await handleAiResponse(allMsg, product.id, msg);
    const aiReply = response.response.reply;
    const aiPrice = response.response.offeredPrice;

    // Clamp aiPrice — never below minPrice, never above current price
    const clampedPrice = Math.max(product.minPrice, Math.min(priceBeforeAi, aiPrice));

    // Show seller response
    await showTurn("🤖 SELLER RESPONDS", personality.color);
    await type(`SELLER:\n"${aiReply}"`);

    // Update price
    setPrice(clampedPrice);
    priceRef.current = clampedPrice;
    popPrice(clampedPrice < priceBeforeAi ? "down" : "up");

    burst("65%", "42%");
    flash("rgba(240,165,0,.25)", 180);
    shake();

    // Increment round
    const nextRound = currentRound + 1;
    setRound(nextRound);
    roundRef.current = nextRound;

    await sleep(400);

    // Check win condition — seller dropped to target or below
    if (clampedPrice <= product.targetPrice) {
      const savings = product.listPrice - clampedPrice;
      await type(
        `The seller gives in!\n\n✅ DEAL ACCEPTED at ${fmt(clampedPrice)}\nYou saved ${fmt(savings)} (${Math.round((savings / product.listPrice) * 100)}% off)`,
      );
      setEndType("won");
      setPhase("END");
      flash("rgba(0,230,118,.35)", 400);
      return;
    }

    // Check final round
    if (nextRound >= product.maxRounds) {
      await sleep(600);
      await type(
        `This is the FINAL ROUND, NEGOTIATOR.\nThe seller's current price: ${fmt(priceRef.current)}\nAccept the deal or walk away.`,
      );
      setPhase("FINAL");
      return;
    }

    setPhase("IDLE");
  }, [
    input,
    phase,
    product,
    personality,
    type,
    showTurn,
    burst,
    flash,
    shake,
    popPrice,
    handleAiResponse,
    allMsg,
  ]);

  /* ── ACCEPT DEAL ── */
  const acceptDeal = useCallback(async () => {
    if (phase !== "IDLE" && phase !== "FINAL") return;
    setPhase("BUSY");
    const savings = product.listPrice - priceRef.current;
    flash("rgba(0,230,118,.4)", 400);
    await type(
      `✅ DEAL ACCEPTED at ${fmt(priceRef.current)}\nYou saved ${fmt(savings)} (${Math.round((savings / product.listPrice) * 100)}% off)\n\nWell played, NEGOTIATOR.`,
    );
    setEndType("deal");
    setPhase("END");
  }, [phase, product, type, flash]);

  /* ── ABANDON ── */
  const abandon = useCallback(async () => {
    if (phase !== "IDLE" && phase !== "FINAL") return;
    setPhase("BUSY");
    flash("rgba(255,58,58,.4)", 300);
    await type(
      `NEGOTIATOR walks away.\n\n❌ NO DEAL\nThe seller watches you leave.\n\nSometimes the right move is to walk.`,
    );
    setEndType("abandoned");
    setPhase("END");
  }, [phase, type, flash]);

  /* ── RESTART ── */
  const restart = () => {
    setPrice(product.listPrice);
    priceRef.current = product.listPrice;
    setSellerHp(100);
    setBuyerHp(100);
    setRound(1);
    roundRef.current = 1;
    setPhase("INTRO");
    setEndType(null);
    setShown("");
    setInput("");
    setSplash("show");
    setTimeout(() => {
      setSplash("fade");
      setTimeout(() => {
        setSplash("gone");
        type(
          `Welcome back, NEGOTIATOR.\nLet's try this again.\n${product.name} — ${fmt(product.listPrice)}`,
        ).then(() => setPhase("IDLE"));
      }, 800);
    }, 1400);
  };

  const canInput = phase === "IDLE" || phase === "FINAL";
  const canAccept = phase === "IDLE" || phase === "FINAL";
  const savings = product.listPrice - price;
  const savingsPct = Math.round((savings / product.listPrice) * 100);
  const { user } = useAuth();
  const playerImg = user?.character === "male" ? ImgMale : ImgFemale;

  return (
    <>
      <Cursor />
      <div className={`shell${shaking ? " shaking" : ""}`}>
        <div className="corner-tr" />
        <div className="corner-bl" />
        <div className="sys-label">SYS.v1.0 // NEGOTIATION BATTLE ARENA</div>
        <div className="scanlines" />
        <div className="scan-bar" />
        <div className="noise" />

        {/* ── HUD ── */}
        <div className="hud">
          <div className="hud-side">
            <div className="hud-eyebrow buyer">NEGOTIATOR</div>
            <div className="hud-name buyer">YOU</div>
            <div className="hp-row">
              <span className="hp-tag">FOCUS</span>
              <HpBar val={buyerHp} max={100} type="buyer" />
            </div>
            <div className="hp-nums">
              <span className={`hp-val ${hpCls(buyerHp)}`}>{buyerHp}/100</span>
              <span>Lv.42</span>
            </div>
          </div>

          <div className="badge">
            <div className="badge-ring r2" />
            <div className="badge-ring r1" />
            <div className="badge-label">ROUND</div>
            <div className="badge-num">{round}</div>
            <div className="badge-vs">/ {product.maxRounds}</div>
          </div>

          <div className="hud-side right">
            <div className="hud-eyebrow seller">SELLER</div>
            <div className="hud-name seller">{product.name}</div>
            <div className="hp-row">
              <HpBar val={sellerHp} max={100} type="seller" />
              <span className="hp-tag">RESOLVE</span>
            </div>
            <div className="hp-nums">
              <span className="hp-val rd">{sellerHp}/100</span>
              <span style={{ color: personality.color }}>{personality.label}</span>
            </div>
          </div>
        </div>

        {/* ── SCENE ── */}
        <div className="scene" id="scene">
          <div className="atmosphere" />
          <div className="grid-floor" />
          <div className="plat seller" />
          <div className="plat buyer" />

          <div className="fighter buyer">
            <img src={playerImg} alt="Negotiator" className="fighter-img buyer-fighter-img" draggable={false} />
            <div className="fighter-label">NEGOTIATOR</div>
          </div>

          <div className={`fighter seller${sellerHp <= 0 ? " dead" : ""}`}>
            <FighterImage src={personality.sellerImage} alt={personality.label} className="seller-fighter-img" />
            <div className="fighter-label">SELLER · {personality.label}</div>
          </div>

          <div className="price-box">
            <FighterImage src={product.image} alt={product.name} className="product-preview-img" />
            <div className="price-tag-label">CURRENT PRICE</div>
            <span className={`current-price ${priceAnim}`}>{fmt(price)}</span>
            <div className="original-price">{fmt(product.listPrice)}</div>
            {savings > 0 && (
              <span className="savings-tag">SAVED {fmt(savings)} ({savingsPct}% OFF)</span>
            )}
            <div className="product-desc-label">{product.description}</div>
          </div>

          {turnLabel.show && (
            <div className="turn-label show" style={{ color: turnLabel.color, textShadow: `0 0 30px ${turnLabel.color}` }}>
              {turnLabel.text}
            </div>
          )}

          <Sparks list={sparks} />

          {flashes.map((f) => (
            <div key={f.id} className="s-flash" style={{ background: f.color }} />
          ))}

          {phase === "END" && (
            <div className="end-screen">
              <div className={`end-title ${endType === "won" || endType === "deal" ? "v" : "d"}`}>
                {endType === "won" && "⚡ VICTORY"}
                {endType === "deal" && "✅ DEAL CLOSED"}
                {endType === "abandoned" && "👋 YOU WALKED"}
                {endType === "lost" && "💀 DEFEATED"}
              </div>
              {(endType === "won" || endType === "deal") && (
                <>
                  <div className="end-savings">{fmt(savings)} SAVED</div>
                  <div className="end-sub">{savingsPct}% BELOW LIST PRICE</div>
                </>
              )}
              {endType === "abandoned" && (
                <div className="end-sub">SOMETIMES WALKING AWAY IS THE WIN</div>
              )}
              <div className="end-turns">ROUNDS USED: {round} / {product.maxRounds}</div>
              <button className="end-btn cmag" onClick={restart}><span>▶ PLAY AGAIN</span></button>
            </div>
          )}
        </div>

        {/* ── BOTTOM ── */}
        <div className="bottom">
          <div className="dialogue">
            <div className="dial-text">
              {shown}
              {typing && <span className="dial-cur">█</span>}
              {!typing && phase === "IDLE" && <span className="dial-arr">▼</span>}
            </div>
            <div className="deal-actions">
              <button className="btn-deal btn-accept cmag" disabled={!canAccept} onClick={acceptDeal}>
                <span>✅ ACCEPT DEAL</span>
              </button>
              <button className="btn-deal btn-abandon cmag" disabled={!canAccept} onClick={abandon}>
                <span>❌ WALK AWAY</span>
              </button>
              {!canAccept && <span className="btn-hint">WAITING FOR SELLER</span>}
            </div>
          </div>

          <div className="input-side">
            <div className="input-header">NEGOTIATION TERMINAL</div>
            <div className="input-label">OFFER / ARGUMENT:</div>
            <div className="textarea-wrap">
              <textarea
                ref={inputRef}
                className="chat-input cmag"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                disabled={!canInput}
                placeholder={
                  phase === "BUSY" ? "PROCESSING..." :
                  phase === "INTRO" ? "INITIALIZING..." :
                  phase === "END" ? "BATTLE OVER" :
                  phase === "FINAL" ? "FINAL ROUND — LAST CHANCE..." :
                  "Make your offer or argument... (ENTER to send)"
                }
                maxLength={500}
              />
              <div className="char-count">{input.length}/500</div>
            </div>
            <div className="btn-row">
              <button className="clear-btn cmag" onClick={() => setInput("")}>CLEAR</button>
              <button className="send-btn cmag" onClick={send} disabled={!canInput || !input.trim()}>
                <span>{phase === "BUSY" ? "···" : "SEND OFFER"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── VS SPLASH ── */}
        {splash !== "gone" && (
          <div className={`vs-splash${splash === "fade" ? " fade" : ""}`}>
            <div className="vs-content">
              <div className="vs-char p1">
                <img src={playerImg1} alt="Negotiator" className="fighter-img vs-player-img" draggable={false} />
                <div className="vs-name buyer">NEGOTIATOR</div>
              </div>
              <div className="vs-text">VS</div>
              <div className="vs-char p2">
                <FighterImage src={personality.sellerImage} alt={personality.label} className="vs-seller-img" />
                <div className="vs-name seller">{product.name}</div>
                <div className="vs-personality" style={{ color: personality.color }}>{personality.label}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}