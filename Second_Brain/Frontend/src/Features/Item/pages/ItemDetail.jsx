import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getItemById } from "../services/item.api";
import Navbar from "../components/Navbar";
import "../styles/itemDetail.css";

/* ── Type colors for pattern fallback ─────────────────────── */
const TYPE_COLORS = {
  article:  ["#4ecdc4", "#0d3535"],
  video:    ["#ff6b6b", "#3d0f0f"],
  youtube:  ["#ff6b6b", "#3d0f0f"],
  tweet:    ["#1da1f2", "#061e36"],
  image:    ["#a78bfa", "#1a0b38"],
  note:     ["#fbd874", "#2a210a"],
  default:  ["#c7f300", "#131900"],
};

/* ── Animated dot-grid fallback ──────────────────────────── */
const UniquePattern = ({ type }) => {
  const colors = TYPE_COLORS[type] || TYPE_COLORS.default;
  return (
    <div
      className="id-unique-pattern"
      style={{ "--color1": colors[0], "--color2": colors[1] }}
    >
      <div className="id-pattern-grid">
        {[...Array(108)].map((_, i) => (
          <motion.div
            key={i}
            className="id-pattern-dot"
            animate={{ scale: [1, 1.7, 1], opacity: [0.15, 0.8, 0.15] }}
            transition={{
              duration: 2.5 + Math.random() * 2.5,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
      <motion.div
        className="id-unique-type"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 0.8 }}
        transition={{ delay: 0.25, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
      >
        {type?.toUpperCase() || "CONTENT"}
      </motion.div>
    </div>
  );
};

/* ── Helper: extract hostname ─────────────────────────────── */
const getHostname = (url) => {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
};

/* ── Main Component ──────────────────────────────────────── */
const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const data = await getItemById(id);
      if (data.success && data.item) setItem(data.item);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="id-loading">
        <div className="id-spinner" />
        <span className="id-loading-text">Fetching content</span>
      </div>
    );
  }

  /* ── Error ── */
  if (!item) {
    return (
      <div className="id-error">
        <div className="id-error-num">404</div>
        <div className="id-error-msg">Item Not Found</div>
        <div className="id-error-sub">This content has vanished into the void</div>
        <button className="id-error-btn" onClick={() => navigate(-1)}>
          ← Go Back
        </button>
      </div>
    );
  }

  /* ── YouTube embed ── */
  const isYouTube =
    (item.type === "video" || item.type === "youtube") &&
    (item.url?.includes("youtube.com") || item.url?.includes("youtu.be"));
  let embedUrl = item.url;
  if (isYouTube) {
    const m = item.url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
    );
    if (m?.[1]) embedUrl = `https://www.youtube.com/embed/${m[1]}?autoplay=0&rel=0`;
  }

  const formattedDate = new Date(item.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const displayType = item.type || "note";

  /* ── Entrance animation variants ── */
  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: (d = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, delay: d, ease: [0.19, 1, 0.22, 1] },
    }),
  };

  return (
    <div className="item-detail-page">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="id-hero">
        {/* Nav overlay */}
        <div className="id-hero-nav">
          <motion.button
            className="id-back-btn"
            onClick={() => navigate(-1)}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          >
            ← Back
          </motion.button>
          <motion.div
            className="id-type-badge"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          >
            {displayType}
          </motion.div>
        </div>

        {/* Media */}
        <div className="id-hero-media">
          {isYouTube ? (
            <div className="id-video-wrapper">
              <iframe
                src={embedUrl}
                title={item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : item.thumbnailUrl ? (
            <img
              src={item.thumbnailUrl}
              alt={item.title}
              className="id-hero-img"
            />
          ) : (
            <UniquePattern type={displayType} />
          )}
        </div>

        {/* Gradient overlay (only for non-video) */}
        {!isYouTube && <div className="id-hero-overlay" />}

        {/* Hero text (only when not a video embed, for readability) */}
        {!isYouTube && (
          <div className="id-hero-text">
            <motion.div
              className="id-hero-kicker"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              {displayType}
            </motion.div>
            <motion.h1
              className="id-hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.85, ease: [0.19, 1, 0.22, 1] }}
            >
              {item.title || "Untitled Content"}
            </motion.h1>
          </div>
        )}
      </section>

      {/* ── CONTENT ─────────────────────────────────────── */}
      <main className="id-main">
        {/* Primary column */}
        <motion.div
          className="id-primary"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          {/* Title (only shown here when video, since hero text is hidden) */}
          {isYouTube && (
            <motion.div className="id-title-section" variants={fadeUp} custom={0}>
              <h1 className="id-title">{item.title || "Untitled Content"}</h1>
            </motion.div>
          )}

          {/* Meta row */}
          <motion.div
            className="id-title-section"
            variants={fadeUp}
            custom={0.05}
          >
            {!isYouTube && <h1 className="id-title">{item.title || "Untitled Content"}</h1>}
            <div className="id-meta-row">
              <span className="id-meta-item">{formattedDate}</span>
              <span className="id-meta-dot" />
              <span className="id-meta-item">
                {item.viewCount || 1} {item.viewCount === 1 ? "view" : "views"}
              </span>
              {item.tags?.length > 0 && (
                <>
                  <span className="id-meta-dot" />
                  <span className="id-meta-item">{item.tags.length} tags</span>
                </>
              )}
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div className="id-actions" variants={fadeUp} custom={0.1}>
            <button className="id-action-btn" title="Like">
              <span className="btn-icon">♡</span> Save
            </button>
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="id-action-btn"
              title="Open Original"
            >
              <span className="btn-icon">↗</span> Open Source
            </a>
            <button
              className="id-action-btn"
              title="Copy link"
              onClick={() => navigator.clipboard?.writeText(item.url)}
            >
              <span className="btn-icon">⎘</span> Copy URL
            </button>
          </motion.div>

          {/* AI Insights */}
          {item.aiInsights?.length > 0 && (
            <motion.div className="id-content-block" variants={fadeUp} custom={0.15}>
              <div className="id-block-label">
                <span className="id-block-icon">✦</span> AI Insights
              </div>
              <ul className="id-insights-list">
                {item.aiInsights.map((insight, idx) => (
                  <motion.li
                    key={idx}
                    className="id-insight-item"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.07, duration: 0.5 }}
                  >
                    <span className="id-insight-num">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {insight}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Description / Content */}
          {item.content && (
            <motion.div className="id-content-block" variants={fadeUp} custom={0.2}>
              <div className="id-block-label">
                <span className="id-block-icon">✎</span> Description
              </div>
              <p className="id-description-text">{item.content}</p>
            </motion.div>
          )}

          {/* Tags */}
          <motion.div className="id-content-block" variants={fadeUp} custom={0.25}>
            <div className="id-block-label">
              <span className="id-block-icon">#</span> Tags
            </div>
            {item.tags?.length > 0 ? (
              <div className="id-tags-list">
                {item.tags.map((tag, idx) => (
                  <motion.span
                    key={idx}
                    className="id-tag-badge"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            ) : (
              <p
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(240,235,225,0.25)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                No tags
              </p>
            )}
          </motion.div>
        </motion.div>

        {/* ── SIDEBAR ─────────────────────────────────── */}
        <motion.aside
          className="id-sidebar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Source card */}
          <div className="id-sidebar-card">
            <div className="id-sb-label">Source</div>
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="id-source-link"
            >
              <span className="id-source-url">{getHostname(item.url)}</span>
              <span className="id-source-arrow">↗</span>
            </a>
          </div>

          {/* Date saved */}
          <div className="id-sidebar-card">
            <div className="id-sb-label">Saved on</div>
            <div className="id-sb-value small">{formattedDate}</div>
            <div className="id-sb-bignum">
              {new Date(item.createdAt).getDate()}
            </div>
          </div>

          {/* Type */}
          <div className="id-sidebar-card">
            <div className="id-sb-label">Content Type</div>
            <div className="id-sb-value accent">{displayType.toUpperCase()}</div>
          </div>

          {/* Views */}
          <div className="id-sidebar-card">
            <div className="id-sb-label">Views</div>
            <div className="id-sb-value">{item.viewCount || 1}</div>
            <div className="id-sb-bignum">{item.viewCount || 1}</div>
          </div>

          {/* Tags count */}
          {item.tags?.length > 0 && (
            <div className="id-sidebar-card">
              <div className="id-sb-label">Tags</div>
              <div className="id-sb-value accent">{item.tags.length}</div>
            </div>
          )}

          {/* AI Insights count */}
          {item.aiInsights?.length > 0 && (
            <div className="id-sidebar-card">
              <div className="id-sb-label">AI Insights</div>
              <div className="id-sb-value">{item.aiInsights.length}</div>
            </div>
          )}
        </motion.aside>
      </main>
    </div>
  );
};

export default ItemDetail;
