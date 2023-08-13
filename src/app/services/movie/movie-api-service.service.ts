import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  constructor(private http: HttpClient) { }

  baseurl = environment.baseurl
  token = environment.ACCESS_TOKEN

  getHeaders(): HttpHeaders {
    const token = this.token; // Implement this method in AuthenticationService
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  bannerApiData(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseurl}/trending/all/day`, { headers });
  }

  homeMovieApiData(page: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseurl}/movie/now_playing?page=${page}`, { headers });
  }

  categoryMovieApiData(page: number, category: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseurl}/movie/${category}?page=${page}`, { headers });
  }

  genreMovieApiData(page: number, genre: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseurl}/discover/movie?page=${page}&with_genres=${genre}`, { headers });
  }

  getSearchMovie(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseurl}/search/movie?query=${data.movieName}`, { headers });
  }

  getMovieDetails(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseurl}/movie/${data}`, { headers });
  }

  getMovieVideo(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseurl}/movie/${data}/videos`, { headers });
  }

  getMovieGenres(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseurl}/genre/movie/list`, { headers });
  }
}
