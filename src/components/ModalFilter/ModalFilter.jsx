import React, { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import CreateButton from "../CreateButton/CreateButton";
import { IoCloseCircleOutline } from "react-icons/io5";
import style from "./modalfilter.module.css";

const ModalFilter = ({
  message,
  note,
  handleClose,
  handleApply,
  toState,
  stateYear,
}) => {
  const [filter, setFilter] = useState({
    year: "",
    subject_offset: "",
    state_pair: "",
  });

  const handleFilter = (e) => {
    setFilter((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <Modal
      show={true}
      onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="d-flex align-items-center justify-content-between gap-2">
          <h6>Filters</h6>
          <IoCloseCircleOutline
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={handleClose}
          />
        </div>

        <form>
          <div className={style.input_container}>
            <label className={style.input_label}>Year</label>
            <select
              name="year"
              className={style.input_field}
              onChange={handleFilter}
            >
              <option value="">Select Year</option>
              {stateYear?.map((datay) => (
                <option value={datay}>{datay}</option>
              ))}
            </select>
          </div>
          <div className={style.input_container}>
            <label className={style.input_label}>
              Subject to Offesting Requirements
            </label>
            <select
              name="subject_offset"
              className={style.input_field}
              onChange={handleFilter}
            >
              <option value="Both">Both</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className={style.input_container}>
            <label className={style.input_label}>State Pair</label>
            <select
              name="state_pair"
              className={style.input_field}
              onChange={handleFilter}
            >
              <option value="All">All</option>
              {toState.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </div>
        </form>

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
        <Col
          className="d-flex justify-content-end gap-3 "
          md={{ offset: 4, span: 8 }}
        >
          <CreateButton
            width="30%"
            onClick={() => {
              setFilter({
                year: "",
                subject_offset: "",
                state_pair: "",
              });
              handleApply(filter);
            }}
            title="Apply"
          />
        </Col>
      </Row>
      {/* </Modal.Footer> */}
    </Modal>
  );
};

export default ModalFilter;
