/* eslint-disable prettier/prettier */
import { CustomRepository } from 'src/decorators/typeorm/typeorm-ex.decorator';
import { ProductLineEntity } from 'src/entities/product-line.entity';
import { Repository } from 'typeorm';

@CustomRepository(ProductLineEntity)
export class ProductLineRepository extends Repository<ProductLineEntity> {
  
}
