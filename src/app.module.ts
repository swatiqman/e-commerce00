import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { jwtAppConfig } from './config/jwt-app.config';
import {
  typeOrmAppConfig,
  TypeOrmAppConfig,
} from './config/typeorm-app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENTITIES } from './entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, typeOrmAppConfig, jwtAppConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [typeOrmAppConfig.KEY],
      useFactory: (config: TypeOrmAppConfig) => {
        return {
          type: 'postgres',
          ...config,
          logging: false,
          entities: [...ENTITIES],
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
