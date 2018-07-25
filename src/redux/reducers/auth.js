import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INIT_STATE = {
  isAuthing: false,
  isAuth: false,
  isSigningin: false,
  isSaving: false,
  saved: false,
  user: {},
  error: false,
  errorMessage: false
}

export const signinRequest = (state = INIT_STATE, action) => {
  return {
    ...state,
    isSigningin: true,
    error: false,
    errorMessage: ''
  }
}

export const signinSuccess = (state = INIT_STATE, action) => {
  return {
    ...state,
    isSigningin: false,
    isAuth: true,
    user: action.user
  }
}

export const signinFailure = (state = INIT_STATE, action) => {
  return {
    ...state,
    isSigningin: false,
    error: true,
    errorMessage: action.error
  }
}

export const authRequest = (state = INIT_STATE, action) => {
  return {
    ...state,
    isSigningin: true,
    error: false,
    errorMessage: ''
  }
}

export const authSuccess = (state = INIT_STATE, action) => {
  return {
    ...state,
    isSigningin: false,
    isAuth: true,
    user: action.user
  }
}

export const authFailure = (state = INIT_STATE, action) => {
  return {
    ...state,
    isSigningin: false,
    isAuth: false,
    // error: true
  }
}

export const destroyAuthSuccess = (state = INIT_STATE, action) => {
  return {
    ...state,
    isAuth: false,
    user: {}
  }
}

export const updateProfileRequest = (state = INIT_STATE, action) => {
  return {
    ...state,
    isSaving: true,
    error: false,
    errorMessage: ''
  }
}

export const updateProfileSuccess = (state = INIT_STATE, action) => {
  const newUser = {
    user: state.user
  }
  Object.keys(action.user).forEach(key => {
    newUser.user[key] = action.user[key]
  });

  return {
    ...state,
    isSaving: false,
    saved: true,
    user: newUser.user
  }
}

export const updateProfileFailure = (state = INIT_STATE, action) => {
  return {
    ...state,
    isSaving: false,
    saved: false,
    error: true,
    errorMessage: action.error
  }
}

export const updateProfileReset = (state = INIT_STATE) => {
  return {
    ...state,
    saved: false,
  }
}

export const createProfileRequest = (state = INIT_STATE, action) => {
  return {
    ...state,
    isSaving: true,
    error: false,
    errorMessage: ''
  }
}

export const createProfileSuccess = (state = INIT_STATE, action) => {
  const newUser = {
    user: state.user
  }
  Object.keys(action.user).forEach(key => {
    newUser.user[key] = action.user[key]
  });

  return {
    ...state,
    isSaving: false,
    saved: true,
    user: newUser.user
  }
}

export const createProfileFailure = (state = INIT_STATE, action) => {
  return {
    ...state,
    isSaving: false,
    saved: false,
    error: true,
    errorMessage: action.error
  }
}

export const createProfileReset = (state = INIT_STATE) => {
  return {
    ...state,
    saved: false,
  }
}

export const HANDLERS = {
  [Types.SIGNIN_REQUEST]: signinRequest,
  [Types.SIGNIN_SUCCESS]: signinSuccess,
  [Types.SIGNIN_FAILURE]: signinFailure,

  [Types.AUTH_REQUEST]: authRequest,
  [Types.AUTH_SUCCESS]: authSuccess,
  [Types.AUTH_FAILURE]: authFailure,

  [Types.DESTROY_AUTH_SUCCESS]: destroyAuthSuccess,

  [Types.UPDATE_PROFILE_REQUEST]: updateProfileRequest,
  [Types.UPDATE_PROFILE_SUCCESS]: updateProfileSuccess,
  [Types.UPDATE_PROFILE_FAILURE]: updateProfileFailure,
  [Types.UPDATE_PROFILE_RESET]: updateProfileReset,
  
  [Types.CREATE_PROFILE_REQUEST]: createProfileRequest,
  [Types.CREATE_PROFILE_SUCCESS]: createProfileSuccess,
  [Types.CREATE_PROFILE_FAILURE]: createProfileFailure,
  [Types.CREATE_PROFILE_RESET]: createProfileReset,

}

export default createReducer(INIT_STATE, HANDLERS)