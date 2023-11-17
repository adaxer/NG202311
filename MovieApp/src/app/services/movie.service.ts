import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultPage } from '../models/result-page';

@Injectable({
  providedIn: 'root',
})
export class MovieService {

  constructor(private client: HttpClient){}

  getMovies(pageSize: number, page: number): Observable<ResultPage<Movie>> {
    return this.client.get<ResultPage<Movie>>(`https://localhost:7027/Movie/List/${pageSize}/${page}`);
  }

  getMovie(id: number): Observable<Movie> {
    return this.client.get<Movie>(`https://localhost:7027/Movie/${id}`);
  }
}
