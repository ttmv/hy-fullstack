import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import User from '../components/User'
import { connect } from 'react-redux'

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs added</th>          
          </tr>
        </thead>
        <tbody>
          {users.map(user => 
            <tr key={user._id}>
              <td><Link to={`/users/${user._id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Users)