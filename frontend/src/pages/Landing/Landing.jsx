import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./LandingPage.css";
import background from "../../background_image.jpg";

const LandingPage = () => {
  // useEffect(() => {
  //   const userInfo = localStorage?.getItem("userInfo");
  //   if (userInfo) {
  //     history.push("/mynotes");
  //   }
  // }, [history]);
  return (
    <div className="main">
      <Container>
        <Row>
          <Col>
            <img src={background} alt="background" height={500} width={500} />
          </Col>
          <Col className="intro-text">
            <div>
              <h1 className="title">Welcome to SnapNotes</h1>
              <p className="subtitle">One safe place for all your notes...</p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button size="lg" className="landingbutton">
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button
                  size="lg"
                  className="landingbutton"
                  variant="outline-primary"
                >
                  SignUp
                </Button>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
