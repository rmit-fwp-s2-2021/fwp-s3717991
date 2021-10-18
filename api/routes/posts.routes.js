module.exports = (express, app) => {
  const controller = require('../controllers/posts.controller.js')
  const router = express.Router()

  //Get all posts
  router.get('/', controller.all)

  //Get single post
  router.get('/:id', controller.single)

  //Create new post
  router.post('/', controller.create)

  //Update post
  router.put('/:id', controller.update)

  //Delete post
  router.delete('/:id', controller.delete)

  app.use('/api/posts', router)
}