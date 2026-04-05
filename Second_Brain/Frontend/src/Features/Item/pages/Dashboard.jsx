import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar, { HackerText, MagneticButton } from "../components/Navbar";
import "../styles/dashboard.css";

gsap.registerPlugin(ScrollTrigger);

/* ── Dummy Data ──────────────────────────────────────────── */
const METRICS = [
  { label: "TOTAL SAVED",   value: "4,822", sub: "+12% FROM LAST CYCLE", icon: "◈", accent: true  },
  { label: "AI PROCESSED",  value: "1,209", sub: "98.4% ACCURACY",       icon: "⚡", accent: false },
  { label: "FAVORITES",     value: "428",   sub: "PRIORITY NODES",       icon: "★", accent: false },
  { label: "TAGS",          value: "84",    sub: "ACTIVE TAXONOMIES",    icon: "⌘", accent: false },
];

const ARCHIVES = [
  {
    type: "VIDEO SOURCE",
    typeColor: "primary",
    title: "The Future of Decentralized Intelligence",
    time: "Saved 2h ago · 14:02 duration",
  },
  {
    type: "ACADEMIC ARTICLE",
    typeColor: "white",
    title: "Neural Plasticity in Hybrid AI Systems",
    time: "Saved 5h ago · 4.2k words",
  },
  {
    type: "DATA STREAM",
    typeColor: "gray",
    title: "Global Market Sentiment Index",
    time: "Saved 1d ago · Live Feed",
  },
];

const ACTIVITY = [
  { time: "14:02", label: "Node 'Quantum_Cognition' linked", type: "link"   },
  { time: "12:44", label: "3 articles processed by AI",     type: "ai"     },
  { time: "11:30", label: "New cluster formed: BIOTECH",    type: "cluster" },
  { time: "09:15", label: "Sync completed: 847 nodes",      type: "sync"   },
  { time: "08:00", label: "Daily digest generated",         type: "digest" },
];

const NODES = [
  { id: 1, label: "CYBERNETICS", cx: 150, cy: 80,  r: 40, r2: 20, color: "#c7f300" },
  { id: 2, label: "QUANTUM",     cx: 310, cy: 155, r: 30, r2: 15, color: "#c7f300" },
  { id: 3, label: "SYSTEM",      cx: 460, cy: 220, r: 50, r2: 25, color: "#ffffff" },
  { id: 4, label: "BIOTECH",     cx: 200, cy: 230, r: 28, r2: 14, color: "#c8441a" },
  { id: 5, label: "AI/ML",       cx: 420, cy: 75,  r: 35, r2: 18, color: "#c7f300" },
];

const LINKS = [
  [0, 1], [1, 2], [0, 3], [1, 4], [3, 2], [4, 2],
];

/* ── Animation Variants ──────────────────────────────────── */
const containerVar = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const cardVar = {
  hidden: { y: 32, opacity: 0, scale: 0.97 },
  visible: {
    y: 0, opacity: 1, scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 26 },
  },
  hover: {
    y: -7,
    transition: { type: "spring", stiffness: 380, damping: 22 },
  },
};

