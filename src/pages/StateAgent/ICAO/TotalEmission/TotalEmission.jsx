import React, { useEffect, useState } from "react";
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
import ModalFilter from "../../../../components/ModalFilter/ModalFilter";
import { BASE_URL } from "../../../../config/Constants";
import axios from "axios";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

const TotalEmissions = () => {
  const [showAddOpertaor, setShowAddOperator] = useState(false);
  const [modalFilter, setModalFilter] = useState(false);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(null);
  const [filteredRecord, setFilteredRecord] = useState([]);
  const [toState, setToState] = useState(null);

  const total = filteredRecord.reduce(
    (accumulator, currentItem) =>
      parseInt(accumulator) + parseInt(currentItem.total),
    0
  );

  const showFilterModal = () => {
    setModalFilter(true);
  };

  const hideModalFilter = () => {
    setModalFilter(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let jwtToken = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${jwtToken}`,
        };

        const response = await axios.get(BASE_URL + "api/sa/stateTostate", {
          headers,
        });
        setData(response.data.data);
        setFilteredRecord(response.data.data);
        setToState(response.data.data.map((item) => item.arr_state));
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, []);

  const fileExtension = ".xlsx";
  const fileType =
    "application/vnd.openxmlformats-officedocument .spreadsheetml . sheet; charset=UTF-8";

  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(filteredRecord,total);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataExcel = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(dataExcel, "Excel Export" + fileExtension);
  };

  const handleApply = (data) => {
    setFilters(data);
    setModalFilter(false);
  };

  const filterRecords = (filters) => {
    let filtered = data;

    if (filters?.state_pair !== "" && filters?.subject_offset === "" && filters?.year === "") {
      filtered = data.filter(
        (record) => record?.arr_state === filters?.state_pair
      );
    }

    else if (filters?.state_pair === "" && filters?.subject_offset !== "" && filters?.year === "") {
      filtered = data.filter(
        (record) => record?.subject_offset === filters?.subject_offset
        );
    }

    else if (filters?.state_pair === "" && filters?.subject_offset === "" && filters?.year !== "") {
      filtered = data.filter(
        (record) => record?.year === filters?.year
      );
    }

    else if (filters?.state_pair !== "" && filters?.year !== "") {
      filtered = data.filter(
        (record) => record?.arr_state === filters?.state_pair && record?.year === filters?.year
      );
    }

    else if (filters?.state_pair !== "" && filters?.subject_offset !== "") {
      filtered = data.filter(
        (record) => record?.arr_state === filters?.state_pair && record?.subject_offset === filters?.subject_offset 
      );
    }

    else if (filters?.year !== "" && filters?.subject_offset !== "") {
      filtered = data.filter(
        (record) => record?.year === filters?.year && record?.subject_offset === filters?.subject_offset 
      );
    }

    else if (filters?.state_pair !== "" && filters?.subject_offset !== "" && filters?.year !== "") {
      filtered = data.filter(
        (record) => record?.arr_state === filters?.state_pair && record?.subject_offset === filters?.subject_offset && record?.year === filters?.year
      );
    }
    else{
      filtered = data;
    }

    return filtered;
  };

  useEffect(() => {
    const filtered = filterRecords(filters);
    console.log(filtered);
    setFilteredRecord(filtered);
  }, [filters]);

  return (
    <>
      <Container fluid>
        <Row className="mt-3 d-flex align-items-center justify-content-between">
          <Col md={6}>
            <h5>Total Annual Emissions for Each State Pair</h5>
          </Col>
          <Col md={3} className="d-flex justify-content-end">
            <span>
              <AiOutlineFilter
                onClick={showFilterModal}
                className="fs-5 opacity-50"
                style={{ cursor: "pointer" }}
              />
            </span>
          </Col>
          <Col md={3}>
            <CreateButton
              icon1
              title={"Generate Excel Report"}
              onClick={() => exportToExcel()}
            />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <Table id="mainVerification">
              <thead>
                <tr>
                  <th>From state</th>
                  <th>To State</th>
                  <th>Year</th>
                  <th>Subject to offsetting</th>
                  <th>
                    <div className="d-flex justify-content-end">
                      Co{" "}
                      <div>
                        <sub>2</sub>
                      </div>{" "}
                      Emissions(tons)
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRecord.map((item, i) => (
                  <tr key={i}>
                    <td>{item.de_state}</td>
                    <td>{item.arr_state}</td>
                    <td>{item.year}</td>
                    <td>
                      <div className="d-flex">
                        {item.subject_offset === null
                          ? "Not Defined"
                          : item.subject_offset}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex justify-content-end">
                        {item.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      </div>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <div className="fw-bold">Total</div>
                  </td>
                  <td>
                    <div className="fw-bold d-flex justify-content-end">
                      {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      {modalFilter && (
        <ModalFilter
          toState={toState}
          handleClose={hideModalFilter}
          handleApply={handleApply}
        />
      )}
    </>
  );
};

export default TotalEmissions;
