import { combineReducers } from 'redux'
import counter from './counter'
import courses from './courses'

export default combineReducers({
  counter,
  courses
})
