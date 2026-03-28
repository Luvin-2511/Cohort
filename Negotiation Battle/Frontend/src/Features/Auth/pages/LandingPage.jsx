import { useEffect, useRef, useState, useCallback } from "react";
import "../styles/LandingPage.css";

/* ═══ CONSTANTS ═══ */
const MSGS = [
  "A wild MERCHANT appears!",
  "MERCHANT uses HARD BARGAIN!",
  "Your $32 offer lands...",
  "MERCHANT's resolve weakens!",
  "What will YOU do?",
];

const ITEMS = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop&q=80",
  "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop&q=80",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop&q=80",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&h=200&fit=crop&q=80",
];

const FALLBACKS = [
  "https://picsum.photos/seed/ww1/200/200",
  "https://picsum.photos/seed/pp2/200/200",
  "https://picsum.photos/seed/ss3/200/200",
  "https://picsum.photos/seed/cc4/200/200",
];

const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/* ═══════════════════════════════════════════════════
   useHackerText — scrambles text on every hover, left-to-right reveal.
   startHack always resets progress to 0 so re-hovering works every time.
   Returns { text, startHack, stopHack }
═══════════════════════════════════════════════════ */
function useHackerText(original) {
  const [text, setText] = useState(original);
  const timerRef   = useRef(null);
  const progressRef = useRef(0); // track progress outside interval so stopHack can kill mid-run

  const startHack = useCallback(() => {
    // Always kill any running animation and start fresh
    clearInterval(timerRef.current);
    progressRef.current = 0;

    timerRef.current = setInterval(() => {
      const p = progressRef.current;
      setText(
        original
          .split("")
          .map((ch, idx) =>
            idx < p
              ? original[idx]
              : ch === " "
              ? " "
              : ALPHA[Math.floor(Math.random() * 26)]
          )
          .join("")
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

/* ═══════════════════════════════════════════════════
   GlitchSpan — fires on scroll-into-view AND on every hover.
   Used for .hl / .ha / .hr highlight spans in the dark sections.
═══════════════════════════════════════════════════ */
function GlitchSpan({ children, className }) {
  const original    = typeof children === "string" ? children : "";
  const [text, setText] = useState(original);
  const spanRef     = useRef(null);
  const timerRef    = useRef(null);
  const progressRef = useRef(0);

  const runGlitch = useCallback(() => {
    clearInterval(timerRef.current);
    progressRef.current = 0;

    timerRef.current = setInterval(() => {
      const p = progressRef.current;
      setText(
        original
          .split("")
          .map((ch, idx) =>
            idx < p
              ? original[idx]
              : ch === " "
              ? " "
              : ALPHA[Math.floor(Math.random() * 26)]
          )
          .join("")
      );
      progressRef.current += 0.5;
      if (progressRef.current >= original.length) {
        clearInterval(timerRef.current);
        setText(original);
      }
    }, 28);
  }, [original]);

  const stopGlitch = useCallback(() => {
    clearInterval(timerRef.current);
    progressRef.current = 0;
    setText(original);
  }, [original]);

  // Fire once on scroll into view
  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) runGlitch(); },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => { obs.disconnect(); clearInterval(timerRef.current); };
  }, [runGlitch]);

  return (
    <span
      ref={spanRef}
      className={className}
      onMouseEnter={runGlitch}
      onMouseLeave={stopGlitch}
    >
      {text}
    </span>
  );
}

/* ═══ CURSOR ═══ */
function Cursor() {
  const curRef = useRef(null);
  const pos = useRef({
    mx: window.innerWidth / 2,
    my: window.innerHeight / 2,
    cx: window.innerWidth / 2,
    cy: window.innerHeight / 2,
  });
  const [isBig, setIsBig] = useState(false);

  /* Smooth follow */
  useEffect(() => {
    const onMove = (e) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
    };
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
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* Bind magnetic + big-cursor to every .magnetic element */
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
          el.style.transition = "transform 0.4s cubic-bezier(0.165,0.84,0.44,1)";
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
    const t = setTimeout(attach, 300); // catch late-rendered elements
    return () => clearTimeout(t);
  }, []);

  return <div ref={curRef} id="cursor" className={isBig ? "big" : ""} />;
}

/* ═══ NAV ═══
   Nav links and logo all use useHackerText — hover scrambles, then resolves.
*/
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!navRef.current || !scrolled) return;
      const ry = (e.clientX - window.innerWidth / 2) * 0.022;
      const rx = (e.clientY - 80) * 0.014;
      const cl = (n, a, b) => Math.min(Math.max(n, a), b);
      navRef.current.style.transform = `translateX(-50%) perspective(1000px) rotateX(${-cl(rx, -8, 8)}deg) rotateY(${cl(ry, -8, 8)}deg)`;
    };
    document.addEventListener("mousemove", onMouseMove);
    if (!scrolled && navRef.current) navRef.current.style.transform = "";
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, [scrolled]);

  // One hook per nav item
  const logo  = useHackerText("AI MART");
  const rules = useHackerText("RULES");
  const types = useHackerText("TYPES");
  const board = useHackerText("BOARD");

  const links = [
    { key: "rules", hacker: rules },
    { key: "types", hacker: types },
    { key: "board", hacker: board },
  ];

  return (
    <nav ref={navRef} className={`nav${scrolled ? " sc" : ""}`} id="nav">
      {/* Logo — hacker text on hover */}
      <a
        href="#"
        className="nav-logo magnetic"
        onMouseEnter={logo.startHack}
        onMouseLeave={logo.stopHack}
      >
        {logo.text}
      </a>

      <ul className="nav-links">
        {links.map(({ key, hacker }) => (
          <li key={key}>
            <a
              href={`#${key}`}
              className="nav-link magnetic"
              onMouseEnter={hacker.startHack}
              onMouseLeave={hacker.stopHack}
            >
              {hacker.text}
            </a>
          </li>
        ))}
      </ul>

      <button className="nav-cta magnetic">
        <span>START DEAL</span>
      </button>
    </nav>
  );
}

