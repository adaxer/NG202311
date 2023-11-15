import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailsComponent } from './movie-details.component';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Movie } from '../models/movie';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MovieDetailComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let mockMovieService: jasmine.SpyObj<MovieService>;
  const mockMovie: Movie = {
    id: 1,
    title: 'Blade Runner',
    director: 'Ridley Scott',
    released: '1982-06-25'
  };

  beforeEach(() => {
    mockMovieService = jasmine.createSpyObj('MovieService', ['getMovie']);

    TestBed.configureTestingModule({
      declarations: [  ],
      imports: [ MovieDetailsComponent ],
      providers: [
        { provide: MovieService, useValue: mockMovieService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['id', '1']]))
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movie details using the ID from route parameters', () => {
    mockMovieService.getMovie.and.returnValue(of(mockMovie));

    fixture.detectChanges(); // trigger ngOnInit

    expect(mockMovieService.getMovie).toHaveBeenCalledWith(1);
    expect(component.movie).toEqual(mockMovie);
  });

  it('should display movie details in the template', () => {
    mockMovieService.getMovie.and.returnValue(of(mockMovie));

    fixture.detectChanges();

    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('h5').textContent).toContain(mockMovie.title);
    expect(compiled.querySelector('p').textContent).toContain(mockMovie.director);
  });

  // it('should fail', ()=> {
  //   const value = 1;
  //   expect(value).toEqual(2);
  // });
});
