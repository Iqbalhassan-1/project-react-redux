import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Pending from "../../../../components/Status/Pending";
import style from "./active.module.css";
import Active from "../../../../components/Status/Active";
import InActive from "../../../../components/Status/InActive";
import Rejected from "../../../../components/Status/Rejected";
import { useDispatch, useSelector } from "react-redux";
import {
  activeEmp,
  setViewEmpSa,
} from "../../../../store/StateAgent/EmissionMonitoringPlan/EmissionMonitoringPlanSaSlice";
import Loader from "../../../../components/Loader/Loader";
import moment from "moment";

const ActiveEmp = ({ setShowEmplan, index }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(activeEmp());
  }, [dispatch, index]);

  const { activeEmpSa, loading } = useSelector(
    (state) => state.emissionMonitoringPlanSa
  );
  const activeEmpData = [...activeEmpSa].reverse();

  console.log("activeEmpSa", activeEmpSa);
  const handleViewEmp = (ViewData) => {
    setShowEmplan(true);
    dispatch(setViewEmpSa(ViewData));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container fluid className="main-class">
          <Row className="d-flex align-items-center">
            <Col md={8}>
              <h4 className="py-3">Emissions Monitoring Plan</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table className={style.tableclass}>
                <thead>
                  <tr>
                    <th>Aeroplane Operator</th>
                    <th>Version</th>
                    <th>Approval/Rejection Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {activeEmpData.length === 0 ? (
                    <h5 className="py-3 text-muted">
                      No emission monitoring plan to display
                    </h5>
                  ) : (
                    activeEmpData.map((data, index) => (
                      <tr key={index}>
                        <td>{data?.user.name}</td>
                        <td>{data?.version}</td>
                        <td>
                          {" "}
                          {moment(data?.approve_date).format("Do MMMM YYYY")}
                        </td>
                        <td>
                          {data?.sa_status === "active" && (
                            <div className="d-flex">
                              <Active />
                            </div>
                          )}
                        </td>
                        <td>
                          <td>
                            <Link
                              to="/emplansa"
                              className="d-flex align-items-center gap-1"
                              onClick={() => {
                                handleViewEmp(data);
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
        </Container>
      )}
    </>
  );
};

export default ActiveEmp;
