import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = {user:null, loggedAs:''}

const loginReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}

const addLogin = (userToken, loggedAs, dispatch) => {
  blogService.setToken(userToken)

  dispatch({
    type: 'LOGIN', 
    data: { 
      user: userToken,
      loggedAs
    }
  })  
}

export const checkLogin = () => {
  return async (dispatch) => {
    const loggedAs = window.localStorage.getItem('loggedAs')
    const userToken = window.localStorage.getItem('userToken')
    if (loggedAs && userToken) {
      addLogin(userToken, loggedAs, dispatch)
    }
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password })

    window.localStorage.setItem('userToken', user.token)
    window.localStorage.setItem('loggedAs', user.name)
    window.localStorage.setItem('username', user.username)

    addLogin(user.token, user.name, dispatch)
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('userToken')
    window.localStorage.removeItem('loggedAs')
    dispatch({
      type: 'LOGOUT' 
    })   
  }
}

export default loginReducer