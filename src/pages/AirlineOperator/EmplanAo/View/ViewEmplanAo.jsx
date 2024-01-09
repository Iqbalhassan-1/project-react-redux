import React, { useState } from "react";
import CreateButton from "../../../../components/CreateButton/CreateButton";
import { CloseButton, Col, Container, Form, Row, Table } from "react-bootstrap";
import { IoMdDocument } from "react-icons/io";
import { AiOutlineDownload } from "react-icons/ai";
import Active from "../../../../components/Status/Active";
import { useSelector } from "react-redux";
import moment from "moment";
import handleFileDownload from "../../../../utils/FileDownload";
import Pending from "../../../../components/Status/Pending";

const ViewEmplanAo = ({ setShowEmplan }) => {
  const [showMore, setShowMore] = useState(false);
  const [showMoreSa, setShowMoreSa] = useState(false);
  const empData = useSelector((state) => state.emissionMonitoringPlan?.empData);
  console.log("empDraftData", empData);
  const aoDescription =
    empData?.description != null
      ? empData?.description
      : "No remarks added by the AO";
  const words = aoDescription.split(" ");
  const MAX_WORDS = 20;
  const visibleText = words.slice(0, MAX_WORDS).join(" ");

  const saDescription =
    empData?.remarks != null ? empData?.remarks : "No remarks added by SA";
  const saWords = saDescription.split(" ");
  const SA_MAX_WORDS = 20;
  const saVisibleText = saWords.slice(0, SA_MAX_WORDS).join(" ");

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  console.log(empData);

  const toggleShowMoreSa = () => {
    setShowMoreSa(!showMoreSa);
  };
  console.log(empData);

  return (
    <Container fluid>
      <Row className="d-flex align-items-center">
        <Col md={10}>
          <h4>Emissions Monitoring Plan</h4>
        </Col>
        {/* forediticon class in index.css  */}
        <Col
          md={2}
          className="text-end d-flex justify-content-around forediticon"
        >
          {/* <RiDeleteBin6Fill onClick={() => setShowModal(true)} /> */}
          <CloseButton onClick={() => setShowEmplan(false)} />
        </Col>
      </Row>
      <Row>
        {/* left column start from here  */}
        <Col md={6}>
          <div className="mt-3 d-flex gap-5">
            <div className="text-secondary">
              {empData?.monitoring_method != "CERT" && (
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
                        {empData?.year == 2019 || empData?.year == 2020
                          ? empData.monitoring_method
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>2020-2035</td>
                      <td>
                        {empData?.year >= 2021
                          ? empData?.monitoring_method
                          : ""}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              )}
              {empData?.monitoring_method == "CERT" && <p>Monitoring Method</p>}
              {empData?.monitoring_method == "CERT" && <p>Upload Date</p>}
            </div>
            <div>
              {empData?.monitoring_method == "CERT" && (
                <p>{empData?.monitoring_method}</p>
              )}
              {empData?.monitoring_method == "CERT" && (
                <p>{moment(empData?.createdAt).format("Do MMMM YYYY")}</p>
              )}
            </div>
          </div>
          {/* file div start from here  */}
          <div className="pb-2 pt-4">
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
                  handleFileDownload(empData?.file_name);
                }}
              >
                {" "}
                <AiOutlineDownload className="mb-1" size={20} />
                Download
              </span>
            </div>
          </div>
          {empData?.cert_file != "null" ? (
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
                    handleFileDownload(empData?.cert_file);
                  }}
                >
                  {" "}
                  <AiOutlineDownload className="mb-1" size={20} />
                  Download
                </span>
              </div>
            </div>
          ) : (
            ""
          )}
          {empData?.other_file != "null" ? (
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
                    handleFileDownload(empData?.other_file);
                  }}
                >
                  {" "}
                  <AiOutlineDownload className="mb-1" size={20} />
                  Download
                </span>
              </div>
            </div>
          ) : (
            ""
          )}
          {empData.description != "" && (
            <div className="py-2">
              <h6>Aeroplane Operator Comments</h6>
              <p>
                {showMore ? aoDescription : visibleText}
                {words.length > MAX_WORDS && (
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
        {/* right columns start from here  */}
        <Col md={6}>
          <Col md={{ offset: 2, span: 8 }}>
            <span className="d-flex  align-items-center justify-content-between mt-3 text-secondary">
              Current Status
              <div className="d-flex align-items-center justify-content-center">
                {empData?.sa_status === "pending" ? <Pending /> : <Active />}
              </div>
            </span>
            <span className="d-flex  align-items-center justify-content-between pt-3 text-se condary">
              Approval/Rejection Date
              <small className="text-center text-dark">Jul 11,2023</small>
            </span>
          </Col>
          {empData.remarks != null && (
            <Col md={10} className="pt-5 mx-3">
              <h6>State Authority Remarks</h6>
              <p>
                {showMoreSa ? saDescription : saVisibleText}
                {saWords.length > SA_MAX_WORDS && (
                  <b
                    onClick={toggleShowMoreSa}
                    className="text-primary px-2"
                    role="button"
                    tabIndex="0"
                  >
                    {showMoreSa ? "See Less" : "See More"}
                  </b>
                )}
              </p>
            </Col>
          )}{" "}
        </Col>
      </Row>
    </Container>
  );
};

export default ViewEmplanAo;
