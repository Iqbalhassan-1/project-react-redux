import React, { useState } from "react";
import { AiOutlineInbox } from "react-icons/ai";
import { Button, Modal, Form, Row, Col, Container } from "react-bootstrap";
import "./NewEMPsModal.css";

const NewEMPsModal = ({ showModal, setShowModal }) => {
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
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="px-4">Emissions Monitoring Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Col className="px-4 pt-2">
                <Form.Label>
                  <span
                    style={{
                      color: "red",
                      display: "inline-block",
                      marginRight: "5px",
                    }}
                  >
                    *
                  </span>

                  <span>Version</span>
                </Form.Label>
                <Form.Select>
                  <option disabled selected value="">
                    Select ER Generation Method
                  </option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Form.Select>
              </Col>
              <Col className="px-4 pt-2">
                <Form.Label>
                  <span
                    style={{
                      color: "red",
                      display: "inline-block",
                      marginRight: "5px",
                    }}
                  >
                    *
                  </span>
                  <span>Year</span>
                </Form.Label>
                <Form.Select>
                  <option disabled selected value="">
                    Select ER Generation Method
                  </option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Form.Select>
              </Col>
              <Form.Label className="px-4 pt-2">
                <span
                  style={{
                    color: "red",
                    display: "inline-block",
                    marginRight: "5px",
                  }}
                >
                  *
                </span>
                Upload EMP:
              </Form.Label>
              <Container id="drag-container">
                <Row>
                  {/* Dragfile Icon */}
                  <Col sm={4} className="drag-Icon ">
                    <AiOutlineInbox />
                  </Col>
                  {/* Drag and Drop */}
                  <Col sm={4} className="item">
                    Drag and Drop file here or
                    {/* Custom input type file */}
                    <span>
                      <label for="file-input" className="custom-file-input">
                        Choose file
                      </label>
                      <input id="file-input" type="file" />
                    </span>
                  </Col>
                </Row>
              </Container>
              <span className="modal-text d-flex justify-content-between px-4 ">
                <p>Supported formats: XLS, XLSX and CSV</p>
                <p>Maximum Size: 10MB</p>
              </span>
            </Form.Group>
            <Col className="px-4 pt-2">
              <Form.Label>
                <span className="text-danger">*</span>CERT Result File Upload
                (Optional)
              </Form.Label>

              <Form.Control type="file" />
              <span className="modal-text d-flex px-2 justify-content-between">
                <p>Supported formats: Docx, Doc, and Pdf</p>
                <p>Maximum Size: 5MB</p>
              </span>
            </Col>
            <Col className="px-4 pt-2">
              <Form.Label>
                <span className="text-danger">*</span>Other File Upload
                (Optional)
              </Form.Label>

              <Form.Control type="file" name="js" />
              <span className="modal-text d-flex px-2 justify-content-between ">
                <p>Supported formats: Docx, Doc, and Pdf</p>
                <p>Maximum Size: 5MB</p>
              </span>
            </Col>
          </Form>
          <Col sm={12} className="px-4 pt-1">
            {/* Comment area */}
            <Form>
              <Form.Group controlId="commentForm.ControlTextarea1">
                <Form.Label>
                  <span className="text-danger">*</span>Remarks:
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Add your Remarks"
                  className="rounded-0"
                />
              </Form.Group>
              <span className="modal-text d-flex justify-content-end">
                <p>Maximum Size: 10MB</p>
              </span>
            </Form>
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="light"
            onClick={() => setShowModal(false)}
            className="border border-secondary"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!selectedFile}
          >
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewEMPsModal;
