import React from "react";
import { useState, useEffect } from "react";
import "./Sidebar.css";
import { RiDashboardFill } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { IoDocumentText } from "react-icons/io5";
import { MdSignalCellularAlt } from "react-icons/md";
import { GrFormDown } from "react-icons/gr";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CreateButton from "../../components/CreateButton/CreateButton";
import DataIcon from "../../assets/images/DataIcon.svg";
const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    setActiveItem(path);
  }, [location]);
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  return (
    <div className="sidebar-main ">
      <div className=" px-0">
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start "
          id="menu"
        >
          <li className="nav-item w-100">
            <Link
              to="/ao"
              className={`nav-link text-truncate text-black ${
                activeItem === "/ao" ? "menuActive" : ""
              }`}
              onClick={() => setActiveItem("/ao")}
            >
              <i className="fs-5 ">
                {" "}
                <RxDashboard />
              </i>
              <span
                className="ms-2 d-none  d-sm-inline w-25"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                Dashboard
              </span>
            </Link>
          </li>
          <li className="nav-item my-1 disabled w-100">
            <Link
              to="/ao/EmissionMonitoringPlan"
              className={`nav-link text-truncate text-black ${
                activeItem === "/ao/EmissionMonitoringPlan" ? "menuActive" : ""
              }`}
              onClick={() => setActiveItem("/ao/EmissionMonitoringPlan")}
            >
              <i className="fs-5 ">
                {" "}
                <MdSignalCellularAlt />
              </i>
              <span
                className="ms-2 d-none d-sm-inline"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                Emissions Monitoroing Plan
              </span>{" "}
            </Link>
          </li>
          <li className="w-100">
            <Link
              to="/ao/emissionreports"
              className={`nav-link text-truncate text-black ${
                activeItem === "/ao/emissionreports" ? "menuActive" : ""
              }`}
              onClick={() => setActiveItem("/ao/emissionreports")}
            >
              <i className="fs-5 ">
                <IoDocumentText />
              </i>
              <span
                className="ms-2 d-none d-sm-inline"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                Emissions Report
              </span>
            </Link>
          </li>
          <li className="w-100">
            <Link
              to="/ao/emissiondata"
              className={`nav-link text-truncate text-black ${
                activeItem === "/ao/emissiondata" ? "menuActive" : ""
              }`}
              onClick={() => setActiveItem("/ao/emissiondata")}
            >
              <i className="fs-5">
                {" "}
                <img
                  src={DataIcon}
                  alt="icon"
                  style={{ width: "18px", height: "18px" }}
                />
              </i>
              <span
                className="ms-2 d-none d-sm-inline"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                Emissions Data
              </span>
            </Link>
          </li>
          {/* <li className="nav-item my-1 disabled w-100">
            <a
              to="/sa"
              href="#submenu2"
              data-bs-toggle="collapse"
              className={`nav-link text-truncate text-black ${
                activeItem === "/sa" ? "menuActive" : ""
              }`}
              onClick={() => setActiveItem("/sa")}
            >
              <i className="fs-5">
                {" "}
                <img
                  src={DataIcon}
                  alt="icon"
                  style={{ width: "18px", height: "18px" }}
                />
              </i>
              <span
                className={"ms-2 d-none d-sm-inline"}
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                Emission Data
              </span>{" "}
              <i className="ps-1">
                <GrFormDown />
              </i>
            </a>
            <ul
              className="flex-column collapse ms-1 list-unstyled "
              id="submenu2"
              data-bs-parent="#menu"
            >
              <li className="nav-item ms-4">
                <Link
                  to=""
                  className={`nav-link text-black ${
                    activeItem === "/formC" ? "menuActive" : ""
                  }`}
                  onClick={() => setActiveItem("formM")}
                  style={{ fontSize: "14px", fontWeight: "400" }}
                >
                  Form C
                </Link>
              </li>
              <li className="nav-item ms-4">
                <Link
                  to="/ao"
                  className={`nav-link text-black ${
                    activeItem === "formM" ? "menuActive" : ""
                  }`}
                  onClick={() => setActiveItem("formM")}
                  style={{ fontSize: "14px", fontWeight: "400" }}
                >
                  Form M
                </Link>
              </li>
            </ul>
          </li> */}
          {/* <li className="w-100">
            <Link
              to="/ao/verificationbodies"
              className="nav-link text-truncate text-black"
            >
              <i className="fs-5 ">
                {" "}
                <MdVerifiedUser />
              </i>
              <span className="ms-2 d-none d-sm-inline">
                Verification Bodies
              </span>
            </Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
