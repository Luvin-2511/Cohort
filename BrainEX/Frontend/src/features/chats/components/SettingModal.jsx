import { useState, useEffect } from "react";
import { Ic } from "./Icons";
import useUser from "../../user/hooks/useUser";
import { useDispatch } from "react-redux";
import { setFontSize } from "../../user/slices/user.slice";

const SECTIONS = ["Appearance", "Account", "Privacy", "About"];

export default function SettingsModal({ onClose, theme, toggleTheme, user }) {
  const [active, setActive] = useState("Appearance");
  const [username, setUsername] = useState(user?.username || "");
  const [email] = useState(user?.email || "");
  const [editingUsername, setEditingUsername] = useState(false);
  const [saved, setSaved] = useState(false);
  const [language, setLanguage] = useState("English");
  const { handleRename, fontSize } = useUser();
  const dispatch = useDispatch();
  const [fontSizeState, setFontSizeState] = useState(fontSize || "Medium");

  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const handleSaveUsername = async () => {
    setEditingUsername(false);
    await handleRename(username);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <style>{`
        .stg-backdrop {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          animation: stg-fade 0.18s ease;
        }
        @keyframes stg-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .stg-panel {
          width: 720px; max-width: calc(100vw - 32px);
          height: 520px; max-height: calc(100vh - 64px);
          background: var(--sidebar-bg);
          border: 1px solid var(--border-2);
          border-radius: 20px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.5);
          display: flex; overflow: hidden;
          animation: stg-in 0.2s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes stg-in {
          from { opacity:0; transform: scale(0.95) translateY(12px); }
          to   { opacity:1; transform: scale(1)    translateY(0);    }
        }

        /* Left nav */
        .stg-nav {
          width: 200px; flex-shrink: 0;
          border-right: 1px solid var(--border);
          padding: 24px 10px;
          display: flex; flex-direction: column; gap: 2px;
        }
        .stg-nav-title {
          font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--text-dim);
          padding: 0 10px 10px;
        }
        .stg-nav-btn {
          width: 100%; display: flex; align-items: center; gap: 9px;
          padding: 8px 10px; border-radius: 10px;
          border: none; background: transparent; cursor: pointer;
          font-size: 13.5px; color: var(--text-secondary);
          text-align: left; transition: all 0.12s;
        }
        .stg-nav-btn:hover { background: var(--border); color: var(--text-primary); }
        .stg-nav-btn.active {
          background: var(--border-2);
          color: var(--text-primary);
          font-weight: 500;
        }

        /* Right content */
        .stg-content {
          flex: 1; overflow-y: auto;
          padding: 28px 28px;
          display: flex; flex-direction: column; gap: 24px;
        }
        .stg-section-title {
          font-size: 18px; font-weight: 600;
          color: var(--text-primary); letter-spacing: -0.02em;
          margin-bottom: 4px;
        }
        .stg-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 16px; border-radius: 12px;
          background: var(--card-bg);
          border: 1px solid var(--border);
          gap: 12px;
        }
        .stg-row-label { font-size: 13.5px; color: var(--text-primary); font-weight: 500; }
        .stg-row-sub   { font-size: 11.5px; color: var(--text-dim); margin-top: 2px; }

        /* Toggle */
        .stg-toggle {
          position: relative; width: 42px; height: 24px; flex-shrink: 0;
        }
        .stg-toggle input { opacity: 0; width: 0; height: 0; }
        .stg-toggle-track {
          position: absolute; inset: 0; border-radius: 99px;
          background: var(--border-2); cursor: pointer;
          transition: background 0.2s;
        }
        .stg-toggle input:checked + .stg-toggle-track { background: var(--accent); }
        .stg-toggle-track::after {
          content: ""; position: absolute;
          top: 3px; left: 3px;
          width: 18px; height: 18px; border-radius: 50%;
          background: #fff; transition: transform 0.2s;
          box-shadow: 0 1px 4px rgba(0,0,0,0.25);
        }
        .stg-toggle input:checked + .stg-toggle-track::after { transform: translateX(18px); }

        /* Theme pills */
        .stg-theme-group {
          display: flex; gap: 8px;
        }
        .stg-theme-pill {
          flex: 1; padding: 8px 0; border-radius: 10px;
          border: 1.5px solid var(--border);
          background: var(--card-bg); cursor: pointer;
          font-size: 12.5px; color: var(--text-secondary);
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          transition: all 0.15s;
        }
        .stg-theme-pill:hover { border-color: var(--border-2); color: var(--text-primary); }
        .stg-theme-pill.active {
          border-color: var(--accent);
          color: var(--accent);
          background: rgba(124,92,252,0.07);
        }
        .stg-theme-preview {
          width: 48px; height: 30px; border-radius: 6px;
          border: 1px solid var(--border);
          overflow: hidden; position: relative;
        }
        .stg-theme-preview.dark-prev  { background: #0f0f12; }
        .stg-theme-preview.light-prev { background: #f5f5f7; }
        .stg-theme-preview::after {
          content: ""; position: absolute;
          bottom: 4px; left: 6px; right: 6px; height: 4px;
          border-radius: 2px;
          background: rgba(124,92,252,0.5);
        }

        /* Input field */
        .stg-input-row {
          display: flex; gap: 8px; align-items: center;
        }
        .stg-input {
          flex: 1; padding: 8px 12px; border-radius: 9px;
          border: 1.5px solid var(--border-2);
          background: var(--card-bg);
          color: var(--text-primary); font-size: 13.5px;
          outline: none; transition: border-color 0.15s;
        }
        .stg-input:focus { border-color: var(--accent); }
        .stg-input:disabled {
          opacity: 0.5; cursor: not-allowed;
        }
        .stg-btn {
          padding: 8px 14px; border-radius: 9px;
          border: none; cursor: pointer; font-size: 13px; font-weight: 500;
          transition: all 0.15s;
        }
        .stg-btn-primary {
          background: var(--accent); color: #fff;
        }
        .stg-btn-primary:hover { opacity: 0.85; }
        .stg-btn-ghost {
          background: var(--border); color: var(--text-secondary);
        }
        .stg-btn-ghost:hover { background: var(--border-2); color: var(--text-primary); }

        /* Select */
        .stg-select {
          padding: 7px 10px; border-radius: 9px;
          border: 1.5px solid var(--border-2);
          background: var(--card-bg); color: var(--text-primary);
          font-size: 13px; cursor: pointer; outline: none;
        }

        /* Saved badge */
        .stg-saved {
          font-size: 11.5px; color: #22c55e;
          display: flex; align-items: center; gap: 4px;
          animation: stg-fade 0.2s ease;
        }

        /* Close btn */
        .stg-close {
          position: absolute; top: 16px; right: 16px;
          width: 28px; height: 28px; border-radius: 8px;
          border: none; background: var(--border);
          color: var(--text-dim); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.12s;
        }
        .stg-close:hover { background: var(--border-2); color: var(--text-primary); }

        .stg-group { display: flex; flex-direction: column; gap: 8px; }
        .stg-group-label {
          font-size: 11px; font-weight: 600; letter-spacing: 0.07em;
          text-transform: uppercase; color: var(--text-dim);
          padding-left: 2px;
        }

        .stg-danger-btn {
          width: 100%; padding: 10px 16px; border-radius: 12px;
          border: 1.5px solid rgba(239,68,68,0.3);
          background: rgba(239,68,68,0.05); color: #ef4444;
          font-size: 13.5px; font-weight: 500; cursor: pointer;
          text-align: left; display: flex; align-items: center; gap: 10px;
          transition: all 0.15s;
        }
        .stg-danger-btn:hover {
          background: rgba(239,68,68,0.12);
          border-color: rgba(239,68,68,0.6);
        }
      `}</style>

      <div className="stg-backdrop" onClick={onClose}>
        <div
          className="stg-panel"
          onClick={(e) => e.stopPropagation()}
          style={{ position: "relative" }}
        >
          {/* Close */}
          <button className="stg-close" onClick={onClose}>
            <Ic d="M18 6L6 18M6 6l12 12" size={13} sw={2} />
          </button>

          {/* Left nav */}
          <div className="stg-nav">
            <div className="stg-nav-title">Settings</div>
            {SECTIONS.map((s) => (
              <button
                key={s}
                className={`stg-nav-btn${active === s ? " active" : ""}`}
                onClick={() => setActive(s)}
              >
                <Ic
                  d={
                    s === "Appearance"
                      ? "M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                      : s === "Account"
                        ? "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                        : s === "Privacy"
                          ? "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                          : "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v4M12 16h.01"
                  }
                  size={13}
                  sw={1.8}
                />
                {s}
              </button>
            ))}
          </div>

          {/* Right content */}
          <div className="stg-content">
            {/* ── APPEARANCE ── */}
            {active === "Appearance" && (
              <>
                <div className="stg-section-title">Appearance</div>

                <div className="stg-group">
                  <div className="stg-group-label">Theme</div>
                  <div className="stg-theme-group">
                    {["dark", "light"].map((t) => (
                      <button
                        key={t}
                        className={`stg-theme-pill${theme === t ? " active" : ""}`}
                        onClick={() => {
                          if (theme !== t) toggleTheme();
                        }}
                      >
                        <div className={`stg-theme-preview ${t}-prev`} />
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="stg-group">
                  <div className="stg-group-label">Font size</div>
                  <div className="stg-row">
                    <div>
                      <div className="stg-row-label">Message font size</div>
                      <div className="stg-row-sub">
                        Controls the size of text in chat messages
                      </div>
                    </div>
                    <select
                      className="stg-select"
                      value={fontSizeState}
                      onChange={(e) => {
                        setFontSizeState(e.target.value);
                        dispatch(setFontSize(e.target.value));
                      }}
                    >
                      {["Small", "Medium", "Large"].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="stg-group">
                  <div className="stg-group-label">Language</div>
                  <div className="stg-row">
                    <div>
                      <div className="stg-row-label">Display language</div>
                      <div className="stg-row-sub">
                        Language used across the interface
                      </div>
                    </div>
                    <select
                      className="stg-select"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      {[
                        "English",
                        "Hindi",
                        "Spanish",
                        "French",
                        "German",
                        "Japanese",
                      ].map((l) => (
                        <option key={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {active === "Account" && (
              <>
                <div className="stg-section-title">Account</div>

                <div className="stg-group">
                  <div className="stg-group-label">Profile</div>
                  <div
                    className="stg-row"
                    style={{
                      flexDirection: "column",
                      alignItems: "stretch",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 14 }}
                    >
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          flexShrink: 0,
                          background: "linear-gradient(135deg,#1c5cfc,#4a2fbd)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 18,
                          fontWeight: 700,
                          color: "#fff",
                        }}
                      >
                        {username[0]?.toUpperCase()}
                      </div>
                      <div>
                        <div className="stg-row-label">{username}</div>
                        <div className="stg-row-sub">{email}</div>
                      </div>
                    </div>

                    <div>
                      <div className="stg-row-sub" style={{ marginBottom: 6 }}>
                        Username
                      </div>
                      <div className="stg-input-row">
                        <input
                          className="stg-input"
                          value={username}
                          disabled={!editingUsername}
                          onChange={(e) => setUsername(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSaveUsername();
                          }}
                        />
                        {!editingUsername ? (
                          <button
                            className="stg-btn stg-btn-ghost"
                            onClick={() => {
                              setEditingUsername(true);
                            }}
                          >
                            Edit
                          </button>
                        ) : (
                          <>
                            <button
                              className="stg-btn stg-btn-primary"
                              onClick={handleSaveUsername}
                            >
                              Save
                            </button>
                            <button
                              className="stg-btn stg-btn-ghost"
                              onClick={() => {
                                setEditingUsername(false);
                                setUsername(user?.username || "");
                              }}
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                      {saved && (
                        <div className="stg-saved" style={{ marginTop: 6 }}>
                          <Ic d="M20 6L9 17l-5-5" size={12} sw={2.5} /> Saved
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="stg-group">
                  <div className="stg-group-label">Plan</div>
                  <div className="stg-row">
                    <div>
                      <div className="stg-row-label">Free plan</div>
                      <div className="stg-row-sub">
                        Limited messages per day
                      </div>
                    </div>
                    <button className="stg-btn stg-btn-primary">Upgrade</button>
                  </div>
                </div>

                <div className="stg-group">
                  <div className="stg-group-label">Danger zone</div>
                  <button className="stg-danger-btn">
                    <Ic
                      d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                      size={14}
                      sw={1.8}
                    />
                    Delete account
                  </button>
                </div>
              </>
            )}

            {active === "Privacy" && (
              <>
                <div className="stg-section-title">Privacy</div>
                {[
                  {
                    label: "Save chat history",
                    sub: "Store conversations on our servers",
                    def: true,
                  },
                  {
                    label: "Use data to improve brainEX",
                    sub: "Help us improve the model with your chats",
                    def: false,
                  },
                  {
                    label: "Show online status",
                    sub: "Let others see when you're active",
                    def: true,
                  },
                ].map((item) => {
                  const [on, setOn] = useState(item.def);
                  return (
                    <div className="stg-group" key={item.label}>
                      <div className="stg-row">
                        <div>
                          <div className="stg-row-label">{item.label}</div>
                          <div className="stg-row-sub">{item.sub}</div>
                        </div>
                        <label className="stg-toggle">
                          <input
                            type="checkbox"
                            checked={on}
                            onChange={() => setOn((o) => !o)}
                          />
                          <div className="stg-toggle-track" />
                        </label>
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {active === "About" && (
              <>
                <div className="stg-section-title">About</div>
                <div
                  className="stg-row"
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 16,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 14 }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: "linear-gradient(135deg,#1c5cfc,#4a2fbd)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Ic
                        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                        size={18}
                        sw={1.8}
                        style={{ color: "#fff" }}
                      />
                    </div>
                    <div>
                      <div className="stg-row-label" style={{ fontSize: 15 }}>
                        brainEX
                      </div>
                      <div className="stg-row-sub">Version 1.0.0</div>
                    </div>
                  </div>
                  <div className="stg-row-sub" style={{ lineHeight: 1.6 }}>
                    brainEX is an AI-powered assistant built to help you think,
                    write, and build faster. Powered by cutting-edge language
                    models.
                  </div>
                </div>

                {[
                  {
                    label: "Terms of Service",
                    icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z",
                  },
                  {
                    label: "Privacy Policy",
                    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
                  },
                  {
                    label: "Open source licenses",
                    icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
                  },
                ].map((it) => (
                  <div
                    key={it.label}
                    className="stg-row"
                    style={{ cursor: "pointer" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = "var(--border-2)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "var(--border)")
                    }
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <Ic
                        d={it.icon}
                        size={13}
                        sw={1.7}
                        style={{ color: "var(--text-dim)" }}
                      />
                      <div className="stg-row-label">{it.label}</div>
                    </div>
                    <Ic
                      d="M9 18l6-6-6-6"
                      size={12}
                      sw={1.8}
                      style={{ color: "var(--text-dim)" }}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
