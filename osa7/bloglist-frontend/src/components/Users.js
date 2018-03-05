import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import User from '../components/User'

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

export default Users