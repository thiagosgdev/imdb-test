import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';
import { getRepositoryToken } from '@nestjs/typeorm';

import { mockActorsList } from '../../../../shared/tests/actor.mock';
import { Actor } from '../../../../shared/entities/actor.entity';
import { ListActorsService } from './listActors.service';

const mockActorRepository = {
  find: () => {
    return Promise.resolve(mockActorsList);
  },
};

describe('List Actors Service', () => {
  let service: ListActorsService;

  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListActorsService,
        {
          provide: getRepositoryToken(Actor),
          useValue: mockActorRepository,
        },
      ],
    }).compile();

    service = module.get<ListActorsService>(ListActorsService);
  });

  it('Should be defined!', () => {
    expect(service).toBeDefined();
  });
  it('Should return the list of actors found on find() success', async () => {
    const response = await service.execute();
    expect(response.length).toBeGreaterThan(1);
  });
});
