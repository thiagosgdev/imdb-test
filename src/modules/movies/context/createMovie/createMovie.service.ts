import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Movie } from '../../../../shared/entities/movie.entity';
import { CreateMovieParamsDTO } from '../../dto/createMovieParams.dto';
import { MovieDTO } from '../../dto/movie.dto';

@Injectable()
export class CreateMovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async execute(
    userRole: string,
    data: CreateMovieParamsDTO,
  ): Promise<MovieDTO> {
    if (userRole !== 'admin')
      throw new UnauthorizedException('Only admins can add a new movie!');

    return await this.movieRepository.save(data);
  }
}
