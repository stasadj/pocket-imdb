import ApiService from './ApiService';

const ENDPOINTS = {
  MOVIES: '/api/movies',
  GENRES: '/api/genres',
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
}

export const movieService = new MovieService();
