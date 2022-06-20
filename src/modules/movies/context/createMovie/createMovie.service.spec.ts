import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import {
  mockCreateMovieParamsDTO,
  mockMovie,
} from '../../../../shared/tests/movie.mock';
import { CreateMovieService } from './createMovie.service';
import { Movie } from '../../../../shared/entities/movie.entity';

const mockMovieRepository = {
  save: () => {
    return Promise.resolve(mockMovie);
  },
};

describe('Create Movie Service', () => {
  let service: CreateMovieService;

  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateMovieService,
        {
          provide: getRepositoryToken(Movie),
          useValue: mockMovieRepository,
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

    service = module.get<CreateMovieService>(CreateMovieService);
  });

  it('Should be defined!', () => {
    expect(service).toBeDefined();
  });
  it('Should return the movie created on save() success', async () => {
    const response = await service.execute('admin', mockCreateMovieParamsDTO);
    expect(response).toHaveProperty('id');
  });

  it('Should return a UnauthorizedException if the user is not an admin', async () => {
    const response = service.execute('user', mockCreateMovieParamsDTO);
    await expect(response).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
