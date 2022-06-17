import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import envConfig from './configs/env';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
