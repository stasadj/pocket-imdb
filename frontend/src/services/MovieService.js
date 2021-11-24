import ApiService from './ApiService';

const ENDPOINTS = {
  MOVIES: '/api/movies',
};

class MovieService extends ApiService {
  getMovies = (queryParams) => {
    return this.apiClient.get(
      `${ENDPOINTS.MOVIES}?page=${queryParams.active}&title=${queryParams.title}`,
    );
  };

  getMovie = (id) => {
    return this.apiClient.get(`${ENDPOINTS.MOVIES}/${id}`);
  };

  patchMovie = (id) => {
    return this.apiClient.patch(`${ENDPOINTS.MOVIES}/${id}`, {});
  };
}

export const movieService = new MovieService();
