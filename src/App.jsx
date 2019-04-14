import React, { Component } from 'react';
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'

// 导入 semantic-ui-css
import 'semantic-ui-css/semantic.min.css'

// 导入组件
import Login from './components/login/Login'
import Layout from './components/layout/Layout'
import NotFound from './components/404/NotFound'

import axios from 'axios'
axios.defaults.baseURL = "http://47.96.21.88:8086/"

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/layout' component={Layout}></Route>
          <Redirect exact from='/' to='/login'></Redirect>
          <Route component={NotFound}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
