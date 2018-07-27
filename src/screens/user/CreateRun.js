import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { Form, Button, Segment } from 'semantic-ui-react'
import InputMoment from 'input-moment'
import 'input-moment/dist/input-moment.css'
import moment from 'moment'
import momentTimezone from 'moment-timezone'

import ActionsCreators from '../../redux/actionCreators'

class CreateRun extends Component {
  state = {
    friendly_name: '',
    duration: 0,
    distance: 0,
    created: moment(),
    error: ''
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
    const { friendly_name, duration, distance, created } = this.state

    const tzDate = momentTimezone.tz(created, this.props.auth.user.timezone);
    const gmtDate = tzDate.clone().tz('GMT');
    const gmtCreated = gmtDate.format('YYYY-MM-DD HH:mm:ss');
    
    console.log({
      friendly_name,
      duration,
      distance: this.props.auth.user.unit === 'metric' ? distance : (distance * 1.60934),
      created: gmtCreated
    })

    this.props.create({ 
      friendly_name, 
      duration, 
      distance: this.props.auth.user.unit === 'metric' ? distance : (distance * 1.60934), 
      created: gmtCreated
    })
  }
  render() {
    // const run = {
    //   'friendly_name': 'Run de teste',
    //   'duration': '100',
    //   'distance': '100',
    //   'created': '2018-01-01 00:00:00'
    // }
    if (this.props.runs.saved) {
      return(
        <div>
          <Segment color='green'>Corrida criada com sucesso!</Segment>
          <Redirect to={'/user/runs'} />
        </div>
      ) 
    }

    return (
      <div>
        <h1>Criar corrida</h1>
        {!this.props.runs.saved &&
        <Form>
          <Form.Field>
            <label htmlFor="">Nome</label>
            <input type='text' value={this.state.friendly_name} onChange={this.handleChange('friendly_name')} />
          </Form.Field>

          <Form.Field>
            <label htmlFor="">Duração (s)</label>
            <input type='number' value={this.state.duration} onChange={this.handleChange('duration')} />
          </Form.Field>

          <Form.Field>
            <label htmlFor="">Distância ({ this.props.auth.user.unit === 'metric' ? 'Km' : 'mi' })</label>
            <input type='number' value={this.state.distance} onChange={this.handleChange('distance')} />
          </Form.Field>

          <Form.Field>
            <label htmlFor="">Data da corrida</label>
            <input type='text' value={this.state.created.format('DD/MM/YYYY HH:mm:ss')} onChange={this.handleChange('created')} readOnly={true}/>
            <InputMoment moment={this.state.created} onChange={(value) => this.setState({ created: value })}/>
          </Form.Field>

          <Form.Field>
            <Button onClick={this.handleSave}>Criar corrida</Button>
          </Form.Field>
        </Form>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    runs: state.runs
  };
}

const mapDispatchToProps = dispatch => {
  return {
    // load: () => dispatch(ActionsCreators.getCreateRunRequest()),
    create: (run) => dispatch(ActionsCreators.createRunRequest(run)),
    reset: () => dispatch(ActionsCreators.createRunReset())
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateRun);