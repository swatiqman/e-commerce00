/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { CreateProductDto } from 'src/dto/product/create-product.dto';
import { UpdateProductDto } from 'src/dto/product/update-product.dto';
import { ProductRepository } from 'src/repositories/product.repository';
import { findOneEntity, findEntity, createEntity, updateEntity, deleteEntity } from 'src/utils/crud-helper.util';

@Injectable()
export class ProductService {
  repoName = 'product';
  constructor(private repository: ProductRepository) {}

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

  create(data: CreateProductDto) {
    return createEntity(this.repository, this.repoName, data);
  }

  update(id: string, data: UpdateProductDto) {
    return updateEntity(this.repository, this.repoName, id, data);
  }

  delete(id: string) {
    return deleteEntity(this.repository, this.repoName, id);
  }
}
