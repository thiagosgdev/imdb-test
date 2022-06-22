import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Actor } from '../../shared/entities/actor.entity';
import { CreateActorController } from './context/createActor/createActor.controller';
import { ListActorsController } from './context/listActors/listActors.controller';
import { CreateActorService } from './context/createActor/createActor.service';
import { ListActorsService } from './context/listActors/listActors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Actor])],
  providers: [CreateActorService, ListActorsService],
  controllers: [CreateActorController, ListActorsController],
  exports: [TypeOrmModule],
})
export class ActorModule {}
