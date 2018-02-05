const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')

/*
if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}
*/
//const mongoUrl = process.env.MONGODB_URI
mongoose.connect(config.mongoUrl)
mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)

//const PORT = 3003
//const PORT = config.port
//app.listen(PORT, () => {
//  console.log(`Server running on port ${PORT}`)
//})

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}
