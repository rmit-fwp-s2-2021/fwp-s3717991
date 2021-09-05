import React, {useState} from "react";
import { Container, Col, Row } from "react-bootstrap";
import Login from "./Login";
import Signup from "./Signup";
import "../App.css";


export default function header() {
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);

  function shown() {
    setLogin(false);
    setSignup(false);
  }

  function signupShowHide() {
    setSignup(!signup);
  }

  return (
    <header className="banner">
      {login ? <Login shown={login} handleClose={shown} handleSwitch={signupShowHide}/> : ""}
      {signup ? <Signup shown={signup} handleClose={shown} handleSwitch={signupShowHide}/> : ""}
      <Container>
        <Row>
          <Col xs={12}>
            <a className="logo">Vibe Check</a>
            <ul className="nav">
              <li><a href="#welcome" className="menu-item">Home</a></li>
              <li><a href="#about" className="menu-item">About</a></li>
              <li><a href="#contact-us" className="menu-item">Contact Us</a></li>
              <li></li>
            </ul>
            <div className="sign-up">
              <a onClick={() => setLogin(!login)} className="main-button-slider">Sign Up / Login</a>
            </div>
          </Col>

        </Row>
      </Container>

    </header>
  );
}