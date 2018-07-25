import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Segment } from 'semantic-ui-react'
import { zones } from 'moment-timezone/data/meta/latest.json'
import { Redirect } from 'react-router-dom'

import ActionsCreators from '../redux/actionCreators'
import Header from './Header'

class CreateAccount extends Component {
  state = {
    name: '',
    email: '',
    unit: '',
    timezone: '',
    passwd: '',
    cpasswd: '',
    error: '',
    errorMessage: ''
  }
  componentDidMount() {
    this.props.reset()
  }
  handleChange = fieldname => event => {
    this.setState({
      [fieldname]: event.target.value
    })
  }

  handleSave = () => {

    const { name, email, unit, timezone, passwd, cpasswd } = this.state

    if (passwd !== cpasswd) {
      this.setState({
        error: 'equal',
        errorMessage: 'As senhas são diferentes'
      })

      return;
    }

    if (passwd.length < 6) {
      this.setState({
        error: 'length',
        errorMessage: 'A senha precisa ser maior que 6 caracteres'
      })

      return;
    }

    this.props.save({ name, email, unit, timezone, passwd })
  }
  render() {
    if (this.props.auth.isAuth) {
      return <Redirect to='/user' />
    }
    if (this.props.auth.saved) {
      return <Segment color='green'>Conta criada com sucesso!</Segment>
    }
    return (
      <div>
        <Header />
        <h1>Criar conta</h1>
        {
          this.props.auth.error &&
          <Segment color='red'>{this.props.auth.errorMessage}</Segment>
        }
        {
          this.state.error === 'equal' &&
          <Segment color='red'>{this.state.errorMessage}</Segment>
        }
        {
          this.state.error === 'length' &&
          <Segment color='red'>{this.state.errorMessage}</Segment>
        }
        <Form>
          <Form.Field>
            <label htmlFor="email">Nome</label>
            <input type='text' value={this.state.name} onChange={this.handleChange('name')} />
          </Form.Field>

          <Form.Field>
            <label htmlFor="email">E-mail</label>
            <input type='email' value={this.state.email} onChange={this.handleChange('email')} />
          </Form.Field>

          <Form.Field>
            <label htmlFor="email">Unidade de medição</label>
            <select value={this.state.unit} onChange={this.handleChange('unit')}>
              <option value={''}>Selecione</option>  
              <option value='metric'>Métrico (Km)</option>
              <option value='imperial'>Imperial (mi)</option>
            </select>
          </Form.Field>

          <Form.Field>
            <label htmlFor="pass">Zona Temporal</label>
            <select value={this.state.timezone} onChange={this.handleChange('timezone')}>
              <option value={''}>Selecione</option>
              {
                Object.keys(zones).map(zone => <option key={zone} value={zone}>{zone}</option>)
              }
            </select>
          </Form.Field>

          <Form.Field>
            <label htmlFor="email">Senha</label>
            <input type='password' value={this.state.passwd} onChange={this.handleChange('passwd')} />
          </Form.Field>

          <Form.Field>
            <label htmlFor="pass">Confirmar senha</label>
            <input type='password' value={this.state.cpasswd} onChange={this.handleChange('cpasswd')} />
          </Form.Field>

          <Form.Field>
            <Button onClick={this.handleSave}>Criar conta</Button>
          </Form.Field>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
}

const mapDispatchToProps = dispatch => {
  return {
    save: (user) => dispatch(ActionsCreators.createProfileRequest(user)),
    reset: () => dispatch(ActionsCreators.createProfileReset())
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);