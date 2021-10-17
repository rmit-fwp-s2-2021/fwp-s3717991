import React, { useState } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import "../App.css"
import axios from "axios"

export default function Signup(props) {
  const [show, setShow] = useState(true)
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const handleClose = () => {
    setShow(false)
    props.handleClose()
  }

  function validateForm() {
    //Do validation here
    if (name.length > 0 && email.length > 0 && password.length > 0) {
      //Validate Password here:
      const reg = new RegExp("^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[$&+,:=?@#|'<>.^*()%!-]).*$")
      const okPassword = reg.test(password)

      if (okPassword) {
        return true
      } else {
        console.log("password not strong enough")
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    //posts the data to the database to create a new user.
    //FIXME: Hash the password
    //TODO: ensure that the email is unique.
    //TODO: Alerts
    try {
      await axios({
        method: "post",
        url: "http://localhost:8080/api/users",
        data: {
          name: name,
          password: password,
          email: email
        }
      })
      window.location.href = "/profile"
      handleClose
    } catch (e) {
      console.log(e)
      //TODO: Show error alert here
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mini-font"><p>Already have an account? <button className="register" onClick={() => { props.handleSwitch() }}>Login Here</button></p></div>
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
              Register
            </Button>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  )
}