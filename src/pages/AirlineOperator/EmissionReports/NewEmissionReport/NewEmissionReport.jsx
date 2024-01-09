import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, LIST_ALL_VB } from "../../../../config/Constants";
import axios from "axios";
import {
  setExcelSheet2Data,
  setExcelSheet5Data,
  setExcelSheet4Data,
  setExcelDataEmpty,
} from "../../../../store/AirlineOperator/EmissionsReport/ExcelDataAOSlice";
import * as XLSX from "xlsx";
import { CreateReportAo } from "../../../../store/AirlineOperator/EmissionsReport/EmissionReportAOSlice";
import { BsExclamationTriangleFill } from "react-icons/bs";
import CreateButton from "../../../../components/CreateButton/CreateButton";

const NewEmissionReport = ({
  showModal,
  setShowModal,
  setShowDraft,
  handleClick,
  onSwitchToDrafts,
}) => {
  const dispatch = useDispatch();

  //All Vb users
  const [allVbUsers, setAllVbUsers] = useState([]);
  console.log(allVbUsers);

  //Emission Report file
  const [emissionFile, setEmissionFile] = useState(null);
  console.log(emissionFile);
  //Consent file
  const [consentFile, setConsentFile] = useState(null);
  const [otherFile, setOtherFile] = useState(null);

  //error
  const [error, setError] = useState({
    vbError: "",
    emissionFileError: "",
    consentFileError: "",
    remarksError: "",
  });

  //Remarks
  const [remarks, setRemarks] = useState(null);

  //Verification body
  const [vb, setVb] = useState(null);
  console.log("Vbb Data ", vb);

  // Extract data from excel sheets
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setError((prevState) => ({
      ...prevState,
      emissionFileError: "", // Set the year error message to empty
    }));
    setEmissionFile(file);
    extractData(e);
  };
  const extractData = (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      let bstr = e.target.result;
      let workbook = XLSX.read(bstr, { type: "binary" });
      var sheet0 = workbook.Sheets[workbook.SheetNames[0]];
      var sheet1 = workbook.Sheets[workbook.SheetNames[1]];
      var sheet2 = workbook.Sheets[workbook.SheetNames[2]];
      var sheet3 = workbook.Sheets[workbook.SheetNames[3]];
      var sheet4 = workbook.Sheets[workbook.SheetNames[4]];
      var sheet5 = workbook.Sheets[workbook.SheetNames[5]];
      let data0 = XLSX.utils.sheet_to_json(sheet0, { header: 1 });
      let data1 = XLSX.utils.sheet_to_json(sheet1, { header: 1 });
      let data2 = XLSX.utils.sheet_to_json(sheet2, { header: 1 });
      let data3 = XLSX.utils.sheet_to_json(sheet3, { header: 1 });
      let data4 = XLSX.utils.sheet_to_json(sheet4, { header: 1 });
      let data5 = XLSX.utils.sheet_to_json(sheet5, { header: 1 });

      let mapData2 = data2.map((item) => item.map((item) => item));
      dispatch(setExcelSheet2Data(mapData2.slice(1)));
      let mapData4 = data4.map((item) => item.map((item) => item));
      dispatch(setExcelSheet4Data(mapData4.slice(1)));
      let mapData5 = data5.map((item) => item.map((item) => item));
      dispatch(setExcelSheet5Data(mapData5.slice(1)));
    };
    reader.readAsBinaryString(e.target.files[0]);
  };
  //geting Excel data from redux store
  const excelData = useSelector((state) => state?.excel?.excelData);

  console.log(excelData);
  //excel data of specif field assign into variables
  const year = excelData.length ? excelData[5]["1"] : "";
  console.log(year);
  const erGenerationMethod = excelData.length ? excelData[60]["1"] : "";
  const reportMethod = excelData.length ? excelData[167]["1"] : "";

  //geting Vb list
  useEffect(() => {
    getDataVb();
  }, []);

  const getDataVb = async () => {
    try {
      let jwtToken = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const response = await axios.get(BASE_URL + LIST_ALL_VB, {
        headers,
      });
      setAllVbUsers(response.data.data);
      console.log("response", response.data.data);
      console.log("alluservb", allVbUsers);
    } catch (error) {
      console.error(error);
    }
  };

  //Conset File
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setConsentFile(file);
    setError((prevState) => ({
      ...prevState,
      consentFileError: "", // Set the year error message to empty
    }));
    // setError(error.consentFileError, "");
  };
  const handleOtherFileChange = (event) => {
    const file = event.target.files[0];
    setOtherFile(file);
  };

  //Remarks

  const handleRemarksChange = (event) => {
    setRemarks(event.target.value);
  };

  //Verification Body
  const handleVerificationBody = (event) => {
    const userId = event.target.value;
    setVb(userId);
    setError((prevState) => ({
      ...prevState,
      vbError: "", // Set the year error message to empty
    }));
  };

  //handle hide
  const handleHide = () => {
    setShowModal(false);
    dispatch(setExcelDataEmpty([]));
  };

  //Upload files
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formValid = true;
    if (vb === null) {
      setError((prevState) => ({
        ...prevState,
        vbError: "Select verification body",
      }));
      formValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        vbError: "",
      }));
    }

    if (emissionFile === null) {
      setError((prevState) => ({
        ...prevState,
        emissionFileError: "Emissions report is required",
      }));
      formValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        emissionFileError: "",
      }));
    }

    if (consentFile === null) {
      setError((prevState) => ({
        ...prevState,
        consentFileError: "Consent file is required",
      }));
      formValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        consentFileError: "",
      }));
    }

    try {
      if (formValid) {
        let userData = localStorage.getItem("user");
        userData = JSON.parse(userData);
        const formData = new FormData();
        formData.append("air_code", userData.icao_code);
        formData.append("year", year);
        formData.append("reporting_tools", reportMethod);
        formData.append("file", emissionFile);
        formData.append("consent_file", consentFile);
        formData.append("other_file", otherFile);
        formData.append("description", remarks);
        formData.append("verification_body", vb);
        dispatch(CreateReportAo(formData));
        setShowModal(false);
        setShowDraft(true);
        onSwitchToDrafts();
        dispatch(setExcelDataEmpty([]));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* {!modalState1 ? ( */}
      <Modal show={showModal} onHide={handleHide}>
        <Modal.Header closeButton>
          <Modal.Title className="px-4">Emissions Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Col className="px-4 pt-2">
                <Form.Label>
                  <span className="text-danger">*</span>Verification Body
                </Form.Label>
                {allVbUsers && (
                  <Form.Select onChange={handleVerificationBody}>
                    <option>Select Verification Body</option>
                    {allVbUsers.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </Form.Select>
                )}
                {error?.vbError && (
                  <Alert
                    variant="danger"
                    className="d-flex align-items-center p-1 mt-2"
                  >
                    <BsExclamationTriangleFill className="mr-2" size={16} />
                    <p className=" mb-0 fs-sm text-center ps-1">
                      {error?.vbError}
                    </p>
                  </Alert>
                )}
              </Col>

              {excelData && excelData.length ? (
                <div>
                  <Col className="px-4 pt-2">
                    <Form.Group>
                      <Form.Label>
                        <span className="text-danger">*</span>Year
                      </Form.Label>
                      <Form.Control type="text" value={year} />
                    </Form.Group>
                  </Col>

                  <Col className="px-4 pt-3">
                    <Form.Group>
                      <Form.Label>
                        <span className="text-danger">*</span>ER Generation
                        Method
                      </Form.Label>
                      <Form.Control type="text" value={erGenerationMethod} />
                    </Form.Group>
                  </Col>
                  <Col className="px-4 pt-3">
                    <Form.Group>
                      <Form.Label>
                        <span className="text-danger">*</span>Report Method
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={reportMethod}
                        className="text-capitalize"
                      />
                    </Form.Group>
                  </Col>
                </div>
              ) : (
                ""
              )}
            </Form.Group>

            <Col className="px-4 pt-2">
              <Form.Label>
                <span className="text-danger">*</span>Upload Emissions Report
              </Form.Label>

              <Form.Control
                type="file"
                onChange={handleFileUpload}
                accept=".xlsx,.xls "
                disabled={emissionFile !== null}
              />
              <span className="modal-text d-flex justify-content-between">
                <p>Supported formats: xlsx</p>
                <p>Maximum Size: 5MB</p>
              </span>
              <span>
                {error?.emissionFileError && (
                  <Alert
                    variant="danger"
                    className="d-flex align-items-center p-1"
                  >
                    <BsExclamationTriangleFill className="mr-2" size={16} />
                    <p className=" mb-0 fs-sm text-center ps-1">
                      {error?.emissionFileError}
                    </p>
                  </Alert>
                )}
              </span>
            </Col>

            <Col className="px-4 pt-2">
              <Form.Label>
                <span className="text-danger">*</span>Upload Consent File
              </Form.Label>

              <Form.Control
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                // accept=".xlsx,.xls , docx"
              />
              <span className="modal-text d-flex justify-content-between">
                <p>Supported formats: Pdf</p>
                <p>Maximum Size: 5MB</p>
              </span>
              {error?.consentFileError && (
                <Alert
                  variant="danger"
                  className="d-flex align-items-center p-1"
                >
                  <BsExclamationTriangleFill className="mr-2" size={16} />
                  <p className=" mb-0 fs-sm text-center ps-1">
                    {error?.consentFileError}
                  </p>
                </Alert>
              )}
            </Col>

            <Col className="px-4 pt-2">
              <Form.Label>Other File (Optional)</Form.Label>

              <Form.Control
                type="file"
                onChange={handleOtherFileChange}
                // accept=".xlsx,.xls , docx"
              />
              <span className="modal-text d-flex justify-content-between">
                <p>Supported formats: Docx, Doc, and Pdf</p>
                <p>Maximum Size: 5MB</p>
              </span>
            </Col>
            <Col sm={12} className="px-4 pt-1">
              <Form.Label>Remarks:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Add Your Remarks"
                value={remarks}
                onChange={handleRemarksChange}
              />
            </Col>
          </Form>
        </Modal.Body>
        <Row className="m-3">
          <Col className="d-flex gap-3 " md={{ offset: 4, span: 8 }}>
            <CreateButton
              background="rgba(255, 255, 255, 1)"
              color="black"
              border="1px solid rgba(255, 255, 255, 1)"
              title={"Cancel"}
              onClick={() => setShowModal(false)}
            />
            <CreateButton
              title={"Upload"}
              onClick={handleSubmit}
              type={"submit"}
            />
          </Col>
        </Row>
        {/* <Modal.Footer>
          <div className="px-4 d-flex">
            <Button
              variant="light"
              onClick={() => setShowModal(false)}
              className="border border-secondary   rounded-0 "
            >
              Cancel
            </Button>
            <div className="ps-2">
              <Button
                type="submit"
                variant="primary"
                className="border border-secondary  rounded-0 "
                onClick={handleSubmit}
              >
                Upload
              </Button>
            </div>
          </div>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default NewEmissionReport;
