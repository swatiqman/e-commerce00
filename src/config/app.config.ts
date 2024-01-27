/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => {
  return {
    protocol: process.env['PROTOCOL'] || 'http',
    host: process.env['HOST'] || 'localhost',
    port: Number(process.env['PORT']) || 3000,
    get domain() {
      return `${this.protocol}://${this.host}:${this.port}`;
    },
  };
});

export type AppConfig = ConfigType<typeof appConfig>;

export const InjectAppConfig = () => Inject(appConfig.KEY);
