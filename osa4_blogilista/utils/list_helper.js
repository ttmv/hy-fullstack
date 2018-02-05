const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum+item
  }

  const likes = blogs.map(blog => blog.likes)
  return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  let favBlog = null
  let maxLikes = -1
  blogs.forEach(element => {
    if (element.likes > maxLikes) {
      //favBlog = Object.assign({}, element)
      favBlog = {title: element.title, author: element.author, likes: element.likes}
      maxLikes = element.likes
    }
  })
  
  return favBlog  
}

module.exports = {
  dummy, 
  totalLikes, 
  favoriteBlog
}
