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
    const query = this.repository
      .createQueryBuilder('movies')
      .select()
      .addSelect('AVG(votes.score)', 'voteAverage')
      .leftJoinAndSelect('movies.votes', 'votes')
      .leftJoinAndSelect('movies.casts', 'casts')
      .leftJoin('casts.actors', 'actors')
      .loadRelationCountAndMap('movies.votesCount', 'movies.votes')
      .addGroupBy('movies.id')
      .addGroupBy('votes.id')
      .addGroupBy('casts.id');

    if (data.name)
      query.where('movies.name LIKE :name', { name: '%' + data.name + '%' });

    if (data.genre)
      query.andWhere('movies.genre = :genre', { genre: data.genre });

    if (data.director) {
      query.andWhere('movies.director LIKE :director', {
        director: '%' + data.director + '%',
      });
    }

    if (data.actor) {
      query.andWhere('actors.name LIKE :actor', {
        actor: '%' + data.actor + '%',
      });
    }
    return query.getMany();
  }
}
