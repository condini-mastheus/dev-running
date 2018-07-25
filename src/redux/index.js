import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import sagas from './sagas'
import reducers from './reducers'

const sagaMiddleware = createSagaMiddleware()

export default createStore(reducers, applyMiddleware(sagaMiddleware, logger))
sagaMiddleware.run(sagas)
