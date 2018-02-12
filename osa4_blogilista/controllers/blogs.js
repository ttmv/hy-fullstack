const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

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

  try {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    request.body.user = user._id

    const blog = new Blog(request.body)
    const saved = await blog.save()
    user.blogs = user.blogs.concat(saved)
    await user.save()

    response.status(201).json(saved)

  } catch(exception) {
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

blogsRouter.put('/:id', async (request, response) => {
  //const body = request.body
  const oldBlog = await Blog.findById(request.params.id)
  const blog = {likes: oldBlog.likes + 1}
  
  const updatedB = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true } )
  response.status(201).json(updatedB)
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