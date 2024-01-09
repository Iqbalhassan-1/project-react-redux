import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import style from "./draft.module.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDraftAO,
  setEmissionReportDraftData,
} from "../../../../store/AirlineOperator/EmissionsReport/EmissionReportAOSlice";
import CreateButton from "../../../../components/CreateButton/CreateButton";
import Loader from "../../../../components/Loader/Loader";
import { toSentenceCase } from "../../../../utils/toSentenceCase";

const Drafts = ({ setShowModal, setShowDraft }) => {
  const dispatch = useDispatch();
  const { emissionsDraft, loading } = useSelector(
    (state) => state.emissionsReport
  );
  console.log("emissiondraft", emissionsDraft);
  const reversedReports = [...emissionsDraft].reverse();
  useEffect(() => {
    dispatch(getAllDraftAO());
  }, []);

  //handle veiw
  const handleView = (item) => {
    setShowDraft(true);
    dispatch(setEmissionReportDraftData(item));
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
                <h4 className="py-3">Emissions Report (Drafts)</h4>
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
                      <th>Year</th>
                      <th>Verification Body</th>
                      <th>Reporting Method</th>
                      <th>Upload Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reversedReports.length === 0 ? (
                      <h5 className="py-3 text-muted">
                        No emissions report to display
                      </h5>
                    ) : (
                      reversedReports?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item?.year}</td>
                            <td>{item?.vb?.name}</td>
                            <td>{toSentenceCase(item?.reporting_tools)}</td>
                            <td>
                              {moment(item?.createdAt).format("DD MMMM YYYY")}
                            </td>

                            <td>
                              <a
                                href="#"
                                className="d-flex align-items-center gap-1"
                                onClick={() => handleView(item)}
                              >
                                <span className="pb-1">
                                  <BsEyeFill size={20} />
                                </span>
                                View
                              </a>
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
    </>
  );
};

export default Drafts;
