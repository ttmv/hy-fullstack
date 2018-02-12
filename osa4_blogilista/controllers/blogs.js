const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({})
      .populate('user', {username: 1, name: 1, adult: 1})

    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).send()
  }

  if(!request.body.likes) {
    request.body.likes = 0
  }

  const user = await User.findOne()
  request.body.user = user._id

  const blog = new Blog(request.body)
  const saved = await blog.save()
  user.blogs = user.blogs.concat(saved)
  await user.save()

  response.status(201).json(saved)
})
  
blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(e) {
    console.log(e)
    response.status(400).send({ error: 'malformatted id' })
  }
})

module.exports = blogsRouter 