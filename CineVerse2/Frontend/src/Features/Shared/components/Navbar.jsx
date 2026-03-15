import React from "react";
import "../styles/Navbar.scss";
import "../styles/global.scss";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-container-small nav-cont">
        <h4>Name</h4>
      </div>
      <div className="nav-container-medium nav-cont">
        <h4>Browse</h4>
      </div>
      <div className="nav-container-large nav-cont">
        <h4>Menu</h4>
      </div>
    </nav>
  );
};

export default Navbar;
