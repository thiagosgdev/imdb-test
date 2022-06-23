import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Actor } from '../../../../shared/entities/actor.entity';
import { ActorDTO } from '../../dto/actor.dto';
import { CreateActorParamsDTO } from '../../dto/createActorParams.dto';

@Injectable()
export class CreateActorService {
  constructor(
    @InjectRepository(Actor)
    private actorRepository: Repository<Actor>,
  ) {}

  async execute(
    userRole: string,
    data: CreateActorParamsDTO,
  ): Promise<ActorDTO> {
    if (userRole !== 'admin')
      throw new UnauthorizedException('Only admins can add a new actor!');

    return await this.actorRepository.save(data);
  }
}
