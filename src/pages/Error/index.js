import React from 'react'
import './index.css'
import { NavLink } from 'react-router-dom'

class Error extends React.Component {
  render() {
    return (
      <div className="error">
        页面不存在返回<NavLink to="/home">首页</NavLink>
      </div>
    )
  }
}

export default Error
