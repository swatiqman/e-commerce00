/* eslint-disable prettier/prettier */
import { CustomRepository } from 'src/decorators/typeorm/typeorm-ex.decorator';
import { ProductEntity } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@CustomRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {}
