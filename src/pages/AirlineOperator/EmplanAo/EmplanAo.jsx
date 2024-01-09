import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AllEmplanAoDraft from "./AllEmplanAoDraft/AllEmplanAoDraft";
import AllEmplanAo from "./AllEmplanAo/AllEmplanAo";
import ViewEmplanAo from "./View/ViewEmplanAo";
import ViewEmplanAoDraft from "./View/ViewEmplanAoDraft";
import { getReportAo } from "../../../store/StateAgent/EmissionsReport/EmissionsReportSaSlice";
import { useDispatch } from "react-redux";

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
const EmplanAo = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [showEmplan, setShowEmplan] = useState(false);
  const [showEmDraft, setShowEmDraft] = useState(false);

  const handleClick = (num) => () => {
    if (num === 0) {
      setShowEmDraft(false);
    } else {
      setShowEmplan(false);
    }
    setIndex(num);
    setSelected(num);
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
              Emissions Monitoring Plan
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
        <Row
          className={`mt-5 ${selected === 0 ? "fadeIn" : "fadeOut"}`}
          hidden={index != 0}
        >
          {showEmplan ? (
            <ViewEmplanAo setShowEmplan={setShowEmplan} />
          ) : (
            <AllEmplanAo
              setShowEmplan={setShowEmplan}
              setShowModal={setShowModal}
              showModal={showModal}
              onSwitchToDrafts={handleClick(1)}
              setShowEmDraft={setShowEmDraft}
              index={index}
            />
          )}
        </Row>
        <Row
          className={`mt-5 ${selected === 1 ? "fadeIn" : "fadeOut"}`}
          hidden={index != 1}
        >
          {showEmDraft ? (
            <ViewEmplanAoDraft
              setShowEmDraft={setShowEmDraft}
              onSwitchToDrafts={handleClick(1)}
              setShowModal={setShowModal}
              onSwitchToReports={handleClick(0)}
            />
          ) : (
            <AllEmplanAoDraft
              setShowEmDraft={setShowEmDraft}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          )}
        </Row>
      </Container>
    </>
  );
};

export default EmplanAo;
