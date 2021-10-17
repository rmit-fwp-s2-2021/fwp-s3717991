import React, { useState } from "react"
import { Container, Row, Card, Modal, Button } from "react-bootstrap"
import EditUser from "../components/EditUser"

export default function Profile(props) {
  const [edit, setEdit] = useState(false)
  const [show, setShow] = useState(false)

  function shown() {
    setEdit(!edit)
  }

  //TODO: ask database if data is there, so a try-catch loop will not be needed. 
  let name, email, time
  try {
    name = JSON.parse(localStorage.getItem("name"))
    email = JSON.parse(localStorage.getItem("email"))
    time = JSON.parse(localStorage.getItem("time"))
  } catch (e) {
    console.log(e)
  }
  props.setloggedInStatus

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  function deleteUser() {
    //TODO: Delete from database file when this exists
    localStorage.setItem("name", "")
    localStorage.setItem("email", "")
    localStorage.setItem("time", "")
    localStorage.setItem("password", "")
    handleClose()
    window.location.href = "/"
  }

  function editUser() {
    setEdit(true)
  }


  return (
    <div>
      <div className="welcome-area-profile">
        <Container>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton><Modal.Title>Delete User</Modal.Title></Modal.Header>
            <Modal.Body><p>Are you sure you want to delete this user?</p></Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => deleteUser()}>Yes, Delete</Button>
              <Button variant="primary" onClick={handleClose}>No</Button>
            </Modal.Footer>
          </Modal>

          {edit ? <EditUser shown={edit} handleClose={shown} /> : ""}
          <Row>
            <div className="text-area">
              <Card>
                <Card.Header>Profile
                  <span><a href="#" onClick={editUser}>EDIT</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onClick={handleShow}>DELETE</a></span>
                </Card.Header>
                <Card.Body>
                  <Card.Title>{name}</Card.Title>
                  <Card.Subtitle>{email}</Card.Subtitle>
                  <Card.Text>Date Joined: {time}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Row>
        </Container>
      </div>
    </div>
  )
}