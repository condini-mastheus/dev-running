import { takeLatest, all, put } from 'redux-saga/effects'
import { Types } from '../actionCreators'

import ActionCreators from '../actionCreators'

import { auth, checkAuth, destroyAuth, updateProfile, createProfile } from './authSaga'
import { getRuns, createRun, removeRun } from './runsSaga'

import Api from '../../service/Api'

export default function* rootSaga() {

  const api = new Api('http://localhost:3001')

  yield all([
    takeLatest(Types.SIGNIN_REQUEST, auth({ api })),
    takeLatest(Types.AUTH_REQUEST, checkAuth({ api })),
    takeLatest(Types.GET_RUNS_REQUEST, getRuns({ api })),
    takeLatest(Types.CREATE_RUN_REQUEST, createRun({ api })),
    takeLatest(Types.DESTROY_AUTH_REQUEST, destroyAuth),
    takeLatest(Types.UPDATE_PROFILE_REQUEST, updateProfile({ api })),
    takeLatest(Types.CREATE_PROFILE_REQUEST, createProfile({ api })),
    takeLatest(Types.REMOVE_RUN_REQUEST, removeRun({ api })),
    put(ActionCreators.authRequest())
  ])
  console.log('root saga');
}