import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { MovieApiService } from 'src/app/services/movie/movie-api-service.service'
import { StarService } from 'src/app/services/star/star.service'
import { Title, Meta } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { Card } from 'src/app/models/card.model'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    private movieService: MovieApiService,
    public starService: StarService,
    private title: Title,
    private meta: Meta,
    private router: ActivatedRoute) {

    this.title.setTitle('Search movies - Aldova')
    this.meta.updateTag({ name: 'description', content: 'search here movies like avatar,war etc' })
  }

  isVisible: boolean = false

  searchResult: Card[] = []
  getParamId: string = ''
  movieResult: Card[] = []
  key: string = 'favoritesMovies'
  tooltipText: string = 'Add to Favorites'

  searchForm = new FormGroup({
    'movieName': new FormControl(this.getParamId)
  })

  ngOnInit(): void {

    this.router.paramMap.subscribe((params) => {
      const id = params.get('id')
      if (id !== null) {
        this.getParamId = id
        this.searchForm.get('movieName')?.setValue(id);
      }
      this.submitForm()
    })
  }

  submitForm() {
    let searchTerm = this.searchForm.get('movieName')!.value;
    if (searchTerm === null || undefined) {
      searchTerm = ''
    }

    this.movieService.getSearchMovie(searchTerm).subscribe({
      next: (result) => {
        this.searchResult = [...this.movieResult, ...result]
        this.isVisible = true
      }
    })
  }
}
