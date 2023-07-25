import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) { }

  genresMapping = [
    { link: 'Action', value: 'Action' },
    { link: 'Adventure', value: 'Adventure' },
    { link: 'Animation', value: 'Animation' },
    { link: 'Comedy', value: 'Comedy' },
    { link: 'Crime', value: 'Crime' },
    { link: 'Documentary', value: 'Documentary' },
    { link: 'Drama', value: 'Drama' },
    { link: 'Family', value: 'Family' },
    { link: 'Fantasy', value: 'Fantasy' },
    { link: 'History', value: 'History' },
    { link: 'Horror', value: 'Horror' },
    { link: 'Music', value: 'Music' },
    { link: 'Mystery', value: 'Mystery' },
    { link: 'Romance', value: 'Romance' },
    { link: 'Science_Fiction', value: 'Science Fiction' },
    { link: 'TV_Movie', value: 'TV Movie' },
    { link: 'Thriller', value: 'Thriller' },
    { link: 'War', value: 'War' },
    { link: 'Western', value: 'Western' },
  ];

  title = 'aldova';
  navbg: any = {
    'background-color': '#fbfbfb88',
  }

  inputValue: string = '';

  search(): void {
    if (this.inputValue !== '') {
      console.log(this.inputValue)
      this.router.navigate(['search/', this.inputValue]);
    }
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
      }
    }
  }
}
