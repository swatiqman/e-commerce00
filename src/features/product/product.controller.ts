/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateProductDto } from 'src/dto/product/create-product.dto';
import { UpdateProductDto } from 'src/dto/product/update-product.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { QueryPipe } from 'src/pipes/query.pipe';

@ApiTags('Product')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(private srv: ProductService) {}

  @Post()
  create(@Body() body: CreateProductDto) {
    return this.srv.create(body);
  }

  @Put(':id')
  update(@Body() body: UpdateProductDto, @Param('id') id: string) {
    return this.srv.update(id, body);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.srv.findOne(id);
  }

  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'query', type: 'object', required: false })
  @Get()
  getAll(
    @Query(QueryPipe) query: QueryPipe,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.srv.find({ page, limit }, { ...query }, false);
  }
}
