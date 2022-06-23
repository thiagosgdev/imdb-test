import { HttpException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';

import {
  mockCreateMovieParamsDTO,
  mockMovie,
  mockUpdatedMovie,
  mockUpdateMovieParams,
} from '../../../../shared/tests/movie.mock';
import { mockRequest } from '../../../../shared/tests/request.mock';
import { UpdateMovieController } from './updateMovie.controller';
import { UpdateMovieService } from './updateMovie.service';

const mockUpdateMovieService = {
  execute: jest.fn((dto) => {
    return mockUpdatedMovie;
  }),
};

describe('Update Movie Controller', () => {
  let controller: UpdateMovieController;
  let service: UpdateMovieService;
  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateMovieController],
      providers: [UpdateMovieService],
    })
      .overrideProvider(UpdateMovieService)
      .useValue(mockUpdateMovieService)
      .compile();

    controller = module.get<UpdateMovieController>(UpdateMovieController);
    service = module.get<UpdateMovieService>(UpdateMovieService);
  });

  it('Should call Update Movie Service with the correct values', async () => {
    const executeSpy = jest.spyOn(service, 'execute');
    await controller.handle(mockRequest, 'movie_id', mockUpdateMovieParams);
    expect(executeSpy).toHaveBeenCalledWith(
      'admin',
      'movie_id',
      mockUpdateMovieParams,
    );
  });

  it('Should return the movie on Update Movie Service success', async () => {
    const response = await controller.handle(
      mockRequest,
      'movie_id',
      mockUpdateMovieParams,
    );
    expect(response).toEqual(mockUpdatedMovie);
  });

  it('Should throw if Update Movie Service throws', async () => {
    jest
      .spyOn(service, 'execute')
      .mockReturnValueOnce(Promise.reject(new UnauthorizedException()));
    const error = controller.handle(
      mockRequest,
      'movie_id',
      mockCreateMovieParamsDTO,
    );
    await expect(error).rejects.toBeInstanceOf(HttpException);
  });
});
