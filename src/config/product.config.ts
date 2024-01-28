/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

export const productConfig = registerAs('product', () => {
  return {
    lowStock: Number(process.env['PRODUCT_CONSTANT_LOW_STOCK'] || 10),
  };
});

export type ProductConfig = ConfigType<typeof productConfig>;

export const InjectProductConfig = () => Inject(productConfig.KEY);
