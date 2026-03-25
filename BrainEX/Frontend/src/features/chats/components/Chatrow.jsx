import { useRef } from "react";
import { gsap } from "https://cdn.skypack.dev/gsap";
import { DotsIc } from "./icons";

export default function ChatRow({ label, onMenu, handleMessagesOfChat }) {
  const btnRef = useRef(null);
  const rowRef = useRef(null);

  const openMessage = async () => {
    await handleMessagesOfChat(label._id);
  };

  return (
    <div
      ref={rowRef}
      className="chat-row"
      onMouseEnter={() => gsap.to(rowRef.current, { x: 2, duration: 0.15 })}
      onMouseLeave={() => gsap.to(rowRef.current, { x: 0, duration: 0.15 })}
    >
      <span
        onClick={openMessage}
        style={{
          fontSize: 13,
          color: "var(--text-muted)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          flex: 1,
          lineHeight: 1.35,
          transition: "color 0.1s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
      >
        {label.title}
      </span>
      <button
        ref={btnRef}
        className="dots-btn"
        onClick={(e) => {
          e.stopPropagation();
          onMenu(e, btnRef);
        }}
      >
        <DotsIc />
      </button>
    </div>
  );
}