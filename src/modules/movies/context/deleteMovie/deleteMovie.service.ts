import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Movie } from '../../../../shared/entities/movie.entity';

@Injectable()
export class DeleteMovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async execute(userRole: string, movieId: string): Promise<void> {
    if (userRole !== 'admin')
      throw new UnauthorizedException('Only admins can delete a movie!');

    const movieExists = await this.movieRepository.findOne({
      where: { id: movieId },
    });

    if (!movieExists) throw new NotFoundException('Movie Not Found!');

    await this.movieRepository.softDelete(movieId);
  }
}
