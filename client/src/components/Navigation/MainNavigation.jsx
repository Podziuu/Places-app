import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import "./MainNavigation.css";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UI/Backdrop";

const MainNavigation = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const clickHandler = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  return (
    <>
      {openDrawer && <Backdrop onClick={clickHandler} />}
      <SideDrawer show={openDrawer} onClick={clickHandler}>
        <NavLinks />
      </SideDrawer>
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={clickHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
