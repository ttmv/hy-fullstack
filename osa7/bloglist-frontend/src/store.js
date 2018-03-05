import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/nofificationReducer'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer';

const reducer = combineReducers({
  notification: notificationReducer,
  users: userReducer,
  blogs: blogReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store