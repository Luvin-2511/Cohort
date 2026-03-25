import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "https://cdn.skypack.dev/gsap";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

/* ─── Shared Styles ──────────────────────────────────────────────────────── */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Bungee&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #0a0812; overflow-x: hidden; }
  input::placeholder { color: rgba(124,92,252,0.2); font-family: 'Space Mono', monospace; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: #0a0812; }
  ::-webkit-scrollbar-thumb { background: rgba(124,92,252,0.4); border-radius: 2px; }

  @keyframes shimmer {
    0%   { background-position: 200% center; }
    100% { background-position: -200% center; }
  }
  @keyframes pulse-ring {
    0%   { transform: scale(0.9); opacity: 0.6; }
    50%  { transform: scale(1.1); opacity: 1; }
    100% { transform: scale(0.9); opacity: 0.6; }
  }
  @keyframes float-y {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-18px); }
  }
  @keyframes drift {
    0%   { transform: translate(0,0) rotate(0deg); }
    33%  { transform: translate(30px,-20px) rotate(120deg); }
    66%  { transform: translate(-20px,15px) rotate(240deg); }
    100% { transform: translate(0,0) rotate(360deg); }
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes scanline {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes glitch-x {
    0%,100% { clip-path: inset(0 0 95% 0); transform: translateX(-4px); }
    20%      { clip-path: inset(20% 0 60% 0); transform: translateX(4px); }
    40%      { clip-path: inset(50% 0 30% 0); transform: translateX(-2px); }
    60%      { clip-path: inset(80% 0 5% 0); transform: translateX(3px); }
    80%      { clip-path: inset(5% 0 85% 0); transform: translateX(-3px); }
  }

  .hex-logo-spin { animation: drift 20s linear infinite; }

  /* Cursor glow */
  .cursor-glow {
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(124,92,252,0.06) 0%, transparent 70%);
    pointer-events: none; position: fixed; z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
  }
`;

/* ─── Logo ───────────────────────────────────────────────────────────────── */
function BrainLogo({ size = 1, onClick }) {
  return (
    <div onClick={onClick} style={{ display:"flex", alignItems:"center", gap: 10*size, cursor: onClick ? "pointer" : "default" }}>
      <svg width={38*size} height={38*size} viewBox="0 0 38 38">
        <polygon points="19,2 35,11 35,27 19,36 3,27 3,11" fill="none" stroke="#7c5cfc" strokeWidth="1.2"/>
        <polygon points="19,8 29,14 29,24 19,30 9,24 9,14" fill="rgba(124,92,252,0.08)" stroke="#7c5cfc" strokeWidth="0.7" strokeDasharray="2,2"/>
        <polygon points="19,13 24,16 24,22 19,25 14,22 14,16" fill="rgba(124,92,252,0.15)" stroke="#9273ff" strokeWidth="0.5"/>
        <circle cx="19" cy="19" r="3.5" fill="#7c5cfc"/>
        <circle cx="19" cy="19" r="5.5" fill="none" stroke="rgba(124,92,252,0.35)" strokeWidth="0.8"/>
        {[0,60,120,180,240,300].map((deg,i)=>{
          const rad=(deg*Math.PI)/180;
          return <line key={i} x1={19+5.5*Math.cos(rad)} y1={19+5.5*Math.sin(rad)} x2={19+9.5*Math.cos(rad)} y2={19+9.5*Math.sin(rad)} stroke="#7c5cfc" strokeWidth="0.9" opacity="0.7"/>;
        })}
      </svg>
      <div>
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:20*size, fontWeight:800, letterSpacing:"0.04em", color:"#f0eeff", lineHeight:1 }}>
          brain<span style={{color:"#7c5cfc"}}>EX</span>
        </div>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:8*size, color:"#9273ff", letterSpacing:"0.2em", marginTop:2 }}>
          INTELLIGENCE LAYER
        </div>
      </div>
    </div>
  );
}

/* ─── Neural BG (purple theme) ───────────────────────────────────────────── */
function NeuralBg() {
  const ref = useRef(null);
  useEffect(()=>{
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = ()=>{ canvas.width=canvas.offsetWidth; canvas.height=canvas.offsetHeight; };
    resize(); window.addEventListener("resize",resize);
    const N=55;
    const nodes=Array.from({length:N},()=>({
      x:Math.random(), y:Math.random(),
      vx:(Math.random()-0.5)*0.00025,
      vy:(Math.random()-0.5)*0.00025,
      r:Math.random()*2+1,
      phase:Math.random()*Math.PI*2,
    }));
    let mouse={x:-999,y:-999};
    const onMove=(e)=>{ mouse.x=e.clientX/canvas.width; mouse.y=e.clientY/canvas.height; };
    window.addEventListener("mousemove",onMove);
    const draw=()=>{
      const W=canvas.width, H=canvas.height;
      ctx.clearRect(0,0,W,H);
      for(let i=0;i<N;i++){
        for(let j=i+1;j<N;j++){
          const a=nodes[i],b=nodes[j];
          const dx=(a.x-b.x)*W, dy=(a.y-b.y)*H;
          const d=Math.sqrt(dx*dx+dy*dy);
          if(d<150){
            ctx.beginPath(); ctx.moveTo(a.x*W,a.y*H); ctx.lineTo(b.x*W,b.y*H);
            ctx.strokeStyle=`rgba(124,92,252,${(1-d/150)*0.2})`; ctx.lineWidth=0.7; ctx.stroke();
          }
        }
      }
      nodes.forEach(n=>{
        n.phase+=0.018;
        const mx=(n.x-mouse.x)*W, my=(n.y-mouse.y)*H;
        const md=Math.sqrt(mx*mx+my*my);
        const pull=md<130?(1-md/130)*0.003:0;
        n.vx-=(n.x-mouse.x)*pull; n.vy-=(n.y-mouse.y)*pull;
        n.x+=n.vx; n.y+=n.vy;
        if(n.x<0||n.x>1)n.vx*=-1; if(n.y<0||n.y>1)n.vy*=-1;
        const glow=(Math.sin(n.phase)+1)/2;
        const g=ctx.createRadialGradient(n.x*W,n.y*H,0,n.x*W,n.y*H,n.r*6);
        g.addColorStop(0,`rgba(124,92,252,${0.7*glow+0.1})`);
        g.addColorStop(1,"rgba(124,92,252,0)");
        ctx.beginPath(); ctx.arc(n.x*W,n.y*H,n.r*6,0,Math.PI*2);
        ctx.fillStyle=g; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x*W,n.y*H,n.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(192,170,255,${0.5+0.4*glow})`; ctx.fill();
      });
      raf=requestAnimationFrame(draw);
    };
    draw();
    return()=>{ cancelAnimationFrame(raf); window.removeEventListener("resize",resize); window.removeEventListener("mousemove",onMove); };
  },[]);
  return <canvas ref={ref} style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.45 }}/>;
}

