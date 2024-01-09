// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import * as XLSX from "xlsx";
// import { AiOutlineInbox } from "react-icons/ai";
// import { Button, Modal, Form, Row, Col, Container } from "react-bootstrap";
// import "./NewEMPsReport.css";
// import {
//   BASE_URL,
//   LIST_ALL_VB,
//   UPLOAD_AO_FILES,
// } from "../../../config/Constants";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import {
//   setExcelSheet2Data,
//   setExcelSheet5Data,
//   setExcelSheet4Data,
// } from "../../../store/ExcelDataAOSlice";
// import NewEMPsReportState1 from "./NewEMPsReportState.jsx/NewEMPsReportState1/NewEMPsReportState1";

// const NewEMPsReport = ({ showModal, setShowModal }) => {
//   const dispatch = useDispatch();

//   //All Vb users
//   const [allVbUsers, setAllVbUsers] = useState([]);
//   console.log(allVbUsers);

//   //Emission Report file
//   const [emissionFile, setEmissionFile] = useState(null);
//   console.log(emissionFile);
//   //Consent file
//   const [consentFile, setConsentFile] = useState(null);

//   //Modal states
//   const [modalState1, setModalState1] = useState(false);

//   //Remarks
//   const [remarks, setRemarks] = useState("");

//   //Verification body
//   const [vb, setVb] = useState("");
//   console.log("Vbb Data ", vb);

//   // Extract data from excel sheets
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     setEmissionFile(file);
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       let bstr = e.target.result;
//       let workbook = XLSX.read(bstr, { type: "binary" });
//       var sheet0 = workbook.Sheets[workbook.SheetNames[0]];
//       var sheet1 = workbook.Sheets[workbook.SheetNames[1]];
//       var sheet2 = workbook.Sheets[workbook.SheetNames[2]];
//       var sheet3 = workbook.Sheets[workbook.SheetNames[3]];
//       var sheet4 = workbook.Sheets[workbook.SheetNames[4]];
//       var sheet5 = workbook.Sheets[workbook.SheetNames[5]];
//       let data0 = XLSX.utils.sheet_to_json(sheet0, { header: 1 });
//       let data1 = XLSX.utils.sheet_to_json(sheet1, { header: 1 });
//       let data2 = XLSX.utils.sheet_to_json(sheet2, { header: 1 });
//       let data3 = XLSX.utils.sheet_to_json(sheet3, { header: 1 });
//       let data4 = XLSX.utils.sheet_to_json(sheet4, { header: 1 });
//       let data5 = XLSX.utils.sheet_to_json(sheet5, { header: 1 });

//       let mapData2 = data2.map((item) => item.map((item) => item));
//       dispatch(setExcelSheet2Data(mapData2.slice(1)));
//       let mapData4 = data4.map((item) => item.map((item) => item));
//       dispatch(setExcelSheet4Data(mapData4.slice(1)));
//       let mapData5 = data5.map((item) => item.map((item) => item));
//       dispatch(setExcelSheet5Data(mapData5.slice(1)));
//     };
//     reader.readAsBinaryString(e.target.files[0]);
//   };

//   //geting Excel data from redux store
//   const excelData = useSelector((state) => state?.excel?.excelData);
//   //excel data of specif field assign into variables
//   const year = excelData.length ? excelData[5]["1"] : "";
//   const erGenerationMethod = excelData.length ? excelData[60]["1"] : "";
//   const reportMethod = excelData.length ? excelData[167]["1"] : "";

//   //geting Vb list
//   useEffect(() => {
//     getDataVb();
//   }, []);
//   const getDataVb = async () => {
//     try {
//       let jwtToken = localStorage.getItem("token");

//       const headers = {
//         Authorization: `Bearer ${jwtToken}`,
//       };

//       const response = await axios.get(BASE_URL + LIST_ALL_VB, {
//         headers,
//       });
//       setAllVbUsers(response.data.data);
//       console.log("response", response.data.data);
//       console.log("alluservb", allVbUsers);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   //Conset File
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setConsentFile(file);
//   };

//   //Remarks

//   const handleRemarksChange = (event) => {
//     setRemarks(event.target.value);
//   };

//   //Verification Body
//   const handleVerificationBody = (event) => {
//     const userId = event.target.value;
//     setVb(userId);
//   };

//   //Upload files

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setShowModal(false);
//     try {
//       let jwtToken = localStorage.getItem("token");

