import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INIT_STATE = {
  isLoading: false,
  data: [],
  error: false,
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

export const HANDLERS = {
  [Types.GET_RUNS_REQUEST]: getRunsRequest,
  [Types.GET_RUNS_SUCCESS]: getRunsSuccess,
  [Types.GET_RUNS_FAILURE]: getRunsFailure
}

export default createReducer(INIT_STATE, HANDLERS)