import React, { useState } from "react";
import { Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import "../App.css";

export default function Signup(props) {
  const [show, setShow] = useState(true);
  const { register, formState: { errors }, handleSubmit } = useForm({ criteriaMode: "all" });
  const onSubmit = data => console.log(data);

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
        <div className="mini-font"><p>Already have an account? <button className="register" onClick={() => { props.handleSwitch(); }}>Login Here</button></p></div>
        <div className="contact-form-login">
          <form id="signup" action="" onSubmit={handleSubmit(onSubmit)} method="post">
            <Row>
              <fieldset>
                <label>Name</label>
                <input {...register("signupName", { required: "Please enter a name" })} type="text" id="signupName" />
                <ErrorMessage
                  errors={errors}
                  name="signupName"
                  render={({ message }) => <p>{message}</p>}
                />
              </fieldset>
            </Row>
            <Row>
              <fieldset>
                <label>Name</label>
                <input {...register("signupEmail", {
                  required: "Please enter an email address",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter in email address format please"
                  }
                })} type="email" id="signupEmail" />
                <ErrorMessage
                  errors={errors}
                  name="signupEmail"
                  render={({ message }) => <p>{message}</p>}
                />
              </fieldset>
            </Row>
            <Row>
              <fieldset>
                <label>Password</label>
                <input {...register("signupPassword", {
                  required: "Please enter a password",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
                  }
                })} type="password" id="signupPasword" />
                <ErrorMessage
                  errors={errors}
                  name="signupPassword"
                  render={({ message }) => <p>{message}</p>}
                />
              </fieldset>
            </Row>
            <Row>
              <fieldset>
                <button type="submit" id="signup-form-submit" className="main-button signup">signup</button>
              </fieldset>
            </Row>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}