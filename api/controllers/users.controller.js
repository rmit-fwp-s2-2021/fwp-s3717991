const db = require("../database/app.js")

exports.all = async (req, res) => {
  const users = await db.user.findAll()
  res.json(users)
}