import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User } from '../../../../shared/entities/user.entity';
import { DeleteUserService } from './deleteUser.service';

const mockUserRepository = {
  softDelete: jest.fn(),
};

describe('Delete User Service', () => {
  let service: DeleteUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<DeleteUserService>(DeleteUserService);
  });

  it('Should be defined!', () => {
    expect(service).toBeDefined();
  });
  it('Should call softDelete() with the correct user id', async () => {
    const deleteSpy = jest.spyOn(mockUserRepository, 'softDelete');
    await service.execute('user_id');
    expect(deleteSpy).toHaveBeenCalledWith('user_id');
  });
});
