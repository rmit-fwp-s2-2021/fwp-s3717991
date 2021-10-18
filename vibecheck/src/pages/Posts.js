import React, { useState, useReducer, useEffect, useCallback } from "react"
import { Container, Row, Card, Modal, Button, Form } from "react-bootstrap"
import axios from "axios"

function reducer(post, action) {
  switch (action.type) {
    case "addpost":
      return [...post, newPost(action.payload.name, action.payload.thoughts)]
    case "editpost":
      return post.map(post => {
        if (post.id === action.payload.id) {
          return { ...post, post: action.payload.thoughts, time: `Edited on: ${new Date().toString()}` }
        }
        return post
      })
    case "deletepost":
      return post.filter(post => post.id !== action.payload.id)
    default:
      return post
  }
}

function newPost(name, post) {
  return { id: Date.now(), name: name, post: post, time: new Date().toString() }
}

export default function Posts() {
  //Saves space by always using credentials
  axios.defaults.withCredentials = true
  let postList = []

  const [edit, setEdit] = useState(false)
  const [show, setShow] = useState(false)
  const [thoughts, setThoughts] = useState("")
  const [oldThoughts, setOldThoughts] = useState("")
  const [index, setIndex] = useState(0)
  const [name, setName] = useState("")
  const [post, update] = useReducer(reducer, postList)
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState(null)



  useEffect(async () => {
    try {
      const results = await axios.get("http://localhost:8080/api/users/login/valid")
      console.log(results)
      if (results.data === null) {
        console.log(null)
      } else {
        setName(results.data.user.name)
      }
    } catch (error) {
      console.log(error)
    }

    renderPosts()
  }, [])

  async function getPostData() {

  }

  const getdPostData = useCallback(async () => {
    let results = await axios.get("http://localhost:8080/api/posts")
    console.log("results: " + results.data)
    if (results.data === data) {
      console.log(" not changing")

    } else {
      console.log("whoop")
      setData(results.data)
    }

    console.log("Data: " + data)
  })

  /*useEffect(() => {
    getPostData()
  })*/

  async function renderPosts() {
    try {
      let results = await axios.get("http://localhost:8080/api/posts")
      console.log(results.data)
      postList = results.data
      console.log(postList)
      return (
        postList.map(data => {
          return (
            <div key={data.post_id}>
              <Card>
                <Card.Body>
                  <Card.Title>{data.user_id}
                    <span><a href="#" onClick={() => editPost(data.id, data.post)}>EDIT</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onClick={() => handleShow(data.id)}>DELETE</a></span></Card.Title>
                  <Card.Text>{data.content}</Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">{data.updatedAt}</Card.Footer>
              </Card>
            </div>
          )
        }))
    } catch (error) {
      console.log(error)
    }
  }

  function handleShow(id) {
    setIndex(id)
    setShow(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(thoughts)
    const results = await axios({
      method: "post",
      url: "http://localhost:8080/api/posts",
      data: {
        content: thoughts,
        user: name
      }

    })
    await update({ type: "addpost", payload: { name: name, thoughts: thoughts } })
    await localStorage.setItem("post", JSON.stringify(post))
    setThoughts("")
  }

  async function handleEdit(e) {
    e.preventDefault()
    await update({ type: "editpost", payload: { id: index, thoughts: oldThoughts } })
    await localStorage.setItem("post", JSON.stringify(post))
    setEdit(false)
  }

  function editPost(id, post) {
    setOldThoughts(post)
    setIndex(id)
    setEdit(true)
  }

  async function handleDelete() {
    await update({ type: "deletepost", payload: { id: index } })
    await localStorage.setItem("post", JSON.stringify(post))
    setShow(false)
  }

  return (
    <div>
      <div className="welcome-area-profile">
        <Container>

          <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton><Modal.Title>Delete Post</Modal.Title></Modal.Header>
            <Modal.Body><p>Are you sure you want to delete this post?</p></Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleDelete}>Yes, Delete</Button>
              <Button variant="primary" onClick={() => setShow(false)}>No</Button>
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
                {renderPosts}
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </div>
  )
}