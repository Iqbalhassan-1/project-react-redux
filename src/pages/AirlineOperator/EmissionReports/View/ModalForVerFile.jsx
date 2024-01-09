import React, { useState } from "react";
import { Alert, Col, Form, Modal, Row } from "react-bootstrap";
import CreateButton from "../../../../components/CreateButton/CreateButton";
import { useDispatch, useSelector } from "react-redux";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { UploadVerAo } from "../../../../store/AirlineOperator/EmissionsReport/EmissionReportAOSlice";

const ModalForVerFile = ({ confirmShow, setConfirmShow, setShowReport }) => {
  const dispatch = useDispatch();

  const [verFile, setVerFile] = useState(null);
  const [vrFile, setVrFile] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState({
    verError: "",
    vrError: "",
  });

  const viewReportData = useSelector(
    (state) => state.emissionsReport?.emissionsData
  );
  console.log(viewReportData);
  //remarks
  const handleRemarksChange = (event) => {
    setRemarks(event.target.value);
  };
  //Verfied emission report

  const handleVerFileChange = (event) => {
    const file = event.target.files[0];
    setVerFile(file);
    setError((prevState) => ({
      ...prevState,
      verError: "",
    }));
  };
  //Verified report

  const handleVrFileChange = (event) => {
    const file = event.target.files[0];
    setVrFile(file);
    setError((prevState) => ({
      ...prevState,
      vrError: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formValid = true;
    if (verFile === null) {
      setError((prevState) => ({
        ...prevState,
        verError: "VER file is required",
      }));
      formValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        verError: "",
      }));
    }

    if (vrFile === null) {
      setError((prevState) => ({
        ...prevState,
        vrError: "VR file is required",
      }));
      formValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        vrError: "",
      }));
    }
    if (formValid) {
      const formData = new FormData();
      formData.append("ao_vr_file", vrFile);
      formData.append("ao_ver_file", verFile);
      formData.append("ao_comment", remarks);
      dispatch(UploadVerAo({ vbId: viewReportData.id, formData: formData }));
      setConfirmShow(false);
      setShowReport(false);
      //   setShowEmission(false);
    }
  };

  return (
    <div>
      <Modal show={confirmShow} onHide={() => setConfirmShow(false)}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="px-4">
            Emission Report Verification
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Col className="px-4">
              <Form.Label>
                <span className="text-danger ps-1">*</span>Upload Verified
                Emissions Report
              </Form.Label>
              <Form.Control
                type="file"
                onChange={handleVerFileChange}
                accept=".pdf "
              />
              <span className="modal-text d-flex px-2 justify-content-between text-secondary">
                <p>Supported formats:Pdf</p>
                <p>Maximum Size: 5MB</p>
              </span>
              {error?.verError && (
                <Alert
                  variant="danger"
                  className="d-flex align-items-center p-1 mt-2"
                >
                  <BsExclamationTriangleFill className="mr-2" size={16} />
                  <p className="mb-0 fs-sm text-center ps-1">
                    {error?.verError}
                  </p>
                </Alert>
              )}
            </Col>

            <Col className="px-4 pt-2">
              <Form.Label>
                <span className="text-danger">*</span>Upload Verification Report
              </Form.Label>
              <Form.Control
                type="file"
                onChange={handleVrFileChange}
                accept=".pdf "
              />
              <span className="modal-text d-flex px-2 justify-content-between text-secondary">
                <p>Supported formats:Pdf</p>
                <p>Maximum Size: 5MB</p>
              </span>
              {error?.vrError && (
                <Alert
                  variant="danger"
                  className="d-flex align-items-center p-1 mt-2"
                >
                  <BsExclamationTriangleFill className="mr-2" size={16} />
                  <p className="mb-0 fs-sm text-center ps-1">
                    {error?.vrError}
                  </p>
                </Alert>
              )}
            </Col>
          </Form>
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
                  value={remarks}
                  onChange={handleRemarksChange}
                />
              </Form.Group>
              <span className="modal-text d-flex justify-content-end">
                <p className="text-secondary">0/100</p>
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
              onClick={() => setConfirmShow(false)}
            />
            <CreateButton
              type={"submit"}
              color="white"
              title={"Confirm"}
              onClick={handleSubmit}
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default ModalForVerFile;
