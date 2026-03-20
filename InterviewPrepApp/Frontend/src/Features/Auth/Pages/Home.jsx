import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MagneticButton from '../components/Magneticbutton.jsx'

const MeshCanvas = () => {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H, animId, t = 0
    const COLS = 14, ROWS = 8, pts = []
    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      pts.length = 0
      for (let r = 0; r <= ROWS; r++) for (let c = 0; c <= COLS; c++)
        pts.push({ bx:(c/COLS)*W, by:(r/ROWS)*H, ox:(Math.random()-.5)*55, oy:(Math.random()-.5)*35, ph:Math.random()*Math.PI*2, sp:.25+Math.random()*.4 })
    }
    const draw = () => {
      t += .004; ctx.clearRect(0,0,W,H)
      const W1 = COLS+1
      for (let r=0;r<ROWS;r++) for (let c=0;c<COLS;c++) {
        const get = (rr,cc) => { const p=pts[rr*W1+cc]; return { x:p.bx+Math.sin(t*p.sp+p.ph)*p.ox, y:p.by+Math.cos(t*p.sp+p.ph)*p.oy } }
        const p=get(r,c), p1=get(r,c+1), p2=get(r+1,c)
        const al = .025+.015*Math.sin(t+pts[r*W1+c].ph)
        ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(p1.x,p1.y)
        ctx.strokeStyle=`rgba(255,60,172,${al})`; ctx.lineWidth=.5; ctx.stroke()
        ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(p2.x,p2.y)
        ctx.strokeStyle=`rgba(43,134,197,${al*.7})`; ctx.stroke()
      }
      pts.forEach(p => {
        const x=p.bx+Math.sin(t*p.sp+p.ph)*p.ox, y=p.by+Math.cos(t*p.sp+p.ph)*p.oy
        ctx.beginPath(); ctx.arc(x,y,.8,0,Math.PI*2); ctx.fillStyle='rgba(255,60,172,.12)'; ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    resize(); draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{ position:'fixed',inset:0,zIndex:0,pointerEvents:'none' }} />
}

const Cursor = ({ big }) => {
  const ring = useRef(null), dot = useRef(null)
  const op = useRef({x:-200,y:-200}), tp = useRef({x:-200,y:-200})
  useEffect(() => {
    const mv = e => { tp.current = {x:e.clientX,y:e.clientY} }
    window.addEventListener('mousemove', mv)
    let id
    const loop = () => {
      op.current.x += (tp.current.x - op.current.x) * .09
      op.current.y += (tp.current.y - op.current.y) * .09
      if (ring.current) ring.current.style.transform = `translate(${op.current.x}px,${op.current.y}px) translate(-50%,-50%) scale(${big?2.4:1})`
      if (dot.current) dot.current.style.transform = `translate(${tp.current.x}px,${tp.current.y}px) translate(-50%,-50%)`
      id = requestAnimationFrame(loop)
    }
    loop()
    return () => { window.removeEventListener('mousemove',mv); cancelAnimationFrame(id) }
  }, [big])
  return <>
    <div ref={ring} style={{ position:'fixed',zIndex:9999,pointerEvents:'none',top:0,left:0,width:44,height:44,borderRadius:'50%',border:'1px solid rgba(255,60,172,.6)',mixBlendMode:'difference',transition:'transform .15s cubic-bezier(.4,0,.2,1)',willChange:'transform' }} />
    <div ref={dot} style={{ position:'fixed',zIndex:9999,pointerEvents:'none',top:0,left:0,width:6,height:6,borderRadius:'50%',background:'#ff3cac',boxShadow:'0 0 10px #ff3cac',willChange:'transform' }} />
  </>
}

/* ─── Scroll progress bar ────────────────────────────────────────────────── */
const ProgressBar = ({ pct }) => (
  <div style={{ position:'fixed',top:0,left:0,right:0,height:2,zIndex:300,background:'rgba(255,255,255,.04)' }}>
    <div style={{ height:'100%',width:`${pct*100}%`,background:'linear-gradient(90deg,#ff3cac,#784ba0,#2b86c5)',transition:'width .05s linear',boxShadow:'0 0 12px rgba(255,60,172,.6)' }} />
  </div>
)

const MARQUEE = ['Resume Analysis','Gap Detection','Mock Interviews','Fit Score','DSA Practice','System Design','Behavioral Prep','ATS Optimizer','Role Matching','Skill Tracking']
const FEATURES = [
  { n:'01', tag:'Resume AI', title:['Know exactly','where you','fall short'], desc:'Drop your resume and a job description. Prepiq tears it apart — skill gaps, keyword mismatches, experience deltas — and tells you exactly what to fix.', col:'#ff3cac' },
  { n:'02', tag:'Mock Interviews', title:['Practice built','around your','exact role'], desc:'Role-specific questions from real interview patterns. DSA, system design, behavioral — all tuned to the exact company and level you\'re targeting.', col:'#784ba0' },
  { n:'03', tag:'Fit Score', title:['Your match','score before','you apply'], desc:'A single number that tells you how ready you are. Watch it climb as you prep. Stop guessing — start knowing.', col:'#2b86c5' },
]

export default function Home() {
  const navigate = useNavigate()
  const [scrollY, setScrollY] = useState(0)
  const [scrollPct, setScrollPct] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [bigCursor, setBigCursor] = useState(false)
  const [active, setActive] = useState(0)
  const [mouse, setMouse] = useState({ x:.5, y:.5 })

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120)
    const onScroll = () => {
      setScrollY(window.scrollY)
      const max = document.body.scrollHeight - window.innerHeight
      setScrollPct(max > 0 ? window.scrollY / max : 0)
    }
    const onMouse = e => setMouse({ x: e.clientX/window.innerWidth, y: e.clientY/window.innerHeight })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse)
    return () => { clearTimeout(t); window.removeEventListener('scroll',onScroll); window.removeEventListener('mousemove',onMouse) }
  }, [])

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a+1) % 3), 4200)
    return () => clearInterval(id)
  }, [])

  const nav = scrollY > 50

  return (
    <div className="h-root" style={{ cursor:'none' }}>
      <Cursor big={bigCursor} />
      <MeshCanvas />
      <ProgressBar pct={scrollPct} />

      {/* ── Parallax ambient */}
      <div className="h-amb h-amb--a" style={{ transform:`translate(${mouse.x*50-25}px,${mouse.y*40-20}px)` }} />
      <div className="h-amb h-amb--b" style={{ transform:`translate(${-mouse.x*40+20}px,${-mouse.y*30+15}px)` }} />
      <div className="h-amb h-amb--c" />
      <div className="h-grain" />

      {/* ══ NAV ══════════════════════════════════════════════════════════════ */}
      <nav className={`h-nav ${nav ? 'h-nav--on' : ''}`}>
        <div className="h-nav__in">
          <a href="#" className="h-nav__logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="h-nav__logo-ring">
              <circle cx="14" cy="14" r="13" stroke="url(#ng)" strokeWidth="1.5"/>
              <circle cx="14" cy="14" r="5" fill="url(#ng)"/>
              <defs><linearGradient id="ng" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse"><stop stopColor="#ff3cac"/><stop offset=".5" stopColor="#784ba0"/><stop offset="1" stopColor="#2b86c5"/></linearGradient></defs>
            </svg>
            <span>PREPIQ</span>
          </a>
          <div className="h-nav__links">
            {[['Features','#features'],['Process','#process'],['Results','#results']].map(([l,h],i) => (
              <a key={i} href={h} className="h-nav__link">{l}</a>
            ))}
          </div>
          <div className="h-nav__right">
            <Link to="/login" className="h-nav__in-link">Sign in</Link>
            <button className="h-nav__cta" onClick={() => navigate('/register')} onMouseEnter={() => setBigCursor(true)} onMouseLeave={() => setBigCursor(false)}>
              Get started <span>↗</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ══ HERO ═════════════════════════════════════════════════════════════ */}
      <section className="h-hero">
        {/* Index tag */}
        <div className={`h-idx ${mounted?'h-idx--in':''}`}>
          <span className="h-idx__n">001</span>
          <span className="h-idx__sep">/</span>
          <span>Interview Intelligence</span>
        </div>

        {/* Giant headline — full bleed */}
        <div className="h-title-block">
          {['LAND','THE JOB','YOU WANT'].map((word, i) => (
            <div key={i} className="h-title-row" style={{ '--ri': i }}>
              <div className={`h-title-clip ${mounted?'h-title-clip--in':''}`} style={{ '--d': `${i * .14}s` }}>
                <span className={`h-title-word ${i===1?'h-title-word--outline':''} ${i===2?'h-title-word--grad':''}`}>
                  {word}
                </span>
              </div>
              {/* Decorative index */}
              <span className="h-title-row__idx">{`0${i+1}`}</span>
            </div>
          ))}
        </div>

        {/* Bottom descriptor strip */}
        <div className={`h-hero-strip ${mounted?'h-hero-strip--in':''}`} style={{ '--d':'.5s' }}>
          <div className="h-hero-strip__desc">
            <div className="h-hero-strip__line" />
            <p>Prepiq analyzes your resume against any job, scores your readiness, and drills you with role-specific interview questions — so you walk in prepared.</p>
          </div>
          <div className="h-hero-strip__actions">
            <button className="h-cta-pill" onClick={() => navigate('/register')} onMouseEnter={() => setBigCursor(true)} onMouseLeave={() => setBigCursor(false)}>
              <span className="h-cta-pill__label">Start prepping free</span>
              <span className="h-cta-pill__ico">↗</span>
              <div className="h-cta-pill__fill" />
            </button>
            <Link to="/login" className="h-cta-text">Already a member →</Link>
          </div>
          <div className="h-scroll-hint">
            <div className="h-scroll-hint__tube"><div className="h-scroll-hint__nub" /></div>
            <span>Scroll</span>
          </div>
        </div>

        {/* Floating fit-score badge */}
        <div className={`h-badge ${mounted?'h-badge--in':''}`} style={{ transform:`translate(${mouse.x*-18}px,${mouse.y*-12}px)` }}>
          <div className="h-badge__ring-wrap">
            <svg viewBox="0 0 120 120" className="h-badge__svg">
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,60,172,.1)" strokeWidth="4"/>
              <circle cx="60" cy="60" r="50" fill="none" stroke="url(#bg)" strokeWidth="4"
                strokeLinecap="round" strokeDasharray="314" strokeDashoffset="100"
                transform="rotate(-90 60 60)" className="h-badge__arc" />
              <defs><linearGradient id="bg" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#ff3cac"/><stop offset="1" stopColor="#2b86c5"/></linearGradient></defs>
            </svg>
            <div className="h-badge__inner">
              <div className="h-badge__val">68</div>
              <div className="h-badge__sub">/100</div>
            </div>
          </div>
          <div className="h-badge__tag">FIT SCORE</div>
          <div className="h-badge__desc">SWE @ Google L5</div>
        </div>

        {/* Year stamp */}
        <div className="h-year">© 2025</div>
      </section>

      {/* ══ MARQUEE ══════════════════════════════════════════════════════════ */}
      <div className="h-marquee">
        <div className="h-marquee__track">
          {[...MARQUEE,...MARQUEE].map((x,i) => (
            <span key={i} className="h-marquee__item"><span className="h-marquee__sep">✦</span>{x}</span>
          ))}
        </div>
      </div>

      {/* ══ STATS ════════════════════════════════════════════════════════════ */}
      <section className="h-stats" id="results">
        <div className="h-section-eyebrow"><span className="h-eyebrow-n">002</span>/ BY THE NUMBERS</div>
        <div className="h-stats__grid">
          {[
            { v:'94%', l:'Interview success rate', c:'#ff3cac' },
            { v:'12k+', l:'Resumes analyzed', c:'#784ba0' },
            { v:'340+', l:'Companies covered', c:'#2b86c5' },
            { v:'2min', l:'Avg. gap analysis', c:'#00f2fe' },
          ].map((s,i) => (
            <div key={i} className="h-stat" style={{ '--c':s.c,'--i':i }} onMouseEnter={() => setBigCursor(true)} onMouseLeave={() => setBigCursor(false)}>
              <span className="h-stat__idx">0{i+1}</span>
              <div className="h-stat__val">{s.v}</div>
              <div className="h-stat__label">{s.l}</div>
              <div className="h-stat__wipe" />
              <div className="h-stat__corner h-stat__corner--tl" />
              <div className="h-stat__corner h-stat__corner--br" />
            </div>
          ))}
        </div>
      </section>

      {/* ══ FEATURES ═════════════════════════════════════════════════════════ */}
      <section className="h-features" id="features">
        <div className="h-section-eyebrow"><span className="h-eyebrow-n">003</span>/ WHAT IT DOES</div>
        <h2 className="h-section-title">Every edge<br /><em>in one place.</em></h2>

        <div className="h-features__body">
          <div className="h-ftabs">
            {FEATURES.map((f,i) => (
              <button key={i} className={`h-ftab ${active===i?'h-ftab--on':''}`} style={{ '--fc':f.col }}
                onClick={() => setActive(i)} onMouseEnter={() => setBigCursor(true)} onMouseLeave={() => setBigCursor(false)}>
                <span className="h-ftab__n">{f.n}</span>
                <div className="h-ftab__body">
                  <span className="h-ftab__tag">{f.tag}</span>
                  <span className="h-ftab__title">{f.title[0]}</span>
                </div>
                <span className="h-ftab__arrow">→</span>
                <div className="h-ftab__bar" />
              </button>
            ))}
            <div className="h-ftab__ticks">
              {FEATURES.map((_,i) => <div key={i} className={`h-ftab__tick ${active===i?'h-ftab__tick--on':''}`} onClick={() => setActive(i)} />)}
            </div>
          </div>

          <div className="h-fpanels">
            {FEATURES.map((f,i) => (
              <div key={i} className={`h-fpanel ${active===i?'h-fpanel--on':''}`} style={{ '--fc':f.col }}>
                <div className="h-fpanel__ghost-num">{f.n}</div>
                <div className="h-fpanel__tag">{f.tag}</div>
                <h3 className="h-fpanel__title">
                  {f.title.map((l,j) => <span key={j} className="h-fpanel__title-line">{l}</span>)}
                </h3>
                <p className="h-fpanel__desc">{f.desc}</p>
                <Link to="/register" className="h-fpanel__cta" onMouseEnter={() => setBigCursor(true)} onMouseLeave={() => setBigCursor(false)}>
                  Try it free <span>↗</span>
                </Link>
                {/* Decorative orbits */}
                <div className="h-fpanel__deco">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="100" cy="100" r="80" stroke="var(--fc)" strokeWidth=".5" strokeDasharray="4 10" opacity=".3" />
                    <circle cx="100" cy="100" r="50" stroke="var(--fc)" strokeWidth=".3" strokeDasharray="2 8" opacity=".2" />
                    <circle cx="100" cy="100" r="10" fill="var(--fc)" opacity=".25" />
                    <circle cx="100" cy="20" r="4" fill="var(--fc)" opacity=".5" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ═════════════════════════════════════════════════════ */}
      <section className="h-how" id="process">
        <div className="h-section-eyebrow"><span className="h-eyebrow-n">004</span>/ PROCESS</div>
        <div className="h-steps">
          {[
            { n:'01', t:'Upload your resume', d:'Drop your PDF. Our AI reads every line — experience, skills, projects, impact statements.' },
            { n:'02', t:'Paste the job description', d:'Any role, any company. We extract exactly what they want and compare it against what you have.' },
            { n:'03', t:'Get your game plan', d:'Fit score, skill gaps, recommended questions, and a step-by-step prep roadmap. Start drilling.' },
          ].map((s,i) => (
            <div key={i} className="h-step" style={{ '--i':i }} onMouseEnter={() => setBigCursor(true)} onMouseLeave={() => setBigCursor(false)}>
              <div className="h-step__num">{s.n}</div>
              <div className="h-step__content">
                <h3 className="h-step__t">{s.t}</h3>
                <p className="h-step__d">{s.d}</p>
              </div>
              <div className="h-step__spacer" />
            </div>
          ))}
        </div>
      </section>

      {/* ══ TERMINAL ═════════════════════════════════════════════════════════ */}
      <section className="h-term">
        <div className="h-section-eyebrow"><span className="h-eyebrow-n">005</span>/ LIVE DEMO</div>
        <div className="h-term__shell">
          <div className="h-term__header">
            <div className="h-term__dots">
              {['#ff5f57','#febc2e','#28c840'].map((c,i) => <span key={i} className="h-term__dot" style={{background:c}} />)}
            </div>
            <span className="h-term__title">prepiq — terminal</span>
            <div className="h-term__live"><span className="h-term__live-dot"/>LIVE</div>
          </div>
          <div className="h-term__body">
            <div className="h-tr h-tr--cmd"><span className="ht-p">❯</span><span className="ht-c"> prepiq analyze</span><span className="ht-a"> --resume john.pdf --job "Staff SWE @ Stripe"</span></div>
            <div className="h-tg"/>
            <div className="h-tr"><span className="ht-p">◈</span><span className="ht-dim"> Analyzing resume</span><span className="h-tda"/></div>
            <div className="h-tg"/>

            {/* Score */}
            <div className="h-tscore">
              <div className="h-tscore__label">Fit Score</div>
              <div className="h-tscore__row">
                <div className="h-tscore__bar"><div className="h-tscore__fill"/></div>
                <span className="h-tscore__num">68<small>/100</small></span>
              </div>
            </div>
            <div className="h-tg"/>

            <div className="h-tsec">▸ Critical gaps</div>
            {[{s:'Distributed systems design',l:'critical'},{s:'Go / gRPC experience',l:'required'},{s:'Kubernetes orchestration',l:'required'},{s:'Event-driven architecture',l:'preferred'}].map((x,i) => (
              <div key={i} className="h-tgap" style={{'--gi':i}}>
                <span className="ht-dash"> ─</span>
                <span className="ht-skill"> {x.s}</span>
                <span className={`ht-tag ht-tag--${x.l}`}>{x.l}</span>
              </div>
            ))}
            <div className="h-tg"/>

            <div className="h-tsec">▸ Prep roadmap</div>
            {['Design distributed rate limiter (2h)','LC Hard: consistent hashing (45min)','System design: payment processing (3h)','Behavioral: ownership @ scale (1h)'].map((x,i) => (
              <div key={i} className="h-trec" style={{'--ri':i}}>
                <span className="ht-ck"> ✓</span>
                <span className="ht-rec"> {x}</span>
              </div>
            ))}
            <div className="h-tg"/>
            <div className="h-tr"><span className="ht-p">❯</span><span className="h-tcursor"/></div>
          </div>
          {['tl','tr','bl','br'].map(c => <div key={c} className={`h-term__corner h-term__corner--${c}`}/>)}
        </div>
      </section>

      {/* ══ BANNER CTA ═══════════════════════════════════════════════════════ */}
      <section className="h-banner">
        <div className="h-banner__bg" />
        <div className="h-banner__noise" />
        <div className="h-banner__content">
          <div className="h-section-eyebrow h-section-eyebrow--center"><span className="h-eyebrow-n">006</span>/ START TODAY — IT'S FREE</div>
          <h2 className="h-banner__title">
            <span>Stop applying</span>
            <em>blind.</em>
            <span>Start prepping</span>
            <em>smart.</em>
          </h2>
          <p className="h-banner__sub">Join 12,000+ engineers who used Prepiq to land their dream role.</p>
          <div className="h-banner__actions">
            <button className="h-cta-pill h-cta-pill--lg" onClick={() => navigate('/register')} onMouseEnter={() => setBigCursor(true)} onMouseLeave={() => setBigCursor(false)}>
              <span className="h-cta-pill__label">Create free account</span>
              <span className="h-cta-pill__ico">↗</span>
              <div className="h-cta-pill__fill" />
            </button>
            <Link to="/login" className="h-cta-text h-cta-text--light">Sign in →</Link>
          </div>
        </div>
        <div className="h-banner__bigtext" aria-hidden>PREPIQ</div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════════ */}
      <footer className="h-footer">
        <div className="h-footer__in">
          <div className="h-footer__brand">
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="13" stroke="url(#ff)" strokeWidth="1.5"/><circle cx="14" cy="14" r="5" fill="url(#ff)"/><defs><linearGradient id="ff" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse"><stop stopColor="#ff3cac"/><stop offset="1" stopColor="#2b86c5"/></linearGradient></defs></svg>
            <span>PREPIQ</span>
          </div>
          <p className="h-footer__copy">© 2025 Prepiq. Built to get you hired.</p>
          <div className="h-footer__links">
            <Link to="/login" className="h-footer__link">Login</Link>
            <Link to="/register" className="h-footer__link">Register</Link>
          </div>
        </div>
      </footer>

      {/* ══ ALL STYLES ═══════════════════════════════════════════════════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --bg:#05050d; --fg:#ededf5; --muted:#4a4862; --dim:#16141f;
          --b:rgba(255,255,255,.05); --p:#ff3cac; --q:#784ba0; --r:#2b86c5;
          --grad:linear-gradient(135deg,#ff3cac 0%,#784ba0 50%,#2b86c5 100%);
        }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

        .h-root { background:var(--bg);font-family:'Plus Jakarta Sans',sans-serif;color:var(--fg);overflow-x:hidden;min-height:100vh; }

        /* Grain + ambient */
        .h-grain { position:fixed;inset:0;z-index:1;pointer-events:none;opacity:.035;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:200px; }

        .h-amb { position:fixed;border-radius:50%;filter:blur(120px);pointer-events:none;transition:transform .8s cubic-bezier(.4,0,.2,1); }
        .h-amb--a { width:900px;height:600px;top:-200px;left:-200px;background:rgba(255,60,172,.07);z-index:0; }
        .h-amb--b { width:700px;height:700px;bottom:-200px;right:-100px;background:rgba(43,134,197,.07);z-index:0; }
        .h-amb--c { width:500px;height:500px;top:40%;left:40%;background:rgba(120,75,160,.05);z-index:0;animation:gp 8s ease-in-out infinite; }
        @keyframes gp { 0%,100%{opacity:.5}50%{opacity:1} }

        /* ── NAV */
        .h-nav { position:fixed;top:0;left:0;right:0;z-index:100;padding:28px 0;transition:all .4s cubic-bezier(.4,0,.2,1); }
        .h-nav--on { padding:14px 0;background:rgba(5,5,13,.9);backdrop-filter:blur(24px) saturate(180%);border-bottom:1px solid var(--b); }
        .h-nav__in { max-width:1380px;margin:0 auto;padding:0 60px;display:flex;align-items:center;justify-content:space-between; }

        .h-nav__logo { display:flex;align-items:center;gap:10px;text-decoration:none;font-family:'Anton',sans-serif;font-size:16px;letter-spacing:.2em;color:var(--fg); }
        @keyframes lr { to{transform:rotate(360deg)} }
        .h-nav__logo-ring { animation:lr 12s linear infinite; }

        .h-nav__links { display:flex;gap:48px; }
        .h-nav__link { font-size:11px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s;position:relative; }
        .h-nav__link::after { content:'';position:absolute;bottom:-3px;left:0;right:100%;height:1px;background:var(--p);transition:right .3s cubic-bezier(.4,0,.2,1); }
        .h-nav__link:hover { color:var(--fg); }
        .h-nav__link:hover::after { right:0; }

        .h-nav__right { display:flex;align-items:center;gap:20px; }
        .h-nav__in-link { font-size:11px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s; }
        .h-nav__in-link:hover { color:var(--fg); }

        .h-nav__cta { position:relative;display:flex;align-items:center;gap:6px;padding:11px 24px;border:1px solid rgba(255,60,172,.4);background:transparent;color:var(--fg);cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;transition:all .3s;overflow:hidden; }
        .h-nav__cta::before { content:'';position:absolute;inset:0;background:var(--grad);opacity:0;transition:opacity .3s; }
        .h-nav__cta:hover { border-color:transparent;box-shadow:0 0 30px rgba(255,60,172,.4); }
        .h-nav__cta:hover::before { opacity:1; }
        .h-nav__cta>* { position:relative;z-index:1; }

        /* ── HERO */
        .h-hero {
          position:relative;z-index:2;
          min-height:100vh;
          max-width:1380px;margin:0 auto;padding:0 60px;
          display:flex;flex-direction:column;justify-content:center;
          overflow:hidden;
        }

        .h-idx { display:flex;align-items:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin-bottom:40px;padding-top:140px;opacity:0;transform:translateY(16px);transition:all .6s ease .8s; }
        .h-idx--in { opacity:1;transform:none; }
        .h-idx__n { color:var(--p); }
        .h-idx__sep { opacity:.3; }

        /* Main title */
        .h-title-block { display:flex;flex-direction:column;gap:0; }
        .h-title-row { display:flex;align-items:baseline;justify-content:space-between;overflow:hidden;line-height:.88; }
        .h-title-row__idx { font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.18em;color:rgba(255,255,255,.1);align-self:flex-start;padding-top:8px; }

        .h-title-clip { overflow:hidden; }
        .h-title-word {
          display:block;font-family:'Anton',sans-serif;
          font-size:clamp(88px,13vw,175px);
          line-height:.88;letter-spacing:-.01em;color:var(--fg);
          transform:translateY(110%) skewY(5deg);opacity:0;
          transition:transform .9s cubic-bezier(.22,1,.36,1) var(--d), opacity .9s ease var(--d);
        }
        .h-title-clip--in .h-title-word { transform:translateY(0) skewY(0);opacity:1; }
        .h-title-word--outline { -webkit-text-stroke:2px rgba(255,255,255,.15);color:transparent; }
        .h-title-word--grad { background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-style:italic; }

        /* Bottom strip */
        .h-hero-strip {
          display:grid;grid-template-columns:1fr auto auto;align-items:end;gap:60px;
          padding:60px 0 60px;
          opacity:0;transform:translateY(24px);
          transition:opacity .7s ease var(--d),transform .7s cubic-bezier(.22,1,.36,1) var(--d);
        }
        .h-hero-strip--in { opacity:1;transform:none; }
        .h-hero-strip__desc { display:flex;flex-direction:column;gap:16px;max-width:400px; }
        .h-hero-strip__line { width:32px;height:1.5px;background:var(--p); }
        .h-hero-strip__desc p { font-size:14px;font-weight:300;color:var(--muted);line-height:1.8; }
        .h-hero-strip__actions { display:flex;flex-direction:column;gap:12px;align-items:flex-start; }

        /* CTA pill */
        .h-cta-pill { position:relative;display:inline-flex;align-items:center;gap:10px;padding:18px 40px;border:none;cursor:pointer;overflow:hidden;font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:white;transition:transform .2s,box-shadow .3s;box-shadow:0 8px 40px rgba(255,60,172,.3); }
        .h-cta-pill--lg { padding:20px 52px;font-size:13px; }
        .h-cta-pill__fill { position:absolute;inset:0;background:var(--grad);z-index:0; }
        .h-cta-pill__label,.h-cta-pill__ico { position:relative;z-index:1; }
        .h-cta-pill__ico { font-size:15px;transition:transform .2s; }
        .h-cta-pill:hover { transform:translateY(-3px);box-shadow:0 20px 60px rgba(255,60,172,.5); }
        .h-cta-pill:hover .h-cta-pill__ico { transform:translate(3px,-3px); }
        .h-cta-pill::after { content:'';position:absolute;inset:0;z-index:2;background:repeating-linear-gradient(0deg,transparent 0,transparent 2px,rgba(0,0,0,.06) 2px,rgba(0,0,0,.06) 4px);pointer-events:none; }

        .h-cta-text { font-size:11px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s; }
        .h-cta-text:hover { color:var(--fg); }
        .h-cta-text--light { color:rgba(255,255,255,.4); }
        .h-cta-text--light:hover { color:white; }

        /* Scroll hint */
        .h-scroll-hint { display:flex;align-items:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted); }
        .h-scroll-hint__tube { width:22px;height:34px;border:1px solid rgba(255,255,255,.1);border-radius:11px;position:relative;overflow:hidden; }
        @keyframes snub { 0%{transform:translateY(0);opacity:1}100%{transform:translateY(26px);opacity:0} }
        .h-scroll-hint__nub { position:absolute;top:4px;left:50%;transform:translateX(-50%);width:4px;height:6px;border-radius:3px;background:var(--p);animation:snub 1.6s cubic-bezier(.4,0,.2,1) infinite; }

        /* Fit-score badge */
        @keyframes badge-in { from{opacity:0;transform:translate(-50%,-55%)}to{opacity:1;transform:translate(-50%,-50%)} }
        .h-badge {
          position:absolute;right:60px;top:50%;
          width:190px;
          background:rgba(6,5,16,.97);
          border:1px solid rgba(255,60,172,.18);
          padding:24px;
          opacity:0;
          transition:transform .8s cubic-bezier(.4,0,.2,1), opacity 1s ease .8s;
          box-shadow:0 40px 80px rgba(0,0,0,.7),0 0 0 1px rgba(255,60,172,.05);
        }
        .h-badge--in { opacity:1; }
        .h-badge__ring-wrap { position:relative;margin-bottom:12px; }
        .h-badge__svg { width:100%;display:block; }
        @keyframes arc-in { from{stroke-dashoffset:314}to{stroke-dashoffset:100} }
        .h-badge__arc { animation:arc-in 2s cubic-bezier(.4,0,.2,1) 1.2s both; }
        .h-badge__inner { position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center; }
        .h-badge__val { font-family:'Anton',sans-serif;font-size:44px;line-height:1;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .h-badge__sub { font-size:14px;color:var(--muted); }
        .h-badge__tag { font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.2em;color:var(--p);text-transform:uppercase; }
        .h-badge__desc { font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.1em;color:var(--muted);margin-top:4px; }

        .h-year { position:absolute;right:60px;bottom:48px;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.18em;color:var(--muted);text-transform:uppercase; }

        /* ── MARQUEE */
        .h-marquee { position:relative;z-index:2;overflow:hidden;padding:18px 0;border-top:1px solid var(--b);border-bottom:1px solid var(--b);background:rgba(255,255,255,.01); }
        @keyframes mq { from{transform:translateX(0)}to{transform:translateX(-50%)} }
        .h-marquee__track { display:flex;width:max-content;animation:mq 36s linear infinite; }
        .h-marquee__item { display:flex;align-items:center;gap:14px;padding:0 28px;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(200,200,220,.18);white-space:nowrap; }
        .h-marquee__sep { color:var(--p);font-size:7px;opacity:.5; }

        /* ── SHARED SECTION LABELS */
        .h-section-eyebrow { font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin-bottom:80px;display:flex;gap:10px;align-items:center; }
        .h-section-eyebrow--center { justify-content:center; }
        .h-eyebrow-n { color:var(--p); }
        .h-section-title { font-family:'Anton',sans-serif;font-size:clamp(56px,7vw,96px);line-height:.9;letter-spacing:-.01em;color:var(--fg);margin-bottom:80px; }
        .h-section-title em { font-style:italic;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }

        /* ── STATS */
        .h-stats { position:relative;z-index:2;max-width:1380px;margin:0 auto;padding:140px 60px; }
        .h-stats__grid { display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--b); }
        @keyframes stat-in { from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none} }
        .h-stat { padding:56px 44px;border-right:1px solid var(--b);position:relative;overflow:hidden;cursor:default;transition:background .3s;animation:stat-in .6s ease calc(var(--i)*.1s) both; }
        .h-stat:last-child { border-right:none; }
        .h-stat:hover { background:rgba(255,255,255,.012); }
        .h-stat__idx { font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.18em;color:var(--c);display:block;margin-bottom:20px; }
        .h-stat__val { font-family:'Anton',sans-serif;font-size:76px;line-height:.9;letter-spacing:-.01em;color:var(--fg);margin-bottom:14px;transition:color .3s; }
        .h-stat:hover .h-stat__val { color:var(--c); }
        .h-stat__label { font-size:11px;font-weight:300;color:var(--muted);letter-spacing:.06em;text-transform:uppercase; }
        .h-stat__wipe { position:absolute;bottom:0;left:0;right:100%;height:2px;background:var(--c);transition:right .5s cubic-bezier(.4,0,.2,1); }
        .h-stat:hover .h-stat__wipe { right:0; }
        .h-stat__corner { position:absolute;width:10px;height:10px;opacity:0;transition:opacity .3s; }
        .h-stat:hover .h-stat__corner { opacity:1; }
        .h-stat__corner--tl { top:10px;left:10px;border-top:1px solid var(--c);border-left:1px solid var(--c); }
        .h-stat__corner--br { bottom:10px;right:10px;border-bottom:1px solid var(--c);border-right:1px solid var(--c); }

        /* ── FEATURES */
        .h-features { position:relative;z-index:2;max-width:1380px;margin:0 auto;padding:0 60px 140px; }
        .h-features__body { display:grid;grid-template-columns:380px 1fr;gap:80px;align-items:start; }
        .h-ftabs { display:flex;flex-direction:column; }
        .h-ftab { display:grid;grid-template-columns:56px 1fr 28px;align-items:center;padding:28px 0;border:none;background:transparent;border-bottom:1px solid var(--b);cursor:pointer;text-align:left;position:relative;overflow:hidden;transition:background .2s; }
        .h-ftab:hover { background:rgba(255,255,255,.01); }
        .h-ftab--on { background:rgba(255,60,172,.025);border-bottom-color:rgba(255,60,172,.2); }
        .h-ftab__n { font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.12em;color:var(--muted);transition:color .2s; }
        .h-ftab--on .h-ftab__n { color:var(--fc); }
        .h-ftab__body { display:flex;flex-direction:column;gap:4px; }
        .h-ftab__tag { font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);transition:color .2s; }
        .h-ftab--on .h-ftab__tag { color:var(--fc); }
        .h-ftab__title { font-size:14px;font-weight:500;color:rgba(200,200,230,.45);transition:color .2s; }
        .h-ftab--on .h-ftab__title { color:var(--fg); }
        .h-ftab__arrow { font-size:15px;color:var(--muted);opacity:0;transition:opacity .2s,color .2s,transform .2s; }
        .h-ftab--on .h-ftab__arrow { opacity:1;color:var(--fc);transform:translate(2px,-2px); }
        @keyframes ftbar { from{width:0}to{width:100%} }
        .h-ftab__bar { position:absolute;bottom:0;left:0;height:1.5px;width:0%;background:var(--fc); }
        .h-ftab--on .h-ftab__bar { animation:ftbar 4.2s linear; }
        .h-ftab__ticks { display:flex;gap:8px;margin-top:24px; }
        .h-ftab__tick { flex:1;height:2px;background:var(--b);cursor:pointer;transition:background .2s; }
        .h-ftab__tick--on { background:var(--p); }

        .h-fpanels { position:sticky;top:120px;min-height:500px; }
        .h-fpanel { display:none;flex-direction:column;padding:60px;border:1px solid var(--b);background:rgba(6,5,16,.98);position:relative;overflow:hidden; }
        .h-fpanel--on { display:flex;animation:fp-in .4s cubic-bezier(.22,1,.36,1); }
        @keyframes fp-in { from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none} }
        .h-fpanel__ghost-num { font-family:'Anton',sans-serif;font-size:140px;color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.04);line-height:1;margin-bottom:-16px;user-select:none; }
        .h-fpanel__tag { font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--fc);margin-bottom:20px; }
        .h-fpanel__title { font-family:'Anton',sans-serif;font-size:46px;letter-spacing:-.005em;line-height:1;color:var(--fg);margin-bottom:24px;display:flex;flex-direction:column; }
        .h-fpanel__title-line { display:block; }
        .h-fpanel__desc { font-size:15px;font-weight:300;color:var(--muted);line-height:1.75;margin-bottom:40px;max-width:420px; }
        .h-fpanel__cta { display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--fc);text-decoration:none;transition:gap .2s; }
        .h-fpanel__cta:hover { gap:18px; }
        .h-fpanel__deco { position:absolute;right:-40px;bottom:-40px;width:200px;height:200px;opacity:.2;animation:deco-rot 20s linear infinite; }
        @keyframes deco-rot { to{transform:rotate(360deg)} }

        /* ── HOW */
        .h-how { position:relative;z-index:2;max-width:1380px;margin:0 auto;padding:0 60px 140px; }
        .h-steps { display:flex;flex-direction:column; }
        @keyframes step-in { from{opacity:0;transform:translateX(-32px)}to{opacity:1;transform:none} }
        .h-step { display:grid;grid-template-columns:120px 1fr 80px;align-items:start;padding:56px 0;border-top:1px solid var(--b);animation:step-in .5s ease calc(var(--i)*.15s) both; }
        .h-step:last-child { border-bottom:1px solid var(--b); }
        .h-step__num { font-family:'Anton',sans-serif;font-size:64px;line-height:1;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;padding-top:4px; }
        .h-step__content { padding:0 48px; }
        .h-step__t { font-family:'Anton',sans-serif;font-size:30px;letter-spacing:.02em;color:var(--fg);margin-bottom:14px;line-height:1; }
        .h-step__d { font-size:14px;font-weight:300;color:var(--muted);line-height:1.8;max-width:540px; }

        /* ── TERMINAL */
        .h-term { position:relative;z-index:2;max-width:1380px;margin:0 auto;padding:0 60px 140px; }
        .h-term__shell { position:relative;background:rgba(3,2,10,.99);border:1px solid rgba(255,60,172,.1);box-shadow:0 0 0 1px rgba(255,60,172,.04),0 60px 120px rgba(0,0,0,.7);overflow:hidden;max-width:860px; }
        .h-term__header { display:flex;align-items:center;gap:10px;padding:15px 22px;background:rgba(255,255,255,.02);border-bottom:1px solid rgba(255,255,255,.04); }
        .h-term__dots { display:flex;gap:7px;margin-right:8px; }
        .h-term__dot { width:10px;height:10px;border-radius:50%; }
        .h-term__title { font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(200,200,220,.28);letter-spacing:.1em;flex:1;text-align:center; }
        .h-term__live { display:flex;align-items:center;gap:6px;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.16em;color:#28c840; }
        @keyframes ld-blink { 0%,100%{opacity:1}50%{opacity:.3} }
        .h-term__live-dot { width:6px;height:6px;border-radius:50%;background:#28c840;animation:ld-blink 1.8s ease-in-out infinite; }
        .h-term__body { padding:26px 30px 34px;font-family:'JetBrains Mono',monospace;font-size:12px;line-height:1.9; }
        .h-tr { display:flex;align-items:center;gap:4px;flex-wrap:wrap; }
        .h-tr--cmd {}
        .h-tg { height:12px; }
        @keyframes typing { 0%{content:'.'}33%{content:'..'}66%{content:'...'}100%{content:'.'} }
        .h-tda::after { content:'.';animation:typing 1.2s steps(1) infinite; }
        .ht-p { color:#ff3cac; }
        .ht-c { color:#818cf8; }
        .ht-a { color:rgba(200,200,230,.38);font-size:11px; }
        .ht-dim { color:rgba(200,200,230,.38); }
        .ht-dash { color:rgba(200,200,230,.22); }
        .ht-skill { color:#f87171;flex:1; }
        .ht-ck { color:#34d399; }
        .ht-rec { color:rgba(200,200,230,.55); }
        .h-tsec { color:rgba(200,200,230,.45);font-size:11px;letter-spacing:.08em;margin-bottom:2px; }
        .h-tscore { margin:6px 0; }
        .h-tscore__label { font-size:10px;color:rgba(200,200,230,.35);letter-spacing:.1em;margin-bottom:10px; }
        .h-tscore__row { display:flex;align-items:center;gap:20px; }
        .h-tscore__bar { flex:1;height:5px;background:rgba(255,255,255,.05);border-radius:3px;overflow:hidden;position:relative; }
        @keyframes sfill { from{width:0}to{width:68%} }
        .h-tscore__fill { height:100%;background:linear-gradient(90deg,#ff3cac,#784ba0,#2b86c5);border-radius:3px;animation:sfill 2s cubic-bezier(.4,0,.2,1) 1s both; }
        .h-tscore__num { font-size:22px;color:#fbbf24;font-family:'Anton',sans-serif;letter-spacing:.04em; }
        .h-tscore__num small { font-size:12px;color:rgba(200,200,230,.3); }
        @keyframes gi { from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:none} }
        .h-tgap { display:flex;align-items:center;gap:8px;animation:gi .4s ease calc(1.8s + var(--gi)*.1s) both; }
        .ht-tag { font-size:9px;padding:1px 7px;margin-left:auto;border-radius:2px; }
        .ht-tag--critical { background:rgba(248,113,113,.1);color:#f87171;border:1px solid rgba(248,113,113,.2); }
        .ht-tag--required { background:rgba(251,191,36,.08);color:#fbbf24;border:1px solid rgba(251,191,36,.2); }
        .ht-tag--preferred { background:rgba(129,140,248,.08);color:#818cf8;border:1px solid rgba(129,140,248,.2); }
        @keyframes ri { from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:none} }
        .h-trec { display:flex;align-items:center;gap:8px;animation:ri .4s ease calc(2.6s + var(--ri)*.1s) both; }
        @keyframes cb { 0%,49%{opacity:1}50%,100%{opacity:0} }
        .h-tcursor { display:inline-block;width:8px;height:13px;background:var(--p);border-radius:1px;margin-left:4px;animation:cb .9s step-end infinite;box-shadow:0 0 8px var(--p); }
        .h-term__corner { position:absolute;width:12px;height:12px; }
        .h-term__corner--tl { top:0;left:0;border-top:1px solid rgba(255,60,172,.35);border-left:1px solid rgba(255,60,172,.35); }
        .h-term__corner--tr { top:0;right:0;border-top:1px solid rgba(255,60,172,.35);border-right:1px solid rgba(255,60,172,.35); }
        .h-term__corner--bl { bottom:0;left:0;border-bottom:1px solid rgba(255,60,172,.35);border-left:1px solid rgba(255,60,172,.35); }
        .h-term__corner--br { bottom:0;right:0;border-bottom:1px solid rgba(255,60,172,.35);border-right:1px solid rgba(255,60,172,.35); }

        /* ── BANNER */
        .h-banner { position:relative;z-index:2;overflow:hidden;border-top:1px solid var(--b);border-bottom:1px solid var(--b);margin:0 60px 100px; }
        .h-banner__bg { position:absolute;inset:0;background:radial-gradient(ellipse 80% 100% at 50% 0%,rgba(120,75,160,.22) 0%,rgba(5,5,13,.98) 70%); }
        .h-banner__noise { position:absolute;inset:0;opacity:.04;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:200px; }
        .h-banner__content { position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;padding:120px 60px;text-align:center; }
        .h-banner__title { font-family:'Anton',sans-serif;font-size:clamp(72px,10vw,150px);line-height:.88;letter-spacing:-.01em;color:var(--fg);margin-bottom:32px;display:flex;flex-direction:column;align-items:center; }
        .h-banner__title em { font-style:italic;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .h-banner__sub { font-size:15px;font-weight:300;color:var(--muted);margin-bottom:56px;max-width:380px;line-height:1.75; }
        .h-banner__actions { display:flex;align-items:center;gap:32px;flex-wrap:wrap;justify-content:center; }
        .h-banner__bigtext { position:absolute;bottom:-50px;left:50%;transform:translateX(-50%);font-family:'Anton',sans-serif;font-size:260px;letter-spacing:.1em;color:transparent;-webkit-text-stroke:1px rgba(255,60,172,.04);white-space:nowrap;user-select:none;pointer-events:none;z-index:1; }

        /* ── FOOTER */
        .h-footer { position:relative;z-index:2;padding:32px 60px;border-top:1px solid var(--b); }
        .h-footer__in { max-width:1380px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:24px; }
        .h-footer__brand { display:flex;align-items:center;gap:10px;font-family:'Anton',sans-serif;font-size:14px;letter-spacing:.2em;color:var(--fg); }
        .h-footer__copy { font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--muted);letter-spacing:.1em; }
        .h-footer__links { display:flex;gap:24px; }
        .h-footer__link { font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s; }
        .h-footer__link:hover { color:var(--p); }

        /* ── RESPONSIVE */
        @media (max-width:1100px) {
          .h-badge { display:none; }
          .h-hero-strip { grid-template-columns:1fr 1fr;grid-template-rows:auto auto; }
          .h-scroll-hint { grid-column:1/-1; }
          .h-stats__grid { grid-template-columns:repeat(2,1fr); }
          .h-features__body { grid-template-columns:1fr; }
          .h-fpanels { position:static; }
        }
        @media (max-width:768px) {
          .h-nav__links { display:none; }
          .h-hero,.h-stats,.h-features,.h-how,.h-term { padding-left:28px;padding-right:28px; }
          .h-banner { margin:0 28px 80px; }
          .h-footer { padding:28px; }
          .h-footer__in { flex-direction:column;text-align:center; }
          .h-stats__grid { grid-template-columns:1fr; }
          .h-step { grid-template-columns:80px 1fr 0; }
          .h-step__content { padding:0 24px; }
          .h-hero-strip { grid-template-columns:1fr; }
          .h-title-word { font-size:clamp(72px,18vw,140px); }
        }
      `}</style>
    </div>
  )
}