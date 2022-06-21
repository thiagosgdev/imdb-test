import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Movie } from '../../../../shared/entities/movie.entity';
import { ListMoviesQueryParamsDTO } from '../../dto/listMoviesQueryParams.dto';
import { MovieDTO } from '../../dto/movie.dto';

@Injectable()
export class ListMoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async execute(data: ListMoviesQueryParamsDTO): Promise<MovieDTO[]> {
    const query = await this.movieRepository
      .createQueryBuilder('movies')
      .select();

    if (data.name)
      query.where('name LIKE :name', { name: '%' + data.name + '%' });
    if (data.genre) query.andWhere('genre = :genre', { genre: data.genre });
    if (data.director)
      query.andWhere('director LIKE :director', { director: data.director });

    const movies = query.getMany();

    if (!movies) throw new NotFoundException('No movie found!');

    return movies;
  }
}
