import React, { useState } from "react";
import { Container, Row, Card, Modal, Button, Form } from "react-bootstrap";

export default function Posts(props) {
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [thoughts, setThoughts] = useState("");
  const [oldThoughts, setOldThoughts] = useState("");
  const [index, setIndex] = useState(0);

  //TODO: ask database if data is there, so a try-catch loop will not be needed. 
  let name;
  let posts;
  try {
    name = JSON.parse(localStorage.getItem("name"));
    posts = JSON.parse(localStorage.getItem("posts"));
    if (posts === null) {
      console.log("NULL");
      posts = [{
        id: 0,
        name: "No Posts",
        post: "There are no posts. Make some more!",
      }];
    }
    //posts.reverse();
    console.log(posts);
    props.setloggedInStatus;
  } catch (e) {
    console.log(e);
  }

  const handleClose = () => setShow(false);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(name, thoughts);
    let time = new Date();
    //gets the latest ID
    let id = posts[posts.length - 1].id;
    posts.push({ id: id + 1, name: name, post: thoughts, time: time });
    let json = JSON.stringify(posts);
    localStorage.setItem("posts", json);
    console.log(posts);
  }

  function editPost(id, post) {
    setOldThoughts(post);
    setIndex(id);
    setEdit(true);
  }

  function handleEdit() {
    const objIndex = posts.map(obj =>
      obj.id === index
        ? { ...obj, post: oldThoughts }
        : obj
    );
    let json = JSON.stringify(objIndex);
    localStorage.setItem("posts", json);
    setEdit(false);
  }

  function handleShow(id) {
    setIndex(id);
    setShow(true);
  }

  function handleDelete() {
    let filtered = posts.filter(
      function (el) {
        return el.id != index;
      });
    let json = JSON.stringify(filtered);
    localStorage.setItem("posts", json);
    setShow(false);
  }

  return (
    <div>
      <div className="welcome-area-profile">
        <Container>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton><Modal.Title>Delete Post</Modal.Title></Modal.Header>
            <Modal.Body><p>Are you sure you want to delete this post?</p></Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleDelete}>Yes, Delete</Button>
              <Button variant="primary" onClick={handleClose}>No</Button>
            </Modal.Footer>
          </Modal>

          <Modal show={edit} onHide={() => setEdit(false)}>
            <Modal.Header closeButton><Modal.Title>Edit Post</Modal.Title></Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleEdit}>
                <Form.Group size="lg">
                  <Form.Control autoFocus as="textarea" rows={5} value={oldThoughts} onChange={(e) => setOldThoughts(e.target.value)} required /><br />
                </Form.Group>
                <Button type="submit">
                  Edit Post
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
          <Row>
            <div className="text-area">
              <Card>
                <Card.Header>{name}</Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="post">
                      <Form.Control autoFocus as="textarea" rows={5} placeholder="Share your thoughts..." value={thoughts} onChange={(e) => setThoughts(e.target.value)} required /><br />
                    </Form.Group>
                    <Button type="submit">
                      Post
                    </Button>
                  </Form>
                </Card.Body>
              </Card>


              <div className="posts">
                {
                  posts.map((data, key) => {
                    return (
                      <div key={key}>
                        <Card>
                          <Card.Body>
                            <Card.Title>{data.name}: {data.id}
                              <span><a href="#" onClick={() => editPost(data.id, data.post)}>EDIT</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onClick={() => handleShow(data.id)}>DELETE</a></span></Card.Title>
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