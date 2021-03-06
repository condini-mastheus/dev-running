import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Dropdown, Image } from 'semantic-ui-react'
import ActionCreators from '../../../redux/actionCreators'


const Header = (props) => {
  return (
    <Menu>
      <Menu.Item as={Link} to='/'><Image src={'/logo.png'} size='small' /></Menu.Item>
      <Menu.Item as={Link} to='/admin'>Home</Menu.Item>
      <Menu.Item as={Link} to='/admin/users'>Usários</Menu.Item>
      <Menu.Menu position='right'>
        <Dropdown item text={props.auth.user.name}>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to='/user/my-account'>Minha Conta</Dropdown.Item>
            <Dropdown.Item as={Link} to='/user/change-password'>Alterar senha</Dropdown.Item>
            <Dropdown.Item onClick={props.logout}>Sair</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
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
    signin: (email, password) => dispatch(ActionCreators.signinRequest(email, password)),
    logout: () => dispatch(ActionCreators.destroyAuthRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)