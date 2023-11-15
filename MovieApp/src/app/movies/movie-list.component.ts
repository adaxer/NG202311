import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, NgFor, RouterModule],
  templateUrl: './movie-list.component.html',
  styles: ``
})
export class MovieListComponent implements OnInit {
  movies:  Movie[]=[];
  constructor(private movieService: MovieService){
  }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(movies => this.movies = movies);
  }
}
