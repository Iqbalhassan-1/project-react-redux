import React, { useState } from "react";
import { Col, Container, Dropdown, Form, Row, Table } from "react-bootstrap";
import Icon from "../../../../../assets/images/magnitudeCheckIcon.png";
import CreateButton from "../../../../../components/CreateButton/CreateButton";
import ApproveMc from "./ApproveMc";
import RejectMc from "./RejectMc";
import style from "./magnitudecheck.module.css";

const MagnitudeCheck = () => {
  const [approve, setApprove] = useState(false);
  const [reject, setReject] = useState(false);
  const [selectedValue, setSelectedValue] = useState("N/A");

  const handleDropdownChange = (eventKey, event) => {
    setSelectedValue(eventKey);
  };
  return (
    <Container fluid className="main-class">
      <Row className="py-3">
        <Col md={12}>
          <Table>
            <thead className={style.currentEmission}>
              <tr>
                <th colSpan={2} className="text-center">
                  Route
                </th>
                <th colSpan={2} className="dtext-center">
                  Fuel
                </th>
              </tr>
              <tr className={style.currentEmission2}>
                <th>Emissions Report</th>
                <th rowSpan={6} className="d-flex justify-content-center">
                  Form C
                </th>
                <th>Emissions Report</th>
                <th>Form M</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Table>
                    <thead className={style.currentEmission}>
                      <tr>
                        <th>#</th>
                        <th>From</th>
                        <th>To</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>indonesia</td>
                        <td>Phillipines</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>South Africa</td>
                        <td>vietnam</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>UAE</td>
                        <td>China</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>US</td>
                        <td>India</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>Georgia</td>
                        <td>Nigeria</td>
                      </tr>
                    </tbody>
                  </Table>
                </td>
                <td style={{ width: "281px", border: "1px solid #F5F5F5" }}>
                  <span className="d-flex justify-content-center mt-5">
                    {" "}
                    <img src={Icon} alt="icon" />
                  </span>

                  <span className="d-flex justify-content-center">No Data</span>
                </td>
                <td colSpan={2}>
                  <Table>
                    <thead>
                      <tr>
                        <th>14230</th>
                        <th className="text-center">0.00</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={style.currentEmission2}>
                        <td colSpan={2} className="text-center fs-6">
                          Fuel Use Monitoring System
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td colSpan={2} className="text-center">
                          CERT
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </Table>
                </td>
              </tr>
            </tbody>
          </Table>
          <Table>
            <thead>
              <tr className={style.currentEmission}>
                <th colSpan={2} className="text-center">
                  Aircraft Type
                </th>
                <th colSpan={2} className="text-center">
                  Aircraft Type
                </th>
              </tr>
              <tr className={style.currentEmission2}>
                <th>Emissions Report</th>
                <th>Form C</th>
                <th>Emissions Report</th>
                <th>Form M</th>
              </tr>
            </thead>
            <tbody>
              <td className="px-2">A320</td>
              <td className="px-2">A320</td>
              <td className="px-2">A320</td>
              <td className="px-2">A320</td>
            </tbody>
          </Table>
          <Table>
            <thead>
              <tr className={style.currentEmission}>
                <th colSpan={4} className="text-center">
                  OMC checklist
                </th>
              </tr>

              <tr className={style.currentEmission2}>
                <th>Index No</th>
                <th>Statement</th>
                <th>Status</th>
                <th>Remarks (ER vs EMP)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Emissions report verified by Verification body</td>
                <td>
                  <Dropdown onSelect={handleDropdownChange}>
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-basic"
                      style={{ padding: "0.5rem", fontSize: "0.8rem" }}
                    >
                      {selectedValue}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Yes">Yes</Dropdown.Item>
                      <Dropdown.Item eventKey="No">No</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>
                  <textarea
                    className="form-control"
                    rows="1"
                    placeholder="write here"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Reporting year is correct</td>
                <td>
                  <Dropdown onSelect={handleDropdownChange}>
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-basic"
                      style={{ padding: "0.5rem", fontSize: "0.8rem" }}
                    >
                      {selectedValue}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Yes">Yes</Dropdown.Item>
                      <Dropdown.Item eventKey="No">No</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>
                  <textarea
                    className="form-control"
                    rows="1"
                    placeholder="write here"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>
                  Verification statement for the Emissions Report verified as
                  satisfactory
                </td>
                <td>
                  <Dropdown onSelect={handleDropdownChange}>
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-basic"
                      style={{ padding: "0.5rem", fontSize: "0.8rem" }}
                    >
                      {selectedValue}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Yes">Yes</Dropdown.Item>
                      <Dropdown.Item eventKey="No">No</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>
                  <textarea
                    className="form-control"
                    rows="1"
                    placeholder="write here"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>Content of ER and VR from AO and VB are identical</td>
                <td>
                  <Dropdown onSelect={handleDropdownChange}>
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-basic"
                      style={{ padding: "0.5rem", fontSize: "0.8rem" }}
                    >
                      {selectedValue}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Yes">Yes</Dropdown.Item>
                      <Dropdown.Item eventKey="No">No</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>
                  <textarea
                    className="form-control"
                    rows="1"
                    placeholder="write here"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>
                  Legal representative identified in ER is the same as in EMP
                </td>
                <td>
                  <Dropdown onSelect={handleDropdownChange}>
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-basic"
                      style={{ padding: "0.5rem", fontSize: "0.8rem" }}
                    >
                      {selectedValue}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Yes">Yes</Dropdown.Item>
                      <Dropdown.Item eventKey="No">No</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>
                  <textarea
                    className="form-control"
                    rows="1"
                    placeholder="write here"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>6</td>
                <td>
                  Aggregation level of reported data as Aerodrome pair level
                </td>
                <td>
                  <Dropdown onSelect={handleDropdownChange}>
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-basic"
                      style={{ padding: "0.5rem", fontSize: "0.8rem" }}
                    >
                      {selectedValue}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Yes">Yes</Dropdown.Item>
                      <Dropdown.Item eventKey="No">No</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>
                  <textarea
                    className="form-control"
                    rows="1"
                    placeholder="write here"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>7</td>
                <td>
                  Fuel monitoring method in ER been created on the basis of an
                  EMP
                </td>
                <td>
                  <Dropdown onSelect={handleDropdownChange}>
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-basic"
                      style={{ padding: "0.5rem", fontSize: "0.8rem" }}
                    >
                      {selectedValue}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Yes">Yes</Dropdown.Item>
                      <Dropdown.Item eventKey="No">No</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>
                  <textarea
                    className="form-control"
                    rows="1"
                    placeholder="write here"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>8</td>
                <td>
                  Verification body has a valid accreditation on ICAO’s VB list
                </td>
                <td>
                  <Dropdown onSelect={handleDropdownChange}>
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-basic"
                      style={{ padding: "0.5rem", fontSize: "0.8rem" }}
                    >
                      {selectedValue}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Yes">Yes</Dropdown.Item>
                      <Dropdown.Item eventKey="No">No</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>
                  <textarea
                    className="form-control"
                    rows="1"
                    placeholder="write here"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>9</td>
                <td>Verification body acccredited by NAB</td>
                <td>
                  <Dropdown onSelect={handleDropdownChange}>
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-basic"
                      style={{ padding: "0.5rem", fontSize: "0.8rem" }}
                    >
                      {selectedValue}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Yes">Yes</Dropdown.Item>
                      <Dropdown.Item eventKey="No">No</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>
                  <textarea
                    className="form-control"
                    rows="1"
                    placeholder="write here"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>10</td>
                <td>
                  Total international CO2 Emissions greater than 500K Tonnes of
                  CO2 (Not eligible to use CERT)
                </td>
                <td>
                  <Dropdown onSelect={handleDropdownChange}>
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-basic"
                      style={{ padding: "0.5rem", fontSize: "0.8rem" }}
                    >
                      {selectedValue}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Yes">Yes</Dropdown.Item>
                      <Dropdown.Item eventKey="No">No</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>
                  <textarea
                    className="form-control"
                    rows="1"
                    placeholder="write here"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>11</td>
                <td>
                  Average of number of flights is plausible not exist than 200
                  flight per day as statistic data
                </td>
                <td>
                  <Dropdown onSelect={handleDropdownChange}>
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-basic"
                      style={{ padding: "0.5rem", fontSize: "0.8rem" }}
                    >
                      {selectedValue}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Yes">Yes</Dropdown.Item>
                      <Dropdown.Item eventKey="No">No</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>
                  <textarea
                    className="form-control"
                    rows="1"
                    placeholder="write here"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>12</td>
                <td>Set of Aerodrome pair data completed</td>
                <td>
                  <Dropdown onSelect={handleDropdownChange}>
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-basic"
                      style={{ padding: "0.5rem", fontSize: "0.8rem" }}
                    >
                      {selectedValue}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Yes">Yes</Dropdown.Item>
                      <Dropdown.Item eventKey="No">No</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>
                  <textarea
                    className="form-control"
                    rows="1"
                    placeholder="write here"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>13</td>
                <td>AO report less than 3500 flights on an aerodrome pair</td>
                <td>
                  <Dropdown onSelect={handleDropdownChange}>
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-basic"
                      style={{ padding: "0.5rem", fontSize: "0.8rem" }}
                    >
                      {selectedValue}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Yes">Yes</Dropdown.Item>
                      <Dropdown.Item eventKey="No">No</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>
                  <textarea
                    className="form-control"
                    rows="1"
                    placeholder="write here"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>14</td>
                <td>
                  There are aerodrome pair with less than 250 tonnes fuel and
                  more than 2.5 tonnes consumption per flight
                </td>
                <td>
                  <Dropdown onSelect={handleDropdownChange}>
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-basic"
                      style={{ padding: "0.5rem", fontSize: "0.8rem" }}
                    >
                      {selectedValue}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Yes">Yes</Dropdown.Item>
                      <Dropdown.Item eventKey="No">No</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>
                  <textarea
                    className="form-control"
                    rows="1"
                    placeholder="write here"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>15</td>
                <td>
                  CO2 estimations estimated with CERT is less than 5% of Fuel
                  Monitoring method
                </td>
                <td>
                  <Dropdown onSelect={handleDropdownChange}>
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-basic"
                      style={{ padding: "0.5rem", fontSize: "0.8rem" }}
                    >
                      {selectedValue}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Yes">Yes</Dropdown.Item>
                      <Dropdown.Item eventKey="No">No</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>
                  <textarea
                    className="form-control"
                    rows="1"
                    placeholder="write here"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>ٍ16</td>
                <td>Data Gap less than 5%</td>
                <td>
                  <Dropdown onSelect={handleDropdownChange}>
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-basic"
                      style={{ padding: "0.5rem", fontSize: "0.8rem" }}
                    >
                      {selectedValue}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Yes">Yes</Dropdown.Item>
                      <Dropdown.Item eventKey="No">No</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>
                  <textarea
                    className="form-control"
                    rows="1"
                    placeholder="write here"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>17</td>
                <td>Gap has been closed according to EMP</td>
                <td>
                  <Dropdown onSelect={handleDropdownChange}>
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-basic"
                      style={{ padding: "0.5rem", fontSize: "0.8rem" }}
                    >
                      {selectedValue}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Yes">Yes</Dropdown.Item>
                      <Dropdown.Item eventKey="No">No</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>
                  <textarea
                    className="form-control"
                    rows="1"
                    placeholder="write here"
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Form.Label>
            <h6>Description (Optional)</h6>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Write Description"
            className="rounded-1"
          />

          <span className="modal-text d-flex justify-content-end">
            <p>0/100</p>
          </span>
        </Col>
      </Row>
      <Row className="py-5 mx-2">
        <Col className="d-flex gap-3 " md={{ offset: 6, span: 6 }}>
          <CreateButton
            background="#dc3545"
            color="white"
            border="1px solid #dc3545"
            title={"Reject Magnitude Check"}
            onClick={() => setReject(true)}
          />
          <CreateButton
            type={"submit"}
            background="#389e0d"
            color="white"
            border="1px solid #389e0d"
            title={"Approve Magnitude Check"}
            onClick={() => setApprove(true)}
          />
        </Col>
      </Row>
      {approve && <ApproveMc approve={approve} setApprove={setApprove} />}
      {reject && <RejectMc reject={reject} setReject={setReject} />}
    </Container>
  );
};

export default MagnitudeCheck;
