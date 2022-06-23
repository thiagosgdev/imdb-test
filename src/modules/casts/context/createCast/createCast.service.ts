import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cast } from '../../../../shared/entities/cast.entity';
import { CreateCastParamsDTO } from '../../dto/createCastParams.dto';
import { CastDTO } from '../../dto/cast.dto';

@Injectable()
export class CreateCastService {
  constructor(
    @InjectRepository(Cast)
    private castRepository: Repository<Cast>,
  ) {}

  async execute(userRole: string, data: CreateCastParamsDTO): Promise<CastDTO> {
    if (userRole !== 'admin')
      throw new UnauthorizedException('Only admins can add a new actor!');

    return await this.castRepository.save(data);
  }
}
