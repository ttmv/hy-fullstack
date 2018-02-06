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
      favBlog = {title: element.title, author: element.author, likes: element.likes}
      maxLikes = element.likes
    }
  })
  
  return favBlog  
}

const mostBlogs = (blogs) => {
  let authors = {}
  blogs.forEach(elem => {
    let author = elem.author
    authors[author] = !authors[author] ? 1 : authors[author] + 1
  })

  const maxVal = Math.max(...Object.values(authors))
  const author = Object.keys(authors).find(key => authors[key] === maxVal)

  return {author: author, blogs: maxVal}
}

const mostLikes = (blogs) => {
  let authors = {}
  blogs.forEach(elem => {
    let author = elem.author
    authors[author] = !authors[author] ? elem.likes : authors[author] + elem.likes
  })

  const maxVal = Math.max(...Object.values(authors))
  const author = Object.keys(authors).find(key => authors[key] === maxVal)

  return {author: author, votes: maxVal}
}


module.exports = {
  dummy, 
  totalLikes, 
  favoriteBlog, 
  mostBlogs, 
  mostLikes
}
