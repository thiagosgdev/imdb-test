import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { mockRequest } from '../../../../shared/tests/request.mock';
import { DeleteUserController } from './deleteUser.controller';
import { DeleteUserService } from './deleteUser.service';

const mockDeleteUserService = {
  execute: jest.fn(),
};

describe('Delete User Controller', () => {
  let controller: DeleteUserController;
  let service: DeleteUserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteUserController],
      providers: [DeleteUserService],
    })
      .overrideProvider(DeleteUserService)
      .useValue(mockDeleteUserService)
      .compile();

    controller = module.get<DeleteUserController>(DeleteUserController);
    service = module.get<DeleteUserService>(DeleteUserService);
  });

  it('Should call Delete User Service with the correct value', async () => {
    const executeSpy = jest.spyOn(service, 'execute');
    await controller.handle(mockRequest);
    expect(executeSpy).toHaveBeenCalledWith('any_id');
  });

  it('Should throw if Delete User Service throws', async () => {
    jest
      .spyOn(service, 'execute')
      .mockReturnValueOnce(Promise.reject(new InternalServerErrorException()));
    const error = controller.handle(mockRequest);
    await expect(error).rejects.toBeInstanceOf(HttpException);
  });
});
