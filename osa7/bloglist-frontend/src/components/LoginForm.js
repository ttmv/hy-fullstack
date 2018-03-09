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
    const labelStyle = {
      display: 'inline-block',
      width: '70px',
      textAlign: 'left',
      fontSize: '0.9em'
    }

    return (
      <div>
        <h2>Log in</h2>
        <form onSubmit={this.login}>
        <div>
         <label htmlFor="username" style={labelStyle}>username</label>
          <input 
            type="text"
            id="username"
            name="username"
            value={this.state.username}
            onChange={this.handleLoginFieldChange}
          />
        </div>
        <div>
          <label htmlFor="password" style={labelStyle}>password</label>
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