import React from 'react'

const Users = ({ users }) => {
  console.log(users)
  return (
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
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default Users