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

  patchMovie = (id) => {
    return this.apiClient.patch(`${ENDPOINTS.MOVIES}/${id}`, {});
  };

  getGenres = () => {
    return this.apiClient.get(ENDPOINTS.GENRES);
  };
}

export const movieService = new MovieService();
