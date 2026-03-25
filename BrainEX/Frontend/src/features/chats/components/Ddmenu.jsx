import { useEffect } from "react";
import { Ic } from "./icons";

export default function DdMenu({ items, style, onClose }) {
  useEffect(() => {
    const h = (e) => {
      if (!e.target.closest("[data-dd]")) onClose();
    };
    setTimeout(() => window.addEventListener("click", h), 0);
    return () => window.removeEventListener("click", h);
  }, [onClose]);

  return (
    <div data-dd className="dd-panel" style={style}>
      {items.map((it, i) =>
        it === null ? (
          <div
            key={i}
            style={{ height: 1, background: "var(--border)", margin: "4px 6px" }}
          />
        ) : (
          <button
            key={i}
            className={`dd-item${it.danger ? " danger" : ""}`}
            onClick={onClose}
          >
            <Ic d={it.icon} size={13} sw={1.8} />
            {it.label}
          </button>
        ),
      )}
    </div>
  );
}