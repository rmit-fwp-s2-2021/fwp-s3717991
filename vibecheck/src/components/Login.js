import React, { useState } from "react";
import { Modal, Row } from "react-bootstrap";
import "../App.css";

export default function Login(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    props.handleClose();
  };


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mini-font"><p>New to VibeCheck? <button className="register" onClick={() => {props.handleSwitch();}}>Register Here</button></p></div>
        <div className="contact-form-login">
          <form id="login" action="" method="post">
            <Row>
              <fieldset>
                <label>Name</label>
                <input name="login-name" type="text" id="login-name" required />
              </fieldset>
            </Row>
            <Row>
              <fieldset>
                <label>Password</label>
                <input name="login-password" type="password" id="login-pasword" required />
              </fieldset>
            </Row>
            <Row>
              <fieldset>
                <button type="submit" id="login-form-submit" className="main-button login">Login</button>
              </fieldset>
            </Row>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}