import { CastDTO } from '../../modules/casts/dto/cast.dto';
import { CreateCastParamsDTO } from '../../modules/casts/dto/createCastParams.dto';

export const mockCast: CastDTO = {
  id: 'any_cast_id',
  actorId: 'any_actor_id',
  movieId: 'any_movie_id',
  role: 'any_role',
  createdAt: new Date(),
  updatedAt: null,
  deletedAt: null,
};

export const mockCastList: CastDTO[] = [
  {
    id: 'any_cast_id',
    actorId: 'any_actor_id',
    movieId: 'any_movie_id',
    role: 'any_role',
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  },
  {
    id: 'another_cast_id',
    actorId: 'another_actor_id',
    movieId: 'any_movie_id',
    role: 'another_role',
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  },
];

export const mockCreateCastParamsDTO: CreateCastParamsDTO = {
  actorId: 'any_actor_id',
  movieId: 'any_movie_id',
  role: 'any_role',
};
