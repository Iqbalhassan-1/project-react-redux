import React, { useEffect, useState } from "react";
import CreateButton from "../../../../components/CreateButton/CreateButton";
import { CloseButton, Col, Container, Form, Row, Table } from "react-bootstrap";
import { IoMdDocument } from "react-icons/io";
import { AiOutlineDownload } from "react-icons/ai";
import Draft from "../../../../components/Status/Draft";
import ModalConfirm from "../../../../components/ModalConfirm/ModalConfirm";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import handleFileDownload from "../../../../utils/FileDownload";
import { sendToSa } from "../../../../store/AirlineOperator/EmissionsMonitoringPlan/EmissionMonitoringPlanSlice";
import Loader from "../../../../components/Loader/Loader";

const ViewEmplanAoDraft = ({ setShowEmDraft, onSwitchToReports }) => {
  const dispatch = useDispatch();
  const [confirmShow, setConfirmShow] = useState(false);
  const draftDataEmp = useSelector(
    (state) => state.emissionMonitoringPlan?.empData
  );
  console.log(draftDataEmp);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(sendToSa(draftDataEmp));
      setShowEmDraft(false);
      setConfirmShow(false);
      setTimeout(() => {
        onSwitchToReports();
      }, 500);
    } catch (error) {
      console.error(error);
    }
  };
  const { loading } = useSelector((state) => state.emissionMonitoringPlan);

  return (
    <>
      <Container fluid>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Row className="d-flex align-items-center">
              <Col md={10}>
                <h4>Emissions Monitoring Plan (Drafts)</h4>
              </Col>
              {/* forediticon class in index.css  */}
              <Col
                md={2}
                className="text-end d-flex justify-content-around forediticon"
              >
                {/* <RiDeleteBin6Fill onClick={() => setShowModal(true)} /> */}
                <CloseButton onClick={() => setShowEmDraft(false)} />
              </Col>
            </Row>
            <Row>
              {/* left column start from here  */}
              <Col md={6}>
                <div className="mt-3 d-flex gap-5">
                  <div className="text-secondary">
                    {draftDataEmp?.monitoring_method != "CERT" && (
                      <Table>
                        <thead>
                          <tr>
                            <th>Period</th>
                            <th>Monitoring Method</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>2019-2020</td>
                            <td>
                              {draftDataEmp?.year == 2019 ||
                              draftDataEmp?.year == 2020
                                ? draftDataEmp?.monitoring_method
                                : ""}
                            </td>
                          </tr>
                          <tr>
                            <td>2020-2035</td>
                            <td>
                              {draftDataEmp?.year >= 2021
                                ? draftDataEmp?.monitoring_method
                                : ""}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    )}
                    {draftDataEmp?.monitoring_method == "CERT" && (
                      <p>Monitoring Method</p>
                    )}
                    {draftDataEmp?.monitoring_method == "CERT" && (
                      <p>Upload Date</p>
                    )}
                  </div>

                  <div>
                    {draftDataEmp?.monitoring_method == "CERT" && (
                      <p>{draftDataEmp?.monitoring_method}</p>
                    )}
                    {draftDataEmp?.monitoring_method == "CERT" && (
                      <p>
                        {moment(draftDataEmp?.createdAt).format("Do MMMM YYYY")}
                      </p>
                    )}
                  </div>
                </div>
                {/* file div start from here  */}
                <div className="py-2">
                  <h6>Emission Monitoring Plan</h6>
                  <div className="d-flex justify-content-between py-2 px-2 border border-1">
                    <span className="d-flex align-items-center text-secondary">
                      {" "}
                      <IoMdDocument className="mb-1" size={20} />
                      Emissions Monitoring Plan File
                    </span>
                    <span
                      className="d-flex align-items-center text-primary"
                      role="button"
                      tabIndex="0"
                      onClick={() => {
                        handleFileDownload(draftDataEmp?.file_name);
                      }}
                    >
                      {" "}
                      <AiOutlineDownload className="mb-1" size={20} />
                      Download
                    </span>
                  </div>
                </div>
                {draftDataEmp?.cert_file != "null" && (
                  <div className="py-2">
                    <h6>CERT File (Optional)</h6>
                    <div className="d-flex justify-content-between py-2 px-2 border border-1">
                      <span className="d-flex align-items-center text-secondary">
                        {" "}
                        <IoMdDocument className="mb-1" size={20} />
                        Cert File
                      </span>
                      <span
                        className="d-flex align-items-center text-primary"
                        role="button"
                        tabIndex="0"
                        onClick={() => {
                          handleFileDownload(draftDataEmp?.cert_file);
                        }}
                      >
                        {" "}
                        <AiOutlineDownload className="mb-1" size={20} />
                        Download
                      </span>
                    </div>
                  </div>
                )}
                {draftDataEmp?.other_file != "null" && (
                  <div className="py-2">
                    <h6>Other File (Optional)</h6>
                    <div className="d-flex justify-content-between py-2 px-2 border border-1">
                      <span className="d-flex align-items-center text-secondary">
                        {" "}
                        <IoMdDocument className="mb-1" size={20} />
                        Optional File
                      </span>
                      <span
                        className="d-flex align-items-center text-primary"
                        role="button"
                        tabIndex="0"
                        onClick={() => {
                          handleFileDownload(draftDataEmp?.other_file);
                        }}
                      >
                        {" "}
                        <AiOutlineDownload className="mb-1" size={20} />
                        Download
                      </span>
                    </div>
                  </div>
                )}
                {draftDataEmp?.description != "" && (
                  <div className="py-2">
                    <h6>Aeroplane Operator Comments</h6>
                    {draftDataEmp?.description
                      ? draftDataEmp?.description
                      : "No remarks added"}
                  </div>
                )}
              </Col>
              {/* right columns start from here  */}
              <Col md={{ offset: 1, span: 3 }}>
                <span className="d-flex  align-items-center justify-content-between mt-3 text-secondary">
                  Current Status
                  <Draft />
                </span>
              </Col>
            </Row>

            <Row className="my-4">
              <Col md={{ offset: 7, span: 4 }} className="d-flex gap-3 ">
                <CreateButton
                  background="rgba(255, 255, 255, 1)"
                  color="black"
                  border="1px solid rgba(255, 255, 255, 1)"
                  title={"Delete"}
                  // onClick={() => setRejectShow(true)}
                />
                <CreateButton
                  type={"button"}
                  title={"Send to SA"}
                  onClick={() => setConfirmShow(true)}
                />
              </Col>
            </Row>
          </>
        )}
      </Container>

      {/* {confirmShow && <ModalConfirmSa setConfirmShow={setConfirmShow} />} */}
      {confirmShow && (
        <ModalConfirm
          title="Send to SA"
          message="Are you certain you want to send this Emissions Monitoring Plan to the State Authority?"
          note="Once your Emissions Monitoring Plan is approved, it will be used to track your CO2 emissions until you make changes to it."
          handleClose={() => setConfirmShow(false)}
          handleClick={handleSubmit}
        />
      )}
    </>
  );
};

export default ViewEmplanAoDraft;
