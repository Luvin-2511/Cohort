import { useEffect, useRef, useState } from "react";
import { Ic } from "./Icons";

export default function SearchModal({ chats, onSelect, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const filtered = chats.filter((c) =>
    c.title?.toLowerCase().includes(query.toLowerCase())
  );

  const fmt = (chat) => {
    const d = new Date(chat.updatedAt);
    const now = new Date();
    const diff = (now - d) / 1000;
    if (diff < 86400) return "Today";
    if (diff < 172800) return "Yesterday";
    return "Past week";
  };

  return (
    <>


      <div className="sm-backdrop" onClick={onClose}>
        <div className="sm-box" onClick={(e) => e.stopPropagation()}>
          {/* Input row */}
          <div className="sm-input-row">
            <Ic d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" size={15} sw={1.8} className="sm-icon" />
            <input
              ref={inputRef}
              className="sm-input"
              placeholder="Search chats and projects"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={onClose}
              className="sm-close-btn"
            >
              ✕
            </button>
          </div>

          {/* Results */}
          <div className="sm-list">
            {filtered.length === 0 ? (
              <div className="sm-empty">No chats found</div>
            ) : (
              filtered.map((chat) => (
                <div
                  key={chat._id}
                  className="sm-row"
                  onClick={() => { onSelect(chat._id); onClose(); }}
                >
                  <div className="sm-row-left">
                    <Ic d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" size={13} sw={1.6} className="sm-icon" />
                    <span className="sm-row-label">{chat.title || "Untitled"}</span>
                  </div>
                  <span className="sm-row-date">{fmt(chat)}</span>
                </div>
              ))
            )}
          </div>

          <div className="sm-close-hint ">
            <span className="sm-kbd">Esc</span> to close
          </div>
        </div>
      </div>
    </>
  );
}