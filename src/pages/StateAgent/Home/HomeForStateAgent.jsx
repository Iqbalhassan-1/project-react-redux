import React from "react";
import NavigationBar from "../../../layouts/Navbar/NavigationBar";
import { Outlet } from "react-router-dom";
import SidebarForStateAgent from "../../../layouts/SidebarForStateAgent/SidebarForStateAgent";
import "./HomeForStateAgent.css";

const HomeForStateAgent = () => {
  return (
    <>
      <div className="fixed-top-header">
        <NavigationBar />
      </div>
      <div className="fixed-sidebar shadow-sm ">
        <SidebarForStateAgent />
      </div>
      <div className="content ">
        <Outlet />
      </div>
    </>
  );
};

export default HomeForStateAgent;
