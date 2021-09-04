import React, {useState} from "react";
import { Container, Col, Row } from "react-bootstrap";
import Login from "./Login";


export default function header() {
  const [signup, setSignup] = useState(false);

  function shown() {
    setSignup(false);
  }

  return (
    <header className="banner">
      {signup ? <Login shown={signup} handleClose={shown}/> : ""}
      <Container>
        <Row>
          <Col xs={12}>
            <a className="logo">Vibe Check</a>
            <ul className="nav">
              <li><a href="#welcome" className="menu-item">Home</a></li>
              <li><a href="#about" className="menu-item">About</a></li>
              <li><a href="#testimonials" className="menu-item">Testimonials</a></li>
              <li><a href="#contact-us" className="menu-item">Contact Us</a></li>
              <li></li>
            </ul>
            <div className="sign-up">
              <a onClick={() => setSignup(!signup)} className="main-button-slider">Sign Up / Login</a>
            </div>
          </Col>

        </Row>
      </Container>

    </header>
  );
}