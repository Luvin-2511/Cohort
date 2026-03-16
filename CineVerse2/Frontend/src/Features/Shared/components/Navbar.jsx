import { useRef, useState } from "react";
import { gsap } from "gsap";
import "../styles/Navbar.scss";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isBigNavVisible, setIsBigVisible] = useState(false);
  const bigNavRef = useRef(null);
  const linksRef = useRef([]);
  const navigate = useNavigate();

  const menuItems = [
    { label: "Browse", to: "/browse" },
    { label: "Favorites", to: "/favorites" },
    { label: "History", to: "/history" },
    { label: "Watchlist", to: "/watchlist" },
  ];

  const openNav = () => {
    setIsBigVisible(true);
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
      <div className="small-nav">
        <div className="nav-container-small nav-cont">
          <h4>Name</h4>
        </div>
        <div className="nav-container-medium nav-cont">
          <h4>Browse</h4>
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
        <a className="big-nav__logo">CINEVERSE</a>
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
                  navigate(item.to);
                }}
              >
                <span className="big-nav__link-num">0{i + 1}</span>
                <h1>{item.label}</h1>
                <span className="big-nav__link-arrow">→</span>
              </button>
            </div>
          ))}
        </nav>

        <div className="big-nav__footer">
          <span>© {new Date().getFullYear()} CINEVERSE</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
