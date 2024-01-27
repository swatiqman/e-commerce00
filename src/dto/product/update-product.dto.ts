/* eslint-disable prettier/prettier */
import { IsNumber, IsOptional, IsString } from 'class-validator';
export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name!: string;

  @IsOptional()
  @IsNumber()
  stock!: string;

  @IsOptional()
  @IsNumber()
  price!: string;
}
