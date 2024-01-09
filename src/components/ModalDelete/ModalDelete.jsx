import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
import style from "./delete.module.css";
import { CgDanger } from "react-icons/cg";
import CreateButton from "../CreateButton/CreateButton";
const ModalDelete = ({ title, message, note, handleClose, handleDelete }) => {
  return (
    <Modal
      show={true}
      onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="d-flex align-items-center gap-2">
          <span className={style.iconspanr}>
            <CgDanger size={25} />
          </span>
          <h6>Confirm action</h6>
        </div>

        <p className={style.paragraph}>{message}</p>
        {note && (
          <small className={style.smalltag}>
            <span className="text-danger mx-1">*</span>
            {note}
          </small>
        )}
      </Modal.Body>
      {/* <Modal.Footer className="border-0"> */}
      <Row className="m-3">
        <Col className="d-flex gap-3 " md={{ offset: 4, span: 8 }}>
          <CreateButton
            background="rgba(255, 255, 255, 1)"
            color="black"
            border="1px solid rgba(255, 255, 255, 1)"
            title={"Cancel"}
            onClick={handleClose}
          />
          <CreateButton
            background="#FF4D4F"
            border="1px solid  #FF4D4F"
            color="white"
            title={title}
            onClick={handleDelete}
          />
        </Col>
      </Row>
      {/* </Modal.Footer> */}
    </Modal>
  );
};

export default ModalDelete;
