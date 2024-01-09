import React, { useEffect, useState } from "react";
import { Col, Container, FormControl, Row } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import AddNewao from "./AddNewao";
import CreateButton from "../../../../components/CreateButton/CreateButton";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserAO,
  deleteUserAO,
  getUserAOStatus,
  getdataAO,
  updateUserAO,
} from "../../../../store/StateAgent/RoleManagment/AOSlice";
import Loader from "../../../../components/Loader/Loader";
const AeroplaneOperators = () => {
  const dispatch = useDispatch();
  const { allusersAO, loading } = useSelector((state) => state.AOUser);
  const users = [...allusersAO].reverse();
  const { user } = useSelector((state) => state.auth);
  const [showAddOpertaor, setShowAddOperator] = useState(false);
  const [isEdit, setIsEdit] = useState(null);
  const [error, setError] = useState({
    airlineNameError: "",
    emailError: "",
    passwordError: "",
    icaoCodeError: "",
  });

  // Modal FormData
  const [modalFormData, setModalFormData] = useState({
    airlineName: "",
    email: "",
    password: "",
    icaoCode: "",
  });

  const { airlineName, email, password, icaoCode } = modalFormData;
  const handleOnChange = (e) => {
    setModalFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
    setError((prevState) => ({
      ...prevState,
      airlineNameError: "",
    }));
    setError((prevState) => ({
      ...prevState,
      emailError: "",
    }));
    setError((prevState) => ({
      ...prevState,
      icaoCodeError: "",
    }));
    setError((prevState) => ({
      ...prevState,
      passwordError: "",
    }));
  };

  useEffect(() => {
    dispatch(getdataAO());
  }, [dispatch, user]);
  const handleCreateUserao = (event) => {
    event.preventDefault();
    const userdataAo = {
      name: airlineName,
      icao_code: icaoCode,
      email: email,
      password: password,
      user_type: "ao",
    };
    dispatch(createUserAO(userdataAo));
    setShowAddOperator(false);
    setModalFormData({
      airlineName: "",
      email: "",
      password: "",
      icaoCode: "",
    });
  };

  // delete api call here for ao user delete
  const handleDeleteAo = (id) => {
    dispatch(deleteUserAO(id));
  };
  const handleEditAo = (user) => {
    setShowAddOperator(true);
    setIsEdit(true);
    setModalFormData({
      airlineName: user.name,
      email: user.email,
      icaoCode: user.icao_code,
      password: "",
      id: user.id,
    });
  };
  const handleUpdateUser = (e) => {
    dispatch(updateUserAO(modalFormData));
    setShowAddOperator(false);
  };

  const openModal = () => setShowAddOperator(true);
  const closeModal = () => setShowAddOperator(false);

  const onAddNewUser = () => {
    setShowAddOperator(true);
    setIsEdit(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let formValid = true;
    if (modalFormData.airlineName === "") {
      setError((prevState) => ({
        ...prevState,
        airlineNameError: "Airline name is required",
      }));
      formValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        airlineNameError: "",
      }));
    }

    if (modalFormData.email === "") {
      setError((prevState) => ({
        ...prevState,
        emailError: "Email is required",
      }));
      formValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        emailError: "",
      }));
    }

    if (modalFormData.password === "") {
      setError((prevState) => ({
        ...prevState,
        passwordError: "Password is required",
      }));
      formValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        passwordError: "",
      }));
    }

    if (modalFormData.icaoCode === "") {
      setError((prevState) => ({
        ...prevState,
        icaoCodeError: "Icao code is required",
      }));
      formValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        icaoCodeError: "",
      }));
    }
    if (formValid) {
      if (isEdit) {
        handleUpdateUser(e);
        console.log("edit");
      } else if (isEdit === false) {
        handleCreateUserao(e);
      }
    }
  };

  return (
    <>
      <Container fluid className="main-class">
        {loading === "loading" ? (
          <Loader />
        ) : (
          <>
            <Row className="d-flex align-items-center justify-content-between">
              <Col md={6}>
                <h4 className="py-3">Aeroplane Operator</h4>
              </Col>
              <Col md={3}>
                <CreateButton
                  icon
                  title={"Add New AO"}
                  onClick={onAddNewUser}
                  width={"200px"}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Table className="currentEmission">
                  <thead>
                    <tr>
                      <th>Airline Name</th>
                      <th>Airline Code (ICAO Code)</th>
                      <th>Email</th>
                      {/* <th>Password</th> */}
                      <th>Creation Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <h5 className="text-muted py-3">No data to display</h5>
                    ) : (
                      users?.map((user, index) => {
                        return (
                          <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.icao_code}</td>

                            <td>{user.email}</td>
                            {/* <td>******</td> */}

                            <td>
                              {" "}
                              {moment(user.createdAt).format("Do MMMM YYYY")}
                            </td>
                            <td>
                              <div className="d-flex gap-3">
                                <div
                                  className="d-flex align-items-center gap-1"
                                  style={{
                                    cursor: "pointer",
                                    color: "var(--primary)",
                                  }}
                                  onClick={() => handleEditAo(user)}
                                >
                                  <span>
                                    {" "}
                                    <AiFillEdit
                                      style={{
                                        color: "var(--primary)",
                                        cursor: "pointer",
                                        marginBottom: "3px",
                                      }}
                                      size={20}
                                    />{" "}
                                  </span>
                                  Edit
                                </div>
                                <div
                                  className="d-flex align-items-center gap-1"
                                  style={{
                                    cursor: "pointer",
                                    color: "var(--primary)",
                                  }}
                                  onClick={() => handleDeleteAo(user.id)}
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
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </>
        )}
      </Container>

      {showAddOpertaor && (
        <AddNewao
          showAddOpertaor={showAddOpertaor}
          setShowAddOperator={setShowAddOperator}
          isEdit={isEdit}
          modalFormData={modalFormData}
          setModalFormData={setModalFormData}
          handleOnChange={handleOnChange}
          handleSubmit={handleSubmit}
          error={error}
        />
      )}
    </>
  );
};

export default AeroplaneOperators;
