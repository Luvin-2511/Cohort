import { useRef, useEffect } from "react";
import { gsap } from "https://cdn.skypack.dev/gsap";
import { Ic } from "./Icons";
import useChat from "../hooks/useChat";
export default function InputCard({
  input,
  setInput,
  inputCardRef,
  handleResponse,
}) {
  const taRef = useRef(null);
  const sendRef = useRef(null);
  const { messages, chatId, loading,prompts } = useChat();

  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
  }, [input]);

  useEffect(() => {
    if (!sendRef.current) return;
    let ctx = gsap.context(() => {
      gsap.to(sendRef.current, {
        boxShadow: input.trim()
          ? "0 4px 20px rgba(124,92,252,0.7)"
          : "0 4px 14px rgba(124,92,252,0.45)",
        duration: 0.3,
      });
    });
    return () => ctx.revert();
  }, [input]);

  const handleSubmit = async () => {
    setInput("");
    if (chatId !== null) {
      await handleResponse(input, chatId);
    } else {
      await handleResponse(input);
    }
  };

  const SAMPLE_PROMPTS = [
    {
      icon: "M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z",
      text: "Write a cover letter for a software role",
    },
    {
      icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
      text: "Debug my code and explain the fix",
    },
    {
      icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
      text: "Explain a concept like I'm a beginner",
    },
    {
      icon: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 0 3-3h7z",
      text: "Summarize this article or document",
    },
    {
      icon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
      text: "Plan a project with tasks and timeline",
    },
  ];

  return (
    <div
      ref={inputCardRef}
      className={`input-card-wrapper ${messages.length > 0 ? "has-messages" : "empty"}`}
    >
      <div className="input-card">
        <div className="input-shimmer-top" />

        <div className="input-textarea-container">
          <textarea
            ref={taRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question or type a prompt..."
            rows={1}
            className="input-textarea"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
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
              disabled={loading ? true : false}
              ref={sendRef}
              className="send-btn"
              onClick={handleSubmit}
            >
              <Ic
                d="M12 19V5M5 12l7-7 7 7"
                loading={loading}
                size={15}
                sw={2.2}
              />
            </button>
          </div>
        </div>
      </div>
      <p className="input-disclaimer">
        brainEX can make mistakes. Double-check important info.
      </p>
      {messages.length === 0 && (
        <div
          style={{
            display: "flex",
            flexDirection:"column",
            gap: 15,
            flexWrap: "wrap",
            padding: "0 4px 10px",
            paddingTop:"20px",
            justifyContent: "center",
          }}
        >
          {SAMPLE_PROMPTS.map((p) => (
            <button
              key={p.text}
              onClick={() => setInput(p.text)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent:"center",
                gap: 7,
                padding: "15px 12px",
                borderRadius: 15,
                border: "1px solid var(--border-2)",
                background: "rgb(0,0,0,0.1)",
                cursor: "pointer",
                fontSize: 13.5,
                color: "var(--text-secondary)",
                transition: "all 0.35s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--border)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--card-bg)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              <Ic d={p.icon} size={12} sw={1.7} />
              {p!=""?p.text:<></>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
