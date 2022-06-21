import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Movie } from '../../../shared/entities/movie.entity';
import { ListMoviesQueryParamsDTO } from '../dto/listMoviesQueryParams.dto';
import { MovieDTO } from '../dto/movie.dto';

@Injectable()
export class MovieRepo {
  constructor(
    @InjectRepository(Movie)
    private readonly repository: Repository<Movie>,
  ) {}
  async listMovies(data: ListMoviesQueryParamsDTO): Promise<MovieDTO[]> {
    const query = this.repository.createQueryBuilder('movies').select();

    if (data.name)
      query.where('name LIKE :name', { name: '%' + data.name + '%' });
    if (data.genre) query.andWhere('genre = :genre', { genre: data.genre });
    if (data.director)
      query.andWhere('director LIKE :director', {
        director: '%' + data.director + '%',
      });

    return query.getMany();
  }
}
