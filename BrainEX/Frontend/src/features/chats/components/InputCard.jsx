import { useRef, useEffect } from "react";
import { gsap } from "https://cdn.skypack.dev/gsap";
import { Ic } from "./Icons";
import useChat from "../hooks/useChat";

export default function InputCard({ input, setInput, dark, inputCardRef,handleResponse }) {
  const taRef = useRef(null);
  const sendRef = useRef(null);
  const { messages,chatId } = useChat();

  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
  }, [input]);

  useEffect(() => {
    if (!sendRef.current) return;
    gsap.to(sendRef.current, {
      boxShadow: input.trim()
        ? "0 4px 20px rgba(124,92,252,0.7)"
        : "0 4px 14px rgba(124,92,252,0.45)",
      duration: 0.3,
    });
  }, [input]);

  const handleSubmit = async () => {
    setInput("")
    if(chatId!==null){
      await handleResponse(input,chatId)
    }else{
      await handleResponse(input)
    }
  }

  return (
    <div
      ref={inputCardRef}
      className={`input-card-wrapper ${messages.length > 0 ? 'has-messages' : 'empty'}`}
    >
      <div className="input-card">
        {/* Top shimmer line */}
        <div className="input-shimmer-top" />

        {/* Textarea */}
        <div className="input-textarea-container">
          <textarea
            ref={taRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Create a"
            rows={1}
            className="input-textarea"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit()
              }
            }}
          />
        </div>

        {/* Toolbar */}
        <div className="input-toolbar">
          <button className="icon-btn input-toolbar-left-btn">
            <Ic
              d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
              size={14}
              sw={1.8}
            />
          </button>
          <div className="input-toolbar-right">
            <button className="nav-btn input-model-btn">
              BrainEx 1.0 <Ic d="M6 9l6 6 6-6" size={11} sw={2} />
            </button>
            <button
              ref={sendRef}
              className="send-btn"
              onClick={handleSubmit}
            >
              <Ic d="M12 19V5M5 12l7-7 7 7" size={13} sw={2.2} />
            </button>
          </div>
        </div>
      </div>
      <p className="input-disclaimer">
        brainEX can make mistakes. Double-check important info.
      </p>
    </div>
  );
}
