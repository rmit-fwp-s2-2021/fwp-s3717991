import React from "react";
import {Container, Row, Col} from "react-bootstrap";

export default function Profile() {

  return(
    <div>
      <div className="welcome-area-profile">
        <Container>
          <Row>
            <Col xs={6}>
              <div className="text-area">
                <h1>Profile</h1>
                <p>Name:</p>
                <p>Email:</p>
                <p>Date Joined: </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}