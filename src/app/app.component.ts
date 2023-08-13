import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieApiService } from './services/movie/movie-api-service.service';
import { Genre, GenreResponse } from './models/genre.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private service: MovieApiService) {
  }

  genres: Genre[] = []
  navbg: object = {
    'background-color': '#fbfbfb88',
    'box-shadow': 'rgba(0, 0, 0, 0) 0px 3px 8px',
  }

  inputValue: string = '';

  ngOnInit(): void {
    this.fetchGenres()
  }

  search(): void {
    if (this.inputValue !== '') {
      this.router.navigate(['search/', this.inputValue]);
    }
  }

  fetchGenres(): void {
    this.service.getMovieGenres().subscribe({
      next: (result) => {
        this.genres = result.genres
      },
    })
  }

  @HostListener('document:scroll') scrollover() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.navbg = {
        'background-color': '#fbfbfb',
        'box-shadow': 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      }
    } else {
      this.navbg = {
        'background-color': '#fbfbfb88',
        'box-shadow': 'rgba(0, 0, 0, 0) 0px 3px 8px',
      }
    }
  }
}