//       const headers = {
//         Authorization: `Bearer ${jwtToken}`,
//       };
//       const formData = new FormData();
//       formData.append("air_code", "1234");
//       formData.append("year", year);
//       formData.append("reporting_tools", reportMethod);
//       formData.append("file", emissionFile);
//       formData.append("consent_file", consentFile);
//       formData.append("description", remarks);
//       formData.append("verification_body", vb);
//       const response = await axios.post(BASE_URL + UPLOAD_AO_FILES, formData, {
//         headers,
//       });
//       console.log("Upload", response.data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       {/* {!modalState1 ? ( */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title className="px-4">Emissions Report</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group>
//               <Col className="px-4 pt-3">
//                 <Form.Label>
//                   <span className="text-danger">*</span>Verification Body
//                 </Form.Label>
//                 {allVbUsers && (
//                   <Form.Select onChange={handleVerificationBody}>
//                     <option>Select Verification Body</option>
//                     {allVbUsers.map((user) => (
//                       <option key={user.id} value={user.id}>
//                         {user.name}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 )}
//               </Col>
//               {excelData.length ? (
//                 <div>
//                   <Col className="px-4 pt-2">
//                     <Form.Group>
//                       <Form.Label>
//                         <span className="text-danger">*</span>Year
//                       </Form.Label>
//                       <Form.Control type="text" value={year} />
//                     </Form.Group>
//                   </Col>

//                   <Col className="px-4 pt-3">
//                     <Form.Group>
//                       <Form.Label>
//                         <span className="text-danger">*</span>ER Generation
//                         Method
//                       </Form.Label>
//                       <Form.Control type="text" value={erGenerationMethod} />
//                     </Form.Group>
//                   </Col>
//                   <Col className="px-4 pt-3">
//                     <Form.Group>
//                       <Form.Label>
//                         <span className="text-danger">*</span>Report Method
//                       </Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={reportMethod}
//                         className="text-capitalize"
//                       />
//                     </Form.Group>
//                   </Col>
//                 </div>
//               ) : (
//                 ""
//               )}
//               <Col className="pt-3">
//                 <Form.Label>
//                   <span className="text-danger ps-4">*</span>Upload Emissions
//                   Report
//                 </Form.Label>
//                 <Container id="drag-container">
//                   {emissionFile ? (
//                     <span>
//                       <b className="text-primary">Uploaded File :</b>{" "}
//                       {emissionFile.name}
//                     </span>
//                   ) : (
//                     <Row>
//                       {/* Dragfile Icon */}
//                       <Col sm={4} className="drag-Icon ">
//                         <AiOutlineInbox />
//                       </Col>
//                       {/* Drag and Drop */}

//                       <Col sm={4} className="item">
//                         Drag and Drop file here or
//                         {/* Custom input type file */}
//                         <span>
//                           <label for="file-input" className="custom-file-input">
//                             Choose file
//                           </label>
//                           <input
//                             id="file-input"
//                             type="file"
//                             onChange={handleFileUpload}
//                             accept=".xlsx,.xls"
//                           />
//                         </span>
//                       </Col>
//                     </Row>
//                   )}
//                 </Container>
//                 <span className="modal-text d-flex justify-content-between px-4 ">
//                   <p>Supported formats: XLS, XLSX and CSV</p>
//                   <p>Maximum Size: 10MB</p>
//                 </span>
//               </Col>
//             </Form.Group>

//             <Col className="px-4 pt-2">
//               <Form.Label>
//                 <span className="text-danger">*</span>Upload Consent File
//               </Form.Label>

//               <Form.Control
//                 type="file"
//                 onChange={handleFileChange}
//                 accept=".xlsx,.xls "
//               />
//               <span className="modal-text d-flex">
//                 <p className="px-4">Supported formats: Docx, Doc, and Pdf</p>
//                 <p className="ps-5">Maximum Size: 5MB</p>
//               </span>
//             </Col>
//             <Col sm={12} className="px-4 pt-1">
//               <Form.Label>
//                 <span className="text-danger"></span>Remarks:
//               </Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 placeholder="Add Your Remarks"
//                 value={remarks}
//                 onChange={handleRemarksChange}
//               />
//             </Col>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <div className="px-4 d-flex">
//             <Button
//               variant="light"
//               onClick={() => setShowModal(false)}
//               className="border border-secondary   rounded-0 "
//             >
//               Save Draft
//             </Button>
//             <div className="ps-2">
//               <Button
//                 type="submit"
//                 variant="primary"
//                 className="border border-secondary   rounded-0 "
//                 onClick={handleSubmit}
//               >
//                 Send VB
//               </Button>
//             </div>
//           </div>
//         </Modal.Footer>
//       </Modal>
//       {/* ) : ( */}
//       {/* <NewEMPsReportState1
//           modalState1={modalState1}
//           setModalState1={setModalState1}
//         /> */}
//       {/* )} */}
//     </div>
//   );
// };

// export default NewEMPsReport;
