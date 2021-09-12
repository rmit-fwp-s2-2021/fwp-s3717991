import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"

//Components
import Header from "./components/Header"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Posts from "./pages/Posts"

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState(false)

  function login() {
    setLoggedInStatus(true)
  }

  return (
    <div className="App">
      <Header login={login} loggedInStatus={loggedInStatus} />
      <Router>
        <Switch>
          <Route
            path="/profile"
            exact
            render={props => (<Profile {...props} loggedInStatus={loggedInStatus} setLoggedInStatus={login} />)} />
          <Route path="/posts" exact component={Posts} />
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>

    </div>
  )
}

export default App
