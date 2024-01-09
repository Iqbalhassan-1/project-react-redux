import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import "./verificationbodiesao.css";
import { TiArrowUnsorted } from "react-icons/ti";
import { AiFillDelete } from "react-icons/ai";
import Verified from "../../../components/Status/Verified";
import Unverified from "../../../components/Status/Unverified";
import Er from "../../../components/Status/Er";
import Eucr from "../../../components/Status/Eucr";

const VerificationBodiesAo = () => {
  return (
    <>
      <Container fluid>
        <Row className="mt-3">
          <h4>Verification Bodies</h4>
          <Col className="mt-2">
            <Table id="mainVerification">
              <thead>
                <tr>
                  <th>Name</th>

                  <th>
                    <div className="d-flex justify-content-between">
                      Accreditation Date{" "}
                      <span>
                        <TiArrowUnsorted
                          style={{ color: "gray", cursor: "pointer" }}
                        />
                      </span>
                    </div>
                  </th>
                  <th>
                    {" "}
                    <div className="d-flex justify-content-between">
                      Last Used{" "}
                      <span>
                        <TiArrowUnsorted
                          style={{ color: "gray", cursor: "pointer" }}
                        />
                      </span>
                    </div>
                  </th>
                  <th className="d-flex justify-content-between">
                    Verified By{" "}
                    <div className="d-flex justify-content-end">
                      <span>
                        <TiArrowUnsorted
                          style={{ color: "gray", cursor: "pointer" }}
                        />
                      </span>
                    </div>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Bureau Veritas</td>
                  <td>JAN 1,2023</td>
                  <td>MAR 23,2023</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Er />
                      <Eucr />
                    </div>
                  </td>
                  <td>
                    <div
                      className="d-flex align-items-center gap-1"
                      style={{ cursor: "pointer", color: "var(--primary)" }}
                    >
                      <span>
                        {" "}
                        <AiFillDelete
                          style={{
                            color: "var(--primary)",
                            cursor: "pointer",
                            marginBottom: "3px",
                          }}
                          size={20}
                        />{" "}
                      </span>
                      Delete
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>SGS</td>

                  <td>MAY 16,2023</td>
                  <td>NOV 23,2023</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Er />
                      <Eucr />
                    </div>
                  </td>
                  <td>
                    <div
                      className="d-flex align-items-center gap-1"
                      style={{ cursor: "pointer", color: "var(--primary)" }}
                    >
                      <span>
                        {" "}
                        <AiFillDelete
                          style={{
                            color: "var(--primary)",
                            cursor: "pointer",
                            marginBottom: "3px",
                          }}
                          size={20}
                        />{" "}
                      </span>
                      Delete
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Bureau Veritas</td>
                  <td>JAN 1,2023</td>
                  <td>MAR 23,2023</td>
                  <td>
                    <div className="d-flex gap-2">
                      {/* <Er /> */}
                      <Eucr />
                    </div>
                  </td>
                  <td>
                    <div
                      className="d-flex align-items-center gap-1"
                      style={{ cursor: "pointer", color: "var(--primary)" }}
                    >
                      <span>
                        {" "}
                        <AiFillDelete
                          style={{
                            color: "var(--primary)",
                            cursor: "pointer",
                            marginBottom: "3px",
                          }}
                          size={20}
                        />{" "}
                      </span>
                      Delete
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default VerificationBodiesAo;
