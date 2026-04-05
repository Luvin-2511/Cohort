// Navbar.jsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import "../styles/navbar.css";

/* ── HackerText Hook ─────────────────────────────────────── */
export const useHackerText = (originalText, isActive = false) => {
  const [displayText, setDisplayText] = useState(originalText);
  const intervalRef = useRef(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

  const scramble = () => {
    let iterations = 0;
    const maxIterations = 18;
    const original = originalText.toUpperCase();
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        if (iterations >= maxIterations) {
          clearInterval(intervalRef.current);
          return original;
        }
        const t = original
          .split("")
          .map((char, i) =>
            char === " "
              ? " "
              : i < iterations
              ? original[i]
              : chars[Math.floor(Math.random() * chars.length)]
          )
          .join("");
        iterations += 1 / 3;
        return t;
      });
    }, 28);
  };

  useEffect(() => {
    if (isActive) scramble();
    else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayText(originalText.toUpperCase());
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, originalText]);

  return displayText;
};

/* ── HackerText Component ────────────────────────────────── */
export const HackerText = ({
  text,
  className = "",
  as: Tag = "span",
  autoLoop = false,
  delay = 3000,
}) => {
  const [active, setActive] = useState(false);
  const timerRef = useRef(null);
  const display = useHackerText(text, active);

  useEffect(() => {
    if (!autoLoop) return;
    const start = () => {
      setActive(true);
      setTimeout(() => setActive(false), 900);
    };
    start();
    timerRef.current = setInterval(start, delay);
    return () => clearInterval(timerRef.current);
  }, [autoLoop, delay]);

  return (
    <Tag
      className={`hacker-text ${className}`}
      onMouseEnter={() => !autoLoop && setActive(true)}
      onMouseLeave={() => !autoLoop && setActive(false)}
    >
      {display}
    </Tag>
  );
};

/* ── MagneticButton Component ────────────────────────────── */
export const MagneticButton = ({ children, className = "", onClick, ...props }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.38;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.38;
      gsap.to(el, { x, y, duration: 0.4, ease: "power2.out" });
    };
    const onLeave = () =>
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <motion.button
      ref={ref}
      className={`mag-btn ${className}`}
      onClick={onClick}
      whileTap={{ scale: 0.93 }}
      {...props}
    >
      <span className="mag-btn__inner">{children}</span>
    </motion.button>
  );
};

