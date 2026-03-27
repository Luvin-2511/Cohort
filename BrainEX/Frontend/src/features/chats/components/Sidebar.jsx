import { useRef, useState } from "react";
import { Ic, LayoutIc, StarLogo } from "./Icons";
import { NAV_TOP, NAV_BOTTOM } from "./Constants";
import ChatRow from "./ChatRow";
import { useDispatch } from "react-redux";
import { setChatId, setMessages } from "../slices/chat.slice";
import SearchModal from "./SearchModal";
import useAuth from "../../auth/hooks/useAuth";
import useChat from "../hooks/useChat";

export default function Sidebar({
  sidebar,
  toggleSidebar,
  openMenu,
  setProfile,
  setChatMenu,
  profileRef
}) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState(false);
  
  const { user } = useAuth();
  const { chats, handleMessagesOfChat } = useChat();

  return (
    <aside className={`sidebar${sidebar ? "" : " closed"}`}>
      <div className="sidebar-container">
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo-container">
            <StarLogo size={18} />
            <span className="sidebar-logo-text">
              brainEX
            </span>
          </div>
          <button
            className="icon-btn"
            onClick={toggleSidebar}
            title="Collapse sidebar"
          >
            <LayoutIc />
          </button>
        </div>

        {/* Top Nav */}
        <nav className="sidebar-nav">
          {NAV_TOP.map(({ label, icon }) => (
            <button
              onClick={() => {
                if (label === "New chat") {
                  console.log(label);
                  dispatch(setMessages([]));
                  dispatch(setChatId(null));
                }
                if (label === "Search") {
                  setSearch(true);
                }
              }}
              key={label}
              className="nav-btn"
            >
              <Ic d={icon} size={14} sw={1.8} />
              {label}
            </button>
          ))}
        </nav>

        {search && (
          <SearchModal
            chats={chats}
            onSelect={(chatId) => handleMessagesOfChat(chatId)}
            onClose={() => setSearch(false)}
          />
        )}

        <div className="sidebar-divider" />

        {/* Bottom Nav */}
        <nav className="sidebar-nav">
          {NAV_BOTTOM.map(({ label, icon }) => (
            <button key={label} className="nav-btn">
              <Ic d={icon} size={14} sw={1.8} />
              {label}
            </button>
          ))}
        </nav>

        <div className="sidebar-divider" />

        <div className="sidebar-recents-title">
          Recents
        </div>
        <div className="sidebar-recents-list">
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
        <div className="sidebar-profile-container">
          <div data-prof className="sidebar-profile-relative">
            <button
              ref={profileRef}
              onClick={(e) => {
                e.stopPropagation();
                setProfile((p) => !p);
                setChatMenu(null);
              }}
              className="sidebar-profile-btn"
            >
              <div className="sidebar-profile-avatar">
                {user.username[0].toUpperCase()}
              </div>
              <div className="sidebar-profile-info">
                <div className="sidebar-profile-name">
                  {user.username}
                </div>
                <div className="sidebar-profile-plan">
                  Free plan
                </div>
              </div>
              <div className="sidebar-profile-notif-container">
                <Ic
                  d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
                  size={14}
                  sw={1.8}
                />
                <span
                  className="sidebar-profile-notif-dot"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
