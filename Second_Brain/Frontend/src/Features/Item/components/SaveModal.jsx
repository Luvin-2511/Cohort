import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "../styles/saveModal.css";

const TYPE_ICONS = {
  article: "📄", tweet: "𝕏", pdf: "📑",
  video: "▶", image: "🖼", note: "📝",
};

export default function SaveModal({ open, onClose }) {
  const wrapRef    = useRef();
  const cardRef    = useRef();
  const inputRef   = useRef();
  const [url, setUrl]     = useState("");
  const [type, setType]   = useState("article");
  const [dragging, setDragging] = useState(false);
  const [saving, setSaving]     = useState(false);
  const [saved,  setSaved]      = useState(false);

  useEffect(() => {
    if (open) {
      gsap.set(wrapRef.current, { display: "flex" });
      const tl = gsap.timeline();
      tl.fromTo(wrapRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      tl.fromTo(cardRef.current,
        { y: 40, scale: 0.94, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: "power4.out" }, "-=0.1"
      );
      tl.fromTo(cardRef.current.querySelectorAll(".sm-anim"),
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.4, ease: "power3.out" }, "-=0.2"
      );
      setTimeout(() => inputRef.current?.focus(), 200);
    } else {
      const tl = gsap.timeline({
        onComplete: () => gsap.set(wrapRef.current, { display: "none" }),
      });
      tl.to(cardRef.current, { y: 30, scale: 0.96, opacity: 0, duration: 0.35, ease: "power3.in" });
      tl.to(wrapRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
      setUrl(""); setSaved(false); setSaving(false);
    }
  }, [open]);

  const handleSave = async () => {
    if (!url.trim()) {
      gsap.to(inputRef.current, { x: [0,-8,8,-6,6,-3,0], duration: 0.4, ease: "none" });
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSaving(false); setSaved(true);
    gsap.fromTo(cardRef.current.querySelector(".sm-success"),
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.8)" }
    );
    setTimeout(() => onClose(), 1800);
  };

  const onDrop = (e) => {
    e.preventDefault(); setDragging(false);
    const text = e.dataTransfer.getData("text/plain") || e.dataTransfer.getData("text/uri-list");
    if (text) setUrl(text);
  };

  return (
    <div className="sm-wrap" ref={wrapRef} onClick={(e) => e.target === wrapRef.current && onClose()}>
      <div
        className={`sm-card ${dragging ? "dragging" : ""}`}
        ref={cardRef}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        {!saved ? (
          <>
            <div className="sm-header sm-anim">
              <div className="sm-title">SAVE TO BRAIN</div>
              <button className="sm-close" onClick={onClose}>✕</button>
            </div>

            {/* Drop zone hint */}
            <div className="sm-drop-hint sm-anim">
              <span>Drop a URL anywhere · or paste below</span>
            </div>

            {/* URL Input */}
            <div className="sm-input-wrap sm-anim">
              <input
                ref={inputRef}
                type="url"
                className="sm-input"
                placeholder="https://..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
              />
            </div>

            {/* Type selector */}
            <div className="sm-types sm-anim">
              {Object.entries(TYPE_ICONS).map(([t, icon]) => (
                <button
                  key={t}
                  className={`sm-type-btn ${type === t ? "active" : ""}`}
                  onClick={() => setType(t)}
                >
                  <span>{icon}</span>
                  <span>{t}</span>
                </button>
              ))}
            </div>

            {/* Note */}
            <textarea className="sm-note sm-anim" placeholder="Add a note… (optional)" rows={2} />

            {/* Save button */}
            <button
              className={`sm-save-btn sm-anim ${saving ? "loading" : ""}`}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (
                <><span className="sm-spinner" /><span>Saving to brain…</span></>
              ) : (
                <><span>+</span><span>SAVE TO BRAIN</span><span>→</span></>
              )}
            </button>

            <div className="sm-shortcut sm-anim">
              Press <kbd>⌘S</kbd> anywhere to quick-save
            </div>
          </>
        ) : (
          <div className="sm-success">
            <div className="sm-success-icon">✓</div>
            <div className="sm-success-title">SAVED.</div>
            <p className="sm-success-sub">AI is tagging and embedding now.</p>
          </div>
        )}
      </div>
    </div>
  );
}