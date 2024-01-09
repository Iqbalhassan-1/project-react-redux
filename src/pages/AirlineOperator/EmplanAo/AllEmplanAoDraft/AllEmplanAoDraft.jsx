import React, { useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import CreateButton from "../../../../components/CreateButton/CreateButton";
import style from "./allemplanaodraft.module.css";
import Draft from "../../../../components/Status/Draft";
import { useDispatch, useSelector } from "react-redux";
import {
  getDraftEmp,
  setEmissionReportVeiwDataEmp,
} from "../../../../store/AirlineOperator/EmissionsMonitoringPlan/EmissionMonitoringPlanSlice";
import Loader from "../../../../components/Loader/Loader";

const AllEmplanAoDraft = ({ setShowModal, setShowEmDraft }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDraftEmp());
  }, [dispatch]);
  const { allDraftEmp, loading } = useSelector(
    (state) => state.emissionMonitoringPlan
  );
  console.log(allDraftEmp);
  const allDraftReports = [...allDraftEmp].reverse();
  console.log(allDraftReports);
  //handle veiw
  const handleView = (item) => {
    setShowEmDraft(true);
    dispatch(setEmissionReportVeiwDataEmp(item));
  };
  return (
    <>
      <Container fluid className="main-class">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Row className="d-flex align-items-center">
              <Col md={9}>
                <h4 className="py-3">Emissions Monitoring Plan (Drafts)</h4>
              </Col>
              <Col md={3}>
                <CreateButton
                  icon
                  title={"Add New"}
                  onClick={() => setShowModal(true)}
                  width={"200px"}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Table className={style.tableclass}>
                  <thead>
                    <tr>
                      <th>Version</th>
                      <th>Monitoring Method</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allDraftReports?.length === 0 ? (
                      <h5 className="py-3 text-muted">
                        No emissions monitoirng plan to display
                      </h5>
                    ) : (
                      allDraftReports?.map((data) => (
                        <tr>
                          <td>{data.version}</td>
                          <td>{data.monitoring_method}</td>
                          <td>
                            <div className="d-flex">
                              <Draft />
                            </div>
                          </td>
                          <td>
                            <td>
                              <Link
                                to="/ao/EmissionMonitoringPlan"
                                className="d-flex align-items-center gap-1"
                                onClick={() => handleView(data)}
                              >
                                <span style={{ paddingBottom: "2px" }}>
                                  <BsEyeFill size={20} />
                                </span>
                                View
                              </Link>
                            </td>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default AllEmplanAoDraft;
