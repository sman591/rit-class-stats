import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from 'modules'

import { loadState, saveState } from 'localStorage'

const persistedState = loadState()
const initialState = persistedState || {}
const enhancers = []
const middleware = [thunk]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers)
const store = createStore(rootReducer, initialState, composedEnhancers)

store.subscribe(() => {
  saveState(store.getState())
})

export default store
