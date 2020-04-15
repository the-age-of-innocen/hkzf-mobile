import React from 'react'

import Index from './Index/index'
import House from './House'
import News from './News'
import Profile from './Profile'
import Error from '../Error'

import './index.scss'

import { NavLink, HashRouter as Router, Route, Switch } from 'react-router-dom'
class Home extends React.Component {
  render() {
    return (
      <Router>
        <div className="home">
          <Switch>
            <Route exact path="/home" component={Index}></Route>
            <Route path="/home/house" component={House}></Route>
            <Route path="/home/news" component={News}></Route>
            <Route path="/home/profile" component={Profile}></Route>
            <Route component={Error}></Route>
          </Switch>
          <div className="tabBar">
            <ul>
              <li>
                <NavLink exact to="/home">
                  <span className="iconfont icon-ind"></span>
                  <p>首页</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/home/house">
                  <span className="iconfont icon-findHouse"></span>
                  <p>找房</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/home/news">
                  <span className="iconfont icon-infom"></span>
                  <p>资讯</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/home/profile">
                  <span className="iconfont icon-my"></span>
                  <p>我的</p>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </Router>
    )
  }
}

export default Home
