import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import SaveModal from "../components/SaveModal";
import useItem from "../hooks/useItem";
import useCollection from "../hooks/useCollection";
import useAuth from "../../Auth/hooks/useAuth";
import "../styles/dashboard.css";
import "../styles/saveModal.css";

gsap.registerPlugin(ScrollTrigger);

/* ── HackerText Hook ─────────────────────────────────────── */
export const useHackerText = (originalText, isActive = false) => {
  const [displayText, setDisplayText] = useState(originalText);
  const intervalRef = useRef(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

  const scramble = () => {
    let iterations = 0;
    const maxIterations = 18;
    const original = originalText.toUpperCase();
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        if (iterations >= maxIterations) {
          clearInterval(intervalRef.current);
          return original;
        }
        const t = original
          .split("")
          .map((char, i) =>
            char === " "
              ? " "
              : i < iterations
                ? original[i]
                : chars[Math.floor(Math.random() * chars.length)]
          )
          .join("");
        iterations += 1 / 3;
        return t;
      });
    }, 28);
  };

  useEffect(() => {
    if (isActive) scramble();
    else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayText(originalText.toUpperCase());
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, originalText]);

  return displayText;
};

/* ── HackerText Component ────────────────────────────────── */
export const HackerText = ({
  text,
  className = "",
  as: Tag = "span",
  autoLoop = false,
  delay = 3000,
}) => {
  const [active, setActive] = useState(false);
  const timerRef = useRef(null);
  const display = useHackerText(text, active);

  useEffect(() => {
    if (!autoLoop) return;
    const start = () => {
      setActive(true);
      setTimeout(() => setActive(false), 900);
    };
    start();
    timerRef.current = setInterval(start, delay);
    return () => clearInterval(timerRef.current);
  }, [autoLoop, delay]);

  return (
    <Tag
      className={`hacker-text ${className}`}
      onMouseEnter={() => !autoLoop && setActive(true)}
      onMouseLeave={() => !autoLoop && setActive(false)}
    >
      {display}
    </Tag>
  );
};

/* ── Content Type Icons ──────────────────────────────────── */
const TYPE_ICONS = {
  Article: "🔗",
  YouTube: "▶",
  Tweet: "𝕏",
  Note: "📄",
  Image: "🖼",
};

const CONTENT_TYPES = ["Article", "YouTube", "Tweet", "Note", "Image"];

/* (SaveModal is imported from components/SaveModal.jsx) */

