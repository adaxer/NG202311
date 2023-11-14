import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {

  constructor(private client: HttpClient){}

  getMovies(): Observable<Movie[]> {
    return this.client.get<Movie[]>("https://localhost:7027/Movie/List/10/2");
  }
}
