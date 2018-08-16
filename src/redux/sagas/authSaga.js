import { put, call } from 'redux-saga/effects'
import jwtDecoder from 'jwt-decode'

import ActionCreators from '../actionCreators'

export const auth = ({ api }) => function* (action) {
  try {
    const login = yield call(api.authUser, {
      email: action.email,
      passwd: action.password
    })

    const { token } = login.data || false

    if (token) {
      localStorage.setItem('token', token)

      const user = jwtDecoder(token)

      yield put(ActionCreators.signinSuccess(user))
    } else {
      yield put(ActionCreators.signinFailure('Login inválido'))
    }
  } catch (error) {
    yield put(ActionCreators.signinFailure('Ocorreu um erro!'))
  }
}

export const checkAuth = ({ api }) => function* () {
  const token = localStorage.getItem('token')

  if (token) {
    try {
      const user = yield call(api.getUser, 'me')

      yield put(ActionCreators.authSuccess(user.data))
    } catch (error) {
      yield put(ActionCreators.authFailure())
    }
  } else {
    yield put(ActionCreators.authFailure())
  }
}

export function* destroyAuth() {
  localStorage.removeItem('token')
  yield put(ActionCreators.destroyAuthSuccess())
}

export const updateProfile = ({ api }) => function* (action) {
  const userToSave = {
    ...action.user
  }
  try {
    const user = yield call(api.updateUser, userToSave)

    yield put(ActionCreators.updateProfileSuccess(user.data))
  } catch (error) {
    yield put(ActionCreators.updateProfileFailure())
  }
}

export const createProfile = ({ api }) => function* (action) {
  const userToSave = {
    ...action.user
  }
  try {
    const user = yield call(api.createUser, userToSave)

    if(user.data && user.data.error) {
      yield put(ActionCreators.createProfileFailure(user.data.message))
    } else {
      yield put(ActionCreators.createProfileSuccess(user.data))
      yield put(ActionCreators.signinRequest(userToSave.email, userToSave.passwd))
    }
  } catch (error) {
    yield put(ActionCreators.createProfileFailure())
  }
}