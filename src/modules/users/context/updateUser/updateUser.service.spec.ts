import { Test, TestingModule } from '@nestjs/testing';
import MockDate from 'mockdate';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User } from '../../../../shared/entities/user.entity';
import {
  mockUpdatedUser,
  mockUpdateUserParamsDTO,
  mockUser,
} from '../../../../shared/tests/user.mock';
import { UserDTO } from '../../dto/user.dto';
import { UpdateUserService } from './updateUser.service';

const mockUserRepository = {
  findOne: (): Promise<UserDTO | null> => {
    return Promise.resolve(mockUser);
  },
  save: () => {
    return Promise.resolve(mockUpdatedUser);
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

describe('Update User Service', () => {
  let service: UpdateUserService;

  beforeEach(async () => {
    MockDate.set(new Date());

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: 'HASH_PROVIDER',
          useValue: mockHashProvider,
        },
      ],
    }).compile();

    service = module.get<UpdateUserService>(UpdateUserService);
  });

  it('Should be defined!', () => {
    expect(service).toBeDefined();
  });
  it('Should return the user created on save() success', async () => {
    const response = await service.execute(
      mockUpdateUserParamsDTO(),
      'user_id',
    );
    expect(response).toHaveProperty('id');
  });

  it('Should return a NotFoundException if the user is not found', async () => {
    jest.spyOn(mockUserRepository, 'findOne').mockResolvedValueOnce(null);
    const response = service.execute(mockUpdateUserParamsDTO(), 'user_id');
    await expect(response).rejects.toBeInstanceOf(NotFoundException);
  });

  it('Should return a ConflictException if the email to be changed to, already is in use.', async () => {
    const response = service.execute(
      {
        email: 'updated_email@test.com',
      },
      'user_id',
    );
    await expect(response).rejects.toBeInstanceOf(ConflictException);
  });
});
