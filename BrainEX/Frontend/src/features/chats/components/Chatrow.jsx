import { useRef } from "react";
import { gsap } from "https://cdn.skypack.dev/gsap";
import { DotsIc } from "./Icons";
import { useDispatch } from "react-redux";
import { setChatId } from "../slices/chat.slice";
import useChat from "../hooks/useChat";

export default function ChatRow({ label, onMenu, handleMessagesOfChat }) {
  const btnRef = useRef(null);
  const rowRef = useRef(null);
  const dispatch = useDispatch();
  const {chatId} =useChat()

  const openMessage = async () => {
    dispatch(setChatId(label._id));
    await handleMessagesOfChat(label._id);
  };

  return (
    <div
      onClick={openMessage}
      ref={rowRef}
      className={`chat-row ${chatId === label._id ? 'active' : ''}`}
      onMouseEnter={() => gsap.to(rowRef.current, { x: 2, duration: 0.15 })}
      onMouseLeave={() => gsap.to(rowRef.current, { x: 0, duration: 0.15 })}
    >
      <span className={`chat-row-title ${chatId === label._id ? 'active' : ''}`}>
        {label.title}
      </span>
      <button
        ref={btnRef}
        className="dots-btn"
        onClick={(e) => {
          e.stopPropagation();
          onMenu(e, btnRef,label._id);
        }}
      >
        <DotsIc />
      </button>
    </div>
  );
}
