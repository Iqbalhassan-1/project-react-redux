import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import side from "../../assets/images/side.png";
import EmailIcon from "../../assets/images/email.svg";
import art from "../../assets/images/Artboard.png";
import PasswordIcon from "../../assets/images/password.svg";
import { BiArrowBack } from "react-icons/bi";
import "../SignIn/SignIn.css";
import { Link } from "react-router-dom";
const ForgotPassword = () => {
  return (
    <>
      <Container fluid>
        <Row className="main-rowAll">
          <Col md={6} className="h-100 p-0">
            <img src={side} alt="sideimage" className="bgFor-img" />
            <img src={art} alt="art" className="forTop-img" />
          </Col>
          <Col md={6} className="spaceAll">
            <Row className="pt-4">
              <Col md={12}>
                <h4 className="p-0 m-0">Forgot Password?</h4>
                <span className="pb-2 text-secondary">
                  Please enter your email address to receive a verification code
                </span>
                <form className="form_container pt-3">
                  <div className="input_container">
                    <img src={EmailIcon} className="icon" alt="emailIcon" />
                    <input
                      placeholder="user@example.com"
                      title="Inpit title"
                      name="input-name"
                      type="email"
                      className="input_field"
                      id="email_field"
                    />
                  </div>
                  <div className="pt-1">
                    <button
                      title="Forgot"
                      type="submit"
                      className="sign-in_btn"
                    >
                      <span>Send Email</span>
                    </button>
                    <Link to="/signin" style={{ color: "black" }}>
                      <span className="d-flex justify-content-center gap-2 pt-3 align-items-center">
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

export default ForgotPassword;
