import React from 'react'
import blogService from '../services/blogs'


class BlogForm extends React.Component {
  constructor(props) {
    console.log(props)
    super(props)
    this.state = {
      author: '',
      title: '',
      url: ''
    }
  }

  componentDidMount() {
    console.log(this.props)
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

    try {
      const resp = await blogService.create(newBlog)
      this.props.addToList(resp)
      
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
      <button type="sbumit">create</button>
    </form>

    )
  }
  
}

export default BlogForm