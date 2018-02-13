const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs, createUser, blogsInDb } = require('./test_helper')


describe('When some blogs are initially saved', async () => {
  beforeAll(async () => {
    await Blog.remove({})  
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
    const existingBlogs = await blogsInDb()    
    const resp = await api.get('/api/blogs')

    expect(resp.body.length).toBe(existingBlogs.length)
  })  

  test('an existing blog can be deleted', async () => {
    const newBlog = {
      title: "Blog to delete",
      author: "Author",
      url: "http://blog.com",
    }
  
    const blogToDelete = await api.post('/api/blogs').send(newBlog)
    
    const blogsBeforeDelete = await blogsInDb()

    await api
      .delete(`/api/blogs/${blogToDelete.body._id}`)
      .expect(204)
  
    const blogsAfterDelete = await blogsInDb()
    expect(blogsAfterDelete.length).toBe(blogsBeforeDelete.length - 1)   
  })
})

describe('When adding new blogs', () => {
  beforeAll(async () => {
    await User.remove({})
    await createUser()  
  })

  test('POST to /api/blogs adds a new blog', async () => {
    const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2
    }

    const blogsBefore = await blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const resp = await api.get('/api/blogs')
    expect(resp.body.length).toBe(blogsBefore.length + 1)
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
    const blogsBefore = await blogsInDb()
    
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
    expect(allBlogs.body.length).toBe(blogsBefore.length)
  })

  test('blog without title is not added', async () => {
    const blogsBefore = await blogsInDb()
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
    expect(allBlogs.body.length).toBe(blogsBefore.length)
  })
})


afterAll(() => {
  server.close()
})
