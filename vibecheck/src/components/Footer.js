import React from "react"
import { Container, Row, Col} from "react-bootstrap"
import "../App.css"

export default function footer() {
  return (
    <footer id="contact-us">
      <Container>
        <div className="footer-content">
          <Row>
            <Col>
              <div className="contact-form">
                <form id="contact" action="" method="post">
                  <Row>
                    <Col xs={6}>
                      <fieldset>
                        <input name="name" type="text" id="name" placeholder="Full Name" required="" />
                      </fieldset>
                    </Col>
                    <Col xs={6}>
                      <fieldset>
                        <input name="email" type="text" id="email" placeholder="E-Mail Address" />
                      </fieldset>
                    </Col>
                  </Row>
                  <Row>
                    <fieldset>
                      <textarea name="message" rows="6" id="message" placeholder="Your Message"
                        required=""></textarea>
                    </fieldset>
                  </Row>
                  <Row>
                    <fieldset>
                      <button type="submit" id="form-submit" className="main-button">Send Message</button>
                    </fieldset>
                  </Row>
                </form>
              </div>
            </Col>
            <Col className="right-content">
              <h2>More About <span>Vibe Check</span></h2>
              <p>Vibe Check is our revolutionary new social media for university students alike. Join discussions, keep in touch with others during these trying times.<br /><br />We always strive to build the best application we can build, so if you have any suggestions or queries, pleaseuse the contact form to the left.</p>
            </Col>
          </Row>
        </div>
        <Row>
          <div className="col-lg-12">
            <div className="sub-footer">
              <p>Copyright &copy 2021 Vibe Check Social Media

                | Designed by Josh Thiele s3717991</p>
            </div>
          </div>
        </Row>
      </Container>
    </footer>
  )
}