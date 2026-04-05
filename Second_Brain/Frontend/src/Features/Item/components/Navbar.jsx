import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Auth/hooks/useAuth";
import NotificationPanel from "./NotificationPanel";

const Navbar = () => {
  const [isBigNavVisible, setIsBigVisible] = useState(false);
  const bigNavRef = useRef(null);
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const navigate = useNavigate();
  const { handleLogout, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success } = await handleLogout();
    console.log(success);
    if (success) {
      navigate("/");
    }
  };

  const themes = [
    { hex: "#00e5ff", rgb: "0, 229, 255" },   /* Cyan */
    { hex: "#c7f300", rgb: "199, 243, 0" },   /* Acid Yellow */
    { hex: "#ff2a4d", rgb: "255, 42, 77" },   /* Crimson Red */
    { hex: "#b5179e", rgb: "181, 23, 158" },  /* Neon Purple */
  ];

  const handleThemeChange = (theme) => {
    document.documentElement.style.setProperty("--acid", theme.hex);
    document.documentElement.style.setProperty("--acid-rgb", theme.rgb);
    localStorage.setItem("memex-theme", JSON.stringify(theme));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("memex-theme");
    if (savedTheme) {
      try {
        const theme = JSON.parse(savedTheme);
        handleThemeChange(theme);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      if (window.scrollY > 100) {
        navRef.current.style.transform = "translateY(-100%)";
      } else {
        navRef.current.style.transform = "translateY(0%)";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuItems = [
    { label: "Dashboard", to: "/dashboard", icon: "⊞" },
    { label: "Library", to: "/library", icon: "≡" },
    { label: "Semantic Search", to: "/search", icon: "◎" },
    { label: "Collections", to: "/collections", icon: "⊡" },
    { label: "Knowledge Graph", to: "/graph", icon: "⋈" },
    { label: "Insights", to: "/insights", icon: "▲" },
  ];

  const openNav = () => {
    setIsBigVisible(true);
    gsap.fromTo(
      bigNavRef.current,
      { yPercent: 100 },
      { yPercent: -10.3, duration: 0.65, ease: "power3.inOut" },
    );
    gsap.fromTo(
      linksRef.current.filter(Boolean),
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.07,
        ease: "power3.out",
        delay: 0.3,
      },
    );
  };

  const closeNav = () => {
    gsap.to(bigNavRef.current, {
      yPercent: -100,
      duration: 0.55,
      ease: "power3.inOut",
      onComplete: () => setIsBigVisible(false),
    });
  };

  return (
    <nav>
      {/* Small Nav */}
      <div ref={navRef} className="small-nav">
        {/* Theme Switcher */}
        <div className="theme-switcher">
          <span className="theme-label">THEME</span>
          <div className="theme-dots">
            {themes.map((t, i) => (
              <div
                key={i}
                className="theme-dot"
                style={{ background: t.hex, boxShadow: `0 0 8px rgba(${t.rgb}, 0.6)` }}
                onClick={() => handleThemeChange(t)}
                title={`Switch Theme`}
              />
            ))}
          </div>
        </div>

        <div className="nav-container-small nav-cont">
          <h4>{user?.username}</h4>
        </div>
        <div
          onClick={() => {
            navigate("/dashboard");
          }}
          className="nav-container-medium nav-cont"
        >
          <h4>Dashboard</h4>
        </div>
        <div onClick={openNav} className="nav-container-large nav-cont">
          <h4>Menu</h4>
        </div>
      </div>

      {/* Big Nav Overlay */}
      <div
        ref={bigNavRef}
        style={{
          top: isBigNavVisible ? "0" : "100%",
        }}
        className="big-nav"
      >
        <a className="big-nav__logo">MEMEX</a>
        <button className="big-nav__close" onClick={closeNav}>
          <span />
          <span />
        </button>

        <nav className="big-nav__links">
          {menuItems.map((item, i) => (
            <div
              key={item.to}
              className="big-nav__item"
              ref={(el) => (linksRef.current[i] = el)}
            >
              <button
                className="big-nav__link"
                onClick={() => {
                  closeNav();
                  navigate(item.to);
                }}
              >
                <span className="big-nav__link-num">0{i + 1}</span>
                <span className="big-nav__link-icon">{item.icon}</span>
                <span className="big-nav__link-label">{item.label}</span>
                <span className="big-nav__link-arrow">→</span>
              </button>
            </div>
          ))}
          <div onClick={handleSubmit} className="logout-button">
            <h4>↪ Sign Out</h4>
          </div>
        </nav>

        <div className="big-nav__footer">
          <span>© {new Date().getFullYear()} MEMEX</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>
      </div>
      
      {/* Floating Notification Panel */}
      <NotificationPanel />
    </nav>
  );
};

export default Navbar;