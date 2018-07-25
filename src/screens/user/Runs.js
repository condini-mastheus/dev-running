import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom'
import { Table, Button } from 'semantic-ui-react'

import ActionsCreators from '../../redux/actionCreators'

import Duration from '../elements/Duration'
import Distance from '../elements/Distance'
import Timezone from '../elements/Timezone'

class Runs extends Component {
  componentDidMount() {
    this.props.load()
  }

  renderRun = (run) => {
    return (
      <Table.Row key={run.id}>
        <Table.Cell>{run.friendly_name}</Table.Cell>
        <Table.Cell><Duration duration={run.duration} /></Table.Cell>
        <Table.Cell><Distance distance={run.distance} metric={this.props.auth.user.unit} /></Table.Cell>
        <Table.Cell><Timezone date={run.created} timezone={this.props.auth.user.timezone} /></Table.Cell>
      </Table.Row>
    )
  }
  render() {
    return (
      <div>
        <h1>Corridas</h1>
        <Button as={Link} to='/user/create-run'>Criar</Button>

        <Table celled>
          <Table.Header>
            <tr>
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.HeaderCell>Duração(h:m:s)</Table.HeaderCell>
              <Table.HeaderCell>Distância</Table.HeaderCell>
              <Table.HeaderCell>Data</Table.HeaderCell>
            </tr>
          </Table.Header>
          <Table.Body>
            { this.props.runs.data.map(this.renderRun) }
          </Table.Body>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    runs: state.runs,
    auth: state.auth
  };
}

const mapDispatchToProps = dispatch => {
  return {
    load: () => dispatch(ActionsCreators.getRunsRequest()),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Runs);