import React, { useState } from "react";
import { CloseButton, Col, Container, Row } from "react-bootstrap";
import Pending from "../../../../components/Status/Pending";
import { IoMdDocument } from "react-icons/io";
import { AiOutlineDownload } from "react-icons/ai";
import CreateButton from "../../../../components/CreateButton/CreateButton";
import { RiDeleteBin6Fill } from "react-icons/ri";
import ModalDelete from "../../../../components/ModalDelete/ModalDelete";
import ModalApprove from "../../../../components/ModalApprove/ModalApprove";
import PendingApproval from "../../../../components/Status/PendingApproval";
import handleFileDownload from "../../../../utils/FileDownload";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { empApprove } from "../../../../store/StateAgent/EmissionMonitoringPlan/EmissionMonitoringPlanSaSlice";
import Active from "../../../../components/Status/Active";

const ViewEmplanSa = ({
  setShowEmplan,
  onSwitchToEmp,
  onSwitchToActiveEmp,
}) => {
  const dispatch = useDispatch();
  const [showMoreao, setShowMoreao] = useState(false);
  const [showMoresa, setShowMoresa] = useState(false);
  const [showApprove, setShowApprove] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [remarks, setRemarks] = useState("");
  console.log("remarks", remarks);
  //  view get data
  const viewdataa = useSelector(
    (state) => state.emissionMonitoringPlanSa.viewEmpSa
  );
  console.log("viewData", viewdataa);

  const descao = viewdataa?.description;
  const descsa = viewdataa?.remarks;
  const wordsao = descao?.split(" ");
  const wordssa = descsa?.split(" ");
  const MAX_WORDS = 12;
  const visibleTextao = wordsao?.slice(0, MAX_WORDS).join(" ");
  const visibleTextsa = wordssa?.slice(0, MAX_WORDS).join(" ");

  const toggleShowMoreao = () => {
    setShowMoreao(!showMoreao);
  };
  const toggleShowMoresa = () => {
    setShowMoresa(!showMoresa);
  };

  const handleApprove = () => {
    dispatch(empApprove({ empId: viewdataa.id, remarks: remarks }));
    setShowApprove(false);
    setRemarks("");
    onSwitchToActiveEmp();
  };

  console.log(remarks);
  return (
    <Container fluid className="main-class">
      <Row className="d-flex align-items-center">
        <Col md={10}>
          <h4 className="py-3">Emissions Monitoring Plan</h4>
        </Col>
        <Col md={2} className="text-end d-flex justify-content-around ">
          <div className="d-flex align-items-center forediticon">
            <RiDeleteBin6Fill
              className="mb-1"
              onClick={() => setShowDelete(true)}
            />
            {/* <span className="text-secondary">Delete</span> */}
          </div>

          <CloseButton
            onClick={() => {
              onSwitchToEmp();
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className="pt-2 d-flex gap-5">
            <div className="text-secondary">
              <p>Aeroplane Operator</p>
              {/* <p>ICAO Designator</p>
              <p>Attribution State</p> */}
              <p>Monitoring Method</p>
              <p>Submission Date</p>
            </div>
            <div>
              <p>{viewdataa?.user.name}</p>
              {/* <p>ETH</p>
              <p>Ethiopia</p> */}
              <p>{viewdataa?.monitoring_method}</p>
              <p>{moment(viewdataa?.createdAt).format("DD MMMM YYYY")}</p>
            </div>
          </div>
        </Col>
        {/* right columns start from here  */}
        <Col md={6}>
          <Col md={{ offset: 2, span: 8 }}>
            <div className="d-flex align-items-center justify-content-around text-secondary pt-2">
              <div>
                <p>Current Status</p>
                <p>
                  {viewdataa?.approve_date && <p>Approval/Rejection Date</p>}
                </p>

                <p> Last Updated</p>
              </div>
              <div>
                {viewdataa?.sa_status === "pending" ? (
                  <p className="d-flex">
                    <PendingApproval />
                  </p>
                ) : (
                  <p className="d-flex">
                    <Active />
                  </p>
                )}
                <p>
                  {viewdataa?.approve_date && (
                    <p>
                      {moment(viewdataa?.approve_data).format("DD MMMM YYYY")}
                    </p>
                  )}
                </p>

                <p>{moment(viewdataa?.updatedAt).format("DD MMMM YYYY")}</p>
              </div>
            </div>
          </Col>
        </Col>
      </Row>
      <Row>
        {/* left column start from here  */}
        <Col md={6}>
          <div className="py-2">
            <h6>Emissions Monitoring Plan</h6>
            <div className="d-flex justify-content-between py-2 px-2 border border-1">
              <span className="d-flex align-items-center text-secondary">
                {" "}
                <IoMdDocument className="mb-1" size={20} />
                {viewdataa?.file_name}
              </span>
              <span
                className="d-flex align-items-center text-primary"
                role="button"
                tabIndex="0"
                onClick={() => handleFileDownload(viewdataa?.file_name)}
              >
                {" "}
                <AiOutlineDownload className="mb-1" size={20} />
                Download
              </span>
            </div>
          </div>
          {viewdataa?.cert_file != "null" && (
            <div className="py-2">
              <h6>CERT File (Optional)</h6>
              <div className="d-flex justify-content-between py-2 px-2 border border-1">
                <span className="d-flex align-items-center text-secondary">
                  {" "}
                  <IoMdDocument className="mb-1" size={20} />
                  {viewdataa?.cert_file}
                </span>
                <span
                  className="d-flex align-items-center text-primary"
                  role="button"
                  tabIndex="0"
                  onClick={() => handleFileDownload(viewdataa?.cert_file)}
                >
                  {" "}
                  <AiOutlineDownload className="mb-1" size={20} />
                  Download
                </span>
              </div>
            </div>
          )}
          {viewdataa?.other_file != "null" && (
            <div className="py-2">
              <h6>Other File (Optional)</h6>
              <div className="d-flex justify-content-between py-2 px-2 border border-1">
                <span className="d-flex align-items-center text-secondary">
                  {" "}
                  <IoMdDocument className="mb-1" size={20} />
                  {viewdataa?.other_file}
                </span>
                <span
                  className="d-flex align-items-center text-primary"
                  role="button"
                  tabIndex="0"
                  // onClick={() => handleFileDownload(viewReportData.consent_file)}
                >
                  {" "}
                  <AiOutlineDownload className="mb-1" size={20} />
                  Download
                </span>
              </div>
            </div>
          )}
          {viewdataa?.description != "" && (
            <div className="py-3">
              <h6>Aeroplane Operator Comments</h6>
              <p className="text-secondary">
                {showMoreao ? descao : visibleTextao}
                {wordsao?.length > MAX_WORDS && (
                  <b
                    onClick={toggleShowMoreao}
                    className="text-primary px-2"
                    role="button"
                    tabIndex="0"
                  >
                    {showMoreao ? "See Less" : "See More"}
                  </b>
                )}
              </p>
            </div>
          )}
        </Col>
        {viewdataa?.sa_status !== "pending" ? (
          <Col md={{ offset: 1, span: 4 }}>
            <div className="py-3">
              <h6>State Authority Remarks</h6>
              <p className="text-secondary">
                {showMoresa ? descsa : visibleTextsa}
                {wordssa.length > MAX_WORDS && (
                  <b
                    onClick={toggleShowMoresa}
                    className="text-primary px-2"
                    role="button"
                    tabIndex="0"
                  >
                    {showMoresa ? "See Less" : "See More"}
                  </b>
                )}
              </p>
            </div>
          </Col>
        ) : (
          ""
        )}
      </Row>
      {viewdataa.sa_status == "pending" ? (
        <Row className="my-4">
          <Col md={{ offset: 9, span: 2 }} className="d-flex gap-3 ">
            {/* <CreateButton
              background="#ff4d4f"
              color="white"
              border="1px solid #ff4d4f"
              title={"Reject"}
              onClick={() => setShowReject(true)}
            /> */}
            <CreateButton
              type={"button"}
              title={"Approve"}
              onClick={() => setShowApprove(true)}
            />
          </Col>
          {showApprove && (
            <ModalApprove
              title={"Emissions Monitoring Plan Approval"}
              showApprove={true}
              showReject={false}
              handleClose={() => setShowApprove(false)}
              handleApprove={handleApprove}
              value={remarks}
              setValue={(e) => {
                setRemarks(e.target.value);
              }}
            />
          )}
          {showReject && (
            <ModalApprove
              title={"Emissions Monitoring Plan Rejection"}
              showApprove={false}
              showReject={true}
              handleClose={() => setShowReject(false)}
              handleReject={() => alert("Rejected")}
            />
          )}
          {showDelete && (
            <ModalDelete
              title="Delete"
              message="Are you sure you want to delete this Emissions Monitoring Plan?"
              note="*Please note that this action is irreversible!"
              handleClose={() => setShowDelete(false)}
              // handleDelete={handleDeleteDraft}
            />
          )}
        </Row>
      ) : (
        ""
      )}
    </Container>
  );
};

export default ViewEmplanSa;
