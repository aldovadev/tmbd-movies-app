import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  constructor(private http: HttpClient) { }

  baseurl = "https://api.themoviedb.org/3";
  apikey = "65f14c03dd14e3f90d43e56a32eb9f6f";


  //bannerapidata
  bannerApiData(): Observable<any> {
    return this.http.get(`${this.baseurl}/trending/all/day?api_key=${this.apikey}`);
  }

  // homemovieapidata
  homeMovieApiData(page: number): Observable<any> {
    return this.http.get(`${this.baseurl}/movie/now_playing?api_key=${this.apikey}&page=${page}`);
  }

  // categorymovieapidata
  categoryMovieApiData(page: number, category: string): Observable<any> {
    return this.http.get(`${this.baseurl}/movie/${category}?api_key=${this.apikey}&page=${page}`);
  }

  genreMovieApiData(page: number, genre: string): Observable<any> {
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&page=${page}&with_genres=${genre}`);
  }

  // searchmovive
  getSearchMovie(data: any): Observable<any> {
    return this.http.get(`${this.baseurl}/search/movie?api_key=${this.apikey}&query=${data.movieName}`);
  }

  // getmoviedatails
  getMovieDetails(data: any): Observable<any> {
    return this.http.get(`${this.baseurl}/movie/${data}?api_key=${this.apikey}`)
  }

  // getMovieVideo
  getMovieVideo(data: any): Observable<any> {
    return this.http.get(`${this.baseurl}/movie/${data}/videos?api_key=${this.apikey}`)
  }
}
