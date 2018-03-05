import React from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { notify } from './reducers/nofificationReducer'
import { connect } from 'react-redux'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      loggedAs: '',
      users: []
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    userService.getAll().then(users =>
      this.setState({ users })
    )

    const loggedAs = window.localStorage.getItem('loggedAs')
    const userToken = window.localStorage.getItem('userToken')
    if (loggedAs && userToken) {
      blogService.setToken(userToken)
      this.setState({ user: userToken, loggedAs })
    }
  } 

  newBlog = (blog) => {
    this.blogForm.toggleVisibility()
    const blogs = this.state.blogs.concat(blog)
    this.setState({ blogs })
    
    this.props.notify(`blog ${blog.title} by ${blog.author} added`, 5000)
  }   

  updateBlog = (blog) => {
    return async () => {
      const data = {
        user: blog.user._id,
        likes: blog.likes,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }

      const updated = await blogService.update(blog._id, data)
      const blogs = this.state.blogs.filter(b => b._id !== updated._id)
      this.setState({ blogs: blogs.concat(updated) })
    }
  }

  deleteBlog = (blog) => {
    return async () => {
      const result = window.confirm(`delete ${blog.title} by ${blog.author}?`)
      if(result) {
        try {
          await blogService.remove(blog._id)
          const blogs = this.state.blogs.filter(b => b._id !== blog._id)
          this.setState({ blogs })
        } catch (exception) {
          console.log(exception)
        }
      }
    }
  }

  login = async (event) => {
    event.preventDefault()

    try {
      const data = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      blogService.setToken(data.token)

      window.localStorage.setItem('userToken', data.token)
      window.localStorage.setItem('loggedAs', data.name)
      window.localStorage.setItem('username', data.username)

      this.setState({ username: '', password: '', user: data.token, loggedAs: data.name })
    } catch (exception) {
      console.log(exception)
      this.setState({
        //notification: 'käyttäjätunnus tai salasana virheellinen',
        username: '', password: ''
      })


      this.msgTimeout()
    }  
  }

  logout = () => {
    this.setState({ user: null, loggedAs: '' })
    window.localStorage.removeItem('userToken')
    window.localStorage.removeItem('loggedAs')
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  userById = (id) => {
    return this.state.users.find(user => user._id === id)
  }

  render() {
    const loginForm = () => (
      <div>
        <h2>Log in</h2>
        <form onSubmit={this.login}>
        <div>
         <label htmlFor="username">username</label>
          <input 
            type="text"
            id="username"
            name="username"
            value={this.state.username}
            onChange={this.handleLoginFieldChange}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.handleLoginFieldChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
    )

    const allBlogs = this.state.blogs.slice()
    allBlogs.sort(function(a,b){return b.likes - a.likes})

    const blogview = () => (
      <div>
        <h2>Blogs</h2>

        <div>
          Logged in as {this.state.loggedAs} 
          <button onClick={this.logout}>log out</button> 
          <Togglable openLabel="new blog" closeLabel="cancel" ref={component => this.blogForm = component}>
            <BlogForm addToList={this.newBlog}/>
          </Togglable>
        </div>  
        {allBlogs.map(blog => 
          <Blog key={blog._id} blog={blog} updateBlog={this.updateBlog} deleteBlog={this.deleteBlog}/>
        )}
      </div>
    )

    return (
      <div>
        <Router>
          <div>
            <div>
              <Link to="/">Blogs</Link>&nbsp;
              <Link to="/users">Users</Link>
            </div> 
            <Route exact path="/" render={() => 
              <div>
                <Notification />        
                {!this.state.user && loginForm()}
                {this.state.user && blogview()}                
              </div>            
            } />
            <Route exact path="/users" render={() => <Users users={this.state.users} />} />
            <Route path="/users/:id" render={({match}) => <User user={this.userById(match.params.id)} />} />

          </div>
        </Router>
                  
      </div>
    );
  }
}

export default connect(null, {notify})(App);
