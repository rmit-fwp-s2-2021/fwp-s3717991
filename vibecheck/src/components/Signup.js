import React, { useState } from "react"
import { Modal, Form, Button, FloatingLabel, InputGroup } from "react-bootstrap"
import "../App.css"
import axios from "axios"
import bcrypt from "bcryptjs"

export default function Signup(props) {
  const [show, setShow] = useState(true)
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
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
      //Check to see if username is unique
      try {
        const results = await axios.get(`http://localhost:8080/api/users/${name}`)
        if (results.data === null) {
          //if null, get was successful, but there is no username, thus, it is unique.
          //Posts the data to the database to create a new user.
          //FIXME: Hash the password
          //TODO: ensure that the email is unique.
          try {
            //Hash password locally first
            bcrypt.hash(password, 10, async function (err, hash) {
              await axios({
                method: "post",
                url: "http://localhost:8080/api/users",
                data: {
                  name: name,
                  password: hash,
                  email: email
                }
              })

            })
            //TODO: Just show alert that user can now login
            handleClose
          } catch (e) {
            console.log(e)
          }


        } else {
          //If not null, get was successful, meaning, duplicate
          //TODO: Create Alert here about unique username
        }
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
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mini-font"><p>Already have an account? <button className="register" onClick={() => { props.handleSwitch() }}>Login Here</button></p></div>
        <div className="contact-form-login">

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="name">
              <FloatingLabel
                controlId="flopatingInput"
                label="Username"
                className="md-3"
              >
                <Form.Control autoFocus type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="username" required />
                <Form.Control.Feedback className="muted-text" type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
                <Form.Control.Feedback className="muted-text" type="valid">
                  Looks Good!
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group size="lg" controlId="email">
              <FloatingLabel
                controlId="flopatingInput"
                label="Email"
                className="md-3"
              >
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" required />
                <Form.Control.Feedback className="muted-text" type="invalid">
                  Please enter your email
                </Form.Control.Feedback>
                <Form.Control.Feedback className="muted-text" type="valid">
                  Looks Good!
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group size="lg" controlId="password" hasValidation>
              <InputGroup hasValidation>
                <FloatingLabel
                  controlId="flopatingInput"
                  label="Password"
                  className="md-3 password"

                >
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    required
                    pattern="^(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[$&+,:=?@#|'<>.^*()%!-]).*$"
                  />
                  <Form.Control.Feedback className="muted-text" type="invalid">
                    Password must contain:
                    <ul>
                      <li>- At least 6 characters</li>
                      <li>- Contain a mix of uppercase and lowercase, numbers and symbols</li>
                    </ul>
                  </Form.Control.Feedback>
                  <Form.Control.Feedback className="muted-text" type="valid">
                    Looks Good!
                  </Form.Control.Feedback>
                </FloatingLabel>
              </InputGroup>
            </Form.Group>
            <Button block size="lg" type="submit">
              Register
            </Button>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  )
}