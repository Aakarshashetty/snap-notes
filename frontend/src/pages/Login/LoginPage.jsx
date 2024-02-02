import React, {  useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import axios from "axios";
import { Loding } from "../../components/Loding";
import ErrorMessage from "../../components/ErrorMessage";

const LoginPage = ({history}) => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/users/login",
        { email: userDetails.email, password: userDetails.password },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      localStorage.setItem("UserInfo: ", JSON.stringify(data));
      console.log(data);
      setLoading(false);
    } catch (e) {
      setError(e.response.data.message);
      setLoading(false)
    }
  };
  return (
    <MainScreen title="Login">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loding />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={userDetails.password}
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New User? <Link to="/register">Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default LoginPage;
