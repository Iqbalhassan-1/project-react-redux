import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import side from "../../assets/images/side.png";
import art from "../../assets/images/Artboard.png";
import PasswordIcon from "../../assets/images/password.svg";
import { BiArrowBack } from "react-icons/bi";
import "../SignIn/SignIn.css";
import { Link } from "react-router-dom";
import UsePasswordToggle from "../../utils/UsePasswordToggle";

const CreatePassword = () => {
  const [Inputpassword, Toggleicon] = UsePasswordToggle();
  return (
    <>
      <Container fluid>
        <Row className="main-rowAll">
          <Col md={6} className="h-100 p-0 m-0">
            <img src={side} alt="sideimage" className="bgFor-img" />
            <img src={art} alt="art" className="forTop-img" />
          </Col>
          <Col md={6} className="spaceAll">
            <Row className="pt-4">
              <Col md={12}>
                <h4 className="p-0 m-0">Create New Password</h4>
                <span className="pb-2" style={{ color: "gray" }}>
                  Your New Password Must Be Different From Previously Used
                  Password
                </span>
                <form className="form_container pt-4">
                  <div className="input_container yes">
                    <img
                      src={PasswordIcon}
                      className="icon"
                      alt="passwordIcon"
                    />
                    <input
                      placeholder="Enter New Password"
                      title="Inpit title"
                      name="input-name"
                      type={Inputpassword}
                      className="input_field"
                      id="password_field"
                    />
                    <span className="passwordToggleIcon2">{Toggleicon}</span>
                  </div>
                  <div className="input_container yes">
                    <img
                      src={PasswordIcon}
                      className="icon"
                      alt="passwordIcon"
                    />
                    <input
                      placeholder="Re-Type Password"
                      title="Inpit title"
                      name="input-name"
                      type={Inputpassword}
                      className="input_field"
                      id="password_field"
                    />
                    <span className="passwordToggleIcon2">{Toggleicon}</span>
                  </div>
                  <div className="pt-1">
                    <button
                      title="Forgot"
                      type="submit"
                      className="sign-in_btn"
                    >
                      <span>Confirm Password</span>
                    </button>
                    <Link to="/signin">
                      <span className="d-flex justify-content-center gap-2 pt-3 align-items-center text-dark">
                        <BiArrowBack />
                        Go back to{" "}
                        <b style={{ color: "var(--primary)" }}>Sign in</b>
                      </span>
                    </Link>
                  </div>
                </form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreatePassword;
