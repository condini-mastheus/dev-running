import { put, call } from 'redux-saga/effects'

import ActionCreators from '../actionCreators'

export const getRuns = ({ api }) => function* () {
  try {
    const res = yield call(api.getRuns)
    yield put(ActionCreators.getRunsSuccess(res.data.data))
  } catch (error) {
    yield put(ActionCreators.getRunsFailure())
  }
}

export const createRun = ({ api }) => function* (action) {
  try {
    const res = yield call(api.createRun, action.run)  
    yield put(ActionCreators.createRunSuccess(res.data))
  } catch (error) {
    yield put(ActionCreators.createRunFailure())
  }
}

export const removeRun = ({ api }) => function* (action) {
  try {
    yield call(api.removeRun, action.id)
    
    yield put(ActionCreators.removeRunSuccess(action.id))
  } catch (error) {
    yield put(ActionCreators.removeRunFailure())
  }
}