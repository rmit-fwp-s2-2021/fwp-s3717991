import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
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
      <Router>
        { //Only allow the user to go to the posts and profile section if they are logged in, else just don't redirect
          loggedInStatus ?
            <Switch>
              <Route
                path="/profile"
                exact
                render={props => (<Profile {...props} loggedInStatus={loggedInStatus} />)} />
              <Route path="/posts" exact component={Posts} />
              <Route path="/" exact component={Home} />
            </Switch>
            :
            <Switch>
              <Route path="/" component={Home} />
            </Switch>
        }
      </Router>

    </div>
  )
}

export default App
