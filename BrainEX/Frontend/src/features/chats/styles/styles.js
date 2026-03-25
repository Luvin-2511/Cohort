export const THEME_STYLES = `
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

  ::view-transition-old(root) { animation: vt-out 0.35s cubic-bezier(0.4,0,0.2,1) both; }
  ::view-transition-new(root) { animation: vt-in  0.35s cubic-bezier(0.4,0,0.2,1) both; }
  ::view-transition-old(theme-btn) { animation: vt-spin-out 0.3s cubic-bezier(0.4,0,1,1) both; }
  ::view-transition-new(theme-btn) { animation: vt-spin-in  0.35s cubic-bezier(0,0,0.2,1) both; }

  @keyframes vt-out      { from{opacity:1;filter:blur(0);}  to{opacity:0;filter:blur(6px);} }
  @keyframes vt-in       { from{opacity:0;filter:blur(6px);}to{opacity:1;filter:blur(0);}  }
  @keyframes vt-spin-out { from{opacity:1;transform:rotate(0) scale(1);}  to{opacity:0;transform:rotate(-90deg) scale(0.4);} }
  @keyframes vt-spin-in  { from{opacity:0;transform:rotate(90deg) scale(0.4);}to{opacity:1;transform:rotate(0) scale(1);}  }

  @keyframes dropIn   { from{opacity:0;transform:scale(0.95) translateY(-4px);}to{opacity:1;transform:scale(1) translateY(0);} }
  @keyframes slideUp  { from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);} }
  @keyframes fadeIn   { from{opacity:0;}to{opacity:1;} }
  @keyframes spin     { to{transform:rotate(360deg);} }
  @keyframes pulse-glow { 0%,100%{opacity:.4;}50%{opacity:.9;} }
  @keyframes dash-in { from{stroke-dashoffset:200}to{stroke-dashoffset:0} }

  .asterisk-spin { animation: spin 12s linear infinite; }
  .greeting-anim { animation: slideUp 0.5s cubic-bezier(0.2,0,0,1) both; }
  .input-anim    { animation: slideUp 0.55s 0.08s cubic-bezier(0.2,0,0,1) both; }
  .pill-anim     { animation: fadeIn 0.4s 0.04s both; }

  html,body,#root{height:100%;margin:0;padding:0;}
  *{font-family:'DM Sans',sans-serif;}
  .font-serif{font-family:'Lora',Georgia,serif!important;}
  textarea{resize:none;}
  ::-webkit-scrollbar{width:3px;}
  ::-webkit-scrollbar-track{background:transparent;}
  ::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px;}

  .app-root {
    display:flex; height:100vh; width:100vw; overflow:hidden; position:relative;
    background:var(--bg); color:var(--text-primary);
    transition:background 0.32s,color 0.32s;
  }
  .app-root::before {
    content:''; position:fixed; inset:-50%; width:200%; height:200%;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity:var(--grain-op); pointer-events:none; z-index:9999;
  }

  .sidebar {
    flex-shrink:0; overflow:hidden; position:relative; z-index:20;
    background:var(--sidebar-bg); border-right:1px solid var(--border);
    display:flex; flex-direction:column;
    width:256px;
    transition:width 0.28s cubic-bezier(0.4,0,0.2,1), border-color 0.32s, background 0.32s;
  }
  .sidebar.closed { width:0; border-right-color:transparent; }

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

  .profile-dd {
    position:fixed; z-index:200; width:226px;
    background:var(--surface); border:1px solid var(--border);
    border-radius:16px; padding:4px;
    box-shadow:0 -8px 40px var(--shadow-color);
    animation:slideUp 0.15s cubic-bezier(0.2,0,0,1) both;
  }

  .input-card {
    background:var(--surface); border:1px solid var(--border);
    border-radius:18px; overflow:hidden; position:relative;
    box-shadow:0 8px 32px var(--shadow-color);
    transition:border-color 0.2s,background 0.32s,box-shadow 0.32s;
  }
  .input-card:focus-within{border-color:rgba(124,92,252,0.4);}

  .upgrade-pill {
    display:flex; align-items:center; gap:8px; padding:6px 16px;
    border-radius:999px; border:1px solid var(--border);
    background:var(--surface-2); font-size:12.5px;
    color:var(--text-muted); cursor:pointer;
    transition:border-color 0.15s,color 0.15s,background 0.32s;
  }
  .upgrade-pill:hover{border-color:var(--accent);color:var(--text-primary);}

  .send-btn {
    width:32px; height:32px; border-radius:10px; border:none;
    background:var(--accent); color:#fff; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 4px 14px rgba(124,92,252,0.45);
    transition:background 0.12s,transform 0.1s;
  }
  .send-btn:hover{background:var(--accent-h);transform:scale(1.07);}
  .send-btn:active{transform:scale(0.95);}

  .theme-btn {
    view-transition-name: theme-btn;
    width:32px; height:32px; border-radius:10px;
    border:1px solid var(--border); background:var(--surface-2);
    color:var(--text-muted); cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    transition:background 0.2s,border-color 0.2s,color 0.2s,transform 0.15s;
  }
  .theme-btn:hover{background:var(--border);color:var(--accent);transform:scale(1.1);}

  .main-area {
    flex:1; display:flex; flex-direction:column; position:relative; overflow:hidden;
  }
  .main-area::after {
    content:''; position:absolute; inset:0; pointer-events:none;
    background:radial-gradient(ellipse 55% 45% at 50% 62%, var(--glow) 0%, transparent 70%);
    animation:pulse-glow 5s ease-in-out infinite;
  }
`;