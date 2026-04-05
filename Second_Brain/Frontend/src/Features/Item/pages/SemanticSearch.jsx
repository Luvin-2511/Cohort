import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useItem from "../hooks/useItem";
import "../styles/semanticSearch.css";

/* ── Helpers ─────────────────────────────────────────────── */
const PLACEHOLDERS = [
  "What was that article about black holes...",
  "Videos about machine learning basics...",
  "Notes on productivity systems...",
  "Tweets about web design...",
  "Research papers on AI and creativity...",
  "That documentary about deep ocean...",
];

function timeAgo(date) {
  const diff = Date.now() - new Date(date).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function getYoutubeThumbnail(url) {
  try {
    const u = new URL(url);
    const id =
      u.searchParams.get("v") ||
      (u.hostname === "youtu.be" ? u.pathname.slice(1) : null);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
  } catch {
    return null;
  }
}

const TYPE_BADGE_MAP = {
  youtube: { label: "Youtube",  cls: "sb--yt" },
  article: { label: "Article",  cls: "sb--article" },
  tweet:   { label: "Tweet",    cls: "sb--tweet" },
  image:   { label: "Image",    cls: "sb--image" },
  pdf:     { label: "PDF",      cls: "sb--pdf" },
  video:   { label: "Video",    cls: "sb--video" },
};

/* ── Result Card ─────────────────────────────────────────── */
const ResultCard = ({ item, index, onCardClick }) => {
  const badge = TYPE_BADGE_MAP[item.type] || { label: item.type, cls: "sb--article" };
  const thumbnail =
    item.thumbnailUrl ||
    (item.type === "youtube" ? getYoutubeThumbnail(item.url) : null);
  const tags = item.tags?.slice(0, 3) || [];
  const extra = (item.tags?.length || 0) - 3;

  return (
    <motion.div
      className="ss-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      onClick={() => onCardClick(item._id)}
      style={{ cursor: "pointer" }}
    >
      {thumbnail && (
        <div className="ss-card__thumb">
          <img src={thumbnail} alt={item.title} loading="lazy" />
          <div className="ss-card__thumb-overlay" />
        </div>
      )}

      <div className="ss-card__body">
        <div className="ss-card__badges">
          <span className={`sb ${badge.cls}`}>{badge.label}</span>
          {item.tags?.length > 0 && (
            <span className="sb sb--ai">⚡ AI MATCH</span>
          )}
        </div>

        <h3 className="ss-card__title">{item.title || item.url}</h3>

        {item.content && (
          <p className="ss-card__summary">{item.content}</p>
        )}

        {tags.length > 0 && (
          <div className="ss-card__tags">
            {tags.map((t, i) => (
              <span key={i} className="ss-tag">#{t}</span>
            ))}
            {extra > 0 && <span className="ss-tag ss-tag--more">+{extra}</span>}
          </div>
        )}
      </div>

      <div className="ss-card__footer">
        <span className="ss-card__time">{timeAgo(item.createdAt)}</span>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ss-card__open"
          onClick={(e) => e.stopPropagation()}
        >
          Open ↗
        </a>
      </div>
    </motion.div>
  );
};

/* ── Suggestion Chip ─────────────────────────────────────── */
const Chip = ({ text, onClick }) => (
  <motion.button
    className="ss-chip"
    onClick={() => onClick(text)}
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.97 }}
  >
    {text}
  </motion.button>
);

const SUGGESTIONS = [
  "black holes physics",
  "machine learning",
  "productivity tips",
  "web design trends",
  "climate change research",
  "philosophy of mind",
  "financial markets",
  "space exploration",
];

