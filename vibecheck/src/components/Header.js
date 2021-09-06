import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Login from "./Login";
import Signup from "./Signup";
import "../App.css";


export default function header(props) {
  const [signup, setSignup] = useState(false);
  const [login, setLogin] = useState(false);



  function shown() {
    setLogin(false);
    setSignup(false);
  }

  function signupShowHide() {
    setSignup(!signup);
    setLogin(!login);
  }

  /*function buttonSelect() {
    //Check to see if the user is logged in
    console.log("testing");
  }*/

  return (
    <header className="banner">
      {login ? <Login shown={login} handleClose={shown} handleSwitch={signupShowHide} login={props.login} /> : ""}
      {signup ? <Signup shown={signup} handleClose={shown} handleSwitch={signupShowHide} /> : ""}
      <Container>
        <Row>
          <Col xs={12}>
            <a className="logo">Vibe Check</a>
            <ul className="nav">
              <li><a href="/" className="menu-item">Home</a></li>
              <li><a href="#about" className="menu-item">About</a></li>
              <li><a href="#contact-us" className="menu-item">Contact Us</a></li>
              <li></li>
            </ul>
            <div className="sign-up">
              <p>
                {props.loggedInStatus ? <a href="/profile" className="main-button-slider">Profile Page</a> : <a onClick={() => setLogin(!login)} className="main-button-slider">Sign Up / Login</a>}
              </p>

            </div>
          </Col>

        </Row>
      </Container>

    </header>
  );
}