/* ─── Typewriter ─────────────────────────────────────────────────────────── */
function TypewriterText({ phrases }) {
  const [displayed,setDisplayed]=useState("");
  const [pi,setPi]=useState(0);
  const [ci,setCi]=useState(0);
  const [del,setDel]=useState(false);
  useEffect(()=>{
    const cur=phrases[pi];
    if(!del&&ci<cur.length){ const t=setTimeout(()=>{setDisplayed(cur.slice(0,ci+1));setCi(c=>c+1);},55); return()=>clearTimeout(t); }
    if(!del&&ci===cur.length){ const t=setTimeout(()=>setDel(true),2400); return()=>clearTimeout(t); }
    if(del&&ci>0){ const t=setTimeout(()=>{setDisplayed(cur.slice(0,ci-1));setCi(c=>c-1);},30); return()=>clearTimeout(t); }
    if(del&&ci===0){ setDel(false); setPi(i=>(i+1)%phrases.length); }
  },[ci,del,pi,phrases]);
  return <span>{displayed}<span style={{animation:"blink 1s step-end infinite",color:"#7c5cfc"}}>|</span></span>;
}

/* ─── Floating snippet card ──────────────────────────────────────────────── */
function FloatingCard({ text, src, x, y, delay }) {
  const ref=useRef(null);
  useEffect(()=>{
    gsap.fromTo(ref.current,{opacity:0,scale:0.7,y:20},{opacity:1,scale:1,y:0,duration:1,delay,ease:"back.out(2)"});
    gsap.to(ref.current,{y:-16,duration:3+Math.random()*2,ease:"sine.inOut",yoyo:true,repeat:-1,delay:delay+0.5});
  },[]);
  return (
    <div ref={ref} style={{ position:"absolute", left:x, top:y, zIndex:3,
      background:"rgba(12,9,24,0.88)", backdropFilter:"blur(20px)",
      border:"1px solid rgba(124,92,252,0.22)", borderRadius:14,
      padding:"10px 16px", maxWidth:210,
      boxShadow:"0 12px 40px rgba(0,0,0,0.5), 0 0 20px rgba(124,92,252,0.08)" }}>
      <div style={{fontFamily:"'Space Mono',monospace",fontSize:8,color:"#7c5cfc",letterSpacing:"0.12em",marginBottom:4}}>↗ SOURCE CITED</div>
      <div style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:"#6b6888",lineHeight:1.6}}>{text}</div>
      <div style={{fontFamily:"'Space Mono',monospace",fontSize:8,color:"#3d3a55",marginTop:4}}>— {src}</div>
    </div>
  );
}

/* ─── Feature Card ───────────────────────────────────────────────────────── */
function FeatureCard({ icon, title, desc, accent, index }) {
  const ref=useRef(null);
  useEffect(()=>{
    gsap.fromTo(ref.current,
      {opacity:0,y:60,rotateX:15},
      {opacity:1,y:0,rotateX:0,duration:0.9,delay:index*0.08,ease:"power3.out",
       scrollTrigger:{trigger:ref.current,start:"top 88%"}});
  },[]);
  return (
    <div ref={ref} style={{ padding:"30px", background:"rgba(12,9,24,0.7)",
      border:"1px solid rgba(124,92,252,0.1)", borderRadius:20,
      backdropFilter:"blur(20px)", position:"relative", overflow:"hidden",
      transition:"border-color 0.3s,transform 0.3s,box-shadow 0.3s", cursor:"default" }}
      onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(124,92,252,0.4)"; e.currentTarget.style.transform="translateY(-8px)"; e.currentTarget.style.boxShadow="0 30px 70px rgba(0,0,0,0.4),0 0 40px rgba(124,92,252,0.1)"; }}
      onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(124,92,252,0.1)"; e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
      <div style={{ position:"absolute",top:0,left:0,right:0,height:2, background:`linear-gradient(90deg,transparent,${accent||"#7c5cfc"},transparent)`,opacity:0.7 }}/>
      <div style={{ width:50,height:50,borderRadius:14, background:"rgba(124,92,252,0.07)", border:"1px solid rgba(124,92,252,0.18)",
        display:"flex",alignItems:"center",justifyContent:"center", fontSize:22,marginBottom:20 }}>{icon}</div>
      <div style={{ fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:700,color:"#ede8ff",marginBottom:10 }}>{title}</div>
      <div style={{ fontFamily:"'Space Mono',monospace",fontSize:11,color:"#4b5569",lineHeight:1.9 }}>{desc}</div>
    </div>
  );
}

/* ─── Stat ───────────────────────────────────────────────────────────────── */
function Stat({ value, label, index }) {
  const ref=useRef(null);
  useEffect(()=>{
    gsap.fromTo(ref.current,{opacity:0,y:30},{opacity:1,y:0,duration:0.8,delay:index*0.12,ease:"power3.out",
      scrollTrigger:{trigger:ref.current,start:"top 88%"}});
  },[]);
  return (
    <div ref={ref} style={{textAlign:"center"}}>
      <div style={{ fontFamily:"'ROUND 8 THREE',sans-serif",fontSize:48,fontWeight:800,color:"#7c5cfc",lineHeight:1,marginBottom:8 }}>{value}</div>
      <div style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"#3d3a55",letterSpacing:"0.12em" }}>{label}</div>
    </div>
  );
}

