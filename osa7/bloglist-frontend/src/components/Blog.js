import React from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 3,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blogtitle">
      {blog.title} {blog.author}
    </div>  
  )    
}

export default Blog