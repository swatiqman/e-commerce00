/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { OrderProductDto } from 'src/dto/order/order-product.dto';
import { QueryPipe } from 'src/pipes/query.pipe';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { GetUser } from 'src/decorators/get-user.decorator';
import { UserModel } from 'src/app.interface';

@ApiTags('Order')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('order')
export class OrderController {
  constructor(private srv: OrderService) {}

  @Post()
  create(@Body() body: OrderProductDto, @GetUser() user:  UserModel) {
    return this.srv.create(body, user);
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
