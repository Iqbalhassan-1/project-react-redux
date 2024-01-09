import React, { useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, Row, Table } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import Verified from "../../../../components/Status/Verified";
import CreateButton from "../../../../components/CreateButton/CreateButton";
import Pending from "../../../../components/Status/Pending";

import moment from "moment";
import { Link } from "react-router-dom";
import style from "./report.module.css";
import NewEmissionReport from "../NewEmissionReport/NewEmissionReport";
import {
  getReportAo,
  setEmissionReportVeiwData,
} from "../../../../store/AirlineOperator/EmissionsReport/EmissionReportAOSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../components/Loader/Loader";
import { toSentenceCase } from "../../../../utils/toSentenceCase";
import CrossChecked from "../../../../components/Status/CrossChecked";

const Reports = ({
  setShowReport,
  showModal,
  setShowModal,
  setShowDraft,
  onSwitchToDrafts,
  onSwitchToReports,
  index,
}) => {
  const { allEmissionReports, loading } = useSelector(
    (state) => state.emissionsReport
  );

  // Reverse the order of the allEmissionReports array
  const reversedReports = [...allEmissionReports].reverse();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReportAo());
  }, [dispatch, index]);

  //handle veiw
  const handleView = (item) => {
    setShowReport(true);
    dispatch(setEmissionReportVeiwData(item));
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
                <h4 className="py-3">Emissions Report</h4>
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
                      <th>S No.</th>
                      <th>Verification Body</th>
                      <th>Year</th>
                      <th>Reporting Method</th>
                      <th>Submission Date</th>
                      <th>Verification Body</th>
                      <th>State Authority</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reversedReports?.length === 0 ? (
                      <h5 className="text-muted py-3">
                        No emissions report to display
                      </h5>
                    ) : (
                      reversedReports?.map((aoData, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{aoData?.vb?.name}</td>
                            <td>{aoData?.year}</td>
                            <td>{toSentenceCase(aoData.reporting_tools)}</td>
                            <td>
                              {" "}
                              {moment(aoData?.createdAt).format("DD MMMM YYYY")}
                            </td>
                            <td>
                              <div className="d-flex">
                                {aoData.vb_submit_to_caat === "Y" ? (
                                  <Verified />
                                ) : (
                                  <Pending />
                                )}
                              </div>{" "}
                            </td>
                            <td>
                              <div className="d-flex">
                                {aoData.cross_check_status === "active" ? (
                                  <Verified />
                                ) : (
                                  <Pending />
                                )}
                              </div>{" "}
                            </td>

                            <td>
                              <Link
                                className="d-flex align-items-center gap-1"
                                onClick={() => handleView(aoData)}
                              >
                                <span className="pb-1">
                                  <BsEyeFill size={20} />
                                </span>
                                View
                              </Link>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </>
        )}
      </Container>

      {showModal && (
        <NewEmissionReport
          showModal={showModal}
          setShowModal={setShowModal}
          setShowReport={setShowReport}
          setShowDraft={setShowDraft}
          onSwitchToDrafts={onSwitchToDrafts}
        />
      )}
    </>
  );
};

export default Reports;
