import React from 'react'
import { createBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/nofificationReducer'
import { connect } from 'react-redux'

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      author: '',
      title: '',
      url: ''
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addBlog = async (event) => {
    event.preventDefault()
    
    const newBlog = {
      author: this.state.author,
      title: this.state.title,
      url: this.state.url
    }

    this.setState({ author: '', title: '', url: ''})

    try {
      this.props.createBlog(newBlog)
      this.props.notify(`blog ${newBlog.title} by ${newBlog.author} added (maybe)`, 5000)
      this.props.hide()
    } catch (exception) {
      console.log(exception)
    }
  }

  render() {
    return (
      <form onSubmit={this.addBlog}>
      <div>
       <label htmlFor="author">Author</label>
        <input 
          type="text"
          id="author"
          name="author"
          value={this.state.author}
          onChange={this.handleLoginFieldChange}
        />
      </div>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={this.state.title}
          onChange={this.handleLoginFieldChange}
        />
      </div>
      <div>
        <label htmlFor="url">url</label>
        <input
          type="text"
          id="url"
          name="url"
          value={this.state.url}
          onChange={this.handleLoginFieldChange}
        />
      </div>
      <button type="submit">create</button>
    </form>

    )
  }
  
}

export default connect(null, {notify, createBlog })(BlogForm)