import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { MovieApiService } from 'src/app/services/movie/movie-api-service.service'
import { StarService } from 'src/app/services/star/star.service'
import { Title } from '@angular/platform-browser'
import { Card } from 'src/app/models/card.model'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  constructor(
    private movieService: MovieApiService,
    public starService: StarService,
    private router: ActivatedRoute,
    private title: Title) {

  }

  isVisible: boolean = false

  favorites: Card[] = []

  movieResult: Card[] = []
  getParamId: string = ''

  hasMoreData: boolean = true
  currentPage: number = 1

  scrollDistance: number = 2
  scrollUpDistance: number = 2
  private key = 'favoritesMovies'
  tooltipText: string = 'Add to Favorites'

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      const id = params.get('id')
      if (id !== null) {
        this.getParamId = id
        this.movieResult = []
        if (this.getParamId === 'favorites') {
          let storedData = [] = JSON.parse(localStorage.getItem(this.key) || '[]')
          this.favorites = storedData
          this.movieResult = storedData
          this.hasMoreData = false
          if (this.movieResult.length === 0) {
            this.isVisible = true
          }
          else {
            this.isVisible = false
          }
        } else { this.hasMoreData = true }

        if (this.getParamId !== 'favorites') {
          this.movieService.categoryMovieApiData(this.currentPage, this.getParamId).subscribe({
            next: (result) => {
              this.movieResult = [...this.movieResult, ...result]
              if (this.movieResult.length === 0) {
                this.isVisible = true
              }
            },
            error: (error) => {
              this.isVisible = true
            }
          })
        }
      }
    })

    this.title.setTitle(`Category | ${this.getParamId}`)
  }

  loadMoreMovies() {
    if (!this.hasMoreData) {
      return;
    }
    this.currentPage++
    if (this.getParamId !== 'favorites') {
      this.movieService.categoryMovieApiData(this.currentPage, this.getParamId).subscribe({
        next: (result) => {
          this.movieResult = [...this.movieResult, ...result]
        }
      })
    }
  }

  getCategory(): string {
    switch (this.getParamId) {
      case 'favorites': return 'Favorites';
      case 'upcoming': return 'Upcoming';
      case 'top_rated': return 'Top Rated';
      case 'popular': return 'Popular';
      default: return '';
    }
  }

}
