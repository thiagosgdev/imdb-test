import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import jwtConfig from '../../configs/jwt';
import { JwtStrategy } from '../../shared/providers/EncryptProvider/jwt.strategy';
import { Vote } from '../../shared/entities/vote.entity';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig()),
    TypeOrmModule.forFeature([Vote]),
    PassportModule,
  ],
  providers: [JwtStrategy],
  controllers: [],
  exports: [TypeOrmModule],
})
export class MovieModule {}
