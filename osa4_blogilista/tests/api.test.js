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
  
    const blogsAfterAdd = await blogsInDb()
    const added = blogsAfterAdd.find(b => b.title === newBlog.title)

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

    const allBlogs = await blogsInDb()  
    const authors = allBlogs.map(b => b.author)

    expect(authors).not.toContain("Blogger without url")
    expect(allBlogs.length).toBe(blogsBefore.length)
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

    const allBlogs = await blogsInDb()
    const authors = allBlogs.map(b => b.author)

    expect(authors).not.toContain("Blogger without titles")
    expect(allBlogs.length).toBe(blogsBefore.length)
  })

})

describe('Adding users', async () => {
  beforeAll(async () => {
    await User.remove({})
  })

  test('A valid user is added with POST to /api/users', async () => {
    const newUser = {
      name: "Asdf Argh",
      username: "asdfargh",
      password: "asdfargh666",
      adult: true
    }
    
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)

    const resp = await api.get('/api/users')
    expect(resp.body.find(u => u.name === newUser.name)).not.toBeFalsy()
  })

  test('User with too short password is not added', async () => {
    const newUser = {
      name: "Test User",
      username: "testuser",
      password: "t",
      adult: true
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.error.text)
      .toContain("password must be at least 3 characters")    
  })


  test('User without unique username is not added', async () => {
    const newUser1 = {
      name: "Test User",
      username: "testuser",
      password: "password",
    }

    const newUser2 = {
      name: "Test User 2",
      username: "testuser",
      password: "password",
    }

    await api.post('/api/users').send(newUser1)
  
    const result = await api
      .post('/api/users')
      .send(newUser2)
      .expect(400)

    expect(result.error.text)
      .toContain("username already in use")
  })

  test('User is set as adult if not specified', async () => {
    const newUser = {
      name: "Test User",
      username: "testadult",
      password: "password",
    }
  
    const result = await api.post('/api/users').send(newUser)
    expect(result.body.adult).toBe(true) 
  })
})



afterAll(() => {
  console.log("blog test close server")
  server.close()
})
