import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('when user is not logged in', () => {
  let app

  beforeAll(() => {
    app = mount(<App />)
  })

  it('shows only login form', () => {
    app.update()
    const loginForm = app.find('form')
    const blogComponent = app.find(Blog)
    
    expect(loginForm.text()).toContain('kirjaudu')
    expect(blogComponent.length).toBe(0)
  })
})

describe('when user is logged in', () => {
  let app

  beforeAll(() => {
    const user = {
      token: '092381093280183',
      name: 'Testaaja'
    }

    localStorage.setItem('userToken', user.token)
    localStorage.setItem('loggedAs', user.name)
        
    app = mount(<App />)

  })

  it('shows all blogs', () => {
    app.update()
    const blogComponent = app.find(Blog)
    expect(blogComponent.lenght).toBe(blogService.blogs.lenght)  
  })
})