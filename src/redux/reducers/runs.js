import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INIT_STATE = {
  isLoading: false,
  data: [],
  error: false,
  saved: false,
  isSaving: false
}

export const getRunsRequest = (state = INIT_STATE, action) => {
  return {
    ...state,
    isLoading: true,
  }
}

export const getRunsSuccess = (state = INIT_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    data: action.runs
  }
}

export const getRunsFailure = (state = INIT_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    error: true,
  }
}

export const createRunRequest = (state = INIT_STATE, action) => {
  return {
    ...state,
    isSaving: true,
  }
}

export const createRunSuccess = (state = INIT_STATE, action) => {
  return {
    ...state,
    isSaving: false,
    saved: true
  }
}

export const createRunFailure = (state = INIT_STATE, action) => {
  return {
    ...state,
    isSaving: false,
    saved: false,
    error: true,
  }
}

export const createRunReset = (state = INIT_STATE, action) => {
  return {
    ...state,
    isSaving: false,
    saved: false,
  }
}

export const removeRunRequest = (state = INIT_STATE, action) => {
  return {
    ...state,
    isSaving: true,
  }
}

export const removeRunSuccess = (state = INIT_STATE, action) => {
  const runs = [...state.data]
  const { id } = action
  const indexToRemove = runs.findIndex(run => run.id === id)
  runs.splice(indexToRemove, 1)
  return {
    ...state,
    isSaving: false,
    data: runs
  }
}

export const removeRunFailure = (state = INIT_STATE, action) => {
  return {
    ...state,
    isSaving: false,
    error: true,
  }
}

export const HANDLERS = {
  [Types.GET_RUNS_REQUEST]: getRunsRequest,
  [Types.GET_RUNS_SUCCESS]: getRunsSuccess,
  [Types.GET_RUNS_FAILURE]: getRunsFailure,

  [Types.CREATE_RUN_REQUEST]: createRunRequest,
  [Types.CREATE_RUN_SUCCESS]: createRunSuccess,
  [Types.CREATE_RUN_FAILURE]: createRunFailure,
  [Types.CREATE_RUN_RESET]: createRunReset,

  [Types.REMOVE_RUN_REQUEST]: removeRunRequest,
  [Types.REMOVE_RUN_SUCCESS]: removeRunSuccess,
  [Types.REMOVE_RUN_FAILURE]: removeRunFailure,
}

export default createReducer(INIT_STATE, HANDLERS)