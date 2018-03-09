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
    <div className="bloginfo" style={{backgroundColor: '#fffabc', textAlign: 'center', paddingBottom: '5px'}}>
      <h2 style={{fontSize: '1em', padding: '5px', backgroundColor: '#c0c0ff'}}>{blog.title}</h2>
      <div style={{fontSize: '0.9em', margin: '5px'}}>{blog.url}</div> 
      <div style={{fontSize: '0.9em', margin: '5px'}}>
        {blog.likes} likes
        <button onClick={() => updateBlogs(blog)} style={{margin: '3px'}}>like</button>
      </div>
      <div style={{margin: '5px', fontSize: '0.8em'}}>
        {addedBy}
        {rm}
      </div>
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