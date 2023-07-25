import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiService } from 'src/app/service/movie-api-service.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  constructor(
    private service: MovieApiService,
    private router: ActivatedRoute,
    private title: Title) {

  }

  favorites: any[] = [];

  movieResult: any = []
  getParamId: any

  hasMoreData = true;
  currentPage = 1;

  scrollDistance = 1;
  scrollUpDistance = 1;
  private key = 'favoritesMovies';
  tooltipText: string = 'Add to Favorites';

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.getParamId = params.get('id');
      this.currentPage = 1;
      this.movieResult = []
      this.loadMoreMovies()
      if (this.getParamId === 'favorites') {
        let storedData: any[] = JSON.parse(localStorage.getItem(this.key) || '[]');
        this.favorites = storedData
        this.movieResult = storedData
        this.hasMoreData = false
      } else this.hasMoreData = true
    });

    this.title.setTitle(`Category | ${this.getParamId}`);
  }

  saveToFavorites(data: any) {
    let storedData: any[] = JSON.parse(localStorage.getItem(this.key) || '[]');

    if (!storedData.some((item) => item.id === data.id)) {
      storedData.push(data);
      localStorage.setItem(this.key, JSON.stringify(storedData));
      this.favorites = storedData;
    } else {
      storedData = storedData.filter((item) => item.id !== data.id);
      localStorage.setItem(this.key, JSON.stringify(storedData));
      this.favorites = storedData;
    }

    if (this.getParamId === 'favorites') {
      this.movieResult = this.favorites
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
    this.currentPage++;

    this.service.categoryMovieApiData(this.currentPage, this.getParamId).subscribe({
      next: (result) => {
        this.movieResult = [...this.movieResult, ...result.results];
      }
    });

  }

  getCategory(): string {
    var data: any
    switch (this.getParamId) {
      case 'favorites': data = 'Favorites'; break;
      case 'upcoming': data = 'Upcoming'; break;
      case 'top_rated': data = 'Top Rated'; break;
      case 'popular': data = 'Popular'; break;
    }
    return data;
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
}