/* ─── Demo Answer ────────────────────────────────────────────────────────── */
function DemoAnswer() {
  const ref=useRef(null);
  useEffect(()=>{
    gsap.fromTo(ref.current,{opacity:0,y:40,scale:0.96},{opacity:1,y:0,scale:1,duration:1.1,ease:"power3.out",
      scrollTrigger:{trigger:ref.current,start:"top 80%"}});
  },[]);
  return (
    <div ref={ref} style={{ background:"rgba(12,9,24,0.88)", backdropFilter:"blur(30px)",
      border:"1px solid rgba(124,92,252,0.15)", borderRadius:22, overflow:"hidden",
      boxShadow:"0 50px 120px rgba(0,0,0,0.5), 0 0 60px rgba(124,92,252,0.06)", maxWidth:740, margin:"0 auto" }}>
      {/* chrome */}
      <div style={{ padding:"12px 18px", borderBottom:"1px solid rgba(124,92,252,0.08)", display:"flex", alignItems:"center", gap:8 }}>
        {["#ef4444","#f59e0b","#22c55e"].map((c,i)=><div key={i} style={{width:10,height:10,borderRadius:"50%",background:c,opacity:0.6}}/>)}
        <div style={{ flex:1,marginLeft:8, background:"rgba(124,92,252,0.06)", border:"1px solid rgba(124,92,252,0.1)", borderRadius:6,
          padding:"4px 12px", fontFamily:"'Space Mono',monospace", fontSize:9, color:"#2a2440", letterSpacing:"0.08em" }}>
          app.brainex.ai/search
        </div>
      </div>
      <div style={{padding:"30px 34px"}}>
        {/* query */}
        <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:18}}>
          <div style={{ width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#7c5cfc,#4a2fbd)",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#fff" }}>U</div>
          <div style={{ fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:600,color:"#ede8ff",lineHeight:1.5,paddingTop:4 }}>How does CRISPR-Cas9 gene editing work at the molecular level?</div>
        </div>
        {/* scanning */}
        <div style={{ display:"flex",alignItems:"center",gap:8,padding:"8px 14px", background:"rgba(124,92,252,0.05)", border:"1px solid rgba(124,92,252,0.12)", borderRadius:10, marginBottom:18 }}>
          <div style={{ width:6,height:6,borderRadius:"50%",background:"#7c5cfc",animation:"pulse-ring 1.5s ease-in-out infinite" }}/>
          <span style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"#9273ff",letterSpacing:"0.08em" }}>Synthesizing 847 sources · Nature, Science, Cell, PubMed...</span>
        </div>
        {/* answer */}
        <div style={{display:"flex",gap:14,marginBottom:18}}>
          <div style={{ width:2,background:"linear-gradient(180deg,#7c5cfc,transparent)",borderRadius:2,flexShrink:0 }}/>
          <div style={{ fontFamily:"'Space Mono',monospace",fontSize:12,color:"#6b6888",lineHeight:2 }}>
            CRISPR-Cas9 works by using a guide RNA (gRNA) that matches the target DNA sequence. The Cas9 protein acts as molecular scissors, creating a double-strand break at the specified location. The cell's natural repair mechanisms then either introduce errors (gene knockout) or incorporate new genetic material (gene insertion)...
          </div>
        </div>
        {/* citations */}
        <div style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"#7c5cfc",letterSpacing:"0.06em",paddingLeft:16 }}>
          ↗ Doudna & Charpentier, Science 2012  ·  ↗ Zhang Lab, Cell 2013  ·  +844 more
        </div>
      </div>
    </div>
  );
}

/* ─── Pricing Card ───────────────────────────────────────────────────────── */
function PricingCard({ plan, price, features, highlighted, index }) {
  const ref=useRef(null);
  useEffect(()=>{
    gsap.fromTo(ref.current,{opacity:0,y:60},{opacity:1,y:0,duration:0.9,delay:index*0.1,ease:"power3.out",
      scrollTrigger:{trigger:ref.current,start:"top 88%"}});
  },[]);
  return (
    <div ref={ref} style={{ padding:"34px 28px",
      background: highlighted?"linear-gradient(145deg,rgba(124,92,252,0.14),rgba(92,52,219,0.06))":"rgba(12,9,24,0.7)",
      border:`1.5px solid ${highlighted?"rgba(124,92,252,0.5)":"rgba(124,92,252,0.1)"}`,
      borderRadius:22, backdropFilter:"blur(20px)", position:"relative",
      transform:highlighted?"scale(1.04)":"scale(1)",
      boxShadow:highlighted?"0 0 70px rgba(124,92,252,0.15),0 30px 80px rgba(0,0,0,0.4)":"none" }}>
      {highlighted&&<div style={{ position:"absolute",top:-13,left:"50%",transform:"translateX(-50%)",
        background:"linear-gradient(90deg,#5b3fd4,#9273ff)", borderRadius:20, padding:"4px 16px",
        fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:700,color:"#fff",letterSpacing:"0.1em",whiteSpace:"nowrap" }}>MOST POPULAR</div>}
      <div style={{ fontFamily:"'Space Mono',monospace",fontSize:11,color:"#7c5cfc",letterSpacing:"0.15em",marginBottom:10 }}>{plan}</div>
      <div style={{ display:"flex",alignItems:"baseline",gap:4,marginBottom:24 }}>
        <span style={{ fontFamily:"'Syne',sans-serif",fontSize:42,fontWeight:800,color:"#ede8ff" }}>{price}</span>
        {price!=="Free"&&<span style={{ fontFamily:"'Space Mono',monospace",fontSize:12,color:"#3d3a55" }}>/month</span>}
      </div>
      <div style={{ display:"flex",flexDirection:"column",gap:12,marginBottom:28 }}>
        {features.map(f=>(
          <div key={f} style={{ display:"flex",alignItems:"center",gap:10,fontFamily:"'Space Mono',monospace",fontSize:11,color:"#4b5569" }}>
            <span style={{color:"#7c5cfc",fontSize:12}}>✓</span>{f}
          </div>
        ))}
      </div>
      <button style={{ width:"100%",padding:"13px 0",
        background:highlighted?"linear-gradient(135deg,#5b3fd4,#7c5cfc,#9273ff)":"rgba(124,92,252,0.08)",
        border:highlighted?"none":"1px solid rgba(124,92,252,0.25)", borderRadius:12, cursor:"pointer",
        fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,
        color:highlighted?"#fff":"#7c5cfc", letterSpacing:"0.08em",
        boxShadow:highlighted?"0 6px 28px rgba(124,92,252,0.5)":"none", transition:"all 0.2s" }}
        onMouseEnter={e=>{ e.currentTarget.style.opacity="0.85"; e.currentTarget.style.transform="translateY(-2px)"; }}
        onMouseLeave={e=>{ e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="translateY(0)"; }}>
        GET STARTED →
      </button>
    </div>
  );
}

