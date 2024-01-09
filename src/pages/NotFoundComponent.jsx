import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateButton from "../components/CreateButton/CreateButton";

const NotFoundComponent = () => {
  return (
    <Container>
      <Row>
        <Col>
          <div className="d-flex justify-content-center align-items-center min-vh-100 flex-column">
            <div className="text-center">
              <h1>Oops!</h1>
              <h2>404 - Page Not Found</h2>
              <p>The page you are looking for does not exist.</p>
            </div>

            <div>
              <Link to="/">
                <CreateButton width={"200px"} title={"Go Back To Home Page"} />
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundComponent;
