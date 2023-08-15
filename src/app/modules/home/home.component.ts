import { Component, OnInit } from '@angular/core'
import { MovieApiService } from 'src/app/services/movie/movie-api-service.service'
import { StarService } from 'src/app/services/star/star.service'
import { Title, Meta } from '@angular/platform-browser'
import { Banner } from 'src/app/models/banner.model'
import { Card } from 'src/app/models/card.model'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(
    private movieService: MovieApiService,
    public starService: StarService,
    private title: Title,
    private meta: Meta) {
    this.title.setTitle('Home - Aldova')
    this.meta.updateTag({ name: 'description', content: 'watch online movies' })
  }

  isVisible: boolean = true

  bannerResult: Banner[] = []
  upcomingMovieResult: Card[] = []


  hasMoreData: boolean = true
  currentPage: number = 1

  scrollDistance: number = 2
  scrollUpDistance: number = 2
  key: string = 'favoritesMovies'
  tooltipText: string = 'Add to Favorites'

  ngOnInit(): void {
    this.bannerData()

    this.movieService.homeMovieApiData(this.currentPage).subscribe({
      next: (result) => {
        this.upcomingMovieResult = [...this.upcomingMovieResult, ...result]
      }
    })
  }

  loadMoreMovies() {
    if (!this.hasMoreData) {
      return
    }

    this.currentPage++
    this.isVisible = false

    this.movieService.homeMovieApiData(this.currentPage).subscribe({
      next: (result) => {
        this.upcomingMovieResult = [...this.upcomingMovieResult, ...result]
        this.isVisible = true
      }
    })
  }

  bannerData() {
    this.movieService.bannerApiData().subscribe({
      next: (result) => {
        this.bannerResult = [...this.bannerResult, ...result]
      }
    })
  }
}

