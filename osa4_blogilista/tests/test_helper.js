const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  }
]

const addNewUser = async (name, username, passwd) => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(passwd, saltRounds)

  const user = new User({
    username: username,
    name: name,
    adult: true,
    passwordHash
  })

  await user.save()
  
}

const createUser = async () => {
  //await addNewUser("Test User", "testuser", "testuser666")
  const saltRounds = 10
  const passwordHash = await bcrypt.hash("testuser1", saltRounds)

  const user = new User({
    username: "testuser",
    name: "Test User",
    adult: true,
    passwordHash
  })

  await user.save()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs
}

module.exports = {initialBlogs, createUser, blogsInDb }