/* ═══ BATTLE SCREEN ═══ */
function BattleScreen() {
  const [displayText, setDisplayText] = useState("");
  const [activeBtn, setActiveBtn]     = useState(0);
  const [imgSrc, setImgSrc]           = useState(ITEMS[0]);
  const [imgVisible, setImgVisible]   = useState(true);
  const itemIdxRef = useRef(0);
  const twRef      = useRef(null);

  /* Typewriter loop */
  useEffect(() => {
    let msgIdx = 0;
    let stopped = false;

    const typewrite = (str, cb) => {
      let i = 0;
      setDisplayText("");
      clearInterval(twRef.current);
      twRef.current = setInterval(() => {
        setDisplayText(str.slice(0, i + 1));
        i++;
        if (i >= str.length) {
          clearInterval(twRef.current);
          setTimeout(cb, 2100);
        }
      }, 44);
    };

    const cycle = () => {
      if (stopped) return;
      typewrite(MSGS[msgIdx], () => {
        msgIdx = (msgIdx + 1) % MSGS.length;
        cycle();
      });
    };
    cycle();

    return () => {
      stopped = true;
      clearInterval(twRef.current);
    };
  }, []);

  /* Item image carousel */
  useEffect(() => {
    const iv = setInterval(() => {
      itemIdxRef.current = (itemIdxRef.current + 1) % ITEMS.length;
      const ci = itemIdxRef.current;
      setImgVisible(false);
      setTimeout(() => {
        setImgSrc(ITEMS[ci]);
        setImgVisible(true);
      }, 300);
    }, 4200);
    return () => clearInterval(iv);
  }, []);

  const slots = [
    { img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=60&h=60&fit=crop&q=80", fb: "https://picsum.photos/seed/w1/60/60", name: "WATCH",    price: "$49"  },
    { img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=60&h=60&fit=crop&q=80", fb: "https://picsum.photos/seed/p2/60/60", name: "PERFUME",  price: "$38"  },
    { img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=60&h=60&fit=crop&q=80",    fb: "https://picsum.photos/seed/s3/60/60", name: "SNEAKERS", price: "$120" },
    { img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=60&h=60&fit=crop&q=80", fb: "https://picsum.photos/seed/c4/60/60", name: "CAMERA",   price: "$240" },
  ];

  const moves = [
    { label: "LOGIC STRIKE", type: "NORMAL"  },
    { label: "GUILT TRIP",   type: "PSYCHIC" },
    { label: "FINAL OFFER",  type: "FIRE"    },
    { label: "WALK AWAY",    type: "GHOST"   },
  ];

  return (
    <div className="battle-wrap" id="bwrap">
      <div className="battle-frame">
        {/* Arena */}
        <div className="arena">
          <div className="arena-bg" />
          <div className="arena-hor" />
          <div className="atk" />
          <div className="plat-e" />
          <div className="plat-p" />

          <div className="hud-box hud-e">
            <div className="hud-name">
              <span>MERCHANT</span>
              <span className="hud-lv">Lv.42</span>
            </div>
            <div className="hud-track">
              <div className="hud-fill drain" />
            </div>
            <div className="hud-lbl">HP</div>
          </div>

          <div className="eimg">
            <img
              src={imgSrc}
              alt="item"
              style={{ opacity: imgVisible ? 1 : 0, transition: "opacity 0.3s ease" }}
              onError={(e) => { e.target.onerror = null; e.target.src = FALLBACKS[itemIdxRef.current]; }}
            />
          </div>

          <div className="pimg">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=160&fit=crop&crop=top&q=80"
              alt="player"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/seed/player7/120/160"; }}
            />
          </div>

          <div className="hud-box hud-p">
            <div className="hud-name">
              <span>YOU</span>
              <span className="hud-lv">Lv.01</span>
            </div>
            <div className="hud-track">
              <div className="hud-fill full" />
            </div>
            <div className="hud-lbl">HP</div>
          </div>
        </div>

        {/* Item strip */}
        <div className="istrip">
          {slots.map((s, i) => (
            <div className="islot" key={i}>
              <img
                src={s.img}
                alt={s.name}
                onError={(e) => { e.target.onerror = null; e.target.src = s.fb; }}
              />
              <div>
                <span className="iname">{s.name}</span>
                <span className="iprice">{s.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Battle log */}
        <div className="bmsg">
          <div className="btag">// BATTLE LOG</div>
          <div className="btext-box">
            <span>{displayText}</span>
            <span className="bcur" />
          </div>
          <div className="barr">▼</div>
        </div>

        {/* Move grid */}
        <div className="mgrid">
          {moves.map((m, i) => (
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
    </div>
  );
}

/* ═══ HERO ═══ */
function Hero() {
  useEffect(() => {
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));
    const animate = async () => {
      await delay(150);
      const eyebrow = document.getElementById("eyebrow");
      if (eyebrow) { eyebrow.style.opacity = "1"; eyebrow.style.transform = "translateY(0)"; }
      await delay(200);
      document.querySelectorAll(".tli").forEach((el, i) => {
        setTimeout(() => { el.style.transform = "translateY(0)"; }, i * 110);
      });
      await delay(600);
      const hsub = document.getElementById("hsub");
      if (hsub) { hsub.style.opacity = "1"; hsub.style.transform = "translateY(0)"; }
      await delay(100);
      const hbtns = document.getElementById("hbtns");
      if (hbtns) { hbtns.style.opacity = "1"; hbtns.style.transform = "translateY(0)"; }
      await delay(200);
      const bwrap = document.getElementById("bwrap");
      if (bwrap) { bwrap.style.opacity = "1"; bwrap.style.transform = "translateX(0)"; }
    };
    animate();
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-left">
        <div
          id="eyebrow"
          className="hero-eyebrow"
          style={{ opacity: 0, transform: "translateY(-18px)", transition: "all 0.6s ease" }}
        >
          ALPHA BUILD · ROUND 001
        </div>

        <h1 className="hero-title">
          <span className="tl"><span className="tli">OUT</span></span>
          <span className="tl"><span className="tli acc-line">NEGOTIATE</span></span>
          <span className="tl"><span className="tli">THE AI.</span></span>
        </h1>

        <p
          id="hsub"
          className="hero-sub"
          style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.7s ease" }}
        >
          A brutalist haggling arena.<br />
          10 rounds. One floor price.<br />
          Zero mercy.
        </p>

        <div
          id="hbtns"
          className="hero-btns"
          style={{ opacity: 0, transform: "translateY(20px)", transition: "all 0.6s ease" }}
        >
          <button className="btn-main magnetic"><span>⚔ ENTER ARENA</span></button>
          <button className="btn-ghost magnetic">WATCH DEMO</button>
        </div>
      </div>

      <div className="hero-right">
        <BattleScreen />
      </div>

      <div className="tape-wrap">
        <div className="tape-in">
          {[0, 1].map((i) => (
            <span key={i} className="tape-txt">
              AI MART ✦ NEGOTIATE THE MACHINE ✦ 10 ROUNDS ✦ DYNAMIC PERSONALITY ✦ GLOBAL LEADERBOARD ✦&nbsp;
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ RULES SECTION ═══ */
function RulesSection() {
  const rules = [
    { num: "01", icon: "⚔️", name: "THE DEAL",    body: "Every session starts with a fixed product and an initial asking price. The AI secretly knows the lowest price it will accept. You don't.",               tip: "PROBE WITH SMALL CONCESSIONS. TRACK REACTIONS."  },
    { num: "02", icon: "🎭", name: "THE MERCHANT", body: "The AI has a hidden personality — stubborn, emotional, or flexible. Each personality plays by completely different negotiation rules.",              tip: "SPOT THE PERSONALITY IN THE FIRST 2–3 MESSAGES." },
    { num: "03", icon: "⏳", name: "10 ROUNDS",    body: "You get exactly 10 messages per deal. Every word matters. Walk too early and you overpay. Push too hard and the deal collapses.",                   tip: "INFO → ANCHOR → PRESSURE → CLOSE."               },
    { num: "04", icon: "🏆", name: "YOUR SCORE",   body: "Your final accepted price is your score. The lower it is compared to the opening ask, the higher you climb on the global leaderboard.",            tip: "KNOWING THE FLOOR IS THE REAL WIN."              },
  ];

  return (
    <section className="rules-sec" id="rules">
      <p className="sec-ey anim-reveal">HOW IT WORKS</p>
      <h2 className="sec-ttl anim-reveal">Four rules. Infinite mind games.</h2>
      <p className="sec-sub anim-reveal">
        Each product has a hidden floor price the AI refuses to cross.<br />
        Your mission: talk it down before round 10 ends.
      </p>
      <div className="rgrid">
        {rules.map((r) => (
          <article key={r.num} className="rcard scroll-reveal">
            <span className="rnum">{r.num}</span>
            <span className="rico">{r.icon}</span>
            <div className="rname">{r.name}</div>
            <p className="rbody">{r.body}</p>
            <p className="rtip">{r.tip}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ═══ TYPES SECTION ═══ */
function TypesSection() {
  const types = [
    {
      cls: "t-fire", badge: "FIRE TYPE",   badgeCls: "b-fire",
      img: "https://images.unsplash.com/photo-1560472355-536de3962603?w=160&h=160&fit=crop&q=80",
      fb: "https://picsum.photos/seed/stub7/160/160", name: "STUBBORN",
      desc: "Barely moves on price. Loves scarcity, urgency, and hard deadlines. Will call your bluff the moment it sniffs weakness.",
      stats: [{ label: "DISCIPLINE", val: 94, cls: "sf-fire" }, { label: "EMPATHY", val: 11, cls: "sf-fire" }, { label: "LOGIC", val: 70, cls: "sf-fire" }],
      strat: "STRATEGY: SMALL CONCESSIONS FIRST. FINAL-OFFER LANGUAGE ONLY WHEN YOU MEAN IT.",
    },
    {
      cls: "t-psy",  badge: "PSYCHIC TYPE", badgeCls: "b-psy",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop&q=80",
      fb: "https://picsum.photos/seed/emot5/160/160", name: "EMOTIONAL",
      desc: "Deeply attached to the item. Responds to stories, compliments, and shared humanity far more than raw numbers.",
      stats: [{ label: "DISCIPLINE", val: 38, cls: "sf-psy" }, { label: "EMPATHY", val: 93, cls: "sf-psy" }, { label: "LOGIC", val: 46, cls: "sf-psy" }],
      strat: "STRATEGY: BUILD RAPPORT FIRST. CONTEXT > NUMBERS. LOYALTY ARGUMENTS LAND HARD.",
    },
    {
      cls: "t-gra",  badge: "GRASS TYPE",   badgeCls: "b-gra",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop&q=80",
      fb: "https://picsum.photos/seed/flex3/160/160", name: "FLEXIBLE",
      desc: "Pragmatic and fair. Responds to logic, data, and mutual-benefit arguments. Rewards smart, structured reasoning.",
      stats: [{ label: "DISCIPLINE", val: 58, cls: "sf-gra" }, { label: "EMPATHY", val: 64, cls: "sf-gra" }, { label: "LOGIC", val: 90, cls: "sf-gra" }],
      strat: "STRATEGY: COME WITH MARKET DATA. STRUCTURED CONCESSIONS. SHOW HOW BOTH WIN.",
    },
  ];

  return (
    <section className="types-sec" id="types">
      <p className="sec-ey anim-reveal">THE MERCHANTS</p>
      <h2 className="sec-ttl anim-reveal">Three AI personalities to outplay.</h2>
      <p className="sec-sub anim-reveal" style={{ marginBottom: "3rem" }}>
        You never see their name — you feel their mood. Use logic, empathy,<br />
        or pressure depending on who you're up against.
      </p>
      <div className="tgrid">
        {types.map((t) => (
          <article key={t.name} className={`tcard ${t.cls} scroll-reveal`}>
            <div className={`tbadge ${t.badgeCls}`}>{t.badge}</div>
            <div className="timg">
              <img src={t.img} alt={t.name} onError={(e) => { e.target.onerror = null; e.target.src = t.fb; }} />
            </div>
            <h3 className="tname">{t.name}</h3>
            <p className="tdesc">{t.desc}</p>
            <div style={{ marginBottom: "14px" }}>
              {t.stats.map((s) => (
                <div key={s.label} className="srow">
                  <span className="slbl">{s.label}</span>
                  <div className="strk">
                    <div className={`sfill ${s.cls}`} style={{ width: `${s.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className={`tstrat ${t.cls}`}>{t.strat}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ═══ DARK NARRATIVE SECTIONS ═══
   GlitchSpan fires the scramble once as each highlight enters the viewport.
*/
function DarkSections() {
  return (
    <>
      <section className="sdark" id="s1">
        <p className="btext scroll-reveal">
          WE BUILT AN AI THAT <GlitchSpan className="hl">HAGGLES BACK</GlitchSpan>.
          <br />NO SCRIPTS. NO MERCY.
          <br />JUST <GlitchSpan className="ha">RAW DEAL LOGIC</GlitchSpan>
          <br />AND <GlitchSpan className="hr">YOUR NERVE</GlitchSpan>.
        </p>
      </section>
      <section className="sdark r" id="s2">
        <p className="btext scroll-reveal">
          NEGOTIATION<br />
          <GlitchSpan className="ha">REDEFINED</GlitchSpan>
        </p>
      </section>
    </>
  );
}

/* ═══ FOOTER ═══
   Footer logo uses useHackerText just like the nav logo.
*/
function Footer() {
  const logo = useHackerText("AI MART");

  return (
    <footer className="foot">
      <a
        href="#"
        className="flogo magnetic"
        onMouseEnter={logo.startHack}
        onMouseLeave={logo.stopHack}
      >
        {logo.text}
      </a>
      <p className="fcopy">© 2026 AI MART LABS — MADE WITH GSAP + STUBBORNNESS</p>
    </footer>
  );
}

/* ═══ APP ROOT ═══ */
export default function App() {
  useEffect(() => {
    /* Scroll skew */
    let sk = 0, lst = 0, raf;
    const sc = document.getElementById("scroll-content");
    const skewLoop = () => {
      const st = window.scrollY, v = st - lst; lst = st;
      sk += (Math.min(Math.max(v * 0.085, -4), 4) - sk) * 0.1;
      if (sc) sc.style.transform = Math.abs(sk) > 0.01 ? `skewY(${sk}deg)` : "";
      raf = requestAnimationFrame(skewLoop);
    };
    raf = requestAnimationFrame(skewLoop);

    /* Generic scroll reveals (.scroll-reveal, .anim-reveal) */
    const revealObs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("revealed"); }),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".scroll-reveal, .anim-reveal").forEach((el) =>
      revealObs.observe(el)
    );

    return () => { cancelAnimationFrame(raf); revealObs.disconnect(); };
  }, []);

  return (
    <>
      <div className="noise" />
      <div className="scanlines" />
      <Cursor />
      <Nav />
      <div id="scroll-content">
        <Hero />
        <RulesSection />
        <TypesSection />
        <DarkSections />
        <Footer />
      </div>
    </>
  );
}