import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useItem from "../hooks/useItem";
import "../styles/library.css";

/* ── Helpers ─────────────────────────────────────────────── */
const TYPE_FILTERS = [
  { key: "all",     label: "All",       icon: "◈" },
  { key: "youtube", label: "Youtube",   icon: "▶" },
  { key: "article", label: "Article",   icon: "🔗" },
  { key: "tweet",   label: "Tweet",     icon: "𝕏" },
  { key: "image",   label: "Image",     icon: "🖼" },
  { key: "pdf",     label: "Pdf",       icon: "📄" },
  { key: "video",   label: "Video",     icon: "🎬" },
];

function timeAgo(date) {
  const diff = Date.now() - new Date(date).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hour${h > 1 ? "s" : ""} ago`;
  const d = Math.floor(h / 24);
  return `${d} day${d > 1 ? "s" : ""} ago`;
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

function getTypeBadgeClass(type) {
  const map = {
    youtube: "lb--yt",
    article: "lb--article",
    tweet:   "lb--tweet",
    image:   "lb--image",
    pdf:     "lb--pdf",
    video:   "lb--video",
  };
  return map[type] || "lb--article";
}

function getTypeLabel(type) {
  const map = {
    youtube: "Youtube",
    article: "Article",
    tweet:   "Tweet",
    image:   "Image",
    pdf:     "PDF",
    video:   "Video",
  };
  return map[type] || type;
}

/* ── Card Components ─────────────────────────────────────── */
const GridCard = ({ item, onDelete, onShare }) => {
  const navigate = useNavigate();
  const thumbnail =
    item.thumbnailUrl ||
    (item.type === "youtube" ? getYoutubeThumbnail(item.url) : (item.type === "image" ? item.url : null));
  const tags = item.tags?.slice(0, 3) || [];
  const extra = (item.tags?.length || 0) - 3;

  return (
    <motion.div
      className="lc-card"
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      whileDrag={{ scale: 1.05, cursor: "grabbing", zIndex: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      onClick={() => navigate(`/item/${item._id}`)}
      style={{ cursor: "grab" }}
    >
      {/* Thumbnail */}
      <div className="lc-card__thumb">
        {thumbnail ? (
          <img src={thumbnail} alt={item.title || "thumbnail"} loading="lazy" />
        ) : (
          <div className="lc-card__thumb-bg">
            <span className="lc-card__thumb-icon">
              {item.type === "article" ? "🔗" : item.type === "pdf" ? "📄" : item.type === "tweet" ? "𝕏" : "◈"}
            </span>
          </div>
        )}
      </div>

      {/* Badges */}
      <div className="lc-card__badges">
        <span className={`lb ${getTypeBadgeClass(item.type)}`}>
          {getTypeLabel(item.type)}
        </span>
        {item.tags?.length > 0 && (
          <span className="lb lb--ai">⚡ AI READY</span>
        )}
      </div>

      {/* Body */}
      <div className="lc-card__body">
        <h3 className="lc-card__title">{item.title || item.url}</h3>
        {item.content && (
          <p className="lc-card__summary">{item.content}</p>
        )}

        {tags.length > 0 && (
          <div className="lc-card__tags">
            {tags.map((t, i) => (
              <span key={i} className="lc-tag">#{t}</span>
            ))}
            {extra > 0 && <span className="lc-tag lc-tag--more">+{extra}</span>}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="lc-card__footer">
        <span className="lc-card__time">{timeAgo(item.createdAt)}</span>
        <div className="lc-card__actions">
          <button
            className="lc-action-btn"
            title="Share"
            onClick={(e) => { e.stopPropagation(); onShare(item.url); }}
          >
            <ShareIcon />
          </button>
          <button
            className="lc-action-btn lc-action-btn--danger"
            title="Delete"
            onClick={(e) => { e.stopPropagation(); onDelete(item._id); }}
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ListCard = ({ item, onDelete, onShare }) => {
  const navigate = useNavigate();
  const thumbnail =
    item.thumbnailUrl ||
    (item.type === "youtube" ? getYoutubeThumbnail(item.url) : (item.type === "image" ? item.url : null));
  const tags = item.tags?.slice(0, 4) || [];
  const extra = (item.tags?.length || 0) - 4;

  return (
    <motion.div
      className="lc-list-card"
      layout
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      whileDrag={{ scale: 1.02, cursor: "grabbing", zIndex: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      onClick={() => navigate(`/item/${item._id}`)}
      style={{ cursor: "grab" }}
    >
      {thumbnail && (
        <div className="lc-list-card__thumb">
          <img src={thumbnail} alt={item.title || "thumbnail"} loading="lazy" />
        </div>
      )}
      <div className="lc-list-card__content">
        <div className="lc-list-card__top">
          <span className={`lb ${getTypeBadgeClass(item.type)}`}>
            {getTypeLabel(item.type)}
          </span>
          {item.tags?.length > 0 && (
            <span className="lb lb--ai">⚡ AI READY</span>
          )}
          <span className="lc-list-card__time">{timeAgo(item.createdAt)}</span>
        </div>
        <h3 className="lc-list-card__title">{item.title || item.url}</h3>
        {item.content && (
          <p className="lc-list-card__summary">{item.content}</p>
        )}
        {tags.length > 0 && (
          <div className="lc-list-card__tags">
            {tags.map((t, i) => <span key={i} className="lc-tag">#{t}</span>)}
            {extra > 0 && <span className="lc-tag lc-tag--more">+{extra}</span>}
          </div>
        )}
      </div>
      <div className="lc-list-card__actions">
        <button className="lc-action-btn" title="Share" onClick={(e) => { e.stopPropagation(); onShare(item.url); }}>
          <ShareIcon />
        </button>
        <button className="lc-action-btn lc-action-btn--danger" title="Delete" onClick={(e) => { e.stopPropagation(); onDelete(item._id); }}>
          <TrashIcon />
        </button>
      </div>
    </motion.div>
  );
};

/* ── SVG Icons ───────────────────────────────────────────── */
const ShareIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
    <polyline points="16 6 12 2 8 6"/>
    <line x1="12" y1="2" x2="12" y2="15"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);

const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
    <circle cx="3" cy="6" r="1" fill="currentColor"/><circle cx="3" cy="12" r="1" fill="currentColor"/><circle cx="3" cy="18" r="1" fill="currentColor"/>
  </svg>
);

/* ── Delete Confirm Modal ────────────────────────────────── */
const DeleteModal = ({ isOpen, onConfirm, onCancel, loading }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="del-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
      >
        <motion.div
          className="del-card"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="del-icon">🗑</div>
          <h3 className="del-title">Delete Item?</h3>
          <p className="del-sub">This will permanently remove the item from your second brain.</p>
          <div className="del-actions">
            <button className="del-btn del-btn--cancel" onClick={onCancel}>Cancel</button>
            <button className="del-btn del-btn--confirm" onClick={onConfirm} disabled={loading}>
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ── Main Library Page ───────────────────────────────────── */
const LibraryPage = () => {
  const [view, setView]           = useState("grid");       // "grid" | "list"
  const [activeFilter, setFilter] = useState("all");
  const [search, setSearch]       = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [deleteId, setDeleteId]   = useState(null);
  const searchRef = useRef(null);

  const {
    items, matchedItems, loading,
    handleGetItems, handleSearchItems, handleDeleteItem,
  } = useItem();

  /* Fetch all items on mount */
  useEffect(() => { handleGetItems(); }, []);

  /* Debounce search */
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(search), 420);
    return () => clearTimeout(t);
  }, [search]);

  /* Trigger semantic search */
  useEffect(() => {
    if (debouncedQ.trim()) {
      handleSearchItems(debouncedQ.trim());
    }
  }, [debouncedQ]);

  /* Which list to display */
  const sourceList = debouncedQ.trim() ? (matchedItems || []) : (items || []);

  /* Client-side type filter */
  const filtered = activeFilter === "all"
    ? sourceList
    : sourceList.filter((i) => i.type === activeFilter);

  const handleShare = (url) => {
    navigator.clipboard?.writeText(url);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await handleDeleteItem(deleteId);
    setDeleteId(null);
    handleGetItems();
  };

  /* Keyboard shortcut: '/' focuses search */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && document.activeElement !== searchRef.current) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const containerVar = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } },
  };

  return (
    <div className="lib-page">
      <Navbar />

      <main className="lib-main">
        {/* ── Header ── */}
        <motion.div
          className="lib-header"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <h1 className="lib-title">Library</h1>
            <p className="lib-subtitle">
              <span className="lib-count">{(items || []).length}</span>
              {" "}item{(items || []).length !== 1 ? "s" : ""} saved in your knowledge base
            </p>
          </div>

          {/* View toggle */}
          <div className="lib-view-toggle">
            <button
              className={`lib-toggle-btn ${view === "grid" ? "active" : ""}`}
              onClick={() => setView("grid")}
              title="Grid view"
            >
              <GridIcon />
            </button>
            <button
              className={`lib-toggle-btn ${view === "list" ? "active" : ""}`}
              onClick={() => setView("list")}
              title="List view"
            >
              <ListIcon />
            </button>
          </div>
        </motion.div>

        {/* ── Search ── */}
        <motion.div
          className="lib-search-wrap"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="lib-search-icon">🔍</span>
          <input
            ref={searchRef}
            className="lib-search"
            type="text"
            placeholder="Search your knowledge..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="lib-search-clear" onClick={() => setSearch("")}>✕</button>
          )}
          <div className="lib-search-kbd" title="Press / to focus">
            <kbd>/</kbd>
          </div>
          {loading && debouncedQ && (
            <span className="lib-search-spinner" />
          )}
        </motion.div>

        {/* ── Filter Tabs ── */}
        <motion.div
          className="lib-filters"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.13, duration: 0.4 }}
        >
          {TYPE_FILTERS.map((f) => {
            const count = f.key === "all"
              ? (items || []).length
              : (items || []).filter((i) => i.type === f.key).length;
            return (
              <button
                key={f.key}
                className={`lib-filter-btn ${activeFilter === f.key ? "active" : ""}`}
                onClick={() => setFilter(f.key)}
              >
                <span className="lib-filter-icon">{f.icon}</span>
                {f.label}
                {count > 0 && (
                  <span className="lib-filter-count">{count}</span>
                )}
              </button>
            );
          })}
        </motion.div>

        {/* ── Content ── */}
        {loading && !debouncedQ ? (
          <div className="lib-loading">
            <div className="lib-spinner" />
            <span>Loading your library...</span>
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            className="lib-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="lib-empty-icon">
              {search ? "🔍" : "🧠"}
            </div>
            <p className="lib-empty-title">
              {search ? "No results found" : "Your library is empty"}
            </p>
            <p className="lib-empty-sub">
              {search
                ? `No items match "${search}"`
                : "Save your first piece of content to get started"}
            </p>
          </motion.div>
        ) : (
          <>
            {/* Result count for search */}
            {debouncedQ && (
              <p className="lib-result-count">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{debouncedQ}"
              </p>
            )}

            <AnimatePresence mode="wait">
              {view === "grid" ? (
                <motion.div
                  key="grid"
                  className="lib-grid"
                  variants={containerVar}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                >
                  {filtered.map((item) => (
                    <GridCard
                      key={item._id}
                      item={item}
                      onDelete={(id) => setDeleteId(id)}
                      onShare={handleShare}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  className="lib-list"
                  variants={containerVar}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                >
                  {filtered.map((item) => (
                    <ListCard
                      key={item._id}
                      item={item}
                      onDelete={(id) => setDeleteId(id)}
                      onShare={handleShare}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </main>

      {/* Delete confirm modal */}
      <DeleteModal
        isOpen={!!deleteId}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
        loading={loading}
      />
    </div>
  );
};

export default LibraryPage;
