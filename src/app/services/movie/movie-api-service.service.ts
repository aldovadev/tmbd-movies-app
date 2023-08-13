import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Banner } from 'src/app/models/banner.model';
import { Card, MovieApiResponse } from 'src/app/models/card.model';
import { GenreResponse } from 'src/app/models/genre.model';
import { Detail, VideoApiResponse } from 'src/app/models/detail.model';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  private baseurl: string = environment.baseurl;
  private token: string = environment.ACCESS_TOKEN;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = this.token;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  bannerApiData(): Observable<Banner[]> {
    const headers = this.getHeaders();
    return this.http
      .get<MovieApiResponse>(`${this.baseurl}/trending/all/day`, { headers })
      .pipe(
        map((response: MovieApiResponse) => {
          return response.results.map((item: any) => ({
            id: item.id,
            title: item.title,
            overview: item.overview,
            backdrop_path: item.backdrop_path
          }));
        }),
        catchError((error) => {
          console.error('Error fetching banner data:', error);
          throw error;
        })
      );
  }

  homeMovieApiData(page: number): Observable<Card[]> {
    const headers = this.getHeaders();
    return this.http.get<MovieApiResponse>(`${this.baseurl}/movie/now_playing?page=${page}`, { headers })
      .pipe(
        map((response: MovieApiResponse) => {
          return response.results.map((item: any) => ({
            id: item.id,
            title: item.title,
            vote_average: item.vote_average,
            poster_path: item.poster_path
          }));
        }),
        catchError((error) => {
          console.error('Error fetching home card data:', error);
          throw error;
        })
      );
  }

  categoryMovieApiData(page: number, category: string): Observable<Card[]> {
    const headers = this.getHeaders();
    return this.http.get<MovieApiResponse>(`${this.baseurl}/movie/${category}?page=${page}`, { headers })
      .pipe(
        map((response: MovieApiResponse) => {
          return response.results.map((item: any) => ({
            id: item.id,
            title: item.title,
            vote_average: item.vote_average,
            poster_path: item.poster_path
          }));
        }),
        catchError((error) => {
          console.error('Error fetching category card data:', error);
          throw error;
        })
      );
  }

  genreMovieApiData(page: number, genre: string): Observable<Card[]> {
    const headers = this.getHeaders();
    return this.http.get<MovieApiResponse>(`${this.baseurl}/discover/movie?page=${page}&with_genres=${genre}`, { headers })
      .pipe(
        map((response: MovieApiResponse) => {
          return response.results.map((item: any) => ({
            id: item.id,
            title: item.title,
            vote_average: item.vote_average,
            poster_path: item.poster_path
          }));
        }),
        catchError((error) => {
          console.error('Error fetching genre card data:', error);
          throw error;
        })
      );
  }

  getSearchMovie(input: string): Observable<Card[]> {
    const headers = this.getHeaders();
    return this.http.get<MovieApiResponse>(`${this.baseurl}/search/movie?query=${input}`, { headers })
      .pipe(
        map((response: MovieApiResponse) => {
          return response.results.map((item: any) => ({
            id: item.id,
            title: item.title,
            vote_average: item.vote_average,
            poster_path: item.poster_path
          }));
        }),
        catchError((error) => {
          console.error('Error fetching genre card data:', error);
          throw error;
        })
      );
  }

  getMovieDetail(id: string): Observable<Detail> {
    const headers = this.getHeaders();
    return this.http.get<Detail>(`${this.baseurl}/movie/${id}`, { headers })
      .pipe(
        map((response: Detail) => {
          return {
            title: response.title,
            tagline: response.tagline,
            vote_average: response.vote_average,
            spoken_languages: response.spoken_languages,
            runtime: response.runtime,
            release_date: response.release_date,
            genres: response.genres,
            overview: response.overview,
            homepage: response.homepage,
            imdb_id: response.imdb_id,
            poster_path: response.poster_path,
          };
        }),
        catchError((error) => {
          console.error('Error fetching movie detail data:', error);
          throw error;
        })
      );
  }

  getMovieVideo(id: string): Observable<VideoApiResponse> {
    const headers = this.getHeaders();
    return this.http.get<VideoApiResponse>(`${this.baseurl}/movie/${id}/videos`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error fetching movie video data:', error);
          throw error;
        })
      );
  }

  getMovieGenres(): Observable<GenreResponse> {
    const headers = this.getHeaders();
    return this.http.get<GenreResponse>(`${this.baseurl}/genre/movie/list`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error fetching movie genres:', error);
          throw error;
        })
      );
  }
}
