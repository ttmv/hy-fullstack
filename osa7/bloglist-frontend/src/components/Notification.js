import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const { notification } = props
  if (notification) return (<div> {notification} </div>)
  return null
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)
