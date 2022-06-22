import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';
import { UnauthorizedException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CreateCastService } from './createCast.service';
import { Cast } from '../../../../shared/entities/cast.entity';
import {
  mockCast,
  mockCreateCastParamsDTO,
} from '../../../../shared/tests/cast.mock';

const mockCastRepository = {
  save: () => {
    return Promise.resolve(mockCast);
  },
};

describe('Create Cast Service', () => {
  let service: CreateCastService;

  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCastService,
        {
          provide: getRepositoryToken(Cast),
          useValue: mockCastRepository,
        },
      ],
    }).compile();

    service = module.get<CreateCastService>(CreateCastService);
  });

  it('Should be defined!', () => {
    expect(service).toBeDefined();
  });
  it('Should return the cast created on save() success', async () => {
    const response = await service.execute('admin', mockCreateCastParamsDTO);
    expect(response).toHaveProperty('id');
  });

  it('Should return a UnauthorizedException if the user is not an admin', async () => {
    const response = service.execute('user', mockCreateCastParamsDTO);
    await expect(response).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
