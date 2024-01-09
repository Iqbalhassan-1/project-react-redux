import React, { useState } from "react";
import { CloseButton, Col, Container, Form, Row } from "react-bootstrap";
import { AiOutlineDownload } from "react-icons/ai";
import { IoMdDocument } from "react-icons/io";
import { Link } from "react-router-dom";
import { RiDeleteBin6Fill, RiEditBoxLine } from "react-icons/ri";
import CreateButton from "../../../../components/CreateButton/CreateButton";
import style from "./view.module.css";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { BASE_URL } from "../../../../config/Constants";
import ModalConfirm from "../../../../components/ModalConfirm/ModalConfirm";
import ModalDelete from "../../../../components/ModalDelete/ModalDelete";
import handleFileDownload from "../../../../utils/FileDownload";
import {
  deleteReportAo,
  sentReportAo_Tovb,
} from "../../../../store/AirlineOperator/EmissionsReport/EmissionReportAOSlice";
import Loader from "../../../../components/Loader/Loader";

const ViewDraft = ({ setShowDraft, setShowModal, onSwitchToReports }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);
  const draftData = useSelector((state) => state.emissionsReport.emissionsData);
  console.log("draft data", draftData);

  const dispatch = useDispatch();
  const handleSendToVb = () => {
    dispatch(sentReportAo_Tovb(draftData));
    setShowDraft(false);
    setConfirmShow(false);
    setTimeout(() => {
      onSwitchToReports();
    }, 500);
  };

  const handleDeleteDraft = () => {
    let draftId = draftData.id;
    dispatch(deleteReportAo(draftId));
    setShowDelete(false);
    setShowDraft(false);
  };
  const { loading } = useSelector((state) => state.emissionsReport);
  return (
    <>
      <Container fluid>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Row className="d-flex align-items-center">
              <Col md={10}>
                <h4>Emissions Report</h4>
              </Col>
              {/* forediticon class in index.css  */}
              <Col
                md={2}
                className="text-end d-flex justify-content-around forediticon"
              >
                <RiDeleteBin6Fill onClick={() => setShowDelete(true)} />
                <CloseButton onClick={() => setShowDraft(false)} />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form>
                  <Form.Group>
                    <Col className=" pt-2 d-flex">
                      <div className={style.firstcoldata}>
                        <p>Year</p>
                        <p>Verification body</p>
                        <p>Report Method</p>
                        {/* <p>Aggregation Level</p> */}
                        <p>Submission Date</p>
                      </div>
                      <div className={`${style.secondcoldata} ps-4`}>
                        <p>{draftData?.year}</p>
                        <p>{draftData ? draftData?.vb?.name : "No vb"}</p>
                        <p>{draftData?.reporting_tools}</p>
                        <p>
                          {moment(draftData?.createdAt).format("Do MMMM YYYY")}
                        </p>
                      </div>
                    </Col>
                    <Col className="d-flex flex-column pt-2">
                      <h6>Emissions Report</h6>
                      <div className={style.divforborder}>
                        <Col className="d-flex justify-content-between">
                          <span className="opacity-50 cross-check-text d-flex align-items-center">
                            <IoMdDocument />
                            {draftData?.file_name}
                          </span>
                          <span>
                            <Link
                              className="btn-get-started mx-3 cross-check-text d-flex align-items-center "
                              onClick={() => {
                                handleFileDownload(draftData?.file_name);
                              }}
                            >
                              <AiOutlineDownload />
                              Download
                            </Link>
                          </span>
                        </Col>
                      </div>
                    </Col>
                    <Col className="d-flex flex-column pt-4">
                      <h6>Consent file</h6>
                      <div className={style.divforborder}>
                        <Col className="d-flex justify-content-between">
                          <span className="opacity-50 cross-check-text d-flex align-items-center cross-check-text">
                            <IoMdDocument />
                            {draftData?.consent_file}
                          </span>
                          <span>
                            <Link
                              className="btn-get-started mx-3 cross-check-text d-flex align-items-center"
                              onClick={() => {
                                handleFileDownload(draftData?.consent_file);
                              }}
                            >
                              <AiOutlineDownload />
                              Download
                            </Link>
                          </span>
                        </Col>
                      </div>
                    </Col>
                  </Form.Group>
                </Form>
                {draftData?.description != "null" && (
                  <Col sm={12} className=" pt-1">
                    <Col className="pt-3">
                      <h6>Remarks:</h6>
                      <p className="text-secondary">{draftData?.description}</p>
                    </Col>
                  </Col>
                )}
              </Col>

              <Col md={6}></Col>
            </Row>
            <Row className="my-4">
              <Col md={{ offset: 7, span: 4 }} className="d-flex gap-3 ">
                <CreateButton
                  background="rgba(255, 255, 255, 1)"
                  color="black"
                  border="1px solid rgba(255, 255, 255, 1)"
                  title={"Cancel"}
                  onClick={() => setShowDraft(false)}
                />
                <CreateButton
                  title={"Send VB"}
                  onClick={() => setConfirmShow(true)}
                />
              </Col>
            </Row>
          </>
        )}
      </Container>

      {/* delete modal import from component folder  */}
      {showDelete && (
        <ModalDelete
          title="Delete"
          message="Are you sure you want to delete this Emissions Report?"
          note="Please note that this action is irreversible!"
          handleClose={() => setShowDelete(false)}
          handleDelete={handleDeleteDraft}
        />
      )}
      {/* confirm modal import from component folder  */}
      {confirmShow && (
        <ModalConfirm
          title="Confirm"
          message="Are you certain you want to send this Emissions Report to the Verification Body?"
          note="No further modifications will be possible!"
          handleClose={() => setConfirmShow(false)}
          handleClick={handleSendToVb}
        />
      )}
    </>
  );
};

export default ViewDraft;
