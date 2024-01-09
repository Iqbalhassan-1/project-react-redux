import React, { useEffect, useRef } from "react";
import { Col, Container, Modal, Row, Form, Alert } from "react-bootstrap";
import web from "../../../../assets/images/web.png";
import "./addnewmodal.css";
import CreateButton from "../../../../components/CreateButton/CreateButton";
import { BsExclamationTriangleFill } from "react-icons/bs";
const AddNewao = ({
  showAddOpertaor,
  setShowAddOperator,
  modalFormData,
  setModalFormData,
  isEdit,
  handleOnChange,
  handleSubmit,
  error,
}) => {
  const myFormControlRef = useRef(null);
  useEffect(() => {
    if (myFormControlRef.current) {
      myFormControlRef.current.focus();
    }
  }, []);

  const handleClose = () => {
    setShowAddOperator(false);
    setModalFormData({
      airlineName: "",
      email: "",
      password: "",
      icaoCode: "",
    });
  };

  const { airlineName, email, password, icaoCode } = modalFormData;

  return (
    <>
      <Modal show={showAddOpertaor} onHide={handleClose} centered>
        <Modal.Header
          closeButton
          style={{ border: "none" }}
          className="d-flex justify-content-center align-items-center mx-3"
        >
          <Modal.Title>
            {isEdit ? "Edit Aeroplane Operator" : "Add New Aeroplane Operator"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col id="mainnewao">
                <Form onSubmit={handleSubmit}>
                  <Form.Label className="d-flex align-items-center gap-1">
                    <img src={web} alt="" />
                    <span className="forlabelspan">
                      Aeroplane Operator Name
                    </span>
                  </Form.Label>
                  <Form.Control
                    className="search-input"
                    type="text"
                    name="airlineName"
                    value={airlineName}
                    onChange={handleOnChange}
                    placeholder="Enter Airline Name"
                    ref={myFormControlRef}
                  />
                  {error?.airlineNameError && (
                    <Alert
                      variant="danger"
                      className="d-flex align-items-center p-1 mt-2"
                    >
                      <BsExclamationTriangleFill className="mr-2" size={16} />
                      <p className=" mb-0 fs-sm text-center ps-1">
                        {error?.airlineNameError}
                      </p>
                    </Alert>
                  )}
                  <Form.Label className="d-flex align-items-center gap-1 mt-2">
                    <img src={web} alt="" />
                    <span className="forlabelspan">
                      Aeroplane Airline Code (ICAO code)
                    </span>
                  </Form.Label>
                  <Form.Control
                    className="search-input"
                    name="icaoCode"
                    value={icaoCode}
                    onChange={handleOnChange}
                    disabled={isEdit}
                    type="text"
                    placeholder="Enter Airline Code"
                  />
                  {error?.icaoCodeError && (
                    <Alert
                      variant="danger"
                      className="d-flex align-items-center p-1 mt-2"
                    >
                      <BsExclamationTriangleFill className="mr-2" size={16} />
                      <p className=" mb-0 fs-sm text-center ps-1">
                        {error?.icaoCodeError}
                      </p>
                    </Alert>
                  )}
                  <Form.Label className="d-flex align-items-center gap-1 mt-2">
                    <img src={web} alt="" />
                    <span className="forlabelspan">Email</span>
                  </Form.Label>
                  <Form.Control
                    className="search-input"
                    type="email"
                    value={email}
                    name="email"
                    onChange={handleOnChange}
                    placeholder="Enter Email"
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
                    <span className="forlabelspan">Password</span>
                  </Form.Label>
                  <Form.Control
                    className="search-input"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter Password"
                  />
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
                </Form>
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
              onClick={handleClose}
            />
          </div>
          <div>
            <CreateButton
              title={isEdit ? "Save Changes" : "Create"}
              type={"submit"}
              onClick={handleSubmit}
            />
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddNewao;
