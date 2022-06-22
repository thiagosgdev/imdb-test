import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Actor } from '../../../../shared/entities/actor.entity';
import { ActorDTO } from '../../dto/actor.dto';

@Injectable()
export class ListActorsService {
  constructor(
    @InjectRepository(Actor)
    private actorRepository: Repository<Actor>,
  ) {}

  async execute(): Promise<ActorDTO[]> {
    return await this.actorRepository.find();
  }
}
