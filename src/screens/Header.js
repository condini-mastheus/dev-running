import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Image } from 'semantic-ui-react'
import ActionCreators from '../redux/actionCreators'

const Header = () => {
  return (
    <Menu>
      <Menu.Item as={Link} to='/'><Image src={'/logo.png'} size='small' /></Menu.Item>
      <Menu.Item as={Link} to='/'>Home</Menu.Item>
      <Menu.Item as={Link} to='/create-account'>Criar uma conta</Menu.Item>
      <Menu.Item as={Link} to='/login'>Entrar uma conta</Menu.Item>
    </Menu>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = dispatch => {
  return {
    signin: (email, password) => ActionCreators.signinRequest(email, password)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)