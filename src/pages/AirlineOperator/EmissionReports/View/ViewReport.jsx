import React, { useState } from "react";
import { CloseButton, Col, Container, Form, Row } from "react-bootstrap";
import { AiOutlineDownload } from "react-icons/ai";
import { IoMdDocument } from "react-icons/io";
import Pending from "../../../../components/Status/Pending";
import Verified from "../../../../components/Status/Verified";
import { Link } from "react-router-dom";
import CreateButton from "../../../../components/CreateButton/CreateButton";
import style from "./view.module.css";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  AO_VERIFIED_DATA_SEND_TO_SA,
  BASE_URL,
} from "../../../../config/Constants";
import ModalConfirm from "../../../../components/ModalConfirm/ModalConfirm";
import axios from "axios";
import makeToast from "../../../../config/Toaster";
import handleFileDownload from "../../../../utils/FileDownload";
import ModalForVerFile from "./ModalForVerFile";
import CrossChecked from "../../../../components/Status/CrossChecked";

const ViewReport = ({ setShowReport }) => {
  const [confirmShow, setConfirmShow] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const reportData = useSelector(
    (state) => state.emissionsReport.emissionsData
  );
  console.log("veiw Report data", reportData);

  //handle send to sa
  // const handleSendToSa = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let jwtToken = localStorage.getItem("token");

  //     console.log(jwtToken);

  //     const headers = {
  //       Authorization: `Bearer ${jwtToken}`,
  //     };

  //     let erId = reportData.id;
  //     console.log(erId);
  //     const response = await axios.patch(
  //       `${BASE_URL + AO_VERIFIED_DATA_SEND_TO_SA}/ ${erId}`,
  //       null,
  //       {
  //         headers: headers,
  //       }
  //     );
  //     makeToast("success", response.data.message);
  //     console.log("ao sended to sa", response.data);
  //     setConfirmShow(false);
  //     setShowReport(false);
  //   } catch (error) {
  //     console.log("Error:", error);
  //   }
  // };

  const descao = reportData.description;
  const descvb = reportData.vb_body;
  const wordsao = descao?.split(" ");
  const wordsvb = descvb?.split(" ");
  const MAX_WORDS = 20;
  const visibleTextao = wordsao?.slice(0, MAX_WORDS).join(" ");
  const visibleTextvb = wordsvb?.slice(0, MAX_WORDS).join(" ");
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <Container>
        <Row className="d-flex align-items-center">
          <Col md={10}>
            <h4>Emissions Report</h4>
          </Col>

          <Col md={2} className="text-end d-flex justify-content-around ">
            {/* forediticon class in index.css  */}
            <CloseButton onClick={() => setShowReport(false)} />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div className="pt-2 d-flex gap-5">
              <div className="text-secondary">
                <p>Year</p>
                <p>Verification body</p>
                <p>Report Method</p>
                {/* <p>Aggregation Level</p> */}
                <p>Submission Date</p>
              </div>
              <div>
                <p>{reportData?.year}</p>
                <p>{reportData?.vb.name}</p>
                <p>{reportData?.reporting_tools}</p>
                <p>{moment(reportData?.createdAt).format("Do MMMM YYYY")}</p>
              </div>
            </div>
          </Col>{" "}
          {reportData.vb_submit_to_caat === "Y" ? (
            <Col md={6}>
              <Col md={{ offset: 2, span: 8 }}>
                <div className="d-flex align-items-center justify-content-around text-secondary">
                  <div>
                    <p>Verification Status</p>
                    <p>Crosscheck Status</p>
                    <p>OMC Status</p>
                  </div>
                  <div>
                    <p>
                      {reportData?.vb_submit_to_caat === "Y" ? (
                        <Verified />
                      ) : (
                        <Pending />
                      )}
                    </p>
                    <p>
                      {reportData?.cross_check_status === "active" ? (
                        <Verified />
                      ) : (
                        <Pending />
                      )}
                    </p>
                    <p>
                      <Pending />
                    </p>
                  </div>
                </div>
              </Col>
            </Col>
          ) : (
            ""
          )}
        </Row>

        <Row>
          <Col md={6}>
            <div className="py-3">
              <h6>Emissions Report</h6>
              <div className="d-flex justify-content-between py-2 px-2 border border-1">
                <span className="d-flex align-items-center text-secondary">
                  {" "}
                  <IoMdDocument className="mb-1" size={20} />
                  {reportData?.file_name}
                </span>
                <span
                  className="d-flex align-items-center text-primary"
                  role="button"
                  tabIndex="0"
                  onClick={() => {
                    handleFileDownload(reportData.file_name);
                  }}
                >
                  {" "}
                  <AiOutlineDownload className="mb-1" size={20} />
                  Download
                </span>
              </div>
            </div>
            <div className="py-3">
              <h6>Consent file</h6>
              <div className="d-flex justify-content-between py-2 px-2 border border-1">
                <span className="d-flex align-items-center text-secondary">
                  {" "}
                  <IoMdDocument className="mb-1" size={20} />
                  {reportData.consent_file}
                </span>
                <span
                  className="d-flex align-items-center text-primary"
                  role="button"
                  tabIndex="0"
                  onClick={() => {
                    handleFileDownload(reportData.consent_file);
                  }}
                >
                  {" "}
                  <AiOutlineDownload className="mb-1" size={20} />
                  Download
                </span>
              </div>
            </div>
            {reportData?.description != "null" && (
              <div className="py-3">
                <h6>Aeroplane Operator Comments</h6>
                <p className="text-secondary">
                  {showMore ? descao : visibleTextao}
                  {wordsao?.length > MAX_WORDS && (
                    <b
                      onClick={toggleShowMore}
                      className="text-primary px-2"
                      role="button"
                      tabIndex="0"
                    >
                      {showMore ? "See Less" : "See More"}
                    </b>
                  )}
                </p>
              </div>
            )}
          </Col>
          {reportData.vb_submit_to_caat === "Y" ? (
            <Col md={6}>
              <div className="py-3">
                <h6>Verified Emissions Report</h6>
                <div className="d-flex justify-content-between py-2 px-2 border border-1">
                  <span className="d-flex align-items-center text-secondary">
                    {" "}
                    <IoMdDocument className="mb-1" size={20} />
                    {reportData.ver_file_name}
                  </span>
                  <span
                    className="d-flex align-items-center text-primary"
                    role="button"
                    tabIndex="0"
                    onClick={() => {
                      handleFileDownload(reportData.ver_file_name);
                    }}
                  >
                    {" "}
                    <AiOutlineDownload className="mb-1" size={20} />
                    Download
                  </span>
                </div>
              </div>
              <div className="py-3">
                <h6>Verification Report</h6>
                <div className="d-flex justify-content-between py-2 px-2 border border-1">
                  <span className="d-flex align-items-center text-secondary">
                    {" "}
                    <IoMdDocument className="mb-1" size={20} />
                    {reportData.vr_file_name}
                  </span>
                  <span
                    className="d-flex align-items-center text-primary"
                    role="button"
                    tabIndex="0"
                    onClick={() => {
                      handleFileDownload(reportData.vr_file_name);
                    }}
                  >
                    {" "}
                    <AiOutlineDownload className="mb-1" size={20} />
                    Download
                  </span>
                </div>
              </div>
              {descvb !== "" && (
                <div className="py-3">
                  <h6>Verification Body Remarks</h6>
                  <p className="text-secondary">
                    {showMore ? descvb : visibleTextvb}
                    {wordsvb?.length > MAX_WORDS && (
                      <b
                        onClick={toggleShowMore}
                        className="text-primary px-2"
                        role="button"
                        tabIndex="0"
                      >
                        {showMore ? "See Less" : "See More"}
                      </b>
                    )}
                  </p>
                </div>
              )}
            </Col>
          ) : (
            ""
          )}
        </Row>

        {reportData.vb_submit_to_caat === "Y" ? (
          <>
            <Row className="my-4">
              <Col md={{ offset: 10, span: 2 }}>
                <CreateButton
                  title={
                    reportData?.ao_submit_to_caat === "Y"
                      ? "Already Sent"
                      : "Send SA"
                  }
                  onClick={() => setConfirmShow(true)}
                  disabled={reportData?.ao_submit_to_caat == "Y"}
                />
              </Col>
            </Row>
            {confirmShow && (
              <ModalForVerFile
                confirmShow={confirmShow}
                setConfirmShow={setConfirmShow}
                setShowReport={setShowReport}
              />
            )}
            {/* {confirmShow && (
              <ModalConfirm
                title={"Confirm"}
                message={
                  "Are you certain you want to send this Emissions Report to the State Authority?"
                }
                note={
                  " The Verified Emissions Report and Verification Report will be shared with them!"
                }
                handleClose={() => setConfirmShow(false)}
                handleClick={handleSendToSa}
              />
            )} */}
          </>
        ) : (
          ""
        )}
      </Container>
    </>
  );
};

export default ViewReport;
