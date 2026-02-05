import { useState } from "react";

const Navbar = () => {
  const [selected, setselected] = useState("Home");
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <nav>
      <ul>
        {navItems.map((item, idx) => {
          return (
            <li
              onClick={() => {
                setselected(item.label);
              }}
              key={idx}
              className={`nav-elem ${selected === item.label ? "selected-nav-item" : ""} `}
            >
              {item.label}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
