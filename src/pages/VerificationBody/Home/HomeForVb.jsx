import React from "react";
import NavigationBar from "../../../layouts/Navbar/NavigationBar";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import SidebarForVb from "../../../layouts/SidebarForVerificationBody/SidebarForVb";
import style from "./homevb.module.css";

function HomeForVb() {
  return (
    <>
      <div className={style.topheader}>
        <NavigationBar />
      </div>
      <div className={style.fixedsidebar}>
        <SidebarForVb />
      </div>
      <div className={style.content}>
        <Outlet />
      </div>
    </>
  );
}

export default HomeForVb;
