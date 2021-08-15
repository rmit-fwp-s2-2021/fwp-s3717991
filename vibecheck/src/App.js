import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="banner">
        <a className="logo">Vibe Check</a>
        <ul className="nav">
          <li><a href="#welcome" className="menu-item">Home</a></li>
          <li><a href="#about" className="menu-item">About</a></li>
          <li><a href="#testimonials" className="menu-item">Testimonials</a></li>
          <li><a href="#contact-us" className="menu-item">Contact Us</a></li>
          <li></li>
        </ul>
        <div className="sign-up">
          <a href="#contact-us">Sign Up / Login</a>
        </div>
      </header>
      <div className="welcome-area">
        <div className="text-area">
          <h1>Come vibe with </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
