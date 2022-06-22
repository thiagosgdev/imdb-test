import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cast } from '../../shared/entities/cast.entity';
import { CreateCastController } from './context/createCast/createCast.controller';
import { CreateCastService } from './context/createCast/createCast.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cast])],
  providers: [CreateCastService],
  controllers: [CreateCastController],
  exports: [TypeOrmModule],
})
export class CastModule {}
