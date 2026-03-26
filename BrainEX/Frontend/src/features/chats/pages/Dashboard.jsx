import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "https://cdn.skypack.dev/gsap";
import { useNavigate } from "react-router-dom";
import useAuth from "../../auth/hooks/useAuth";
import useChat from "../hooks/useChat";
import "../styles/chat.css";
import { CHAT_MENU } from "../components/Constants";
import { Ic, LayoutIc, SunIc, MoonIc, StarHero } from "../components/Icons";
import Sidebar from "../components/Sidebar";
import DdMenu from "../components/Ddmenu";
import ProfileDropdown from "../components/Profiledropdown";
import InputCard from "../components/InputCard";
import TypingLoader from "../components/TypingLoader";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


export default function Ai() {
  const [theme, setTheme] = useState("dark");
  const [sidebar, setSidebar] = useState(true);
  const [input, setInput] = useState("");
  const [chatMenu, setChatMenu] = useState(null);
  const [profile, setProfile] = useState(false);

  const profileRef = useRef(null);
  const greetRef = useRef(null);
  const inputCardRef = useRef(null);
  const pillRef = useRef(null);
  const bottomRef = useRef(null);

  const { user, handleLogout } = useAuth();
  const {
    chats,
    handleFetchChats,
    handleMessagesOfChat,
    handleResponse,
    messages,
    loading,
  } = useChat();
  const navigate = useNavigate();

  const dark = theme === "dark";

  useEffect(() => {
    handleFetchChats();
  }, []);

  useEffect(()=>{
    bottomRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      pillRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5 },
      0.3,
    )
      .fromTo(
        greetRef.current,
        { opacity: 0, y: 30, skewY: 1 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.7 },
        0.5,
      )
      .fromTo(
        inputCardRef.current,
        { opacity: 0, y: 24, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7 },
        0.75,
      );
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    if (!document.startViewTransition) {
      setTheme(next);
      return;
    }
    document.startViewTransition(() => setTheme(next));
  }, [theme]);

  const toggleSidebar = useCallback(() => {
    if (!document.startViewTransition) {
      setSidebar((v) => !v);
      return;
    }
    document.startViewTransition(() => setSidebar((v) => !v));
  }, []);

  const openMenu = useCallback((e, ref, chatId) => {
    e.stopPropagation();
    const r = ref.current.getBoundingClientRect();
    setChatMenu({ top: r.top, left: r.right + 6, chatId });
    setProfile(false);
  }, []);

  const closeMenu = useCallback(() => setChatMenu(null), []);

  const handleLogoutButton = async () => {
    const response = await handleLogout();
    if (response.success) navigate("/home");
  };

  useEffect(() => {
    const h = (e) => {
      if (!e.target.closest("[data-prof]")) setProfile(false);
      if (!e.target.closest("[data-dd]")) setChatMenu(null);
    };
    window.addEventListener("click", h);
    return () => window.removeEventListener("click", h);
  }, []);

  const pRect = profileRef.current?.getBoundingClientRect();

  return (
    <>

      <div className="app-root" data-theme={theme}>
        <Sidebar
          sidebar={sidebar}
          toggleSidebar={toggleSidebar}
          chats={chats}
          openMenu={openMenu}
          handleMessagesOfChat={handleMessagesOfChat}
          user={user}
          profile={profile}
          setProfile={setProfile}
          setChatMenu={setChatMenu}
        />

        <main className="main-area">
          {/* Top bar */}
          <div className="top-bar">
            <button
              className="icon-btn"
              onClick={toggleSidebar}
              title="Toggle sidebar"
            >
              <LayoutIc />
            </button>
            {!sidebar && (
              <button className="icon-btn" title="New chat">
                <Ic d="M12 5v14M5 12h14" size={14} sw={1.8} />
              </button>
            )}
            <div className="spacer" />
            <button
              className="theme-btn"
              onClick={toggleTheme}
              title={dark ? "Switch to light" : "Switch to dark"}
            >
              {dark ? <SunIc /> : <MoonIc />}
            </button>
            <button className="icon-btn">
              <Ic
                d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 0 0-4-5.66V5a2 2 0 1 0-4 0v.34A6 6 0 0 0 6 11v3.2c0 .52-.21 1.04-.6 1.4L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9"
                size={14}
                sw={1.8}
              />
            </button>
          </div>

          {/* Scrollable content area */}
          <div className={`content-area ${messages.length > 0 ? 'has-messages' : 'empty'}`}>
            {messages.length > 0 ? (
              <div className="message-container">
                {messages.map((msg) => {
                  const isUser = msg.role === "user";
                  return (
                    <div
                      key={msg._id}
                      className={`message-wrapper ${isUser ? 'user' : 'ai'}`}
                    >
                      <div className={`message-bubble ${isUser ? 'user' : 'ai'}`}>
                      <div ref={bottomRef}></div>
                        {isUser?msg.content:<ReactMarkdown remarkPlugins={remarkGfm}>{msg.content}</ReactMarkdown>}
                      </div>
                    </div>
                  );
                })}
                {loading && <TypingLoader />}
              </div>
            ) : (
              <>
                <div ref={pillRef}>
                  <button className="upgrade-pill">
                    Free plan
                    <span className="upgrade-divider" />
                    <span className="upgrade-text">
                      Upgrade
                    </span>
                  </button>
                </div>
                <div ref={greetRef} className="greet-container">
                  <StarHero />
                  <h1 className="font-serif greet-title">
                    Back at it, {user.username}
                  </h1>
                </div>
              </>
            )}
          </div>

          {/* InputCard pinned at bottom, outside scroll */}
          <div className="input-container">
            <InputCard
              handleResponse={handleResponse}
              input={input}
              setInput={setInput}
              dark={dark}
              inputCardRef={inputCardRef}
            />
          </div>
        </main>

        {chatMenu && (
          <DdMenu
            items={CHAT_MENU}
            style={{ top: chatMenu.top, left: chatMenu.left }}
            chatId={chatMenu.chatId}
            onClose={closeMenu}
          />
        )}

        {profile && pRect && (
          <ProfileDropdown
            pRect={pRect}
            user={user}
            onClose={() => setProfile(false)}
            onLogout={handleLogoutButton}
          />
        )}
      </div>
    </>
  );
}
