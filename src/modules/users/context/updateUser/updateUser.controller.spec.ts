import { HttpException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';

import { mockRequest } from '../../../../shared/tests/request.mock';
import {
  mockUpdateUserParamsDTO,
  mockUser,
} from '../../../../shared/tests/user.mock';
import { UpdateUserController } from './updateUser.controller';
import { UpdateUserService } from './updateUser.service';

const mockUpdateUserService = {
  execute: jest.fn((dto) => {
    return mockUser;
  }),
};

describe('Update User Controller', () => {
  let controller: UpdateUserController;
  let service: UpdateUserService;
  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateUserController],
      providers: [UpdateUserService],
    })
      .overrideProvider(UpdateUserService)
      .useValue(mockUpdateUserService)
      .compile();

    controller = module.get<UpdateUserController>(UpdateUserController);
    service = module.get<UpdateUserService>(UpdateUserService);
  });

  it('Should call Update User Service with the correct values', async () => {
    const executeSpy = jest.spyOn(service, 'execute');
    await controller.handle(mockUpdateUserParamsDTO(), mockRequest);
    expect(executeSpy).toHaveBeenCalledWith(
      mockUpdateUserParamsDTO(),
      'any_id',
    );
  });

  it('Should return the user on Update User Service success', async () => {
    const response = await controller.handle(
      mockUpdateUserParamsDTO(),
      mockRequest,
    );
    expect(response).toEqual(mockUser);
  });

  it('Should throw if UpdateUserService throws', async () => {
    jest
      .spyOn(service, 'execute')
      .mockReturnValueOnce(Promise.reject(new NotFoundException()));
    const error = controller.handle(mockUpdateUserParamsDTO(), mockRequest);
    await expect(error).rejects.toBeInstanceOf(HttpException);
  });
});
