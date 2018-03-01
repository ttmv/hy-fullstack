
const notificationReducer = (state='', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  default: 
    return state
  }
}

export const notificationSetting = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification: notification
  }
}

export const notify = (notification, time) => {
  return async (dispatch) => {    
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: notification        
    })

    setTimeout(()=> {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: ''        
      })        
    }, time)
  }
}

export default notificationReducer