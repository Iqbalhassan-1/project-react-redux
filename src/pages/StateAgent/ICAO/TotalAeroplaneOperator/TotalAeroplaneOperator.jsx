import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Col, Container, FormControl, Row } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { GrFormAdd } from "react-icons/gr";
import { AiFillEdit, AiFillDelete, AiOutlineFilter } from "react-icons/ai";
import { VscAdd } from "react-icons/vsc";
import CreateButton from "../../../../components/CreateButton/CreateButton";
import { BsFilter, BsSearch } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import Yes from "../../../../components/Status/Yes";
import No from "../../../../components/Status/No";
const TotalAeroplaneOperator = () => {
  const [showAddOpertaor, setShowAddOperator] = useState(false);
  return (
    <>
      <Container fluid className="main-class">
        <Row className="d-flex align-items-center justify-content-between">
          <Col md={7}>
            <h4 className="py-3">
              Total Emissions for Each Aeroplane Operator{" "}
            </h4>
          </Col>
          <Col md={2} className="d-flex justify-content-center">
            <span className="mx-3">
              <IoSearchOutline className="fs-5 opacity-50" />
            </span>
            <span>
              <AiOutlineFilter className="fs-5 opacity-50" />
            </span>
          </Col>
          <Col md={3}>
            <CreateButton
              icon1
              title={"Generate Excel Report"}
              onClick={() => setShowAddOperator(true)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Table className="currentEmission">
              <thead>
                <tr>
                  <th>Aeroplane Operator</th>
                  <th>Year</th>
                  <th>Subject to offsetting</th>
                  <th>
                    Co<sub>2</sub> Emissions(tons)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Alegeria</td>
                  <td>2022</td>
                  <td>
                    <div className="d-flex">
                      <Yes />
                    </div>
                  </td>
                  <td>12000</td>
                </tr>
                <tr>
                  <td>Alegeria</td>
                  <td>2022</td>
                  <td className="d-flex">
                    <No />
                  </td>
                  <td>12000</td>
                </tr>
                <tr>
                  <td>Alegeria</td>
                  <td>2022</td>
                  <td>
                    <div className="d-flex">
                      <Yes />
                    </div>
                  </td>
                  <td>12000</td>
                </tr>

                <tr>
                  <td>Alegeria</td>
                  <td>2022</td>
                  <td className="d-flex">
                    <No />
                  </td>
                  <td>12000</td>
                </tr>
                <tr>
                  <td>Alegeria</td>
                  <td>2022</td>
                  <td>
                    <div className="d-flex">
                      <Yes />
                    </div>
                  </td>
                  <td>12000</td>
                </tr>
                <tr>
                  <td>Alegeria</td>
                  <td>2022</td>
                  <td>
                    <div className="d-flex">
                      <Yes />
                    </div>
                  </td>
                  <td>12000</td>
                </tr>
                <tr>
                  <td>Alegeria</td>
                  <td>2022</td>
                  <td>
                    <div className="d-flex">
                      <Yes />
                    </div>
                  </td>
                  <td>12000</td>
                </tr>
                <tr>
                  <td>Alegeria</td>
                  <td>2022</td>
                  <td className="d-flex">
                    <No />
                  </td>
                  <td>
                    <div>12000</div>
                  </td>
                </tr>
                <tr>
                  <td>Alegeria</td>
                  <td>2022</td>
                  <td>
                    <div className="d-flex">
                      <Yes />
                    </div>
                  </td>
                  <td>12000</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <div className="fw-bold">Total</div>
                  </td>
                  <td>
                    <div className="fw-bold">96000</div>
                  </td>
                </tr>
              </tbody>
            </Table>
            {/* <Col className="d-flex justify-content-end ">
              <div>
                <span className=""> Total</span>
                12000
              </div>
            </Col> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TotalAeroplaneOperator;
