import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { User } from '../../shared/entities/user.entity';
import { JwtProvider } from '../../shared/providers/EncryptProvider/jwt.provider';
import { JwtStrategy } from '../../shared/providers/EncryptProvider/jwt.strategy';
import jwtConfig from '../../configs/jwt';
import { BcryptProvider } from '../../shared/providers/HasherProvider/bcrypt.provider';
import { SigninService } from './context/signIn/signin.service';
import { SigninController } from './context/signIn/signin.controller';
import { UpdateUserService } from './context/updateUser/updateUser.service';
import { UpdateUserController } from './context/updateUser/updateUser.controller';
import { DeleteUserService } from './context/deleteUser/deleteUser.service';
import { DeleteUserController } from './context/deleteUser/deleteUser.controller';
import { CreateUserService } from './context/createUser/createUser.service';
import { CreateUserController } from './context/createUser/createUser.controller';
import { CreateAdminService } from './context/createAdmin/createAdmin.service';
import { CreateAdminController } from './context/createAdmin/createAdmin.controller';

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
    CreateAdminService,
  ],
  controllers: [
    CreateUserController,
    SigninController,
    UpdateUserController,
    DeleteUserController,
    CreateAdminController,
  ],
  exports: [TypeOrmModule],
})
export class UserModule {}
