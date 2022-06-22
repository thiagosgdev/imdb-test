import { HttpException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';

import {
  mockActor,
  mockCreateActorParamsDTO,
} from '../../../../shared/tests/actor.mock';
import { mockRequest } from '../../../../shared/tests/request.mock';
import { CreateActorController } from './createActor.controller';
import { CreateActorService } from './createActor.service';

const mockCreateActorService = {
  execute: jest.fn((dto) => {
    return mockActor;
  }),
};

describe('Create Actor Controller', () => {
  let controller: CreateActorController;
  let service: CreateActorService;
  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateActorController],
      providers: [CreateActorService],
    })
      .overrideProvider(CreateActorService)
      .useValue(mockCreateActorService)
      .compile();

    controller = module.get<CreateActorController>(CreateActorController);
    service = module.get<CreateActorService>(CreateActorService);
  });

  it('Should call Create Actor Service with the correct values', async () => {
    const executeSpy = jest.spyOn(service, 'execute');
    await controller.handle(mockRequest, mockCreateActorParamsDTO);
    expect(executeSpy).toHaveBeenCalledWith('admin', mockCreateActorParamsDTO);
  });

  it('Should return the actor on Create Actor Service success', async () => {
    const response = await controller.handle(
      mockRequest,
      mockCreateActorParamsDTO,
    );
    expect(response).toEqual(mockActor);
  });

  it('Should throw if Create Actor Service throws', async () => {
    jest
      .spyOn(service, 'execute')
      .mockReturnValueOnce(Promise.reject(new UnauthorizedException()));
    const error = controller.handle(mockRequest, mockCreateActorParamsDTO);
    await expect(error).rejects.toBeInstanceOf(HttpException);
  });
});
