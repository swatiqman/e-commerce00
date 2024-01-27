/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateProductLineWithOrderDto {
  @IsNotEmpty()
  @IsNumber()
  quantity!: string;

  @IsNotEmpty()
  @IsString()
  productId!: string;
}
