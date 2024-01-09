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
import Loader from "../../../../components/Loader/Loader";
const TotalStatePair = () => {
  const [showAddOpertaor, setShowAddOperator] = useState(false);
  const [modalFilter, setModalFilter] = useState(false);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(null);
  const [filteredRecord, setFilteredRecord] = useState([]);
  const [toState, setToState] = useState(null);
  const [stateYear, setStateYear] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      try {
        let jwtToken = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${jwtToken}`,
        };

        const response = await axios.get(BASE_URL + "api/sa/stateTostate", {
          headers,
        });

        setLoading(false);
        setData(response.data.data);
        setFilteredRecord(response.data.data);
        setToState(response.data.data.map((item) => item.arr_state));
        setStateYear([
          ...new Set(response.data.data.map((datay) => datay.year)),
        ]);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, []);
  console.log("year", stateYear);
  const fileExtension = ".xlsx";
  const fileType =
    "application/vnd.openxmlformats-officedocument .spreadsheetml . sheet; charset=UTF-8";

  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(filteredRecord, total);
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

    if (
      filters?.state_pair !== "" ||
      filters?.subject_offset !== "" ||
      filters?.year !== ""
    ) {
      filtered = data.filter(
        (record) =>
          record?.arr_state === filters?.state_pair ||
          record?.subject_offset === filters?.subject_offset ||
          record?.year == filters?.year
      );
    }

    if (filters?.state_pair !== "" && filters?.year !== "") {
      filtered = data.filter(
        (record) =>
          record?.arr_state === filters?.state_pair ||
          record?.year == filters?.year
      );
    }

    if (filters?.state_pair !== "" && filters?.subject_offset !== "") {
      filtered = data.filter(
        (record) =>
          record?.arr_state == filters?.state_pair ||
          record?.subject_offset == filters?.subject_offset
      );
    }

    if (filters?.year !== "" && filters?.subject_offset !== "") {
      filtered = data.filter(
        (record) =>
          record?.year == filters?.year ||
          record?.subject_offset == filters?.subject_offset
      );
    }

    if (
      filters?.state_pair !== "" &&
      filters?.subject_offset !== "" &&
      filters?.year !== ""
    ) {
      filtered = data.filter(
        (record) =>
          record?.arr_state == filters?.state_pair &&
          record?.subject_offset == filters?.subject_offset &&
          record?.year == filters?.year
      );
    }

    return filtered;
  };

  useEffect(() => {
    const filtered = filterRecords(filters);
    setFilteredRecord(filtered);
  }, [filters]);

  return (
    <>
      <Container fluid className="main-class">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Row className="d-flex align-items-center justify-content-between">
              <Col md={6}>
                <h4 className="py-3">
                  Total Annual Emissions For Each State Pair
                </h4>
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
            <Row>
              <Col>
                <Table className="currentEmission">
                  <thead>
                    <tr>
                      <th>State</th>
                      <th>To state</th>
                      <th>Year</th>
                      <th>Subject to offsetting</th>
                      <th>
                        Co<sub>2</sub> Emissions(tons)
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
                          {item.total
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <div className="fw-bold">Total Emissions</div>
                      </td>
                      <td>
                        <div className="fw-bold">
                          {total
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                          (tons)
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </>
        )}
      </Container>
      {modalFilter && (
        <ModalFilter
          toState={toState}
          stateYear={stateYear}
          handleClose={hideModalFilter}
          handleApply={handleApply}
        />
      )}
    </>
  );
};

export default TotalStatePair;
