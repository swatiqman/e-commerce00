/* eslint-disable prettier/prettier */
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { CustomRepository } from 'src/decorators/typeorm/typeorm-ex.decorator';
import { ProductEntity } from 'src/entities/product.entity';
import { LessThan, Repository } from 'typeorm';

@CustomRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {
  async findProductsLowOnStock(
    pagination: IPaginationOptions,
    lowStock: number,
  ) {
    const findManyOptions = {
      where: { stock: LessThan(lowStock) },
      loadEagerRelations: false,
    };
    if (pagination.limit && pagination.page)
      return await paginate(this, pagination, findManyOptions);

    return await this.find(findManyOptions);
  }
}
