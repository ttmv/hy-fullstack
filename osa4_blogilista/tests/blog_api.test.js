const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
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

const createUser = async () => {
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

beforeAll(async () => {
  await Blog.remove({})
  await User.remove({})
  await createUser()  

  const blogObjs = initialBlogs.map(blog => new Blog(blog))
  const promiseArr = blogObjs.map(blog => blog.save())
  await Promise.all(promiseArr)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const resp = await api.get('/api/blogs')
  expect(resp.body.length).toBe(initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const newBlog = {
    title: "Blog to delete",
    author: "Author",
    url: "http://blog.com",
  }

  const blogToDelete = await api.post('/api/blogs').send(newBlog)
  const blogsBeforeDelete = await api.get('/api/blogs')
  await api.delete(`/api/blogs/${blogToDelete.body._id}`).expect(204)
})


describe('Adding new blogs', () => {
  test('a new blog can be added', async () => {
    const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const resp = await api.get('/api/blogs')
    expect(resp.body.length).toBe(initialBlogs.length + 1)
    const blogTitles = resp.body.map(b => b.title)
    expect(blogTitles).toContain("Type wars")
  })

  test('when likes is not given it is set to 0', async () => {
    const newBlog = {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll"
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const resp = await api.get('/api/blogs')
    const added = resp.body.find(b => b.title === newBlog.title)
    expect(added.likes).toBe(0)
  })

  test('blog without url is not added', async () => {
    const newBlog = {
      title: "Blog without url",
      author: "Blogger without url",
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const allBlogs = await api.get('/api/blogs/')
    const authors = allBlogs.body.map(b => b.author)
    expect(authors).not.toContain("Blogger without url")
  })

  test('blog without title is not added', async () => {
    const newBlog = {
      author: "Blogger without titles",
      url: "http://nonexistent.blog.com/"
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const allBlogs = await api.get('/api/blogs/')
    const authors = allBlogs.body.map(b => b.author)
    expect(authors).not.toContain("Blogger without titles")
  })
})



afterAll(() => {
  server.close()
})
