import React, { useState } from "react";
import { Modal, Form, Row, Col, Alert, Table } from "react-bootstrap";
import CreateButton from "../../../../components/CreateButton/CreateButton";
import { uploadEmp } from "../../../../store/AirlineOperator/EmissionsMonitoringPlan/EmissionMonitoringPlanSlice";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import {
  setExcelEmpDataEmpty,
  setExcelEmpSheet1Data,
  setExcelEmpSheet2Data,
  setExcelEmpSheet4Data,
  setExcelEmpSheet3Data,
  setExcelEmpSheet5Data,
} from "../../../../store/AirlineOperator/EmissionsMonitoringPlan/ExcelDataEmpSlice";
import { setExcelDataEmpty } from "../../../../store/AirlineOperator/EmissionsReport/ExcelDataAOSlice";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { IoReturnUpBack } from "react-icons/io5";
const CreateEmplanAo = ({
  showModal,
  setShowModal,
  onSwitchToDrafts,
  setShowEmDraft,
}) => {
  const dispatch = useDispatch();

  const [selectedYear, setSelectedYear] = useState("");
  const [empFile, setEmpFile] = useState(null);
  const [certFile, setCertFile] = useState(null);
  const [otherFile, setOtherFile] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState({
    yearError: "",
    empError: "",
  });
  //Handle emission monitoring plan
  const handleEmpFileChange = async (e) => {
    const file = e.target.files[0];
    setError((prevState) => ({
      ...prevState,
      empError: "", // Set the year error message to empty
    }));
    setEmpFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      let bstr = e.target.result;
      let workbook = XLSX.read(bstr, { type: "binary" });
      var sheet1 = workbook.Sheets[workbook.SheetNames[1]];
      var sheet2 = workbook.Sheets[workbook.SheetNames[2]];
      var sheet4 = workbook.Sheets[workbook.SheetNames[4]];
      let data1 = XLSX.utils.sheet_to_json(sheet1, { header: 1 });
      let data2 = XLSX.utils.sheet_to_json(sheet2, { header: 1 });
      let data4 = XLSX.utils.sheet_to_json(sheet4, { header: 1 });
      let mapData1 = data1.map((item) => item.map((item) => item));
      dispatch(setExcelEmpDataEmpty([]));
      dispatch(setExcelEmpSheet1Data(mapData1.slice(1)));
      let mapData2 = data2.map((item) => item.map((item) => item));
      dispatch(setExcelEmpSheet2Data(mapData2.slice(1)));
      let mapData4 = data4.map((item) => item.map((item) => item));
      dispatch(setExcelEmpSheet4Data(mapData4.slice(1)));
    };
    reader.readAsBinaryString(e.target.files[0]);
  };

  //geting Excel data from redux store
  const excelDataEmp = useSelector((state) => state?.excelDataEmp?.excelData);
  console.log(excelDataEmp);
  const version = excelDataEmp.length ? excelDataEmp[6]["1"] : "";
  let monitoringMethod = excelDataEmp.length ? excelDataEmp[300]["1"] : "";
  console.log("monitoring method", monitoringMethod);

  if (
    monitoringMethod === "ICAO CORSIA CO2 Estimation and Reporting Tool (CERT)"
  ) {
    monitoringMethod = "CERT";
  } else if (
    (monitoringMethod === "Fuel Use Monitoring Method" ||
      monitoringMethod ===
        "Fuel Use Monitoring Method and ICAO CORSIA CO2 Estimation and Reporting Tool (CERT)") &&
    selectedYear >= 2021
  ) {
    let methodA = excelDataEmp.length ? excelDataEmp[313] : "";
    console.log("method a", methodA);
    let methodB = excelDataEmp.length ? excelDataEmp[315] : "";
    console.log("method b", methodB);
    let BlocksOffandOn = excelDataEmp.length ? excelDataEmp[317] : "";
    console.log("block off and on", BlocksOffandOn);
    let fuelUplift = excelDataEmp.length ? excelDataEmp[319] : "";
    console.log("fuel up lift", fuelUplift);
    let BlocksHour = excelDataEmp.length ? excelDataEmp[321] : "";
    console.log("blocks hour", BlocksHour);
    if (
      // methodA.length == 10 &&
      methodA["9"] === "yes"
      //  &&
      // (methodA["8"] === undefined || methodA["8"] == "no")
    ) {
      monitoringMethod = methodA["1"];
    } else if (
      // methodB.length == 10 &&
      methodB["9"] === "yes"
      // &&
      // (methodB["8"] === undefined || methodB["8"] == "no")
    ) {
      monitoringMethod = methodB["1"];
    } else if (
      // BlocksOffandOn.length == 10 &&
      BlocksOffandOn["9"] === "yes"
      // &&
      // (BlocksOffandOn["8"] === undefined || BlocksOffandOn["8"] == "no")
    ) {
      monitoringMethod = BlocksOffandOn["1"];
    } else if (
      // fuelUplift.length == 10 &&
      fuelUplift["9"] === "yes"
      //  &&
      // (fuelUplift["8"] === undefined || fuelUplift["8"] == "no")
    ) {
      monitoringMethod = fuelUplift["1"];
    } else if (
      // BlocksHour.length == 10 &&
      BlocksHour["9"] === "yes"
      //  &&
      // (BlocksHour["8"] === undefined || fuelUplift["8"] == "no")
    ) {
      monitoringMethod = BlocksHour["1"];
    } else {
      monitoringMethod = "";
    }
  } else if (
    ((monitoringMethod === "Fuel Use Monitoring Method" ||
      monitoringMethod ===
        "Fuel Use Monitoring Method and ICAO CORSIA CO2 Estimation and Reporting Tool (CERT)") &&
      selectedYear == 2019) ||
    selectedYear == 2020
  ) {
    let methodA = excelDataEmp.length ? excelDataEmp[313] : "";
    console.log("method a", methodA);
    let methodB = excelDataEmp.length ? excelDataEmp[315] : "";
    console.log("method b", methodB);
    let BlocksOffandOn = excelDataEmp.length ? excelDataEmp[317] : "";
    console.log("block off and on", BlocksOffandOn);
    let fuelUplift = excelDataEmp.length ? excelDataEmp[319] : "";
    console.log("fuel up lift", fuelUplift);
    let BlocksHour = excelDataEmp.length ? excelDataEmp[321] : "";
    console.log("blocks hour", BlocksHour);
    if (
      // methodA.length == 10 &&
      methodA["8"] === "yes"
      // &&
      // (methodA["9"] === undefined || methodA["9"] == "no")
    ) {
      monitoringMethod = methodA["1"];
    } else if (
      // methodB.length == 10 &&
      methodB["8"] === "yes"

      // && (methodB["9"] === undefined || methodB["9"] == "no")
    ) {
      monitoringMethod = methodB["1"];
    } else if (
      // BlocksOffandOn.length == 10 &&
      BlocksOffandOn["8"] === "yes"
      // &&
      // (BlocksOffandOn["9"] === undefined || BlocksOffandOn["9"] == "no")
    ) {
      monitoringMethod = BlocksOffandOn["1"];
    } else if (
      // fuelUplift.length == 10 &&
      fuelUplift["8"] === "yes"
      //  &&
      // (fuelUplift["9"] === undefined || fuelUplift["9"] == "no")
    ) {
      monitoringMethod = fuelUplift["1"];
    } else if (
      // BlocksHour.length == 10 &&
      BlocksHour["8"] === "yes"
      //  &&
      // (BlocksHour["9"] === undefined || fuelUplift["9"] == "no")
    ) {
      monitoringMethod = BlocksHour["1"];
    } else {
      monitoringMethod = "";
    }
  } else {
    monitoringMethod = "";
  }

  //Handle cert file
  const handleCertFileChange = (event) => {
    setCertFile(event.target.files[0]);
  };

  //Handle other file
  const handleOtherFileChange = (event) => {
    setOtherFile(event.target.files[0]);
  };

  //Handle year change
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setError((prevState) => ({
      ...prevState,
      yearError: "", // Set the year error message to empty
    }));
  };

  //handle remarks

  const handleRemarks = (event) => {
    setRemarks(event.target.value);
  };

  //handle hide
  const handleHide = () => {
    setShowModal(false);
    dispatch(setExcelEmpDataEmpty([]));
  };

  //handle submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formValid = true;
    if (selectedYear === "") {
      setError((prevState) => ({
        ...prevState,
        yearError: "Year is required",
      }));
      formValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        yearError: "",
      }));
    }

    if (empFile === null) {
      setError((prevState) => ({
        ...prevState,
        empError: "Emp File is required",
      }));
      formValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        empError: "",
      }));
    }
    try {
      if (formValid) {
        const formData = new FormData();
        formData.append("emp_file", empFile);
        formData.append("version", version);
        formData.append("year", selectedYear);
        formData.append("description", remarks);
        formData.append("monitoring_method", monitoringMethod);
        formData.append("cert_file", certFile);
        formData.append("other_file", otherFile);
        // Dispatch the API call and wait for the response
        dispatch(uploadEmp(formData));
        // Check if the API call was successful
        setShowModal(false);
        setShowEmDraft(true);
        dispatch(setExcelEmpDataEmpty([]));
        onSwitchToDrafts();
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <div>
      <Modal show={showModal} onHide={handleHide}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="px-4">Emissions Monitoring Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Col className="px-4 pt-2">
              <Form.Label>
                <span className="text-danger ps-1">*</span>Year
              </Form.Label>
              <Form.Select
                value={selectedYear}
                onChange={handleYearChange}
                placeholder="Please select year"
              >
                <option disabled value="">
                  Please select year
                </option>
                {Array.from({ length: 21 }, (_, index) => {
                  const year = 2019 + index;
                  return <option key={year}>{year}</option>;
                })}
              </Form.Select>

              {error?.yearError && (
                <Alert
                  variant="danger"
                  className="d-flex align-items-center p-1 mt-2"
                >
                  <BsExclamationTriangleFill className="mr-2" size={16} />
                  <p className="mb-0 fs-sm text-center ps-1">
                    {error?.yearError}
                  </p>
                </Alert>
              )}
            </Col>
            {excelDataEmp.length > 0 && (
              <>
                <Col className="px-4 pt-4">
                  <Form.Label>
                    <span className="text-danger ps-1">*</span>Version
                  </Form.Label>
                  <Form.Control
                    type="input"
                    disabled
                    value={version}
                    placeholder={"Version will extract from EMP"}
                  />
                  <span className="modal-text d-flex px-2 justify-content-between"></span>
                </Col>

                <Col className="px-4 pt-4">
                  <Form.Label>
                    <span className="text-danger ps-1">*</span>Monitoring Method
                  </Form.Label>
                  <Form.Control
                    type="input"
                    disabled
                    value={monitoringMethod}
                    placeholder={"Monitoring method will extract from EMP"}
                  />
                </Col>
              </>
            )}
            <Col className="px-4 pt-4">
              <Form.Label>
                <span className="text-danger ps-1">*</span>Upload EMP
              </Form.Label>
              <Form.Control
                type="file"
                onChange={handleEmpFileChange}
                accept=".xlsx , xlx"
                disabled={empFile !== null}
              />
              <span className="modal-text d-flex px-2 justify-content-between">
                <p>Supported formats:xlsx</p>
                <p>Maximum Size: 5MB</p>
              </span>
              {error?.empError && (
                <Alert
                  variant="danger"
                  className="d-flex align-items-center p-1"
                >
                  <BsExclamationTriangleFill className="mr-2" size={16} />
                  <p className=" mb-0 fs-sm text-center ps-1">
                    {error?.empError}
                  </p>
                </Alert>
              )}
            </Col>
            <Col className="px-4 pt-4">
              <Form.Label>CERT Result File (Optional)</Form.Label>

              <Form.Control
                type="file"
                onChange={handleCertFileChange}
                accept=".pdf"
              />
              <span className="modal-text d-flex px-2 justify-content-between">
                <p>Supported formats: Pdf</p>
                <p>Maximum Size: 5MB</p>
              </span>
            </Col>
            <Col className="px-4 pt-4">
              <Form.Label>Other File (Optional)</Form.Label>

              <Form.Control
                type="file"
                name="js"
                onChange={handleOtherFileChange}
              />
              <span className="modal-text d-flex px-2 justify-content-between ">
                <p>Supported formats: Docx, Doc, and Pdf</p>
                <p>Maximum Size: 5MB</p>
              </span>
            </Col>
          </Form>
          <Col sm={12} className="px-4 pt-2">
            {/* Comment area */}
            <Form>
              <Form.Group controlId="commentForm.ControlTextarea1">
                <Form.Label>
                  <span className="text-danger"></span>Remarks:
                </Form.Label>
                <Form.Control
                  as="textarea"
                  // rows={2}
                  placeholder="Add your Remarks"
                  className="rounded-1"
                  onChange={handleRemarks}
                  value={remarks}
                />
              </Form.Group>
              <span className="modal-text d-flex justify-content-end">
                <p>Maximum Size: 10MB</p>
              </span>
            </Form>
          </Col>
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
      </Modal>
    </div>
  );
};

export default CreateEmplanAo;
