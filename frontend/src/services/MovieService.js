import ApiService from './ApiService';

const ENDPOINTS = {
  MOVIES: '/api/movies',
};

class MovieService extends ApiService {
  getMovies = (page) => {
    return this.apiClient.get(`${ENDPOINTS.MOVIES}?page=${page}`);
  };

  getMovie = (id) => {
    return this.apiClient.get(`${ENDPOINTS.MOVIES}/${id}`);
  };
}

export const movieService = new MovieService();
