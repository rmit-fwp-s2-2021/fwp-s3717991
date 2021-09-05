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
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}