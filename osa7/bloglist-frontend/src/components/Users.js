import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <table style={{backgroundColor: '#c0c0ff'}}>
        <thead>
          <tr>
            <th></th>
            <th>blogs added</th>          
          </tr>
        </thead>
        <tbody style={{backgroundColor: '#fffabc', border: 'solid', borderWidth: '1px'}}>
          {users.map(user => 
            <tr key={user._id}>
              <td style={{padding: '5px'}}><Link to={`/users/${user._id}`}>{user.name}</Link></td>
              <td style={{padding: '5px', textAlign: 'right'}}>{user.blogs.length}</td>
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