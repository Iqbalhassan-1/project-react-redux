import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CrossCheck from "./CrossCheck/CrossCheck";
import MagnitudeCheck from "./MagnitudeCheck/MagnitudeCheck";
const active = {
  color: "var(--primary)",
  fontWeight: "500",
  fontSize: "1.1rem",
  borderBottom: "2px solid var(--primary)",
};
const inactive = {
  color: "#828282",
  fontWeight: "500",
  fontSize: "1.1rem",
  textDecoration: "none",
};

const ViewEmReportSa = ({ setShowReport }) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [showDraft, setShowDraft] = useState(false);

  const handleClick = (num) => () => {
    setIndex(num);
    setSelected(num);
  };

  return (
    <Container fluid>
      <Row className="mt-4 ">
        <Col
          md={2}
          className={selected == 0 ? "px-2" : "px-2"}
          onClick={handleClick(0)}
        >
          <Link style={selected == 0 ? active : inactive}>Cross Check</Link>
        </Col>
        <Col
          md={2}
          className={selected == 1 ? "px-1" : " px-1"}
          onClick={handleClick(1)}
        >
          <Link style={selected == 1 ? active : inactive}>Magnitude Check</Link>
        </Col>
      </Row>
      <Row className="mt-5" hidden={index != 0}>
        <CrossCheck setShowReport={setShowReport} OnSwitch={handleClick(1)}/>
      </Row>
      <Row className="mt-5" hidden={index != 1}>
        <MagnitudeCheck />
      </Row>
    </Container>
  );
};

export default ViewEmReportSa;
