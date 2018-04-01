export const LOADING = 'counter/LOADING'
export const UPDATE = 'counter/UPDATE'

const COLLEGES = ['GCCIS', 'CIAS', 'SCB', 'CHST', 'COS', 'CAST', 'CLA', 'INTSD', 'KGCOE', 'GIS', 'NTID']
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

export const update = (college) => {
  return (dispatch, getState) => {
    const { courses } = getState()
    if (courses[college].loadedAt !== null) {
      return
    }
    dispatch(forceUpdate(college))
  }
}
