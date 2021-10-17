const db = require('./database/app.js')
const express = require('express')
const cookieParser = require('cookie-parser')

//Syncs Database
db.sync()

const app = express()
app.use(express.json())
app.use(cookieParser())
// Adds Routes //

//Default route
app.get('/', (req, res) => {
  res.json({ message: "Hello World"})
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