/* ─── How It Works Step ──────────────────────────────────────────────────── */
function Step({ num, title, desc, icon, align, index }) {
  const ref=useRef(null);
  useEffect(()=>{
    gsap.fromTo(ref.current,{opacity:0,x:align==="left"?-60:60},{opacity:1,x:0,duration:0.9,delay:index*0.1,ease:"power3.out",
      scrollTrigger:{trigger:ref.current,start:"top 88%"}});
  },[]);
  return (
    <div ref={ref} style={{ display:"flex",gap:32,marginBottom:64,flexDirection:align==="right"?"row-reverse":"row" }}>
      <div style={{flexShrink:0}}>
        <div style={{ width:64,height:64,borderRadius:"50%", background:"rgba(12,9,24,0.9)", border:"1.5px solid rgba(124,92,252,0.4)",
          display:"flex",alignItems:"center",justifyContent:"center", fontSize:24,zIndex:2,
          boxShadow:"0 0 30px rgba(124,92,252,0.2)" }}>{icon}</div>
      </div>
      <div style={{paddingTop:12}}>
        <div style={{ fontFamily:"'Space Mono',monospace",fontSize:9,color:"#7c5cfc",letterSpacing:"0.2em",marginBottom:8 }}>{num}</div>
        <div style={{ fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:700,color:"#ede8ff",marginBottom:12 }}>{title}</div>
        <div style={{ fontFamily:"'Space Mono',monospace",fontSize:12,color:"#4b5569",lineHeight:1.9 }}>{desc}</div>
      </div>
    </div>
  );
}

/* ─── CTA ────────────────────────────────────────────────────────────────── */
function CTASection({ onNavigateToRegister }) {
  const ref=useRef(null);
  useEffect(()=>{
    gsap.fromTo(ref.current.children,{opacity:0,y:50},{opacity:1,y:0,stagger:0.1,duration:0.9,ease:"power3.out",
      scrollTrigger:{trigger:ref.current,start:"top 80%"}});
  },[]);
  return (
    <div ref={ref} style={{position:"relative",zIndex:2}}>
      <div style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"#7c5cfc",letterSpacing:"0.2em",marginBottom:16 }}>// JOIN THE NETWORK</div>
      <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:"clamp(40px,6vw,80px)",fontWeight:800,color:"#ede8ff",lineHeight:1.05,marginBottom:24 }}>
        Ready to think<br/><span style={{ background:"linear-gradient(90deg,#7c5cfc,#c4b5fd)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>without limits?</span>
      </h2>
      <p style={{ fontFamily:"'Space Mono',monospace",fontSize:13,color:"#3d3a55",lineHeight:1.9,marginBottom:40,maxWidth:500,margin:"0 auto 40px" }}>
        Join 2.4M+ researchers and thinkers. Free to start — no credit card required.
      </p>
      <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
        <button onClick={onNavigateToRegister} style={{ padding:"16px 40px",background:"linear-gradient(135deg,#5b3fd4,#7c5cfc,#9273ff)",
          border:"none",borderRadius:14,cursor:"pointer",fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,
          color:"#fff",letterSpacing:"0.1em",boxShadow:"0 8px 40px rgba(124,92,252,0.5)",transition:"all 0.2s" }}
          onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-3px) scale(1.02)"; e.currentTarget.style.boxShadow="0 16px 60px rgba(124,92,252,0.65)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0) scale(1)"; e.currentTarget.style.boxShadow="0 8px 40px rgba(124,92,252,0.5)"; }}>
          START FOR FREE →
        </button>
        <button style={{ padding:"16px 40px",background:"transparent",border:"1.5px solid rgba(124,92,252,0.35)",borderRadius:14,cursor:"pointer",
          fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,color:"#9273ff",letterSpacing:"0.1em",transition:"all 0.2s" }}
          onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(124,92,252,0.7)"; e.currentTarget.style.background="rgba(124,92,252,0.07)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(124,92,252,0.35)"; e.currentTarget.style.background="transparent"; }}>
          WATCH DEMO
        </button>
      </div>
    </div>
  );
}

