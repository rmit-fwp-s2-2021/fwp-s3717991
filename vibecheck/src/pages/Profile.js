import React, { useState } from "react";
import { Container, Row, Card } from "react-bootstrap";
import EditUser from "../components/EditUser";

export default function Profile(props) {
  const [edit, setEdit] = useState(false);

  function shown() {
    setEdit(!edit);
  }

  //TODO: ask database if data is there, so a try-catch loop will not be needed. 
  let name, email, time;
  try {
    name = JSON.parse(localStorage.getItem("name"));
    email = JSON.parse(localStorage.getItem("email"));
    time = JSON.parse(localStorage.getItem("time"));
  } catch (e) {
    console.log(e);
  }
  props.setloggedInStatus;

  function deleteUser() {
    //TODO: Delete from database file when this exists
    localStorage.setItem("name", "");
    localStorage.setItem("email", "");
    localStorage.setItem("time", "");
    localStorage.setItem("password", "");
  }

  function editUser() {
    setEdit(true);
  }


  return (
    <div>
      <div className="welcome-area-profile">
        <Container>
          {edit ? <EditUser shown={edit} handleClose={shown} /> : ""}
          <Row>
            <div className="text-area">
              <Card>
                <Card.Header>Profile
                  <span><a href="#" onClick={editUser}>EDIT</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onClick={deleteUser}>DELETE</a></span>
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
  );
}