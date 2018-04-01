export const LOADING = 'counter/LOADING';
export const UPDATE = 'counter/UPDATE';

const initialState = {
  courses: [],
  loadedAt: null,
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true
      };

    case UPDATE:
      return {
        ...state,
        courses: action.courses,
        loadedAt: new Date(),
        isLoading: false,
      };

    default:
      return state;
  }
};

export const loading = () => {
  return dispatch => {
    dispatch({
      type: LOADING,
    });
  };
};

export const update = (courses) => {
  return dispatch => {
    dispatch({
      type: UPDATE,
      courses,
    });
  };
};
