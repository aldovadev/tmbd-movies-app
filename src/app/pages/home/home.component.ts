import { Component, OnInit } from '@angular/core';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
import { Title, Meta } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(
    private service: MovieApiServiceService,
    private spinner: NgxSpinnerService,
    private title: Title,
    private meta: Meta) {
    this.title.setTitle('Home - Aldova');
    this.meta.updateTag({ name: 'description', content: 'watch online movies' });
  }

  bannerResult: any = [];
  upcomingMovieResult: any = [];


  hasMoreData = true;
  currentPage = 1;

  scrollDistance = 1;
  scrollUpDistance = 1;
  private key = 'favoritesMovies';

  ngOnInit(): void {
    this.bannerData();
  }

  saveToFavorites(data: any) {
    let storedData: any[] = JSON.parse(localStorage.getItem(this.key) || '[]');
    storedData.push(data);
    localStorage.setItem(this.key, JSON.stringify(storedData));
    console.log(storedData, 'dataFavorites#');
  }

  loadMoreMovies() {
    this.spinner.show();

    if (!this.hasMoreData) {
      return;
    }

    this.currentPage++;

    this.service.categoryMovieApiData(this.currentPage, 'upcoming').subscribe({
      next: (result) => {
        this.upcomingMovieResult = [...this.upcomingMovieResult, ...result.results];
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

  getFilledStars(rating: any, index: number): boolean {
    const value = rating - (2 * index);
    const star = value >= 0
    return star;
  }

  getHalfStars(rating: any, index: number): boolean {
    const value = rating - (2 * index);
    const star = value > 1 && value < 2;
    return star;
  }

  getEmptyStars(rating: any, index: number): boolean {
    const value = (2 * index) - rating;
    const star = value >= 1;
    return star;
  }

  bannerData() {
    this.service.bannerApiData().subscribe((result) => {
      this.bannerResult = result.results;
    });
  }
}
