import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import envConfig from './configs/env';
import { UserModule } from './modules/users/user.module';
import { routerConfig } from './configs/routes';

@Module({
  imports: [
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
