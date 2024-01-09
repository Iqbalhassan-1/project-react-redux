import React, { useEffect } from "react";
import "./sidebarforstateagent.css";
import { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { TbUsers } from "react-icons/tb";
import { MdSignalCellularAlt } from "react-icons/md";
import { GrFormDown } from "react-icons/gr";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GrDocumentText } from "react-icons/gr";
import CreateButton from "../../components/CreateButton/CreateButton";

const SidebarForStateAgent = () => {
  const [activeItem, setActiveItem] = useState("");

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    setActiveItem(path);
  }, [location]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  return (
    <>
      <div className=" px-0">
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start "
          id="menu"
        >
          <li className="nav-item w-100">
            <Link
              to="/"
              className={`nav-link text-truncate text-black ${
                activeItem === "/" ? "menuActive" : ""
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
          <li className="nav-item w-100">
            <Link
              to="/emplansa"
              className={`nav-link text-truncate text-black ${
                activeItem === "/emplansa" ? "menuActive" : ""
              }`}
              onClick={() => setActiveItem("/emplansa")}
            >
              <i className="fs-5 ">
                {" "}
                <MdSignalCellularAlt />
              </i>
              <span
                className="ms-2 d-none  d-sm-inline w-25"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                Emissions Monitoroing Plan
              </span>
            </Link>
          </li>
          <li className="w-100">
            <Link
              to="/emissionsreports"
              className={`nav-link text-truncate text-black ${
                activeItem === "/emissionsreports" ? "menuActive" : ""
              }`}
              onClick={() => setActiveItem("/emissionsreports")}
            >
              <i className="fs-5 ">
                <GrDocumentText />
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
              to="/role"
              className={`nav-link text-truncate text-black ${
                activeItem === "/role" ? "menuActive" : ""
              }`}
              onClick={() => setActiveItem("/role")}
            >
              <i className="fs-5 ">
                <TbUsers />
              </i>
              <span
                className="ms-2 d-none d-sm-inline"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                Role Management
              </span>
            </Link>
          </li>
          <li className="w-100">
            <Link
              to="/icao"
              className={`nav-link text-truncate text-black ${
                activeItem === "/icao" ? "menuActive" : ""
              }`}
              onClick={() => setActiveItem("/icao")}
            >
              <i className="fs-5 ">
                <GrDocumentText />
              </i>
              <span
                className="ms-2 d-none d-sm-inline"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                ICAO Yearly Reporting
              </span>
            </Link>
          </li>
          {/* <li className="nav-item my-1 disabled w-100">
            <a
              href="#submenu2"
              onClick={() => setActiveItem("roleManagement")}
              data-bs-toggle="collapse"
              className="nav-link text-truncate text-black "
            >
              <i className="fs-5 ">
                {" "}
                <TbUsers />
              </i>
              <span
                className="ms-2 d-none d-sm-inline"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                Role Management
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
                  to="/role"
                  className={`nav-link  text-black ${
                    activeItem === "/aeroplaneoperator" ? "menuActive" : ""
                  }`}
                  onClick={() => setActiveItem("/aeroplaneoperator")}
                  style={{ fontSize: "14px", fontWeight: "400" }}
                >
                  Aeroplane Operator
                </Link>
              </li>
              <li className="nav-item ms-4">
                <Link
                  to="/verificationbodies"
                  className={`nav-link text-truncate text-black ${
                    activeItem === "/verificationbodies" ? "menuActive" : ""
                  }`}
                  onClick={() => setActiveItem("/verificationbodies")}
                  style={{ fontSize: "14px", fontWeight: "400" }}
                >
                  Verification Body
                </Link>
              </li>
            </ul>
          </li> */}
          {/* <li className="nav-item my-1 disabled w-100">
            <a
              href="#submenu3"
              data-bs-toggle="collapse"
              onClick={() => setActiveItem("ICAO")}
              className="nav-link text-truncate text-black"
            >
              <i className="fs-5 ">
                {" "}
                <GrDocumentText />
              </i>
              <span
                className="ms-2 d-none d-sm-inline"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                ICAO Yearly Reporting
              </span>{" "}
              <i className="ps-1">
                <GrFormDown />
              </i>
            </a>
            <ul
              className="flex-column collapse ms-1 list-unstyled "
              id="submenu3"
              data-bs-parent="#menu"
            >
              <li className="nav-item ms-4">
                <Link
                  to="/totalemissions"
                  className={`nav-link text-truncate text-black ${
                    activeItem === "/totalemissions" ? "menuActive" : ""
                  }`}
                  onClick={() => setActiveItem("/totalemissions")}
                  style={{ fontSize: "14px", fontWeight: "400" }}
                >
                  State Pair
                </Link>
              </li>
              <li className="nav-item ms-4">
                <Link
                  to="/airlineoperator"
                  className={`nav-link text-truncate text-black ${
                    activeItem === "/airlineoperator" ? "menuActive" : ""
                  }`}
                  onClick={() => setActiveItem("/airlineoperator")}
                  style={{ fontSize: "14px", fontWeight: "400" }}
                >
                  Airplane Operator
                </Link>
              </li>
              <li className="nav-item ms-4">
                <Link
                  to="/totalemissions-analysis"
                  className={`nav-link text-truncate text-black ${
                    activeItem === "/totalemissions-analysis"
                      ? "menuActive"
                      : ""
                  }`}
                  onClick={() => setActiveItem("/totalemissions-analysis")}
                  style={{ fontSize: "14px", fontWeight: "400" }}
                >
                  State Pair Analysis
                </Link>
              </li>
            </ul>
          </li> */}
        </ul>
      </div>

      {/* <div class="position-fixed  start-0" style={{ bottom: "5%" }}>
        <CreateButton
          title={"Logout"}
          background={"red"}
          border={"1px solid red"}
          color={"white"}
          onClick={() => {
            localStorage.clear();
            sessionStorage.clear();
            navigate("/signin");
          }}
        />
      </div> */}
    </>
  );
};
export default SidebarForStateAgent;
