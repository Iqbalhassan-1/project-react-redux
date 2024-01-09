import React, { useState } from "react";
import CreateButton from "../../../../components/CreateButton/CreateButton";
import { CloseButton, Col, Container, Form, Row } from "react-bootstrap";
import { IoMdDocument } from "react-icons/io";
import { AiOutlineDownload } from "react-icons/ai";
import Verified from "../../../../components/Status/Verified";
import VerifyReportModal from "./VerifyReportModal";
import RejectReportModal from "./RejectReportModal";
import Pending from "../../../../components/Status/Pending";
import { BASE_URL } from "../../../../config/Constants";
import moment from "moment";
import { RiDeleteBin6Fill } from "react-icons/ri";
import ModalDelete from "../../../../components/ModalDelete/ModalDelete";
import { useSelector } from "react-redux";

const ViewEmissionReportsVb = ({ setShowEmission }) => {
  const [showMore, setShowMore] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const veiwData = useSelector((state) => state.emissionsReportVb.veiwVbReport);
  console.log(veiwData);

  // for remarks
  const descao = veiwData?.description;
  const descvb = veiwData?.vb_body;
  const wordsao = descao?.split(" ");
  const wordsvb = descvb?.split(" ");
  const MAX_WORDS = 20;
  const visibleTextao = wordsao?.slice(0, MAX_WORDS).join(" ");
  const visibleTextvb = wordsvb?.slice(0, MAX_WORDS).join(" ");

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  //   //file handle
  const handleFileDownload = (file) => {
    console.log(file);
    window.location.href = `${BASE_URL}${file}`;
  };
  return (
    <Container fluid>
      <Row className="d-flex align-items-center">
        <Col md={10}>
          <h4>Emissions Report</h4>
        </Col>

        <Col md={2} className="text-end d-flex justify-content-around ">
          {/* forediticon class in index.css  */}
          {/* {veiwData.vb_submit_to_caat === null && (
            <div className="d-flex align-items-center forediticon">
              <RiDeleteBin6Fill
                className="mb-1"
                onClick={() => setShowDelete(true)}
              />
            </div>
          )} */}

          <CloseButton onClick={() => setShowEmission(false)} />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className="pt-2 d-flex gap-5">
            <div className="text-secondary">
              <p>Aeroplane Operator</p>
              {/* <p>Attribution State</p> */}
              <p>Year</p>
              <p>Submission Date</p>
            </div>
            <div>
              <p>{veiwData.user.name}</p>
              {/* <p>Ethiopia</p> */}
              <p>{veiwData.year}</p>
              <p>{moment(veiwData.createdAt).format("DD MMMM YYYY")}</p>
            </div>
          </div>
        </Col>
        {/* right columns start from here  */}
        <Col md={6}>
          <Col md={{ offset: 2, span: 8 }}>
            <span className="d-flex  align-items-center justify-content-around mt-3 text-secondary">
              Current Status
              {veiwData.vb_submit_to_caat === "Y" ? <Verified /> : <Pending />}
            </span>
            <span className="d-flex  align-items-center justify-content-around pt-3 text-secondary">
              Approval/Rejection Date
              <small className="text-center text-dark">
                {veiwData.vb_submit_to_caat_date == null
                  ? "N/A"
                  : moment(veiwData.vb_submit_to_caat_date).format(
                      "Do MMMM YYYY"
                    )}
              </small>
            </span>
          </Col>
        </Col>
      </Row>
      {/* file div start from here  */}
      <Row>
        <Col md={6}>
          <div className="py-3">
            <h6>Emissions Report</h6>
            <div className="d-flex justify-content-between py-2 px-2 border border-1">
              <span className="d-flex align-items-center text-secondary">
                {" "}
                <IoMdDocument className="mb-1" size={20} />
                {veiwData.file_name}
              </span>
              <span
                className="d-flex align-items-center text-primary"
                role="button"
                tabIndex="0"
                onClick={() => handleFileDownload(veiwData.file_name)}
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
                {veiwData.consent_file}
              </span>
              <span
                className="d-flex align-items-center text-primary"
                role="button"
                tabIndex="0"
                onClick={() => handleFileDownload(veiwData.consent_file)}
              >
                {" "}
                <AiOutlineDownload className="mb-1" size={20} />
                Download
              </span>
            </div>
          </div>
          {descao != "null" && (
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
        {veiwData.vb_submit_to_caat === "Y" && (
          <Col md={6}>
            <div className="py-3">
              <h6>Verified Emissions Report</h6>
              <div className="d-flex justify-content-between py-2 px-2 border border-1">
                <span className="d-flex align-items-center text-secondary">
                  {" "}
                  <IoMdDocument className="mb-1" size={20} />
                  {veiwData.ver_file_name}
                </span>
                <span
                  className="d-flex align-items-center text-primary"
                  role="button"
                  tabIndex="0"
                  onClick={() => handleFileDownload(veiwData.ver_file_name)}
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
                  {veiwData.vr_file_name}
                </span>
                <span
                  className="d-flex align-items-center text-primary"
                  role="button"
                  tabIndex="0"
                  onClick={() => handleFileDownload(veiwData.vr_file_name)}
                >
                  {" "}
                  <AiOutlineDownload className="mb-1" size={20} />
                  Download
                </span>
              </div>
            </div>
            {descvb != "" && (
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
        )}
      </Row>
      {veiwData?.vb_submit_to_caat === null && (
        <Row className="my-4">
          <Col md={{ offset: 8, span: 2 }} className="d-flex gap-3 ">
            {/* <CreateButton
              background="#ff4d4f"
              color="white"
              border="1px solid #ff4d4f"
              title={"Reject"}
              onClick={() => setShowReject(true)}
            /> */}
            <CreateButton
              type={"button"}
              background="#389e0d"
              color="white"
              border="1px solid #389e0d"
              title={"Verify"}
              onClick={() => setShowVerify(true)}
            />
          </Col>
          {showVerify && (
            <VerifyReportModal
              showVerify={showVerify}
              setShowVerify={setShowVerify}
              veiwData={veiwData}
              setShowEmission={setShowEmission}
            />
          )}
          {showReject && (
            <RejectReportModal
              showReject={showReject}
              setShowReject={setShowReject}
            />
          )}
          {showDelete && (
            <ModalDelete
              title="Delete"
              message="Are you sure you want to delete this Emissions Report?"
              note="The Emissions report and it’s relevant data will be deleted!"
              handleClose={() => setShowDelete(false)}
              handleDelete={() => alert("Deleted api call here")}
            />
          )}
        </Row>
      )}
    </Container>
  );
};

export default ViewEmissionReportsVb;
