const db = require("../database/app.js")


//Returns all users
exports.all = async (req, res) => {
  const posts = await db.post.findAll()
  res.json(posts)
}

//returns single user
exports.single = async (req, res) => {
  const user = await db.user.findByPk(req.params.id)
  return res.json(user)
}

//creates new user
exports.create = async (req, res) => {
  const user = await db.user.findOne({ where: { name: req.body.user } })
  const post = await db.post.create({
    content: req.body.content,
    user_id: user.user_id
  })

  return res.json(post)
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
  if (user !== null) {
    await user.destroy()
    deleted = true
  }

  return res.json(deleted)
}