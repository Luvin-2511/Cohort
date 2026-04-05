import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useItem from "../hooks/useItem";
import "../styles/notificationPanel.css";

const NotificationPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { resurfacedItems, handleGetResurfacedItems, loading } = useItem();
  const navigate = useNavigate();

  // Fetch resurfaced items consistently initially
  useEffect(() => {
    handleGetResurfacedItems();
  }, []);

  const handleToggle = () => {
    if (!isOpen) {
      handleGetResurfacedItems(); // Refresh items when opened just in case
    }
    setIsOpen(!isOpen);
  };

  function timeAgo(date) {
    const diff = Date.now() - new Date(date).getTime();
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (d === 0) return "Today";
    if (d === 1) return "Yesterday";
    return `${d}d ago`;
  }

  return (
    <div className="np-wrapper">
      <button className="np-btn" onClick={handleToggle} title="Resurfaced Memories">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        {resurfacedItems && resurfacedItems.length > 0 && (
          <span className="np-badge">{resurfacedItems.length}</span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="np-panel"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            <div className="np-header">
              <h3 className="np-title">✨ Resurfaced Items</h3>
              <button className="np-close" onClick={() => setIsOpen(false)}>✕</button>
            </div>

            <div className="np-content">
              {loading && (!resurfacedItems || resurfacedItems.length === 0) ? (
                <div style={{color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '2rem 0', fontSize: '0.9rem'}}>Checking memories...</div>
              ) : !resurfacedItems || resurfacedItems.length === 0 ? (
                <div style={{color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '2rem 0', fontSize: '0.9rem'}}>No resurfaced memories today.<br/>Come back later!</div>
              ) : (
                resurfacedItems.map((item) => (
                  <div 
                    key={item._id} 
                    className="np-item" 
                    onClick={() => {
                        setIsOpen(false);
                        navigate(`/item/${item._id}`);
                    }}
                  >
                    <p className="np-item-title">{item.title || item.url}</p>
                    <div className="np-item-meta">
                      <span className="np-item-type">{item.type}</span>
                      <span className="np-item-time">{timeAgo(item.createdAt)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationPanel;
