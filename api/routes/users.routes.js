module.exports = (express, app) => {
  const controller = require('../controllers/users.controller.js')
  const router = express.Router()

  //Select all users
  router.get('/', controller.all)

  //Get single user
  router.get('/:id', controller.single)

  //Create new user
  router.post('/', controller.create)

  //login user
  router.post('/login/', controller.login)

  //check for valid session
  router.get('/login/valid/', controller.valid)

  //log user out
  router.get('/login/logout/', controller.logout)

  //Update user
  router.put('/:id', controller.update)

  //Delete user
  router.delete('/:id', controller.delete)

  app.use('/api/users', router)
}