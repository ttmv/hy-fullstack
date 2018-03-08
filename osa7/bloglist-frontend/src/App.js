import React from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogInfo from './components/BlogInfo'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import { notify } from './reducers/nofificationReducer'
import { connect } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { checkLogin } from './reducers/loginReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      user: null,
      loggedAs: '',
    }
  }

  componentDidMount() {
    this.props.initBlogs()
    this.props.initializeUsers()
    this.props.checkLogin()

    /*
    const loggedAs = window.localStorage.getItem('loggedAs')
    const userToken = window.localStorage.getItem('userToken')

    if (loggedAs && userToken) {
      blogService.setToken(userToken)
      this.setState({ user: userToken, loggedAs })
    }*/
  } 

  hideForm = () => {
    this.blogForm.toggleVisibility()
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
        username: '', password: ''
      })
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


    const blogview = () => (
      <div>
        <h2>Blogs</h2>

        <div>
          <Togglable openLabel="new blog" closeLabel="cancel" ref={component => this.blogForm = component}>
            <BlogForm hide={this.hideForm}/>
          </Togglable>
        </div>  
        <BlogList />
      </div>
    )

    const loggedIn = () => (
      <span>
        Logged in as {this.props.loggedAs}&nbsp; 
        <button onClick={this.logout}>log out</button> 
      </span>
    )

    return (
      <div>
        <Router>
          <div>
            <div>
              <Link to="/">Blogs</Link>&nbsp;
              <Link to="/users">Users</Link>&nbsp;
              {this.props.loggedAs && loggedIn()}
            </div> 
            <Route exact path="/" render={() => 
              <div>
                <Notification />        
                {!this.props.user && loginForm()}
                {this.props.user && blogview()}                
              </div>            
            } />

            <Route exact path="/users" render={() => <Users />} />
            <Route path="/users/:id" render={({match}) => <User userId={match.params.id} />} />
            <Route path="/blogs/:id" render={({match}) => 
              <BlogInfo blogId={match.params.id} />}
            />
          </div>
        </Router>
                  
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.loginInfo.user,
    loggedAs: state.loginInfo.loggedAs 
  }
}

export default connect(mapStateToProps, {notify, initializeUsers, initBlogs, checkLogin })(App);
