import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import TotalAeroplaneOperator from "./TotalAeroplaneOperator/TotalAeroplaneOperator";
import TotalStatePair from "./TotalStatePair/TotalStatePair";
import StatePairAnalysis from "./StatePairAnalysis/StatePairAnalysis";

// import "./rolemangement.css";
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
const IcaoYearReport = () => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(0);

  const handleClick = (num) => () => {
    setIndex(num);
    setSelected(num);
  };
  return (
    <div>
      <Container fluid>
        <Row className="mt-4">
          <Col
            md={3}
            className={selected === 0 ? "px-2" : "px-2"}
            onClick={handleClick(0)}
          >
            <Link style={selected === 0 ? active : inactive}>State Pair</Link>
          </Col>
          <Col
            md={4}
            className={selected === 1 ? "px-1" : " px-1"}
            onClick={handleClick(1)}
          >
            <Link style={selected === 1 ? active : inactive}>
              Aeroplane Operator
            </Link>
          </Col>
          {/* <Col
            md={4}
            className={selected === 2 ? "px-1" : " px-1"}
            onClick={handleClick(2)}
          >
            <Link style={selected === 2 ? active : inactive}>
              State Pair Analysis
            </Link>
          </Col> */}
        </Row>
        <Row
          //   className="mt-5"
          className={`mt-5 ${selected === 0 ? "fadeIn" : "fadeOut"}`}
          hidden={index !== 0}
        >
          <TotalStatePair />
        </Row>
        <Row
          className={`mt-5 ${selected === 1 ? "fadeIn" : "fadeOut"}`}
          hidden={index !== 1}
        >
          <TotalAeroplaneOperator />
        </Row>
        {/* <Row
          className={`mt-5 ${selected === 2 ? "fadeIn" : "fadeOut"}`}
          hidden={index !== 2}
        >
          <StatePairAnalysis />
        </Row> */}
      </Container>
    </div>
  );
};

export default IcaoYearReport;
