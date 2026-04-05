import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Link } from "react-router-dom";
import "../styles/Landingpage.css";
import StarsBackground from "../../shared/components/StarsBackground";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ─────────────────────────────────────────
   KNOWLEDGE GRAPH CANVAS  (2D canvas)
───────────────────────────────────────── */

function GraphCanvas() {
  const canvasRef = useRef();
  const animRef   = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let W, H, t  = 0;

    const nodeConfigs = [
      { lx: 0.5,  ly: 0.46, r: 22, label: "AI Core",  color: "#c7f300", pulse: true },
      { lx: 0.22, ly: 0.2,  r: 13, label: "Articles", color: "#F0EBE1" },
      { lx: 0.78, ly: 0.19, r: 11, label: "Tweets",   color: "#B8B0A4" },
      { lx: 0.14, ly: 0.62, r: 15, label: "PDFs",     color: "#F0EBE1" },
      { lx: 0.84, ly: 0.65, r: 12, label: "Videos",   color: "#B8B0A4" },
      { lx: 0.47, ly: 0.84, r: 10, label: "Images",   color: "#C8441A" },
      { lx: 0.89, ly: 0.4,  r: 9,  label: "Notes",    color: "#B8B0A4" },
      { lx: 0.09, ly: 0.38, r: 10, label: "Links",    color: "#C8441A" },
      { lx: 0.35, ly: 0.13, r: 8,  label: "Audio",    color: "#B8B0A4" },
      { lx: 0.68, ly: 0.86, r: 8,  label: "Threads",  color: "#F0EBE1" },
    ];

    const edges = [
      [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9],
      [1,7],[1,8],[2,6],[3,5],[4,9],[5,9],[7,3],[8,2],
    ];

    // Traveling dots per edge (independent progress)
    const travelers = edges.map(() => ({ prog: Math.random(), speed: 0.003 + Math.random() * 0.004 }));

    function resize() {
      const box = canvas.parentElement.getBoundingClientRect();
      W = canvas.width  = box.width;
      H = canvas.height = box.height;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 0.007;

      const nodes = nodeConfigs.map((n, i) => ({
        ...n,
        x: n.lx * W,
        y: (n.ly + Math.sin(t * 0.6 + i * 1.3) * 0.022) * H,
      }));

      // Draw edges
      edges.forEach(([a, b], ei) => {
        const na = nodes[a], nb = nodes[b];
        const alpha = 0.1 + 0.06 * Math.sin(t * 0.8 + ei);

        // Curved path
        const cpx = (na.x + nb.x) / 2 + Math.sin(t * 0.25 + ei) * 18;
        const cpy = (na.y + nb.y) / 2 + Math.cos(t * 0.25 + ei) * 18;

        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.quadraticCurveTo(cpx, cpy, nb.x, nb.y);
        ctx.strokeStyle = `rgba(199,243,0,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Traveling dot along the bezier
        const tv = travelers[ei];
        tv.prog = (tv.prog + tv.speed) % 1;
        const bx = (1-tv.prog)*(1-tv.prog)*na.x + 2*(1-tv.prog)*tv.prog*cpx + tv.prog*tv.prog*nb.x;
        const by = (1-tv.prog)*(1-tv.prog)*na.y + 2*(1-tv.prog)*tv.prog*cpy + tv.prog*tv.prog*nb.y;

        ctx.beginPath();
        ctx.arc(bx, by, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(199,243,0,0.85)`;
        ctx.fill();
      });

      // Draw nodes
      nodes.forEach((n, i) => {
        // Outer glow
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3);
        g.addColorStop(0, n.color + "28");
        g.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        // Ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.strokeStyle = n.color + "90";
        ctx.lineWidth   = 1;
        ctx.stroke();

        // Fill
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r - 1, 0, Math.PI * 2);
        ctx.fillStyle = n.color + "1A";
        ctx.fill();

        // Label
        ctx.fillStyle = n.color;
        ctx.font = `${Math.max(7, n.r * 0.62)}px 'Geist Mono', monospace`;
        ctx.textAlign    = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n.label, n.x, n.y);

        // Pulse for AI Core
        if (n.pulse) {
          const pulse = 0.5 + 0.5 * Math.sin(t * 2);
          const pulse2 = 0.5 + 0.5 * Math.sin(t * 2 + Math.PI);
          [pulse, pulse2].forEach((p, pi) => {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r + p * 32 + pi * 12, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(199,243,0,${0.35 - p * 0.32})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          });
        }
      });

      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

