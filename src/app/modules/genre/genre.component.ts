import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiService } from 'src/app/services/movie/movie-api-service.service';
import { StarService } from 'src/app/services/star/star.service';
import { Title } from '@angular/platform-browser';
import { Genre } from 'src/app/models/genre.model';
import { Card } from 'src/app/models/card.model';
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

  movieResult: Card[] = []
  getParamId: string = ''
  genres: Genre[] = []
  genreName: string = ''

  hasMoreData: boolean = true;
  currentPage: number = 0;

  scrollDistance: number = 2;
  scrollUpDistance: number = 2;
  key: string = 'favoritesMovies';
  tooltipText: string = 'Add to Favorites';

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.getParamId = id;
        this.currentPage = 0;
        this.movieResult = []
        this.fetchGenres()
        this.loadMoreMovies()
      }
    });
  }

  fetchGenres(): void {
    this.movieService.getMovieGenres().subscribe({
      next: (result) => {
        this.genres = [...this.genres, ...result.genres]
        this.getGenreName(this.getParamId)
        this.title.setTitle(`Category | ${this.genreName}`);
      },
    })
  }

  getGenreName(params: string): void {
    for (let genre of this.genres) {
      if (genre.id.toString() === params) {
        this.genreName = genre.name
      }
    }
  }

  saveToFavorites(data: Card) {
    let storedData: Card[] = JSON.parse(localStorage.getItem(this.key) || '[]');

    if (!storedData.some((item) => item.id === data.id)) {
      storedData.push(data);
      localStorage.setItem(this.key, JSON.stringify(storedData));
    } else {
      storedData = storedData.filter((item) => item.id !== data.id);
      localStorage.setItem(this.key, JSON.stringify(storedData));
    }
  }

  isInFavorites(data: Card): boolean {
    let storedData: Card[] = JSON.parse(localStorage.getItem(this.key) || '[]');
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
        this.movieResult = [...this.movieResult, ...result]
      }
    });
  }
}
