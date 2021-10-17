const db = require("../database/app.js")


//Returns all users
exports.all = async (req, res) => {
  const users = await db.user.findAll()
  res.json(users)
}

//returns single user
exports.single = async (req, res) => {
  const user = await db.user.findByPk(req.params.id)
  return res.json(user)
}

//creates new user
exports.create = async (req, res) => {
  const user = await db.user.create({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  })

  return res.json(user)
}

//Update user information
exports.update = async (req, res) => {
  const user = await db.user.findByPk(req.params.id)

  user.name = req.body.name
  user.password = req.body.password
  user.email = req.body.email

  await user.save();

  return res.json(user)
}

//Delete user
exports.delete = async (req, res) => {
  const user = await db.user.findByPk(req.params.id)

  let deleted = false

  //Checks to see if the user exists, if so delete.
  if(user !== null){
    await user.destroy()
    deleted = true
  }

  return res.json(deleted)
}