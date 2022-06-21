import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import jwtConfig from '../../configs/jwt';
import { JwtStrategy } from '../../shared/providers/EncryptProvider/jwt.strategy';
import { Movie } from '../../shared/entities/movie.entity';
import { CreateMovieController } from './context/createMovie/createMovie.controller';
import { CreateMovieService } from './context/createMovie/createMovie.service';
import { UpdateMovieService } from './context/updateMovie/updateMovie.service';
import { DeleteMovieService } from './context/deleteMovie/deleteMovie.service';
import { UpdateMovieController } from './context/updateMovie/updateMovie.controller';
import { DeleteMovieController } from './context/deleteMovie/deleteMovie.controller';
import { ListMoviesService } from './context/listMovies/listMovies.service';
import { ListMoviesController } from './context/listMovies/listMovies.controller';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig()),
    TypeOrmModule.forFeature([Movie]),
    PassportModule,
  ],
  providers: [
    JwtStrategy,
    CreateMovieService,
    UpdateMovieService,
    DeleteMovieService,
    ListMoviesService,
  ],
  controllers: [
    CreateMovieController,
    UpdateMovieController,
    DeleteMovieController,
    ListMoviesController,
  ],
  exports: [TypeOrmModule],
})
export class MovieModule {}
