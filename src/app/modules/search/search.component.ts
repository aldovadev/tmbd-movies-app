import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MovieApiService } from 'src/app/services/movie/movie-api-service.service';
import { StarService } from 'src/app/services/star/star.service';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

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

    this.title.setTitle('Search movies - Aldova');
    this.meta.updateTag({ name: 'description', content: 'search here movies like avatar,war etc' });
  }

  searchResult: any;
  getParamId: any = this.router.snapshot.paramMap.get('id');
  searchForm = new FormGroup({
    'movieName': new FormControl(this.getParamId)
  });

  movieResult: any = []

  key: string = 'favoritesMovies';
  tooltipText: string = 'Add to Favorites';


  ngOnInit(): void {
    this.submitForm();
  }

  submitForm() {
    this.movieService.getSearchMovie(this.searchForm.value).subscribe((result) => {
      this.searchResult = result.results;
    });
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

}
