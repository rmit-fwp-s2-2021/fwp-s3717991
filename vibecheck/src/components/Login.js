import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import "../App.css";

export default function Login(props) {
  const [show, setShow] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");


  const handleClose = () => {
    setShow(false);
    props.handleClose();
  };

  function validateForm() {
    return name.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(name, password); 
    console.log(localStorage.getItem("name"), localStorage.getItem("password")); 
    //Check Login info
    if(name == JSON.parse(localStorage.getItem("name")) && password == JSON.parse(localStorage.getItem("password"))){
      props.login();
      //window.location.href = "/profile";
      handleClose();
    } else {
      console.log("Username and Password do not match!");
    }
    
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mini-font">
          <p>
            New to VibeCheck? <button className="register" onClick={() => {props.handleSwitch();}}>Register Here</button></p>
        </div>
        <div className="contact-form-login">
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Name</Form.Label>
              <Form.Control autoFocus type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button block size="lg" type="submit" disabled={!validateForm()}>
              Login
            </Button>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
