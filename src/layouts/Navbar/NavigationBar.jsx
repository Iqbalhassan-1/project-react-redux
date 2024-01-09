import Button from "react-bootstrap/Button";
import { FaSearch } from "react-icons/fa";
import Avator from "../../assets/images/Avatar.png";
import { BsBell } from "react-icons/bs";
import Logo from "../../assets/images/AEDMS.svg";
import vectorAo from "../../assets/images/VectorAo.svg";
import vectorVb from "../../assets/images/VectorVb.svg";
import vectorSa from "../../assets/images/VectorSa.svg";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavigationBar.css";
import { NavDropdown, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { removeUser } from "../../store/AuthSlice";
import { SlLogout } from "react-icons/sl";
function NavigationBar() {
  const navigate = useNavigate();
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  const dispatch = useDispatch();

  // Dispatching the action to set user to null

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(removeUser(null));
    navigate("/signin");
  };
  return (
    <Navbar expand="sm" className="bg-body-light shadow-sm">
      <Navbar.Brand href="#" className="d-flex gap-2 align-items-center">
        <img src={Logo} className="image-class mx-2" />
        <b> AEDMS</b>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
      <Navbar.Offcanvas
        id={`offcanvasNavbar-expand-sm`}
        aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
            Offcanvas
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end align-items-center flex-grow-1 me-5">
            <div>
              {user && user?.user_type === "AO" ? (
                <img src={vectorAo} className="vector-image-class" />
              ) : user?.user_type === "VB" ? (
                <img src={vectorVb} className="vector-image-class" />
              ) : (
                <img src={vectorSa} className="vector-image-class" />
              )}
              {/* {user && user.user_type == "SA" ? (
                <img src={vectorSa} className="vector-image-class" />
              ) : (
                <img src={vector} className="vector-image-class" />
              )} */}
            </div>
            <NavDropdown
              title={user && user.name}
              id={`offcanvasNavbarDropdown-expand-sm`}
            >
              <NavDropdown.Item onClick={handleLogout}>
                <span
                  role="button"
                  tabIndex="0"
                  className="d-flex align-items-center gap-2"
                >
                  <SlLogout />
                  Logout
                </span>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Navbar>
  );
}

export default NavigationBar;