/* ─── HORIZONTAL SCROLL MARQUEE ─────────────────────────────────────────── */
function Marquee({ items }) {
  const trackRef = useRef(null);
  useEffect(()=>{
    const el = trackRef.current;
    let x = 0;
    const speed = 0.6;
    const tick = () => {
      x -= speed;
      if (x < -(el.scrollWidth / 2)) x = 0;
      el.style.transform = `translateX(${x}px)`;
      requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  },[]);
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow:"hidden", width:"100%", maskImage:"linear-gradient(90deg,transparent,black 10%,black 90%,transparent)" }}>
      <div ref={trackRef} style={{ display:"flex", gap:16, width:"max-content" }}>
        {doubled.map((item,i)=>(
          <div key={i} style={{ padding:"10px 22px", whiteSpace:"nowrap",
            background:"rgba(124,92,252,0.05)", border:"1px solid rgba(124,92,252,0.15)", borderRadius:99,
            fontFamily:"'Space Mono',monospace", fontSize:11, color:"#6b5fcc", letterSpacing:"0.06em",
            display:"flex",alignItems:"center",gap:8 }}>
            <span style={{color:"#7c5cfc",fontSize:14}}>✦</span>{item}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── BENTO GRID SECTION ─────────────────────────────────────────────────── */
function BentoGrid() {
  const ref = useRef(null);
  useEffect(()=>{
    const cards = ref.current.querySelectorAll(".bento-card");
    gsap.fromTo(cards, {opacity:0,y:50,scale:0.93},
      {opacity:1,y:0,scale:1,duration:0.8,stagger:0.07,ease:"power3.out",
       scrollTrigger:{trigger:ref.current,start:"top 85%"}});
  },[]);

  return (
    <div ref={ref} style={{ maxWidth:1100,margin:"0 auto",display:"grid",gap:20,
      gridTemplateColumns:"repeat(3,1fr)", gridTemplateRows:"auto" }}>
      {/* Big card */}
      <div className="bento-card" style={{ gridColumn:"1/3", padding:"40px",
        background:"rgba(12,9,24,0.8)", border:"1px solid rgba(124,92,252,0.15)", borderRadius:22,
        backdropFilter:"blur(20px)", position:"relative", overflow:"hidden",
        transition:"border-color 0.3s,box-shadow 0.3s" }}
        onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(124,92,252,0.4)"; e.currentTarget.style.boxShadow="0 0 50px rgba(124,92,252,0.1)"; }}
        onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(124,92,252,0.15)"; e.currentTarget.style.boxShadow="none"; }}>
        <div style={{ position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#7c5cfc,transparent)",opacity:0.8 }}/>
        <div style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"#7c5cfc",letterSpacing:"0.2em",marginBottom:16 }}>// REAL-TIME SYNTHESIS</div>
        <div style={{ fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,color:"#ede8ff",marginBottom:16,lineHeight:1.2 }}>
          Search that reads<br/>the web for you
        </div>
        <div style={{ fontFamily:"'Space Mono',monospace",fontSize:12,color:"#4b5569",lineHeight:1.9,maxWidth:420 }}>
          brainEX indexes 2.4B+ live sources in real-time. Ask anything and get synthesized answers with citations — not just a list of blue links.
        </div>
        {/* Decorative orb */}
        <div style={{ position:"absolute",right:-60,bottom:-60,width:220,height:220,borderRadius:"50%",
          background:"radial-gradient(circle,rgba(124,92,252,0.12),transparent 70%)",filter:"blur(20px)" }}/>
      </div>
      {/* Tall card */}
      <div className="bento-card" style={{ padding:"32px",
        background:"linear-gradient(145deg,rgba(91,63,212,0.15),rgba(124,92,252,0.05))",
        border:"1px solid rgba(124,92,252,0.25)", borderRadius:22, backdropFilter:"blur(20px)",
        display:"flex",flexDirection:"column",justifyContent:"space-between", transition:"all 0.3s" }}
        onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.boxShadow="0 20px 50px rgba(124,92,252,0.15)"; }}
        onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
        <div style={{ fontSize:36 }}>⚡</div>
        <div>
          <div style={{ fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:"#ede8ff",marginBottom:8 }}>Sub-200ms answers</div>
          <div style={{ fontFamily:"'Space Mono',monospace",fontSize:11,color:"#4b5569",lineHeight:1.8 }}>Neural indexing that never sleeps. Real-time, every time.</div>
        </div>
      </div>
      {/* Citation card */}
      <div className="bento-card" style={{ padding:"32px",
        background:"rgba(12,9,24,0.8)", border:"1px solid rgba(124,92,252,0.12)", borderRadius:22,
        backdropFilter:"blur(20px)", transition:"all 0.3s" }}
        onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(124,92,252,0.35)"; e.currentTarget.style.transform="translateY(-6px)"; }}
        onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(124,92,252,0.12)"; e.currentTarget.style.transform="translateY(0)"; }}>
        <div style={{ fontSize:36,marginBottom:16 }}>◈</div>
        <div style={{ fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:"#ede8ff",marginBottom:8 }}>Every claim cited</div>
        <div style={{ fontFamily:"'Space Mono',monospace",fontSize:11,color:"#4b5569",lineHeight:1.8 }}>Primary sources inline. Verify, dive deeper, or cite with confidence.</div>
      </div>
      {/* Privacy */}
      <div className="bento-card" style={{ padding:"32px",
        background:"rgba(12,9,24,0.8)", border:"1px solid rgba(124,92,252,0.12)", borderRadius:22,
        backdropFilter:"blur(20px)", transition:"all 0.3s" }}
        onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(124,92,252,0.35)"; e.currentTarget.style.transform="translateY(-6px)"; }}
        onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(124,92,252,0.12)"; e.currentTarget.style.transform="translateY(0)"; }}>
        <div style={{ fontSize:36,marginBottom:16 }}>🔒</div>
        <div style={{ fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:"#ede8ff",marginBottom:8 }}>Zero-log privacy</div>
        <div style={{ fontFamily:"'Space Mono',monospace",fontSize:11,color:"#4b5569",lineHeight:1.8 }}>Your queries are never stored, sold, or profiled. Full stop.</div>
      </div>
    </div>
  );
}

/* ─── PARALLAX TITLE SECTION ─────────────────────────────────────────────── */
function ParallaxSection({ children }) {
  const ref = useRef(null);
  useEffect(()=>{
    gsap.to(ref.current, {
      yPercent: -15, ease:"none",
      scrollTrigger:{ trigger:ref.current, start:"top bottom", end:"bottom top", scrub:true }
    });
  },[]);
  return <div ref={ref}>{children}</div>;
}

/* ─── MAIN HOMEPAGE ──────────────────────────────────────────────────────── */
export function HomePage({ onNavigateToLogin, onNavigateToRegister }) {
  const navRef     = useRef(null);
  const h1Ref      = useRef(null);
  const subRef     = useRef(null);
  const badgeRef   = useRef(null);
  const searchRef  = useRef(null);
  const tagsRef    = useRef(null);
  const cursorRef  = useRef(null);
  const searchQ    = useRef(null);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  // Cursor glow
  useEffect(()=>{
    const move=(e)=>{ if(cursorRef.current){ cursorRef.current.style.left=e.clientX+"px"; cursorRef.current.style.top=e.clientY+"px"; } };
    window.addEventListener("mousemove",move);
    return ()=>window.removeEventListener("mousemove",move);
  },[]);

  useEffect(()=>{
    // Navbar
    gsap.fromTo(navRef.current,{opacity:0,y:-30},{opacity:1,y:0,duration:0.9,ease:"power3.out"});

    // Hero sequence
    const tl = gsap.timeline({defaults:{ease:"power3.out"}});
    tl.fromTo(badgeRef.current,{opacity:0,y:20},{opacity:1,y:0,duration:0.7},0.4)
      .fromTo(h1Ref.current.children,{opacity:0,y:80,skewY:4},{opacity:1,y:0,skewY:0,stagger:0.1,duration:1.1},0.6)
      .fromTo(subRef.current,{opacity:0,y:24},{opacity:1,y:0,duration:0.8},1.1)
      .fromTo(searchRef.current,{opacity:0,y:30,scale:0.96},{opacity:1,y:0,scale:1,duration:0.9},1.3)
      .fromTo(tagsRef.current?.children||[],{opacity:0,y:14},{opacity:1,y:0,stagger:0.05,duration:0.5},1.6);

    // Ambient orb animations
    gsap.to(".hp-orb-1",{y:-35,x:18,duration:6,ease:"sine.inOut",yoyo:true,repeat:-1});
    gsap.to(".hp-orb-2",{y:22,x:-14,duration:7.5,ease:"sine.inOut",yoyo:true,repeat:-1,delay:2});
    gsap.to(".hp-orb-3",{y:-16,duration:5,ease:"sine.inOut",yoyo:true,repeat:-1,delay:1});

    // Scroll-triggered section reveals
    gsap.utils.toArray(".section-title").forEach((el,i)=>{
      gsap.fromTo(el,{opacity:0,y:40},{opacity:1,y:0,duration:0.8,ease:"power3.out",
        scrollTrigger:{trigger:el,start:"top 88%"}});
    });

    // Horizontal rule lines that animate in
    gsap.utils.toArray(".hr-line").forEach(el=>{
      gsap.fromTo(el,{scaleX:0},{scaleX:1,duration:1.2,ease:"power3.inOut",
        scrollTrigger:{trigger:el,start:"top 90%"}});
    });

  },[]);

  const navigate = useNavigate()

  const handleSearch=(q)=>{ alert(`Searching: "${q}"`); };
  const TAGS = ["Quantum Computing","CRISPR","Fusion Energy","AGI Timeline","Dark Matter","Neural Plasticity"];
  const SUGGESTIONS = ["How does CRISPR work?","Explain quantum entanglement","Latest in fusion energy","What is dark matter?","How do neural networks learn?"];
  const MARQUEE_ITEMS = ["Neural Search","Live Web Index","Source Citations","Deep Research Mode","Multi-modal Input","Privacy First","Sub-200ms","2.4B Sources","Zero-log","SOC 2 Compliant","Verified Facts","API Access"];

  return (
    <div style={{background:"#0a0812",minHeight:"100vh",overflowX:"hidden",position:"relative"}}>
      <style>{STYLES}</style>

      {/* Cursor glow */}
      <div ref={cursorRef} className="cursor-glow"/>

      {/* ── NAVBAR ── */}
      <nav ref={navRef} style={{ position:"fixed",top:0,left:0,right:0,zIndex:1000,
        padding:"14px 48px", display:"flex",alignItems:"center",justifyContent:"space-between",
        background:"rgba(10,8,18,0.85)", backdropFilter:"blur(30px)",
        borderBottom:"1px solid rgba(124,92,252,0.08)" }}>
        <BrainLogo/>
        <div style={{display:"flex",alignItems:"center",gap:32}}>
          {["Features","Research","Pricing","API"].map(item=>(
            <span key={item} style={{ fontFamily:"'Space Mono',monospace",fontSize:11,color:"#3d3a55",cursor:"pointer",letterSpacing:"0.1em",transition:"color 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.color="#7c5cfc"}
              onMouseLeave={e=>e.currentTarget.style.color="#3d3a55"}>{item}</span>
          ))}
        </div>
        <div style={{display:"flex",gap:12}}>
          <button onClick={()=>{
            navigate('/login')
          }} style={{ padding:"9px 20px",background:"transparent",border:"1px solid rgba(124,92,252,0.28)",borderRadius:10,cursor:"pointer",fontFamily:"'Space Mono',monospace",fontSize:11,color:"#7c5cfc",letterSpacing:"0.08em",transition:"all 0.2s" }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(124,92,252,0.65)"; e.currentTarget.style.background="rgba(124,92,252,0.07)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(124,92,252,0.28)"; e.currentTarget.style.background="transparent"; }}>SIGN IN</button>
          <button onClick={onNavigateToRegister} style={{ padding:"9px 20px",background:"linear-gradient(135deg,#5b3fd4,#7c5cfc)",border:"none",borderRadius:10,cursor:"pointer",fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:700,color:"#fff",letterSpacing:"0.08em",boxShadow:"0 4px 18px rgba(124,92,252,0.4)",transition:"all 0.2s" }}
            onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(124,92,252,0.6)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 18px rgba(124,92,252,0.4)"; }}>START FREE</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div style={{ position:"relative",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"130px 24px 90px",overflow:"hidden" }}>
        <NeuralBg/>

        {/* Ambient orbs */}
        <div className="hp-orb-1" style={{ position:"absolute",top:"8%",left:"3%",width:700,height:700,borderRadius:"50%",background:"radial-gradient(circle,rgba(124,92,252,0.1),transparent 70%)",filter:"blur(60px)",pointerEvents:"none" }}/>
        <div className="hp-orb-2" style={{ position:"absolute",bottom:"5%",right:"2%",width:550,height:550,borderRadius:"50%",background:"radial-gradient(circle,rgba(92,52,219,0.08),transparent 70%)",filter:"blur(70px)",pointerEvents:"none" }}/>
        <div className="hp-orb-3" style={{ position:"absolute",top:"45%",right:"18%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(146,115,255,0.06),transparent 70%)",filter:"blur(50px)",pointerEvents:"none" }}/>

        {/* Grid */}
        <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.04,pointerEvents:"none" }}>
          <defs><pattern id="hp-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#7c5cfc" strokeWidth="0.5"/>
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#hp-grid)"/>
        </svg>

        {/* Floating cards */}
        <FloatingCard text="Cas9 creates a double-strand break 3bp upstream of the PAM sequence..." src="Nature, 2020" x="2%" y="24%" delay={2.2}/>
        <FloatingCard text="Quantum superposition allows qubits to exist in multiple states simultaneously..." src="Physical Review, 2023" x="76%" y="18%" delay={2.5}/>
        <FloatingCard text="Net energy gain achieved at NIF for the first time — a historic milestone..." src="Science, 2022" x="80%" y="68%" delay={2.8}/>

        {/* Badge */}
        <div ref={badgeRef} style={{ position:"relative",zIndex:4,display:"flex",alignItems:"center",gap:8,
          padding:"6px 18px", background:"rgba(124,92,252,0.08)", border:"1px solid rgba(124,92,252,0.25)",
          borderRadius:30, marginBottom:36 }}>
          <div style={{ width:6,height:6,borderRadius:"50%",background:"#7c5cfc",animation:"pulse-ring 2s ease-in-out infinite" }}/>
          <span style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"#9273ff",letterSpacing:"0.15em" }}>LIVE · 2.4B+ SOURCES INDEXED</span>
        </div>

        {/* H1 */}
        <div ref={h1Ref} style={{ position:"relative",zIndex:4,textAlign:"center",marginBottom:26,overflow:"hidden" }}>
          <div style={{ fontFamily:"'Bungee',sans-serif",fontSize:"clamp(52px,10vw,120px)",fontWeight:800,lineHeight:1.0,color:"#f0eeff",letterSpacing:"-0.02em" }}>
            The search engine
          </div>
          <div style={{ fontFamily:"'Bungee',sans-serif",fontSize:"clamp(52px,8vw,96px)",fontWeight:800,lineHeight:1.0,
            background:"linear-gradient(90deg,#7c5cfc,#9273ff,#c4b5fd,#7c5cfc)",backgroundSize:"200% auto",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"shimmer 4s linear infinite" }}>
            that <span style={{
              fontFamily:"Syne"
            }}>thinks</span> with you.
          </div>
        </div>

        {/* Sub */}
        <p ref={subRef} style={{ position:"relative",zIndex:4,fontFamily:"'Space Mono',monospace",
          fontSize:"clamp(12px,1.4vw,15px)",color:"#4b5569",lineHeight:2,textAlign:"center",
          maxWidth:580,marginBottom:48 }}>
          brainEX fuses live web intelligence with AI synthesis — delivering{" "}
          <span style={{color:"#9273ff"}}>cited, deep answers</span> instead of a list of links.{" "}
          <TypewriterText phrases={["Understand everything.","Cite with confidence.","Research at lightspeed.","Think deeper."]}/>
        </p>

        {/* Search box */}
        <div ref={searchRef} style={{ position:"relative",zIndex:4,width:"100%",maxWidth:700,marginBottom:32 }}>
          <div style={{ display:"flex",alignItems:"center",
            background:"rgba(12,9,24,0.9)", border:`1.5px solid ${focused?"rgba(124,92,252,0.6)":"rgba(124,92,252,0.2)"}`,
            borderRadius:20, padding:"6px 6px 6px 24px", backdropFilter:"blur(30px)",
            boxShadow:focused?"0 0 0 6px rgba(124,92,252,0.08),0 20px 60px rgba(0,0,0,0.5)":"0 20px 60px rgba(0,0,0,0.4)",
            transition:"all 0.3s" }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={focused?"#7c5cfc":"#374151"} strokeWidth="2" style={{flexShrink:0,marginRight:12,transition:"stroke 0.2s"}}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input ref={searchQ} value={query} onChange={e=>setQuery(e.target.value)}
              onFocus={()=>setFocused(true)} onBlur={()=>setTimeout(()=>setFocused(false),150)}
              onKeyDown={e=>e.key==="Enter"&&query&&handleSearch(query)}
              placeholder="Ask anything, explore everything..."
              style={{ flex:1,background:"transparent",border:"none",outline:"none",
                color:"#ede8ff",fontFamily:"'Space Mono',monospace",fontSize:14,padding:"12px 0" }}/>
            <button onClick={()=>query&&handleSearch(query)} style={{ padding:"12px 24px",
              background:"linear-gradient(135deg,#5b3fd4,#7c5cfc)",border:"none",borderRadius:14,cursor:"pointer",
              fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:"#fff",letterSpacing:"0.08em",
              boxShadow:"0 4px 18px rgba(124,92,252,0.5)",transition:"transform 0.15s,box-shadow 0.15s",flexShrink:0 }}
              onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.04)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(124,92,252,0.7)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 4px 18px rgba(124,92,252,0.5)"; }}>
              SEARCH →
            </button>
          </div>
          {/* Suggestions */}
          {focused&&(
            <div style={{ position:"absolute",top:"calc(100% + 8px)",left:0,right:0,
              background:"rgba(10,8,18,0.96)",backdropFilter:"blur(30px)",
              border:"1px solid rgba(124,92,252,0.15)",borderRadius:16,padding:"8px",zIndex:100,
              boxShadow:"0 20px 60px rgba(0,0,0,0.5)" }}>
              {SUGGESTIONS.map((s,i)=>(
                <div key={i} onMouseDown={()=>{setQuery(s);handleSearch(s);}}
                  style={{ padding:"11px 16px",borderRadius:10,cursor:"pointer",
                    fontFamily:"'Space Mono',monospace",fontSize:12,color:"#4b5569",
                    display:"flex",alignItems:"center",gap:12,transition:"background 0.15s,color 0.15s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.background="rgba(124,92,252,0.08)"; e.currentTarget.style.color="#ede8ff"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#4b5569"; }}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{opacity:0.5,flexShrink:0}}>
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>{s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tags */}
        <div ref={tagsRef} style={{ position:"relative",zIndex:4,display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",maxWidth:600 }}>
          <span style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"#2a2440",letterSpacing:"0.1em",display:"flex",alignItems:"center" }}>TRY:</span>
          {TAGS.map(tag=>(
            <div key={tag} onClick={()=>handleSearch(tag)} style={{ padding:"6px 14px",
              background:"rgba(124,92,252,0.05)", border:"1px solid rgba(124,92,252,0.18)", borderRadius:20,
              fontFamily:"'Space Mono',monospace",fontSize:10,color:"#9273ff",cursor:"pointer",
              letterSpacing:"0.06em",transition:"all 0.2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.background="rgba(124,92,252,0.14)"; e.currentTarget.style.borderColor="rgba(124,92,252,0.45)"; e.currentTarget.style.color="#ede8ff"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="rgba(124,92,252,0.05)"; e.currentTarget.style.borderColor="rgba(124,92,252,0.18)"; e.currentTarget.style.color="#9273ff"; }}>{tag}</div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{ position:"absolute",bottom:32,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:6,opacity:0.4 }}>
          <span style={{ fontFamily:"'Space Mono',monospace",fontSize:9,color:"#7c5cfc",letterSpacing:"0.15em" }}>SCROLL TO EXPLORE</span>
          <div style={{ width:1,height:40,background:"linear-gradient(180deg,#7c5cfc,transparent)" }}/>
        </div>
      </div>

      {/* ── MARQUEE ── */}
      <div style={{ padding:"40px 0", borderTop:"1px solid rgba(124,92,252,0.06)", borderBottom:"1px solid rgba(124,92,252,0.06)" }}>
        <Marquee items={MARQUEE_ITEMS}/>
      </div>

      {/* ── DEMO SECTION ── */}
      <div style={{ padding:"110px 24px", position:"relative" }}>
        <div style={{ textAlign:"center",marginBottom:64 }}>
          <div className="section-title" style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"#7c5cfc",letterSpacing:"0.2em",marginBottom:14 }}>// SEE IT IN ACTION</div>
          <ParallaxSection>
            <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:"clamp(32px,4vw,56px)",fontWeight:800,color:"#ede8ff",lineHeight:1.1 }}>
              Not just answers —<br/><span style={{color:"#7c5cfc"}}>understanding.</span>
            </h2>
          </ParallaxSection>
        </div>
        <DemoAnswer/>
      </div>

      {/* ── STATS ── */}
      <div style={{ padding:"60px 24px 110px", borderTop:"1px solid rgba(124,92,252,0.06)", borderBottom:"1px solid rgba(124,92,252,0.06)" }}>
        <div style={{ maxWidth:900,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:40 }}>
          {[["2.4B+","Sources indexed"],["<200ms","Response time"],["99.97%","Uptime SLA"],["2.4M+","Researchers trust us"]].map(([v,l],i)=>(
            <Stat key={l} value={v} label={l} index={i}/>
          ))}
        </div>
      </div>

      {/* ── BENTO GRID ── */}
      <div style={{ padding:"110px 24px" }}>
        <div style={{ textAlign:"center",marginBottom:64 }}>
          <div className="section-title" style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"#7c5cfc",letterSpacing:"0.2em",marginBottom:14 }}>// CAPABILITIES</div>
          <h2 className="section-title" style={{ fontFamily:"'Syne',sans-serif",fontSize:"clamp(32px,4vw,56px)",fontWeight:800,color:"#ede8ff",lineHeight:1.1 }}>
            Built for serious<br/><span style={{color:"#7c5cfc"}}>thinkers.</span>
          </h2>
        </div>
        <BentoGrid/>
      </div>

      {/* ── FEATURES GRID ── */}
      <div style={{ padding:"0 24px 110px" }}>
        <div style={{ maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20 }}>
          {[
            {icon:"⚡",title:"Real-time Web Synthesis",desc:"Indexes the live web continuously. Ask about breaking news, recent papers, or today's market data — brainEX always has the latest.",accent:"#7c5cfc"},
            {icon:"◈",title:"Cited Intelligence",desc:"Every claim is traceable. brainEX surfaces primary sources inline, so you can verify, dive deeper, or cite with confidence.",accent:"#9273ff"},
            {icon:"∞",title:"Infinite Knowledge Graph",desc:"Connect disparate concepts across domains. brainEX builds a personalized map of your intellectual explorations.",accent:"#c4b5fd"},
            {icon:"🧬",title:"Deep Research Mode",desc:"Multi-step reasoning that reads dozens of papers, cross-references data, and synthesizes a comprehensive report in seconds.",accent:"#7c5cfc"},
            {icon:"🔒",title:"Privacy First Architecture",desc:"Zero-knowledge query processing. Your searches are never logged, profiled, or sold. Intelligence without surveillance.",accent:"#9273ff"},
            {icon:"⌘",title:"Multi-modal Understanding",desc:"Upload PDFs, images, or paste code. brainEX understands context across formats and returns unified, coherent answers.",accent:"#c4b5fd"},
          ].map((f,i)=><FeatureCard key={f.title} {...f} index={i}/>)}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div style={{ padding:"110px 24px", position:"relative", overflow:"hidden", background:"rgba(12,9,24,0.5)" }}>
        <div style={{ position:"absolute",left:"50%",top:0,bottom:0,width:1,background:"linear-gradient(180deg,transparent,rgba(124,92,252,0.25),transparent)",transform:"translateX(-50%)" }}/>
        <div style={{ maxWidth:800,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:80 }}>
            <div className="section-title" style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"#7c5cfc",letterSpacing:"0.2em",marginBottom:14 }}>// HOW IT WORKS</div>
            <h2 className="section-title" style={{ fontFamily:"'Syne',sans-serif",fontSize:"clamp(32px,4vw,56px)",fontWeight:800,color:"#ede8ff",lineHeight:1.1 }}>
              Three steps to<br/><span style={{color:"#7c5cfc"}}>deep intelligence.</span>
            </h2>
          </div>
          {[
            {num:"01",title:"You ask anything",desc:"Natural language, complex multi-part questions, follow-ups, hypotheticals — brainEX handles the full spectrum of human curiosity.",icon:"💬",align:"left"},
            {num:"02",title:"We synthesize the web",desc:"Our neural indexer scans thousands of sources in real-time — academic papers, news, databases, official docs — and cross-references them.",icon:"🌐",align:"right"},
            {num:"03",title:"You get cited intelligence",desc:"A structured, deep answer with inline citations, confidence indicators, and links to dig deeper. No hallucinations. No blue links.",icon:"✦",align:"left"},
          ].map((s,i)=><Step key={s.num} {...s} index={i}/>)}
        </div>
      </div>

      {/* ── PRICING ── */}
      <div style={{ padding:"110px 24px" }}>
        <div style={{ maxWidth:1000,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:64 }}>
            <div className="section-title" style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"#7c5cfc",letterSpacing:"0.2em",marginBottom:14 }}>// PRICING</div>
            <h2 className="section-title" style={{ fontFamily:"'Syne',sans-serif",fontSize:"clamp(32px,4vw,56px)",fontWeight:800,color:"#ede8ff",lineHeight:1.1 }}>
              Start free.<br/><span style={{color:"#7c5cfc"}}>Scale with your curiosity.</span>
            </h2>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24,alignItems:"center" }}>
            <PricingCard index={0} plan="EXPLORER" price="Free" features={["100 queries/month","Standard response depth","5 deep research reports","Community support"]}/>
            <PricingCard index={1} plan="RESEARCHER" price="$19" features={["Unlimited queries","Maximum response depth","Unlimited deep research","PDF & image upload","API access (1000 calls/mo)","Priority support"]} highlighted/>
            <PricingCard index={2} plan="ENTERPRISE" price="Custom" features={["Everything in Researcher","Unlimited API access","Custom knowledge bases","SSO & team management","SLA guarantee","Dedicated support"]}/>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ padding:"110px 24px 130px",textAlign:"center",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:900,height:450,borderRadius:"50%",background:"radial-gradient(ellipse,rgba(124,92,252,0.09),transparent 70%)",filter:"blur(40px)",pointerEvents:"none" }}/>
        <CTASection onNavigateToRegister={onNavigateToRegister}/>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ padding:"40px 48px",borderTop:"1px solid rgba(124,92,252,0.07)",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <BrainLogo size={0.85}/>
        <div style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"#1f2937",letterSpacing:"0.08em" }}>© 2025 brainEX · INTELLIGENCE LAYER</div>
        <div style={{display:"flex",gap:24}}>
          {["Privacy","Terms","API","Blog"].map(l=>(
            <span key={l} style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"#2a2440",cursor:"pointer",letterSpacing:"0.08em",transition:"color 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.color="#7c5cfc"}
              onMouseLeave={e=>e.currentTarget.style.color="#2a2440"}>{l}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}