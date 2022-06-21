import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Vote } from '../../../../shared/entities/vote.entity';
import { CreateVoteParamsDTO } from '../../dto/createVoteParams.dto';
import { VoteDTO } from '../../dto/vote.dto';

@Injectable()
export class CreateVoteService {
  constructor(
    @InjectRepository(Vote)
    private voteeRepository: Repository<Vote>,
  ) {}

  async execute(userId: string, data: CreateVoteParamsDTO): Promise<VoteDTO> {
    const voteExists = await this.voteeRepository.findOne({
      where: {
        userId,
        movieId: data.movieId,
      },
    });

    if (voteExists)
      throw new ConflictException('User already voted for this movie!');

    return await this.voteeRepository.save({
      userId,
      ...data,
    });
  }
}
