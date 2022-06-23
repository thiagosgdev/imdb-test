import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Vote } from '../../shared/entities/vote.entity';
import { CreateVoteController } from './context/createVote/createVote.controller';
import { CreateVoteService } from './context/createVote/createVote.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vote])],
  providers: [CreateVoteService],
  controllers: [CreateVoteController],
  exports: [TypeOrmModule],
})
export class VoteModule {}
