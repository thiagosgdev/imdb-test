import { ActorDTO } from 'src/modules/actors/dto/actor.dto';
import { CreateActorParamsDTO } from 'src/modules/actors/dto/createActorParams.dto';

export const mockActor: ActorDTO = {
  id: 'any_id',
  name: 'any_name',
  resume: 'any_description',
  createdAt: new Date(),
  updatedAt: null,
  deletedAt: null,
};

export const mockActorsList: ActorDTO[] = [
  {
    id: 'any_id',
    name: 'any_name',
    resume: 'any_resume',
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  },
  {
    id: 'another_id',
    name: 'another_name',
    resume: 'another_resume',
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null,
  },
];

export const mockCreateActorParamsDTO: CreateActorParamsDTO = {
  name: 'any_name',
  resume: 'any_description',
};
