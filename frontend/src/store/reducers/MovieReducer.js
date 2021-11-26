import {
  SET_MOVIES,
  SET_MOVIE,
  SET_GENRES,
  SET_COMMENTS,
  SET_POPULAR,
  SET_RELATED,
  UPDATE_MOVIE,
  ADD_COMMENT,
} from '../actions/ActionTypes';

const initialState = {
  all: [],
  count: 0,
  current: {},
  genres: [],
  comments: [],
  popular: [],
  related: [],
};
const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIES:
      return { ...state, all: action.payload.results, count: action.payload.count };
    case SET_MOVIE:
      return { ...state, current: action.payload };
    case SET_GENRES:
      return { ...state, genres: action.payload };
    case SET_COMMENTS:
      return { ...state, comments: action.payload };
    case SET_POPULAR:
      return { ...state, popular: action.payload };
    case SET_RELATED:
      return { ...state, related: action.payload };
    case UPDATE_MOVIE:
      return {
        ...state,
        all: state.all.map((movie) => (movie.id === action.payload.id ? action.payload : movie)),
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: state.comments.concat([action.payload]),
      };
    default:
      return state;
  }
};

export default movieReducer;
