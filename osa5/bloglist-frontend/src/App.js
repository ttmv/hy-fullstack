import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      error: '',
      username: '',
      password: '',
      user: null,
      usersname: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  } 

  login = async (event) => {
    event.preventDefault()
    console.log('login in with', this.state.username, this.state.password)

    try {
      const data = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      this.setState({ username: '', password: '', user: data.token, usersname: data.name })
    } catch (exception) {
      console.log(exception)
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
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
            name="password"
            value={this.state.password}
            onChange={this.handleLoginFieldChange}
          />
        </div>
        <button type="sbumit">kirjaudu</button>
      </form>
    </div>
    )

    const blogview = () => (
      <div>
        <h2>Blogs</h2>
        <div>
          Logged in as {this.state.usersname}
        </div>  
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    )

    return (
      <div>        
        {!this.state.user && loginForm()}
        {this.state.user && blogview()}
      </div>
    );
  }
}

export default App;
