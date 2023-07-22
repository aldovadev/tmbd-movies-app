import { Component, OnInit } from '@angular/core';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
import { Title, Meta } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {

  constructor(private service: MovieApiServiceService, public spinner: NgxSpinnerService, private title: Title, private meta: Meta) {
    this.title.setTitle('Home - Aldova');
    this.meta.updateTag({ name: 'description', content: 'watch online movies' });

  }

  bannerResult: any = [];
  upcomingMovieResult: any = [];
  actionMovieResult: any = [];
  adventureMovieResult: any = [];
  animationMovieResult: any = [];
  comedyMovieResult: any = [];
  documentaryMovieResult: any = [];
  sciencefictionMovieResult: any = [];
  thrillerMovieResult: any = [];

  hasMoreData = true;
  currentPage = 1;

  scrollDistance = 1; // Adjust the value as needed
  scrollUpDistance = 1; // Adjust the value as needed

  ngOnInit(): void {
    this.bannerData();
  }

  loadMoreMovies() {
    this.spinner.show();

    if (!this.hasMoreData) {
      return;
    }

    this.currentPage++;

    this.service.upcomingMovieApiData(this.currentPage).subscribe({
      next: (result) => {
        this.upcomingMovieResult = [...this.upcomingMovieResult, ...result.results];
        console.log(result, 'upcomingresult#');
      },
      error: (error) => {
        console.error('Error fetching next page:', error);
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }


  bannerData() {
    this.service.bannerApiData().subscribe((result) => {
      console.log(result, 'bannerresult#');
      this.bannerResult = result.results;
    });
  }

  upcomingData() {
    this.service.upcomingMovieApiData(1).subscribe((result) => {
      console.log(result, 'upcomingresult#');
      this.upcomingMovieResult = result.results;

    });
  }

  // action
  actionMovie() {
    this.service.fetchActionMovies().subscribe((result) => {
      this.actionMovieResult = result.results;
    });
  }


  // adventure
  adventureMovie() {
    this.service.fetchAdventureMovies().subscribe((result) => {
      this.adventureMovieResult = result.results;
    });
  }


  // animation
  animationMovie() {
    this.service.fetchAnimationMovies().subscribe((result) => {
      this.animationMovieResult = result.results;
    });
  }


  // comedy
  comedyMovie() {
    this.service.fetchComedyMovies().subscribe((result) => {
      this.comedyMovieResult = result.results;
    });
  }

  // documentary
  documentaryMovie() {
    this.service.fetchDocumentaryMovies().subscribe((result) => {
      this.documentaryMovieResult = result.results;
    });
  }


  // science-fiction
  sciencefictionMovie() {
    this.service.fetchScienceFictionMovies().subscribe((result) => {
      this.sciencefictionMovieResult = result.results;
    });
  }

  // thriller
  thrillerMovie() {
    this.service.fetchThrillerMovies().subscribe((result) => {
      this.thrillerMovieResult = result.results;
    });
  }

}
