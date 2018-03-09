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
    const buttonStyle = {
      color: '#0045F0',
      border: 'solid',
      backgroundColor: '#fffabc',
      padding: '4px',
      borderRadius: '2px',
      borderWidth: '1px',
    }

    const labelStyle = {
      display: 'inline-block',
      width: '40px',
      textAlign: 'left',
      fontSize: '0.8em'
    }

    return (
      <form onSubmit={this.addBlog} style={{padding: '1em'}}>
      <div>
       <label htmlFor="author" style={labelStyle}>Author</label>
        <input 
          type="text"
          id="author"
          name="author"
          value={this.state.author}
          onChange={this.handleLoginFieldChange}
        />
      </div>
      <div>
        <label htmlFor="title" style={labelStyle}>Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={this.state.title}
          onChange={this.handleLoginFieldChange}
        />
      </div>
      <div>
        <label htmlFor="url" style={labelStyle}>url</label>
        <input
          type="text"
          id="url"
          name="url"
          value={this.state.url}
          onChange={this.handleLoginFieldChange}
        />
      </div>
      <button type="submit" style={buttonStyle}>create</button>
    </form>

    )
  }
  
}

export default connect(null, {notify, createBlog })(BlogForm)