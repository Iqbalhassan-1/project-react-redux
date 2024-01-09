import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ViewEmissionReportsVb from "./View/ViewEmissionReportsVb";
import AllEmissionReportsVb from "./AllEmissonReportsVb/AllEmissionReportsVb";
import { useDispatch, useSelector } from "react-redux";
import { getReportVb } from "../../../store/VerificationBody/EmissionsReportVbSlice";
import { setVeiwVbReport } from "../../../store/VerificationBody/EmissionsReportVbSlice.js";
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

const EmissionReportsVb = () => {
  const dispatch = useDispatch();
  const [showEmission, setShowEmission] = useState(false);

  useEffect(() => {
    dispatch(getReportVb());
  }, [dispatch, showEmission]);

  const {allEmissionsReportVb,loading} = useSelector(
    (state) => state.emissionsReportVb
  );

  const allReports = [...allEmissionsReportVb].reverse();

  const handleViewReport = (report) => {
    setShowEmission(true);
    dispatch(setVeiwVbReport(report));
  };

  // for select the tab
  const [selected, setSelected] = useState(0);
  const [index, setIndex] = useState(0);
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
            <Link style={selected == 0 ? active : inactive}>
              Emission Report
            </Link>
          </Col>
        </Row>
        <Row className="mt-5" hidden={index != 0}>
          {showEmission ? (
            <ViewEmissionReportsVb setShowEmission={setShowEmission} />
          ) : (
            <AllEmissionReportsVb
              data={allReports}
              loading={loading}
              handleViewReport={handleViewReport}
              setShowEmission={setShowEmission}
            />
          )}
        </Row>
      </Container>
    </>
  );
};

export default EmissionReportsVb;
