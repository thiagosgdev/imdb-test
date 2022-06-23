import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';

import { SigninService } from './signin.service';
import { mockUser } from '../../../../shared/tests/user.mock';
import { SigninResponseDTO } from '../../dto/signinResponse.dto';
import { User } from '../../../../shared/entities/user.entity';

const mockSigninResponseDTO = (): SigninResponseDTO => {
  return {
    token: 'any_token',
    refreshToken: 'any_token',
    user: mockUser,
  };
};

const mockUserRepository = {
  findOne: jest.fn(() => mockUser),
};

const mockJWTProvider = {
  sign: jest.fn(() => {
    return 'any_token';
  }),
};
const mockHashProvider = {
  compareHash: jest.fn(() => true),
};
describe('Sign in Service', () => {
  let service: SigninService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SigninService,
        {
          provide: JwtService,
          useValue: mockJWTProvider,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: 'HASH_PROVIDER',
          useValue: mockHashProvider,
        },
        {
          provide: 'ENCRYPTER_PROVIDER',
          useValue: mockJWTProvider,
        },
      ],
    }).compile();

    service = module.get<SigninService>(SigninService);
  });

  it('Should be defined!', () => {
    expect(service).toBeDefined();
  });
  it('Should return a token and refresh token on sign in success', async () => {
    const response: SigninResponseDTO = await service.execute({
      email: 'email@test.com',
      password: '12345',
    });
    expect(response).toEqual(mockSigninResponseDTO());
  });

  it('Should throw NotFoundException if no user is found', async () => {
    jest.spyOn(mockUserRepository, 'findOne').mockReturnValueOnce(null);
    const response = service.execute({
      email: 'email@test.com',
      password: '123456',
    });
    await expect(response).rejects.toBeInstanceOf(NotFoundException);
  });

  it('Should throw UnauthorizedException if password does not match', async () => {
    jest.spyOn(mockHashProvider, 'compareHash').mockReturnValueOnce(false);
    const response = service.execute({
      email: 'email@test.com',
      password: '123456',
    });
    await expect(response).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
