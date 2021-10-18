import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import axios from "axios"

//Components
import Header from "./components/Header"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Posts from "./pages/Posts"

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState(false)

  //This checks every time the page is refreshed, if the user is logged in via session
  useEffect(async () => {
    const res = await axios({
      method: "get",
      url: "http://localhost:8080/api/users/login/valid",
      withCredentials: true,
    })
    console.log("logged in: ", res)
    setLoggedInStatus(res.data.loggedIn)
  }, [])

  return (
    <div className="App">
      <Header loggedInStatus={loggedInStatus} />
      <p>Hi {loggedInStatus.toString()} </p>
      <Router>
        <Switch>
          <Route
            path="/profile"
            exact
            render={props => (<Profile {...props} loggedInStatus={loggedInStatus} />)} />
          <Route path="/posts" exact component={Posts} />
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>

    </div>
  )
}

export default App
