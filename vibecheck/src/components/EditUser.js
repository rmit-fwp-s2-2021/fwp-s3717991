import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "../App.css";

export default function EditUser(props) {
  const [show, setShow] = useState(true);
  const [name, setName] = useState(JSON.parse(localStorage.getItem("name")));
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem("email")));

  const handleClose = () => {
    setShow(false);
    props.handleClose();
  };

  function validateForm() {
    //Validate Password here:
    if (password.length > 0) {
      const reg = new RegExp("^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[$&+,:;=?@#|'<>.^*()%!-]).*$");
      const okPassword = reg.test(password);

      if (okPassword) {
        return true;
      } else {
        console.log("password not strong enough");
      }
    } else {
      return true;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    //Register user here. saves to local storage for now
    if (name.length > 0) {
      localStorage.setItem("name", JSON.stringify(name));
    }
    if (email.length > 0) {
      localStorage.setItem("email", JSON.stringify(email));
    }
    if (password.length > 0) {
      localStorage.setItem("password", JSON.stringify(password));
    }
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Empty/unchanged fields will not be changed.</p>
        <div className="contact-form-login">
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control autoFocus type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button block size="lg" type="submit" disabled={!validateForm()}>
              Save Changes
            </Button>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}