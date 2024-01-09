import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toSentenceCase } from "../../../../utils/toSentenceCase";
import Active from "../../../../components/Status/Active";
import Pending from "../../../../components/Status/Pending";
import style from "./formc.module.css";
import Submitted from "../../../../components/Status/Submitted";
import CreateButton from "../../../../components/CreateButton/CreateButton";

const FormC = () => {
  return (
    <Container fluid className="main-class">
      <Row className="d-flex align-items-center">
        <Col md={6}>
          <h4 className="py-3">Form C</h4>
        </Col>
        <Col md={3}>
          <span
            className="d-flex align-items-center text-primary"
            role="button"
            tabIndex="0"
          >
            Download Template
          </span>
        </Col>
        <Col md={3}>
          <CreateButton
            icon
            title={"Add New"}
            // onClick={() => setShowModal(true)}
            width={"220px"}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table className={style.tableClass}>
            <thead>
              <tr>
                <th>Year</th>
                <th>Submission Status</th>
                <th>Submission Date</th>
                <th>Next Field</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2023</td>
                <td>
                  <div className="d-flex">
                    <Submitted />
                  </div>
                </td>
                <td>Method-A</td>
                <td>TBD</td>
                <td>
                  <td>
                    <Link
                      to="/ao/emissiondata"
                      className="d-flex align-items-center gap-1"
                      // onClick={() => {
                      //   handleVeiw(data);
                      // }}
                    >
                      <span style={{ paddingBottom: "2px" }}>
                        <BsEyeFill size={20} />
                      </span>
                      View
                    </Link>
                  </td>
                </td>
              </tr>
              <tr>
                <td>2023</td>
                <td>
                  <div className="d-flex">
                    <Pending />
                  </div>
                </td>
                <td>CERT</td>
                <td>TBD</td>
                <td>
                  <td>
                    <Link
                      to="/ao/emissiondata"
                      className="d-flex align-items-center gap-1"
                      // onClick={() => {
                      //   handleVeiw(data);
                      // }}
                    >
                      <span style={{ paddingBottom: "2px" }}>
                        <BsEyeFill size={20} />
                      </span>
                      View
                    </Link>
                  </td>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default FormC;
