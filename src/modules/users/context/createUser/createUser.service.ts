import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { Hasher } from '../../../../shared/providers/HasherProvider/protocols/hasher';
import { User } from '../../../../shared/entities/user.entity';
import { CreateUserParamsDTO } from '../../dto/createUserParams.dto';
import envConfig from '../../../../configs/env';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject('HASH_PROVIDER')
    private hasher: Hasher,
    private jwtService: JwtService,
  ) {}

  async execute(data: CreateUserParamsDTO) {
    const { email, password, passwordConfirmation } = data;
    let role = 'user';

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

    const hashedPassword = await this.hasher.createHash(password);

    const user = await this.userRepository.save({
      ...data,
      password: hashedPassword,
    });

    if (user.isAdmin) role = 'admin';

    const token = this.jwtService.sign(
      { userId: user.id, role },
      { expiresIn: envConfig().jwtExpires },
    );

    const refreshToken = this.jwtService.sign(
      { userId: user.id, role },
      { expiresIn: envConfig().jwtRefExpires },
    );

    return { token, refreshToken, user };
  }
}
