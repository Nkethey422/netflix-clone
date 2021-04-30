import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);
  // monitors scrolling to turn Nav background a solid color.
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        // after you scroll 100px down we are changing our state (handleShow) to true, otherwise false.
        handleShow(true);
      } else handleShow(false);
    });
    // Before second, third....instances of useEffect, remove the previous event listener to prevent excess events.
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
        className="nav__logo"
      />
      <img
        src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
        alt="Avatar"
        className="nav__avatar"
      />
    </div>
  );
}

export default Nav;
