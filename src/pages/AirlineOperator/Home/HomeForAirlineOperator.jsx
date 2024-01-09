import React from "react";
import Sidebar from "../../../layouts/SidebarForAirlineOperator/Sidebar";
import { Outlet } from "react-router-dom";
import NavigationBar from "../../../layouts/Navbar/NavigationBar";
import "./HomeForAirlineOperator.css";

const HomeForAirlineOperator = () => {
  return (
    <>
      <div className="fixed-top-header">
        <NavigationBar />
      </div>
      <div className="fixed-sidebar ">
        <Sidebar />
      </div>
      <div className="content ">
        <Outlet />
      </div>
    </>
  );
};

export default HomeForAirlineOperator;
