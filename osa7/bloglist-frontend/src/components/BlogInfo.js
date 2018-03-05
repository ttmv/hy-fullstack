import React from 'react'
import { connect } from 'react-redux'
import { updateBlogs, removeBlog } from '../reducers/blogReducer' 

const BlogInfo = ({blogId, blogs, updateBlogs, removeBlog}) => {
  if(blogs.length === 0) return null
  const blog = blogs.find(b => b._id === blogId)
  if(!blog) return null

  const addedBy = blog.user ? <div>added by {blog.user.name}</div> : <div></div> 
  const username = window.localStorage.getItem('username')
  const rm = (!blog.user || blog.user.username === username) ? 
    <button onClick={() => removeBlog(blog)}>Delete</button> : ''  

  return (
    <div className="bloginfo">
      <h2>{blog.title}</h2>
      <div>{blog.url}</div> 
      <div>
        {blog.likes} likes
        <button onClick={() => updateBlogs(blog)}>like</button>
      </div>
      {addedBy}
      {rm}
    </div>
  )
}

const mapStateToProps = (state, props) => {
  return {
    blogs: state.blogs,
    blogId: props.blogId,
  }
}

export default connect(mapStateToProps, { updateBlogs, removeBlog })(BlogInfo)