import { Injectable, NotFoundException } from '@nestjs/common';

import { ListMoviesQueryParamsDTO } from '../../dto/listMoviesQueryParams.dto';
import { MovieDTO } from '../../dto/movie.dto';
import { MovieRepo } from '../../repositories/movie.repository';

@Injectable()
export class ListMoviesService {
  constructor(private movieRepository: MovieRepo) {}

  async execute(data: ListMoviesQueryParamsDTO): Promise<MovieDTO[]> {
    const movies = await this.movieRepository.listMovies(data);

    if (!movies) throw new NotFoundException('No movie found!');

    movies.forEach((movie, index) => {
      if (movie.votes) {
        let average = 0;
        movie.votes.forEach((vote) => {
          average += vote.score;
        });
        movies[index].voteAverage = average / movie.votes.length;
      }
    });

    return movies;
  }
}
