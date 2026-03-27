import { useEffect, useRef, useState } from "react";
import { Ic } from "./Icons";
import useChat from "../hooks/useChat";
import useUser from "../../user/hooks/useUser";

export default function DdMenu({ items, style, onClose, chatId }) {
  const [renaming, setRenaming] = useState(false);
  const [renameVal, setRenameVal] = useState("");
  const inputRef = useRef(null);
  const { handleDeleteChat } = useChat();
  const {handleNewTitle} = useUser()

  useEffect(() => {
    const h = (e) => {
      if (!e.target.closest("[data-dd]")) onClose();
    };
    setTimeout(() => window.addEventListener("click", h), 0);
    return () => window.removeEventListener("click", h);
  }, [onClose]);

  // focus input when rename panel opens
  useEffect(() => {
    if (renaming) setTimeout(() => inputRef.current?.focus(), 0);
  }, [renaming]);

  return (
    <div data-dd className="dd-panel" style={style}>
      {!renaming ? (
        items.map((it, i) =>
          it === null ? (
            <div key={i} className="dd-divider" />
          ) : (
            <button
              key={i}
              className={`dd-item${it.danger ? " danger" : ""}`}
              onClick={async (e) => {
                e.stopPropagation();
                if (it.label === "Delete") {
                  await handleDeleteChat(chatId);
                  onClose();
                } else if (it.label === "Rename") {
                  setRenaming(true);
                } else onClose();
              }}
            >
              <Ic d={it.icon} size={13} sw={1.8} />
              {it.label}
            </button>
          ),
        )
      ) : (
        <div
          style={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div
            style={{ fontSize: 11, color: "var(--text-dim)", paddingLeft: 2 }}
          >
            Rename chat
          </div>
          <input
            ref={inputRef}
            value={renameVal}
            onChange={(e) => setRenameVal(e.target.value)}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === "Enter") onClose();
              if (e.key === "Escape") onClose();
            }}
            placeholder="New name..."
            style={{
              width: "100%",
              padding: "7px 10px",
              borderRadius: 8,
              border: "1.5px solid var(--accent)",
              background: "var(--card-bg)",
              color: "var(--text-primary)",
              fontSize: 13,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={async (e) => {
                e.stopPropagation();
                await handleNewTitle(chatId,renameVal)
                onClose();
              }}
              style={{
                flex: 1,
                padding: "6px 0",
                borderRadius: 8,
                border: "none",
                background: "var(--accent)",
                color: "#fff",
                fontSize: 12.5,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Save
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              style={{
                flex: 1,
                padding: "6px 0",
                borderRadius: 8,
                border: "none",
                background: "var(--border)",
                color: "var(--text-secondary)",
                fontSize: 12.5,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
