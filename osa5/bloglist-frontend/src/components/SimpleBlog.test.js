import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  it('does something', () => {
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
})