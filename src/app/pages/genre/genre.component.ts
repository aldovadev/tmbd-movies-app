import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  constructor(
    private service: MovieApiServiceService,
    private spinner: NgxSpinnerService,
    private router: ActivatedRoute,
    private title: Title) {

  }

  movieResult: any = []
  getParamId: any

  hasMoreData = true;
  currentPage = 1;

  scrollDistance = 1;
  scrollUpDistance = 1;

  ngOnInit(): void {
    this.getParamId = this.router.snapshot.paramMap.get('id');

    console.log(this.getParamId, 'getparamid#');

    this.title.setTitle(`Category | ${this.getParamId}`);
    this.loadMoreMovies()
  }

  loadMoreMovies() {
    this.spinner.show();

    if (!this.hasMoreData) {
      return;
    }

    this.currentPage++;

    this.service.genreMovieApiData(this.currentPage, this.getGenreId(this.getParamId)).subscribe({
      next: (result) => {
        this.movieResult = [...this.movieResult, ...result.results];
        console.log(result, 'movieresult#');
      },
      error: (error) => {
        console.error('Error fetching next page:', error);
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

  getGenreId(params: any): any {
    let data: any;
    switch (params) {
      case 'Action': data = '28'; break;
      case 'Adventure': data = '12'; break;
      case 'Animation': data = '16'; break;
      case 'Comedy': data = '35'; break;
      case 'Crime': data = '80'; break;
      case 'Documentary': data = '99'; break;
      case 'Drama': data = '18'; break;
      case 'Family': data = '10751'; break;
      case 'Fantasy': data = '14'; break;
      case 'History': data = '36'; break;
      case 'Horror': data = '27'; break;
      case 'Music': data = '10402'; break;
      case 'Mystery': data = '9648'; break;
      case 'Romance': data = '10749'; break;
      case 'Science_Fiction': data = '878'; break;
      case 'TV_Movie': data = '10770'; break;
      case 'Thriller': data = '53'; break;
      case 'War': data = '10752'; break;
      case 'Western': data = '37'; break;
    }
    return data;
  }

  getGenre(): any {
    var data: any
    switch (this.getGenreId(this.getParamId)) {
      case '28': data = 'Action'; break;
      case '12': data = 'Adventure'; break;
      case '16': data = 'Animation'; break;
      case '35': data = 'Comedy'; break;
      case '80': data = 'Crime'; break;
      case '99': data = 'Documentary'; break;
      case '18': data = 'Drama'; break;
      case '10751': data = 'Family'; break;
      case '14': data = 'Fantasy'; break;
      case '36': data = 'History'; break;
      case '27': data = 'Horror'; break;
      case '10402': data = 'Music'; break;
      case '9648': data = 'Mistery'; break;
      case '10749': data = 'Romance'; break;
      case '878': data = 'Science Fiction'; break;
      case '10770': data = 'TV Movie'; break;
      case '53': data = 'Thriller'; break;
      case '10752': data = 'War'; break;
      case '37': data = 'Western'; break;
      default: data = 'Random Genre'; break;
    }
    return data;
  }

  getFilledStars(rating: any, index: number): boolean {
    const value = rating - (2 * index);
    const star = value >= 0
    return star;
  }

  getHalfStars(rating: any, index: number): boolean {
    const value = rating - (2 * index);
    const star = value > 1 && value < 2;
    return star;
  }

  getEmptyStars(rating: any, index: number): boolean {
    const value = (2 * index) - rating;
    const star = value >= 1;
    return star;
  }
}
