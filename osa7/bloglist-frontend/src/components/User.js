import React from 'react'
import Blog from '../components/Blog'
import { connect } from 'react-redux'


const User = (props) => {
  console.log(props)
  const { users, userId } = props
  console.log(users, users.length)
  if (users.length === 0) return null

  const user = users.find(u => u._id === userId)
  return (  
    <div>
      <h2>{user.name}</h2>
      <h3>Blogs</h3>
      <div>
        {user.blogs.map(b => <Blog key={b._id} blog={b}/>)}
      </div>
    </div>
  )
}

const mapStateToProps = (state, props) => {
  return {users: state.users, userId: props.userId}
}

export default connect(mapStateToProps)(User)