import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'UPDATE_BLOG':
      const blogs = state.filter(b => b._id !== action.updated._id)
      return [...blogs, action.updated]
    case 'REMOVE_BLOG':
      return state.filter(b => b._id !== action.id)
    default:
      return state
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const updateBlogs = (blog) => {
  return async (dispatch) => {
    const data = {
      user: blog.user._id,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    const updated = await blogService.update(blog._id, data)

    dispatch({
      type: 'UPDATE_BLOG',
      updated: updated
    })
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    const result = window.confirm(`delete ${blog.title} by ${blog.author}?`)
    if(result) {
      try {
        await blogService.remove(blog._id)

        dispatch({
          type: 'REMOVE_BLOG',
          id: blog._id
        })
      } catch (exception) {
        console.log(exception)
      }
    }
  }
}

export default blogReducer