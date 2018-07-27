import { put } from 'redux-saga/effects'
import axios from 'axios'

import ActionCreators from '../actionCreators'

export function* getRuns() {
  const token = localStorage.getItem('token')
  try {
    const res = yield axios.get('http://localhost:3001/runs', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    yield put(ActionCreators.getRunsSuccess(res.data.data))
  } catch (error) {
    yield put(ActionCreators.getRunsFailure())
  }
}

export function* createRun(action) {
  const token = localStorage.getItem('token')
  try {
    const res = yield axios.post('http://localhost:3001/runs', action.run, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    yield put(ActionCreators.createRunSuccess(res.data))
  } catch (error) {
    yield put(ActionCreators.createRunFailure())
  }
}

export function* removeRun(action) {
  const token = localStorage.getItem('token')
  try {
    yield axios.delete(`http://localhost:3001/runs/${action.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    yield put(ActionCreators.removeRunSuccess(action.id))
  } catch (error) {
    yield put(ActionCreators.removeRunFailure())
  }
}