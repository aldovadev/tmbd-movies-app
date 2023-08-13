import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiService } from 'src/app/services/movie/movie-api-service.service';
import { StarService } from 'src/app/services/star/star.service';
import { Title } from '@angular/platform-browser';
import { Genre } from 'src/app/models/genre.model';
@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  constructor(
    private movieService: MovieApiService,
    public starService: StarService,
    private router: ActivatedRoute,
    private title: Title) {

  }

  movieResult: any = []
  getParamId: any
  genres: Genre[] = []
  genreName: string = ''

  hasMoreData: boolean = true;
  currentPage: number = 0;

  scrollDistance: number = 1;
  scrollUpDistance: number = 1;
  key: string = 'favoritesMovies';
  tooltipText: string = 'Add to Favorites';

  ngOnInit(): void {

    this.router.paramMap.subscribe((params) => {
      this.getParamId = params.get('id');
      this.currentPage = 0;
      this.movieResult = []
      this.fetchGenres()
      this.loadMoreMovies()
    });
  }


  fetchGenres(): void {
    this.movieService.getMovieGenres().subscribe({
      next: (result) => {
        this.genres = result.genres
        this.genreName = this.getGenreName(this.getParamId)
        this.title.setTitle(`Category | ${this.genreName}`);
      },
    })
  }

  getGenreName(params: any): any {
    for (let genre of this.genres) {
      if (genre.id.toString() === params) {
        return genre.name
      }
    }
  }

  saveToFavorites(data: any) {
    let storedData: any[] = JSON.parse(localStorage.getItem(this.key) || '[]');

    if (!storedData.some((item) => item.id === data.id)) {
      storedData.push(data);
      localStorage.setItem(this.key, JSON.stringify(storedData));
    } else {
      storedData = storedData.filter((item) => item.id !== data.id);
      localStorage.setItem(this.key, JSON.stringify(storedData));
    }
  }

  isInFavorites(data: any): boolean {
    let storedData: any[] = JSON.parse(localStorage.getItem(this.key) || '[]');
    if (storedData.some((item) => item.id === data.id)) {
      this.tooltipText = 'Remove from Favorites'
      return true
    } else {
      this.tooltipText = 'Add to Favorites';
      return false
    }
  }


  loadMoreMovies() {
    if (!this.hasMoreData) {
      return;
    }

    this.currentPage++;

    this.movieService.genreMovieApiData(this.currentPage, this.getParamId).subscribe({
      next: (result) => {
        this.movieResult = [...this.movieResult, ...result.results]
      },
    });
  }
}