/* ── Item Card ───────────────────────────────────────────── */
export const ItemCard = ({ item }) => {
  const navigate = useNavigate();

  const isYouTube =
    item.url &&
    (item.url.includes("youtube.com") || item.url.includes("youtu.be"));

  const getYoutubeThumbnail = (url) => {
    try {
      const u = new URL(url);
      const id =
        u.searchParams.get("v") ||
        (u.hostname === "youtu.be" ? u.pathname.slice(1) : null);
      return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
    } catch {
      return null;
    }
  };

  const thumbnail = item.thumbnailUrl || (isYouTube ? getYoutubeThumbnail(item.url) : (item.type === 'image' ? item.url : null));
  const tags = item.tags?.slice(0, 3) || [];
  const extra = (item.tags?.length || 0) - 3;

  return (
    <motion.div
      className="item-card"
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      whileDrag={{ scale: 1.05, cursor: "grabbing", zIndex: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={() => navigate(`/item/${item._id}`)}
      style={{ cursor: "grab" }}
    >
      {/* Thumbnail */}
      <div className="item-card__thumb">
        {thumbnail ? (
          <img src={thumbnail} alt={item.title || "thumbnail"} loading="lazy" />
        ) : (
          <div className="item-card__thumb-placeholder">
            <span>{isYouTube ? "▶" : "🔗"}</span>
          </div>
        )}
        {/* Type badges */}
        <div className="item-card__badges">
          {isYouTube && <span className="item-badge item-badge--yt">YouTube</span>}
          {item.aiProcessed && <span className="item-badge item-badge--ai">⚡ AI READY</span>}
        </div>
      </div>

      {/* Content */}
      <div className="item-card__body">
        <h3 className="item-card__title">{item.title || item.url}</h3>
        {item.summary && (
          <p className="item-card__summary">{item.summary}</p>
        )}
        {tags.length > 0 && (
          <div className="item-card__tags">
            {tags.map((tag, i) => (
              <span key={i} className="item-tag">#{tag}</span>
            ))}
            {extra > 0 && <span className="item-tag item-tag--more">+{extra}</span>}
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ── Stat Card ───────────────────────────────────────────── */
const StatCard = ({ icon, value, label, accentColor }) => (
  <motion.div
    className="stat-card"
    whileHover={{ y: -4 }}
    transition={{ type: "spring", stiffness: 320, damping: 22 }}
  >
    <div className="stat-card__top">
      <span className="stat-card__icon" style={{ color: accentColor }}>{icon}</span>
      <span className="stat-card__dot" style={{ background: accentColor }} />
    </div>
    <div className="stat-card__value">{value}</div>
    <div className="stat-card__label">{label}</div>
  </motion.div>
);

/* ── Animation Variants ──────────────────────────────────── */
const containerVar = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0, opacity: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ── Main Dashboard ──────────────────────────────────────── */
const MemexDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mainRef = useRef(null);

  const { items, loading, handleGetItems, handleSaveItem } = useItem();
  const { collections, handleGetCollections } = useCollection();
  const { user } = useAuth();

  useEffect(() => {
    handleGetItems();
    handleGetCollections();
  }, []);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".db-hero-line", { width: 0, duration: 1.4, ease: "power4.out", delay: 0.6 });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  // Refresh items whenever the modal closes (covers both URL and file saves)
  const handleModalClose = () => {
    setIsModalOpen(false);
    handleGetItems();
  };

  // Compute stats
  const totalSaved = items?.length || 0;
  const readables = items?.filter(i => i.type === 'article' || i.type === 'pdf' || i.type === 'tweet' || i.type === 'note').length || 0;
  const totalCollections = collections?.length || 0;
  const uniqueTags = [...new Set(items?.flatMap((i) => i.tags || []))].length || 0;

  const recentItems = [...(items || [])].reverse().slice(0, 6);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="tn-container" ref={mainRef}>
      {/* Ambient glow */}
      <div className="tn-glow tn-glow--top" />
      <div className="tn-glow tn-glow--bot" />

      <Navbar />

      <main className="tn-main db-main">
        {/* ── Hero ── */}
        <motion.section
          className="db-hero"
          variants={containerVar}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="db-greeting" variants={fadeUp}>
            ⏰ {greeting.toUpperCase()}{user?.name ? `, ${user.name.toUpperCase()}` : ""}
          </motion.p>

          <motion.h1 className="db-hero-title" variants={fadeUp}>
            Your Second
            <br />
            <span className="db-hero-accent">Brain.</span>
          </motion.h1>

          <motion.div className="db-hero-meta" variants={fadeUp}>
            <div className="db-hero-line" />
            <p className="db-hero-sub">Everything you know, connected.</p>
            <span className="db-ai-badge">
              <span className="db-ai-dot" />
              AI online
            </span>
          </motion.div>
        </motion.section>

        {/* ── Stats Row ── */}
        <motion.div
          className="db-stats"
          variants={containerVar}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <StatCard icon="◈" value={totalSaved} label="TOTAL SAVED" accentColor="var(--acid)" />
          </motion.div>
          <motion.div variants={fadeUp}>
            <StatCard icon="📄" value={readables} label="DOCS & READS" accentColor="#4ecdc4" />
          </motion.div>
          <motion.div variants={fadeUp}>
            <StatCard icon="📁" value={totalCollections} label="COLLECTIONS" accentColor="var(--rust)" />
          </motion.div>
          <motion.div variants={fadeUp}>
            <StatCard icon="⌘" value={uniqueTags} label="UNIQUE TAGS" accentColor="#a78bfa" />
          </motion.div>
        </motion.div>

        {/* ── Recently Saved ── */}
        <section className="db-section">
          <div className="db-section-header">
            <div>
              <h2 className="db-section-title">Recently Saved</h2>
              <p className="db-section-count">{totalSaved} items</p>
            </div>
            <button className="db-view-all">
              View all <span className="db-arrow">→</span>
            </button>
          </div>

          {loading ? (
            <div className="db-loading">
              <div className="db-spinner" />
              <span>Loading your brain...</span>
            </div>
          ) : recentItems.length === 0 ? (
            <div className="db-empty">
              <div className="db-empty-icon">🧠</div>
              <p className="db-empty-title">Your second brain is empty</p>
              <p className="db-empty-sub">Save your first piece of content to get started</p>
              <button className="db-empty-btn" onClick={() => setIsModalOpen(true)}>
                + Save Content
              </button>
            </div>
          ) : (
            <motion.div
              className="db-grid"
              variants={containerVar}
              initial="hidden"
              animate="visible"
            >
              {recentItems.map((item, i) => (
                <motion.div key={item._id || i} variants={fadeUp}>
                  <ItemCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      </main>

      {/* ── Save Content Button (floating) ── */}
      <motion.button
        className="db-fab"
        onClick={() => setIsModalOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        + Save Content
      </motion.button>

      {/* ── Save Modal ── */}
      <SaveModal
        open={isModalOpen}
        onClose={handleModalClose}
      />

      {/* Decorative BG */}
      <div className="bg-deco" aria-hidden="true"><span>MEMEX</span></div>
    </div>
  );
};

export default MemexDashboard;