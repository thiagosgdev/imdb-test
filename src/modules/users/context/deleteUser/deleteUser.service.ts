import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../../../shared/entities/user.entity';

export class DeleteUserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async execute(userId: string) {
    await this.userRepository.softDelete(userId);
  }
}
