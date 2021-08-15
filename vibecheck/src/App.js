import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";

//Images
import leftImage from "./images/left-image.png";
import aboutIcon1 from "./images/about-icon-01.png";
import aboutIcon2 from "./images/about-icon-02.png";
import aboutIcon3 from "./images/about-icon-03.png";

function App() {
  return (
    <div className="App">
      <header className="banner">
        <Container>
          <Row>
            <Col xs={12}>
              <a className="logo">Vibe Check</a>
              <ul className="nav">
                <li><a href="#welcome" className="menu-item">Home</a></li>
                <li><a href="#about" className="menu-item">About</a></li>
                <li><a href="#testimonials" className="menu-item">Testimonials</a></li>
                <li><a href="#contact-us" className="menu-item">Contact Us</a></li>
                <li></li>
              </ul>
              <div className="sign-up">
                <a href="#contact-us" className="main-button-slider">Sign Up / Login</a>
              </div>
            </Col>

          </Row>
        </Container>

      </header>
      <div className="welcome-area">
        <Container>
          <Row>
            <Col xs={6}>
              <div className="text-area">
                <h1>Come <span>vibe</span><br /> with us today.</h1>
                <p>Join our incredible social chat experience here at Vibe Check.
                  Students new and old can join in the discussion and the conversations, completely free of charge!</p>
                <a href="#about" className="main-button-slider">KNOW US BETTER</a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="left-image-decor"></div>
      <section className="section" id="promotion">
        <div className="container">
          <div className="row">
            <div className="left-image col-lg-5 col-md-12 col-sm-12 mobile-bottom-fix-big"
              data-scroll-reveal="enter left move 30px over 0.6s after 0.4s">
              <img src={leftImage} className="rounded img-fluid d-block mx-auto" alt="App" />
            </div>
            <div className="right-text offset-lg-1 col-lg-6 col-md-12 col-sm-12 mobile-bottom-fix">
              <ul>
                <li>
                  <img src={aboutIcon1} alt="" />
                  <div className="text">
                    <h4>Provides Friendly Network</h4>
                    <p>Feeling disconnected? Isolated even? Join our friendly network of students like yourself and keep in touch with others during this lockdown.</p>
                  </div>
                </li>
                <li data-scroll-reveal="enter right move 30px over 0.6s after 0.5s">
                  <img src={aboutIcon2} alt="" />
                  <div className="text">
                    <h4>Customized Profile</h4>
                    <p>Customize your profile to suit your interests, so those connecting with you know exactly who they are talking to. Put as much, or as little information as you want.</p>
                  </div>
                </li>
                <li data-scroll-reveal="enter right move 30px over 0.6s after 0.6s">
                  <img src={aboutIcon3} alt="" />
                  <div className="text">
                    <h4>Create Awesome Posts</h4>
                    <p>Create some awe-inspiring posts to help others like yourself stay connected and involved within the university.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>


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
                <p>Copyright &copy; 2021 Vibe Check Social Media

                  | Designed by Josh Thiele s3717991</p>
              </div>
            </div>
          </Row>
        </Container>
      </footer>

    </div>
  );
}

export default App;
