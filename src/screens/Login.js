import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Form, Button } from 'semantic-ui-react'

import Header from './Header'
import ActionCreator from '../redux/actionCreators'

class Login extends Component {
  state = {
    form: {
      email: '',
      password: ''
    }
  }
  
  handleChange = fieldname => event => {
    const form = {
      ...this.state.form
    }

    form[fieldname] = event.target.value
    this.setState({ form })
  }

  signinForm = () => {
    const { email, password } = this.state.form
    this.props.signinRequest(email, password)
  }

  render() {
    if(this.props.auth.isAuth) {
      if(this.props.auth.user.role === 'admin') {
        return <Redirect to='/admin'/>
      }
      return <Redirect to='/user' />
    }
    return (
      <div>
        
      <Header />
        <h1>Entrar</h1>
        <Form>
          <Form.Field>
            <label htmlFor="email">E-mail</label>
            <input type="text" id="email" value={this.state.form.email} onChange={this.handleChange('email')}/>
          </Form.Field>

          <Form.Field>
            <label htmlFor="pass">Senha</label>
             <input type="password" id="pass" value={this.state.form.password} onChange={this.handleChange('password')}/>
          </Form.Field>
          
          <Form.Field>
            <Button onClick={this.signinForm} type="button">Login</Button>
          </Form.Field>
          { 
            this.props.auth.error &&
            <p>{this.props.auth.errorMessage}</p>
          }
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signinRequest: (email, password) => dispatch(ActionCreator.signinRequest(email, password)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)