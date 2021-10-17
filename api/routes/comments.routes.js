module.exports = (express, app) => {
  const controller = require('../controllers/comments.controller.js')
  const router = express.Router()

  //Select all users
  router.get('/', controller.all)

  //Get single user
  router.get('/:id', controller.single)

  //Create new user
  router.post('/', controller.create)

  //Update user
  router.put('/:id', controller.update)

  //Delete user
  router.delete('/:id', controller.delete)

  app.use('/api/comments', router)
}