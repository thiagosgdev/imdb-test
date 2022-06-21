import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Movie } from '../../../../shared/entities/movie.entity';
import { ListMoviesQueryParamsDTO } from '../../dto/listMoviesQueryParams.dto';
import { MovieDTO } from '../../dto/movie.dto';
import { MovieRepo } from '../../repositories/movie.repository';

@Injectable()
export class ListMoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: MovieRepo,
  ) {}

  async execute(data: ListMoviesQueryParamsDTO): Promise<MovieDTO[]> {
    const movies = await this.movieRepository.listMovies(data);

    if (!movies) throw new NotFoundException('No movie found!');

    return movies;
  }
}