/* ── Navbar ──────────────────────────────────────────────── */
const Navbar = ({ activePage, setActivePage, onSave, userName = "THOUGHTNET" }) => {
  const [isBigNavVisible, setIsBigVisible] = useState(false);
  const [time, setTime] = useState("");
  const bigNavRef = useRef(null);
  const navRef = useRef(null);
  const linksRef = useRef([]);

  const NAV_ITEMS = [
    { label: "Dashboard",   path: "dashboard",   icon: "◎" },
    { label: "Deep Think",  path: "deepthink",   icon: "⌕" },
    { label: "Network",     path: "network",     icon: "◈" },
    { label: "Archives",    path: "archives",    icon: "▨" },
    { label: "Collaborate", path: "collaborate", icon: "↻" },
  ];

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      navRef.current.style.transform =
        window.scrollY > 80 ? "translateY(-100%)" : "translateY(0%)";
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openNav = () => {
    setIsBigVisible(true);
    document.body.style.overflow = "hidden";
    gsap.fromTo(
      bigNavRef.current,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.inOut" }
    );
    gsap.fromTo(
      linksRef.current.filter(Boolean),
      { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out", delay: 0.4 }
    );
    gsap.fromTo(
      ".nb-meta > *",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.07, duration: 0.5, ease: "power3.out", delay: 0.6 }
    );
    gsap.to(".hb-line:nth-child(1)", { y: 6, rotation: 45, duration: 0.4, ease: "power3.inOut" });
    gsap.to(".hb-line:nth-child(2)", { scaleX: 0, opacity: 0, duration: 0.2 });
    gsap.to(".hb-line:nth-child(3)", { y: -6, rotation: -45, duration: 0.4, ease: "power3.inOut" });
  };

  const closeNav = () => {
    gsap.to(".nb-link-item", { yPercent: -40, opacity: 0, stagger: 0.04, duration: 0.35, ease: "power3.in" });
    gsap.to(".nb-meta > *", { y: 20, opacity: 0, stagger: 0.03, duration: 0.3, ease: "power3.in" });
    gsap.to(bigNavRef.current, {
      yPercent: 100,
      opacity: 0,
      duration: 0.6,
      ease: "power3.inOut",
      delay: 0.15,
      onComplete: () => {
        setIsBigVisible(false);
        document.body.style.overflow = "";
      },
    });
    gsap.to(".hb-line:nth-child(1)", { y: 0, rotation: 0, duration: 0.4, ease: "power3.inOut" });
    gsap.to(".hb-line:nth-child(2)", { scaleX: 1, opacity: 1, duration: 0.3, delay: 0.1 });
    gsap.to(".hb-line:nth-child(3)", { y: 0, rotation: 0, duration: 0.4, ease: "power3.inOut" });
  };

  const handleNavClick = (path) => {
    setActivePage(path);
    if (isBigNavVisible) closeNav();
  };

  return (
    <nav className="cv-nav">
      {/* Small Nav - Aligned to corners */}
      <div ref={navRef} className="small-nav">
        {/* Time - Left aligned first */}
        <motion.div
          className="nav-cont nav-cont--clock"
          initial={{ x: -70, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <h4 className="nav-clock">{time}</h4>
        </motion.div>

        {/* Spacer to push items to the right */}
        <div className="nav-spacer" />

        {/* THOUGHTNET - Right side */}
        <motion.div
          className="nav-cont nav-cont--sm"
          initial={{ x: 70, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => handleNavClick("dashboard")}
        >
          <HackerText text={userName} as="h4" />
        </motion.div>

        {/* Archives */}
        <motion.div
          className="nav-cont nav-cont--md"
          initial={{ x: 70, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => handleNavClick("archives")}
        >
          <HackerText text="Archives" as="h4" />
        </motion.div>

        {/* Menu + Hamburger */}
        <motion.div
          className="nav-cont nav-cont--lg"
          initial={{ x: 70, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          onClick={isBigNavVisible ? closeNav : openNav}
        >
          <button className="hamburger" aria-label="menu">
            <span className="hb-line" />
            <span className="hb-line" />
            <span className="hb-line" />
          </button>
          <HackerText text="Menu" as="h4" />
        </motion.div>
      </div>

      {/* Big Nav Overlay - Full screen with bg */}
      <div
        ref={bigNavRef}
        className="big-nav"
        style={{ visibility: isBigNavVisible ? "visible" : "hidden" }}
      >
        {/* Animated background gradient */}
        <div className="big-nav__bg" />
        
        {/* Grid texture */}
        <div className="big-nav__grid" />

        <div className="big-nav__head">
          <span className="big-nav__logo">THOUGHTNET</span>
          <button className="big-nav__close" onClick={closeNav}>
            <span /><span />
          </button>
        </div>

        <div className="big-nav__body">
          <nav className="big-nav__links">
            {NAV_ITEMS.map((item, i) => (
              <div
                key={item.path}
                className="nb-link-item"
                ref={(el) => (linksRef.current[i] = el)}
              >
                <button
                  className={`big-nav__link ${activePage === item.path ? "big-nav__link--active" : ""}`}
                  onClick={() => handleNavClick(item.path)}
                >
                  <span className="big-nav__num">0{i + 1}</span>
                  <span className="big-nav__icon">{item.icon}</span>
                  <h1>{item.label}</h1>
                  <span className="big-nav__arrow">→</span>
                </button>
              </div>
            ))}
          </nav>

          <div className="nb-meta">
            {[
              { label: "Status", val: "● ACTIVE", accent: true },
              { label: "Items Saved", val: "1,247" },
              { label: "Graph Nodes", val: "3,892" },
              { label: "Uptime", val: "99.8%" },
            ].map((m) => (
              <div key={m.label} className="nb-meta__item">
                <div className="nb-meta__label">{m.label}</div>
                <div className={`nb-meta__val ${m.accent ? "nb-meta__val--active" : ""}`}>
                  {m.val}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="big-nav__footer">
          <span>© {new Date().getFullYear()} THOUGHTNET SYSTEM</span>
          <span>ALL NODES OPERATIONAL</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;