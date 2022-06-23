import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  mockMovie,
  mockUpdatedMovie,
} from '../../../../shared/tests/movie.mock';
import { DeleteMovieService } from './deleteMovie.service';
import { Movie } from '../../../../shared/entities/movie.entity';

const mockMovieRepository = {
  findOne: () => {
    return Promise.resolve(mockMovie);
  },
  save: () => {
    return Promise.resolve(mockUpdatedMovie);
  },
};

describe('Delete Movie Service', () => {
  let service: DeleteMovieService;

  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteMovieService,
        {
          provide: getRepositoryToken(Movie),
          useValue: mockMovieRepository,
        },
      ],
    }).compile();

    service = module.get<DeleteMovieService>(DeleteMovieService);
  });

  it('Should be defined!', () => {
    expect(service).toBeDefined();
  });

  it('Should return a UnauthorizedException if the user is not an admin', async () => {
    const response = service.execute('user', 'movie_id');
    await expect(response).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('Should return a NotFoundException if the movie is not found', async () => {
    jest.spyOn(mockMovieRepository, 'findOne').mockResolvedValueOnce(null);
    const response = service.execute('admin', 'movie_id');
    await expect(response).rejects.toBeInstanceOf(NotFoundException);
  });
});
