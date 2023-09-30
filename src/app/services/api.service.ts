import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  Genre,
  ResponseMovies,
  MovieDetail,
  ResponseVideo,
  ResponseRecomendation,
} from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  BASE_URL = 'https://api.themoviedb.org/3';
  API_KEY = 'b43deaed78e985d5accce58cb0261a6e';

  constructor(private http: HttpClient) {}

  bannerApiData(): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/trending/all/week?api_key=${this.API_KEY}`
    );
  }

  getMovies(): Observable<ResponseMovies> {
    return this.http
      .get<ResponseMovies>(
        `${this.BASE_URL}/movie/popular?api_key=${this.API_KEY}&language=en-US&page=1`
      )
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(
      () => new Error(error.message || 'Server error')
    );
  }
  getTopMovies(): Observable<ResponseMovies> {
    return this.http
      .get<ResponseMovies>(
        `${this.BASE_URL}/movie/top_rated?api_key=${this.API_KEY}&language=en-US&page=1`
      )
      .pipe(catchError(this.errorHandler));
  }

  searchMovies(e: string): Observable<ResponseMovies> {
    return this.http
      .get<ResponseMovies>(
        `${this.BASE_URL}/search/movie?api_key=${this.API_KEY}&language=en-US&query=${e}&page=1&include_adult=false`
      )
      .pipe(catchError(this.errorHandler));
  }

  getMovieDetail(id: number): Observable<MovieDetail> {
    return this.http
      .get<MovieDetail>(
        `${this.BASE_URL}/movie/${id}?api_key=${this.API_KEY}&language=en-US`
      )
      .pipe(catchError(this.errorHandler));
  }

  getMovieRecomendation(id: number): Observable<ResponseRecomendation> {
    return this.http
      .get<ResponseRecomendation>(
        `${this.BASE_URL}/movie/${id}/recommendations?api_key=${this.API_KEY}&language=en-US&page=1`
      )
      .pipe(catchError(this.errorHandler));
  }

  getMovieTrailer(id: number): Observable<ResponseVideo> {
    return this.http
      .get<ResponseVideo>(
        `${this.BASE_URL}/3/movie/${id}/videos?api_key=${this.API_KEY}&language=en-US`
      )
      .pipe(catchError(this.errorHandler));
  }
}
