import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useCollection from "../hooks/useCollection";
import useItem from "../hooks/useItem";
import { ItemCard } from "./Dashboard";
import "../styles/collection.css";

/* ── Create Collection Modal ─────────────────────────────── */
const CreateCollectionModal = ({ isOpen, onClose, onConfirm, loading }) => {
  const [name, setName] = useState("");

  /* Reset on open/close */
  useEffect(() => {
    if (isOpen) setName("");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onConfirm(name.trim());
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="cc-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="cc-modal"
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            onClick={(e) => e.stopPropagation()}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="cc-modal-header">
              <h2>New Collection</h2>
              <button className="cc-btn-close" onClick={onClose}>✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="cc-form">
              <div className="cc-field">
                <label>Collection Name</label>
                <input
                  type="text"
                  placeholder="e.g. Machine Learning, Design Inspo..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              <button
                type="submit"
                className="cc-btn-submit"
                disabled={!name.trim() || loading}
              >
                {loading ? "Creating..." : "Create Collection"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ── Main Collections Page ───────────────────────────────── */
const CollectionsPage = () => {
  const { collections, loading, handleGetCollections, handleCreateCollection } = useCollection();
  const { items, handleGetItems, loading: loadingItems } = useItem();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCol, setSelectedCol] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetCollections();
    handleGetItems();
  }, [handleGetCollections]);

  const onConfirmCreate = async (name) => {
    try {
      await handleCreateCollection(name);
      setModalOpen(false);
      handleGetCollections();
    } catch {}
  };

  const containerVar = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } },
  };

  const itemVar = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <div className="col-page">
      <Navbar />

      <main className="col-main">
        {/* ── Header ── */}
        <motion.header
          className="col-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="col-header__left">
            <h1 className="col-title">Collections</h1>
            <p className="col-subtitle">Organize your knowledge into curated sets</p>
          </div>

          <button
            className="col-header__btn"
            onClick={() => setModalOpen(true)}
          >
            <span className="col-btn-icon">+</span>
            New Collection
          </button>
        </motion.header>

        {/* ── Content ── */}
        <AnimatePresence mode="wait">
          {selectedCol ? (
            /* ── Folder View (Inside a Collection) ── */
            <motion.div
              key="folder-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <button 
                className="col-back-btn" 
                onClick={() => setSelectedCol(null)}
              >
                ← Back to Collections
              </button>
              
              <div className="col-folder-header">
                <h2>📁 {selectedCol.name}</h2>
              </div>

              {loadingItems ? (
                <div className="col-loading"><span className="col-spinner" /></div>
              ) : (
                <div className="col-grid">
                  {items.filter(i => i.collectionId === selectedCol._id).length === 0 ? (
                    <p className="col-empty-sub">This collection is empty.</p>
                  ) : (
                    items.filter(i => i.collectionId === selectedCol._id).map(item => (
                      <motion.div key={item._id} variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }} initial="hidden" animate="visible">
                        <ItemCard item={item} />
                      </motion.div>
                    ))
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            /* ── Main Collections Grid ── */
            <motion.div
              key="grid-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {loading && collections.length === 0 ? (
                <div className="col-loading">
                  <span className="col-spinner" />
                  Loading collections...
                </div>
              ) : collections.length === 0 ? (
                <motion.div
                  className="col-empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="col-empty-icon">📁</div>
                  <p className="col-empty-title">No collections yet</p>
                  <p className="col-empty-sub">Create a collection to group your items.</p>
                  <button className="col-empty-btn" onClick={() => setModalOpen(true)}>
                    + Create your first collection
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  className="col-grid"
                  variants={containerVar}
                  initial="hidden"
                  animate="visible"
                >
                  {collections.map((col) => (
                    <motion.div 
                      key={col._id} 
                      className="col-card" 
                      variants={itemVar} 
                      whileHover={{ y: -3 }}
                      onClick={() => setSelectedCol(col)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="col-card__icon-wrap">
                        <span className="col-card__icon">📁</span>
                      </div>
                      <div className="col-card__body">
                        <h3 className="col-card__title">{col.name}</h3>
                        <p className="col-card__count">
                          <span className="col-card__count-icon">🗂</span>
                          {col.itemCount || 0} item{(col.itemCount || 0) !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <CreateCollectionModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={onConfirmCreate}
        loading={loading}
      />
    </div>
  );
};

export default CollectionsPage;
