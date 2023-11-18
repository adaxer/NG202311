import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { ResultPage } from '../models/result-page';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  static token: string = "";

  constructor(private client: HttpClient) { }

  getMovies(pageSize: number, page: number): Observable<ResultPage<Movie>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${MovieService.token}`,
      'Content-Type': 'application/json'
    });
    return this.client.get<ResultPage<Movie>>(`https://localhost:7027/Movie/List/${pageSize}/${page}`, { headers });
  }

  getMovie(id: number): Observable<Movie> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${MovieService.token}`,
      'Content-Type': 'application/json'
    });
    return this.client.get<Movie>(`https://localhost:7027/Movie/${id}`, { headers });
  }

  register() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email: 'test@test.de', password: 'Pa$$w0rd' };
    return this.client.post('https://localhost:7027/register', body, { headers, observe: 'response' })
      .pipe(
        map(response => response.status === 200),
        catchError((error: HttpErrorResponse) => {
          return of(false);
        })
      );
  }

  login() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email: 'test@test.de', password: 'Pa$$w0rd' };

    return this.client.post<{ accessToken: string }>('https://localhost:7027/login?useCookies=false', body, { headers, observe: 'response' })
      .pipe(
        map(response => {
          if (response.status === 200) {
            MovieService.token = response.body!.accessToken;
            return true;
          }
          return false;
        }),
        catchError((error: HttpErrorResponse) => {
          // Handle error logic here if needed
          return of({ success: false });
        })
      );
  }
}
