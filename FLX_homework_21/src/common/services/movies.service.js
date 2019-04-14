export class MoviesService {
  constructor($http) {
    this.$http = $http;
    this.url = 'https://reactjs-cdp.herokuapp.com/movies?limit=30';
  }

  findMovieById(id) {
    return this.getAllMovies()
      .then(result => result.data.find(element => Number(element.id) === Number(id)));
  }

  getAllMovies() {
    return this.$http.get(this.url)
      .then(respons => respons.data);
  }
}

MoviesService.serviceName = 'moviesService';
MoviesService.$inject = ['$http'];
