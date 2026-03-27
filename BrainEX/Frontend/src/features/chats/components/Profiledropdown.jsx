import { Ic } from "./Icons";
import { PROFILE_MENU } from "./Constants";

export default function ProfileDropdown({ pRect, user, onClose, onLogout, onSettings }) {
  if (!pRect) return null;

  return (
    <>
      <style>{`
        .profile-dd {
          position: fixed;
          width: 260px;
          background: #0d0d12;
          border: 1px solid var(--border-2);
          border-radius: 14px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.35);
          z-index: 999;
          overflow: hidden;
          animation: pd-in 0.15s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes pd-in {
          from { opacity:0; transform: translateY(6px) scale(0.97); }
          to   { opacity:1; transform: translateY(0)   scale(1);    }
        }
        .pd-email {
          padding: 12px 14px 10px;
          font-size: 12px;
          color: var(--text-dim);
          border-bottom: 1px solid var(--border);
        }
        .pd-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 14px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 13.5px;
          color: var(--text-primary);
          text-align: left;
          transition: background 0.1s;
          position: relative;
        }
        .pd-item:hover { background: var(--border); }
        .pd-item.danger { color: var(--text-primary); }
        .pd-item.danger:hover { background: rgba(239,68,68,0.1); color: #ef4444; }
        .pd-item.danger:hover svg { stroke: #ef4444; }
        .pd-hint {
          margin-left: auto;
          font-size: 11px;
          color: var(--text-dim);
          flex-shrink: 0;
        }
        .pd-arrow {
          margin-left: auto;
          color: var(--text-dim);
        }
        .pd-divider {
          height: 1px;
          background: var(--border);
          margin: 3px 0;
        }
        .pd-footer {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-top: 1px solid var(--border);
          background: var(--sidebar-bg);
        }
        .pd-avatar {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg,#1c5cfc,#4a2fbd);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700; color: #fff;
          flex-shrink: 0;
        }
        .pd-username { font-size: 13px; font-weight: 600; color: var(--text-primary); }
        .pd-plan    { font-size: 11px; color: var(--text-dim); }
      `}</style>

      <div
        data-prof
        className="profile-dd"
        style={{
          bottom: window.innerHeight - pRect.top + 8,
          left: pRect.left,
        }}
      >
        {/* Email */}
        <div className="pd-email">{user.email}</div>

        {/* Menu items */}
        <div style={{ padding: "4px 0" }}>
          {PROFILE_MENU.map((it, i) =>
            it === null ? (
              <div key={i} className="pd-divider" />
            ) : (
              <button
                key={i}
                className={`pd-item${it.danger ? " danger" : ""}`}
                onClick={() => {
                  if (it.label === "Log out") onLogout();
                  if (it.label === "Settings") {
                    onSettings();
                    onClose();
                  } 
                  else onClose();
                }}
              >
                <Ic d={it.icon} size={13} sw={1.8} />
                {it.label}
                {it.hint && <span className="pd-hint">{it.hint}</span>}
                {it.arrow && (
                  <span className="pd-arrow">
                    <Ic d="M9 18l6-6-6-6" size={11} sw={1.8} />
                  </span>
                )}
              </button>
            ),
          )}
        </div>
      </div>
    </>
  );
}
