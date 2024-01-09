import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import side from "../../assets/images/side.png";
import art from "../../assets/images/Artboard.png";
import EmailIcon from "../../assets/images/email.svg";
import PasswordIcon from "../../assets/images/password.svg";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import UsePasswordToggle from "../../utils/UsePasswordToggle";
import { BASE_URL, LOGIN } from "../../config/Constants";
import { setUser } from "../../store/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import makeToast from "../../config/Toaster";
import { BsExclamationTriangleFill } from "react-icons/bs";

const SignInVb = () => {
  const [Inputpassword, Toggleicon] = UsePasswordToggle();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
    emailAndPasswordError: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    let login = localStorage.getItem("token");

    if (login && user && user.user_type === "VB") {
      navigate("/vb");
    }
  }, [user]);
  //handle Email
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setError((prevState) => ({
      ...prevState,
      emailError: "",
      emailAndPasswordError: "",
    }));
  };
  //handle password
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setError((prevState) => ({
      ...prevState,
      passwordError: "",
      emailAndPasswordError: "",
    }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    let formValid = true;
    if (email === "") {
      setError((prevState) => ({
        ...prevState,
        emailError: "Please provide your email to continue.",
        emailAndPasswordError: "",
      }));
      formValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        emailError: "",
      }));
    }

    if (password === "") {
      setError((prevState) => ({
        ...prevState,
        passwordError: "Please provide your password to continue.",
        emailAndPasswordError: "",
      }));
      formValid = false;
    } else {
      setError((prevState) => ({
        ...prevState,
        passwordError: "",
      }));
    }
    setLoading(true);
    if (formValid) {
      let loginData = { email, password, user_type: "vb" };
      try {
        let response = await axios.post(`${BASE_URL}${LOGIN}`, loginData);
        console.log("response", response.message);
        setLoading(false);
        if (
          response.status == 404 ||
          response.status == 400 ||
          response.status == 201
        ) {
          if (response.data.message) {
            return console.log("error", response.data.message);
          }
        }
        if (response.status === 200) {
          dispatch(setUser(response.data.data.user));
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.data.user));
          console.log("response.data.data", response.data.data);
          navigate("/vb");
        }
      } catch (err) {
        setLoading(false);
        setError((prevState) => ({
          ...prevState,
          emailAndPasswordError:
            "Incorrect email or password. Please try again.",
        }));
      }
    }
  };

  return (
    <Container fluid>
      <Row className="main-rowAll">
        <Col md={6} className="h-100 p-0 m-0">
          <img src={side} alt="sideimage" className="bgFor-img" />
          <img src={art} alt="art" className="forTop-img" />
        </Col>
        <Col md={6} className="spaceAll">
          <Row className="pt-4">
            <Col md={12}>
              <h4 className="pb-3">Sign in</h4>
              <form className="form_container" onSubmit={handleLogin}>
                <div className="input_container">
                  <img src={EmailIcon} className="icon" alt="emailIcon" />
                  <input
                    placeholder="user@example.com"
                    title="Inpit title"
                    name="input-name"
                    type="email"
                    value={email}
                    onChange={handleEmail}
                    className="input_field"
                    id="email_field"
                  />
                </div>
                {error?.emailError && (
                  <Alert
                    variant="danger"
                    className="d-flex align-items-center p-1 "
                  >
                    <BsExclamationTriangleFill className="mr-2" size={16} />
                    <p className="mb-0 fs-sm text-center ps-1">
                      {error?.emailError}
                    </p>
                  </Alert>
                )}
                <div className="input_container yes">
                  <img src={PasswordIcon} className="icon" alt="passwordIcon" />

                  <input
                    placeholder="Password"
                    title="password"
                    name="password"
                    type={Inputpassword}
                    value={password}
                    onChange={handlePassword}
                    className="input_field"
                    id="password_field"
                  />
                  <span className="passwordToggleIcon2">{Toggleicon}</span>
                </div>
                {error?.passwordError && (
                  <Alert
                    variant="danger"
                    className="d-flex align-items-center p-1 "
                  >
                    <BsExclamationTriangleFill className="mr-2" size={16} />
                    <p className="mb-0 fs-sm text-center ps-1">
                      {error?.passwordError}
                    </p>
                  </Alert>
                )}
                <div className="d-flex justify-content-end forLink">
                  <Link to="/forgot">Forget Password?</Link>
                </div>

                <button title="Sign In" type="submit" className="sign-in_btn">
                  <span>Sign In</span>
                </button>
                {error?.emailAndPasswordError && (
                  <Alert
                    variant="danger"
                    className="d-flex align-items-center p-1 "
                  >
                    <BsExclamationTriangleFill className="mr-2" size={16} />
                    <p className="mb-0 fs-sm text-center ps-1">
                      {error?.emailAndPasswordError}
                    </p>
                  </Alert>
                )}
              </form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInVb;
