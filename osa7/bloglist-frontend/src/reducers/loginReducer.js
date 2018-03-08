import userService from '../services/users'
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

/*
export const login = (username, passwd) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password })

    blogService.setToken(user.token)

    window.localStorage.setItem('userToken', user.token)
    window.localStorage.setItem('loggedAs', user.name)
    window.localStorage.setItem('username', user.username)

    dispatch({
      type: 'LOGIN', 
      data: { 
        user: user.token,
        loggedAs: user.name
      }
    })
  }
}
*/

export const checkLogin = () => {
  console.log("checklogin?")
  return async (dispatch) => {
    const loggedAs = window.localStorage.getItem('loggedAs')
    const userToken = window.localStorage.getItem('userToken')
    if (loggedAs && userToken) {
      blogService.setToken(userToken)

      dispatch({
        type: 'LOGIN', 
        data: { 
          user: userToken,
          loggedAs
        }
      })  
    }
  }
}

export default loginReducer