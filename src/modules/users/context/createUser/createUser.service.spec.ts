import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CreateUserService } from './createUser.service';
import { User } from '../../../../shared/entities/user.entity';
import {
  mockCreateUserParamsDTO,
  mockUser,
} from '../../../../shared/tests/user.mock';
import { UserDTO } from '../../dto/user.dto';

const mockUserRepository = {
  findOne: (): Promise<UserDTO | null> => {
    return Promise.resolve(null);
  },
  save: () => {
    return Promise.resolve(mockUser);
  },
};

describe('Create User Service', () => {
  let service: CreateUserService;

  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
  });

  it('Should be defined!', () => {
    expect(service).toBeDefined();
  });
  it('Should return the user created on save() success', async () => {
    const response = await service.execute(mockCreateUserParamsDTO());
    expect(response).toHaveProperty('id');
  });

  it('Should return a ConflicException if the e-mail already exists', async () => {
    jest.spyOn(mockUserRepository, 'findOne').mockResolvedValueOnce(mockUser);
    const response = service.execute(mockCreateUserParamsDTO());
    await expect(response).rejects.toBeInstanceOf(ConflictException);
  });

  it('Should return a BadRequestException if the password does not match', async () => {
    const response = service.execute({
      name: 'any_name',
      email: 'any_email@test.com',
      password: 'any_password',
      passwordConfirmation: 'wrong',
    });
    await expect(response).rejects.toBeInstanceOf(BadRequestException);
  });
});
