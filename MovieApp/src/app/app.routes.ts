import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { MovieListComponent } from './movies/movie-list.component';
import { deactivateDirtyGuard } from './guards/deactivate-dirty.guard';
import { MovieDetailsComponent } from './movies/movie-details.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent, canDeactivate: [deactivateDirtyGuard] },
  { path: 'welcome', component: WelcomeComponent, canDeactivate: [deactivateDirtyGuard] },
  { path: 'movies', component: MovieListComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: '**', redirectTo:"welcome" },
];
