import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Drafts from "./AllDrafts/Drafts";
import Reports from "./AllReports/Reports";
import ViewReport from "./View/ViewReport";
import ViewDraft from "./View/ViewDraft";

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
const EmissionReports = () => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [showReport, setShowReport] = useState(false);
  const [showDraft, setShowDraft] = useState(false);

  const handleClick = (num) => () => {
    if (num === 0) {
      setShowDraft(false);
    } else {
      setShowReport(false);
    }
    setIndex(num);
    setSelected(num);
    console.log("num", num);
  };

  return (
    <>
      <Container fluid>
        <Row className="mt-4 ">
          <Col
            md={3}
            className={selected == 0 ? "px-2" : "px-2"}
            onClick={handleClick(0)}
          >
            <Link style={selected == 0 ? active : inactive}>
              Emissions Report
            </Link>
          </Col>
          <Col
            md={2}
            className={selected == 1 ? "px-1" : " px-1"}
            onClick={handleClick(1)}
          >
            <Link style={selected == 1 ? active : inactive}>Drafts</Link>
          </Col>
        </Row>
        <Row className="mt-5" hidden={index != 0}>
          {showReport ? (
            <ViewReport setShowReport={setShowReport} />
          ) : (
            <Reports
              setShowReport={setShowReport}
              setShowDraft={setShowDraft}
              onSwitchToDrafts={handleClick(1)}
              showModal={showModal}
              setShowModal={setShowModal}
              index={index}
              handleClick={handleClick}
            />
          )}
        </Row>
        <Row className="mt-5" hidden={index != 1}>
          {showDraft ? (
            <ViewDraft
              setShowDraft={setShowDraft}
              setShowModal={setShowModal}
              onSwitchToReports={handleClick(0)}
            />
          ) : (
            <Drafts
              setShowDraft={setShowDraft}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          )}
        </Row>
      </Container>
    </>
  );
};

export default EmissionReports;
