const db = require('./database/app.js')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')

//Syncs Database
db.sync()

const app = express()
app.use(express.json())
app.use(cors(
  {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
  }
));
app.use(cookieParser())

//Used to save the session data
app.use(session({
  key: "login",
  secret: "rmitsecretkey",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24 // This is 1 day
  }
}))
app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

// Adds Routes //

//Default route
app.get('/', (req, res) => {
  res.json({ message: "Hello World" })
})

//Routes
require('./routes/users.routes.js')(express, app)
require('./routes/posts.routes.js')(express, app)
require('./routes/comments.routes.js')(express, app)

const hostname = '127.0.0.1'
//Sets the port, must be different than 3000.
const port = 8080
//Tells console that the server is running, also enables server listening
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})