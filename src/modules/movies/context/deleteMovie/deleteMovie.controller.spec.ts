import { HttpException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';

import { mockRequest } from '../../../../shared/tests/request.mock';
import { DeleteMovieController } from './deleteMovie.controller';
import { DeleteMovieService } from './deleteMovie.service';

const mockDeleteMovieService = {
  execute: jest.fn(),
};

describe('Create Movie Controller', () => {
  let controller: DeleteMovieController;
  let service: DeleteMovieService;
  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteMovieController],
      providers: [DeleteMovieService],
    })
      .overrideProvider(DeleteMovieService)
      .useValue(mockDeleteMovieService)
      .compile();

    controller = module.get<DeleteMovieController>(DeleteMovieController);
    service = module.get<DeleteMovieService>(DeleteMovieService);
  });

  it('Should call Delete Movie Service with the correct values', async () => {
    const executeSpy = jest.spyOn(service, 'execute');
    await controller.handle(mockRequest, 'any_id');
    expect(executeSpy).toHaveBeenCalledWith('admin', 'any_id');
  });

  it('Should throw if Delete Movie Service throws', async () => {
    jest
      .spyOn(service, 'execute')
      .mockReturnValueOnce(Promise.reject(new UnauthorizedException()));
    const error = controller.handle(mockRequest, 'any_id');
    await expect(error).rejects.toBeInstanceOf(HttpException);
  });
});
