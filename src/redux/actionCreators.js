import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions({
  signinRequest: ['email', 'password'],
  signinSuccess: ['user'],
  signinFailure: ['error'],

  authRequest: null,
  authSuccess: ['user'],
  authFailure: null,

  destroyAuthRequest: null,
  destroyAuthSuccess: null,

  getRunsRequest: null,
  getRunsSuccess: ['runs'],
  getRunsFailure: null,
  
  createRunReset: null,
  createRunRequest: ['run'],
  createRunSuccess: ['run'],
  createRunFailure: ['error'],

  removeRunRequest: ['id'],
  removeRunSuccess: ['id'],
  removeRunFailure: ['error'],

  updateProfileReset: null,
  updateProfileRequest: ['user'],
  updateProfileSuccess: ['user'],
  updateProfileFailure: ['error'],

  createProfileReset: null,
  createProfileRequest: ['user'],
  createProfileSuccess: ['user'],
  createProfileFailure: ['error'],
})

export default Creators