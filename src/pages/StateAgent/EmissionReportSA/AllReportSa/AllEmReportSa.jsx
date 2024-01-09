import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import Loader from "../../../../components/Loader/Loader";
import Pending from "../../../../components/Status/Pending";
import Done from "../../../../components/Status/Done";
import moment from "moment";
import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  getEmissionsReportSa,
  setViewEmissionReportSa,
} from "../../../../store/StateAgent/EmissionsReport/EmissionsReportSaSlice";
import { useDispatch, useSelector } from "react-redux";
import Verified from "../../../../components/Status/Verified";
import handleFileDownload from "../../../../utils/FileDownload";
import { AiOutlineDownload } from "react-icons/ai";
const AllEmReportSa = ({ setShowReport, showReport }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmissionsReportSa());
  }, [dispatch, showReport]);

  const { allEmissionsReportSa, loading } = useSelector(
    (state) => state.emissionsReportSa
  );
  console.log("allemissionreports", allEmissionsReportSa);
  const emData = [...allEmissionsReportSa].reverse();
  const handleViewReport = (view) => {
    setShowReport(false);
    dispatch(setViewEmissionReportSa(view));
  };
  return (
    <>
      <Container fluid className="main-class">
        <Row className="mt-3 d-flex align-items-center ">
          <Col md={6}>
            <h4 className="py-3">Emissions Report</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            {loading ? (
              <Loader />
            ) : (
              <Table className="currentEmission">
                <thead>
                  <tr>
                    <th>Aeroplane Operator</th>
                    <th>Year</th>
                    <th>ER</th>
                    <th>Consent File</th>
                    <th>Submission Date</th>
                    <th>Cross Check</th>
                    <th>Magnitude Check</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {emData.length === 0 ? (
                    <h5 className="text-muted py-3">
                      No emissions report to display
                    </h5>
                  ) : (
                    emData?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.user?.name}</td>
                          <td>{item.year}</td>
                          <td>
                            <span
                              className="d-flex align-items-center text-primary"
                              role="button"
                              tabIndex="0"
                              onClick={() =>
                                handleFileDownload(item?.file_name)
                              }
                            >
                              {" "}
                              <AiOutlineDownload className="mb-1" size={20} />
                              Download
                            </span>
                          </td>
                          <td>
                            <span
                              className="d-flex align-items-center text-primary"
                              role="button"
                              tabIndex="0"
                              onClick={() =>
                                handleFileDownload(item?.consent_file)
                              }
                            >
                              {" "}
                              <AiOutlineDownload className="mb-1" size={20} />
                              Download
                            </span>
                          </td>

                          <td>
                            {" "}
                            {moment(item.createdAt).format("DD MMMM YYYY")}
                          </td>

                          <td>
                            <div className="d-flex">
                              {item?.cross_check_status === "active" ? (
                                <Verified />
                              ) : (
                                <Pending />
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex">
                              <Pending />{" "}
                            </div>
                          </td>
                          <td>
                            <td>
                              <Link
                                to="/emissionsreports"
                                className="d-flex align-items-center gap-1"
                                onClick={() => handleViewReport(item)}
                              >
                                <span style={{ paddingBottom: "2px" }}>
                                  <BsEyeFill size={20} />
                                </span>
                                View
                              </Link>
                            </td>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AllEmReportSa;
