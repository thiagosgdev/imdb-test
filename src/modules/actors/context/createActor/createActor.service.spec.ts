import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';
import { UnauthorizedException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CreateActorService } from './createActor.service';
import {
  mockActor,
  mockCreateActorParamsDTO,
} from '../../../../shared/tests/actor.mock';
import { Actor } from '../../../../shared/entities/actor.entity';

const mockActorRepository = {
  save: () => {
    return Promise.resolve(mockActor);
  },
};

describe('Create Actor Service', () => {
  let service: CreateActorService;

  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateActorService,
        {
          provide: getRepositoryToken(Actor),
          useValue: mockActorRepository,
        },
      ],
    }).compile();

    service = module.get<CreateActorService>(CreateActorService);
  });

  it('Should be defined!', () => {
    expect(service).toBeDefined();
  });
  it('Should return the actor created on save() success', async () => {
    const response = await service.execute('admin', mockCreateActorParamsDTO);
    expect(response).toHaveProperty('id');
  });

  it('Should return a UnauthorizedException if the user is not an admin', async () => {
    const response = service.execute('user', mockCreateActorParamsDTO);
    await expect(response).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
