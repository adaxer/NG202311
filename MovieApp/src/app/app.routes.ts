import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { MovieListComponent } from './movies/movie-list.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'movies', component: MovieListComponent },
  { path: '**', redirectTo:"welcome" },
];
