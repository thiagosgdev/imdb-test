import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { CreateUserService } from './createUser.service';
import { User } from '../../../../shared/entities/user.entity';
import {
  mockCreateUserParamsDTO,
  mockUser,
} from '../../../../shared/tests/user.mock';
import { UserDTO } from '../../dto/user.dto';
import { JwtProvider } from '../../../../shared/providers/EncryptProvider/jwt.provider';

const mockUserRepository = {
  findOne: (): Promise<UserDTO | null> => {
    return Promise.resolve(null);
  },
  save: () => {
    return Promise.resolve(mockUser);
  },
};

const mockHashProvider = {
  compareHash: jest.fn(() => {
    Promise.resolve(false);
  }),
  createHash: jest.fn(() => {
    Promise.resolve('any_hashed');
  }),
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
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => {
              null;
            }),
          },
        },
        {
          provide: 'HASH_PROVIDER',
          useValue: mockHashProvider,
        },
        {
          provide: 'ENCRYPTER_PROVIDER',
          useClass: JwtProvider,
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
    expect(response).toHaveProperty('user');
    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('refreshToken');
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
