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
import { UserService } from './user.service';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { QueryPipe } from 'src/pipes/query.pipe';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';

@ApiTags('User')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private srv: UserService) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.srv.create(body);
  }

  @Put(':id')
  update(@Body() body: UpdateUserDto, @Param('id') id: string) {
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
