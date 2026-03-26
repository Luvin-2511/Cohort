import { useEffect } from "react";
import { Ic } from "./Icons";
import useChat from "../hooks/useChat";

export default function DdMenu({ items, style, onClose,chatId }) {
  useEffect(() => {
    const h = (e) => {
      if (!e.target.closest("[data-dd]")) onClose();
    };
    setTimeout(() => window.addEventListener("click", h), 0);
    return () => window.removeEventListener("click", h);
  }, [onClose]);
  const {handleDeleteChat} = useChat()

  return (
    <div data-dd className="dd-panel" style={style}>
      {items.map((it, i) =>
        it === null ? (
          <div
            key={i}
            className="dd-divider"
          />
        ) : (
          <button
            key={i}
            className={`dd-item${it.danger ? " danger" : ""}`}
            onClick={async ()=>{
              if(it.label ==="Delete"){
                await handleDeleteChat(chatId)
              }
              onClose()
            }}
          >
            <Ic d={it.icon} size={13} sw={1.8} />
            {it.label}
          </button>
        ),
      )}
    </div>
  );
}