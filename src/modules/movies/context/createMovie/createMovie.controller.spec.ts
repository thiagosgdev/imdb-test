import { HttpException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';

import {
  mockCreateMovieParamsDTO,
  mockMovie,
} from '../../../../shared/tests/movie.mock';
import { mockRequest } from '../../../../shared/tests/request.mock';
import { CreateMovieController } from './createMovie.controller';
import { CreateMovieService } from './createMovie.service';

const mockCreateMovieService = {
  execute: jest.fn((dto) => {
    return mockMovie;
  }),
};

describe('Create Movie Controller', () => {
  let controller: CreateMovieController;
  let service: CreateMovieService;
  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateMovieController],
      providers: [CreateMovieService],
    })
      .overrideProvider(CreateMovieService)
      .useValue(mockCreateMovieService)
      .compile();

    controller = module.get<CreateMovieController>(CreateMovieController);
    service = module.get<CreateMovieService>(CreateMovieService);
  });

  it('Should call Create Movie Service with the correct values', async () => {
    const executeSpy = jest.spyOn(service, 'execute');
    await controller.handle(mockRequest, mockCreateMovieParamsDTO);
    expect(executeSpy).toHaveBeenCalledWith('admin', mockCreateMovieParamsDTO);
  });

  it('Should return the movie on Create Movie Service success', async () => {
    const response = await controller.handle(
      mockRequest,
      mockCreateMovieParamsDTO,
    );
    expect(response).toEqual(mockMovie);
  });

  it('Should throw if Create Movie Service throws', async () => {
    jest
      .spyOn(service, 'execute')
      .mockReturnValueOnce(Promise.reject(new UnauthorizedException()));
    const error = controller.handle(mockRequest, mockCreateMovieParamsDTO);
    await expect(error).rejects.toBeInstanceOf(HttpException);
  });
});
