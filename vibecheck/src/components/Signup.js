import React, { useState } from "react";
import { Modal, Row } from "react-bootstrap";
import "../App.css";

export default function Signup(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    props.handleClose();
  };


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mini-font"><p>Already have an account? <button className="register" onClick={() => {props.handleSwitch();}}>Login Here</button></p></div>
        <div className="contact-form-login">
          <form id="signup" action="" method="post">
            <Row>
              <fieldset>
                <label>Name</label>
                <input name="signup-name" type="text" id="signup-name" required />
              </fieldset>
            </Row>
            <Row>
              <fieldset>
                <label>Email Address</label>
                <input name="signup-email" type="email" id="signup-email" required />
              </fieldset>
            </Row>
            <Row>
              <fieldset>
                <label>Password</label>
                <input name="signup-password" type="password" id="signup-pasword" required />
              </fieldset>
            </Row>
            <Row>
              <fieldset>
                <button type="submit" id="signup-form-submit" className="main-button login">Login</button>
              </fieldset>
            </Row>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}