import { Modal, Button, Table, Form, Dropdown } from "react-bootstrap";
import "./MagnitudeCheckModal.css";
import Icon from "../../../assets/images/magnitudeCheckIcon.png";
const MagnitudeCheckModal = ({ showMagnitudeCheck, setShowMagnitudeCheck }) => {
  return (
    <div>
      <Modal
        show={showMagnitudeCheck}
        onHide={() => {
          setShowMagnitudeCheck(false);
        }}
        dialogClassName="custom-modal-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Order of Magnitude Check</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Table hover className="currentEmission">
            <thead>
              <tr>
                <th colSpan={2} className="text-center">
                  Route
                </th>
                <th colSpan={2} className="dtext-center">
                  Fuel
                </th>
              </tr>
              <tr>
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
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Form c</th>
                        <th>Form M</th>
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
                      <tr>
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
          <Table hover className="currentEmission">
            <thead>
              <tr>
                <th colSpan={2} className="text-center">
                  Aircraft Type
                </th>
                <th colSpan={2} className="text-center">
                  Aircraft Type
                </th>
              </tr>
              <tr>
                <th>Emissions Report</th>
                <th>Form C</th>
                <th>Emissions Report</th>
                <th>Form M</th>
              </tr>
            </thead>
            <tbody>
              <td>A320</td>
              <td>A320</td>
              <td>A320</td>
              <td>A320</td>
            </tbody>
          </Table>
          <Table hover className="currentEmission">
            <thead>
              <tr>
                <th colSpan={4} className="text-center">
                  OMC checklist
                </th>
              </tr>

              <tr>
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
                  {" "}
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-basic"
                      style={{ padding: "0.5rem", fontSize: "0.8rem" }}
                    >
                      NA
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#action1">Action 1</Dropdown.Item>
                      <Dropdown.Item href="#action2">Action 2</Dropdown.Item>
                      <Dropdown.Item href="#action3">Action 3</Dropdown.Item>
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
                <td>Emissions report verified by Verification body</td>
                <td>
                  {" "}
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-basic"
                      style={{ padding: "0.5rem", fontSize: "0.8rem" }}
                    >
                      NA
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#action1">Action 1</Dropdown.Item>
                      <Dropdown.Item href="#action2">Action 2</Dropdown.Item>
                      <Dropdown.Item href="#action3">Action 3</Dropdown.Item>
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
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-between w-100 px-4">
            <div className="d-flex justify-content-between">
              <div>
                <Button
                  style={{ backgroundColor: "#FF4D4F" }}
                  className="border border-secondary  rounded-0"
                >
                  Reject
                </Button>
              </div>
              <div className="px-2">
                <Button
                  style={{ backgroundColor: "#1890FF" }}
                  className="border border-secondary   rounded-0"
                >
                  Accept
                </Button>
              </div>
            </div>
            <Button
              style={{ backgroundColor: "#FFFFFF", color: "black" }}
              className="border border-secondary   rounded-0"
              onClick={() => {
                setShowMagnitudeCheck(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MagnitudeCheckModal;
