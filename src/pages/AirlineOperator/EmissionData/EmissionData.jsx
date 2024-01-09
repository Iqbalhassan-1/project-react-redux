import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormC from "./FormC/FormC";
import FormM from "./FormM/FormM";
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

const EmissionData = () => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [showEmplan, setShowEmplan] = useState(false);
  const [showEmDraft, setShowEmDraft] = useState(false);

  const handleClick = (num) => () => {
    setIndex(num);
    setSelected(num);
  };
  return (
    <>
      <Container fluid>
        <Row className="mt-4 ">
          <Col
            md={2}
            className={selected == 0 ? "px-2" : "px-2"}
            onClick={handleClick(0)}
          >
            <Link style={selected == 0 ? active : inactive}>Form C</Link>
          </Col>
          <Col
            md={2}
            className={selected == 1 ? "px-1" : " px-1"}
            onClick={handleClick(1)}
          >
            <Link style={selected == 1 ? active : inactive}>Form M</Link>
          </Col>
        </Row>

        <Row
          className={`mt-5 ${selected === 0 ? "fadeIn" : "fadeOut"}`}
          hidden={index != 0}
        >
          <FormC />
        </Row>
        <Row
          className={`mt-5 ${selected === 1 ? "fadeIn" : "fadeOut"}`}
          hidden={index != 1}
        >
          <FormM />
        </Row>
      </Container>
    </>
  );
};

export default EmissionData;
