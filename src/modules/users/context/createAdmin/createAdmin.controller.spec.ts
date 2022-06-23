import { ConflictException, HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';

import { mockRequest } from '../../../../shared/tests/request.mock';
import {
  mockCreateUserParamsDTO,
  mockUser,
} from '../../../../shared/tests/user.mock';
import { CreateAdminController } from './createAdmin.controller';
import { CreateAdminService } from './createAdmin.service';

const mockCreateAdminService = {
  execute: jest.fn((dto) => {
    return mockUser;
  }),
};

describe('Create Admin Controller', () => {
  let controller: CreateAdminController;
  let service: CreateAdminService;
  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateAdminController],
      providers: [CreateAdminService],
    })
      .overrideProvider(CreateAdminService)
      .useValue(mockCreateAdminService)
      .compile();

    controller = module.get<CreateAdminController>(CreateAdminController);
    service = module.get<CreateAdminService>(CreateAdminService);
  });

  it('Should call CreateAdminService with the correct values', async () => {
    const executeSpy = jest.spyOn(service, 'execute');
    await controller.handle(mockRequest, mockCreateUserParamsDTO());
    expect(executeSpy).toHaveBeenCalledWith('admin', mockCreateUserParamsDTO());
  });

  it('Should return the tokens and admin on CreateAdminService success', async () => {
    const response = await controller.handle(
      mockRequest,
      mockCreateUserParamsDTO(),
    );
    expect(response).toEqual(mockUser);
  });

  it('Should throw if CreateAdminService throws', async () => {
    jest
      .spyOn(service, 'execute')
      .mockReturnValueOnce(Promise.reject(new ConflictException()));
    const error = controller.handle(mockRequest, mockCreateUserParamsDTO());
    await expect(error).rejects.toBeInstanceOf(HttpException);
  });
});
