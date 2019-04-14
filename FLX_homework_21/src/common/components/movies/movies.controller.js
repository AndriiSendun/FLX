export class MoviesController {
  constructor() {
    this.movies = [];
    this.reverse = true;
    this.order = 'title';
  }

  $onInit() {
    console.log('$onInit');
  }

  $onChanges(changes) {
    console.log(this.movies);
    console.log(changes.movies);
  }

  $doCheck() {
    console.log('$doCheck');
  }

  $postLink() {
    console.log('$postLink');
  }

  $onDestroy() {
    console.log('$onDestroy');
  }
}
