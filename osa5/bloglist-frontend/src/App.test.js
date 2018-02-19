import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  beforeAll(() => {
    app = mount(<App />)
  })

  it('shows only login form if not logged in', () => {
    app.update()
    const loginForm = app.find('form')
    const blogComponent = app.find(<Blog />)
    
    expect(loginForm.text()).toContain('kirjaudu')
    expect(blogComponent.length).toBe(0)
  })
})