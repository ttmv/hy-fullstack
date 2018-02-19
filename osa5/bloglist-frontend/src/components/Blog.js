import React from 'react'
import Togglable from './Togglable'

const BlogInfo = ({blog}) => (
  <div>
    <div>{blog.url}</div> 
    <div>
      {blog.likes} likes
      <button>like</button>
    </div>
    <div>added by {blog.user.name}</div>
  </div>
)


const Blog = ({blog}) => {
  const blogStyle = {
    paddingTop: 3,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonStyle = {
    border: 'none',
    backgroundColor: 'white'
  }

  const label = `${blog.title} ${blog.author}`
  return (
    <div style={blogStyle}>
      <Togglable openLabel={label} closeLabel={label} style={buttonStyle}>
        <BlogInfo blog={blog} />
      </Togglable>  
    </div>  
  )    
}

export default Blog