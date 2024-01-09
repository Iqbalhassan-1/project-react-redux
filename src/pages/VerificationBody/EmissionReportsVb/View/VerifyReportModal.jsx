import React, { useState } from "react";
import { AiOutlineInbox } from "react-icons/ai";
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  Container,
  Alert,
} from "react-bootstrap";
import CreateButton from "../../../../components/CreateButton/CreateButton";
import axios from "axios";
import { BASE_URL, UPLOAD_VB_FILES } from "../../../../config/Constants";
import makeToast from "../../../../config/Toaster";
import { useDispatch, useSelector } from "react-redux";
import { uploadVerAndVrFiles } from "../../../../store/VerificationBody/EmissionsReportVbSlice";
import { BsExclamationTriangleFill } from "react-icons/bs";
// import "./NewEMPsModal.css";

const VerifyReportModal = ({ showVerify, setShowVerify, setShowEmission }) => {
  const dispatch = useDispatch();

  const [verFile, setVerFile] = useState(null);
  const [vrFile, setVrFile] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState({
    verError: "",
    vrError: "",
  });
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const viewReportData = useSelector(
    (state) => state.emissionsReportVb?.veiwVbReport
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
      formData.append("vr_file_pdf", vrFile);
      formData.append("ver_file_pdf", verFile);
      formData.append("vb_comment", remarks);
      dispatch(
        uploadVerAndVrFiles({ vbId: viewReportData.id, formData: formData })
      );
      setShowVerify(false);
      setShowEmission(false);
    }
  };

  return (
    <div>
      <Modal show={showVerify} onHide={() => setShowVerify(false)}>
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
            <Col className="px-4 pt-2">
              <Form.Label>Upload Other File (Optional)</Form.Label>

              <Form.Control type="file" name="js" />
              <span className="modal-text d-flex px-2 justify-content-between text-secondary ">
                <p>Supported formats: Docs, Pdf</p>
                <p>Maximum Size: 5MB</p>
              </span>
            </Col>
            <Col className="px-4 pt-2">
              <Form.Group>
                <Form.Check
                  type="radio"
                  label="Verified as satisfactory"
                  name="radioOptions"
                  value="Verified as satisfactory"
                  checked={selectedOption === "Verified as satisfactory"}
                  onChange={handleOptionChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="radio"
                  label="Verified as satisfactory with comments"
                  name="radioOptions"
                  value="Verified as satisfactory with comments"
                  checked={
                    selectedOption === "Verified as satisfactory with comments"
                  }
                  onChange={handleOptionChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="radio"
                  label="Verfied as unsatisfactory"
                  name="radioOptions"
                  value="Verfied as unsatisfactory"
                  checked={selectedOption === "Verfied as unsatisfactory"}
                  onChange={handleOptionChange}
                />
              </Form.Group>
            </Col>
          </Form>
          {selectedOption === "Verified as satisfactory with comments" && (
            <Col sm={12} className="px-4 pt-3">
              {/* Comment area */}
              <Form>
                <Form.Group controlId="commentForm.ControlTextarea1">
                  <Form.Label>Conclusion</Form.Label>
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
          )}
        </Modal.Body>
        <Row className="mb-3 mx-2">
          <Col className="d-flex gap-3 " md={{ offset: 4, span: 8 }}>
            <CreateButton
              background="rgba(255, 255, 255, 1)"
              color="black"
              border="1px solid rgba(255, 255, 255, 1)"
              title={"Cancel"}
              onClick={() => setShowVerify(false)}
            />
            <CreateButton
              type={"submit"}
              background="#389e0d"
              color="white"
              border="1px solid #389e0d"
              title={"Verify"}
              onClick={handleSubmit}
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default VerifyReportModal;
