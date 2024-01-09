import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import style from "./request.module.css";
import Pending from "../../../../components/Status/Pending";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import PendingApproval from "../../../../components/Status/PendingApproval";
import Loader from "../../../../components/Loader/Loader";
import {
  empApprovalRequests,
  setViewEmpSa,
} from "../../../../store/StateAgent/EmissionMonitoringPlan/EmissionMonitoringPlanSaSlice";
const RequestEmp = ({ setShowEmplan, index }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(empApprovalRequests());
  }, [dispatch, index]);

  const { allEmpApprovalRequests, loading } = useSelector(
    (state) => state.emissionMonitoringPlanSa
  );

  const allEmp = [...allEmpApprovalRequests].reverse();

  const handleViewEmp = (ViewData) => {
    console.log("viewEmpl",setShowEmplan)
    setShowEmplan(true);
    console.log("viewEmpsa", ViewData);
    dispatch(setViewEmpSa(ViewData));
  };

  return (
    <>
      <Container fluid className="main-class">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Row className="d-flex align-items-center">
              <Col md={8}>
                <h4 className="py-3">
                  Emissions Monitoring Plan Approval Request
                </h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table className={style.tableclass}>
                  <thead>
                    <tr>
                      <th>Aeroplan Operator</th>
                      <th>Version</th>
                      <th>Submission Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allEmp?.length === 0 ? (
                      <h5 className="py-3 text-muted">
                        No emission monitoirng plan to display
                      </h5>
                    ) : (
                      allEmp?.map((emp, index) => (
                        <tr key={index}>
                          <td>{emp?.user.name}</td>
                          <td>{emp?.version}</td>
                          <td>
                            {" "}
                            {moment(emp?.createdAt).format("Do MMMM YYYY")}
                          </td>
                          <td>
                            {emp?.sa_status === "pending" && (
                              <div className="d-flex">
                                <PendingApproval />
                              </div>
                            )}
                          </td>
                          <td>
                            <td>
                              <Link
                                to="/emplansa"
                                className="d-flex align-items-center gap-1"
                                onClick={() => {
                                  handleViewEmp(emp);
                                }}
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

export default RequestEmp;
