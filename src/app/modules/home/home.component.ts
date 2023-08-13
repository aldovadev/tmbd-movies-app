import { Component, OnInit } from '@angular/core';
import { MovieApiService } from 'src/app/services/movie/movie-api-service.service';
import { StarService } from 'src/app/services/star/star.service';
import { Title, Meta } from '@angular/platform-browser';


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
    this.title.setTitle('Home - Aldova');
    this.meta.updateTag({ name: 'description', content: 'watch online movies' });
  }

  bannerResult: any = [];
  upcomingMovieResult: any = [];


  hasMoreData = true;
  currentPage = 0;

  scrollDistance = 1;
  scrollUpDistance = 1;
  private key = 'favoritesMovies';
  tooltipText: string = 'Add to Favorites';

  ngOnInit(): void {
    this.bannerData();
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
      this.tooltipText = 'Remove from Favorites';
      return true;
    } else {
      this.tooltipText = 'Add to Favorites';
      return false;
    }
  }

  loadMoreMovies() {
    if (!this.hasMoreData) {
      return;
    }

    this.currentPage++;

    this.movieService.homeMovieApiData(this.currentPage).subscribe({
      next: (result) => {
        this.upcomingMovieResult = [...this.upcomingMovieResult, ...result.results];
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
    const star = value >= 1 && value < 2;
    return star;
  }

  getEmptyStars(rating: any, index: number): boolean {
    const value = (2 * index) - rating;
    const star = value >= 1;
    return star;
  }

  bannerData() {
    this.movieService.bannerApiData().subscribe((result) => {
      this.bannerResult = result.results;
    });
  }
}
