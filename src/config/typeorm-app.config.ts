/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

export const typeOrmAppConfig = registerAs('typeorm', () => {
  return {
    host: process.env['DATABASE_HOST'],
    port: Number(process.env['DATABASE_PORT']),
    username: process.env['DATABASE_USERNAME'],
    password: process.env['DATABASE_PASSWORD'],
    database: process.env['DATABASE_NAME'],
    synchronize: process.env['DATABASE_SYNC'] === 'true',
  };
});

export type TypeOrmAppConfig = ConfigType<typeof typeOrmAppConfig>;

export const InjectTypeOrmAppConfig = () => Inject(typeOrmAppConfig.KEY);
