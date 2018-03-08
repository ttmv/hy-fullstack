import React from 'react'
import { login } from '../reducers/loginReducer'
import { connect } from 'react-redux'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  login = async (event) => {
    event.preventDefault()

    try {
      const username = this.state.username
      const passwd = this.state.password
      this.props.login(username, passwd)

      this.setState({ username: '', password: '' })
    } catch (exception) {
      console.log(exception)
      this.setState({
        username: '', password: ''
      })
    }  
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {

    return (
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
  }
}

export default connect(null, { login })(LoginForm)