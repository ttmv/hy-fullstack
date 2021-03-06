const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', {_id: 1, title: 1, author: 1, url: 1, likes: 1})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    
    if (!body.password || body.password.length < 3) {
      return response
        .status(400)
        .json({error: "password must be at least 3 characters"})
    }

    const prevUser = await User.findOne({'username': body.username})

    if(!body.username || prevUser) {
      return response
        .status(400)
        .json({error: "username already in use"})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult || true,
      passwordHash
    })

    const saveduser = await user.save()
    response.json(saveduser)

  } catch (err) {
    console.log(err)
    response.status(500).json({error: err})
  }
})


module.exports = usersRouter