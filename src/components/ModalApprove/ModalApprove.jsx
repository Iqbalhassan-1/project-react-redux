import React from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import CreateButton from "../CreateButton/CreateButton";

const ModalApprove = ({
  title,
  handleClose,
  value,
  setValue,
  showApprove,
  showReject,
  handleReject,
  handleApprove,
}) => {
  return (
    <div>
      <Modal show={true} onHide={handleClose} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="px-4">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col sm={12} className="px-4 pt-1">
            {/* Comment area */}
            <Form>
              <Form.Group controlId="commentForm.ControlTextarea1">
                <Form.Label>Remarks (Optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Add comments"
                  className="rounded-1"
                  value={value}
                  onChange={setValue}
                />
              </Form.Group>
              <span className="opacity-50 d-flex justify-content-end pt-1">
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
            {showApprove && (
              <CreateButton
                type={"submit"}
                title={"Approve"}
                onClick={handleApprove}
              />
            )}
            {showReject && (
              <CreateButton
                background="#dc3545"
                color="white"
                border="1px solid #dc3545"
                title={"Reject"}
                onClick={handleReject}
              />
            )}
          </Col>
        </Row>
      </Modal>
    </div>
  );
};
export default ModalApprove;
