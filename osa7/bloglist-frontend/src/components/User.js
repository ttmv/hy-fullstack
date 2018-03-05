import React from 'react'
import Blog from '../components/Blog'

const User = ({user}) => (
  <div>
    <h2>{user.name}</h2>
    <h3>Blogs</h3>
    <div>
      {user.blogs.map(b => <Blog key={b._id} blog={b}/>)}
    </div>
  </div>
)

export default User