import React from 'react'

import Index from './Index/index'
import House from './House'
import News from './News'
import Profile from './Profile'
import Error from '../Error'

import './index.scss'
import { TabBar } from 'antd-mobile'

import { HashRouter as Router, Route, Switch } from 'react-router-dom'

const tabs = [
  {
    title: '首页',
    icon: 'icon-ind',
    path: '/home'
  },
  {
    title: '找房',
    icon: 'icon-findHouse',
    path: '/home/house'
  },
  {
    title: '资讯',
    icon: 'icon-infom',
    path: '/home/news'
  },
  {
    title: '我的',
    icon: 'icon-my',
    path: '/home/profile'
  }
]
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: props.location.pathname
    }
  }

  render() {
    return (
      <div className="home">
        <Switch>
          <Route exact path="/home" component={Index}></Route>
          <Route path="/home/house" component={House}></Route>
          <Route path="/home/news" component={News}></Route>
          <Route path="/home/profile" component={Profile}></Route>
          <Route component={Error}></Route>
        </Switch>
        <div className="tabBar">
          <TabBar
            unselectedTintColor="#949494"
            tintColor="red"
            barTintColor="white"
            hidden={this.state.hidden}
          >
            {tabs.map(item => (
              <TabBar.Item
                title={item.title}
                key={item.title}
                icon={<span className={`iconfont ${item.icon}`}></span>}
                selectedIcon={<span className={'iconfont ' + item.icon}></span>}
                selected={this.state.selectedTab === item.path}
                onPress={() => {
                  this.setState({
                    selectedTab: item.path
                  })
                  this.props.history.push(item.path)
                }}
              ></TabBar.Item>
            ))}
          </TabBar>
        </div>
      </div>
    )
  }
}

export default Home
