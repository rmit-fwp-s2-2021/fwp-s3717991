import React, { useState, useEffect } from "react"
import { Container, Row, Card, Modal, Button } from "react-bootstrap"
import EditUser from "../components/EditUser"
import axios from "axios"

export default function Profile() {
  const [edit, setEdit] = useState(false)
  const [show, setShow] = useState(false)
  const [name, setName] = useState(localStorage.getItem("name"))
  const [email, setEmail] = useState("")
  const [time, setTime] = useState("")

  //Load the users information on mount.
  useEffect(() => {
    loadUser()
  })

  useEffect(async () => {
    const res = await axios({
      method: "get",
      url: "http://localhost:8080/api/users/login/valid",
      withCredentials: true,
    })
    if (res.data.loggedIn === true){
      setName(res.data.user.name)
    }
  }, [])

  

  function shown() {
    setEdit(!edit)
  }

  async function loadUser() {
    try {
      const results = await axios.get(`http://localhost:8080/api/users/${name}`)
      if (results.data === null) {
        console.log(null)
      } else {
        setName(results.data.name)
        setEmail(results.data.email)
        setTime(results.data.createdAt)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  async function deleteUser() {
    console.log("deleteing: " + name)
    const results = await axios.delete(`http://localhost:8080/api/users/${name}`)
    console.log(results.data)
    if (results.data) {
      handleClose()
      window.location.href = "/"
    }
    
  }

  function editUser() {
    setEdit(true)
  }

  async function logout() {
    await axios({
      method: "get",
      url: "http://localhost:8080/api/users/login/logout",
      withCredentials: true,
    })
    window.location.href = "/"
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
                  <span><a href="#" onClick={logout}>LOGOUT</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onClick={editUser}>EDIT</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onClick={handleShow}>DELETE</a></span>
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