import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import * as ImIcons from "react-icons/im";
import "./dashboardforstateagent.css";
import { Link } from "react-router-dom";
const DashboardForStateAgent = () => {
  return (
    <>
      <Container fluid>
        <Row className="mt-5 mx-1 d-flex gap-2">
          <Col className="card2 p-0  ">
            <div className="d-flex justify-content-between px-2 align-items-center py-2 mt-2 ">
              <h6>Emissions Monitoring Plan</h6>
              <span className="pb-2">
                <Link to="/">
                  {" "}
                  <b>More</b>{" "}
                </Link>{" "}
              </span>
            </div>
            <div className="cardds"></div>
            <div className="px-4 pb-4 d-flex gap-2 align-items-center h-75">
              <h2>87</h2>
              <span className="forapprovel">Approval Request</span>
            </div>
          </Col>
          <Col className="card2 p-0">
            <div className="d-flex justify-content-between px-2 align-items-center py-2 mt-2 ">
              <h6>Emissions Monitoring Plan</h6>
              <span className="pb-2">
                <Link to="/">
                  {" "}
                  <b>More</b>{" "}
                </Link>{" "}
              </span>
            </div>
            <div className="cardds"></div>
            <div className="px-4 my-2 d-flex gap-2 align-items-center h-50">
              <h2>87</h2>
              <span className="forapprovel">Active</span>
            </div>
          </Col>
          <Col className="card2 p-0">
            <div className="d-flex justify-content-between px-2 align-items-center py-2 mt-2">
              <h6>Emissions Report</h6>
              <span className="pb-2">
                <Link to="/">
                  {" "}
                  <b>More</b>{" "}
                </Link>{" "}
              </span>
            </div>
            <div className="cardds"></div>
            <div className="px-4 my-2 d-flex gap-2 align-items-center h-50">
              <h2>42</h2>
              <span className="forapprovel">Pending OMC</span>
            </div>
          </Col>
          <Col className="card2 p-0">
            <div className="d-flex justify-content-between px-2 align-items-center py-2 mt-2">
              <h6>Emissions Report</h6>
              <span className="pb-2">
                <Link to="/">
                  {" "}
                  <b>More</b>{" "}
                </Link>{" "}
              </span>
            </div>
            <div className="cardds"></div>
            <div className="px-4 my-2 d-flex gap-2 align-items-center h-50">
              <h2>39</h2>
              <span className="forapprovel">Approved</span>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DashboardForStateAgent;
