import { HttpException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';

import {
  mockCast,
  mockCreateCastParamsDTO,
} from '../../../../shared/tests/cast.mock';
import { mockRequest } from '../../../../shared/tests/request.mock';
import { CreateCastController } from './createCast.controller';
import { CreateCastService } from './createCast.service';

const mockCreateCastService = {
  execute: jest.fn((dto) => {
    return mockCast;
  }),
};

describe('Create Cast Controller', () => {
  let controller: CreateCastController;
  let service: CreateCastService;
  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateCastController],
      providers: [CreateCastService],
    })
      .overrideProvider(CreateCastService)
      .useValue(mockCreateCastService)
      .compile();

    controller = module.get<CreateCastController>(CreateCastController);
    service = module.get<CreateCastService>(CreateCastService);
  });

  it('Should call Create Cast Service with the correct values', async () => {
    const executeSpy = jest.spyOn(service, 'execute');
    await controller.handle(mockRequest, mockCreateCastParamsDTO);
    expect(executeSpy).toHaveBeenCalledWith('admin', mockCreateCastParamsDTO);
  });

  it('Should return the cast on Create Cast Service success', async () => {
    const response = await controller.handle(
      mockRequest,
      mockCreateCastParamsDTO,
    );
    expect(response).toEqual(mockCast);
  });

  it('Should throw if Create Cast Service throws', async () => {
    jest
      .spyOn(service, 'execute')
      .mockReturnValueOnce(Promise.reject(new UnauthorizedException()));
    const error = controller.handle(mockRequest, mockCreateCastParamsDTO);
    await expect(error).rejects.toBeInstanceOf(HttpException);
  });
});