/* ── Main Page ───────────────────────────────────────────── */
const SemanticSearchPage = () => {
  const navigate = useNavigate();
  const [query, setQuery]           = useState("");
  const [submitted, setSubmitted]   = useState("");
  const [placeholderIdx, setIdx]    = useState(0);
  const [recentSearches, setRecent] = useState([]);
  const inputRef                    = useRef(null);

  const { matchedItems, loading, handleSearchItems } = useItem();

  /* Cycle placeholder text */
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % PLACEHOLDERS.length), 3000);
    return () => clearInterval(t);
  }, []);

  /* Load recent from localStorage */
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("ss_recent") || "[]");
      setRecent(stored);
    } catch {}
  }, []);

  const saveRecent = (q) => {
    try {
      const next = [q, ...recentSearches.filter((r) => r !== q)].slice(0, 6);
      setRecent(next);
      localStorage.setItem("ss_recent", JSON.stringify(next));
    } catch {}
  };

  const runSearch = async (q) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setSubmitted(trimmed);
    saveRecent(trimmed);
    await handleSearchItems(trimmed);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runSearch(query);
  };

  const handleChipClick = (text) => {
    setQuery(text);
    runSearch(text);
  };

  const clearSearch = () => {
    setQuery("");
    setSubmitted("");
  };

  /* Keyboard: Escape to clear */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") clearSearch();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hasResults = submitted && matchedItems?.length > 0;
  const noResults  = submitted && !loading && matchedItems?.length === 0;

  return (
    <div className="ss-page">
      <Navbar />

      <main className="ss-main">

        {/* ── Search Hero ── */}
        <motion.section
          className="ss-hero"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="ss-hero__label">
            <span className="ss-ai-dot" />
            AI-POWERED SEMANTIC SEARCH
          </div>

          <h1 className="ss-hero__title">
            Search your <span className="ss-hero__accent">Second Brain</span>
          </h1>
          <p className="ss-hero__sub">
            Uses vector embeddings to find what you{"\u2019"}re looking for — even if you don{"\u2019"}t remember the exact words.
          </p>

          {/* Search form */}
          <form className="ss-form" onSubmit={handleSubmit}>
            <div className="ss-input-wrap">
              <span className="ss-input-icon">
                {loading ? <span className="ss-input-spinner" /> : "🔍"}
              </span>
              <input
                ref={inputRef}
                className="ss-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={PLACEHOLDERS[placeholderIdx]}
                autoComplete="off"
                autoFocus
              />
              {query && (
                <button
                  type="button"
                  className="ss-input-clear"
                  onClick={clearSearch}
                >
                  ✕
                </button>
              )}
              <button
                type="submit"
                className="ss-submit-btn"
                disabled={!query.trim() || loading}
              >
                Search
              </button>
            </div>
            <p className="ss-input-hint">
              Press <kbd>Enter</kbd> to search · <kbd>Esc</kbd> to clear
            </p>
          </form>
        </motion.section>

        {/* ── Recent Searches ── */}
        <AnimatePresence>
          {!submitted && recentSearches.length > 0 && (
            <motion.section
              className="ss-section"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="ss-section-header">
                <h2 className="ss-section-title">Recent searches</h2>
                <button
                  className="ss-section-clear"
                  onClick={() => {
                    setRecent([]);
                    localStorage.removeItem("ss_recent");
                  }}
                >
                  Clear all
                </button>
              </div>
              <div className="ss-chips">
                {recentSearches.map((r, i) => (
                  <Chip key={i} text={r} onClick={handleChipClick} />
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ── Suggestions (when no query) ── */}
        <AnimatePresence>
          {!submitted && (
            <motion.section
              className="ss-section"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.15 }}
            >
              <h2 className="ss-section-title">Try searching for</h2>
              <div className="ss-chips">
                {SUGGESTIONS.map((s, i) => (
                  <Chip key={i} text={s} onClick={handleChipClick} />
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ── Loading ── */}
        {loading && (
          <motion.div
            className="ss-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="ss-loading__orb" />
            <div className="ss-loading__text">
              <p className="ss-loading__title">Searching your knowledge base...</p>
              <p className="ss-loading__sub">Running vector similarity search</p>
            </div>
          </motion.div>
        )}

        {/* ── No Results ── */}
        {noResults && (
          <motion.div
            className="ss-empty"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="ss-empty__icon">🔍</div>
            <p className="ss-empty__title">No matches found</p>
            <p className="ss-empty__sub">
              No items semantically match "{submitted}". Try different words or save more content.
            </p>
            <button className="ss-empty__btn" onClick={clearSearch}>
              Clear search
            </button>
          </motion.div>
        )}

        {/* ── Results ── */}
        {hasResults && !loading && (
          <motion.section
            className="ss-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="ss-results-header">
              <h2 className="ss-results-title">
                {matchedItems.length} result{matchedItems.length !== 1 ? "s" : ""}
                <span className="ss-results-query"> for "{submitted}"</span>
              </h2>
              <button className="ss-results-clear" onClick={clearSearch}>
                ✕ Clear
              </button>
            </div>

            <div className="ss-grid">
              {matchedItems.map((item, i) => (
                <ResultCard key={item._id} item={item} index={i} onCardClick={(id) => navigate(`/item/${id}`)} />
              ))}
            </div>
          </motion.section>
        )}
      </main>
    </div>
  );
};

export default SemanticSearchPage;
