import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import jwtConfig from './configs/jwt';
import envConfig from './configs/env';
import { UserModule } from './modules/users/user.module';
import { routerConfig } from './configs/routes';
import { JwtAuthGuard } from './shared/providers/EncryptProvider/jwtAuth.guard';
import { MovieModule } from './modules/movies/movie.module';
import { VoteModule } from './modules/votes/vote.module';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig()),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envConfig().dbHost,
      port: envConfig().dbPort,
      username: envConfig().dbUser,
      password: envConfig().dbPassword,
      database: envConfig().dbName,
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/**/migrations/*.{ts,js}'],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20,
    }),
    RouterModule.register(routerConfig),

    UserModule,
    MovieModule,
    VoteModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
