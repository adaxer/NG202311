import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './movie-details.component.html',
  styles: ``
})
export class MovieDetailsComponent implements OnInit {
  movie?: Movie;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(pM => {
      let id: number = +pM.get("id")!;
      this.movieService.getMovie(id).subscribe(movie => {
        this.movie = movie;
        console.log(this.movie);
      });
    })
  }

}
