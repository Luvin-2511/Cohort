import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import usePost from "../Hooks/usePost.jsx";
import useAuth from "../../Auth/Hooks/useAuth.jsx";

const ImageVideoIcon = () => (
    <svg width="80" height="70" viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="10" width="52" height="42" rx="4" stroke="white" strokeWidth="2.5" fill="none"/>
        <circle cx="16" cy="24" r="5" stroke="white" strokeWidth="2.5" fill="none"/>
        <path d="M2 40 L18 26 L32 38 L42 30 L54 40" stroke="white" strokeWidth="2.5" strokeLinejoin="round"
              fill="none"/>
        <rect x="44" y="28" width="34" height="28" rx="4" stroke="white" strokeWidth="2.5" fill="#3a3a3a"/>
        <polygon points="56,38 56,50 68,44" fill="white"/>
    </svg>
);

export default function CreatePost() {
    const navigate = useNavigate()
    const [preview, setPreview] = useState(null);
    const [caption, setCaption] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const fileInputRef = useRef(null);
    const MAX_CAPTION = 2000;
    const {handleCreatePost, loading} = usePost()
    const {user} = useAuth()

    const handleFile = (file) => {
        if (preview?.url) {
            URL.revokeObjectURL(preview.url);
        }

        const url = URL.createObjectURL(file);
        setPreview({
            url,
            type: file.type.startsWith("video") ? "video" : "image"
        });
    };


    const handleSelect = (e) => {
        const file = e.target.files[0];
        if (file) handleFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!preview) return;
        setSubmitted(true);
        const file = fileInputRef.current.files[0]
        await handleCreatePost(file, caption)
        navigate('/')
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

        .cp-wrap * { box-sizing: border-box; font-family: 'DM Sans', -apple-system, sans-serif; }

        .cp-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: #121212;
        }
        .cp-back-btn {
  position: absolute;
  top: 14px;
  left: 14px;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: none;
  background: #0095f6;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
  z-index: 10;
}
.cp-back-btn:hover { background: #1aa3ff; }
.cp-back-btn:active { background: #0081d6; transform: scale(0.98); }

        .cp-card {
          display: flex;
          border-radius: 16px;
          overflow: hidden;
          background: #1e1e1e;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 32px 80px rgba(0,0,0,0.6);
          width: 820px;
          min-height: 540px;
        }

        /* LEFT */
        .cp-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #181818;
          position: relative;
          overflow: hidden;
          min-height: 540px;
        }

        .cp-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          padding: 40px;
        }

        .cp-empty p {
          color: rgba(255,255,255,0.75);
          font-size: 18px;
          font-weight: 300;
          margin: 0;
          letter-spacing: -0.2px;
        }

        /* THE BUTTON — gradient pill, Instagram-style */
        .cp-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 9px 22px;
          border-radius: 8px;
          border: none;
          background: #0095f6;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.1px;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
          outline: none;
        }
        .cp-btn-primary:hover { background: #1aa3ff; }
        .cp-btn-primary:active { background: #0081d6; transform: scale(0.98); }

        .cp-preview-wrap {
          position: relative;
          width: 100%;
          height: 540px;
        }
        .cp-preview-wrap img,
        .cp-preview-wrap video {
          width: 100%;
          height: 100%;
          object-fit: contain;
          background: #111;
        }

        .cp-icon-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: none;
          background: rgba(0,0,0,0.6);
          color: #fff;
          font-size: 20px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          backdrop-filter: blur(6px);
          transition: background 0.15s;
        }
        .cp-icon-btn:hover { background: rgba(0,0,0,0.85); }

        /* RIGHT */
        .cp-right {
          width: 300px;
          display: flex;
          flex-direction: column;
          border-left: 1px solid rgba(255,255,255,0.07);
        }

        .cp-header {
          padding: 16px 20px;
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.92);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.1px;
        }

        .cp-user-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        .cp-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(45deg, #f9a825, #e91e8c, #7c3aed);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .cp-username {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.88);
        }

        .cp-caption-zone {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 14px 16px 0;
        }

        .cp-textarea {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          resize: none;
          color: rgba(255,255,255,0.85);
          font-size: 13.5px;
          line-height: 1.65;
          min-height: 155px;
        }
        .cp-textarea::placeholder { color: rgba(255,255,255,0.25); }

        .cp-char-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-top: 1px solid rgba(255,255,255,0.07);
          margin-top: 6px;
        }
        .cp-emoji { font-size: 18px; cursor: pointer; line-height: 1; }
        .cp-count { font-size: 11px; color: rgba(255,255,255,0.25); }

        .cp-location-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          border-top: 1px solid rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.28);
        }
        .cp-location-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: rgba(255,255,255,0.78);
          font-size: 13px;
        }
        .cp-location-input::placeholder { color: rgba(255,255,255,0.28); }

        .cp-footer {
          padding: 14px 16px 18px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }

        .cp-share-btn {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: none;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s, opacity 0.15s;
          outline: none;
        }
        .cp-share-btn.ready {
          background: #0095f6;
          color: #fff;
        }
        .cp-share-btn.ready:hover { background: #1aa3ff; }
        .cp-share-btn.ready:active { background: #0081d6; transform: scale(0.98); }
        .cp-share-btn.idle {
          background: rgba(0,149,246,0.25);
          color: rgba(255,255,255,0.3);
          cursor: not-allowed;
        }
        .cp-share-btn.success {
          background: #22c55e;
          color: #fff;
        }
      `}</style>

                {loading &&
                    <div
                        className={`loadingLiner ${loading ? "animate-[Loading_0.7s_linear_forwards]" : ""} transition-all duration-700 absolute animate-loader py-0.5 bg-gradient-to-l from-pink-500 via-blue-600 via-blue-400 via-pink-500 to-blue-500`}>
                    </div>
                }
            <div className="cp-wrap">
                <div className="cp-card">

                    {/* LEFT */}
                    <div className="cp-left">
                        <button className="cp-back-btn" onClick={() => navigate('/')}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                 strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5M5 12L12 19M5 12L12 5"/>
                            </svg>
                        </button>
                        {preview ? (
                            <div className="cp-preview-wrap">
                                {preview.type === "image"
                                    ? <img src={preview.url} alt="preview"/>
                                    : <video src={preview.url} controls/>
                                }
                                <button className="cp-icon-btn" onClick={() => {
                                    setPreview(null);
                                    setCaption("");

                                }}>
                                    ×
                                </button>
                            </div>
                        ) : (
                            <div className="cp-empty">
                                <ImageVideoIcon/>
                                <p>Select photos and videos to share</p>
                                <button className="cp-btn-primary" onClick={() => fileInputRef.current?.click()}>
                                    Select from computer
                                </button>
                            </div>
                        )}
                    </div>

                    {/* RIGHT */}
                    <div className="cp-right">
                        <div className="cp-header">Create new post</div>

                        <div className="cp-user-row">
                            <div className="cp-avatar">R</div>
                            <span className="cp-username">{user.username}</span>
                            <span className="text-sm text-gray-500">{user.email}</span>
                        </div>

                        <div className="cp-caption-zone">
                            <input
                                className="cp-textarea"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value.slice(0, MAX_CAPTION))}
                                placeholder="Write a caption..."
                            />
                            <div className="cp-char-row">
                                <span className="cp-emoji">😊</span>
                                <span className="cp-count">{caption.length} / {MAX_CAPTION.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="cp-footer">
                            <button
                                className={`cp-share-btn ${submitted ? "success" : preview ? "ready" : "idle"}`}
                                onClick={handleSubmit}
                                disabled={!preview || submitted}
                            >
                                {submitted ? "✓ Posted!" : "Post"}
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{display: "none"}}
                onChange={handleSelect}
            />
        </>
    );
}