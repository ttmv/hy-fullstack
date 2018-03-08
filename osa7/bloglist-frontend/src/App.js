import React from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogInfo from './components/BlogInfo'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'
import LoginForm from './components/LoginForm'
import { notify } from './reducers/nofificationReducer'
import { connect } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { checkLogin, logout } from './reducers/loginReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends React.Component {
  componentDidMount() {
    this.props.initBlogs()
    this.props.initializeUsers()
    this.props.checkLogin()
  } 

  hideForm = () => {
    this.blogForm.toggleVisibility()
  }   

  logout = () => {
    this.props.logout()
  }

  render() {
    const loginForm = () => <LoginForm />
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
  return {
    user: state.loginInfo.user,
    loggedAs: state.loginInfo.loggedAs 
  }
}

export default connect(mapStateToProps, {notify, initializeUsers, initBlogs, checkLogin, logout })(App);
