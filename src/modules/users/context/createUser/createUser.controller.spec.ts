import { ConflictException, HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';

import {
  mockCreateUserParamsDTO,
  mockUser,
} from '../../../../shared/tests/user.mock';
import { CreateUserController } from './createUser.controller';
import { CreateUserService } from './createUser.service';

const mockCreateUserService = {
  execute: jest.fn((dto) => {
    return mockUser;
  }),
};

describe('Create User Controller', () => {
  let controller: CreateUserController;
  let service: CreateUserService;
  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [CreateUserService],
    })
      .overrideProvider(CreateUserService)
      .useValue(mockCreateUserService)
      .compile();

    controller = module.get<CreateUserController>(CreateUserController);
    service = module.get<CreateUserService>(CreateUserService);
  });

  it('Should call CreateUserService with the correct values', async () => {
    const executeSpy = jest.spyOn(service, 'execute');
    await controller.handle(mockCreateUserParamsDTO());
    expect(executeSpy).toHaveBeenCalledWith(mockCreateUserParamsDTO());
  });

  it('Should return the tokens and user on CreateUserService success', async () => {
    const response = await controller.handle(mockCreateUserParamsDTO());
    expect(response).toEqual(mockUser);
  });

  it('Should throw if CreateUserService throws', async () => {
    jest
      .spyOn(service, 'execute')
      .mockReturnValueOnce(Promise.reject(new ConflictException()));
    const error = controller.handle(mockCreateUserParamsDTO());
    await expect(error).rejects.toBeInstanceOf(HttpException);
  });
});
