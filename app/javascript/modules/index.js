import { combineReducers } from 'redux'
import counter from 'modules/counter'
import courses from 'modules/courses'

import 'channels/real_time'

export default combineReducers({
  counter,
  courses
})
