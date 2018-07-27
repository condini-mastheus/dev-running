import { takeLatest, all, put } from 'redux-saga/effects'
import { Types } from '../actionCreators'

import ActionCreators from '../actionCreators'

import { auth, checkAuth, destroyAuth, updateProfile, createProfile } from './authSaga'
import { getRuns, createRun, removeRun } from './runsSaga'

export default function* rootSaga() {
  yield all([
    takeLatest(Types.SIGNIN_REQUEST, auth),
    takeLatest(Types.AUTH_REQUEST, checkAuth),
    takeLatest(Types.GET_RUNS_REQUEST, getRuns),
    takeLatest(Types.CREATE_RUN_REQUEST, createRun),
    takeLatest(Types.DESTROY_AUTH_REQUEST, destroyAuth),
    takeLatest(Types.UPDATE_PROFILE_REQUEST, updateProfile),
    takeLatest(Types.CREATE_PROFILE_REQUEST, createProfile),
    takeLatest(Types.REMOVE_RUN_REQUEST, removeRun),
    put(ActionCreators.authRequest())
  ])
  console.log('root saga');
}