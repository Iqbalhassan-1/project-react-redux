import React from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import CreateButton from "../../../../../components/CreateButton/CreateButton";

const ApproveMc = ({ approve, setApprove }) => {
  const handleClose = () => {
    setApprove(!approve);
  };
  return (
    <div>
      <Modal show={approve} onHide={handleClose} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="px-4">Magnitude Check Approval</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col sm={12} className="px-4 pt-1">
            <p className="text-wrap">
              You are currently approving Cross Check for this Emissions Report,
              which means that the data from Form M and Form C is being
              synchronized with that of the Emissions Report.
            </p>
            {/* Comment area */}
            <Form>
              <Form.Group controlId="commentForm.ControlTextarea1">
                <Form.Label>Remarks (Optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Add comments"
                  className="rounded-1"
                />
              </Form.Group>
              <span className="modal-text d-flex justify-content-end">
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
              onClick={handleClose}
            />

            <CreateButton
              type={"submit"}
              background="#389e0d"
              color="white"
              border="1px solid #389e0d"
              title={"Approve"}
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default ApproveMc;
