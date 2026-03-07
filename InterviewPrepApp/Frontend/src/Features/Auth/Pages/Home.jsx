import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/home.scss'
import MagneticButton from '../components/Magneticbutton.jsx'

const CursorLight = ({ x, y }) => (
    <div className="cursor-light" style={{ left: x, top: y }} />
)

const STATS = [
    { value: '94%', label: 'Interview success rate' },
    { value: '12k+', label: 'Resumes analyzed' },
    { value: '340+', label: 'Companies covered' },
    { value: '2min', label: 'Avg. gap analysis time' },
]

const FEATURES = [
    {
        icon: (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
        ),
        tag: 'Resume AI',
        title: 'Know exactly where you fall short',
        desc: 'Drop your resume and a job description. Prepiq tears it apart — skill gaps, keyword mismatches, experience deltas — and tells you precisely what to fix.'
    },
    {
        icon: (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
            </svg>
        ),
        tag: 'Mock Interviews',
        title: 'Practice questions tailored to your role',
        desc: 'Role-specific questions from real interview patterns. DSA, system design, behavioral — all tuned to the exact company and level you\'re targeting.'
    },
    {
        icon: (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
        ),
        tag: 'Fit Score',
        title: 'Your match score before you apply',
        desc: 'A single number that tells you how ready you are. Track it improving as you prep. Stop guessing — start knowing.'
    },
]

const MARQUEE_ITEMS = [
    'Resume Analysis', 'Gap Detection', 'Mock Interviews', 'Fit Score',
    'DSA Practice', 'System Design', 'Behavioral Prep', 'ATS Optimizer',
    'Role Matching', 'Skill Tracking',
]

