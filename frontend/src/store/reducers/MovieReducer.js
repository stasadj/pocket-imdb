import { SET_MOVIES, SET_MOVIE } from '../actions/ActionTypes';

const initialState = {
  all: [],
  count: 0,
  current: {},
};
const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES:
      return { ...state, all: action.payload.results, count: action.payload.count };
    case SET_MOVIE:
      return { ...state, current: action.payload };
    default:
      return state;
  }
};

export default movieReducer;
