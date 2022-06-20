import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import jwtConfig from '../../configs/jwt';
import { JwtStrategy } from '../../shared/providers/EncryptProvider/jwt.strategy';
import { Movie } from '../../shared/entities/movie.entity';
import { CreateMovieController } from './context/createMovie/createMovie.controller';
import { CreateMovieService } from './context/createMovie/createMovie.service';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig()),
    TypeOrmModule.forFeature([Movie]),
    PassportModule,
  ],
  providers: [JwtStrategy, CreateMovieService],
  controllers: [CreateMovieController],
  exports: [TypeOrmModule],
})
export class MovieModule {}
