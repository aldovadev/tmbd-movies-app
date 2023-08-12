import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MovieApiService } from 'src/app/service/movie/movie-api-service.service';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    private service: MovieApiService,
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


  ngOnInit(): void {
    this.submitForm();
  }

  submitForm() {
    this.service.getSearchMovie(this.searchForm.value).subscribe((result) => {
      this.searchResult = result.results;
    });
  }
}
