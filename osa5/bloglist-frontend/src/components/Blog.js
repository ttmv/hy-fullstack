import React from 'react'
import Togglable from './Togglable'

const BlogInfo = ({blog, updateBlog, deleteBlog}) => {
  const addedBy = blog.user ? <div>added by {blog.user.name}</div> : <div></div> 
  const username = window.localStorage.getItem('username')
  const rm = (!blog.user || blog.user.username === username) ? 
    <button onClick={deleteBlog(blog)}>Delete</button> : ''  

  return (
    <div className="bloginfo">
      <div>{blog.url}</div> 
      <div>
        {blog.likes} likes
        <button onClick={updateBlog(blog)}>like</button>
      </div>
      {addedBy}
      {rm}
    </div>
  )
}

const Blog = ({ blog, updateBlog, deleteBlog }) => {
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
    <div style={blogStyle} className="blogtitle">
      <Togglable openLabel={label} closeLabel={label} style={buttonStyle}>
        <BlogInfo blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
      </Togglable>  
    </div>  
  )    
}

export default Blog