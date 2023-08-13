import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiService } from 'src/app/services/movie/movie-api-service.service';
import { StarService } from 'src/app/services/star/star.service';
import { Title, Meta } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Detail } from 'src/app/models/detail.model';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  constructor(
    private movieService: MovieApiService,
    public starService: StarService,
    private router: ActivatedRoute,
    private title: Title,
    private meta: Meta,
    private location: Location,
    private Router: Router
  ) { }

  getMovieDetailResult: Detail | null = null
  getMovieVideoResult: string = ''
  getParamId: string = ''

  ngOnInit() {
    const id = this.router.snapshot.paramMap.get('id')
    if (id !== null) {
      this.getParamId = id
      this.getMovieDetail(this.getParamId);
      this.getMovieVideo(this.getParamId);
    }
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

  getMovieDetail(id: string) {
    this.movieService.getMovieDetail(id).subscribe({
      next: (result) => {
        this.getMovieDetailResult = result

        // updatetags
        this.title.setTitle(`${this.getMovieDetailResult.title} | ${this.getMovieDetailResult.tagline}`);
        this.meta.updateTag({ name: 'title', content: this.getMovieDetailResult.title });
        this.meta.updateTag({ name: 'description', content: this.getMovieDetailResult.overview });

        // facebook
        this.meta.updateTag({ property: 'og:type', content: "website" });
        this.meta.updateTag({ property: 'og:url', content: '' });
        this.meta.updateTag({ property: 'og:title', content: this.getMovieDetailResult.title });
        this.meta.updateTag({ property: 'og:description', content: this.getMovieDetailResult.overview });
      }
    });
  }

  getMovieVideo(id: string) {
    this.movieService.getMovieVideo(id).subscribe({
      next: (result) => {
        this.getMovieVideoResult = result.results[0].key
      }
    });
  }
}
