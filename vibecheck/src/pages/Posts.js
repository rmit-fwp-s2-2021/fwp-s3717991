import React, { useState } from "react";
import { Container, Row, Card, Modal, Button, Form } from "react-bootstrap";
import EditUser from "../components/EditUser";

export default function Posts(props) {
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [thoughts, setThoughts] = useState("");

  //TODO: ask database if data is there, so a try-catch loop will not be needed. 
  let name;
  let posts;
  try {
    name = JSON.parse(localStorage.getItem("name"));
    posts = JSON.parse(localStorage.getItem("posts"));
    if (posts === null) {
      console.log("NULL");
      posts = [{
        name: "No Posts",
        post: "There are no posts. Make some more!",
        time: 0
      }];
    }
    posts.reverse();
    console.log(posts);
    props.setloggedInStatus;
  } catch (e) {
    console.log(e);
  }

  function shown() {
    setEdit(!edit);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleSubmit() {
    //event.preventDefault();
    console.log(name, thoughts);
    let time = new Date();
    posts.push({ name: name, post: thoughts, time: time });
    let json = JSON.stringify(posts);
    localStorage.setItem("posts", json);
    console.log(posts);
  }

  return (
    <div>
      <div className="welcome-area-profile">
        <Container>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton><Modal.Title>Delete User</Modal.Title></Modal.Header>
            <Modal.Body><p>Are you sure you want to delete this user?</p></Modal.Body>
            <Modal.Footer>
              <Button variant="secondary">Yes, Delete</Button>
              <Button variant="primary" onClick={handleClose}>No</Button>
            </Modal.Footer>
          </Modal>

          {edit ? <EditUser shown={edit} handleClose={shown} /> : ""}
          <Row>
            <div className="text-area">
              <Card>
                <Card.Header>{name}
                  <span><a href="#">EDIT</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onClick={handleShow}>DELETE</a></span>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="email">
                      <Form.Control autoFocus as="textarea" rows={5} placeholder="Share your thoughts..." value={thoughts} onChange={(e) => setThoughts(e.target.value)} required/><br />
                    </Form.Group>
                    <Button type="submit">
                      Post
                    </Button>
                  </Form>
                </Card.Body>
              </Card>


              <div className="posts">
                {posts.map((data, key) => {
                  return (
                    <div key={key}>
                      <Card>
                        <Card.Body>
                          <Card.Title>{data.name}</Card.Title>
                          <Card.Text>{data.post}</Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">{data.time}</Card.Footer>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </div>
  );
}