import React, { useEffect, useState } from "react";
import { CloseButton, Col, Container, Row } from "react-bootstrap";
import { AiOutlineDownload } from "react-icons/ai";
import { IoMdDocument } from "react-icons/io";
import CreateButton from "../../../../../components/CreateButton/CreateButton";
import Pending from "../../../../../components/Status/Pending";
import ModalApprove from "../../../../../components/ModalApprove/ModalApprove";
import { useDispatch, useSelector } from "react-redux";
import Verified from "../../../../../components/Status/Verified";
import moment from "moment";
import handleFileDownload from "../../../../../utils/FileDownload";
import { crossCheck } from "../../../../../store/StateAgent/EmissionsReport/EmissionsReportSaSlice";
const CrossCheck = ({ setShowReport, OnSwitch }) => {
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);
  const [showApprove, setShowApprove] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [remarks, setRemarks] = useState("");
  useEffect(() => {}, [dispatch, showApprove]);
  const ViewEr = useSelector(
    (state) => state.emissionsReportSa.viewEmissionReportSa
  );
  console.log(ViewEr);
  // for remarks
  const descao = ViewEr?.description;
  const descvb = ViewEr?.vb_body;
  console.log(descvb);
  const wordsao = descao?.split(" ");
  const wordsvb = descvb?.split(" ");
  const MAX_WORDS = 20;
  const visibleTextao = wordsao?.slice(0, MAX_WORDS).join(" ");
  const visibleTextvb = wordsvb?.slice(0, MAX_WORDS).join(" ");
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const handleApprove = () => {
    dispatch(crossCheck(ViewEr?.id));
    setRemarks("");
    setShowApprove(false);
    setShowReport(true);
  };

  return (
    <Container fluid className="main-class">
      <Row className="d-flex align-items-center">
        <Col md={10}>
          <h4 className="py-3">Emissions Report</h4>
        </Col>
        <Col md={2} className="text-end d-flex justify-content-around ">
          {/* forediticon class in index.css  */}
          <CloseButton onClick={() => setShowReport(true)} />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className="pt-2 d-flex gap-5">
            <div className="text-secondary">
              <p>Aeroplane Operator</p>
              <p>Year</p>
              {/* <p>Submission Date</p> */}
              <p>Reporting Method</p>
              <p>Aggregation Level</p>
              <p className="pt-1">Verification Body</p>
            </div>
            <div>
              <p>{ViewEr?.user.name}</p>
              <p>{ViewEr?.year}</p>
              {/* <p>
                {" "}
                {moment(ViewEr?.vb_submit_to_caat_date).format("DD MMMM YYYY")}
              </p> */}

              <p>{ViewEr?.reporting_tools}</p>
              <p>State pair</p>

              <p>{ViewEr?.vb.name}</p>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <Col md={{ offset: 2, span: 8 }}>
            <div className="d-flex align-items-center justify-content-around text-secondary">
              <div>
                <p>Verification</p>
                <p>Cross Check</p>
                <p>Magnitude Check</p>
              </div>
              <div>
                <p>
                  {ViewEr?.vb_submit_to_caat === "Y" ? (
                    <Verified />
                  ) : (
                    <Pending />
                  )}
                </p>
                <p>
                  {ViewEr?.cross_check_status === "active" ? (
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
        {/* right columns start from here  */}
        {/* <Col md={6}>
          <Col md={{ offset: 2, span: 8 }}>
            <div className="d-flex align-items-center justify-content-around text-secondary">
              <div className="d-flex flex-column gap-1">
                <p>Verification</p>
                <p>Cross Check</p>
                <p>Magnitude Check</p>
              </div>
              <div className="d-flex flex-column gap-1">
                {ViewEr?.ao_submit_to_caat === "Y" &&
                ViewEr?.vb_submit_to_caat === "Y" ? (
                  <Verified />
                ) : (
                  <Pending />
                )}
                {ViewEr?.cross_check_status === "active" ? (
                  <Verified />
                ) : (
                  <Pending />
                )}
                <p>
                  <Pending />
                </p>
              </div>
            </div>
          </Col>
        </Col> */}
      </Row>
      {/* file div start from here  */}
      <Row>
        {ViewEr?.ao_submit_to_caat != null && (
          <Col md={6}>
            <div className="py-3">
              <h6>Verified Emissions Report (AO)</h6>
              <div className="d-flex justify-content-between py-2 px-2 border border-1">
                <span className="d-flex align-items-center text-secondary">
                  {" "}
                  <IoMdDocument className="mb-1" size={20} />
                  {ViewEr?.ao_submit_to_caat != null && `VER_${ViewEr?.year}`}
                </span>
                {ViewEr?.ao_submit_to_caat != null && ViewEr?.ver_ao_file && (
                  <span
                    className="d-flex align-items-center text-primary"
                    role="button"
                    tabIndex="0"
                    onClick={() => handleFileDownload(ViewEr?.file_name)}
                  >
                    {" "}
                    <AiOutlineDownload className="mb-1" size={20} />
                    Download
                  </span>
                )}
              </div>
            </div>
            <div className="py-3">
              <h6>Verification Report (AO)</h6>
              <div className="d-flex justify-content-between py-2 px-2 border border-1">
                <span className="d-flex align-items-center text-secondary">
                  {" "}
                  <IoMdDocument className="mb-1" size={20} />
                  {`VR_${ViewEr?.year}`}
                </span>
                <span
                  className="d-flex align-items-center text-primary"
                  role="button"
                  tabIndex="0"
                  onClick={() => handleFileDownload(ViewEr?.vr_ao_file)}
                >
                  {" "}
                  <AiOutlineDownload className="mb-1" size={20} />
                  Download
                </span>
              </div>
            </div>
            {descao != "" && (
              <div className="py-3">
                <h6>Aeroplan Operator Comments</h6>
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
        )}
        {ViewEr?.vb_submit_to_caat != null && (
          <Col md={6}>
            <div className="py-3">
              <h6>Verified Emissions Report (VB)</h6>
              <div className="d-flex justify-content-between py-2 px-2 border border-1">
                <span className="d-flex align-items-center text-secondary">
                  {" "}
                  <IoMdDocument className="mb-1" size={20} />
                  {`VER_${ViewEr?.year}`}
                </span>
                <span
                  className="d-flex align-items-center text-primary"
                  role="button"
                  tabIndex="0"
                  onClick={() => handleFileDownload(ViewEr?.ver_file_name)}
                >
                  {" "}
                  <AiOutlineDownload className="mb-1" size={20} />
                  Download
                </span>
              </div>
            </div>
            <div className="py-3">
              <h6>Verification Report (VB)</h6>
              <div className="d-flex justify-content-between py-2 px-2 border border-1">
                <span className="d-flex align-items-center text-secondary">
                  {" "}
                  <IoMdDocument className="mb-1" size={20} />
                  {`VER_${ViewEr?.year}`}
                </span>
                <span
                  className="d-flex align-items-center text-primary"
                  role="button"
                  tabIndex="0"
                  onClick={() => handleFileDownload(ViewEr?.vr_file_name)}
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
      {ViewEr?.ao_submit_to_caat && ViewEr?.cross_check_status == null && (
        <Row className="my-4">
          <Col md={{ offset: 7, span: 5 }} className="d-flex gap-3 ">
            <CreateButton
              background="#ff4d4f"
              color="white"
              border="1px solid #ff4d4f"
              title={"Reject Cross Check"}
              onClick={() => setShowReject(true)}
            />

            <CreateButton
              type={"button"}
              background="#389e0d"
              color="white"
              border="1px solid #389e0d"
              title={"Cross Check"}
              disabled={ViewEr && ViewEr?.cross_check_status === "Y"}
              onClick={() => setShowApprove(true)}
            />
          </Col>
        </Row>
      )}

      {ViewEr?.cross_check_status === "Y" ? (
        <Row className="my-4">
          <Col md={{ offset: 8, span: 3 }} className="d-flex">
            {/* if cross check done then show magnitude check button  */}
            <CreateButton
              background="var(--primary)"
              color="white"
              border="1px solid var(--primary)"
              title={"Magnitude Check"}
              onClick={() => OnSwitch()}
            />
          </Col>
        </Row>
      ) : (
        ""
      )}
      {showApprove && (
        <ModalApprove
          title="Cross Check Approval"
          value={remarks}
          setValue={(e) => {
            setRemarks(e.target.value);
          }}
          handleClose={() => setShowApprove(false)}
          showApprove={true}
          showReject={false}
          handleApprove={handleApprove}
        />
      )}
      {showReject && (
        <ModalApprove
          title="Cross Check Rejection"
          value={remarks}
          setValue={setRemarks}
          handleClose={() => setShowReject(false)}
          showApprove={false}
          showReject={true}
          handleReject={() => alert("Rejected")}
        />
      )}
    </Container>
  );
};

export default CrossCheck;
