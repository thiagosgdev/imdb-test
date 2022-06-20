import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Hasher } from '../../../../shared/providers/HasherProvider/protocols/hasher';
import { User } from '../../../../shared/entities/user.entity';
import { UpdateUserParamsDTO } from '../../dto/updateUserParams.dto';

@Injectable()
export class UpdateUserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject('HASH_PROVIDER')
    private hasher: Hasher,
  ) {}

  async execute(data: UpdateUserParamsDTO, userId: string) {
    const userExists = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new NotFoundException('User not found!');
    }

    if (data.email) {
      const emailExists = await this.userRepository.findOne({
        where: {
          email: data.email,
        },
      });

      if (emailExists) throw new ConflictException('Email already in use');
    }

    if (data.password) {
      const hashedPassword = await this.hasher.createHash(data.password);
      data.password = hashedPassword;
    }

    return await this.userRepository.save({
      ...userExists,
      ...data,
    });
  }
}
