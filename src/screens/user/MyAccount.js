import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Button, Segment} from 'semantic-ui-react'

import { zones } from 'moment-timezone/data/meta/latest.json'

import ActionsCreators from '../../redux/actionCreators'

class MyAccount extends Component {
  state = {
    unit: '',
    timezone: ''
  }
  componentDidMount() {
    this.props.reset()
    
    this.setState({
      unit: this.props.auth.user.unit,
      timezone: this.props.auth.user.timezone
    })
  }

  handleChange = fieldname => event => {
    this.setState({
      [fieldname]: event.target.value
    })
  }

  handleSave = () => {
    this.props.save({
      unit: this.state.unit,
      timezone: this.state.timezone,
      id: this.props.auth.user.id
    })
  }
  render() {
    if (this.props.auth.saved) {
      return <Segment color='green'>Configurações alteradas com sucesso!</Segment>
    }
    return (
      <div>
        <h1>Minha conta</h1>
        <Form>
          <Form.Field>
            <label htmlFor="email">Unidade de medição</label>
            <select value={this.state.unit} onChange={this.handleChange('unit')}>
              <option value='metric'>Métrico (Km)</option>
              <option value='imperial'>Imperial (mi)</option>
            </select>
          </Form.Field>

          <Form.Field>
            <label htmlFor="pass">Zona Temporal</label>
            <select value={this.state.timezone} onChange={this.handleChange('timezone')}>
              {
                Object.keys(zones).map(zone => <option key={zone} value={zone}>{zone}</option>)
              }
            </select>
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
    // load: () => dispatch(ActionsCreators.getMyAccountRequest()),
    save: (user) => dispatch(ActionsCreators.updateProfileRequest(user)),
    reset: () => dispatch(ActionsCreators.updateProfileReset())
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);