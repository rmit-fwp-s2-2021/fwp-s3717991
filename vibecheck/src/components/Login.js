import React, { useState } from "react";
import { Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useLoginUser, useUser } from "./LoginUserContext";
import "../App.css";

export default function Login(props) {
  const [show, setShow] = useState(true);

  //This is the form that is being used, and how it handles errors and validation.
  const {
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm({ criteriaMode: "all" });
  const login = useLoginUser();
  const user = useUser();

  const handleClose = () => {
    setShow(false);
    props.handleClose();
  };

  //Logs the user in
  function loginUser() {
    console.log(isSubmitSuccessful);
    login;
  }

  //not sure why login needs to be called in a function, but it does.
  const onSubmit = (data) => {
    loginUser();
    user.name = data.loginName;
    user.email = data.emailName;
    //TODO: Save data to localstorage here
    console.log(isSubmitSuccessful, data);
    window.location.href = "/profile";
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mini-font">
          <p>
            New to VibeCheck?
            <button
              className="register"
              onClick={() => {
                props.handleSwitch();
              }}
            >
              Register Here
            </button>
          </p>
        </div>
        <div className="contact-form-login">
          <form id="login" onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <fieldset>
                <label>Name</label>
                <input
                  {...register("loginName", {
                    required: "We need your login name!",
                  })}
                  type="text"
                  id="loginName"
                />
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
                <input
                  {...register("loginPassword", {
                    required: "Password is required!",
                  })}
                  type="password"
                  id="loginPasword"
                />
                <ErrorMessage
                  errors={errors}
                  name="loginPassword"
                  render={({ message }) => <p>{message}</p>}
                />
              </fieldset>
            </Row>
            <Row>
              <fieldset>
                <button
                  type="submit"
                  id="login-form-submit"
                  className="main-button login"
                  onClick={login}
                >

                  Login
                </button>
              </fieldset>
            </Row>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
