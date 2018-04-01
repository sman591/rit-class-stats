export const LOADING = 'counter/LOADING'
export const UPDATE = 'counter/UPDATE'

const initialState = {
  courses: [],
  loadedAt: null,
  isLoading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true
      }

    case UPDATE:
      return {
        ...state,
        courses: action.courses,
        loadedAt: new Date(),
        isLoading: false,
      }

    default:
      return state
  }
}

export const loading = () => {
  return dispatch => {
    dispatch({
      type: LOADING,
    })
  }
}

export const forceUpdate = (college) => {
  return async (dispatch, getState) => {
    dispatch(loading())

    const response = await fetch('/api/courses')
    const json = await response.json()
    const courseData = json
    const courses = courseData.reduce((acc, course) => {
      acc[course.course_id] = course
      return acc
    }, {})

    dispatch({
      type: UPDATE,
      courses,
    })
  }
}

export const update = (college) => {
  return (dispatch, getState) => {
    const { courses } = getState()
    if (courses.loadedAt !== null) {
      return
    }
    dispatch(forceUpdate(college))
  }
}
