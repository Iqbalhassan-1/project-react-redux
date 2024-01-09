import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import AddNewvf from "./AddNewvf";
import CreateButton from "../../../../components/CreateButton/CreateButton";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserVB,
  deleteUserVB,
  getPostsStatus,
  getUserVBStatus,
  getVbUserLoading,
  getdataVB,
  updateUserVB,
} from "../../../../store/StateAgent/RoleManagment/VBSlice";
import Loader from "../../../../components/Loader/Loader";
const VerificationBodies = () => {
  const dispatch = useDispatch();
  // state use for show and hidden the modal of vbadd and vbedit
  const [showAddVerification, setShowAddVerification] = useState(false);
  // state use for check the modal for edit and add vbuser
  const [isEditVb, setIsEditVb] = useState(null);
  // state for createvb new
  const [modalFormDataVb, setModalFormDataVb] = useState({
    vbName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    vbNameError: "",
    emailError: "",
    passwordError: "",
  });

  // all uservb is get from api call the api  into Vbslice
  const { allusersVB, loading } = useSelector((state) => state.VBUser);

  const users = [...allusersVB].reverse();
  const { user } = useSelector((state) => state.auth);
  const { vbName, email, password } = modalFormDataVb;
  const handleOnChangeVb = (e) => {
    setModalFormDataVb((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
    setError((prevState) => ({
      ...prevState,
      vbNameError: "",
    }));
    setError((prevState) => ({
      ...prevState,
      emailError: "",
    }));
    setError((prevState) => ({
      ...prevState,
      passwordError: "",
    }));
  };
  // here they render the component when the vbuser add update and delete dispatch call
  useEffect(() => {
    dispatch(getdataVB());
  }, [dispatch, user]);
  // here the vb user create after all field will be empty if succefully add user
  const handleCreateUservb = (event) => {
    event.preventDefault();
    // create object for call api
    try {
      const userdataVb = {
        name: vbName,
        email: email,
        password: password,
        user_type: "vb",
      };
      dispatch(createUserVB(userdataVb));
      setShowAddVerification(false);
      setModalFormDataVb({
        vbName: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.error("Failed Add the user ", err);
    }
  };
  // here the vb user delete with the help of unique id
  const handleDelete = (id) => {
    dispatch(deleteUserVB(id));

    // getVbdata();
  };
  // here show modal for edit vb user if user click the edit button then show the edit modal also user data into modal
  const handleEditVb = (user) => {
    setShowAddVerification(true);
    setIsEditVb(true);
    setModalFormDataVb({
      vbName: user.name,
      email: user.email,
      password: "",
      id: user.id,
    });
    console.log("userData", user.id);
  };
  // here call the api for update user vb
  const handleUpdateUser = (e) => {
    dispatch(updateUserVB(modalFormDataVb));
    setShowAddVerification(false);
  };
  // if the user click on the add verfication btn then show add verification modal and alse edit will be false
  const onAddNewUserVb = () => {
    setShowAddVerification(true);
    setIsEditVb(false);
  };

  // they check the modal if modal is edit then edit modal show if modal is for create user then show the modal for creating vb
  const handleSubmitVb = (e) => {
    e.preventDefault();
    let formValid = true;
    if (modalFormDataVb.vbName === "") {
      setError((prevState) => ({
        ...prevState,
        vbNameError: "Verification body name is required",
      }));
      formValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        vbNameError: "",
      }));
    }

    if (modalFormDataVb.email === "") {
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

    if (modalFormDataVb.password === "") {
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
    if (formValid) {
      if (isEditVb) {
        handleUpdateUser(e);
      } else if (isEditVb === false) {
        handleCreateUservb(e);
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
                <h4 className="py-3">Verification Body</h4>
              </Col>
              <Col md={3}>
                <CreateButton
                  icon
                  title={"Add New VB"}
                  onClick={onAddNewUserVb}
                  width={"200px"}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Table className="currentEmission">
                  <thead>
                    <tr>
                      <th>Verification Body Name</th>
                      <th>Creation Date</th>
                      <th>Email</th>
                      {/* <th>Password</th> */}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.length === 0 ? (
                      <h5 className="text-muted py-3">No data to display</h5>
                    ) : (
                      users?.map((vb, index) => {
                        return (
                          <tr key={index}>
                            <td>{vb.name}</td>
                            <td>
                              {" "}
                              {moment(vb.createdAt).format("Do MMMM YYYY")}
                            </td>
                            <td>{vb.email}</td>
                            {/* <td>******</td> */}
                            <td>
                              <div className="d-flex gap-3 ">
                                <div
                                  className="d-flex align-items-center gap-1"
                                  style={{
                                    cursor: "pointer",
                                    color: "var(--primary)",
                                  }}
                                  onClick={() => handleEditVb(vb)}
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
                                  onClick={() => handleDelete(vb.id)}
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
      {showAddVerification && (
        <AddNewvf
          showAddVerification={showAddVerification}
          setShowAddVerification={setShowAddVerification}
          isEditVb={isEditVb}
          modalFormDataVb={modalFormDataVb}
          setModalFormDataVb={setModalFormDataVb}
          handleOnChangeVb={handleOnChangeVb}
          handleSubmitVb={handleSubmitVb}
          error={error}
        />
      )}
    </>
  );
};

export default VerificationBodies;
