import React, { useState } from "react";
import { Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import "../App.css";

export default function Login(props) {
  const [show, setShow] = useState(true);
  const { register, formState: {errors}, handleSubmit } = useForm({criteriaMode: "all"});
  const onSubmit = data => console.log(data);

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
        <div className="mini-font"><p>New to VibeCheck? <button className="register" onClick={() => { props.handleSwitch(); }}>Register Here</button></p></div>
        <div className="contact-form-login">
          <form id="login" action="" onSubmit={handleSubmit(onSubmit)} method="post">
            <Row>
              <fieldset>
                <label>Name</label>
                <input {...register("loginName", { required: "We need your login name!" })} type="text" id="loginName" />
                <ErrorMessage
                  errors={errors}
                  name="loginName"
                  render={({ message }) => <p>{message}</p>}
                />
              </fieldset>
            </Row>
            <Row>
              <fieldset>
                <label>Password</label>
                <input {...register("loginPassword", { required: "Password is required!" })} type="password" id="loginPasword" />
                <ErrorMessage
                  errors={errors}
                  name="loginPassword"
                  render={({ message }) => <p>{message}</p>}
                />
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