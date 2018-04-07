import { COLLEGES } from '../constants'

export const LOADING = 'counter/LOADING'
export const UPDATE = 'counter/UPDATE'
export const PATCH_REAL_TIME = 'counter/PATCH_REAL_TIME'

const initialState = COLLEGES.reduce((state, college) => {
  state[college] = {
    courses: {},
    loadedAt: null,
    isLoading: false
  }
  return state
}, {})

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        [action.college]: {
          ...state[action.college],
          isLoading: true
        }
      }

    case UPDATE:
      return {
        ...state,
        [action.college]: {
          ...state[action.college],
          courses: action.courses,
          loadedAt: new Date(),
          isLoading: false,
        }
      }

    case PATCH_REAL_TIME:
      const courseRealTime = action.course_real_time
      const courses = {...state[action.college].courses}
      const capacityData = courseRealTime.capacity_data
      Object.keys(capacityData).forEach((key) => {
        const course = {...courses[key]}
        if (!course) {
          return
        }
        course.snapshot_at = courseRealTime.snapshot_at
        course.capacity_data = capacityData[key]
        courses[key] = course
      })
      return {
        ...state,
        [action.college]: {
          ...state[action.college],
          courses,
        }
      }

    default:
      return state
  }
}

export const loading = (college) => {
  return dispatch => {
    dispatch({
      type: LOADING,
      college
    })
  }
}

export const forceUpdate = (college) => {
  return async (dispatch, getState) => {
    dispatch(loading(college))

    const response = await fetch(`/api/courses/${college}`)
    const json = await response.json()
    const courses = json.reduce((acc, course) => {
      acc[course.course_id] = course
      return acc
    }, {})

    dispatch({
      type: UPDATE,
      college,
      courses,
    })
  }
}

export const patchRealTime = (college, courseRealTime) => {
  return async (dispatch, getState) => {
    dispatch({
      type: PATCH_REAL_TIME,
      college,
      course_real_time: courseRealTime,
    })
  }
}

export const update = (college) => {
  return (dispatch, getState) => {
    const { courses } = getState()
    const loadedAt = courses[college].loadedAt
    if (loadedAt && Date.now() - Date.parse(loadedAt) < 30 * 1000) {
      return
    }
    dispatch(forceUpdate(college))
  }
}
