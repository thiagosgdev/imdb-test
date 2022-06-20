import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../../../shared/entities/user.entity';
import { CreateUserParamsDTO } from '../../dto/createUserParams.dto';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(data: CreateUserParamsDTO) {
    const { email, password, passwordConfirmation } = data;

    const userExists = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new ConflictException(
        'E-mail already in use! Try to recover your password',
      );
    }

    if (password !== passwordConfirmation) {
      throw new BadRequestException('Password not match! Try again.');
    }

    return await this.userRepository.save(data).catch((err) => err);
  }
}
