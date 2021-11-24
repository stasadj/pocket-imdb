import { SET_MOVIES } from '../actions/ActionTypes';

const initialState = {
  all: [],
  count: 0,
};
const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES:
      return { ...state, all: action.payload.results, count: action.payload.count };
    default:
      return state;
  }
};

export default movieReducer;
