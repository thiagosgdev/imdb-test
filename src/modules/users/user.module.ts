import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { CreateUserController } from './context/createUser/createUser.controller';
import { CreateUserService } from './context/createUser/createUser.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [CreateUserController],
  providers: [CreateUserService],
  exports: [TypeOrmModule],
})
export class UserModule {}
