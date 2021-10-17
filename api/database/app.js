const { Sequelize, DataTypes } = require('sequelize');
const sql = require('./sql.js')

const db = {
  Op: Sequelize.Op
}

//Seed data, this is just for creation purposes, and will not run if there are already users
async function seedData() {
  const count = await db.user.count()
  if (count > 0){
    return
  } else {
    await db.user.create({name: "Josh", password: "JoshPassword", email: "josh@josh.com"})
  }
}

//Initializes the database connection
db.sequelize = new Sequelize(sql.DB, sql.USER, sql.PASSWORD, {
  host: sql.HOST,
  dialect: sql.DIALECT
})

//Includes the database models
db.user = require('./models/users.js')(db.sequelize, DataTypes)
db.post = require('./models/posts.js')(db.sequelize, DataTypes)
db.comment = require('./models/comments.js')(db.sequelize, DataTypes)

//Sync database, creating table if none exists
db.sync = async () => {
  await db.sequelize.sync()
  await seedData()
}

module.exports = db