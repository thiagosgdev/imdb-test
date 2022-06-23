import { HttpException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';

import { mockCastList } from '../../../../shared/tests/cast.mock';
import { ListCastByMovieController } from './listCastByMovie.controller';
import { ListCastByMovieService } from './listCastByMovie.service';

const mockListCastByMovieService = {
  execute: jest.fn((dto) => {
    return mockCastList;
  }),
};

describe('List Cast by Movie Controller', () => {
  let controller: ListCastByMovieController;
  let service: ListCastByMovieService;
  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListCastByMovieController],
      providers: [ListCastByMovieService],
    })
      .overrideProvider(ListCastByMovieService)
      .useValue(mockListCastByMovieService)
      .compile();

    controller = module.get<ListCastByMovieController>(
      ListCastByMovieController,
    );
    service = module.get<ListCastByMovieService>(ListCastByMovieService);
  });

  it('Should call List Cast by Movie Service with the correct values', async () => {
    const executeSpy = jest.spyOn(service, 'execute');
    await controller.handle('any_movie_id');
    expect(executeSpy).toHaveBeenCalledWith('any_movie_id');
  });

  it('Should return the cast on List Cast by Movie Service success', async () => {
    const response = await controller.handle('any_movie_id');
    expect(response).toEqual(mockCastList);
  });

  it('Should throw if List Cast by Movie Service throws', async () => {
    jest
      .spyOn(service, 'execute')
      .mockReturnValueOnce(Promise.reject(new UnauthorizedException()));
    const error = controller.handle('any_movie_id');
    await expect(error).rejects.toBeInstanceOf(HttpException);
  });
});
