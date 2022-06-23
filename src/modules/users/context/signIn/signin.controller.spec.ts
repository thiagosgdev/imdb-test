import MockDate from 'mockdate';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, HttpException } from '@nestjs/common';

import { SigninService } from './signin.service';
import { SigninController } from './signin.controller';
import { SigninRequestDTO } from '../../dto/signinRequest.dto';
import { mockUser } from '../../../../shared/tests/user.mock';

const mockSigninRequest = (): SigninRequestDTO => {
  return {
    email: 'any_email@test.com',
    password: 'any_password',
  };
};
const mockSigninService = {
  execute: jest.fn((dto) => {
    return {
      token: 'any_token',
      refresh_token: 'any_refresh_token',
      user: mockUser,
    };
  }),
};

describe('Signin Controller', () => {
  let controller: SigninController;
  let service: SigninService;
  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SigninController],
      providers: [SigninService],
    })
      .overrideProvider(SigninService)
      .useValue(mockSigninService)
      .compile();

    controller = module.get<SigninController>(SigninController);
    service = module.get<SigninService>(SigninService);
  });
  it('Should call SigninService with the correct values', async () => {
    const loginSpy = jest.spyOn(service, 'execute');
    await controller.handle(mockSigninRequest());
    expect(loginSpy).toHaveBeenCalledWith(mockSigninRequest());
  });

  it('Should return the tokens on SigninService success', async () => {
    const response = await controller.handle(mockSigninRequest());
    expect(response).toEqual({
      token: 'any_token',
      refresh_token: 'any_refresh_token',
      user: mockUser,
    });
  });

  it('Should throw if SigninService throws', async () => {
    jest
      .spyOn(service, 'execute')
      .mockReturnValueOnce(
        Promise.reject(
          new BadRequestException('Email and/or password are required'),
        ),
      );
    const response = controller.handle({
      email: 'test@test.com',
      password: '',
    });
    await expect(response).rejects.toBeInstanceOf(HttpException);
  });
});
