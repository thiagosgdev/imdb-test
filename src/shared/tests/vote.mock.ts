import { CreateVoteParamsDTO } from '../../modules/votes/dto/createVoteParams.dto';
import { VoteDTO } from '../../modules/votes/dto/vote.dto';

export const mockVote: VoteDTO = {
  id: 'any_id',
  userId: 'any_user_id',
  movieId: 'any_movie_id',
  score: 4,
  createdAt: new Date(),
  updatedAt: null,
  deletedAt: null,
};

export const mockCreateVoteParamsDTO: CreateVoteParamsDTO = {
  movieId: 'any_movie_id',
  score: 4,
};
