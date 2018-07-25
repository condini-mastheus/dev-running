import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'

import store from './redux'
import { Provider } from 'react-redux'

import { Container } from 'semantic-ui-react'

import Home from './screens/Home'
import Login from './screens/Login'
import Admin from './screens/admin/'
import User from './screens/user/'
import CreateAccount from './screens/CreateAccount';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Container>
            <Route exact path='/' component ={Home} />
            <Route path='/admin' component ={Admin} />
            <Route path='/user' component ={User} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/create-account' component={CreateAccount} />
          </Container>
        </Router>
      </Provider>
    );
  }
}

export default App;
