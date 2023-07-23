import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  constructor(
    private service: MovieApiServiceService,
    private spinner: NgxSpinnerService,
    private router: ActivatedRoute,
    private title: Title) {

  }


  movieResult: any = []
  getParamId: any

  hasMoreData = true;
  currentPage = 1;

  scrollDistance = 1;
  scrollUpDistance = 1;

  ngOnInit(): void {
    this.getParamId = this.router.snapshot.paramMap.get('id');

    console.log(this.getParamId, 'getparamid#');

    this.title.setTitle(`Category | ${this.getParamId}`);
    this.loadMoreMovies()
  }

  loadMoreMovies() {
    this.spinner.show();

    if (!this.hasMoreData) {
      return;
    }

    this.currentPage++;

    this.service.categoryMovieApiData(this.currentPage, this.getParamId).subscribe({
      next: (result) => {
        this.movieResult = [...this.movieResult, ...result.results];
        console.log(result, 'movieresult#');
      },
      error: (error) => {
        console.error('Error fetching next page:', error);
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

  getCategory(): string {
    var data: any
    switch (this.getParamId) {
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
