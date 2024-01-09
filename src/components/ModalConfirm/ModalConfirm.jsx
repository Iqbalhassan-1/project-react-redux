import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { AiOutlineCheckCircle } from "react-icons/ai";
import style from "./modalconfirm.module.css";
import CreateButton from "../CreateButton/CreateButton";

const ModalConfirm = ({ title, message, note, handleClose, handleClick }) => {
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
          <span className={style.iconspanc}>
            <AiOutlineCheckCircle size={25} />
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
          <CreateButton title={title} onClick={handleClick} />
        </Col>
      </Row>
      {/* </Modal.Footer> */}
    </Modal>
  );
};

export default ModalConfirm;
