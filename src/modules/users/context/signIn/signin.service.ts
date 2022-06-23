import {
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { User } from '../../../../shared/entities/user.entity';
import { Hasher } from '../../../../shared/providers/HasherProvider/protocols/hasher';
import envConfig from '../../../../configs/env';
import { SigninRequestDTO } from '../../dto/signinRequest.dto';
import { SigninResponseDTO } from '../../dto/signinResponse.dto';
import { InjectRepository } from '@nestjs/typeorm';

export class SigninService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject('HASH_PROVIDER')
    private hasher: Hasher,
    private jwtService: JwtService,
  ) {}
  async execute(data: SigninRequestDTO): Promise<SigninResponseDTO> {
    const { email, password } = data;
    let role = 'user';

    const userCredentials = await this.userRepository.findOne({
      select: ['email', 'password'],
      where: {
        email,
      },
    });

    if (!userCredentials) {
      throw new NotFoundException('No user found!');
    }

    const isValid = await this.hasher.compareHash(
      password,
      userCredentials.password,
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid email/password');
    }

    const user = await this.userRepository.findOne({
      where: { email },
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
