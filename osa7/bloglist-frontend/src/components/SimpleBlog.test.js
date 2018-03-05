import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  it('renders blog author, title and likes', () => {
    const blog = {
      author: "testiauthor",
      title: "testititle",
      likes: 5
    }

    const blogComponent = shallow(<SimpleBlog blog={blog}/>)
    const infoDiv = blogComponent.find('.bloginfo')
    const likesDiv = blogComponent.find('.bloglikes')

    expect(infoDiv.text()).toContain(blog.author)
    expect(infoDiv.text()).toContain(blog.title)
    expect(likesDiv.text()).toContain(blog.likes)
  })

  it('clicking like twice calls event handler twice', () => {
    const blog = {
      author: "testiauthor",
      title: "testititle",
      likes: 5
    }

    const mockHandler = jest.fn()
    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler}/>)
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})