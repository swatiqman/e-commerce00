/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateProductLineWithOrderDto } from '../product-line/create-product-line.dto';
export class OrderProductDto {
  @IsNotEmpty()
  @IsString()
  userId!: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductLineWithOrderDto)
  productLines!: CreateProductLineWithOrderDto[];
}
