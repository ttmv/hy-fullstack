import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    borderRadius: '3px',
    borderWidth: '1px',
    color: 'green',
    width: '60%',
    margin: '5px'
  }
  const { notification } = props
  if (notification) return (<div style={style}> {notification} </div>)
  return null
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)
