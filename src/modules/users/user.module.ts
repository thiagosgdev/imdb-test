import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { User } from '../../shared/entities/user.entity';
import { JwtProvider } from '../../shared/providers/EncryptProvider/jwt.provider';
import { JwtStrategy } from '../../shared/providers/EncryptProvider/jwt.strategy';
import { BcryptProvider } from '../../shared/providers/HasherProvider/bcrypt.provider';
import { CreateUserController } from './context/createUser/createUser.controller';
import { CreateUserService } from './context/createUser/createUser.service';
import jwtConfig from '../../configs/jwt';
import { SigninService } from './context/signIn/signin.service';
import { SigninController } from './context/signIn/signin.controller';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig()),
    TypeOrmModule.forFeature([User]),
    PassportModule,
  ],
  providers: [
    { provide: 'HASH_PROVIDER', useClass: BcryptProvider },
    { provide: 'ENCRYPTER_PROVIDER', useClass: JwtProvider },
    JwtStrategy,
    CreateUserService,
    SigninService,
  ],
  controllers: [CreateUserController, SigninController],
  exports: [TypeOrmModule],
})
export class UserModule {}
