import { combineReducers } from 'redux'
import counter from 'modules/counter'
import courses from 'modules/courses'

export default combineReducers({
  counter,
  courses
})
