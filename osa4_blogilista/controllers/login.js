const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  try {
    const body = req.body
    const user = await User.findOne({username: body.username})
    const passwordCorrect = user === null ? false : 
      await bcrypt.compare(body.password, user.passwordHash)
    
    if ( !(user && passwordCorrect) ) {
      return res.status(401).send({ error: 'invalid username or password' })
    }
    
    const userForToken = {
      username: user.username,
      id: user._id
    }
  
    const token = jwt.sign(userForToken, process.env.SECRET)
  
    res.status(200).send({ token, username: user.username, name: user.name })
  
  } catch (e) {
    console.log(e)
    res.status(500).send({error: "something went wrong"})
  }
})

module.exports = loginRouter
