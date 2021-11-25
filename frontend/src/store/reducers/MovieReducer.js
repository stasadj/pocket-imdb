import { SET_MOVIES, SET_MOVIE, SET_GENRES, UPDATE_MOVIE } from '../actions/ActionTypes';

const initialState = {
  all: [],
  count: 0,
  current: {},
  genres: [],
};
const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES:
      return { ...state, all: action.payload.results, count: action.payload.count };
    case SET_MOVIE:
      return { ...state, current: action.payload };
    case SET_GENRES:
      return { ...state, genres: action.payload };
    case UPDATE_MOVIE:
      return {
        ...state,
        all: state.all.map((movie) => (movie.id === action.payload.id ? action.payload : movie)),
      };
    default:
      return state;
  }
};

export default movieReducer;
