import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Blog from './Blog'

const BlogList = ({blogs}) => {
  blogs.sort((a,b) => b.likes - a.likes)
  const style = {
    color: '#000000',
    backgroundColor: '#f7f5f0',
    marginTop: '5px'
  }

  return (
    <div style={style}>
      {blogs.map(blog => 
        <Link to={`/blogs/${blog._id}`} key={blog._id}><Blog blog={blog} /></Link>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {blogs: state.blogs}
}

export default connect(mapStateToProps)(BlogList)