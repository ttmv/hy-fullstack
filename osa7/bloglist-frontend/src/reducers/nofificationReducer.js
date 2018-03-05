const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    default:
      return state
  }
}

export const notify = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message: message        
    })

    setTimeout(()=>{
      dispatch({
        type: 'SET_NOTIFICATION',
        message: ''        
      })        
    }, time)
  }
}

export default notificationReducer