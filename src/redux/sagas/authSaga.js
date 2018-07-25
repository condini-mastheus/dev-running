import { put } from 'redux-saga/effects'
import axios from 'axios'
import jwtDecoder from 'jwt-decode'

import ActionCreators from '../actionCreators'

export function* auth(action) {
  try {
    const login = yield axios.post('http://localhost:3001/users/login', {
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

export function* checkAuth() {
  const token = localStorage.getItem('token')

  if (token) {
    
     // localStorage.setItem('user', user)
    try {
      // const user = jwtDecoder(token)
      const user = yield axios.get('http://localhost:3001/users/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
      })

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
  // localStorage.removeItem('user')

  yield put(ActionCreators.destroyAuthSuccess())
}

export function* updateProfile(action) {
  const token = localStorage.getItem('token')
  const userToSave = {
    ...action.user
  }
  try {
    const user = yield axios.patch(`http://localhost:3001/users/${action.user.id}`, userToSave, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    yield put(ActionCreators.updateProfileSuccess(user.data))
  } catch (error) {
    yield put(ActionCreators.updateProfileFailure())
  }
}

export function* createProfile(action) {
  const userToSave = {
    ...action.user
  }
  try {
    const user = yield axios.post('http://localhost:3001/users/', userToSave)

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