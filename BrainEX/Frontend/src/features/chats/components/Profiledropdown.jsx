import { Ic } from "./Icons";
import { PROFILE_MENU } from "./Constants";

export default function ProfileDropdown({ pRect, user, onClose, onLogout }) {
  if (!pRect) return null;

  return (
    <div
      data-prof
      data-dd
      className="profile-dd"
      style={{
        bottom: window.innerHeight - pRect.top + 8,
        left: pRect.left,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 14px",
          borderBottom: "1px solid var(--border)",
          marginBottom: 4,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#7c5cfc,#4a2fbd)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 700,
            color: "#fff",
            flexShrink: 0,
          }}
        >
          S
        </div>
        <div>
          <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--text-primary)" }}>
            {user.username}
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "1px 8px",
              borderRadius: 99,
              fontSize: 10,
              fontWeight: 600,
              marginTop: 3,
              background: "rgba(124,92,252,0.12)",
              color: "var(--accent)",
              border: "1px solid rgba(124,92,252,0.25)",
            }}
          >
            Free plan
          </div>
        </div>
      </div>

      {/* Menu Items */}
      {PROFILE_MENU.map((it, i) =>
        it === null ? (
          <div
            key={i}
            style={{ height: 1, background: "var(--border)", margin: "4px 6px" }}
          />
        ) : (
          <button
            key={i}
            className={`dd-item${it.danger ? " danger" : ""}`}
            style={{ padding: "8px 14px" }}
            onClick={() => {
              if (it.label === "Log out") onLogout();
              onClose();
            }}
          >
            <Ic d={it.icon} size={13} sw={1.8} />
            {it.label}
          </button>
        ),
      )}
    </div>
  );
}