import React, { useState } from "react"
import { Form, Modal, Button, FloatingLabel } from "react-bootstrap"
import "../App.css"
import axios from "axios"
import bcrypt from "bcryptjs"

export default function Login(props) {
  const [show, setShow] = useState(true)
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [validated, setValidated] = useState(false)


  const handleClose = () => {
    setShow(false)
    props.handleClose()
  }

  async function handleSubmit(e) {
    //Checks form validation first.
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      e.preventDefault()
      //Check to see if username is found. 
      try {
        const results = await axios({
          method: "post",
          url: "http://localhost:8080/api/users/login",
          data: {
            name: name
          },
          withCredentials: true,
        })
        console.log(results.data)
        //If data is null, username or password is wrong. Only name is send if correct for security
        if (results.data === null) {
          //TODO: Create Alert here about incorrect username or password
        } else {
          const res = await bcrypt.compare(password, results.data.password)
          console.log(res)
          if (res) {
            console.log("working?")
            localStorage.setItem("name", results.data.username)
            localStorage.setItem("loggedIn", true)
            handleClose()
          }
        }


        //Log simple data to localstorage so database isn't contacted as much. NOTE: Data should not be sensitive. 
      } catch (error) {
        console.log(error)
      }
    }

    //const results = await validateForm()
    //console.log(results)

    setValidated(true)
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mini-font">
          <p>
            New to VibeCheck? <button className="register" onClick={() => { props.handleSwitch() }}>Register Here</button></p>
        </div>
        <div className="contact-form-login">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="email">
              <FloatingLabel
                controlId="flopatingInput"
                label="Username"
                className="md-3"
              >
                <Form.Control autoFocus required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="username" />
                <Form.Control.Feedback className="muted-text" type="invalid">
                  Please enter your username.
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <FloatingLabel
                controlId="flopatingInput"
                label="Password"
                className="md-3"
              >
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  required
                />
                <Form.Control.Feedback className="muted-text" type="invalid">
                  Please enter your password
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Button block size="lg" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  )
}
