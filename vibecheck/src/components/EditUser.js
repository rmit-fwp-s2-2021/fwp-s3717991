import React, { useState, useEffect } from "react"
import { Modal, Form, Button, FloatingLabel, InputGroup } from "react-bootstrap"
import "../App.css"
import bcrypt from "bcryptjs"
import axios from "axios"

export default function EditUser(props) {
  const [show, setShow] = useState(true)
  const [name, setName] = useState("")
  const [password, setPassword] = useState()
  const [email, setEmail] = useState("")
  const [validated, setValidated] = useState(false)
  const [oldName, setOldName] = useState("")

  const handleClose = () => {
    setShow(false)
    props.handleClose()
  }

  useEffect(async () => {
    const res = await axios({
      method: "get",
      url: "http://localhost:8080/api/users/login/valid",
      withCredentials: true,
    })
    if (res.data.loggedIn === true) {
      setName(res.data.user.name)
      setOldName(res.data.user.name)
      setEmail(res.data.user.email)
    }
  }, [])

  async function handleSubmit(e) {
    //Checks form validation first.
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      e.preventDefault()
      //Posts the data to the database to create a new user.
      console.log("password: " + oldName)
      try {
        //Hash password locally first
        bcrypt.hash(password, 10, async function (err, hash) {
          await axios({
            method: "put",
            url: `http://localhost:8080/api/users/${name}`,
            data: {
              oldName: oldName,
              name: name,
              password: hash,
              email: email
            }
          })

        })

        //TODO: Just show alert that user can now login
        //handleClose
      } catch (e) {
        console.log(e)
      }
    }
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
              <FloatingLabel
                controlId="flopatingInput"
                label="Username"
                className="md-3"
              >
                <Form.Control autoFocus type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </FloatingLabel>
            </Form.Group>
            <Form.Group size="lg" controlId="email">
              <FloatingLabel
                controlId="flopatingInput"
                label="Email"
                className="md-3"
              >
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FloatingLabel>
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <InputGroup>
                <FloatingLabel
                  controlId="flopatingInput"
                  label="Password"
                  className="md-3 password"

                >
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FloatingLabel>
              </InputGroup>
            </Form.Group>
            <Button block size="lg" type="submit">
              Save Changes
            </Button>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  )
}