import React, { useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Form } from "react-bootstrap";
import ErrorMessage from "../../components/ErrorMessage";
import axios from "axios";
import { Loding } from "../../components/Loding";

const RegisterPage = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  });
  const [errorMessage, setErrorMessage] = useState({
    message: null,
    picMessage: null,
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (userDetails.password !== userDetails.confirmPassword) {
      setErrorMessage({ ...errorMessage, message: "Passwords Do not Match" });
    } else {
      setErrorMessage(null);

      try {
        setLoading(true);
        const { data } = await axios.post(
          "/api/users",
          {
            name: userDetails.name,
            email: userDetails.email,
            password: userDetails.password,
            pic: userDetails.pic,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
      } catch (e) {
        setError(e.response.data.message);
        setLoading(false);
      }
    }
  };

  const uploadPic = async (pics) => {
    if (!pics) {
      return setErrorMessage({
        ...errorMessage,
        picMessage: "Please Select an Image!",
      });
    }
    setErrorMessage({ ...errorMessage, picMessage: null });
    if (pics.type === "jpeg/image" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "SnapNotes");
      data.append("cloud_name", "dbiove79b");
      try {
        const resp = await fetch(
          "https://api.cloudinary.com/v1_1/dbiove79b/image/upload",
          {
            method: "post",
            body: data,
          }
        );
        const data_1 = await resp.json();
        setUserDetails({ ...userDetails, pic: data_1.url.toString() });
      } catch (err) {
        console.log(err);
      }
    } else {
      return setErrorMessage({
        ...errorMessage,
        picMessage: "Please Select an Image!",
      });
    }
  };
  return (
    <MainScreen title="Register">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {errorMessage?.message && (
          <ErrorMessage variant="danger">{errorMessage?.message}</ErrorMessage>
        )}
        {loading && <Loding />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={userDetails.name}
              placeholder="Enter name"
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={userDetails.email}
              placeholder="Enter email"
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={userDetails.password}
              placeholder="Password"
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              value={userDetails.confirmPassword}
              placeholder="Confirm password"
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  confirmPassword: e.target.value,
                })
              }
            />
            {errorMessage?.picMessage && (
              <ErrorMessage variant="danger">
                {errorMessage?.picMessage}
              </ErrorMessage>
            )}
          </Form.Group>
          <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              label="upload profile picture"
              onChange={(e) => uploadPic(e.target.files[0])}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Register
          </Button>
        </Form>
      </div>
    </MainScreen>
  );
};

export default RegisterPage;
