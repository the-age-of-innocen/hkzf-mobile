import React from 'react'
import Home from './pages/Home'
import City from './pages/City'
import Map from './pages/Map'
import Error from './pages/Error'

import {
  NavLink,
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <NavLink to="/home">首页</NavLink>
          <NavLink to="/city">城市</NavLink>
          <NavLink to="/map">地图</NavLink>
        </div>

        <Switch>
          <Redirect exact from="/" to="/home"></Redirect>
          <Route path="/home" component={Home}></Route>
          <Route path="/city" component={City}></Route>
          <Route path="/map" component={Map}></Route>
          <Route component={Error}></Route>
        </Switch>
      </Router>
    )
  }
}

export default App
