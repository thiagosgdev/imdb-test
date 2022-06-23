import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cast } from '../../shared/entities/cast.entity';
import { CreateCastController } from './context/createCast/createCast.controller';
import { CreateCastService } from './context/createCast/createCast.service';
import { ListCastByMovieController } from './context/listCastByMovie/listCastByMovie.controller';
import { ListCastByMovieService } from './context/listCastByMovie/listCastByMovie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cast])],
  providers: [CreateCastService, ListCastByMovieService],
  controllers: [CreateCastController, ListCastByMovieController],
  exports: [TypeOrmModule],
})
export class CastModule {}
