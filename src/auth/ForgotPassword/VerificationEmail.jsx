import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import side from "../../assets/images/side.png";
import art from "../../assets/images/Artboard.png";
import "../SignIn/SignIn.css";
import click from "../../assets/images/click.png";

const VerificationEmail = () => {
  return (
    <>
      <Container fluid>
        <Row className="main-rowAll">
          <Col md={6} className="h-100 p-0 m-0">
            <img src={side} alt="sideimage" className="bgFor-img" />
            <img src={art} alt="art" className="forTop-img" />
          </Col>
          <Col
            md={6}
            className="h-80 d-flex justify-content-center flex-column gap-3 align-items-center"
          >
            <div className="forcenterdiv">
              <span className="forcenterdivicon">
                <img src={click} alt="click image" />
              </span>
            </div>

            <div>
              <h4 className="text-center">
                Verification Email Send Successfully.
              </h4>
              <h4 className="text-center">Kindly Check your Email.</h4>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default VerificationEmail;
