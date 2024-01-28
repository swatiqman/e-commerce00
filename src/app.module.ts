import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/app.config';
import { jwtAppConfig } from './config/jwt-app.config';
import {
  typeOrmAppConfig,
  TypeOrmAppConfig,
} from './config/typeorm-app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ENTITIES } from './entities';
import { AuthModule } from './features/auth/auth.module';
import { ProductModule } from './features/product/product.module';
import { ProductLineModule } from './features/product-line/product-line.module';
import { UserModule } from './features/user/user.module';
import { OrderModule } from './features/order/order.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestLoggerInterceptor } from './interceptors/request-logger.interceptors';
import { HttpResponseTransformInterceptor } from './interceptors/http-response-transform.interceptors';
import { productConfig } from './config/product.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, typeOrmAppConfig, jwtAppConfig, productConfig],
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
  providers: [
    { provide: APP_INTERCEPTOR, useClass: RequestLoggerInterceptor },
    { provide: APP_INTERCEPTOR, useClass: HttpResponseTransformInterceptor },
  ],
})
export class AppModule {}
