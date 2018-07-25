import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Button, Segment } from 'semantic-ui-react'

import ActionsCreators from '../../redux/actionCreators'

class ChangePassword extends Component {
  state = {
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
    if(this.state.passwd !== this.state.cpasswd) {
      this.setState({
        error: 'equal',
        errorMessage: 'As senhas são diferentes'
      })

      return;
    }

    if(this.state.passwd.length < 6) {
      this.setState({
        error: 'length',
        errorMessage: 'A senha precisa ser maior que 6 caracteres'
      })

      return;
    }

    this.props.save({
      passwd: this.state.passwd,
      id: this.props.auth.user.id
    })
  }
  render() {
    if (this.props.auth.saved) {
      return <Segment color='green'>Senha alterada com sucesso!</Segment>
    }
    return (
      <div>
        <h1>Alterar senha</h1>
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
            <label htmlFor="email">Nova senha</label>
            <input type='password' value={this.state.passwd} onChange={this.handleChange('passwd')} />
          </Form.Field>

          <Form.Field>
            <label htmlFor="pass">Confirmar senha</label>
            <input type='password' value={this.state.cpasswd} onChange={this.handleChange('cpasswd')} />
          </Form.Field>

          <Form.Field>
            <Button onClick={this.handleSave}>Alterar Save</Button>
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
    // load: () => dispatch(ActionsCreators.getChangePasswordRequest()),
    save: (user) => dispatch(ActionsCreators.updateProfileRequest(user)),
    reset: () => dispatch(ActionsCreators.updateProfileReset())
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);