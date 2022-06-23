import { HttpException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';

import {
  mockListMoviesQueryParamsDTO,
  mockMoviesList,
} from '../../../../shared/tests/movie.mock';
import { ListMoviesController } from './listMovies.controller';
import { ListMoviesService } from './listMovies.service';

const mockListMoviesService = {
  execute: jest.fn((dto) => {
    return mockMoviesList;
  }),
};

describe('List Movies Controller', () => {
  let controller: ListMoviesController;
  let service: ListMoviesService;
  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListMoviesController],
      providers: [ListMoviesService],
    })
      .overrideProvider(ListMoviesService)
      .useValue(mockListMoviesService)
      .compile();

    controller = module.get<ListMoviesController>(ListMoviesController);
    service = module.get<ListMoviesService>(ListMoviesService);
  });

  it('Should call List Movies Service with the correct values', async () => {
    const executeSpy = jest.spyOn(service, 'execute');
    await controller.handle(mockListMoviesQueryParamsDTO);
    expect(executeSpy).toHaveBeenCalledWith(mockListMoviesQueryParamsDTO);
  });

  it('Should return the list of movies on List Movies Service success', async () => {
    const response = await controller.handle(mockListMoviesQueryParamsDTO);
    expect(response).toEqual(mockMoviesList);
  });

  it('Should throw if List Movies Service throws', async () => {
    jest
      .spyOn(service, 'execute')
      .mockReturnValueOnce(Promise.reject(new NotFoundException()));
    const error = controller.handle(mockListMoviesQueryParamsDTO);
    await expect(error).rejects.toBeInstanceOf(HttpException);
  });
});
