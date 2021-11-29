import ApiService from './ApiService';

const ENDPOINTS = {
  MOVIES: '/api/movies',
  GENRES: '/api/genres',
  WATCH_LIST: 'api/watch-list',
};

class MovieService extends ApiService {
  getMovies = (queryParams) => {
    return this.apiClient.get(
      `${ENDPOINTS.MOVIES}?page=${queryParams.active}&title=${queryParams.title}&genre=${queryParams.genre}`,
    );
  };

  getMovie = (id) => {
    return this.apiClient.get(`${ENDPOINTS.MOVIES}/${id}`);
  };

  getGenres = () => {
    return this.apiClient.get(ENDPOINTS.GENRES);
  };

  getPopular = () => {
    return this.apiClient.get(`${ENDPOINTS.MOVIES}/popular`);
  };

  getRelated = (id) => {
    return this.apiClient.get(`${ENDPOINTS.MOVIES}/${id}/related`);
  };

  getComments = (params) => {
    return this.apiClient.get(`${ENDPOINTS.MOVIES}/${params.id}/comments?limit=${params.limit}`);
  };

  getWatchList = () => {
    return this.apiClient.get(ENDPOINTS.WATCH_LIST);
  };

  viewMovie = (id) => {
    return this.apiClient.patch(`${ENDPOINTS.MOVIES}/${id}`, {});
  };

  likeMovie = (id) => {
    return this.apiClient.patch(`${ENDPOINTS.MOVIES}/${id}/like`, {});
  };

  dislikeMovie = (id) => {
    return this.apiClient.patch(`${ENDPOINTS.MOVIES}/${id}/dislike`, {});
  };

  postComment = (payload) => {
    return this.apiClient.post(`${ENDPOINTS.MOVIES}/${payload.id}/comment`, {
      content: payload.content,
    });
  };
  postMovie = (payload) => {
    return this.apiClient.post(ENDPOINTS.MOVIES, payload);
  };
}

export const movieService = new MovieService();
