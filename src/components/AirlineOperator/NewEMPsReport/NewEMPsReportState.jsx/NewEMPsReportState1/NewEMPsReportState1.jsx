import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDownload } from "react-icons/ai";
import { IoMdDocument } from "react-icons/io";
import { Button, Modal, Form, Row, Col, Container } from "react-bootstrap";
import "./NewEMPsReportState1";
import { useSelector } from "react-redux";
import Pending from "../../../../Status/Pending";
const NewEMPsReportState1 = ({ modalState1, setModalState1 }) => {
  //getting excel data redux store
  const excelData = useSelector((state) => state?.excel?.excelData);

  console.log("excel data", excelData);

  const [selectedFile, setSelectedFile] = useState(null);

  //checkbox
  const [isChecked, setIsChecked] = useState(false); // set initial state of checkbox to unchecked

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked); // update state of checkbox
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the selected file
  };

  return (
    <div>
      <Modal show={modalState1} onHide={() => setModalState1(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="px-4">Emissions Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Col className="px-4 pt-2 d-flex">
                <div className="cross-check-info">
                  <p>Year</p>
                  <p>Verification body</p>
                  <p>Report Method</p>
                  <p>Aggregation Level</p>
                  <p>Submission Date</p>
                  <p>Status</p>
                </div>
                <div className="ps-4 cross-check-text">
                  <p>{excelData.length ? excelData[5]["1"] : ""}</p>
                  <p>Angoloa</p>
                  <p>{excelData.length ? excelData[60]["1"] : ""}</p>
                  <p className="text-capitalize">
                    {excelData.length ? excelData[167]["1"] : ""}
                  </p>

                  {/* <p>Angoloa</p>
                  <p>{!excelData ? "" : excelData[60]["1"]}</p>
                  <p className="text-capitalize">
                    {!excelData ? "" : excelData[167]["1"]}
                  </p> */}
                  <p>Mar 02, 2023</p>
                  <p>
                    <Pending />
                  </p>
                </div>
              </Col>
              <Col className="d-flex flex-column px-4 pt-2">
                <h6>Verified Emissions Report</h6>
                <div className="custom-border">
                  <Col className="d-flex justify-content-between">
                    <span className="opacity-50 cross-check-text d-flex align-items-center">
                      <IoMdDocument />
                      Verified Emissions Report.xlsx
                    </span>
                    <span>
                      <Link className="btn-get-started mx-3 cross-check-text d-flex align-items-center ">
                        <AiOutlineDownload />
                        Download
                      </Link>
                    </span>
                  </Col>
                </div>
              </Col>

              <Col className="d-flex flex-column px-4 pt-4">
                <h6>Verification Report</h6>
                <div className="custom-border">
                  <Col className="d-flex justify-content-between">
                    <span className="opacity-50 cross-check-text d-flex align-items-center cross-check-text">
                      <IoMdDocument />
                      Verification Report.pdf
                    </span>
                    <span>
                      <Link className="btn-get-started mx-3 cross-check-text d-flex align-items-center">
                        <AiOutlineDownload />
                        Download
                      </Link>
                    </span>
                  </Col>
                </div>
              </Col>
            </Form.Group>
          </Form>

          <Col sm={12} className="px-4 pt-1">
            <Col className="pt-3">
              <Form.Label>
                <span className="text-danger"></span> Remarks:
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Add Your Remarks"
              />
            </Col>
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <div className="px-4 d-flex ">
            <div>
              <Button
                variant="light"
                onClick={() => setModalState1(false)}
                className="border border-secondary  rounded-0"
              >
                Cancel
              </Button>
            </div>
            <div className="ps-2">
              <Button
                // variant={isChecked ? `primary` : `light`}
                onClick={() => setModalState1(false)}
                className="border border-secondary   rounded-0"
                // disabled={!isChecked}
                style={{ backgroundColor: "#1890FF" }}
              >
                Send to SA
              </Button>
            </div>
          </div>

          {/* <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!selectedFile}
          >
            Submit to VB
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewEMPsReportState1;
