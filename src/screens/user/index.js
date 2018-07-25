import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Header from './elements/Header'
import Runs from './Runs'
import MyAccount from './MyAccount';
import ChangePassword from './ChangePassword';
import CreateRun from './CreateRun';

const Home = () => <h1>Home User</h1>

const User = (props) => {
  if (props.auth.isSigningin) {
    return <p>Carregando...</p>
  }
  if (!props.auth.isAuth) {
    return <Redirect to="/login" />
  }
  return (
    <div>
      <Header />

      <div>
        <Route path={`${props.match.path}/`} exact component={Home} />
        <Route path={`${props.match.path}/runs`} exact component={Runs} />
        <Route path={`${props.match.path}/my-account`} exact component={MyAccount} />
        <Route path={`${props.match.path}/change-password`} exact component={ChangePassword} />
        <Route path={`${props.match.path}/create-run`} exact component={CreateRun} />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(User)