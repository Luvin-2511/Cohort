import { useRef } from "react";
import { Ic, LayoutIc, StarLogo } from "./icons";
import { NAV_TOP, NAV_BOTTOM } from "./constants";
import ChatRow from "./ChatRow";

export default function Sidebar({ sidebar, toggleSidebar, chats, openMenu, handleMessagesOfChat, user, profile, setProfile, setChatMenu }) {
  const profileRef = useRef(null);

  return (
    <aside className={`sidebar${sidebar ? "" : " closed"}`}>
      <div
        style={{
          width: 256,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          flexShrink: 0,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 12px 8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <StarLogo size={18} />
            <span
              style={{
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
              }}
            >
              brainEX
            </span>
          </div>
          <button className="icon-btn" onClick={toggleSidebar} title="Collapse sidebar">
            <LayoutIc />
          </button>
        </div>

        {/* Top Nav */}
        <nav style={{ padding: "2px 8px", display: "flex", flexDirection: "column", gap: 1 }}>
          {NAV_TOP.map(({ label, icon }) => (
            <button key={label} className="nav-btn">
              <Ic d={icon} size={14} sw={1.8} />
              {label}
            </button>
          ))}
        </nav>

        <div style={{ height: 1, background: "var(--border)", margin: "8px 12px" }} />

        {/* Bottom Nav */}
        <nav style={{ padding: "2px 8px", display: "flex", flexDirection: "column", gap: 1 }}>
          {NAV_BOTTOM.map(({ label, icon }) => (
            <button key={label} className="nav-btn">
              <Ic d={icon} size={14} sw={1.8} />
              {label}
            </button>
          ))}
        </nav>

        <div style={{ height: 1, background: "var(--border)", margin: "8px 12px" }} />

        {/* Recents */}
        <div
          style={{
            padding: "4px 16px 6px",
            fontSize: 10.5,
            fontWeight: 600,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: "var(--text-dim)",
          }}
        >
          Recents
        </div>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "2px 8px 8px",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {chats.map((chat) => (
            <ChatRow
              key={chat._id}
              label={chat}
              handleMessagesOfChat={handleMessagesOfChat}
              onMenu={openMenu}
            />
          ))}
        </div>

        {/* Profile */}
        <div style={{ padding: "8px", borderTop: "1px solid var(--border)" }}>
          <div data-prof style={{ position: "relative" }}>
            <button
              ref={profileRef}
              onClick={(e) => {
                e.stopPropagation();
                setProfile((p) => !p);
                setChatMenu(null);
              }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 10px",
                borderRadius: 12,
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "var(--text-primary)",
                transition: "background 0.12s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--border)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: "linear-gradient(135deg,#7c5cfc,#4a2fbd)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                S
              </div>
              <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                <div
                  style={{
                    fontSize: 13.5,
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    lineHeight: 1.2,
                  }}
                >
                  {user.username}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-dim)", lineHeight: 1.3 }}>
                  Free plan
                </div>
              </div>
              <div style={{ position: "relative", color: "var(--text-dim)" }}>
                <Ic
                  d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
                  size={14}
                  sw={1.8}
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: -1,
                    right: -1,
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--notif)",
                    border: "2px solid var(--sidebar-bg)",
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}