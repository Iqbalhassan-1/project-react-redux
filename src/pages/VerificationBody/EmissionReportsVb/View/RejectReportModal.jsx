import React, { useState } from "react";
import { AiOutlineInbox } from "react-icons/ai";
import { Button, Modal, Form, Row, Col, Container } from "react-bootstrap";
import CreateButton from "../../../../components/CreateButton/CreateButton";
// import "./NewEMPsModal.css";

const RejectReportModal = ({ showReject, setShowReject }) => {
  //   const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the selected file
  };

  return (
    <div>
      <Modal show={showReject} onHide={() => setShowReject(false)}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="px-4">Emission Report Rejection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Col className="px-4 pt-2">
              <Form.Label>Upload File (Optional)</Form.Label>

              <Form.Control type="file" name="js" />
              <span className="modal-text d-flex px-2 justify-content-between text-secondary ">
                <p>Supported formats:Docs, Pdf</p>
                <p>Maximum Size: 5MB</p>
              </span>
            </Col>
          </Form>
          <Col sm={12} className="px-4 pt-1">
            {/* Comment area */}
            <Form>
              <Form.Group controlId="commentForm.ControlTextarea1">
                <Form.Label>
                  <span className="text-danger">*</span>Remarks
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Add comments"
                  className="rounded-1"
                />
              </Form.Group>
              <span className="modal-text d-flex justify-content-end text-secondary">
                <p>0/100</p>
              </span>
            </Form>
          </Col>
        </Modal.Body>
        <Row className="mb-3 mx-2">
          <Col className="d-flex gap-3 " md={{ offset: 4, span: 8 }}>
            <CreateButton
              background="rgba(255, 255, 255, 1)"
              color="black"
              border="1px solid rgba(255, 255, 255, 1)"
              title={"Cancel"}
              onClick={() => setShowReject(false)}
            />
            <CreateButton
              background="#ff4d4f"
              color="white"
              border="1px solid #ff4d4f"
              title={"Reject"}
              onClick={handleSubmit}
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default RejectReportModal;
