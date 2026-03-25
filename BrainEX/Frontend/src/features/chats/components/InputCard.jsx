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
    await handleResponse(input,chatId)
    setInput("")
  }

  return (
    <div
      ref={inputCardRef}
      style={{
        width: "100%",
        maxWidth: messages.length > 0 ? 990 : 590,
        transition: "all 0.5s ease",
        transform: messages.length > 0 ? "" : "",
      }}
    >
      <div className="input-card">
        {/* Top shimmer line */}
        <div
          style={{
            position: "absolute",
            inset: "0 0 auto",
            height: 1,
            background: dark
              ? "linear-gradient(90deg,transparent,rgba(160,140,255,0.1),transparent)"
              : "linear-gradient(90deg,transparent,rgba(100,80,200,0.07),transparent)",
          }}
        />

        {/* Textarea */}
        <div style={{ padding: "16px 16px 12px" }}>
          <textarea
            ref={taRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Create a"
            rows={1}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 14.5,
              color: "var(--text-primary)",
              lineHeight: 1.6,
              minHeight: 24,
              maxHeight: 160,
              caretColor: "var(--accent)",
              fontFamily: "'DM Sans',sans-serif",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                setInput("");
              }
            }}
          />
        </div>

        {/* Toolbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 12px 12px",
          }}
        >
          <button className="icon-btn" style={{ width: 32, height: 32 }}>
            <Ic
              d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
              size={14}
              sw={1.8}
            />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              className="nav-btn"
              style={{
                width: "auto",
                padding: "5px 10px",
                fontSize: 12.5,
                borderRadius: 8,
              }}
            >
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
      <p
        style={{
          textAlign: "center",
          fontSize: 11.5,
          color: "var(--text-dim)",
          marginTop: 10,
        }}
      >
        brainEX can make mistakes. Double-check important info.
      </p>
    </div>
  );
}
