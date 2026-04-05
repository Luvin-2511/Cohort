import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { toast } from "react-toastify";
import { saveItem, saveFile } from "../services/item.api";
import useCollection from "../hooks/useCollection";
import "../styles/saveModal.css";

const ACCEPT_MAP = {
  image: "image/*",
  video: "video/mp4,video/webm,video/mov",
  pdf: "application/pdf",
};

const FILE_TYPE_ICONS = { image: "🖼", video: "▶", pdf: "📑" };
const FILE_TYPE_LABELS = { image: "Image", video: "Video", pdf: "PDF" };

export default function SaveModal({ open, onClose }) {
  const wrapRef = useRef();
  const cardRef = useRef();
  const inputRef = useRef();
  const fileRef = useRef();

  // Tabs: "url" | "file"
  const [tab, setTab] = useState("url");
  const [url, setUrl] = useState("");
  const [fileType, setFileType] = useState("image");
  const [file, setFile] = useState(null);
  const [fileTitle, setFileTitle] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [dragging, setDragging] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const { collections, handleGetCollections, loading: loadingCollections } = useCollection();

  /* ── Fetch Collections ── */
  useEffect(() => {
    if (open) {
      handleGetCollections();
    }
  }, [open, handleGetCollections]);

  /* ── Animation ── */
  useEffect(() => {
    if (!cardRef.current) return;
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
      reset();
    }
  }, [open]);

  const reset = () => {
    setUrl(""); setFile(null); setFileTitle(""); setCollectionId("");
    setSaved(false); setSaving(false); setTab("url");
  };

  /* ── URL Save ── */
  const handleSaveUrl = async () => {
    if (!url.trim()) {
      gsap.to(inputRef.current, { x: [0, -8, 8, -6, 6, -3, 0], duration: 0.4, ease: "none" });
      return;
    }
    setSaving(true);
    try {
      const res = await saveItem(url.trim(), collectionId);
      if (res.success) {
        setSaving(false); setSaved(true);
        gsap.fromTo(cardRef.current.querySelector(".sm-success"),
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.8)" }
        );
        setTimeout(() => onClose(), 1800);
      }
    } catch (err) {
      setSaving(false);
      toast.error(err?.response?.data?.message || "Failed to save");
    }
  };

  /* ── File Save ── */
  const handleSaveFile = async () => {
    if (!file) return;
    setSaving(true);
    try {
      const res = await saveFile(file, fileTitle, collectionId);
      if (res.success) {
        setSaving(false); setSaved(true);
        gsap.fromTo(cardRef.current.querySelector(".sm-success"),
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.8)" }
        );
        setTimeout(() => onClose(), 1800);
      }
    } catch (err) {
      setSaving(false);
      toast.error(err?.response?.data?.message || "Failed to upload file");
    }
  };

  /* ── Drag & Drop for file tab ── */
  const onDrop = useCallback((e) => {
    e.preventDefault(); setDragging(false);
    if (tab === "file") {
      const dropped = e.dataTransfer.files?.[0];
      if (dropped) setFile(dropped);
      return;
    }
    const text = e.dataTransfer.getData("text/plain") || e.dataTransfer.getData("text/uri-list");
    if (text) setUrl(text);
  }, [tab]);

  const formatBytes = (bytes) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
            {/* Header */}
            <div className="sm-header sm-anim">
              <div className="sm-title">SAVE TO BRAIN</div>
              <button className="sm-close" onClick={onClose}>✕</button>
            </div>

            {/* Tabs */}
            <div className="sm-tabs sm-anim">
              <button
                className={`sm-tab ${tab === "url" ? "active" : ""}`}
                onClick={() => setTab("url")}
              >
                🔗 URL / Link
              </button>
              <button
                className={`sm-tab ${tab === "file" ? "active" : ""}`}
                onClick={() => setTab("file")}
              >
                📁 Upload File
              </button>
            </div>

            {/* ── URL TAB ── */}
            {tab === "url" && (
              <>
                <div className="sm-drop-hint sm-anim">
                  <span>Drop a URL anywhere · or paste below</span>
                </div>
                <div className="sm-input-wrap sm-anim">
                  <input
                    ref={inputRef}
                    type="url"
                    className="sm-input"
                    placeholder="https://..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveUrl()}
                  />
                </div>
                <div className="sm-input-wrap sm-anim">
                  <select
                    className="sm-input"
                    value={collectionId}
                    onChange={(e) => setCollectionId(e.target.value)}
                  >
                    <option value="">Save to Collection (Optional)</option>
                    {collections.map((col) => (
                      <option key={col._id} value={col._id}>
                        {col.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  className={`sm-save-btn sm-anim ${saving ? "loading" : ""}`}
                  onClick={handleSaveUrl}
                  disabled={saving}
                >
                  {saving ? (
                    <><span className="sm-spinner" /><span>Saving to brain…</span></>
                  ) : (
                    <><span>+</span><span>SAVE TO BRAIN</span><span>→</span></>
                  )}
                </button>
              </>
            )}

            {/* ── FILE TAB ── */}
            {tab === "file" && (
              <>
                {/* File type selector */}
                <div className="sm-file-types sm-anim">
                  {Object.entries(FILE_TYPE_ICONS).map(([t, icon]) => (
                    <button
                      key={t}
                      className={`sm-file-type-btn ${fileType === t ? "active" : ""}`}
                      onClick={() => { setFileType(t); setFile(null); }}
                    >
                      <span className="sm-ft-icon">{icon}</span>
                      <span>{FILE_TYPE_LABELS[t]}</span>
                    </button>
                  ))}
                </div>

                {/* Drop zone / file picker */}
                <div
                  className={`sm-dropzone sm-anim ${dragging ? "dragging" : ""} ${file ? "has-file" : ""}`}
                  onClick={() => fileRef.current?.click()}
                >
                  <input
                    ref={fileRef}
                    type="file"
                    accept={ACCEPT_MAP[fileType]}
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                  {file ? (
                    <div className="sm-file-info">
                      <span className="sm-file-icon">{FILE_TYPE_ICONS[fileType]}</span>
                      <div className="sm-file-meta">
                        <span className="sm-file-name">{file.name}</span>
                        <span className="sm-file-size">{formatBytes(file.size)}</span>
                      </div>
                      <button
                        className="sm-file-remove"
                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                      >✕</button>
                    </div>
                  ) : (
                    <div className="sm-dropzone-inner">
                      <span className="sm-dropzone-icon">{FILE_TYPE_ICONS[fileType]}</span>
                      <span className="sm-dropzone-label">
                        Drop {FILE_TYPE_LABELS[fileType].toLowerCase()} here or <u>click to browse</u>
                      </span>
                      <span className="sm-dropzone-sub">Max 50 MB</span>
                    </div>
                  )}
                </div>

                {/* Optional custom title */}
                <div className="sm-input-wrap sm-anim">
                  <input
                    type="text"
                    className="sm-input"
                    placeholder="Title (optional — auto-detected from filename)"
                    value={fileTitle}
                    onChange={(e) => setFileTitle(e.target.value)}
                  />
                </div>

                <div className="sm-input-wrap sm-anim">
                  <select
                    className="sm-input"
                    value={collectionId}
                    onChange={(e) => setCollectionId(e.target.value)}
                  >
                    <option value="">Save to Collection (Optional)</option>
                    {collections.map((col) => (
                      <option key={col._id} value={col._id}>
                        {col.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className={`sm-save-btn sm-anim ${saving ? "loading" : ""}`}
                  onClick={handleSaveFile}
                  disabled={saving || !file}
                >
                  {saving ? (
                    <><span className="sm-spinner" /><span>Uploading…</span></>
                  ) : (
                    <><span>↑</span><span>UPLOAD & SAVE</span><span>→</span></>
                  )}
                </button>
              </>
            )}

            <div className="sm-shortcut sm-anim">
              Press <kbd>⌘S</kbd> anywhere to quick-save a URL
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