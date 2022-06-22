import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';

import { mockActorsList } from '../../../../shared/tests/actor.mock';
import { ListActorsController } from './listActors.controller';
import { ListActorsService } from './listActors.service';

const mockListActorsService = {
  execute: jest.fn((dto) => {
    return mockActorsList;
  }),
};

describe('List Actors Controller', () => {
  let controller: ListActorsController;
  let service: ListActorsService;
  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListActorsController],
      providers: [ListActorsService],
    })
      .overrideProvider(ListActorsService)
      .useValue(mockListActorsService)
      .compile();

    controller = module.get<ListActorsController>(ListActorsController);
    service = module.get<ListActorsService>(ListActorsService);
  });

  it('Should return the list of actors on List Actors Service success', async () => {
    const response = await controller.handle();
    expect(response).toEqual(mockActorsList);
  });

  it('Should throw if List Actors Service throws', async () => {
    jest
      .spyOn(service, 'execute')
      .mockReturnValueOnce(Promise.reject(new InternalServerErrorException()));
    const error = controller.handle();
    await expect(error).rejects.toBeInstanceOf(HttpException);
  });
});
