const notificationReducer = (state='render here notification...', action) => {
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

export default notificationReducer