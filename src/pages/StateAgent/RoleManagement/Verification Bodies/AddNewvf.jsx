import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Modal, Row, Form, Alert } from "react-bootstrap";
import web from "../../../../assets/images/web.png";
import "./addnewvf.css";
import CreateButton from "../../../../components/CreateButton/CreateButton";
import { BsExclamationTriangleFill } from "react-icons/bs";
const AddNewvf = ({
  showAddVerification,
  setShowAddVerification,
  modalFormDataVb,
  setModalFormDataVb,
  isEditVb,
  handleOnChangeVb,
  handleSubmitVb,
  error,
}) => {
  const myFormControlRef = useRef(null);
  useEffect(() => {
    if (myFormControlRef.current) {
      myFormControlRef.current.focus();
    }
  }, []);
  const handleCloseModal = () => {
    setShowAddVerification(false);
    setModalFormDataVb({
      vbName: "",
      email: "",
      password: "",
    });
  };
  const { vbName, email, password } = modalFormDataVb;

  return (
    <>
      <Modal show={showAddVerification} onHide={handleCloseModal} centered>
        <Modal.Header
          closeButton
          style={{ border: "none" }}
          className="d-flex justify-content-center align-items-center mx-3"
        >
          <Modal.Title>
            {isEditVb ? "Edit Verification Body" : "Add New Verification Body "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col id="verificationBodyMain">
                <Form onSubmit={handleSubmitVb}>
                  <Form.Label className="d-flex align-items-center gap-1">
                    <img src={web} alt="" />
                    <span className="forlabel">Verification Body Name</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="vbName"
                    placeholder="Enter Verification Body Name"
                    value={vbName}
                    onChange={handleOnChangeVb}
                    ref={myFormControlRef}
                  />
                  {error?.vbNameError && (
                    <Alert
                      variant="danger"
                      className="d-flex align-items-center p-1 mt-2"
                    >
                      <BsExclamationTriangleFill className="mr-2" size={16} />
                      <p className=" mb-0 fs-sm text-center ps-1">
                        {error?.vbNameError}
                      </p>
                    </Alert>
                  )}
                  <Form.Label className="d-flex align-items-center gap-1 mt-2">
                    <img src={web} alt="" />
                    <span className="forlabel">Email</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={handleOnChangeVb}
                  />
                  {error?.emailError && (
                    <Alert
                      variant="danger"
                      className="d-flex align-items-center p-1 mt-2"
                    >
                      <BsExclamationTriangleFill className="mr-2" size={16} />
                      <p className=" mb-0 fs-sm text-center ps-1">
                        {error?.emailError}
                      </p>
                    </Alert>
                  )}
                  <Form.Label className="d-flex align-items-center gap-1 mt-2">
                    <img src={web} alt="" />
                    <span className="forlabel">Password</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleOnChangeVb}
                    placeholder="Enter Password"
                  />
                </Form>
                {error?.passwordError && (
                  <Alert
                    variant="danger"
                    className="d-flex align-items-center p-1 mt-2"
                  >
                    <BsExclamationTriangleFill className="mr-2" size={16} />
                    <p className=" mb-0 fs-sm text-center ps-1">
                      {error?.passwordError}
                    </p>
                  </Alert>
                )}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer style={{ border: "none" }} className="mx-2">
          <div>
            <CreateButton
              background="rgba(255, 255, 255, 1)"
              color="black"
              border="1px solid rgba(255, 255, 255, 1)"
              title={"Cancel"}
              onClick={() => setShowAddVerification(false)}
            />
          </div>
          <div>
            <CreateButton
              title={isEditVb ? "Save Changes" : "Create"}
              type={"submit"}
              onClick={handleSubmitVb}
            />
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddNewvf;
