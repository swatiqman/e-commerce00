/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { ProductLineRepository } from 'src/repositories/product-line.repository';
import { findOneEntity, findEntity, deleteEntity } from 'src/utils/crud-helper.util';

@Injectable()
export class ProductLineService {
  repoName = 'product-line';
  constructor(private repository: ProductLineRepository) {}

  findOne(id: string) {
    return findOneEntity(this.repository, this.repoName, id);
  }

  find(
    pagination: IPaginationOptions,
    query?: Record<string, unknown>,
    reverse?: boolean,
  ) {
    return findEntity(this.repository, pagination, query, reverse);
  }

  delete(id: string) {
    return deleteEntity(this.repository, this.repoName, id);
  }
}
