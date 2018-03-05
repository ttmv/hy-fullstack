import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  console.log(props)
  
  const { notification } = props
  if (notification) return (<div> {notification} </div>)
  return null
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)
