import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDownload, AiOutlineInbox } from "react-icons/ai";
import { IoMdDocument } from "react-icons/io";
import { Button, Modal, Form, Row, Col, Container } from "react-bootstrap";
import "./CrossCheckingModal.css";
import Pending from "../../Status/Pending";
import CrossCheckStatus from "../../Status/CrossCheckPending";

const CrossCheckingModal = ({ show, setShow }) => {
  //   const [showModal, setShowModal] = useState(false);
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
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="px-4">Cross Check</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Col className="px-4 pt-2 d-flex">
                <div className="cross-check-info">
                  <p>Operator Name</p>
                  <p>Attribution State</p>
                  <p>Year</p>
                  <p>Date</p>
                  <p>Cross Check Status</p>
                </div>
                <div className="ps-4 cross-check-text">
                  <p>TAAG Angola Airlines</p>
                  <p>Angoloa</p>
                  <p>2020</p>
                  <p>Mar 02, 2023</p>
                  <p>
                    <CrossCheckStatus />
                  </p>
                </div>
              </Col>
              <Col className="d-flex flex-column px-4 pt-2">
                <h6>Aeroplane Operator VER & VR</h6>
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

              <Col className="px-4 pt-2">
                <h6>Remarks</h6>
                <p className="opacity-50 remarks-text">
                  We are committed to reduce our emissions from international
                  flights in order to meet the guidelines by CORSIA and{" "}
                  <span className="text-primary"> ...see more</span>
                </p>
              </Col>
              <Col className="d-flex flex-column px-4 pt-4">
                <h6>Verification Body VER & VR</h6>
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
              <Col className="px-4 pt-2">
                <h6>Remarks</h6>
                <p className="opacity-50 remarks-text">
                  We have completed the verification process according to the
                  guidelines provided by ICAO document Annex 16. We have tried
                  our best to <span className="text-primary"> ...see more</span>
                </p>
              </Col>
            </Form.Group>
          </Form>

          <Col sm={12} className="px-4 pt-1">
            {/* Comment area */}
            {/* <Form>
              <Form.Group controlId="commentForm.ControlTextarea1">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Add a comment"
                  className="rounded-0"
                />
              </Form.Group>
              <span className="modal-text d-flex justify-content-end">
                <p>Maximum Size: 10MB</p>
              </span>
            </Form> */}
            <Col className="d-flex pt-2">
              <div
                style={{
                  color: "red",
                  display: "inline-block",
                  marginRight: "5px",
                }}
              >
                *
              </div>
              <Form.Check
                type="checkbox"
                label="All the information is synchronized"
                className="custom-label"
                checked={isChecked} // set the initial state of the checkbox
                onChange={handleCheckboxChange} // handle changes to the checkbox state
              />
            </Col>
            <Col className="pt-3">
              <Form.Label>
                <span className="text-danger"></span>Your Remarks:
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Add Your Remarks"
              />
            </Col>
          </Col>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <div className="d-flex justify-content-between">
            <div>
              <Button
                // variant={isChecked ? "danger" : "light"}
                onClick={() => setShow(false)}
                className="border border-secondary  rounded-0"
                disabled={!isChecked}
              >
                Notify AO
              </Button>
            </div>
            <div className="px-2">
              <Button
                // variant={isChecked ? `primary` : `light`}
                onClick={() => setShow(false)}
                className="border border-secondary   rounded-0"
                disabled={!isChecked}
                style={{ backgroundColor: isChecked ? "#1890FF" : "#D9D9D9" }}
              >
                Approve
              </Button>
            </div>
          </div>
          <div>
            <Button
              variant="light"
              onClick={() => setShow(false)}
              className="border border-secondary  rounded-0"
            >
              Cancel
            </Button>
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

export default CrossCheckingModal;
