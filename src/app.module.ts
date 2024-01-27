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
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './features/product/product.module';
import { ProductLineModule } from './features/product-line/product-line.module';
import { UserModule } from './features/user/user.module';
import { OrderModule } from './features/order/order.module';

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
    AuthModule,
    ProductModule,
    ProductLineModule,
    UserModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
