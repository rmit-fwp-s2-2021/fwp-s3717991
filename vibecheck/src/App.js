import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { UserLogin } from "./components/LoginUserContext";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

//Components
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  const user = "John";

  return (
    <div className="App">
      <UserLogin>
        <Header user={user}/>
      </UserLogin>

      <Router>
        <Switch>
          <Route path="/profile" exact component={Profile} />
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
