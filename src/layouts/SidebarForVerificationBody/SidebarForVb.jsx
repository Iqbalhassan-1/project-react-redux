import React, { useEffect } from "react";
import { useState } from "react";
import "./SidebarForVb.css";
import { RxDashboard } from "react-icons/rx";
import { MdVerifiedUser } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CreateButton from "../../components/CreateButton/CreateButton";

const SidebarForVb = () => {
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
          <li className="w-100">
            <Link
              to="/vb"
              className={`nav-link text-truncate text-black ${
                activeItem === "/vb" ? "menuActive" : ""
              }`}
              onClick={() => setActiveItem("/vb/")}
            >
              <i className="fs-5 ">
                {" "}
                <RxDashboard />
              </i>
              <span
                className="ms-2 d-none d-sm-inline"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                Dashboard
              </span>
            </Link>
          </li>

          <li className="w-100">
            <Link
              to="/vb/emissionreports"
              className={`nav-link text-truncate text-black ${
                activeItem === "/vb/emissionreports" ? "menuActive" : ""
              }`}
              onClick={() => setActiveItem("/vb/emissionreports")}
            >
              <i className="fs-5 ">
                <IoDocumentText />
              </i>
              <span
                className="ms-2 d-none d-sm-inline"
                style={{ fontSize: "14px", fontWeight: "400" }}
              >
                Emissions Reports
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SidebarForVb;
