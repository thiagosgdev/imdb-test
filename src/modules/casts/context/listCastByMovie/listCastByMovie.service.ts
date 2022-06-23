import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cast } from '../../../../shared/entities/cast.entity';
import { CastDTO } from '../../dto/cast.dto';

@Injectable()
export class ListCastByMovieService {
  constructor(
    @InjectRepository(Cast)
    private castRepository: Repository<Cast>,
  ) {}

  async execute(movieId: string): Promise<CastDTO[]> {
    return await this.castRepository.find({ where: { movieId } });
  }
}
