import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Header from './elements/Header'

const Home = () => <h1>Home Admin</h1>
const User = () => <h1>User Admin</h1>

const Admin = (props) => {
  if (props.auth.isSigningin) {
    return <p>Carregando...</p>
  }
  if(!props.auth.isAuth) {
    return <Redirect to="/login" />
  }
  if(props.auth.user.role !== 'admin') {
    return <Redirect to="/user" />
  }
  console.log(props.auth)
  return (
    <div>
      <Header />
      <div>
        <Route path={`${props.match.path}/`} exact component={Home} />
        <Route path={`${props.match.path}/users`} component={User} />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Admin)