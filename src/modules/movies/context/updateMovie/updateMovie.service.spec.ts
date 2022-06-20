import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  mockMovie,
  mockUpdatedMovie,
  mockUpdateMovieParams,
} from '../../../../shared/tests/movie.mock';
import { UpdateMovieService } from './updateMovie.service';
import { Movie } from '../../../../shared/entities/movie.entity';

const mockMovieRepository = {
  findOne: () => {
    return Promise.resolve(mockMovie);
  },
  save: () => {
    return Promise.resolve(mockUpdatedMovie);
  },
};

describe('Update Movie Service', () => {
  let service: UpdateMovieService;

  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateMovieService,
        {
          provide: getRepositoryToken(Movie),
          useValue: mockMovieRepository,
        },
      ],
    }).compile();

    service = module.get<UpdateMovieService>(UpdateMovieService);
  });

  it('Should be defined!', () => {
    expect(service).toBeDefined();
  });
  it('Should return the movie updated on save() success', async () => {
    const response = await service.execute(
      'admin',
      'any_id',
      mockUpdateMovieParams,
    );
    expect(response).toEqual(mockUpdatedMovie);
  });

  it('Should return a UnauthorizedException if the user is not an admin', async () => {
    const response = service.execute('user', 'any_id', mockUpdateMovieParams);
    await expect(response).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('Should return a NotFoundException if the user is not an admin', async () => {
    jest.spyOn(mockMovieRepository, 'findOne').mockResolvedValueOnce(null);
    const response = service.execute('admin', 'any_id', mockUpdateMovieParams);
    await expect(response).rejects.toBeInstanceOf(NotFoundException);
  });
});
