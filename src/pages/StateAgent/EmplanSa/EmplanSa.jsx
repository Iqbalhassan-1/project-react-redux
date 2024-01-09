import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ActiveEmp from "./ActiveEmplan/ActiveEmp";
import RequestEmp from "./RequestEmplan/RequestEmp";
import ViewEmplanSa from "./ViewEmplan/ViewEmplanSa";

const active = {
  color: "var(--primary)",
  fontWeight: "500",
  borderBottom: "1px solid var(--primary)",
};

const inactive = {
  color: "#828282",
  fontWeight: "500",
  textDecoration: "none",
};

const EmplanSa = () => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(0);
  const [showEmplanRequest, setShowEmplanRequest] = useState(false);
  const [showEmplanActive, setShowEmplanActive] = useState(false);

  const handleClick = (num) => () => {
    setIndex(num);
    setSelected(num);
    // setShowEmplanRequest(false);
    // setShowEmplanActive(false);
    if (num === 0 && showEmplanRequest === true) {
      setShowEmplanRequest(false);
    }
    if (num === 1 && showEmplanActive === true) {
      setShowEmplanActive(false);
    }
  };

  return (
    <>
      <Container fluid>
        <Row className="mt-4">
          <Col
            md={3}
            className={selected === 0 ? "px-2" : "px-2"}
            onClick={handleClick(0)}
          >
            <Link style={selected === 0 ? active : inactive}>
              EMP Approval Request
            </Link>
          </Col>
          <Col
            md={4}
            className={selected === 1 ? "px-1" : " px-1"}
            onClick={handleClick(1)}
          >
            <Link style={selected === 1 ? active : inactive}>
              Emissions Monitoring Plan
            </Link>
          </Col>
        </Row>
        <Row
          className={`mt-5 ${selected === 0 ? "fadeIn" : "fadeOut"}`}
          hidden={index !== 0}
        >
          {showEmplanRequest ? (
            <ViewEmplanSa
              setShowEmplan={setShowEmplanRequest}
              onSwitchToEmp={handleClick(0)}
              onSwitchToActiveEmp={handleClick(1)}
            />
          ) : (
            <RequestEmp setShowEmplan={setShowEmplanRequest} />
          )}
        </Row>
        <Row
          className={`mt-5 ${selected === 1 ? "fadeIn" : "fadeOut"}`}
          hidden={index !== 1}
        >
          {showEmplanActive ? (
            <ViewEmplanSa
              setShowEmplan={setShowEmplanActive}
              onSwitchToEmp={handleClick(1)}
              
            />
          ) : (
            <ActiveEmp setShowEmplan={setShowEmplanActive} index={index} />
          )}
        </Row>
      </Container>
    </>
  );
};

export default EmplanSa;
