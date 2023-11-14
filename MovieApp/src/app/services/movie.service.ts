import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }

  getMovies(): Movie[] {
    return [
      {
        id: 1,
        title: 'Blade Runner',
        director: 'Ridley Scott',
        releaseDate: 'June 25, 1982',
        description:
          'A futuristic neo-noir film about a detective hunting down rogue artificial humans.',
      },
      {
        id: 2,
        title: 'The Matrix',
        director: 'The Wachowskis',
        releaseDate: 'March 31, 1999',
        description:
          'A mind-bending story of a computer hacker who discovers the truth about reality.',
      },
      {
        id: 3,
        title: 'Inception',
        director: 'Christopher Nolan',
        releaseDate: 'July 16, 2010',
        description:
          'A heist within a dream within a dream, exploring the depths of the human mind.',
      },
      {
        id: 4,
        title: '2001: A Space Odyssey',
        director: 'Stanley Kubrick',
        releaseDate: 'April 3, 1968',
        description:
          'A visionary journey through space and time, accompanied by HAL 9000.',
      },
      {
        id: 5,
        title: 'Star Wars: Episode IV - A New Hope',
        director: 'George Lucas',
        releaseDate: 'May 25, 1977',
        description:
          'The epic space opera that introduced us to Luke Skywalker and Darth Vader.',
      },
      {
        id: 6,
        title: 'The Terminator',
        director: 'James Cameron',
        releaseDate: 'October 26, 1984',
        description:
          "A battle against killer robots from the future in a fight for humanity's survival.",
      },
      {
        id: 7,
        title: 'Alien',
        director: 'Ridley Scott',
        releaseDate: 'May 25, 1979',
        description:
          'A terrifying encounter with a deadly extraterrestrial creature on a spaceship.',
      },
      {
        id: 8,
        title: 'E.T. the Extra-Terrestrial',
        director: 'Steven Spielberg',
        releaseDate: 'June 11, 1982',
        description:
          'A heartwarming tale of friendship between a young boy and a stranded alien.',
      },
      {
        id: 9,
        title: 'Interstellar',
        director: 'Christopher Nolan',
        releaseDate: 'November 5, 2014',
        description:
          'A journey through a wormhole in search of a new habitable planet for humanity.',
      },
      {
        id: 10,
        title: 'Avatar',
        director: 'James Cameron',
        releaseDate: 'December 18, 2009',
        description:
          "Exploration of the alien world of Pandora and the conflict between humans and Na'vi.",
      },
    ];;
  }
}
