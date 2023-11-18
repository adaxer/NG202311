import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';
import { RouterModule } from '@angular/router';
import { SignalRService } from '../services/signal-r.service';
import { ResultPage } from '../models/result-page';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, NgFor, RouterModule],
  templateUrl: './movie-list.component.html',
  styles: ``
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  pages: number[] = [...Array(5).keys()].map(i => i + 1);
  pageSize = 10;
  pagesShown = 5;
  currentPage = 1;
  resultPage?: ResultPage<Movie>;
  totalPages: number = 1;
  token: string = "";
  constructor(private movieService: MovieService, private signalR: SignalRService) {
  }

  ngOnInit(): void {
    this.loadPage(1);
    this.signalR.moviesChanged.subscribe(() => this.loadPage(this.currentPage));
  }

  fillArray(startingNumber: number, count: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < count; i++) {
      result.push(startingNumber + i);
    }
    return result;
  }

  loadPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.movieService.getMovies(this.pageSize, page - 1).subscribe(result => {
      this.resultPage = result;
      this.totalPages = Math.floor((result.totalCount / this.pageSize) + 1);
      this.movies = result.data;
      if (this.pages.includes(page)) {
        return;
      }
      let pageCnt = Math.min(this.totalPages, this.pagesShown)
      let firstPage = page < this.pages[0] ? page : page - pageCnt + 1;
      this.pages = this.fillArray(firstPage, pageCnt)
    });
  }

  register() {
    this.movieService.register().subscribe(r => console.log("Register succeeded: ", r));
  }

  login() {
    this.movieService.login().subscribe(r => {
      console.log("Login succeeded: ", r);
      this.loadPage(1);
    });
  }
}
