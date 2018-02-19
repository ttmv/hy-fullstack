const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const findUser = async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    return user
  } catch (exception) {
    console.log(exception)
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: exception })
    }  
  }
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
    const user = await findUser(request, response)
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
      response.status(500).json({ error: exception })
    }
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try{
    const oldBlog = await Blog.findById(request.params.id)
    const blog = {likes: oldBlog.likes + 1}
  
    const updatedB = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true } )
    response.status(201).json(updatedB)
  } catch(e) {
    console.log(e)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if(!blog.user) {
      await Blog.findByIdAndRemove(request.params.id)
      return response.status(204).end()  
    }

    const user = await findUser(request, response)
    
    if (user.blogs.indexOf(request.params.id) < 0) {
      return response.status(403).send({ error: 'Blog added by someone else' })
    }
    
    await Blog.findByIdAndRemove(request.params.id)
    user.blogs = user.blogs.filter(b => b!=request.params.id)
    await user.save()
    
    response.status(204).end()
  } catch(e) {
    console.log(e)
    response.status(400).send({ error: 'malformatted id' })
  }
})

module.exports = blogsRouter 