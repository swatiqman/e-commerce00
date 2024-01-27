/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { QueryPipe } from 'src/pipes/query.pipe';
import { ProductLineService } from './product-line.service';

@ApiTags('Product Line')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('product-line')
export class ProductLineController {
  constructor(private srv: ProductLineService) {}

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
