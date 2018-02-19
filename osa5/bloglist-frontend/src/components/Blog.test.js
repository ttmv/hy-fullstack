import React from 'react'
import { shallow, mount } from 'enzyme'
import Blog from './Blog'
import Togglable from './Togglable';

describe('<Blog />', () => {
  let blogComponent
  let blog

  beforeEach(() => {
    blog = {
      author: "testiauthor",
      title: "testititle",
      likes: 5,
      url:"www.url.net"
    }
    const mockHandler = jest.fn()
    blogComponent = mount(<Blog blog={blog} updateBlog={mockHandler} deleteBlog={mockHandler}/>)
  })

  it('shows only blog author and title at first', () => {
    blogComponent.update()
    const titleDiv = blogComponent.find('.blogtitle')
    const infoDiv = blogComponent.find('.bloginfo')
    expect(titleDiv.text()).toContain(blog.author)
    expect(titleDiv.text()).toContain(blog.title)
    expect(titleDiv.text()).not.toContain("likes")
    expect(infoDiv.length).toBe(0)
  })

  it('shows more info after click', () => {
    blogComponent.update()
    const nameButton = blogComponent.find('button')
    nameButton.simulate('click')
    const infoDiv = blogComponent.find('.bloginfo')
    expect(infoDiv.text()).toContain(blog.likes)
    expect(infoDiv.text()).toContain(blog.url)
    expect(infoDiv.text()).toContain("likes")
  })
})