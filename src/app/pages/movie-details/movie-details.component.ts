import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiService } from 'src/app/service/movie-api-service.service';
import { Title, Meta } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  constructor(
    private service: MovieApiService,
    private router: ActivatedRoute,
    private title: Title,
    private meta: Meta,
    private location: Location,
    private Router: Router
  ) { }

  getMovieDetailResult: any;
  getMovieVideoResult: any;
  getMovieCastResult: any;

  ngOnInit() {
    let getParamId = this.router.snapshot.paramMap.get('id');

    this.getMovie(getParamId);
    this.getVideo(getParamId);
  }

  goBack(): void {
    this.location.back();
  }
  goWebsite(link: string): void {
    window.open(link, '_blank');
  }
  goTrailer(link: string): void {
    const youtubeUrl = `https://youtu.be/${link}`;
    window.open(youtubeUrl, '_blank');
  }
  goIMDB(link: string): void {
    const imdbUrl = `https://www.imdb.com/title/${link}`;
    window.open(imdbUrl, '_blank');
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

  getMovie(id: any) {
    this.service.getMovieDetails(id).subscribe(async (result) => {
      this.getMovieDetailResult = await result;

      // updatetags
      this.title.setTitle(`${this.getMovieDetailResult.original_title} | ${this.getMovieDetailResult.tagline}`);
      this.meta.updateTag({ name: 'title', content: this.getMovieDetailResult.original_title });
      this.meta.updateTag({ name: 'description', content: this.getMovieDetailResult.overview });

      // facebook
      this.meta.updateTag({ property: 'og:type', content: "website" });
      this.meta.updateTag({ property: 'og:url', content: `` });
      this.meta.updateTag({ property: 'og:title', content: this.getMovieDetailResult.original_title });
      this.meta.updateTag({ property: 'og:description', content: this.getMovieDetailResult.overview });
      this.meta.updateTag({ property: 'og:image', content: `https://image.tmdb.org/t/p/original/${this.getMovieDetailResult.backdrop_path}` });

    });
  }

  getVideo(id: any) {
    this.service.getMovieVideo(id).subscribe((result) => {
      result.results.forEach((element: any) => {
        if (element.type == "Trailer") {
          this.getMovieVideoResult = element.key;
        }
      });
    });
  }

}