/* ─────────────────────────────────────────
   PRELOADER
───────────────────────────────────────── */

function Preloader({ onDone }) {
  const counterRef = useRef();
  const barRef     = useRef();
  const wrapRef    = useRef();
  const textRef    = useRef();

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(wrapRef.current, {
          yPercent: -100,
          duration: 1.1,
          ease: "power4.inOut",
          onComplete: onDone,
        });
      },
    });

    tl.to(barRef.current, { scaleX: 1, duration: 2, ease: "power2.inOut" });
    tl.to(textRef.current, { opacity: 0, duration: 0.3 }, "-=0.2");

    gsap.to({ val: 0 }, {
      val: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: function () {
        if (counterRef.current)
          counterRef.current.textContent = Math.round(this.targets()[0].val);
      },
    });
  }, []);

  return (
    <div id="preloader" ref={wrapRef}>
      <div className="pre-inner">
        <div className="pre-logo" ref={textRef}>MEMEX</div>
        <div className="pre-counter" ref={counterRef}>0</div>
        <div className="pre-bar-wrap">
          <div className="pre-bar" ref={barRef} />
        </div>
        <div className="pre-sub" ref={textRef}>Loading second brain infrastructure…</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */

const FEATURES = [
  { n: "01", name: "Universal Save",  desc: "Browser extension captures anything — articles, tweets, PDFs, videos, images. One click, instantly indexed and queued.", tag: "Extension" },
  { n: "02", name: "AI Tagging",      desc: "Semantic embeddings extract topics, entities, intent. Automatic. Zero manual effort. Ever.", tag: "AI" },
  { n: "03", name: "Knowledge Graph", desc: "D3-powered live graph. See how ideas saved weeks apart invisibly connect. Watch your mind grow.", tag: "Visualization" },
  { n: "04", name: "Semantic Search", desc: "Vector-powered search understands meaning not keywords. Find the idea you half-remember at 2am.", tag: "Search" },
  { n: "05", name: "Resurfacing",     desc: '"2 months ago you saved this — still relevant?" Spaced repetition. Right thing, right moment.', tag: "Memory" },
  { n: "06", name: "Highlights",      desc: "Clip specific passages, annotate inline, weave into your graph. Every insight, permanent.", tag: "Capture" },
];

const SAVES = [
  { ico: "📄", name: "Articles",  sub: "web pages"  },
  { ico: "𝕏",  name: "Tweets",   sub: "threads"    },
  { ico: "▶",  name: "Videos",   sub: "youtube"    },
  { ico: "📑", name: "PDFs",     sub: "documents"  },
  { ico: "🖼", name: "Images",   sub: "screenshots"},
  { ico: "🎙", name: "Podcasts", sub: "audio"      },
  { ico: "📝", name: "Notes",    sub: "text"       },
  { ico: "🧵", name: "Threads",  sub: "discussions"},
];

export default function LandingPage() {
  const [loaded, setLoaded] = useState(false);

  const curRef   = useRef();
  const labelRef = useRef();

  /* ── Custom cursor ── */
  useEffect(() => {
    if (!loaded) return;
    const move = (e) => {
      gsap.to(curRef.current,   { x: e.clientX, y: e.clientY, duration: 0.07, ease: "none" });
      gsap.to(labelRef.current, { x: e.clientX, y: e.clientY + 30, duration: 0.14 });
    };
    document.addEventListener("mousemove", move);

    const onEnter = (e) => {
      curRef.current?.classList.add("hovering");
      if (labelRef.current) {
        labelRef.current.style.opacity = "1";
        labelRef.current.textContent   = e.currentTarget.dataset.cursor || "VIEW";
      }
    };
    const onLeave = () => {
      curRef.current?.classList.remove("hovering");
      if (labelRef.current) labelRef.current.style.opacity = "0";
    };

    const obs = new MutationObserver(() => {
      document.querySelectorAll("button, a, .feat-item, .save-card, [data-cursor]").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    });
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", move);
      obs.disconnect();
    };
  }, [loaded]);

  /* ── GSAP scroll animations ── */
  useEffect(() => {
    if (!loaded) return;

    const ctx = gsap.context(() => {
      // Hero title lines
      gsap.utils.toArray(".hero-title .line span").forEach((span, i) => {
        gsap.to(span, { y: 0, duration: 1.3, ease: "power4.out", delay: 0.05 + i * 0.13 });
      });

      gsap.to(".hero-desc", { opacity: 1, y: 0, duration: 1,   delay: 0.7,  ease: "power3.out" });
      gsap.to(".hero-meta", { opacity: 1, y: 0, duration: 1,   delay: 0.88, ease: "power3.out" });
      gsap.to(".scroll-ticker", { opacity: 1, duration: 0.9, delay: 1.3 });

      // Horizontal line reveal
      gsap.to(".hero-bottom", {
        borderTopColor: "rgba(240,235,225,0.14)",
        duration: 1.2,
        delay: 0.6,
      });

      // Section reveals
      gsap.utils.toArray(".reveal-inner").forEach((el) => {
        gsap.to(el, {
          y: 0, duration: 1.2, ease: "power4.out",
          scrollTrigger: { trigger: el.parentElement, start: "top 82%" },
        });
      });

      // About text
      document.querySelectorAll(".about-text").forEach((el) => {
        const split = new SplitText(el, { type: "lines" });
        gsap.from(split.lines, {
          y: 28, opacity: 0, duration: 0.75, stagger: 0.04, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 84%" },
        });
      });

      // Features
      gsap.utils.toArray(".feat-item").forEach((el, i) => {
        gsap.from(el, {
          x: -40, opacity: 0, duration: 0.65, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      // Process
      gsap.utils.toArray(".process-step").forEach((el, i) => {
        gsap.from(el, {
          y: 60, opacity: 0, duration: 0.75, ease: "power3.out", delay: i * 0.09,
          scrollTrigger: { trigger: ".process-grid", start: "top 78%" },
        });
      });

      // Save cards
      gsap.utils.toArray(".save-card").forEach((el, i) => {
        gsap.from(el, {
          y: 30, opacity: 0, duration: 0.55, ease: "power3.out", delay: i * 0.04,
          scrollTrigger: { trigger: ".saves-grid", start: "top 82%" },
        });
      });

      // Graph section
      gsap.from(".graph-left > *", {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".section-graph", start: "top 75%" },
      });

      // Stat counters
      gsap.utils.toArray(".g-stat-n").forEach((el) => {
        const raw = el.dataset.val || el.textContent;
        const num = parseInt(raw);
        const suffix = raw.replace(/[0-9]/g, "");
        if (!isNaN(num)) {
          el.textContent = "0" + suffix;
          gsap.to({ val: 0 }, {
            val: num, duration: 2, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
            onUpdate: function () {
              el.textContent = Math.round(this.targets()[0].val) + suffix;
            },
          });
        }
      });

      // CTA title
      const ctaTitle = document.querySelector(".cta-title");
      if (ctaTitle) {
        const split = new SplitText(ctaTitle, { type: "chars" });
        gsap.from(split.chars, {
          y: 60, opacity: 0, duration: 0.6, stagger: 0.025, ease: "power4.out",
          scrollTrigger: { trigger: ctaTitle, start: "top 80%" },
        });
      }
    });

    return () => ctx.revert();
  }, [loaded]);

  return (
    <>
      <Preloader onDone={() => setLoaded(true)} />

      <div id="cursor"       ref={curRef} />
      <div id="cursor-label" ref={labelRef} />

      {/* ── FIXED 3D CANVAS ── */}
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        }}
      >
        <StarsBackground />
      </div>

      <div className="tn-glow tn-glow--top" style={{ position: "absolute" }} />
      <div className="tn-glow tn-glow--bot" style={{ position: "absolute" }} />

      {/* ── NAV ── */}
      <nav>
        <Link to="/" className="nav-logo">MEMEX</Link>
        <div className="nav-right">
          <span className="nav-count">EST. 2025</span>
          <a href="#features" className="nav-link">Features</a>
          <a href="#process"  className="nav-link">Process</a>
          <Link to="/login"    className="nav-link nav-link--ghost">Sign in</Link>
          <Link to="/register" className="nav-cta-pill" data-cursor="START">
            Get Access →
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-kicker">Second Brain Infrastructure</div>

        <div className="hero-title-wrap">
          <h1 className="hero-title">
            <div className="line"><span>SAVE</span></div>
            <div className="line"><span className="italic">everything</span></div>
            <div className="line"><span>FORGET</span></div>
            <div className="line"><span>NOTHING</span></div>
          </h1>
        </div>

        <div className="hero-bottom">
          <p className="hero-desc">
            An AI-powered knowledge OS that captures, organizes, and resurfaces
            everything you consume — automatically. Articles, tweets, PDFs, videos.
            All connected. All searchable. All remembered.
          </p>
          <div className="hero-meta">
            <div className="hero-tags">
              <span className="hero-tag">Browser Extension</span>
              <span className="hero-tag">Vector Search</span>
              <span className="hero-tag">Knowledge Graph</span>
            </div>
            <Link to="/register" className="hero-cta" data-cursor="LET'S GO">
              <span>Get Early Access</span>
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>

        <div className="scroll-ticker">
          <div className="scroll-ticker-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-strip">
        <div className="marquee-inner">
          {[...Array(2)].flatMap(() =>
            ["Save Anything", "AI Tagged", "Graph Connected", "Semantically Searched", "Auto Resurfaced", "Zero Friction", "Open Source"].flatMap((t, i) => [
              <span className="marquee-item" key={`${t}${i}`}>{t}</span>,
              <span className="marquee-dot"  key={`d${t}${i}`} />,
            ])
          )}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="section-about">
        <div className="about-left">
          <div className="section-num">01 — About</div>
          <h2 className="about-heading">
            Your mind<br /><em>extended</em>
          </h2>
          <div className="about-aside">
            <div className="about-aside-num">200</div>
            <div className="about-aside-label">articles read/month</div>
            <div className="about-aside-num accent">3</div>
            <div className="about-aside-label">actually remembered</div>
          </div>
        </div>
        <div className="about-right">
          {[
            { label: "The Problem",  text: "You read 200 articles a month. You save 50. You remember <em>3</em>. The rest — gone. Your browser bookmarks are a graveyard." },
            { label: "The Solution", text: "Memex is not a note-taking app. It's a <em>knowledge operating system</em>. Save once. The AI does the rest — tagging, clustering, connecting, resurfacing." },
            { label: "The Vision",   text: "A living graph that grows with you. Surfaces the right idea at the <em>exact right moment</em>. Your second brain, running silently in the background." },
          ].map((b) => (
            <div className="about-block" key={b.label}>
              <div className="about-label">{b.label}</div>
              <p className="about-text" dangerouslySetInnerHTML={{ __html: b.text }} />
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section-features" id="features">
        <div className="feat-header">
          <div>
            <div className="section-num">02 — Features</div>
            <h2 className="feat-heading">
              WHAT<br /><span className="accent">IT DOES</span>
            </h2>
          </div>
          <p className="feat-sub">Six systems working in concert.<br />No manual effort. Pure signal.</p>
        </div>
        <div className="feat-list">
          {FEATURES.map((f) => (
            <div className="feat-item" key={f.n} data-cursor="VIEW">
              <div className="feat-n">{f.n}</div>
              <div className="feat-body">
                <div className="feat-name">{f.name}</div>
                <p className="feat-desc">{f.desc}</p>
              </div>
              <div className="feat-tag">{f.tag}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="section-process" id="process">
        <div className="process-bg-text">MEMEX</div>
        <div className="section-num" style={{ color: "var(--rust)", marginBottom: "2rem" }}>
          03 — How It Works
        </div>
        <h2 className="process-heading">
          FOUR STEPS<br /><span>TO MASTERY</span>
        </h2>
        <div className="process-grid">
          {[
            { n: "01", icon: "↓", title: "SAVE",  text: "Browser extension. One click. Any URL, tweet, PDF, video. Instantly captured and queued for processing." },
            { n: "02", icon: "◎", title: "EMBED", text: "AI generates semantic embeddings. Topics extracted. Entities identified. Knowledge deeply categorized." },
            { n: "03", icon: "⌀", title: "GRAPH", text: "Items cluster into topics. Connections form automatically. Your knowledge graph grows with every save." },
            { n: "04", icon: "↑", title: "RECALL",text: "Spaced repetition engine resurfaces items. Search by meaning, not keywords. Never lose an idea again." },
          ].map((s, i) => (
            <div className="process-step" key={i}>
              <div className="p-num">{s.n}</div>
              <div className="p-icon">{s.icon}</div>
              <div className="p-title">{s.title}</div>
              <p className="p-text">{s.text}</p>
              {i < 3 && <div className="p-connector" />}
            </div>
          ))}
        </div>
      </section>

      {/* ── GRAPH SECTION ── */}
      <section className="section-graph">
        <div className="graph-left">
          <div className="graph-label">04 — Knowledge Graph</div>
          <h2 className="graph-heading">YOUR BRAIN<br />VISUALIZED</h2>
          <p className="graph-text">
            Watch your knowledge graph grow in real-time. Every save adds a node.
            The AI finds connections you'd never see manually. Topics cluster automatically.
            Ideas from months ago link to what you saved today.
          </p>
          <div className="graph-stats">
            {[
              { n: "48K+", l: "Items processed",    val: 48, suffix: "K+" },
              { n: "93%",  l: "Tag accuracy",        val: 93, suffix: "%" },
              { n: "0",    l: "Manual tags needed",  val: 0,  suffix: "" },
              { n: "1s",   l: "Save to indexed",     val: 1,  suffix: "s" },
            ].map((s) => (
              <div className="g-stat" key={s.l}>
                <div className="g-stat-n" data-val={s.n}>{s.n}</div>
                <div className="g-stat-l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="graph-right">
          <GraphCanvas />
        </div>
      </section>

      {/* ── SAVES ── */}
      <section className="section-saves" id="saves">
        <div className="saves-header">
          <h2 className="saves-heading">
            SAVE FROM<br /><em>anywhere</em>
          </h2>
          <p className="saves-sub">
            Eight content types. One brain.<br />
            Zero friction.
          </p>
        </div>
        <div className="saves-grid">
          {SAVES.map((s, i) => (
            <div className="save-card" key={i} data-cursor="SAVE">
              <span className="save-ico">{s.ico}</span>
              <div className="save-name">{s.name}</div>
              <div className="save-sub">{s.sub}</div>
              <div className="save-arrow">→</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-cta" id="cta">
        <div className="cta-bg-title">NOW</div>
        <div className="cta-label">05 — Early Access</div>
        <h2 className="cta-title">
          JOIN THE<br />
          <span className="ghost">WAITLIST</span>
        </h2>
        <p className="cta-sub">
          Limited spots. Be first. Start building your second brain
          before everyone else catches on.
        </p>
        <div className="cta-actions">
          <div className="cta-form">
            <input className="cta-input" type="email" placeholder="your@email.com" />
            <button className="cta-submit" data-cursor="GO">ACCESS →</button>
          </div>
          <Link to="/register" className="cta-link" data-cursor="REGISTER">
            Or create an account →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="f-logo">MEMEX</div>
        <div className="f-center">
          <a href="#" className="f-link">Privacy</a>
          <a href="#" className="f-link">Terms</a>
          <a href="#" className="f-link">Twitter</a>
          <a href="#" className="f-link">GitHub</a>
        </div>
        <div className="f-right">© 2025 Memex Inc.</div>
      </footer>
    </>
  );
}