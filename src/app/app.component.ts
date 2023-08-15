import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieApiService } from './services/movie/movie-api-service.service';
import { Genre } from './models/genre.model';
import { colorBg, shadowBg } from './enums/navbar.enums';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private service: MovieApiService) {
  }

  genres: Genre[] = []
  navbg: object = {
    'background-color': colorBg.stickyOn,
    'box-shadow': shadowBg.stickyOn,
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
        'background-color': colorBg.stickyOff,
        'box-shadow': shadowBg.stickyOff,
      }
    } else {
      this.navbg = {
        'background-color': colorBg.stickyOn,
        'box-shadow': shadowBg.stickyOn,
      }
    }
  }
}