const slideUp = {
  hidden: { y: 24, opacity: 0 },
  visible: (i = 0) => ({
    y: 0, opacity: 1,
    transition: { delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  }),
};

/* ── Ticker ──────────────────────────────────────────────── */
const Ticker = ({ items }) => (
  <div className="ticker-wrap">
    <motion.div
      className="ticker-track"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
    >
      {[...items, ...items].map((item, i) => (
        <span key={i} className="ticker-item">
          {item} <span className="ticker-dot">◆</span>
        </span>
      ))}
    </motion.div>
  </div>
);

/* ── Neural SVG ──────────────────────────────────────────── */
const NeuralMap = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const lines = svgRef.current?.querySelectorAll(".n-line");
    if (!lines) return;
    gsap.fromTo(lines,
      { strokeDashoffset: 300 },
      { strokeDashoffset: 0, duration: 1.8, stagger: 0.2, ease: "power2.inOut" }
    );
    gsap.to(".pulse-ring", {
      scale: 1.15, opacity: 0.5,
      duration: 1.6, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.3,
    });
    gsap.to(".n-particle", {
      y: -28, x: "random(-18, 18)", opacity: 0,
      duration: "random(2,4)", repeat: -1, yoyo: true,
      ease: "sine.inOut", stagger: 0.12,
    });
  }, []);

  return (
    <div className="neural-wrap" ref={svgRef}>
      <svg className="neural-svg" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet">
        {LINKS.map(([a, b], i) => {
          const A = NODES[a], B = NODES[b];
          return (
            <line
              key={i}
              className="n-line"
              x1={A.cx} y1={A.cy} x2={B.cx} y2={B.cy}
              stroke={A.color === B.color ? A.color : "#ffffff"}
              strokeWidth="1"
              strokeOpacity="0.4"
              strokeDasharray="300"
              strokeDashoffset="300"
            />
          );
        })}
        {NODES.map((n) => (
          <g key={n.id}>
            <circle className="pulse-ring" cx={n.cx} cy={n.cy} r={n.r}
              fill="none" stroke={n.color} strokeWidth="1" opacity="0.3" />
            <circle cx={n.cx} cy={n.cy} r={n.r2}
              fill={n.color} fillOpacity="0.12" stroke={n.color} strokeWidth="1.5" />
            <text x={n.cx} y={n.cy + 4} textAnchor="middle"
              fill={n.color} fontSize="8" fontWeight="700" letterSpacing="0.08em">
              {n.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="particles-container">
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="n-particle"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

/* ── Main Dashboard ──────────────────────────────────────── */
const ThoughtNetDashboard = () => {
  const [activePage, setActivePage]     = useState("dashboard");
  const [hoveredCard, setHoveredCard]   = useState(null);
  const [hoveredArchive, setHoveredArchive] = useState(null);
  const mainRef = useRef(null);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", { width: 0, duration: 1.2, ease: "power4.out", delay: 0.5 });
      ScrollTrigger.batch(".scroll-reveal", {
        onEnter: (els) =>
          gsap.fromTo(els,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: "power3.out" }
          ),
        once: true,
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="tn-container" ref={mainRef}>
      {/* Ambient glow */}
      <div className="tn-glow tn-glow--top" />
      <div className="tn-glow tn-glow--bot" />

      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        onSave={() => alert("Saved to ThoughtNet!")}
        userName="THOUGHTNET"
      />

      <main className="tn-main">
        {/* ── Hero ── */}
        <section className="hero-section">
          <motion.h1
            className="hero-title"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <HackerText text="YOUR SECOND" as="span" autoLoop delay={4000} />
            <br />
            <HackerText text="BRAIN" as="span" className="hero-title--accent" autoLoop delay={5000} />
          </motion.h1>

          <motion.div
            className="hero-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <div className="hero-line" />
            <span className="hero-badge">◆ SYNCHRONIZED &amp; OPERATIONAL</span>
          </motion.div>
        </section>

        {/* ── Ticker ── */}
        <Ticker
          items={[
            "NEURAL MAP ACTIVE", "4,822 NODES INDEXED", "AI PROCESSING",
            "98.4% ACCURACY", "LIVE SYNC", "3 NEW CLUSTERS",
          ]}
        />

        {/* ── Bento Grid ── */}
        <motion.div
          className="bento-grid"
          variants={containerVar}
          initial="hidden"
          animate="visible"
        >
          {/* Metric Cards */}
          {METRICS.map((m, idx) => (
            <motion.div
              key={m.label}
              className={`metric-card ${hoveredCard === idx ? "metric-card--hovered" : ""}`}
              variants={cardVar}
              whileHover="hover"
              onHoverStart={() => setHoveredCard(idx)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <div className="metric-card__top">
                <span className={`metric-icon ${m.accent ? "metric-icon--accent" : ""}`}>
                  {m.icon}
                </span>
                <span className="metric-label">{m.label}</span>
              </div>
              <div className="metric-value">
                <HackerText text={m.value} />
              </div>
              <div className={`metric-sub ${m.accent ? "metric-sub--accent" : ""}`}>
                {m.sub}
              </div>
              {hoveredCard === idx && (
                <motion.div
                  className="metric-card__shine"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.div>
          ))}

          {/* Neural Map Card */}
          <motion.div className="clusters-card" variants={cardVar} whileHover="hover">
            <div className="clusters-header">
              <h3 className="clusters-title">
                <HackerText text="ACTIVE CLUSTERS" />
              </h3>
              <div className="clusters-badges">
                <span className="badge badge--primary">NEURAL_MAP_V2</span>
                <span className="badge badge--dim">● LIVE</span>
              </div>
            </div>

            <NeuralMap />

            <div className="clusters-footer">
              <p className="sync-msg">
                Synchronizing node 'Global_Econ' with remote repo · 800ms latency detected
              </p>
              <MagneticButton className="mag-btn--ghost">
                EXPAND VIEW
              </MagneticButton>
            </div>
          </motion.div>

          {/* Archives Card */}
          <motion.div className="archives-card" variants={cardVar} whileHover="hover">
            <div className="archives-header">
              <h3 className="archives-title">
                <HackerText text="RECENT ARCHIVES" />
              </h3>
              <MagneticButton className="mag-btn--white" style={{ fontSize: "0.65rem", padding: "0.4rem 1rem" }}>
                + ADD NEW
              </MagneticButton>
            </div>

            <div className="archives-list">
              {ARCHIVES.map((a, idx) => (
                <motion.div
                  key={idx}
                  className={`archive-item ${hoveredArchive === idx ? "archive-item--hovered" : ""}`}
                  onHoverStart={() => setHoveredArchive(idx)}
                  onHoverEnd={() => setHoveredArchive(null)}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="archive-item__top">
                    <span className={`archive-badge archive-badge--${a.typeColor}`}>
                      {a.type}
                    </span>
                    <span className="archive-more">···</span>
                  </div>
                  <h4 className="archive-title">{a.title}</h4>
                  <p className="archive-time">{a.time}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Activity Feed */}
          <motion.div className="activity-card scroll-reveal" variants={cardVar}>
            <h3 className="panel-title">
              <HackerText text="ACTIVITY LOG" />
            </h3>
            <div className="activity-list">
              {ACTIVITY.map((a, i) => (
                <motion.div
                  key={i}
                  className="activity-item"
                  custom={i}
                  variants={slideUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="activity-time">{a.time}</span>
                  <span className={`activity-dot activity-dot--${a.type}`} />
                  <span className="activity-label">{a.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Capture Card */}
          <motion.div className="capture-card scroll-reveal" variants={cardVar}>
            <h3 className="panel-title">
              <HackerText text="QUICK CAPTURE" />
            </h3>
            <div className="capture-body">
              <div className="capture-input-wrap">
                <span className="capture-prefix">&gt;_</span>
                <span className="capture-placeholder">Paste URL, idea, or text…</span>
                <span className="capture-cursor" />
              </div>
              <div className="capture-tags">
                {["#ai", "#research", "#design", "#business"].map((t) => (
                  <motion.span
                    key={t}
                    className="capture-tag"
                    whileHover={{ scale: 1.08, backgroundColor: "rgba(199,243,0,0.15)" }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
              <MagneticButton style={{ width: "100%", justifyContent: "center" }}>
                CAPTURE NODE
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Decorative BG text ── */}
        <div className="bg-deco" aria-hidden="true">
          <span>THOUGHTNET</span>
        </div>
      </main>
    </div>
  );
};

export default ThoughtNetDashboard;