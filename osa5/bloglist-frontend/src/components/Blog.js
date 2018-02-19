import React from 'react'
import Togglable from './Togglable'

const BlogInfo = ({blog, updateBlog}) => (
  <div>
    <div>{blog.url}</div> 
    <div>
      {blog.likes} likes
      <button onClick={updateBlog(blog)}>like</button>
    </div>
    <div>added by {blog.user.name}</div>
  </div>
)


const Blog = ({ blog, updateBlog }) => {
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
        <BlogInfo blog={blog} updateBlog={updateBlog}/>
      </Togglable>  
    </div>  
  )    
}

export default Blog