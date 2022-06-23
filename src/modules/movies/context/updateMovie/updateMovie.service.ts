import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Movie } from '../../../../shared/entities/movie.entity';
import { MovieDTO } from '../../dto/movie.dto';
import { UpdateMovieParamsDTO } from '../../dto/updateMovieParams.dto';

@Injectable()
export class UpdateMovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async execute(
    userRole: string,
    movieId: string,
    data: UpdateMovieParamsDTO,
  ): Promise<MovieDTO> {
    if (userRole !== 'admin')
      throw new UnauthorizedException('Only admins can update a movie!');

    const movieExists = await this.movieRepository.findOne({
      where: { id: movieId },
    });

    if (!movieExists) throw new NotFoundException('Movie Not Found!');

    const movie = {
      movieExists,
      ...data,
    };

    return await this.movieRepository.save(movie);
  }
}
