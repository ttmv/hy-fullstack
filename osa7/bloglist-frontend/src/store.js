import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/nofificationReducer'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer';
import loginReducer from './reducers/loginReducer';
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  notification: notificationReducer,
  users: userReducer,
  blogs: blogReducer,
  loginInfo: loginReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store