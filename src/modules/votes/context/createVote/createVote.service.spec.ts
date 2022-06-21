import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Vote } from '../../../../shared/entities/vote.entity';
import {
  mockCreateVoteParamsDTO,
  mockVote,
} from '../../../../shared/tests/vote.mock';
import { CreateVoteService } from './createVote.service';
import { ConflictException } from '@nestjs/common';

const mockVoteRepository = {
  findOne: () => {
    return Promise.resolve(null);
  },
  save: () => {
    return Promise.resolve(mockVote);
  },
};

describe('Create Vote Service', () => {
  let service: CreateVoteService;

  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateVoteService,
        {
          provide: getRepositoryToken(Vote),
          useValue: mockVoteRepository,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => {
              null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<CreateVoteService>(CreateVoteService);
  });

  it('Should be defined!', () => {
    expect(service).toBeDefined();
  });

  it('Should return the vote created on save() success', async () => {
    const response = await service.execute(
      'any_user_id',
      mockCreateVoteParamsDTO,
    );
    expect(response).toHaveProperty('id');
  });

  it('Should throw a ConflictException if the user already voted for the movie', async () => {
    jest.spyOn(mockVoteRepository, 'findOne').mockResolvedValueOnce(mockVote);
    const response = service.execute('any_user_id', mockCreateVoteParamsDTO);
    await expect(response).rejects.toBeInstanceOf(ConflictException);
  });
});
