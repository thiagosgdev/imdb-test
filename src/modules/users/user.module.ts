import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { User } from '../../shared/entities/user.entity';
import { JwtProvider } from '../../shared/providers/EncryptProvider/jwt.provider';
import { JwtStrategy } from '../../shared/providers/EncryptProvider/jwt.strategy';
import jwtConfig from '../../configs/jwt';
import { BcryptProvider } from '../../shared/providers/HasherProvider/bcrypt.provider';
import { CreateUserController } from './context/createUser/createUser.controller';
import { CreateUserService } from './context/createUser/createUser.service';
import { SigninService } from './context/signIn/signin.service';
import { SigninController } from './context/signIn/signin.controller';
import { UpdateUserService } from './context/updateUser/updateUser.service';
import { UpdateUserController } from './context/updateUser/updateUser.controller';
import { DeleteUserService } from './context/deleteUser/deleteUser.service';
import { DeleteUserController } from './context/deleteUser/deleteUser.controller';

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
    UpdateUserService,
    DeleteUserService,
  ],
  controllers: [
    CreateUserController,
    SigninController,
    UpdateUserController,
    DeleteUserController,
  ],
  exports: [TypeOrmModule],
})
export class UserModule {}
