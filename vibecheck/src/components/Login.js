import React, {useState} from "react";
import { Button, Modal } from "react-bootstrap";

export default function Login(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    props.shown;
  };


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>This is {props.shown.toString()}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}