const Home = () => {
    const [cursor, setCursor] = useState({ x: -999, y: -999 })
    const [scrollY, setScrollY] = useState(0)
    const [mounted, setMounted] = useState(false)
    const [activeFeature, setActiveFeature] = useState(0)
    const containerRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => setMounted(true), 80)
        const handleScroll = () => setScrollY(window.scrollY)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleMouseMove = (e) => {
        setCursor({ x: e.clientX, y: e.clientY })
    }

    return (
        <div className="home" onMouseMove={handleMouseMove} ref={containerRef}>
            <CursorLight x={cursor.x} y={cursor.y} />

            {/* Background system */}
            <div className="home-bg">
                <div className="bg-grid" />
                <div className="bg-orb bg-orb--1" />
                <div className="bg-orb bg-orb--2" />
                <div className="bg-orb bg-orb--3" />
                <div className="bg-noise" />
            </div>

            {/* Navbar */}
            <nav className={`nav ${scrollY > 40 ? 'nav--scrolled' : ''}`}>
                <div className="nav-inner">
                    <div className="nav-brand">
                        <div className="brand-icon">
                            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                                      stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="brand-name">Prepiq</span>
                    </div>

                    <div className="nav-links">
                        <a href="#features" className="nav-link">Features</a>
                        <a href="#how" className="nav-link">How it works</a>
                        <a href="#stats" className="nav-link">Results</a>
                    </div>

                    <div className="nav-actions">
                        <Link to="/login" className="nav-btn nav-btn--ghost">Sign in</Link>
                        <MagneticButton onClick={() => navigate('/register')} className="nav-btn nav-btn--filled" strength={0.3} radius={80}>
                            Get started
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </MagneticButton>
                    </div>
                </div>
            </nav>

            {/* ── HERO ── */}
            <section className={`hero ${mounted ? 'hero--mounted' : ''}`}>

                {/* Floating badge */}
                <div className="hero-badge">
                    <span className="hero-badge__dot" />
                    AI-powered interview intelligence
                </div>

                {/* Headline */}
                <h1 className="hero-title">
                    <span className="hero-title__line hero-title__line--1">Land the job</span>
                    <span className="hero-title__line hero-title__line--2">
                        you <em className="hero-title__accent">actually</em> want
                    </span>
                </h1>

                <p className="hero-sub">
                    Prepiq analyzes your resume against any job, scores your readiness,
                    and drills you with role-specific interview questions — so you walk in prepared.
                </p>

                <div className="hero-cta">
                    <MagneticButton onClick={() => navigate('/register')} className="cta-primary">
                        Start prepping free
                    </MagneticButton>
                    <Link to="/login" className="cta-secondary">
                        Already have an account →
                    </Link>
                </div>

                {/* Hero visual — terminal card */}
                <div className="hero-terminal">
                    <div className="terminal-bar">
                        <span className="terminal-dot terminal-dot--red" />
                        <span className="terminal-dot terminal-dot--yellow" />
                        <span className="terminal-dot terminal-dot--green" />
                        <span className="terminal-title">prepiq — resume analysis</span>
                    </div>
                    <div className="terminal-body">
                        <div className="terminal-line">
                            <span className="t-prompt">$</span>
                            <span className="t-cmd"> prepiq analyze</span>
                            <span className="t-arg"> --resume john.pdf --job "SWE @ Google L5"</span>
                        </div>
                        <div className="terminal-line terminal-line--gap" />
                        <div className="terminal-line">
                            <span className="t-label">Fit Score</span>
                            <span className="t-score">68 / 100</span>
                        </div>
                        <div className="terminal-progress">
                            <div className="terminal-progress__fill" style={{ width: '68%' }} />
                        </div>
                        <div className="terminal-line terminal-line--gap" />
                        <div className="terminal-line">
                            <span className="t-section">▸ Missing skills</span>
                        </div>
                        {['Distributed systems', 'Go / gRPC', 'Kubernetes'].map((s, i) => (
                            <div key={i} className="terminal-line terminal-line--skill">
                                <span className="t-dash">  –</span>
                                <span className="t-skill"> {s}</span>
                                <span className="t-tag">required</span>
                            </div>
                        ))}
                        <div className="terminal-line terminal-line--gap" />
                        <div className="terminal-line">
                            <span className="t-section">▸ Recommended prep</span>
                        </div>
                        {['System design: distributed cache', 'LC Hard: graph traversal', 'Behavioral: leadership @ scale'].map((s, i) => (
                            <div key={i} className="terminal-line terminal-line--rec">
                                <span className="t-check">  ✓</span>
                                <span className="t-rec"> {s}</span>
                            </div>
                        ))}
                        <div className="terminal-line terminal-line--gap" />
                        <div className="terminal-line terminal-line--cursor">
                            <span className="t-prompt">$</span>
                            <span className="t-cursor" />
                        </div>
                    </div>
                </div>

            </section>

            {/* ── MARQUEE ── */}
            <div className="marquee-wrap">
                <div className="marquee-fade marquee-fade--left" />
                <div className="marquee-track">
                    {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                        <span key={i} className="marquee-item">
                            <span className="marquee-dot" />
                            {item}
                        </span>
                    ))}
                </div>
                <div className="marquee-fade marquee-fade--right" />
            </div>

            {/* ── STATS ── */}
            <section className="stats" id="stats">
                <div className="stats-grid">
                    {STATS.map((s, i) => (
                        <div key={i} className="stat-card" style={{ '--i': i }}>
                            <div className="stat-value">{s.value}</div>
                            <div className="stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className="features" id="features">
                <div className="section-label">What Prepiq does</div>
                <h2 className="section-title">
                    Every edge you need,<br />
                    <span className="section-title--accent">in one place</span>
                </h2>

                <div className="features-layout">
                    {/* Tab selector */}
                    <div className="features-tabs">
                        {FEATURES.map((f, i) => (
                            <button
                                key={i}
                                className={`feature-tab ${activeFeature === i ? 'feature-tab--active' : ''}`}
                                onClick={() => setActiveFeature(i)}
                            >
                                <span className="feature-tab__icon">{f.icon}</span>
                                <div className="feature-tab__text">
                                    <span className="feature-tab__tag">{f.tag}</span>
                                    <span className="feature-tab__title">{f.title}</span>
                                </div>
                                <div className="feature-tab__bar" />
                            </button>
                        ))}
                    </div>

                    {/* Feature detail */}
                    <div className="feature-detail">
                        {FEATURES.map((f, i) => (
                            <div key={i} className={`feature-panel ${activeFeature === i ? 'feature-panel--active' : ''}`}>
                                <div className="feature-panel__icon">{f.icon}</div>
                                <div className="feature-panel__tag">{f.tag}</div>
                                <h3 className="feature-panel__title">{f.title}</h3>
                                <p className="feature-panel__desc">{f.desc}</p>
                                <Link to="/register" className="feature-panel__cta">
                                    Try it free →
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ── */}
            <section className="how" id="how">
                <div className="section-label">Process</div>
                <h2 className="section-title">
                    Three steps to<br />
                    <span className="section-title--accent">interview ready</span>
                </h2>

                <div className="steps">
                    {[
                        {
                            num: '01',
                            title: 'Upload your resume',
                            desc: 'Drop your PDF. Our AI reads every line — experience, skills, projects, impact statements.'
                        },
                        {
                            num: '02',
                            title: 'Paste the job description',
                            desc: 'Any role, any company. We extract exactly what they want and compare it against what you have.'
                        },
                        {
                            num: '03',
                            title: 'Get your game plan',
                            desc: 'Fit score, skill gaps, recommended questions, and a step-by-step prep roadmap. Start drilling.'
                        },
                    ].map((step, i) => (
                        <div key={i} className="step" style={{ '--i': i }}>
                            <div className="step-num">{step.num}</div>
                            <div className="step-connector" />
                            <div className="step-content">
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-desc">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA BANNER ── */}
            <section className="banner">
                <div className="banner-glow" />
                <div className="banner-inner">
                    <div className="banner-tag">Start today — it's free</div>
                    <h2 className="banner-title">
                        Stop applying blind.<br />Start prepping smart.
                    </h2>
                    <p className="banner-sub">
                        Join thousands of engineers who used Prepiq to land their dream role.
                    </p>
                    <div className="banner-actions">
                        <MagneticButton onClick={() => navigate('/register')} className="cta-primary cta-primary--lg">
                            Create free account
                        </MagneticButton>
                        <Link to="/login" className="cta-secondary cta-secondary--light">
                            Sign in →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="footer">
                <div className="footer-inner">
                    <div className="footer-brand">
                        <div className="brand-icon brand-icon--sm">
                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                                      stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="brand-name brand-name--sm">Prepiq</span>
                    </div>
                    <p className="footer-copy">© 2025 Prepiq. Built to get you hired.</p>
                    <div className="footer-links">
                        <Link to="/login" className="footer-link">Login</Link>
                        <Link to="/register" className="footer-link">Register</Link>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Home