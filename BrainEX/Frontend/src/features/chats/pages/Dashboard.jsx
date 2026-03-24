import { useState, useRef, useEffect, useCallback } from "react";

const THEME_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  :root {
    --bg:           #0f0f14;
    --sidebar-bg:   #0b0b10;
    --surface:      #16161e;
    --surface-2:    #1e1e28;
    --border:       rgba(160,140,255,0.09);
    --border-2:     rgba(160,140,255,0.05);
    --text-primary: #e2e0f0;
    --text-muted:   #6e6b88;
    --text-dim:     #45435a;
    --accent:       #7c5cfc;
    --accent-h:     #9273ff;
    --glow:         rgba(124,92,252,0.08);
    --ring-color:   #0b0b10;
    --shadow-color: rgba(0,0,0,0.6);
    --notif:        #4a9eff;
    --grain-op:     0.028;
  }

  [data-theme="light"] {
    --bg:           #f4f3fb;
    --sidebar-bg:   #ebe9f7;
    --surface:      #ffffff;
    --surface-2:    #eeedf8;
    --border:       rgba(100,80,200,0.09);
    --border-2:     rgba(100,80,200,0.05);
    --text-primary: #1a1828;
    --text-muted:   #6b6882;
    --text-dim:     #aba8c4;
    --accent:       #7c5cfc;
    --accent-h:     #9273ff;
    --glow:         rgba(124,92,252,0.06);
    --ring-color:   #ebe9f7;
    --shadow-color: rgba(60,40,120,0.10);
    --notif:        #2563eb;
    --grain-op:     0.018;
  }

  /* ── View Transition ───────────────────────────────────────────────────── */
  ::view-transition-old(root) {
    animation: vt-out 0.35s cubic-bezier(0.4, 0, 0.2, 1) both;
  }
  ::view-transition-new(root) {
    animation: vt-in  0.35s cubic-bezier(0.4, 0, 0.2, 1) both;
  }
  ::view-transition-old(theme-btn) {
    animation: vt-spin-out 0.3s cubic-bezier(0.4, 0, 1, 1) both;
  }
  ::view-transition-new(theme-btn) {
    animation: vt-spin-in  0.35s cubic-bezier(0, 0, 0.2, 1) both;
  }

  @keyframes vt-out      { from{opacity:1;filter:blur(0);}  to{opacity:0;filter:blur(6px);} }
  @keyframes vt-in       { from{opacity:0;filter:blur(6px);}to{opacity:1;filter:blur(0);}  }
  @keyframes vt-spin-out { from{opacity:1;transform:rotate(0) scale(1);}  to{opacity:0;transform:rotate(-90deg) scale(0.4);} }
  @keyframes vt-spin-in  { from{opacity:0;transform:rotate(90deg) scale(0.4);}to{opacity:1;transform:rotate(0) scale(1);}  }

  /* ── Other animations ──────────────────────────────────────────────────── */
  @keyframes dropIn   { from{opacity:0;transform:scale(0.95) translateY(-4px);}to{opacity:1;transform:scale(1) translateY(0);} }
  @keyframes slideUp  { from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);} }
  @keyframes fadeIn   { from{opacity:0;}to{opacity:1;} }
  @keyframes spin     { to{transform:rotate(360deg);} }
  @keyframes pulse-glow { 0%,100%{opacity:.4;}50%{opacity:.9;} }

  .asterisk-spin { animation: spin 12s linear infinite; }
  .greeting-anim { animation: slideUp 0.5s cubic-bezier(0.2,0,0,1) both; }
  .input-anim    { animation: slideUp 0.55s 0.08s cubic-bezier(0.2,0,0,1) both; }
  .pill-anim     { animation: fadeIn 0.4s 0.04s both; }

  /* ── Base ──────────────────────────────────────────────────────────────── */
  html,body,#root{height:100%;margin:0;padding:0;}
  *{font-family:'DM Sans',sans-serif;}
  .font-serif{font-family:'Lora',Georgia,serif!important;}
  textarea{resize:none;}
  ::-webkit-scrollbar{width:3px;}
  ::-webkit-scrollbar-track{background:transparent;}
  ::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px;}

  /* ── App shell ─────────────────────────────────────────────────────────── */
  .app-root {
    display:flex; height:100vh; width:100vw; overflow:hidden; position:relative;
    background:var(--bg); color:var(--text-primary);
    transition:background 0.32s,color 0.32s;
  }

  /* grain */
  .app-root::before {
    content:''; position:fixed; inset:-50%; width:200%; height:200%;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity:var(--grain-op); pointer-events:none; z-index:9999;
  }

  /* ── Sidebar ───────────────────────────────────────────────────────────── */
  .sidebar {
    flex-shrink:0; overflow:hidden; position:relative; z-index:20;
    background:var(--sidebar-bg); border-right:1px solid var(--border);
    display:flex; flex-direction:column;
    width:256px;
    transition:width 0.28s cubic-bezier(0.4,0,0.2,1),
               border-color 0.32s, background 0.32s;
  }
  .sidebar.closed { width:0; border-right-color:transparent; }

  /* ── Buttons ───────────────────────────────────────────────────────────── */
  .icon-btn {
    width:28px; height:28px; display:flex; align-items:center; justify-content:center;
    border-radius:8px; border:none; background:transparent;
    color:var(--text-muted); cursor:pointer;
    transition:background 0.12s,color 0.12s;
  }
  .icon-btn:hover{background:var(--border);color:var(--text-primary);}

  .nav-btn {
    width:100%; display:flex; align-items:center; gap:10px;
    padding:7px 10px; border-radius:8px; border:none;
    background:transparent; color:var(--text-muted);
    font-size:13.5px; cursor:pointer;
    transition:background 0.12s,color 0.12s;
    text-align:left;
  }
  .nav-btn:hover{background:var(--border);color:var(--text-primary);}

  /* ── Chat rows ─────────────────────────────────────────────────────────── */
  .chat-row {
    display:flex; align-items:center; justify-content:space-between;
    padding:6px 8px; border-radius:8px; cursor:pointer;
    transition:background 0.1s;
  }
  .chat-row:hover{background:var(--border);}
  .chat-row:hover .dots-btn{opacity:1;}

  .dots-btn {
    flex-shrink:0; width:20px; height:20px; display:flex; align-items:center; justify-content:center;
    border-radius:6px; border:none; background:transparent;
    color:var(--text-muted); cursor:pointer; opacity:0;
    transition:background 0.1s,opacity 0.12s,color 0.1s;
  }
  .dots-btn:hover{background:var(--surface-2);color:var(--text-primary);}

  /* ── Dropdowns ─────────────────────────────────────────────────────────── */
  .dd-panel {
    position:fixed; z-index:200; min-width:182px;
    background:var(--surface); border:1px solid var(--border);
    border-radius:12px; padding:4px;
    box-shadow:0 12px 40px var(--shadow-color);
    animation:dropIn 0.13s cubic-bezier(0.2,0,0,1) both;
  }
  .dd-item {
    width:100%; display:flex; align-items:center; gap:9px;
    padding:8px 10px; border-radius:8px; border:none;
    background:transparent; font-size:13px;
    color:var(--text-muted); cursor:pointer;
    transition:background 0.1s,color 0.1s; text-align:left;
  }
  .dd-item:hover{background:var(--border);color:var(--text-primary);}
  .dd-item.danger{color:#e05858;}
  .dd-item.danger:hover{background:rgba(224,88,88,0.1);color:#f07070;}

  /* ── Profile dropdown ──────────────────────────────────────────────────── */
  .profile-dd {
    position:fixed; z-index:200; width:226px;
    background:var(--surface); border:1px solid var(--border);
    border-radius:16px; padding:4px;
    box-shadow:0 -8px 40px var(--shadow-color);
    animation:slideUp 0.15s cubic-bezier(0.2,0,0,1) both;
  }

  /* ── Input card ────────────────────────────────────────────────────────── */
  .input-card {
    background:var(--surface); border:1px solid var(--border);
    border-radius:18px; overflow:hidden; position:relative;
    box-shadow:0 8px 32px var(--shadow-color);
    transition:border-color 0.2s,background 0.32s,box-shadow 0.32s;
  }
  .input-card:focus-within{border-color:rgba(124,92,252,0.4);}

  /* ── Upgrade pill ──────────────────────────────────────────────────────── */
  .upgrade-pill {
    display:flex; align-items:center; gap:8px; padding:6px 16px;
    border-radius:999px; border:1px solid var(--border);
    background:var(--surface-2); font-size:12.5px;
    color:var(--text-muted); cursor:pointer;
    transition:border-color 0.15s,color 0.15s,background 0.32s;
  }
  .upgrade-pill:hover{border-color:var(--accent);color:var(--text-primary);}

  /* ── Send button ───────────────────────────────────────────────────────── */
  .send-btn {
    width:32px; height:32px; border-radius:10px; border:none;
    background:var(--accent); color:#fff; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 4px 14px rgba(124,92,252,0.45);
    transition:background 0.12s,transform 0.1s;
  }
  .send-btn:hover{background:var(--accent-h);transform:scale(1.07);}
  .send-btn:active{transform:scale(0.95);}

  /* ── Theme toggle ──────────────────────────────────────────────────────── */
  .theme-btn {
    view-transition-name: theme-btn;
    width:32px; height:32px; border-radius:10px;
    border:1px solid var(--border); background:var(--surface-2);
    color:var(--text-muted); cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    transition:background 0.2s,border-color 0.2s,color 0.2s,transform 0.15s;
  }
  .theme-btn:hover{background:var(--border);color:var(--accent);transform:scale(1.1);}

  /* ── Main glow ─────────────────────────────────────────────────────────── */
  .main-area {
    flex:1; display:flex; flex-direction:column; position:relative; overflow:hidden;
  }
  .main-area::after {
    content:''; position:absolute; inset:0; pointer-events:none;
    background:radial-gradient(ellipse 55% 45% at 50% 62%, var(--glow) 0%, transparent 70%);
    animation:pulse-glow 5s ease-in-out infinite;
  }
`;

const Ic = ({ d, size = 15, sw = 1.75, fill = "none", style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
    stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}>
    {[].concat(d).map((p, i) => <path key={i} d={p} />)}
  </svg>
);

const LayoutIc = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18" />
  </svg>
);

const DotsIc = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="2.3"/><circle cx="12" cy="12" r="2.3"/><circle cx="19" cy="12" r="2.3"/>
  </svg>
);

const SunIc = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
  </svg>
);

const MoonIc = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

/* ── BrainEX Logo — hexagonal "B" mark ─────────────────────────────────── */
const StarLogo = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" style={{ color:"var(--accent)" }}>
    <polygon points="22,3 38,12 38,32 22,41 6,32 6,12"
      fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/>
    <text x="22" y="29" textAnchor="middle"
      fontFamily="'DM Sans',sans-serif" fontWeight="700" fontSize="16"
      fill="currentColor">B</text>
  </svg>
);

const StarHero = () => (
  <svg width="46" height="46" viewBox="0 0 44 44" fill="none"
    className="asterisk-spin" style={{ color:"var(--accent)" }}>
    <polygon points="22,3 38,12 38,32 22,41 6,32 6,12"
      fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinejoin="round"/>
    <text x="22" y="29" textAnchor="middle"
      fontFamily="'DM Sans',sans-serif" fontWeight="700" fontSize="15"
      fill="currentColor">B</text>
  </svg>
);

const CHATS = [
  "Building a high-performance asset pipeline",
  "Advanced loader animation for browser",
  "React login and register page with auth",
  "File value modification patterns",
  "Brainex login and register pages",
  "Style download resume button effects",
  "Premium website design styling",
  "Prep IQ page gradient and awards UI",
  "YouTube to MP3 converter API error",
  "YouTube to MP3 converter CORS fix",
  "How compound interest works visually",
  "Responsive sidebar design system",
  "Layer z-index manipulation with blur",
  "Figma landing page UI with draggable",
];

const NAV_TOP = [
  { label:"New chat",  icon:"M12 5v14M5 12h14" },
  { label:"Search",    icon:"M11 17.25a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5zM16 16l4.5 4.5" },
  { label:"Customize", icon:["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14"] },
];
const NAV_BOTTOM = [
  { label:"Chats",     icon:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
  { label:"Projects",  icon:"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" },
  { label:"Artifacts", icon:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
  { label:"Code",      icon:"M16 18l6-6-6-6M8 6l-6 6 6 6" },
];
const CHAT_MENU = [
  { label:"Rename",          icon:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" },
  { label:"Move to project", icon:"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" },
  { label:"Archive",         icon:"M21 8v13H3V8M1 3h22v5H1zM10 12h4" },
  null,
  { label:"Delete",          icon:"M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6", danger:true },
];
const PROFILE_MENU = [
  { label:"Profile & settings", icon:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" },
  { label:"What's new",         icon:"M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" },
  { label:"Help center",        icon:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" },
  { label:"Upgrade plan",       icon:"M13 2L3 14h9l-1 8 10-12h-9l1-8z" },
  null,
  { label:"Log out",            icon:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9", danger:true },
];

function DdMenu({ items, style, onClose }) {
  useEffect(() => {
    const h = (e) => { if (!e.target.closest("[data-dd]")) onClose(); };
    setTimeout(() => window.addEventListener("click", h), 0);
    return () => window.removeEventListener("click", h);
  }, [onClose]);
  return (
    <div data-dd className="dd-panel" style={style}>
      {items.map((it, i) =>
        it === null
          ? <div key={i} style={{ height:1, background:"var(--border)", margin:"4px 6px" }}/>
          : <button key={i} className={`dd-item${it.danger?" danger":""}`} onClick={onClose}>
              <Ic d={it.icon} size={13} sw={1.8}/>{it.label}
            </button>
      )}
    </div>
  );
}

function ChatRow({ label, onMenu }) {
  const ref = useRef(null);
  return (
    <div className="chat-row">
      <span style={{ fontSize:13, color:"var(--text-muted)", overflow:"hidden", textOverflow:"ellipsis",
        whiteSpace:"nowrap", flex:1, lineHeight:1.35, transition:"color 0.1s" }}
        onMouseEnter={e=>e.currentTarget.style.color="var(--text-primary)"}
        onMouseLeave={e=>e.currentTarget.style.color="var(--text-muted)"}>
        {label}
      </span>
      <button ref={ref} className="dots-btn"
        onClick={e=>{ e.stopPropagation(); onMenu(e,ref); }}>
        <DotsIc/>
      </button>
    </div>
  );
}

export default function Ai() {
  const [theme, setTheme]       = useState("dark");
  const [sidebar, setSidebar]   = useState(true);
  const [input, setInput]       = useState("");
  const [chatMenu, setChatMenu] = useState(null);
  const [profile, setProfile]   = useState(false);
  const profileRef = useRef(null);
  const taRef      = useRef(null);

  // Apply theme attr
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // ── View Transition: theme ─────────────────────────────────────────────────
  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    if (!document.startViewTransition) { setTheme(next); return; }
    document.startViewTransition(() => { setTheme(next); });
  }, [theme]);

  // ── View Transition: sidebar ───────────────────────────────────────────────
  const toggleSidebar = useCallback(() => {
    if (!document.startViewTransition) { setSidebar(v=>!v); return; }
    document.startViewTransition(() => setSidebar(v=>!v));
  }, []);

  // ── Chat menu ──────────────────────────────────────────────────────────────
  const openMenu = useCallback((e, ref) => {
    e.stopPropagation();
    const r = ref.current.getBoundingClientRect();
    setChatMenu({ top:r.top, left:r.right+6 });
    setProfile(false);
  }, []);
  const closeMenu = useCallback(()=>setChatMenu(null),[]);

  // ── Click-away ─────────────────────────────────────────────────────────────
  useEffect(()=>{
    const h=(e)=>{
      if(!e.target.closest("[data-prof]")) setProfile(false);
      if(!e.target.closest("[data-dd]"))   setChatMenu(null);
    };
    window.addEventListener("click",h);
    return ()=>window.removeEventListener("click",h);
  },[]);

  // ── Textarea resize ────────────────────────────────────────────────────────
  useEffect(()=>{
    const ta=taRef.current; if(!ta) return;
    ta.style.height="auto";
    ta.style.height=Math.min(ta.scrollHeight,160)+"px";
  },[input]);

  const pRect = profileRef.current?.getBoundingClientRect();
  const dark = theme === "dark";

  return (
    <>
      <style>{THEME_STYLES}</style>
      <div className="app-root" data-theme={theme}>

        {/* ════════════════════ SIDEBAR ════════════════════ */}
        <aside className={`sidebar${sidebar?"":" closed"}`}>
          <div style={{ width:256, display:"flex", flexDirection:"column", height:"100%", flexShrink:0 }}>

            {/* Header */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 12px 8px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <StarLogo size={18}/>
                <span style={{ fontSize:15, fontWeight:600, letterSpacing:"-0.02em", color:"var(--text-primary)" }}>brainEX</span>
              </div>
              <button className="icon-btn" onClick={toggleSidebar} title="Collapse sidebar">
                <LayoutIc/>
              </button>
            </div>

            {/* Nav top */}
            <nav style={{ padding:"2px 8px", display:"flex", flexDirection:"column", gap:1 }}>
              {NAV_TOP.map(({label,icon})=>(
                <button key={label} className="nav-btn">
                  <Ic d={icon} size={14} sw={1.8}/>{label}
                </button>
              ))}
            </nav>

            <div style={{ height:1, background:"var(--border)", margin:"8px 12px" }}/>

            {/* Nav bottom */}
            <nav style={{ padding:"2px 8px", display:"flex", flexDirection:"column", gap:1 }}>
              {NAV_BOTTOM.map(({label,icon})=>(
                <button key={label} className="nav-btn">
                  <Ic d={icon} size={14} sw={1.8}/>{label}
                </button>
              ))}
            </nav>

            <div style={{ height:1, background:"var(--border)", margin:"8px 12px" }}/>

            {/* Recents */}
            <div style={{ padding:"4px 16px 6px", fontSize:10.5, fontWeight:600,
              letterSpacing:"0.07em", textTransform:"uppercase", color:"var(--text-dim)" }}>
              Recents
            </div>
            <div style={{ flex:1, overflowY:"auto", padding:"2px 8px 8px", display:"flex", flexDirection:"column", gap:1 }}>
              {CHATS.map((label,i)=><ChatRow key={i} label={label} onMenu={openMenu}/>)}
            </div>

            {/* Profile */}
            <div style={{ padding:"8px", borderTop:"1px solid var(--border)" }}>
              <div data-prof style={{ position:"relative" }}>
                <button ref={profileRef} onClick={e=>{e.stopPropagation();setProfile(p=>!p);setChatMenu(null);}}
                  style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"8px 10px",
                    borderRadius:12, border:"none", background:"transparent", cursor:"pointer",
                    color:"var(--text-primary)", transition:"background 0.12s" }}
                  onMouseEnter={e=>e.currentTarget.style.background="var(--border)"}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <div style={{ width:30, height:30, borderRadius:"50%", flexShrink:0,
                    background:"linear-gradient(135deg,#7c5cfc,#4a2fbd)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:12, fontWeight:700, color:"#fff" }}>S</div>
                  <div style={{ flex:1, minWidth:0, textAlign:"left" }}>
                    <div style={{ fontSize:13.5, fontWeight:500, color:"var(--text-primary)", lineHeight:1.2 }}>Snaker</div>
                    <div style={{ fontSize:11, color:"var(--text-dim)", lineHeight:1.3 }}>Free plan</div>
                  </div>
                  {/* Bell + dot */}
                  <div style={{ position:"relative", color:"var(--text-dim)" }}>
                    <Ic d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" size={14} sw={1.8}/>
                    <span style={{ position:"absolute", bottom:-1, right:-1, width:6, height:6,
                      borderRadius:"50%", background:"var(--notif)",
                      border:"2px solid var(--sidebar-bg)" }}/>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* ════════════════════ MAIN ════════════════════ */}
        <main className="main-area">

          {/* Topbar */}
          <div style={{ display:"flex", alignItems:"center", padding:"12px 16px 8px", gap:8 }}>
            <button className="icon-btn" onClick={toggleSidebar} title="Toggle sidebar">
              <LayoutIc/>
            </button>
            {!sidebar && (
              <button className="icon-btn" title="New chat">
                <Ic d="M12 5v14M5 12h14" size={14} sw={1.8}/>
              </button>
            )}

            <div style={{ flex:1 }}/>

            {/* ☀️/🌙 Theme toggle */}
            <button className="theme-btn" onClick={toggleTheme}
              title={dark?"Switch to light":"Switch to dark"}>
              {dark ? <SunIc/> : <MoonIc/>}
            </button>

            <button className="icon-btn">
              <Ic d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 0 0-4-5.66V5a2 2 0 1 0-4 0v.34A6 6 0 0 0 6 11v3.2c0 .52-.21 1.04-.6 1.4L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" size={14} sw={1.8}/>
            </button>
          </div>

          {/* Center */}
          <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center",
            justifyContent:"center", padding:"0 24px 80px", gap:32, position:"relative", zIndex:1 }}>

            {/* Pill */}
            <div className="pill-anim">
              <button className="upgrade-pill">
                Free plan
                <span style={{ width:1, height:12, background:"var(--border-2)" }}/>
                <span style={{ color:"var(--accent)", fontWeight:500 }}>Upgrade</span>
              </button>
            </div>

            {/* Greeting */}
            <div className="greeting-anim" style={{ display:"flex", alignItems:"center", gap:16 }}>
              <StarHero/>
              <h1 className="font-serif" style={{
                fontSize:"clamp(26px,4vw,44px)", fontWeight:400, letterSpacing:"-0.02em",
                color:"var(--text-primary)", lineHeight:1, margin:0
              }}>
                Back at it, Snaker
              </h1>
            </div>

            {/* Input */}
            <div className="input-anim" style={{ width:"100%", maxWidth:620 }}>
              <div className="input-card">
                {/* shimmer line */}
                <div style={{ position:"absolute", inset:"0 0 auto", height:1,
                  background: dark
                    ? "linear-gradient(90deg,transparent,rgba(160,140,255,0.1),transparent)"
                    : "linear-gradient(90deg,transparent,rgba(100,80,200,0.07),transparent)" }}/>

                <div style={{ padding:"16px 16px 12px" }}>
                  <textarea ref={taRef} value={input}
                    onChange={e=>setInput(e.target.value)}
                    placeholder="Create a" rows={1}
                    style={{ width:"100%", background:"transparent", border:"none", outline:"none",
                      fontSize:14.5, color:"var(--text-primary)", lineHeight:1.6,
                      minHeight:24, maxHeight:160, caretColor:"var(--accent)",
                      fontFamily:"'DM Sans',sans-serif" }}
                    onKeyDown={e=>{ if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();setInput("");} }}/>
                </div>

                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 12px 12px" }}>
                  <button className="icon-btn" style={{ width:32, height:32 }}>
                    <Ic d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" size={14} sw={1.8}/>
                  </button>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <button className="nav-btn" style={{ width:"auto", padding:"5px 10px", fontSize:12.5, borderRadius:8 }}>
                      Sonnet 4.6 <Ic d="M6 9l6 6 6-6" size={11} sw={2}/>
                    </button>
                    <button className="send-btn" onClick={()=>setInput("")}>
                      <Ic d="M12 19V5M5 12l7-7 7 7" size={13} sw={2.2}/>
                    </button>
                  </div>
                </div>
              </div>
              <p style={{ textAlign:"center", fontSize:11.5, color:"var(--text-dim)", marginTop:10 }}>
                brainEX can make mistakes. Double-check important info.
              </p>
            </div>
          </div>
        </main>

        {/* ════════════════════ CHAT MENU ════════════════════ */}
        {chatMenu && (
          <DdMenu items={CHAT_MENU} style={{ top:chatMenu.top, left:chatMenu.left }} onClose={closeMenu}/>
        )}

        {/* ════════════════════ PROFILE DROPDOWN ════════════════════ */}
        {profile && pRect && (
          <div data-prof data-dd className="profile-dd"
            style={{ bottom:window.innerHeight-pRect.top+8, left:pRect.left }}>
            {/* Card */}
            <div style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px",
              borderBottom:"1px solid var(--border)", marginBottom:4 }}>
              <div style={{ width:36, height:36, borderRadius:"50%",
                background:"linear-gradient(135deg,#7c5cfc,#4a2fbd)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:14, fontWeight:700, color:"#fff", flexShrink:0 }}>S</div>
              <div>
                <div style={{ fontSize:13.5, fontWeight:500, color:"var(--text-primary)" }}>Snaker</div>
                <div style={{ display:"inline-flex", alignItems:"center", padding:"1px 8px",
                  borderRadius:99, fontSize:10, fontWeight:600, marginTop:3,
                  background:"rgba(124,92,252,0.12)", color:"var(--accent)",
                  border:"1px solid rgba(124,92,252,0.25)" }}>Free plan</div>
              </div>
            </div>
            {PROFILE_MENU.map((it,i)=>
              it===null
                ? <div key={i} style={{ height:1, background:"var(--border)", margin:"4px 6px" }}/>
                : <button key={i} className={`dd-item${it.danger?" danger":""}`}
                    style={{ padding:"8px 14px" }} onClick={()=>setProfile(false)}>
                    <Ic d={it.icon} size={13} sw={1.8}/>{it.label}
                  </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}