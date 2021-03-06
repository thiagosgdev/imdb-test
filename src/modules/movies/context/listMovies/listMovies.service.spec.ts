import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  mockListMoviesQueryParamsDTO,
  mockMoviesList,
} from '../../../../shared/tests/movie.mock';
import { ListMoviesService } from './listMovies.service';
import { MovieRepo } from '../../repositories/movie.repository';

const mockMovieRepository = {
  listMovies: () => {
    return Promise.resolve(mockMoviesList);
  },
};

describe('List Movies Service', () => {
  let service: ListMoviesService;

  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListMoviesService,
        {
          provide: MovieRepo,
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

    service = module.get<ListMoviesService>(ListMoviesService);
  });

  it('Should be defined!', () => {
    expect(service).toBeDefined();
  });
  it('Should return the list of movies found on listMovies() success', async () => {
    const response = await service.execute(mockListMoviesQueryParamsDTO);
    expect(response.length).toBeGreaterThan(1);
  });

  it('Should return a NotFoundException if no movie is found', async () => {
    jest.spyOn(mockMovieRepository, 'listMovies').mockResolvedValueOnce(null);
    const response = service.execute(mockListMoviesQueryParamsDTO);
    await expect(response).rejects.toBeInstanceOf(NotFoundException);
  });
});
