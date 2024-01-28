/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { UserModel } from 'src/app.interface';
import { OrderProductDto } from 'src/dto/order/order-product.dto';
import { OrderRepository } from 'src/repositories/order.repository';
import {
  deleteEntity,
  findEntity,
  findOneEntity,
} from 'src/utils/crud-helper.util';

@Injectable()
export class OrderService {
  repoName = 'order';
  constructor(private repository: OrderRepository) {}

  findOne(id: string) {
    return findOneEntity(this.repository, this.repoName, id, true);
  }

  find(
    pagination: IPaginationOptions,
    query?: Record<string, unknown>,
    reverse?: boolean,
  ) {
    return findEntity(this.repository, pagination, query, reverse);
  }

  create(data: OrderProductDto, user: UserModel) {
    return this.repository.makeOrder(data, user)
    // return createEntity(this.repository, this.repoName, data);
  }

  delete(id: string) {
    return deleteEntity(this.repository, this.repoName, id);
  }
}
